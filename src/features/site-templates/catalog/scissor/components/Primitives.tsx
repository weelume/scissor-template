'use client'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import type { Copy } from '../config'
import { motionTokens } from '../config'
import type { TemplateLocale } from '../../../types'
export type ContextProps = { locale: TemplateLocale; basePath: string }
export function href(base: string, path = '') { return path.startsWith('#') ? `${base}${path}` : `${base}${path ? '/'+path : ''}` || '/' }
export function Button({children,to,secondary=false,...props}: {children: ReactNode;to:string;secondary?:boolean} & Omit<React.ComponentProps<typeof Link>,'href'>) { return <Link {...props} className={`sc-button ${secondary?'sc-secondary':''} ${props.className??''}`} href={to}>{children}</Link> }
export function Label({number,children}:{number:string;children:ReactNode}) { return <div className="sc-label"><span>{number}</span>{children}</div> }
export function Reveal({children,delay=0,className='',direction='up'}:{children:ReactNode;delay?:number;className?:string;direction?:'up'|'left'|'right'}) {
  const reduced=useReducedMotion()
  return <motion.div className={className} initial={reduced?false:{opacity:0,x:direction==='left'?-36:direction==='right'?36:0,y:direction==='up'?40:0}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true,amount:.12}} transition={{duration:reduced?0:motionTokens.reveal,delay,ease:motionTokens.ease}}>{children}</motion.div>
}
function Word({word,index,total,progress}:{word:string;index:number;total:number;progress:MotionValue<number>}) { const opacity=useTransform(progress,[index/total,(index+1)/total],[.16,1]);return <motion.span style={{opacity}}>{word}</motion.span> }
/** 文字亮度由区块滚动进度逐词驱动，回滚时可逆，不能替换为一次性淡入。 */
export function ScrollText({children,className=''}:{children:string;className?:string}) {
  const ref=useRef<HTMLHeadingElement>(null),reduced=useReducedMotion()
  const {scrollYProgress}=useScroll({target:ref,offset:['start 85%','end 40%']})
  const words=children.includes(' ')?children.split(/(\s+)/):Array.from(children)
  const total=words.filter(w=>w.trim()).length;let index=0
  return <h2 ref={ref} className={`sc-scroll-text ${className}`}>{words.map((word,i)=>word.trim()?reduced?<span key={i}>{word}</span>:<Word key={i} word={word} index={index++} total={total} progress={scrollYProgress}/>:<span key={i}>{word}</span>)}</h2>
}
export function Heading({number,label,title,text,locale}:{number:string;label:Copy;title:Copy;text?:Copy;locale:TemplateLocale}) { return <div className="sc-section-head"><div><Label number={number}>{label[locale]}</Label><Reveal><h2>{title[locale]}</h2></Reveal></div>{text&&<Reveal delay={.1}><p>{text[locale]}</p></Reveal>}</div> }
