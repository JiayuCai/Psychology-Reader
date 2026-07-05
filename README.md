# Annual Review of Psychology 精读网页 Demo

一个可部署的静态网页 demo，用来展示 `Annual Review of Psychology` 2026 年卷的真实条目、`Introduction`、基础信息、摘要与占位版 `L1-L5` 精读结构。

## 当前能力

- 顶部年份标签切换
- 侧栏条目列表
- 标题 / 作者 / DOI 搜索
- 右侧详情区展示基础信息、摘要与占位版精读结构
- 原文跳转链接
- 前端数据来自本地 JSON，后续可替换为真实 `Firecrawl + paper-deep-reading` 产物

## 本地运行

```bash
npm install
npm run dev
```

默认开发地址通常为：

```text
http://localhost:5173
```

## 质量检查

```bash
npm test
npm run check
npm run lint
npm run build
```

## 生成静态产物

```bash
npm run build
npm run preview
```

构建结果位于：

```text
dist/
```

## 数据文件

当前 demo 数据位于：

```text
public/data/annual-review-psychology.json
```

字段已经为后续真实精读结果预留了 `L1-L5` 结构：

- `l1ProblemFraming`
- `l2CoreArgument`
- `l3ConceptHandles`
- `l4DisciplinaryFeedback`
- `l5PivotalRefs`

## 私有分享建议

当前应用保持为**纯静态站**，不把认证逻辑写死在 React 页面里。若你不希望完全公开，建议在部署层加一层“共享密码页”。

这样做的好处是：

- 不污染业务代码
- 更换托管平台时不需要重写页面逻辑
- 页面本体仍然保持静态可部署

## 部署思路

本项目不绑定单一平台，静态产物可以部署到任意静态托管服务。

建议的部署步骤：

1. 本地执行 `npm run build`
2. 将 `dist/` 部署到静态托管平台
3. 在平台侧为站点增加“共享密码页”或等效访问控制
4. 将链接和共享密码发给指定查看者

## 下一阶段可扩展项

- 扩展到多个年份
- 使用 `Firecrawl scrape/extract` 抓取文章正文
- 使用 `paper-deep-reading` 生成真实 `L1-L5` 内容
- 将正文与精读结果自动写回 JSON 数据文件
