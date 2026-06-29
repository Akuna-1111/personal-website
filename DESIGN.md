---
name: 郑彬坤个人作品集
description: 空间设计师个人作品集网站 — 暗色策展人空间，信标绿引导，作品即内容
colors:
  beacon-green: "#00cc00"
  green-hover: "#00dd00"
  green-deep: "#008800"
  error-red: "#ff6b6b"
  void-black: "#000000"
  surface-sheet: "#0d0d0d"
  mist-white: "#e8ecf1"
  steel-gray: "#9aa4b8"
  shadow-gray: "#6e7a94"
  deep-gray: "#6a7a90"
typography:
  display:
    fontFamily: "'Noto Serif SC', 'Noto Sans SC', serif"
    fontSize: "clamp(2.5rem, 7vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.2
    note: "首页Hero英文名专用。Noto Serif SC 仅限 Display 层级使用，全站其他文字统一 Noto Sans SC。"
  headline:
    fontFamily: "'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.5rem, 4vw, 2.25rem)"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "0.06em"
  title:
    fontFamily: "'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Noto Sans SC', system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.1em"
    textTransform: "uppercase"
rounded:
  sm: "8px"
  md: "10px"
  lg: "12px"
  xl: "14px"
  2xl: "16px"
  pill: "50px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.beacon-green}"
    textColor: "{colors.void-black}"
    rounded: "{rounded.md}"
    padding: "14px 40px"
  button-primary-hover:
    backgroundColor: "{colors.green-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mist-white}"
    rounded: "{rounded.md}"
    padding: "6px 16px"
  input-default:
    backgroundColor: "rgba(255,255,255,0.03)"
    textColor: "{colors.mist-white}"
    rounded: "{rounded.md}"
    padding: "14px 18px"
  input-focus:
    backgroundColor: "rgba(0,204,0,0.04)"
  card-default:
    backgroundColor: "rgba(255,255,255,0.02)"
    rounded: "{rounded.2xl}"
  badge-outline:
    backgroundColor: "transparent"
    textColor: "{colors.beacon-green}"
    rounded: "{rounded.pill}"
---

# Design System: 郑彬坤个人作品集

## 1. Overview

**Creative North Star: "策展人空间 (The Curator's Space)"**

设计师以策展人身份呈现作品。暗色空间如同专业画廊——纯黑背景是展墙，信标绿是引导视线的策展线索。每件作品在自己的区域中独立呼吸，不争夺注意力。观众（潜在客户）在这个空间中自由浏览，通过作品本身建立对设计师能力的判断。

这个视觉系统建立在一个核⼼张⼒上：背景是绝对的存在（纯黑 #000），品牌色是克制的信号（信标绿 #00cc00，≤10% 画⾯占⽐）。层次不靠阴影，而靠边框透明度的微妙变化——这与幻灯⽚式排版中常见的投影、渐变、装饰性分割线截然不同。Web 原⽣的滚动叙事替代了翻页式的 PPT 节奏。

**Key Characteristics:**
- 暗色为底，作品为光 — #000 背景让图像成为绝对焦点
- 信标绿作为唯一品牌锚点 — 出现在标签、按钮、边框、hover态，每次出现都有明确目的
- 扁平靠边框 — 无阴影，深度通过 border 透明度（0.06→0.2→0.3→1.0）建立
- 单字体系统 — Noto Sans SC 覆盖全部层级，靠字重和大小建立节奏
- 克制动效 — 0.25s-0.5s cubic-bezier 过渡，无弹跳无弹性

## 2. Colors: The Beacon in Void

暗色画廊中，信标绿是唯一的色彩信号。中性灰阶从虚空黑展开至雾白，承载信息层级。

### Primary
- **Beacon Green** (#00cc00): 唯一的品牌锚点。用于按钮填充、active 边框、标签文字、进度条、回顶按钮。占画面 ≤10%，稀缺即价值。
- **Green Hover** (#00dd00): Beacon Green 的 hover 态 —— 微亮。用于所有绿色元素的 hover 反馈。
- **Green Deep** (#008800): 仅用于 logo 圆形渐变（radial-gradient 外侧色），不单独使用。
- **Error Red** (#ff6b6b): 表单提交失败的错误消息文字。仅此一处使用，不作为通用设计元素。

### Neutral
- **Void Black** (#000000): 页面背景。绝对的黑色，不掺杂任何色调。
- **Surface Sheet** (#0d0d0d): 弹窗、模态框背景。比 Void Black 微亮一层，暗示"浮起"。
- **Mist White** (#e8ecf1): 主要文字色。标题、正文、导航hover态。亮度足够但非纯白，避免刺眼。
- **Steel Gray** (#9aa4b8): 次要文字色。导航默认态、正文辅助信息。
- **Shadow Gray** (#6e7a94): 三级文字/标签色。描述文字、日期、图标颜色。是文字层级的最暗端。
- **Deep Gray** (#6a7a90): 输入框 placeholder 色。仅此一处使用。

### Transparent Surfaces & Borders (非 token，模式级描述)
- Surface fill: `rgba(255,255,255,0.02)` — 卡片默认背景
- Surface elevated: `rgba(255,255,255,0.03)` — 输入框、摘要、高亮区背景
- Surface green-tinted: `rgba(0,204,0,0.04–0.08)` — 绿色关联区背景（图标、hover态）
- Border default: `rgba(255,255,255,0.06)` — 卡片、标签边框
- Border stronger: `rgba(255,255,255,0.08)` — 输入框边框
- Border green-subtle: `rgba(0,204,0,0.15–0.2)` — hover 态绿色边框
- Border green-active: `rgba(0,204,0,0.3)` — 激活态绿色边框

### Named Rules
**The Signal Rule.** Beacon Green 在任一屏幕上占比不超过 10%。它是信标，不是环境光。空间留给作品，绿色只负责引导视线到关键交互点。

**The Border-Only Depth Rule.** 层次不靠 box-shadow。卡片、输入框、面板之间的深度差异通过 border 透明度表达：默认 0.06 → hover 0.2-0.3 → active 1.0（Beacon Green）。这条规则直接呼应 PRODUCT.md 的 anti-PPT 要求 —— 幻灯片靠投影，Web 靠边框。

## 3. Typography

**Display/Headline/Body Font:** Noto Sans SC (with system-ui, -apple-system, sans-serif fallback)
**Display Accent:** Noto Serif SC — 仅限首页 Hero 英文名（如 "ZHENG BINKUN"），全站其他元素禁止使用
**Label Font:** 同 Noto Sans SC，靠大小写和字间距区分

**Character:** 以 Noto Sans SC 为纪律基础，Noto Serif SC 仅作为 Display 层的点睛之笔。Serif 的笔画对比度为 Hero 大标题带来一丝经典气质，但不蔓延到任何其他层级。这种"一个例外"的策略比"允许混搭"更严格——Serif 的出现本身就是信号：这是页面唯一最重要的文字。

### Hierarchy
- **Display** (500, clamp(2.5rem, 7vw, 5rem), 1.2): 首页 Hero 主标题。英文名/标题大字。不使用 letter-spacing。
- **Headline** (600, clamp(1.5rem, 4vw, 2.25rem), 1.3, letter-spacing 0.06em): Section 标题。中英双语翻转标题（hover 触发 rotateX）。居中显示，无下划线。
- **Title** (600, 1.25rem, 1.4): 卡片标题、面板内标题、项目名。
- **Body** (400, 1rem, 1.5): 正文字。最大行宽 65-75ch。项目描述、履历详情。
- **Label** (500, 0.75rem, 1.4, letter-spacing 0.1em, uppercase): 英文标签、分类名、按钮文字、面包屑导航。

### Named Rules
**The Display Accent Rule.** Noto Sans SC 是全站正文字体。唯一例外：首页 Hero 英文名（"ZHENG BINKUN"）使用 Noto Serif SC。Serif 不出现在任何其他位置——导航、卡片标题、正文、标签一律 Sans。这个限制让 Serif 的出现成为信号：这是页面唯一最重要的文字。

**The Bilingual Flip Rule (首页限定).** 中英双语标题仅在首页使用 rotateX 翻转动画。次级页面标题为标准静态文本。翻转动画 respect `prefers-reduced-motion`。

## 4. Elevation

**此系统不使用阴影。** 深度通过边框透明度变化表达（见 Colors: The Border-Only Depth Rule）。

用户hover时卡片可能上浮 2-3px（translateY），但浮起状态仍无阴影。回顶按钮 hover 时 scale(1.15)，靠缩放而非投影暗示"浮起"。

这是对 PRODUCT.md anti-PPT 要求的直接贯彻：幻灯片模板靠投影建立卡片感，Web 原生靠边框和位移。

### Elevation Ladder
- **Level 0 (Background):** Void Black，无边框，无填充
- **Level 1 (Surface):** 0.02 透明度填充 + 0.06 边框 → 卡片、标签页
- **Level 2 (Elevated):** 0.03 透明度填充 → 输入框、摘要面板
- **Level 3 (Modal):** #0d0d0d 背景 + 1px Beacon Green 边框 → 弹窗
- **Level 4 (Tooltip):** z-index 1041 → 移动端下拉菜单

## 5. Components

### Navigation (Top Bar)
固定顶栏，背景 `linear-gradient(to bottom, #000, transparent)`。桌面端链接居中，移动端汉堡菜单展开黑色全宽下拉。
- **Default link:** Steel Gray (#9aa4b8)，无下划线
- **Hover link:** Mist White (#e8ecf1)，底部 2px 白色下划线滑入 (`width: 0 → 100%`, 0.3s ease)
- **Active indicator:** 当前页链接底部 2px 常驻白线
- **Mobile dropdown:** Void Black 背景，1px 0.06 边框分隔线，链接居中 1.1rem

### Buttons

**Primary (填充):**
- 背景 Beacon Green，文字 Void Black，边框无 → solid fill
- Hover: Green Hover (#00dd00)，scale(1.02–1.03)
- Transition: 0.25s ease (background + transform)
- 用途: 联系表单提交、服务选择、支付提交

**Ghost (描边):**
- 透明背景，1px Beacon Green 边框（0.4 opacity），Beacon Green 文字
- Hover: Beacon Green 背景填充，Void Black 文字
- Transition: 0.3s ease
- 用途: 项目卡片 VIEW PROJECT 按钮

### Project Cards (Interiox-style)
作品缩略图卡片。图满铺，底部渐变蒙版（#000 0% → transparent 100%，默认 opacity 0.6 → hover 0.9）。
- **Shape:** 无圆角（border-radius: 0），直角呼应展览空间
- **Image hover:** scale(1.09)，0.5s ease
- **Content 区:** 绝对定位右下，hover 时上移至底部 80px（露出 VIEW PROJECT 按钮）
- **分类标签:** 0.75rem uppercase，Beacon Green，letter-spacing 0.12em
- **标题:** 1.25rem，600 weight，Mist White
- **移动端:** 统一 260px 高度，标题缩至 1rem

### Cards / Containers
通用容器模式。0.02 填充 + 0.06 边框 + 圆角 16px。hover 时边框变绿 (0.2 opacity)。
- 测试推荐卡片、设计哲学卡片、服务卡片、支付面板
- hover 时可选 translateY(-2px to -3px)，但无阴影

### Inputs / Fields
- **Default:** 0.03 背景 + 0.08 边框 + 10px 圆角，Mist White 文字
- **Placeholder:** Deep Gray (#6a7a90)，0.82rem
- **Focus:** 边框变 Beacon Green，背景微绿 (0.04)
- **Transition:** 0.3s ease on border-color + background

### Badges / Tags
- **Outline Badge:** 透明 + 1px Beacon Green + 50px 圆角 (pill)，hover 时绿色填充
- **AI Tool Tag:** 0.06 绿色填充 + 0.15 绿色边框 + pill，Beacon Green 文字，0.78rem

### Back-to-Top
50% 圆形，Beacon Green 填充，白色图标。hover 时 scale(1.15)。

## 6. Do's and Don'ts

### Do:
- **Do** 使用 Beacon Green (#00cc00) 作为唯一的品牌锚点色，控制在画面占比 ≤10%
- **Do** 使用 border 透明度变化（0.06/0.08/0.15/0.2/0.3）建立层次，替代阴影
- **Do** 保持纯黑 (#000) 背景，让作品图片成为视觉焦点
- **Do** 使用 Noto Sans SC 单一字体家族承载全部文字层级
- **Do** 保持动画在 0.25s-0.5s cubic-bezier 范围内，respect reduced-motion
- **Do** 首页双语标题使用 rotateX 翻转交互，次级页面保持静态

### Don't:
- **Don't** 使用 box-shadow 建立层次。此系统是 border-depth，不是 shadow-depth
- **Don't** 使用 PPT 式排版：投影卡片、装饰性分割线、每个 section 上方的小号大写眉题、01/02/03 编号标记
- **Don't** 使用 SaaS 落地页套路：渐变色大数字+小标签的 hero-metric 模板、均质卡片网格、奶油色/沙色背景
- **Don't** 使用玻璃态模糊 (backdrop-filter blur)、渐变文字 (background-clip: text)、侧边彩条 (border-left > 1px)
- **Don't** 在 Display 层（首页 Hero 英文名）以外使用 Noto Serif SC。Serif 仅此一处
- **Don't** 在次级页面使用双语翻转标题动画
- **Don't** 引入绿色以外的第二品牌色。Beacon Green 是唯一的彩色信号；error-red 仅用于表单错误消息
- **Don't** 使用 emoji 作为图标替代品
