# Recap 设计规范（官网）

官网的颜色、字体、间距与动效统一定义在 `src/styles/tokens.css`。数值取自 iOS App，修改时两边保持一致。

## 颜色

| Token | 值 | 用途 | App 来源 |
| --- | --- | --- | --- |
| `--paper` | `#F6F5F3` | 页面底色 | `RecapOnboardingAppearance.paper` |
| `--paper-deep` | `#EFEDE9` | 演示舞台、页脚、分页底 | 由 paper 加深 |
| `--card` | `#FFFEFC` | 卡片、按键面 | `RecapOnboardingAppearance.card` |
| `--ink` | `#1C1B1A` | 标题、主按钮 | `RecapOnboardingAppearance.ink` |
| `--muted` | `#66615C` | 正文次级 | `RecapOnboardingAppearance.mutedText` |
| `--forest` | `#2F5B45` | 品牌强调：标签、选中、链接、图标 | `RecapOnboardingAppearance.forest` |
| `--forest-soft` | `#E2ECE5` | 强调底色 | App 中 `#E2F6EA` 一类浅绿 |
| `--hairline` | forest 14% | 描边 | `RecapOnboardingAppearance.hairline` |
| `--print` | `#1F2A29` | 设备、相纸暗面 | `RecapOnboardingAppearance.printWindow` |
| `--swatch-1…12` | `#DDD5C6` 等 | 照片占位、插画底色 | `RecapOnboardingAppearance.swatches` |
| `--shadow-color` | `30 38 34` | 相纸投影 | onboarding 页 `0x1E2622` 阴影 |
| `--accent` 系列 | forest 及其 8% / 38% 透明度、`#F0F5F1` 浅底 | 标签胶囊、选中卡片描边、Absolute 定价卡浅底 | 由 forest 派生，对应 Polaris 的品牌色用法 |
| `--border` / `--surface` | `#E2DFD9` / `#F1EFEB` | 卡片细边框、窗口栏、页脚底色 | 暖灰中性色，取自 paper 色系 |
| `--absolute-bg` / `--absolute-accent` | `#050308` / `#FF4D8D` | 保留备用，官网当前未使用 | `PaywallAbsoluteAppearance` |

## 字体

| 角色 | Web 字体栈 | App 来源 |
| --- | --- | --- |
| 标题（h1–h3、价格） | `--font-serif`：New York → Songti SC → Georgia，500 | `RecapTypography` 的 `pageTitle` / `cardTitle`（serif medium） |
| 场景内 UI 文字 | `--font-rounded`：SF Pro Rounded → 系统字体 | `RecapOnboardingHeadline`（rounded） |
| 正文、按钮、导航 | `--font-sans`：SF / PingFang SC，正文 15–17px | `RecapTypography` 的 `body` / `action` / `supporting` |
| 版本号 | `--font-mono`：SF Mono | — |

Safari 可直接调用 New York 与 SF Pro Rounded；其他浏览器按字体栈回退。

## 间距与形状

间距沿用 `RecapSpacing`：4 / 8 / 12 / 16 / 24 / 32，点击区不小于 44px。版式细节对齐 Polaris v2：区块上下留白 112 / 82px；卡片只用 1px 细边框、不加阴影，圆角为说明卡 18px、轮播卡 28px、定价与安装卡 16px、隐私卡 20px；导航为 16px 圆角卡片，按钮为胶囊。

## 动效

节奏参考 polaris-ai.work/v2，只用 CSS 过渡、关键帧和 `src/scripts/motion.ts` 中的少量状态切换：

| Token | 值 | 用途 |
| --- | --- | --- |
| `--ease-enter` / `--dur-enter` | `cubic-bezier(.87,0,.13,1)` / 700ms | 区块进入、演示场景切换 |
| `--ease-slide` / `--dur-slide` | `cubic-bezier(.65,0,.35,1)` / 650ms | 功能轮播、浮动按钮 |
| `--dur-fast` | 160ms | 按钮、链接悬停 |
| `--dur-fade` | 300ms | `demo-fade`、FAQ 展开 |

功能场景（`src/components/scenes/`）依据 onboarding 页重绘：W2 周回顾、M1b 城市、R1d 随机模式、L1 Live Photo、H1 往年同周，另有主题、助手和分享卡片。场景的基础样式就是终帧；启用 JavaScript 后从首帧开始播放，进入视口才运行。系统开启“减少动态效果”或禁用 JavaScript 时，直接显示终帧。
