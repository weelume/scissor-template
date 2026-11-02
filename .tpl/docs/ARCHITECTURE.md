# 架构

应用路由 src/app/[[...slug]]/page.tsx 只解析语言和页面；meta.ts 为页面注册唯一入口。页面组合使用 components/ 的公共模块。config.ts 维护品牌、主题相关参数与动效节奏，content.ts 维护中英数据。host.tsx 通过 React Context 注入可选品牌与平台入口，不反向依赖宿主。theme.css 样式限定在 .scissor，html 的主题滚动条只在挂载期间开启。

Hero 使用交叉淡化与缩放；ScrollText 按滚动进度逐词亮起；VisitCard 仅桌面按滚动驱动弹簧上移；Lookbook 使用原生 sticky 与 MotionValue 驱动环形弧线。减少动态效果时关闭循环、滚动变换和过渡。
