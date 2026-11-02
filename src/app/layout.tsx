import type { Metadata } from 'next'
import './globals.css'
export const metadata:Metadata={title:'Scissor · Hair Studio',description:'Cuts, colour and grooming for every head of hair.'}
export default function Layout({children}:{children:React.ReactNode}){return <html lang="zh-CN"><body>{children}</body></html>}
