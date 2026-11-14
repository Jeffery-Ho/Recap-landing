# 素材与功能证据

## App 素材

素材来自本机 `/Users/hexianji/Downloads/Recap` 项目及已安装的开发构建，未重新编译 App。

| 网站文件 | 来源 | 说明 |
| --- | --- | --- |
| `public/app-icon.png` | `Recap/Assets.xcassets/AppIconFish.appiconset/AppIconFishDefault.png` | 当前项目配置使用的主图标 |
| `src/assets/mockups/duo-open-{zh,en}.png` | iPhone Duo 模拟器展开内屏（2853×2007）截图，合成进官方外框 `iPhone Duo - Star White - Inner Open Landscape.png` | Recap `mock` 分支 Debug 构建，2026-11-07 采集，状态栏 9:41；中文以已付费身份重拍，英文仅将随机模式按钮的锁替换为星形图标 |
| `src/assets/mockups/hero-duo-gallery-v3-v3-{zh,en}[-dark].png` | 首屏双手横握图：App 随机模式引导页素材 `OnboardingRandomHandTrailing`（右手，镜像后兼作左手）与 `OnboardingRandomBezelLeading/Trailing`（两半展开机身），按 `RecapOnboardingRandomPage.swift` 的坐标 4 倍合成；屏幕为 iPhone Duo 模拟器展开横屏内屏（2853×2007）的图库第 42 周截图（顶部封面取老街一帧，头像为空头像占位）（`-recap-testing-pro-entitlement`，已付费、未充电，深色版用 `simctl ui appearance dark`） | Recap `mock` 分支 Debug 构建，2026-11-08 采集 |
| `src/assets/mockups/air-home-{zh,en}[-dark].png` | iPhone Air 模拟器（1260×2736）首页截图（`-recap-website-photos -recap-testing-pro-entitlement`，已付费、状态栏 9:41 满电未充电），合成进官方 iPhone Air Cloud White 外框；用于“大屏小屏”区块；`-dark` 为模拟器深色外观（`simctl ui appearance dark`）下的同一画面 | Recap `mock` 分支 Debug 构建，2026-11-07 在 Air 模拟器 `Recap Weekly Capture` 重拍；中英文各一张 |
| `src/assets/mockups/air-frame.png` | Apple Design Resources 的 iPhone Air Cloud White 竖屏外框（屏幕区 60,72 起 1260×2736） | 用于“本周”录屏，CSS 叠加 |
| `public/onboarding/week-{zh,en}.{mp4,jpg}` | iPhone Air 模拟器“本周”流程录屏，剪去静止段后 630 宽 H.264 | `mock` 分支构建，`-recap-website-photos` 演示数据 |

首屏两台设备的演示数据（2026-11-07 采集）：用 Recap 仓库 `mock` 分支的官网截图模式 `-recap-website-photos`（`WebsiteScreenshotFixture`）启动，本周为 18 张 Retro 风格、不露人脸的无分类生活照，42 张分类照片整体前移一周（均为内置 onboarding 照片），城市归入京都、镰仓、河口湖并指定封面，智能分类解锁，跳过引导页；步骤见 Recap 仓库 `Recap/Doc/App Store Screenshot Capture.md`。Duo 用本机已展开的模拟器采集，采集前备份 App 与数据、采集后装回原构建并恢复；Air 使用临时模拟器，采集后已删除。
| `src/assets/library/strip/remote-*.jpg` | App 演示图库（`UnsplashMockPhotoLibraryProvider.swift` 中的 Unsplash 链接），长边缩至 900px | 功能区照片条：本周区块的第 44、43 周，地点区块的雷克雅未克，以及部分智能分类 |
| `src/assets/library/strip/Onboarding*.jpg` | App 引导页照片（来源见 `Recap/Doc/onboarding-photo-sources.md`） | 功能区照片条：京都、河口湖与智能分类 |

截图保持原图，由 Astro 在构建时生成不同宽度的 WebP。首屏按页面语言选择对应截图。功能区参考 savee.com，用通栏照片条展示内容本身，不使用截图或设备外框；胶囊里的周次、城市与数量为演示数据。未将开发构建等同于 TestFlight 验证。

英文城市素材采集关闭 `-recap-ui-testing`，使用已有演示图库的 `remote-*.jpg` 实景照片。UI 测试模式生成的渐变封面不作为网站素材。

## 设备外框

所有设备外框来自 Apple Design Resources 的官方 Product Bezels（`Bezel-iPhone-Duo.dmg` 的 Star White 展开横屏，以及 iPhone Air 竖屏），只用于首屏，按《Apple Design Resources 许可协议》用于展示 iOS App 界面的样机。截图通过 `composite.swift`（CoreGraphics）合成：以外框中心做泛洪找到透明屏幕区域，把截图画进去，再叠上外框。网页上不再用 CSS 绘制机身。

## 摄影

页面摄影来自 Unsplash。部分演示素材复用 App 收录的 Unsplash 图库；完整来源及摄影师记录见双语素材来源页。截图中的每个城市、周回顾和主题照片均使用不同图像，页面背景装饰也不与这些照片重复。

| 文件 | 摄影师 | 原始页面 |
| --- | --- | --- |
| `iceland.png` | Matteo Max Putzolu | https://unsplash.com/photos/boat-navigating-through-icebergs-in-glacial-lagoon-6RLyWPHqPoo |
| `kyoto.png` | Andrea Fontalvo | https://unsplash.com/photos/kiyomizu-dera-temple-in-kyoto-forest-qStTtSA2W6o |
| `glacier.png` | Joseph Corl | https://unsplash.com/photos/glacier-tongue-in-glacial-lake-JD5LvrCYmfQ |

城市照片与六张主题照片的出处已列在站内双语素材来源页。授权依据：[Unsplash License](https://unsplash.com/license)。没有使用用户私人相册。

## 功能与文案边界

- 每周回顾、城市卡和主题卡：对照当前首页与对应浏览入口，以及 App `Recap/Doc/changelog.md`。
- 本地助手：对照 `Recap/Doc/assistant.md` 和 `assistant-help.md`，描述自然语言查询已索引照片，不宣称分析任意照片内容。要求支持 Apple Intelligence 的设备、iOS 26+、已启用且模型就绪。
- 随机回看：对照 App 更新记录中的 Absolute 权益限制。
- 分享卡片：对照 `Views/WeeklyRecap/ShareTemplate` 实现，不承诺自动生成回顾视频。
- 无需注册、本地分类和助手处理：同时注明 iCloud 原片下载、地图或地名等系统服务可能联网。
- 普通浏览设备要求来自当前项目 iOS 18.6 部署设置；公开 beta 要求仍需上线前确认。

以上为源码和开发构建证据。公开 TestFlight 功能核对仍为未完成事项。

## 功能插画（2026-11-06）

首页功能展示不再使用周回顾与城市目录截图，改为依据 App onboarding 页重绘的 HTML/CSS 场景，详见 `docs/design-tokens.md`。每个展示位使用一张专属照片，全站不重复（参照 hive.ink 的做法），`npm run verify` 会检查首页每张照片只出现一次。新增照片取自 `artifacts/localized-screens/photographs/` 中已登记来源的 Unsplash 图库，复制到 `src/assets/library/`；完整对应关系（照片、摄影师、来源、使用位置）见 `src/data/photography-sources.json`，并展示在双语照片来源页。首屏 App 截图中出现的三张周照片不再用于其他位置。地名、日期与周数为演示数据。首屏仍使用手握手机模型与真实首页截图。

## 引导页录屏

`public/onboarding/{random,live-zh,live-en,past}.{mp4,jpg}`：在临时 iPhone Air 模拟器上安装 Recap `mock` 分支 Debug 构建，以 `-recap-website-photos` 启动，从设置的“回顾使用介绍”进入引导页，用 `xcrun simctl io recordVideo` 录屏（2026-11-07）。每段截取一个完整动画周期（随机模式 14 秒、Live Photo 8 秒、往年同周 12 秒），逐帧找出与底色不同的像素，按动画内容的外接框（含阴影）裁剪，再在 RGB 下用同色补成正方形（随机模式顶部的返回、关闭按钮用底色盖掉），输出随机模式 960px、其余 720px 的 30fps H.264；封面帧取自循环内。网页容器同为 1:1，视频铺满容器，底色设为浏览器实际渲染的 `#f2f0ee`。照片均为 App 内置的引导页照片。临时模拟器录完已删除。

## 统一照片素材库（2026-11-12）

官网、App 截图与录屏共用 `photos/` 里的一套照片，说明见 `photos/README.md`。共 70 张 Unsplash 照片：京都（鸭川与老街）、冲绳、东京、名古屋的旅行照片，以及自然光的宠物、绣球与樱花、柔和的海上日落、富士山与河口湖、祭典灯笼。原图在 `photos/originals/`，统一调色（低饱和、偏暖、暗部稍提亮）后输出到 `src/assets/photos/`，官网经 `src/data/photos.ts` 按 `manifest.json` 的位置取图；`scripts/photos/load-simulator.mjs` 把同一批调色照片装进模拟器里 Recap 的演示图库。只登记原始链接，不登记摄影师。原 `src/assets/library/strip/` 与 `travel/` 已移除；首屏照片墙与标题小图仍用 `src/assets/library/` 的旧照片。

## 截图与录屏重拍（2026-11-13）

照片全部来自 `photos/manifest.json`（`app` 各位置），用 `node scripts/photos/load-simulator.mjs <udid> zh-Hans|en` 装进模拟器。App 用 Recap `mock` 分支提交加上网站模式（`WebsiteScreenshotFixture`，主仓库中尚未提交）构建，另在单独 worktree 分支 `website-travel-fixture` 中加了三个旅行周（`travelWeeks`：冲绳、东京、名古屋，分类种子后移四周），并把引导页 `OnboardingHistory01–09` 换成旅行照；这些改动只用于采集，未合入 Recap。

- `public/onboarding/week-{zh,en}.{mp4,jpg}`：临时 iPhone Air 模拟器，图库页用一次连续拖动匀速向下滚 200pt（每 33ms 移动约 1.1pt，结束前停住再抬手，不触底），`simctl io recordVideo` 录制；去掉重复帧后按 25fps 等间隔重排，剪掉手指刚按下的起步段，开头停 0.6 秒、结尾停 0.5 秒，630 宽 H.264。
- `public/onboarding/past.{mp4,jpg}`：同一模拟器的引导页“往年同周”，按帧比对得出 12.00 秒周期，截取一个周期，按动画外接框裁成 1232×1232 正方形，输出 720×720。
- `src/assets/mockups/hero-duo-gallery-v3-v3-{zh,en}[-dark].png`：iPhone Duo 模拟器展开内屏（2853×2007）图库模式第 45 周，缩放到 1402×986 贴回原合成图屏幕区域（x 462、y 39），圆角半径 79px，外框与双手保持原样。采集后 Duo 上的 App 已换回采集前的构建。
