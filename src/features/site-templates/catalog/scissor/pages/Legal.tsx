'use client'
import type { SiteTemplatePageProps } from '../../../types'
import { brand,copy } from '../config'
import { Shell } from '../components/Layout'
import { Label } from '../components/Primitives'
const privacy = [
 [copy('收集的信息','Information we collect'),copy('实际预约业务可能需要姓名、电话、邮箱、期望日期、服务和备注。本模板的演示表单仅在浏览器本地进行校验，不发送、不保存这些信息。','An operational booking service may need your name, phone, email, preferred date, service and notes. This template form only validates locally in your browser; it does not send or save these details.')],
 [copy('信息用途','How we use it'),copy('正式接入预约系统后，应仅将预约资料用于确认、管理、回答问题和提醒，不出售资料或用于无关营销。','When a booking system is connected, details should only be used to manage appointments, answer questions and send reminders, never sold or used for unrelated marketing.')],
 [copy('Cookie 与分析','Cookies and analytics'),copy('本模板不主动设置分析 Cookie 或连接第三方统计服务。部署方启用分析服务时应更新本政策。','This template does not set analytics cookies or connect third party tracking. Operators must update this policy if analytics are enabled.')],
 [copy('信息共享','Sharing your information'),copy('当前演示不向第三方发送表单信息。后续接入预约或邮件服务时，应说明服务商、目的和必要的数据范围。','The demonstration does not send form information to third parties. Any future booking or email integration must disclose providers, purposes and the minimum necessary data.')],
 [copy('保存期限','How long we keep it'),copy('演示不保存预约资料。正式业务应说明保存期限，并在不再需要时及时删除。','No booking details are stored by this demo. A live business must state retention periods and delete information when it is no longer needed.')],
 [copy('你的权利','Your rights'),copy('你可联系工作室了解数据处理情况，并请求访问、更正或删除实际保存的资料。','Contact the studio to ask about data handling or request access, correction or deletion of any information actually held.')],
 [copy('联系我们','Contact us'),copy(`有关政策的问题，可发送邮件至 ${brand.email}。`,`Questions about this policy? Email ${brand.email}.`)],
]
const terms = [
 [copy('预约','Bookings'),copy('真实预约需经电话或邮件确认。本模板的本地校验结果不代表预约成功，也不会占用座位。','Real appointments require confirmation by phone or email. Local form validation does not create an appointment or hold a chair.')],
 [copy('取消与迟到','Cancellations and late arrivals'),copy('取消或改期请至少提前 24 小时通知。迟到超过 15 分钟可能需要缩短服务或改期。','Please give at least 24 hours notice to cancel or move an appointment. Arriving more than 15 minutes late may require a shorter service or rebooking.')],
 [copy('价格与付款','Prices and payment'),copy('网站价格为起价，最终价格在咨询时确认。演示网站不处理付款。','Prices shown are starting prices, confirmed at consultation. This demonstration website does not process payments.')],
 [copy('皮肤测试','Patch tests'),copy('首次染发前至少 48 小时进行皮肤测试，约需五分钟。','A patch test is required at least 48 hours before a first colour appointment and takes around five minutes.')],
 [copy('服务调整','If you are not happy'),copy('如对真实服务不满意，请在七日内联系工作室协商调整。','If you are not happy with an actual service, contact the studio within seven days to discuss an adjustment.')],
 [copy('礼品卡','Gift cards'),copy('礼品卡示例有效期为 12 个月，不可兑换现金。具体条款以实际发行方说明为准。','Example gift cards are valid for 12 months and cannot be exchanged for cash. Actual issuer terms take precedence.')],
 [copy('网站内容','Website content'),copy('参考设计、照片和文字的权利归原权利人。本工程不提供超出权利人许可范围的再分发授权。','Reference designs, photos and text remain the property of their rights holders. This project does not grant redistribution rights beyond the original permissions.')],
 [copy('条款更新','Changes to these terms'),copy('条款更新时，应同步更新页面顶部日期。正式使用前应由实际运营方审阅政策和条款。','Update the date above when these terms change. The actual operator should review all policies and terms before live use.')],
 [copy('联系','Contact us'),copy(`有关条款的问题，请联系 ${brand.email}。`,`Questions about these terms? Contact ${brand.email}.`)],
]
function Legal({kind,locale='zh',basePath}:SiteTemplatePageProps&{kind:'privacy'|'terms'}) {const sections=kind==='privacy'?privacy:terms;return <Shell locale={locale} basePath={basePath}><section className="sc-legal-header"><Label number="01">{copy('政策与条款','Legal')[locale]}</Label><h1>{(kind==='privacy'?copy('隐私政策','Privacy policy'):copy('服务条款','Terms of service'))[locale]}</h1><p>{copy('更新于 2026 年 11 月 · 模板演示政策','Updated November 2026 · Template demonstration policy')[locale]}</p></section><article className="sc-legal"><p>{copy('以下说明适用于本模板的本地演示。正式上线前，请根据实际数据处理方式与服务流程调整。','The following applies to this local template demonstration. Before going live, adapt it to your actual data handling and service procedures.')[locale]}</p>{sections.map(([title,text],i)=><section key={title.en}><h2>{i+1}. {title[locale]}</h2><p>{text[locale]}</p></section>)}<aside><h3>{copy('还有疑问','Questions?')[locale]}</h3><p>{copy('欢迎联系工作室。','Email the studio and a real person will reply.')[locale]}</p><a className="sc-button" href={`mailto:${brand.email}`}>{copy('邮件联系','Email the studio')[locale]}</a></aside></article></Shell> }
export function Privacy(props:SiteTemplatePageProps){return <Legal {...props} kind="privacy"/>}
export function Terms(props:SiteTemplatePageProps){return <Legal {...props} kind="terms"/>}
