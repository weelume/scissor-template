import { notFound } from 'next/navigation'
import { scissorTemplate } from '../../features/site-templates/catalog/scissor/meta'
export function generateStaticParams(){return scissorTemplate.surfaces[0].pages.flatMap(p=>['zh','en'].map(locale=>({slug:[...(locale==='en'?['en']:[]),...p.slug.split('/').filter(Boolean)]})))}
export default async function Page({params}:{params:Promise<{slug?:string[]}>}) {const segments=(await params).slug??[];const locale=segments[0]==='en'?'en':'zh';const slug=(locale==='en'?segments.slice(1):segments).join('/');const page=scissorTemplate.surfaces[0].pages.find(p=>p.slug===slug);if(!page)notFound();const {default:View}=await page.load();return <View locale={locale} basePath={locale==='en'?'/en':''}/>}
