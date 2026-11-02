# 修改指南

品牌修改 config.ts；双语文案、服务价格、发型师和作品修改 content.ts。颜色、容器、字号、玻璃背景、滚动条在 theme.css 的 .scissor 主题变量中集中管理。页面增删需同步 meta.ts、.tpl/template.json 和实际路由。

图片在 public/templates/scissor/images 中本地托管，替换时更新 ASSETS.json。动效在 components/ 下按职责维护，不用统一淡入覆盖滚动驱动效果。表单的演示语义必须保留，正式发送需显式设计应用服务并更新政策。

检查命令见 project.json。截图尺寸必须按真实文件解码登记，不假定等于设置视口。不得为装饰新增箭头、引入依赖或硬编码宿主路径。
