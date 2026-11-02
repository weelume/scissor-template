'use client'
import type { SiteTemplatePageProps } from '../../../types'
import { brand,copy,image } from '../config'
import { Shell } from '../components/Layout'
import { Hero } from '../components/Hero'
import { Booking } from '../components/Booking'
export default function Contact({locale='zh',basePath}:SiteTemplatePageProps) {return <Shell locale={locale} basePath={basePath}><Hero locale={locale} basePath={basePath} photo={image('azOkrWuibKB7DiRkNnCqPvpYvc')} ctaHref={brand.phoneHref} ctaText={copy('致电 (718) 555 0147','Call (718) 555 0147')} label={copy('联系','Contact')} title={copy('你的新造型\n从这里开始','Come and sit in our chair.')} text={copy('选一个适合的时间，到我们这里坐坐。','A chair, a conversation and a look that feels like you.')}/><Booking locale={locale} number="02"/></Shell> }
