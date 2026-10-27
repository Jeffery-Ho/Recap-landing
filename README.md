# Recap landing page

Recap 的独立静态网站，使用 Astro、TypeScript 和原生 CSS。英文 `/`，简体中文 `/zh/`。官网通过 Vercel 发布，Cloudflare 提供内容分发与安全保护；测试邀请仍待配置。服务提供方为 Recap Team，默认隐私及支持邮箱为 support@recapmoments.app。

## 本地预览

```sh
npm ci
npm run dev
```

打开 `http://127.0.0.1:4321/`。生产输出检查：

```sh
npm run check
npm run build
npm run verify
```

不依赖运行中的 App，不需要 Xcode 编译。没有分析脚本、后台、账号或邮箱收集。FAQ 使用原生 `details`；关闭 JavaScript 后正文、语言切换、FAQ 和配置好的测试邀请仍可使用。

## 对外资料

复制 `.env.example` 为 `.env` 后填写公开 TestFlight 邀请并核对联系邮箱。两种语言的导航、首屏及页尾共用同一个邀请配置。链接为空时显示“测试邀请准备中”，不会显示无效按钮。

| 配置 | 用途 |
| --- | --- |
| `PUBLIC_TESTFLIGHT_URL` | 真实公开邀请，格式为 `https://testflight.apple.com/join/…` |
| `PUBLIC_CONTACT_EMAIL` | 隐私及支持邮箱；默认 support@recapmoments.app，生产环境需显式配置，空值隐藏邮箱入口 |
| `BETA_FEATURES_VERIFIED` | 对照公开 TestFlight 构建核对全部卖点后设为 `true` |
| `LEGAL_CONTENT_APPROVED` | 当前中英文法律文件已获准发布，默认 `true`；需要审阅新草稿时显式设为 `false` |
| `RECAP_RELEASE` | 正式生产构建设为 `true`，启用上线资料检查 |

隐私政策与服务条款已补齐中英文正文、章节目录、联系信息及 Apple 官方链接。内容覆盖照片与本地助手、权限、诊断反馈、第三方服务、保留删除、会员订阅、测试交易及消费者权益。当前文件已按用户发布指示定稿，正常加入 sitemap。需要审阅后续草稿时设置 `LEGAL_CONTENT_APPROVED=false`，页面会显示待审阅并设置 `noindex`，同时从 sitemap 排除。公开测试邀请与功能核对仍由 `npm run release:check` 单独检查。

## 当前生产部署

GitHub 仓库 `Jeffery-Ho/Recap-landing` 的 `main` 分支连接 Vercel 项目 `recap-landing`，推送后自动部署。构建命令为 `npm run build`，输出目录为 `dist`。线上地址为 `https://www.recapmoments.app/`，根域名会重定向到 www。发布后需核对 Vercel 部署状态及公开页面内容。

## Cloudflare Pages（备选部署）

使用 Git 集成，项目根目录为本目录，构建命令 `npm run build`，输出目录 `dist`。使用 Node 24。生产环境填写上述配置并将 `RECAP_RELEASE=true`；分支预览保留 `RECAP_RELEASE=false`。

资料检查通过且邀请可用后，在 Pages 关联 `recapmoments.app` 和 `www.recapmoments.app`。`public/_redirects` 已提供 www 到根域名的 301 规则。配置域名后仍需检查 DNS、HTTPS、重定向及实际安装入口。

参考：[Astro 部署](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)、[自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/)、[重定向](https://developers.cloudflare.com/pages/configuration/redirects/)。本项目尚未部署至 Cloudflare。

## 内容与素材

文案集中在 `src/data/site.ts`，法律正文与独立更新日期在 `src/data/legal.ts`。页面共享布局和组件，法律章节使用稳定的中英文对应锚点；启用 JavaScript 时语言切换保留当前章节。

- [实施 TODO](docs/landing-page-todo.md)
- [素材来源与功能证据](docs/asset-sources.md)
- [验收记录](docs/validation.md)
- [更新记录](changelog.md)
