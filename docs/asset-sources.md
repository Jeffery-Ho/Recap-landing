# 素材与功能证据

## App 素材

素材来自本机 `/Users/hexianji/Downloads/Recap` 项目及已安装的开发构建，未重新编译 App。

| 网站文件 | 来源 | 说明 |
| --- | --- | --- |
| `public/app-icon.png` | `Recap/Assets.xcassets/AppIconFish.appiconset/AppIconFishDefault.png` | 当前项目配置使用的主图标 |
| `src/assets/screens/home.png` | 已启动模拟器的真实首页截图 | 周卡、主题卡，演示照片 |
| `src/assets/screens/week.png` | 同一构建的真实周浏览截图 | 已打开的本周照片集合 |
| `src/assets/screens/cities.png` | `/tmp/RecapCityRecaps-light-directory.png` | 城市目录验证截图，含演示地名；不能作为真实旅行记录 |

截图保持原图，由 Astro 在构建时生成不同宽度的 WebP。没有生成或重画 App 界面，未将开发验证等同于 TestFlight 验证。

## 手握手机模型

`src/assets/mockups/handheld-phone-v1.png` 使用内置 imagegen 生成，是含真实透明通道的 1024×1536 PNG。当前工具没有模型版本选择参数，不能确认用户提出的 image-2.5 版本；本轮未使用 CLI 或 API fallback。

完整生成提示词保存在 `handheld-phone-prompt.txt`。主视觉要求自然手部握持、正面平行手机、屏幕无遮挡、柔和影棚光线、无文字或虚构 UI。首页通过 CSS 单独嵌入 `screens/home.png`，模型原图和 App 截图均未重新绘制。

截图使用 `object-fit: cover` 按原比例铺满模型的屏幕开口，并向顶部对齐以保留状态栏；仅裁去底部少量内容，避免两侧出现黑边。

## 摄影

复用 App 已收录的 Unsplash 演示照片，来源记录在 App 的 `Recap/Doc/initial-onboarding-unsplash-sources.md`。网站同时提供中英文素材来源页。

| 文件 | 摄影师 | 原始页面 |
| --- | --- | --- |
| `iceland.png` | Matteo Max Putzolu | https://unsplash.com/photos/boat-navigating-through-icebergs-in-glacial-lagoon-6RLyWPHqPoo |
| `kyoto.png` | Andrea Fontalvo | https://unsplash.com/photos/kiyomizu-dera-temple-in-kyoto-forest-qStTtSA2W6o |
| `glacier.png` | Joseph Corl | https://unsplash.com/photos/glacier-tongue-in-glacial-lake-JD5LvrCYmfQ |
| `coast.jpg` | Bernd Dittrich | https://unsplash.com/photos/two-people-walking-on-a-beach-near-rocks-2_VbVQPUmcY |

授权依据：[Unsplash License](https://unsplash.com/license)。App 截图中的其他照片来自现有 Unsplash 演示图库；最终发布前需与发布构建中的演示素材再核对。没有使用用户私人相册。

## 功能与文案边界

- 每周回顾、城市卡和主题卡：对照当前首页与对应浏览入口，以及 App `Recap/Doc/changelog.md`。
- 本地助手：对照 `Recap/Doc/assistant.md` 和 `assistant-help.md`，描述自然语言查询已索引照片，不宣称分析任意照片内容。要求支持 Apple Intelligence 的设备、iOS 26+、已启用且模型就绪。
- 随机回看：对照 App 更新记录中的 Absolute 权益限制。
- 分享卡片：对照 `Views/WeeklyRecap/ShareTemplate` 实现，不承诺自动生成回顾视频。
- 无需注册、本地分类和助手处理：同时注明 iCloud 原片下载、地图或地名等系统服务可能联网。
- 普通浏览设备要求来自当前项目 iOS 18.6 部署设置；公开 beta 要求仍需上线前确认。

以上为源码和开发构建证据。公开 TestFlight 功能核对仍为未完成事项。
