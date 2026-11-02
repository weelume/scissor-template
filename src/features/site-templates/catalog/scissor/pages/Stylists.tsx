'use client'
import type { SiteTemplatePageProps } from '../../../types'
import { copy,image } from '../config'
import { Shell } from '../components/Layout'
import { Hero } from '../components/Hero'
import { StylistGrid } from '../components/Studio'
import { Reviews } from '../components/Galleries'
import { Booking } from '../components/Booking'
export default function Stylists({locale='zh',basePath}:SiteTemplatePageProps) {return <Shell locale={locale} basePath={basePath}><Hero locale={locale} basePath={basePath} photo={image('CWF4CqZIeUKg0HoRgIpr3LrQ4gE')} label={copy('发型师','Stylists')} title={copy('认识每个座位\n背后的双手','The team behind every chair.')} text={copy('理发师、染发师和造型师，共同训练，共享空间。找到与你默契的人。','Barbers, colourists and stylists who train together and share one floor. Find your person.')}/><StylistGrid locale={locale} basePath={basePath} number="02"/><Reviews locale={locale}/><Booking locale={locale} number="04"/></Shell> }
