import type { TemplateLocale } from '../../types'
export type Copy = Record<TemplateLocale, string>
export const copy = (zh: string, en: string): Copy => ({ zh, en })
export const brand = { name: copy('Scissor 发型工作室', 'Scissor'), year: 2026, logo: '/templates/scissor/images/Lbs1fOGylFeUjTCOXJbuj237LU.png', phone: '(718) 555 0147', phoneHref: 'tel:+17185550147', email: 'hi@scissorhair.com', address: copy('布鲁克林 Wythe 大道 214 号', '214 Wythe Ave, Brooklyn'), hours: copy('周二至周日 9:00–20:00', 'Tue to Sun, 9 am to 8 pm') }
export const image = (file: string) => `/templates/scissor/images/${file}.webp`
export const navigation = [
  { path: 'about', label: copy('关于我们', 'About') }, { path: '#studio', label: copy('工作室', 'Studio') },
  { path: 'services', label: copy('服务', 'Services') }, { path: 'stylists', label: copy('发型师', 'Stylists') }, { path: 'contact', label: copy('联系预约', 'Contact') },
]
export const book = copy('预约座位', 'Book a chair')
export function templateHref(base: string, path = ''): string {
  if (path.startsWith('#')) return `${base || '/'}${path}`
  return `${base}${path ? '/' + path : ''}` || '/'
}
export const motionTokens = { ease: [0.16, 1, 0.3, 1] as const, fadeEase: [0.65, 0, 0.35, 1] as const, slideInterval: 5000, slideFade: 1.4, slideZoom: 1.08, reveal: 0.9 }
