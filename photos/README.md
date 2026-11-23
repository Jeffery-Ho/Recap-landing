# 照片素材库

官网、App 截图与录屏共用这一套照片，只在这里维护。

- `originals/`：Unsplash 原图（长边 1200px），只登记原始链接，不登记摄影师。
- `manifest.json`：唯一登记表。`photos` 列出每张照片的名称、链接、城市与分类；`web` 是官网各位置用哪几张；`app` 是 Recap 演示图库（`-recap-website-photos`）68 个位置用哪几张（本周 18、去年本周 8、六个分类各 7）；`grade` 是统一色调参数。
- 选图标准：自然光、旅途感，不露人脸或人物很小，不用棚拍和纯色背景。

## 常用操作

```bash
# 新增或替换照片后：放进 originals/，在 manifest.json 登记并分配位置，然后
node scripts/photos/grade.mjs                                  # 生成调色版到 src/assets/photos/

# 截图或录屏前，把同一套照片装进模拟器里的 Recap（mock 分支 Debug 构建，需已安装）
node scripts/photos/load-simulator.mjs <simulator-udid> zh-Hans   # 或 en
```

加载脚本不改 Recap 仓库：App 首次以 `-recap-website-photos` 启动时把内置照片缓存为 `bundled-<名字>.jpg`，脚本按 `manifest.json` 覆盖这些缓存、清掉缩略图再重启。App 里的城市名由 fixture 决定（宠物、花草、聚会归京都；海、日落归镰仓；山野归河口湖）。
