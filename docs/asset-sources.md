# 素材与功能证据

## App 素材

素材来自本机 `/Users/hexianji/Downloads/Recap` 项目及已安装的开发构建，未重新编译 App。

| 网站文件 | 来源 | 说明 |
| --- | --- | --- |
| `public/app-icon.png` | `Recap/Assets.xcassets/AppIconFish.appiconset/AppIconFishDefault.png` | 当前项目配置使用的主图标 |
| `src/assets/screens/home.png` | 独立截图模拟器中实际运行的 App | 简体中文首页，含 3 张独立 Unsplash 周照片 |
| `src/assets/screens/week.png` | 同一构建的中文周回顾 | 简体中文界面，8 张不同照片 |
| `src/assets/screens/cities.png` | 同一构建的中文城市目录 | 哥本哈根、斯德哥尔摩、赫尔辛基、奥斯陆、东京、首尔，各用不同实景照片 |
| `src/assets/screens/en/home.png` | App 切换为 English 后采集 | 英文首页，显示独立 Unsplash 周照片 |
| `src/assets/screens/en/week.png` | 同一 App 的英文周回顾 | 英文标题与照片数量，8 张不同照片 |
| `src/assets/screens/en/cities.png` | 同一 App 的英文城市目录 | Copenhagen、Stockholm、Helsinki、Oslo、Tokyo、Seoul；名称、日期和数量均为英文，每张封面均不同 |
| `src/assets/theme-photos/` | Unsplash | 六类主题素材，整页不复用其他照片；由网页组件排成主题面板，并非 App 截图 |

截图保持原图，由 Astro 在构建时生成不同宽度的 WebP。首页、周回顾、城市目录按页面语言选择对应截图；主题面板使用六张独立 Unsplash 摄影素材。没有重画 App 截图，未将开发构建等同于 TestFlight 验证。

英文城市素材采集关闭 `-recap-ui-testing`，使用已有演示图库的 `remote-*.jpg` 实景照片。UI 测试模式生成的渐变封面不作为网站素材。

## 手握手机模型

`src/assets/mockups/handheld-phone-v1.png` 使用内置 imagegen 生成，是含真实透明通道的 1024×1536 PNG。当前工具没有模型版本选择参数，不能确认用户提出的 image-2.5 版本；本轮未使用 CLI 或 API fallback。

完整生成提示词保存在 `handheld-phone-prompt.txt`。主视觉要求自然手部握持、正面平行手机、屏幕无遮挡、柔和影棚光线、无文字或虚构 UI。首页通过 CSS 单独嵌入对应语言的 `home.png`，模型原图和 App 截图均未重新绘制。

截图使用 `object-fit: cover` 按原比例铺满模型的屏幕开口，并向顶部对齐以保留状态栏；仅裁去底部少量内容，避免两侧出现黑边。

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
