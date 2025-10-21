# Zendesk Support Suite · 原型演示说明

该目录提供 Zendesk Support Suite 的高保真 HTML 原型，覆盖客服代表、客服主管、运营分析师三个角色的核心场景。使用浏览器打开任意 HTML 文件即可体验角色切换、左侧菜单联动和跨页面导航。

## 可用页面
- `index.html`：全局概览控制台，可切换角色查看差异化指标与待办。
- 客服代表视角：`agent-workspace.html`、`live-chat-console.html`、`customer-360.html`、`ticket-detail.html`。
- 客服主管视角：`queue-monitor.html`、`sla-planning.html`、`quality-review.html`。
- 运营分析师视角：`analytics-insights.html`、`channel-analytics.html`、`automation-performance.html`、`automation-rule-editor.html`。

所有页面默认保留原型导航浮动菜单（通过 `../../menu.js` 注入），右上角角色切换按钮会同步刷新左侧菜单内容并控制页面内模块的显示。通过页面内按钮可跳转到相关功能页面，演示从监控到执行的完整业务闭环。
