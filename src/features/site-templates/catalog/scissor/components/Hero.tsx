'use client'
import { AnimatePresence,motion,useReducedMotion } from 'framer-motion'
import { useEffect,useState } from 'react'
import { book,copy,image,motionTokens,type Copy } from '../config'
import { heroPhotos } from '../content'
import { Button,Label,href,type ContextProps } from './Primitives'
export function Hero({locale,basePath,title,text,label,photo,ctaHref,ctaText}:{title?:Copy;text?:Copy;label?:Copy;photo?:string;ctaHref?:string;ctaText?:Copy}&ContextProps) {
 const [active,setActive]=useState(0),reduced=useReducedMotion()
 const photos=photo?[photo]:heroPhotos
 useEffect(()=>{if(reduced||photos.length<2)return;const timer=setInterval(()=>{if(!document.hidden)setActive(i=>(i+1)%photos.length)},motionTokens.slideInterval);return()=>clearInterval(timer)},[active,reduced,photos.length])
 const headline=title??copy('好发型的艺术','The art of great hair.')
 return <section id="hero" className={`sc-hero ${photo?'sc-inner-hero':''}`} aria-label={copy('介绍','Introduction')[locale]}>
  <div className="sc-hero-photos" role="region" aria-roledescription="carousel" aria-label={copy('工作室照片','Studio photos')[locale]}>
   <AnimatePresence initial={false}><motion.div key={active} className="sc-hero-photo" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} transition={{duration:reduced?0:motionTokens.slideFade,ease:motionTokens.fadeEase}}><motion.img src={photos[active]} alt={copy('拱形镜面与暖光中的发型工作室','Hair studio with backlit arched mirrors')[locale]} initial={{scale:reduced?1:motionTokens.slideZoom}} animate={{scale:1}} transition={{duration:6.4,ease:'linear'}}/></motion.div></AnimatePresence>
   {photos.length>1&&<div className="sc-dots">{photos.map((_,i)=><button type="button" key={i} onClick={()=>setActive(i)} aria-label={`${copy('显示照片','Show photo')[locale]} ${i+1}`} aria-pressed={active===i} />)}</div>}
  </div><div className="sc-hero-shade"/>
  <div className="sc-hero-content"><Label number="01">{(label??copy('布鲁克林发型工作室','Hair studio, Brooklyn'))[locale]}</Label><h1>{headline[locale].split(locale==='zh'?'\n':' ').map((w,i)=><span className="sc-word-mask" key={i}><motion.span initial={reduced?false:{y:50,opacity:.001,filter:'blur(10px)'}} animate={{y:0,opacity:1,filter:'blur(0px)'}} transition={{duration:1,delay:.2+i*.08,ease:motionTokens.ease}}>{w}{locale==='en'?' ':''}</motion.span></span>)}</h1><motion.p initial={reduced?false:{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.4,ease:motionTokens.ease}}>{(text??copy('剪发、染发与理容，照顾每一种发质。为你的纹理、生活方式和真正想要的造型而设计。','Cuts, colour and grooming for every head of hair. Tailored to your texture, your lifestyle and the look you actually want.'))[locale]}</motion.p><motion.div className="sc-hero-buttons" initial={reduced?false:{opacity:0,y:24}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.55,ease:motionTokens.ease}}><Button to={ctaHref??href(basePath,'contact')}>{(ctaText??book)[locale]}</Button>{!photo&&<Button to={href(basePath,'#services')} secondary>{copy('探索服务','Explore services')[locale]}</Button>}</motion.div></div>
  {!photo&&<motion.div className="sc-popular" initial={reduced?false:{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:1,delay:.7,ease:motionTokens.ease}}><a href={href(basePath,'#services')}><img src={image('wylMQVOmaT6gfD7gGw6c2NuZ7CM')} alt={copy('清爽渐变与胡须造型','Fresh skin fade and beard')[locale]}/><div><small>{copy('本周人气之选','Most booked this week')[locale]}</small><h3>{copy('渐变短发与胡须','Skin fade and beard')[locale]}</h3><small>{copy('45 分钟，$55 起','45 min, from $55')[locale]}</small></div></a></motion.div>}
 </section>
}
