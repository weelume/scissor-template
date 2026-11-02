import { after,before,test } from 'node:test'
import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { createRequire } from 'node:module'
import { createServer } from 'node:net'
import { readFile } from 'node:fs/promises'
const require=createRequire(import.meta.url)
let child,origin,output=''
const catalog=JSON.parse(await readFile(new URL('../.tpl/template.json',import.meta.url),'utf8'))
before(async()=>{
 const probe=createServer();await new Promise(resolve=>probe.listen(0,'127.0.0.1',resolve));const port=probe.address().port;await new Promise(resolve=>probe.close(resolve));origin=`http://127.0.0.1:${port}`
 child=spawn(process.execPath,[require.resolve('next/dist/bin/next'),'start','--port',String(port)],{cwd:new URL('../',import.meta.url),env:{...process.env,NEXT_TELEMETRY_DISABLED:'1'},stdio:['ignore','pipe','pipe']})
 await new Promise((resolve,reject)=>{const timeout=setTimeout(()=>reject(new Error('服务启动超时: '+output)),20000);const onData=data=>{output+=data;if(output.includes('Ready in')){clearTimeout(timeout);resolve()}};child.stdout.on('data',onData);child.stderr.on('data',onData);child.on('exit',code=>{clearTimeout(timeout);reject(new Error('服务提前退出 '+code+': '+output))})})
})
after(async()=>{if(child&&child.exitCode===null){child.kill('SIGTERM');await new Promise(resolve=>child.once('exit',resolve))}})
test('11 个页面的中英文生产路由及本地图片均可访问',async()=>{
 const images=new Set()
 for(const locale of ['zh','en'])for(const page of catalog.surfaces[0].pages){const path='/'+[...(locale==='en'?['en']:[]),...page.slug.split('/').filter(Boolean)].join('/');const response=await fetch(origin+path);assert.equal(response.status,200,path);const html=await response.text();assert.match(html,/<h1/,'每页必须有主标题: '+path);for(const match of html.matchAll(/src="(\/templates\/scissor\/[^"?]+)/g))images.add(match[1]);assert.ok(!html.includes('AXAG8i4Q8'),'不允许未确认素材标识')}
 for(const path of images){const response=await fetch(origin+path);assert.equal(response.status,200,path);assert.match(response.headers.get('content-type')??'',/^image\//,path);assert.ok((await response.arrayBuffer()).byteLength>100,path)}
 console.log(`已验证 22 条页面路由及 ${images.size} 个运行图片。`)
})
test('未知页面返回 404，避免静默回退首页',async()=>{assert.equal((await fetch(origin+'/missing-page')).status,404);assert.equal((await fetch(origin+'/en/stylists/missing-person')).status,404)})
test('预约演示明确声明未发送，页面未包含参考站追踪脚本',async()=>{const html=await(await fetch(origin+'/contact')).text();assert.ok(html.includes('不会发送或保存'));assert.ok(!html.includes('events.framer.com'));assert.ok(!html.includes('framerusercontent.com'))})
