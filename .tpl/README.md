# Scissor 发型工作室模板

基于 React / Next.js / TypeScript / framer-motion 的响应式双语整站。含首页、关于、服务、发型师列表、四个详情、联系与两份政策，共 11 页和 22 条语言路由。

先读 template.json、project.json、docs/ARCHITECTURE.md、CUSTOMIZATION.md、VERIFICATION.md 与 LICENSE.md。

Node 24.16.0，pnpm 9.15.4。安装：`pnpm install --frozen-lockfile`；开发：`pnpm dev`；生产：`pnpm build`、`pnpm start`。默认 http://localhost:43302，英文 /en；PORT 可覆盖端口。Ctrl+C 停止。构建在本地 Linux 文件系统进行。

验证：`pnpm typecheck`、`pnpm lint`、`pnpm test`、`pnpm build`；协议：`pnpm tpl:check`。检查不会自动发布或推送。

可编辑品牌在 config.ts，文案和业务数据在 content.ts，样式在 theme.css，交互在 components/，页面在 pages/。相对 src/features/site-templates/catalog/scissor。

表单只做本地校验，不发送、不保存、不处理付款。演示价格、地址与评价不代表真实营业服务。正式使用应审阅政策并连接实际预约系统。

共享包通过 /template 与 /host 导出元数据和宿主品牌适配。运行素材位于 public/templates/scissor；市场截图位于 assets。

源码与原参考设计、图片、字体的权利分别处理。用户已于 2026-11-02 确认有模板和素材的再分发授权；字体许可见各字体目录，其他权利说明见 LICENSE.md。
