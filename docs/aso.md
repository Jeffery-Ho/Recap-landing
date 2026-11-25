# App Store 名称、副标题与关键词（ASO）

2026-11-25 定稿。官网代码里的唯一来源是 `src/data/site.ts` 的 `aso`；改动时同步更新本文和 `scripts/og-images.mjs`，再重新生成分享图。

## 名称与副标题

| | 英文 | 中文 |
| --- | --- | --- |
| App 名称 | Recap – Your Weekly Photos | Recap - 相册整理与回顾 |
| 副标题 | Organize, Explore, Share | 整理，发现，美化 |

## 关键词

| 分组 | 英文 | 中文 |
| --- | --- | --- |
| Organize | photo organizer | 相册整理 |
| Organize | weekly photo organizer | 每周照片回顾 |
| Organize | auto photo organizer | 自动整理 |
| Explore | photo memories | 回忆相册 |
| Explore | photo shuffle | 随机看照片 |
| Frame | photo frame | 拍立得相框 |

`photo frame` / 拍立得相框 指拍立得（相纸边框）功能，不是随机模式。

## 官网里用到的位置

- 首页 `<title>`：`App 名称：副标题`（中文页用中文名称与副标题）。
- 网站描述（meta description、Open Graph / Twitter 描述、JSON-LD `description`、`llms-full.txt` 摘要）：当前语言的 App 名称。
- 首页 `meta keywords`：各自语言的关键词。
- 首页 JSON-LD（`src/data/seo.ts`）：`name` 为当前语言的 App 名称，`alternateName` 为 Recap，`slogan` 为副标题，`keywords` 为关键词。
- `public/llms.txt`（手写）与 `/llms-full.txt`（`src/data/llms.ts` 生成）：中英文名称、副标题与关键词。
- 分享图 `public/og-home.jpg` / `og-home-zh.jpg`：Recap、名称后半段与副标题，用 `node scripts/og-images.mjs` 生成。
- 页面文案：首屏说明（photo organizer / 每周照片回顾）、整理章节（auto photo organizer / 相册整理、weekly photo organizer）、发现章节（photo memories / 回忆相册、photo shuffle / 随机看照片、photo frame / 拍立得相框）、页脚标语直接用副标题（`aso.subtitle`）。英文章节标签为 Organize / Explore / Share / Stats，中文为 整理 / 发现 / 分享 / 统计。
