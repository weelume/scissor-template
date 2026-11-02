'use client'
import { useScissorBrand } from '../host'
import type { SiteTemplatePageProps } from '../../../types'
import { copy } from '../config'
import { stylists } from '../content'
import { Shell } from '../components/Layout'
import { Hero } from '../components/Hero'
import { StylistGrid } from '../components/Studio'
import { Booking } from '../components/Booking'
import { Heading,Reveal } from '../components/Primitives'
function Stylist({slug,locale='zh',basePath}:SiteTemplatePageProps&{slug:string}) {const brand=useScissorBrand();const s=stylists.find(s=>s.slug===slug);if(!s)throw new Error('未知发型师: '+slug);return <Shell locale={locale} basePath={basePath}><Hero locale={locale} basePath={basePath} photo={s.photo} label={s.role} title={copy(s.name,s.name)} text={s.intro}/><section className="sc-section sc-profile"><div><Heading number="02" locale={locale} label={copy('个人介绍','Profile')} title={s.specialty}/><p>{s.bio[locale].replaceAll('Scissor',brand[locale])}</p></div><dl><div><dt>{copy('职务','Role')[locale]}</dt><dd>{s.role[locale]}</dd></div><div><dt>{copy('专长','Specialty')[locale]}</dt><dd>{s.specialty[locale]}</dd></div><div><dt>{copy('经验','Experience')[locale]}</dt><dd>{s.years} {locale==='zh'?'年':'years'}</dd></div></dl></section><section className="sc-section sc-sand"><Heading number="03" locale={locale} label={copy('近期作品','Recent work')} title={copy('刚刚完成的新造型','Fresh from their chair.')}/><div className="sc-space-grid">{s.work.map((photo,i)=><Reveal key={photo} delay={i*.1}><img src={photo} alt={`${s.name} ${copy('作品','recent work')[locale]} ${i+1}`} loading="lazy"/></Reveal>)}</div></section><StylistGrid locale={locale} basePath={basePath} exclude={s.slug} number="04"/><Booking locale={locale} number="05"/></Shell> }
export function Priya(props:SiteTemplatePageProps){return <Stylist {...props} slug="priya-shah"/>}
export function Jonah(props:SiteTemplatePageProps){return <Stylist {...props} slug="jonah-kim"/>}
export function Ava(props:SiteTemplatePageProps){return <Stylist {...props} slug="ava-laurent"/>}
export function Marcus(props:SiteTemplatePageProps){return <Stylist {...props} slug="marcus-reid"/>}
