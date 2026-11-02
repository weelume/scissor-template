'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { brand, book, copy, navigation, motionTokens } from '../config'
import { useScissorHost } from '../host'
import { Button, href, type ContextProps } from './Primitives'
import '../theme.css'
export function Logo({locale,light=false}:{locale:ContextProps['locale'];light?:boolean}) { const host=useScissorHost();const logo=light?host.lightLogo:host.logo;return host.brandName?<span className="sc-brand">{logo&&<img src={logo} alt=""/>}{host.brandName[locale]}</span>:<img className="sc-logo" src="/templates/scissor/images/Lbs1fOGylFeUjTCOXJbuj237LU.png" alt={brand.name[locale]}/> }
export function Shell({locale,basePath,children}:{children:ReactNode}&ContextProps) {
 const [open,setOpen]=useState(false),[scrolled,setScrolled]=useState(false),navRef=useRef<HTMLElement>(null),toggleRef=useRef<HTMLButtonElement>(null)
 const path=usePathname(),router=useRouter(),host=useScissorHost(),reduced=useReducedMotion()
 const root=basePath.replace(/\/en$/,'').replace(/\/$/,'');const pagePath=path.startsWith(root)?path.slice(root.length).replace(/^\/en(?=\/|$)/,''):path.replace(/^\/en(?=\/|$)/,'')
 const alternate=`${root}${locale==='zh'?'/en':''}${pagePath}`||'/'
 useEffect(()=>{document.documentElement.dataset.scissor='true';const onScroll=()=>setScrolled(window.scrollY>64);onScroll();window.addEventListener('scroll',onScroll,{passive:true});return()=>{delete document.documentElement.dataset.scissor;window.removeEventListener('scroll',onScroll)}},[])
 useEffect(()=>{
  if(!open)return
  const previous=document.body.style.overflow;document.body.style.overflow='hidden'
  const first=navRef.current?.querySelector<HTMLAnchorElement>('.sc-menu a');first?.focus()
  const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setOpen(false);toggleRef.current?.focus()}if(e.key==='Tab'){const all=Array.from(navRef.current?.querySelectorAll<HTMLElement>('a,button')??[]).filter(el=>el.getClientRects().length);const first=all[0],last=all.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus()}}}
  document.addEventListener('keydown',onKey);return()=>{document.body.style.overflow=previous;document.removeEventListener('keydown',onKey)}
 },[open])
 return <main className={`scissor sc-${locale}`} lang={locale==='zh'?'zh-CN':'en'}>
  <nav ref={navRef} className={`sc-nav ${scrolled||open||/\/(privacy|terms)$/.test(path)?'sc-nav-solid':''}`} aria-label={copy('主导航','Main navigation')[locale]}>
   <Link href={href(basePath)} onClick={()=>setOpen(false)}><Logo locale={locale} light/></Link>
   <div className="sc-desktop-nav">{navigation.map(n=><Link key={n.path} href={href(basePath,n.path)}>{n.label[locale]}</Link>)}</div>
   <div className="sc-nav-actions"><Link className="sc-language" href={alternate} onClick={e=>{e.preventDefault();router.push(alternate+window.location.search+window.location.hash)}} aria-label={copy('切换为英文','Switch to Chinese')[locale]}>{locale==='zh'?'EN':'中文'}</Link><Button to={href(basePath,'contact')}>{book[locale]}</Button><button ref={toggleRef} type="button" className={`sc-menu-toggle ${open?'active':''}`} onClick={()=>setOpen(!open)} aria-expanded={open} aria-controls="sc-menu" aria-label={open?copy('关闭菜单','Close menu')[locale]:copy('打开菜单','Open menu')[locale]}><span/><span/></button></div>
   <AnimatePresence>{open&&<motion.div className="sc-menu" id="sc-menu" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}} transition={{duration:reduced?0:.45,ease:motionTokens.ease}}>{navigation.map((n,i)=><motion.div key={n.path} initial={{y:20,opacity:0}} animate={{y:0,opacity:1}} transition={{delay:reduced?0:i*.06}}><Link href={href(basePath,n.path)} onClick={()=>setOpen(false)}>{n.label[locale]}</Link></motion.div>)}<Button to={href(basePath,'contact')} onClick={()=>setOpen(false)}>{book[locale]}</Button></motion.div>}</AnimatePresence>
  </nav>
  <motion.div key={path} initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{duration:reduced?0:.45,ease:motionTokens.ease}}>{children}</motion.div>
  <footer className="sc-footer"><div className="sc-footer-cta"><h2>{copy('准备好迎接新造型了吗','Ready for your next cut?')[locale]}</h2><Button to={href(basePath,'contact')}>{book[locale]}</Button></div><div className="sc-footer-grid"><div><Link href={href(basePath)}><Logo locale={locale} light/></Link><p>{copy('一间欢迎每个人的发型工作室。剪发、染发与理容，照顾每一种发质。','A hair studio in Brooklyn. Cuts, colour and grooming for every head of hair.')[locale]}</p></div><div><small>{copy('探索','Explore')[locale]}</small>{navigation.map(n=><Link key={n.path} href={href(basePath,n.path)}>{n.label[locale]}</Link>)}<Link href={href(basePath,'#reviews')}>{copy('顾客评价','Reviews')[locale]}</Link><Link href={href(basePath,'#faq')}>FAQ</Link></div><div><small>{copy('到访','Visit')[locale]}</small><p>{brand.address[locale]}</p><p>{brand.hours[locale]}</p></div><div><small>{copy('联系','Contact')[locale]}</small><a href={brand.phoneHref}>{brand.phone}</a><a href={`mailto:${brand.email}`}>{brand.email}</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram</a></div></div><div className="sc-footer-bottom"><span>© {brand.year} {host.brandName?.[locale]??brand.name[locale]}</span><Link href={href(basePath,'privacy')}>{copy('隐私政策','Privacy')[locale]}</Link><Link href={href(basePath,'terms')}>{copy('服务条款','Terms')[locale]}</Link>{host.marketplaceHref&&<Link href={host.marketplaceHref}>{host.marketplaceLabel?.[locale]}</Link>}{host.filing}</div></footer>
  {host.marketplaceHref&&<Link className="sc-market" href={host.marketplaceHref} aria-label={host.marketplaceAriaLabel?.[locale]}>{host.lightLogo&&<img src={host.lightLogo} alt=""/>}<span>{host.brandName?.[locale]}</span></Link>}
 </main>
}
