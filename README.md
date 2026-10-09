# Recap landing page

Recap 的独立静态网站，使用 Astro、TypeScript 和原生 CSS。英文 `/`，简体中文 `/zh/`。当前版本为可审阅的预览，测试邀请和联系邮箱按要求占位。

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

复制 `.env.example` 为 `.env` 后填写公开 TestFlight 邀请和联系邮箱。两种语言的导航、首屏及页尾共用同一个邀请配置。链接为空时显示“测试邀请准备中”，不会显示无效按钮。

| 配置 | 用途 |
| --- | --- |
| `PUBLIC_TESTFLIGHT_URL` | 真实公开邀请，格式为 `https://testflight.apple.com/join/…` |
| `PUBLIC_CONTACT_EMAIL` | 经确认的公开邮箱；为空时联系入口指向占位说明 |
| `BETA_FEATURES_VERIFIED` | 对照公开 TestFlight 构建核对全部卖点后设为 `true` |
| `LEGAL_CONTENT_APPROVED` | 审阅并定稿中英文隐私和条款后设为 `true` |
| `RECAP_RELEASE` | 正式生产构建设为 `true`，启用上线资料检查 |

隐私与条款当前标明草稿，未定稿时不进入 sitemap，并设置 `noindex`。正式发布前运行 `npm run release:check`；缺少以上资料时会返回失败。

## Cloudflare Pages

使用 Git 集成，项目根目录为本目录，构建命令 `npm run build`，输出目录 `dist`。使用 Node 24。生产环境填写上述配置并将 `RECAP_RELEASE=true`；分支预览保留 `RECAP_RELEASE=false`。

资料检查通过且邀请可用后，在 Pages 关联 `recapmoments.app` 和 `www.recapmoments.app`。`public/_redirects` 已提供 www 到根域名的 301 规则。配置域名后仍需检查 DNS、HTTPS、重定向及实际安装入口。

参考：[Astro 部署](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)、[自定义域名](https://developers.cloudflare.com/pages/configuration/custom-domains/)、[重定向](https://developers.cloudflare.com/pages/configuration/redirects/)。本项目尚未部署至 Cloudflare。

## 内容与素材

文案集中在 `src/data/site.ts`，法律草稿在 `src/data/legal.ts`。页面共享布局和组件，语言切换保留对应页面；启用 JavaScript 时也保留当前段落。

- [实施 TODO](docs/landing-page-todo.md)
- [素材来源与功能证据](docs/asset-sources.md)
- [验收记录](docs/validation.md)
- [更新记录](changelog.md)
