import type { SiteTemplate } from '../../types'
export const scissorTemplate: SiteTemplate = {
 id:'scissor',gitUrl:'https://github.com/weelume/scissor-template',name:'Scissor · 发型工作室',localizedNames:{en:'Scissor · Hair studio'},sceneId:'corporate-site',listed:false,
 tags:['发型沙龙','暖色极简','滚动动效','前后对比','中英文','PC / iPad / H5'],summary:'暖色发型工作室整站模板，包含服务价格、四位发型师详情、拖拽前后对比、弧形作品画册、预约演示与政策页面。',accentColor:'#90755e',
 cover:'/templates/scissor/screenshots/desktop-home.webp',screenshots:[{"src":"/templates/scissor/screenshots/desktop-home.webp","alt":"Scissor desktop home","device":"desktop","width":1430,"height":993},{"src":"/templates/scissor/screenshots/desktop-services.webp","alt":"Scissor desktop services","device":"desktop","width":1430,"height":993},{"src":"/templates/scissor/screenshots/desktop-stylists.webp","alt":"Scissor desktop stylists","device":"desktop","width":1430,"height":993},{"src":"/templates/scissor/screenshots/desktop-contact.webp","alt":"Scissor desktop contact","device":"desktop","width":1430,"height":993},{"src":"/templates/scissor/screenshots/tablet-home.webp","alt":"Scissor tablet home","device":"tablet","width":824,"height":1166},{"src":"/templates/scissor/screenshots/tablet-services.webp","alt":"Scissor tablet services","device":"tablet","width":824,"height":1166},{"src":"/templates/scissor/screenshots/tablet-stylists.webp","alt":"Scissor tablet stylists","device":"tablet","width":824,"height":1166},{"src":"/templates/scissor/screenshots/tablet-contact.webp","alt":"Scissor tablet contact","device":"tablet","width":824,"height":1166},{"src":"/templates/scissor/screenshots/mobile-home.webp","alt":"Scissor mobile home","device":"mobile","width":380,"height":822},{"src":"/templates/scissor/screenshots/mobile-services.webp","alt":"Scissor mobile services","device":"mobile","width":380,"height":822},{"src":"/templates/scissor/screenshots/mobile-stylists.webp","alt":"Scissor mobile stylists","device":"mobile","width":380,"height":822},{"src":"/templates/scissor/screenshots/mobile-contact.webp","alt":"Scissor mobile contact","device":"mobile","width":380,"height":822}],
 surfaces:[{id:'site',name:'官网',platform:'pc',locales:['zh','en'],pages:[
  {slug:'',title:'首页',localizedTitles:{en:'Home'},load:()=>import('./pages/Home')},
  {slug:'about',title:'关于',localizedTitles:{en:'About'},load:()=>import('./pages/About')},
  {slug:'services',title:'服务',localizedTitles:{en:'Services'},load:()=>import('./pages/Services')},
  {slug:'stylists',title:'发型师',localizedTitles:{en:'Stylists'},load:()=>import('./pages/Stylists')},
  {slug:'stylists/priya-shah',title:'Priya Shah',load:()=>import('./pages/Stylist').then(m=>({default:m.Priya}))},
  {slug:'stylists/jonah-kim',title:'Jonah Kim',load:()=>import('./pages/Stylist').then(m=>({default:m.Jonah}))},
  {slug:'stylists/ava-laurent',title:'Ava Laurent',load:()=>import('./pages/Stylist').then(m=>({default:m.Ava}))},
  {slug:'stylists/marcus-reid',title:'Marcus Reid',load:()=>import('./pages/Stylist').then(m=>({default:m.Marcus}))},
  {slug:'contact',title:'联系预约',localizedTitles:{en:'Contact'},load:()=>import('./pages/Contact')},
  {slug:'privacy',title:'隐私政策',localizedTitles:{en:'Privacy'},load:()=>import('./pages/Legal').then(m=>({default:m.Privacy}))},
  {slug:'terms',title:'服务条款',localizedTitles:{en:'Terms'},load:()=>import('./pages/Legal').then(m=>({default:m.Terms}))},
 ]}],
}
