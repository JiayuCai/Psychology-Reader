# Annual Review of Psychology 精读网页 Demo 实施计划

## Summary

目标是先交付一个**可分享、但不完全公开的静态网页 demo**，展示 `Annual Review of Psychology` `2026` 年卷的真实文章条目与 `Introduction` 条目，并为每篇条目展示**占位版**精读结果。首版重点验证信息架构、交互方式和页面可读性，不在本阶段打通真实 summary / 精读流水线。

交付结果采用 `Vite + React + TypeScript` 的静态 SPA 方案，数据来自项目内本地 JSON，因此可以：

- 本地运行预览
- 构建为静态产物
- 部署到任意静态托管平台
- 后续平滑替换为真实检索和 `paper-deep-reading` 结果
- 在部署层叠加“共享密码页”而不把访问控制逻辑写死在应用代码里

## Current State Analysis

- 当前仓库是一个近乎空白的工作区，没有现成前端项目、构建工具或页面代码。
- 当前项目根目录只有若干 PDF、`.gitignore` 与 `.trae/skills/`。
- 已有可复用的跨学科精读 Skill：`/Users/joyce/Desktop/Divorce/.trae/skills/paper-deep-reading/SKILL.md`
- 项目记忆已确认两条与本任务直接相关的约束：
  - 文献精读框架最终必须兼容 `L1-L5`
  - `Annual Reviews` 之类站点若要抓正文，抓取优先级需要明确设计
- 用户已确认的产品决策：
  - 首版 demo 只做 `2026` 年真实条目
  - 精读内容先用占位版，只看排版和交互
  - 页面必须支持点击、搜索、年份切换、原文链接跳转
  - 首版希望可部署为可分享网页，但不完全公开
  - 前端实现接受 `React SPA + 本地 JSON`
  - 网页正文抓取策略优先 `Firecrawl`
  - 访问控制方式选择“共享密码页”
  - 当前不绑定具体部署平台

## Proposed Changes

### 1. 初始化静态前端工程

#### Create: `/Users/joyce/Desktop/Divorce/package.json`

用途：

- 定义 `Vite + React + TypeScript` 的依赖和脚本
- 提供 `dev / build / preview` 三个基本命令

决策：

- 使用 `Vite` 而不是 `Next.js`
- 原因是本阶段没有服务端抓取、鉴权或 SSR 需求，静态 SPA 更轻、更快、更容易部署

#### Create: `/Users/joyce/Desktop/Divorce/tsconfig.json`
#### Create: `/Users/joyce/Desktop/Divorce/tsconfig.node.json`
#### Create: `/Users/joyce/Desktop/Divorce/vite.config.ts`
#### Create: `/Users/joyce/Desktop/Divorce/index.html`

用途：

- 完成前端工程最小运行骨架
- 为后续部署保持标准 Vite 结构

### 2. 建立可复用的数据模型

#### Create: `/Users/joyce/Desktop/Divorce/public/data/annual-review-psychology.json`

用途：

- 存放 demo 期的展示数据
- 作为未来接入自动检索与精读结果的稳定接口

数据结构决定如下：

- 顶层包含刊名、来源说明、更新时间
- 使用 `years` 数组存储年份分组
- 每个年份包含：
  - `year`
  - `entries`
- 每个 `entry` 包含：
  - `id`
  - `kind`：`introduction | article`
  - `title`
  - `authors`
  - `year`
  - `doi`
  - `articleUrl`
  - `abstract`
  - `readingStatus`：`placeholder | ready`
  - `deepReading`

`deepReading` 在 demo 阶段固定兼容 `L1-L5`：

- `l1ProblemFraming`
- `l2CoreArgument`
- `l3ConceptHandles`
- `l4DisciplinaryFeedback`
- `l5PivotalRefs`

首版内容范围：

- `2026` 年 `Annual Review of Psychology`
- 包含 `Introduction`
- 其余条目使用真实标题、作者、DOI / 页面链接、摘要
- 精读字段填充占位文本，以验证排版与信息密度

说明：

- 这里不在首版加入自动抓取脚本
- 首版数据采用一次性整理写入本地 JSON
- 后续如果要复用到更多年份，再补数据生产脚本
- 一旦进入真实正文抓取阶段，默认抓取优先级为：
  - `Firecrawl scrape(markdown)`：抓取整页正文
  - `Firecrawl extract`：把正文或页面信息抽成结构化字段
  - `Playwright MCP`：仅在 `Firecrawl` 无法稳定获取正文、页面强依赖动态渲染或需要交互后内容时兜底

### 3. 定义前端类型与数据访问层

#### Create: `/Users/joyce/Desktop/Divorce/src/types/review.ts`

用途：

- 为年份、文章条目、深读结构定义 TypeScript 类型
- 保证页面组件只依赖稳定的数据契约

#### Create: `/Users/joyce/Desktop/Divorce/src/lib/loadReviewData.ts`

用途：

- 统一读取 `public/data/annual-review-psychology.json`
- 做轻量归一化处理

处理规则：

- 默认按年份倒序
- 每个年份内部将 `Introduction` 固定排在最前
- 若后续加入多年份，当前页面逻辑无需改结构

### 4. 构建页面骨架与交互

#### Create: `/Users/joyce/Desktop/Divorce/src/main.tsx`
#### Create: `/Users/joyce/Desktop/Divorce/src/App.tsx`

用途：

- 作为 SPA 入口
- 承载全局状态：
  - 当前年份
  - 搜索词
  - 当前选中文章
  - 数据加载状态

交互决策：

- 顶部使用**年份标签切换**
- 左侧为**可搜索的文章列表**
- 右侧为**基础信息 + 精读详情**

### 5. 拆分展示组件

#### Create: `/Users/joyce/Desktop/Divorce/src/components/YearTabs.tsx`

用途：

- 展示年份标签
- 切换当前年份

交互规则：

- 首版即使只有 `2026` 一个年份，也按最终形态保留标签组件
- 为后续接入多年份做准备

#### Create: `/Users/joyce/Desktop/Divorce/src/components/SearchInput.tsx`

用途：

- 提供搜索框

搜索规则：

- 搜索范围覆盖当前年份下的：
  - 标题
  - 作者
  - DOI
- 搜索结果仅影响左侧列表，不改变右侧排版结构

#### Create: `/Users/joyce/Desktop/Divorce/src/components/PaperSidebar.tsx`

用途：

- 展示当前年份文章列表
- 支持点击切换选中文章

交互规则：

- `Introduction` 作为普通条目出现，但视觉上加轻微标识
- 选中项高亮
- 列表中展示：
  - 标题
  - 作者摘要行
  - `Introduction` 或 `Article` 标签

#### Create: `/Users/joyce/Desktop/Divorce/src/components/PaperDetail.tsx`

用途：

- 展示右侧详情面板

详情结构固定为：

- 标题
- 作者
- 年份
- DOI
- 跳转原文按钮
- 摘要
- `L1-L5` 精读区块

demo 阶段规则：

- 所有精读区块显示占位内容
- 视觉上按正式内容标准排版，不使用 skeleton，而是显示“占位版精读”文案

#### Create: `/Users/joyce/Desktop/Divorce/src/components/InfoBadge.tsx`

用途：

- 统一显示 `Introduction / Article / Placeholder` 等状态标签

### 6. 样式与可读性优化

#### Create: `/Users/joyce/Desktop/Divorce/src/styles/global.css`

用途：

- 管理全局样式

样式决策：

- 使用简洁、高可读性的学术阅读风格
- 双栏布局：
  - 左侧窄栏列表
  - 右侧宽栏内容
- 页面宽度适配桌面端优先
- 字号与行高偏阅读友好
- 颜色采用中性浅色主题
- 链接、标签、当前选中态要有足够区分度

#### Create: `/Users/joyce/Desktop/Divorce/src/styles/layout.css`

用途：

- 管理布局与组件级样式

需要覆盖的重点：

- 年份标签区
- 搜索框
- 侧栏滚动区域
- 详情区标题层级
- `L1-L5` 内容块间距
- 移动端降级布局

响应式规则：

- 桌面端采用双栏
- 窄屏降为上下布局
- 侧栏在移动端转为顶部列表区

### 7. Demo 数据准备策略

#### Modify via content population: `/Users/joyce/Desktop/Divorce/public/data/annual-review-psychology.json`

首版数据准备方式：

- 从 `Annual Review of Psychology 2026` 目录页整理真实条目
- 至少包含：
  - `Introduction`
  - 若干篇代表性文章，建议直接纳入整卷目录，以确保侧栏形态接近真实使用

由于用户当前明确表示“summary 内容先忽略，先看网页长什么样”，本阶段精读内容策略如下：

- 摘要：尽量使用真实摘要
- `L1-L5`：统一使用占位内容
- 在详情页显式标注“Demo 占位内容，后续由 paper-deep-reading 结果替换”

#### Future-ready note: 正文抓取与精读生产链

虽然本次 demo 不实现真实 summary 提取，但后续正式版的数据生产链在本计划中提前锁定为：

- 第一步：用 `Firecrawl scrape` 抓文章正文或主内容
- 第二步：将抓取结果送入 `paper-deep-reading` 对齐 `L1-L5`
- 第三步：把结构化精读结果写回与前端兼容的 JSON
- 第四步：只有当 `Firecrawl` 因站点防护、动态渲染或页面结构异常失效时，才切换 `Playwright MCP`

这样可以确保前端数据格式在 demo 阶段就与后续正式流水线兼容。

### 8. 部署与私有分享准备

#### Create: `/Users/joyce/Desktop/Divorce/README.md`

用途：

- 说明本地运行方式
- 说明构建与部署方式

文档至少包含：

- 安装依赖
- 启动开发环境
- 生成静态产物
- 部署到静态托管平台的基本说明
- 如何在部署层加“共享密码页”的说明

说明：

- 首版不绑定某个平台专属配置
- 保持“任意静态托管平台都能部署”的中性方案
- 私有访问控制不写进业务应用逻辑，而是作为部署层能力处理

#### Private preview strategy

私有分享策略在首版中锁定为：

- 应用保持纯静态站，不引入站内账号系统
- 访问控制采用“共享密码页”模式
- 共享密码门由部署平台层实现，而不是在 React 应用内部自行伪造登录态

这样可以避免以下问题：

- 前端静态资源和 JSON 直接暴露给未授权访问者
- 把弱认证逻辑硬编码进业务页面
- 后续更换部署平台时需要重写页面代码

当前阶段有意不绑定具体平台，因此首版计划不加入某一平台专属文件；执行阶段只需根据最终选择的平台补最小部署配置。

## Assumptions & Decisions

- 首版目标是**展示层 demo**，不是完整数据生产系统
- 首版只纳入 `2026` 年真实条目，不自动抓取更多年份
- `Introduction` 作为和文章并列的独立条目进入列表
- 精读内容先占位，但字段结构必须对齐 `paper-deep-reading` 的 `L1-L5`
- 页面交互范围固定为：
  - 年份标签切换
  - 当前年份内搜索
  - 侧栏点击切换
  - 跳转原文链接
- 首版交付形态为**可部署静态站**
- 首版分享形态为**带共享密码门的私有预览站**
- 当前刻意不锁定 `Cloudflare / Netlify / 其他平台`
- 私有访问能力由部署层负责，应用层不自建登录系统
- 自动化抓取、真实精读生成、批量年份扩展均留到下一阶段，不并入本次 demo
- 下一阶段若接入真实正文提取，默认技术顺序为：
  - `Firecrawl scrape/extract`
  - `paper-deep-reading`
  - `Playwright MCP` 兜底

## Verification Steps

### 功能验证

- 页面能正常加载 `2026` 数据
- 顶部年份标签可显示当前年份
- 左侧列表展示 `Introduction` 与文章条目
- 点击任一条目后，右侧详情同步更新
- 搜索框能基于标题、作者、DOI 过滤列表
- 原文链接点击后可跳转到对应文章页面
- 精读区能稳定显示 `L1-L5` 占位结构

### 可读性验证

- 长标题在列表和详情区都不发生严重布局溢出
- 长摘要与多段精读内容保持舒适行宽和间距
- 选中态、标签态、链接态可清晰区分

### 工程验证

- `npm install` 成功
- `npm run dev` 可本地启动
- `npm run build` 能生成静态产物
- `npm run preview` 可验证构建产物

### 分享验证

- 构建后的静态文件不依赖服务端接口
- 静态站部署后页面可正常打开、切换条目、搜索、跳转链接
- 未通过共享密码门的访问者不能直接进入预览页面
