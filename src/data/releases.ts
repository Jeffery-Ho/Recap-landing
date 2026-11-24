/**
 * Recap beta builds, newest first, in the shape of hive.ink/cn/updates: a title, a one-line summary, then what's new,
 * what's improved and what's fixed. Drafted from the app's git history and `Recap/Doc/changelog.md`; review before
 * each release. `date` is kept for our records only: the site shows no calendar dates.
 */
type Changes = { added?: readonly string[]; improved?: readonly string[]; fixed?: readonly string[] };
type Localized<T> = { en: T; zh: T };
export type Release = { version: string; date: string; title: Localized<string>; body: Localized<string>; changes: Localized<Changes> };
export type Locale = 'en' | 'zh';
export const changeGroups = ['added', 'improved', 'fixed'] as const;

export const releases: readonly Release[] = [
  {
    version: '0.1 (264)', date: '2026-11-24',
    title: { en: 'Recap Assistant, Cleanup and a new first run', zh: 'Recap 助手、清理与全新引导' },
    body: {
      en: 'Ask Recap Assistant or Siri to find photos, clear out near-duplicates, and follow organizing on the Lock Screen.',
      zh: '向 Recap 助手或 Siri 找照片，清理相似照片，在锁屏上查看整理进度。',
    },
    changes: {
      en: {
        added: [
          'Recap Assistant finds photos by date, date range, season, holiday, time of day, place, Smart Category or favorites. Siri can search your photos too, and chats stay put when you leave the page',
          'Cleanup groups bursts and similar shots, picks the best of each set and shows how much space they take',
          'Organizing progress on the Lock Screen and in the Dynamic Island',
          'Switch years in This week in past years',
          'Recap reopens on the page you last viewed',
          'Look around a sample library during onboarding before granting photo access',
          'Add photos to Favorites from the long-press menu',
          'A membership card in Profile shows the benefits you’ve unlocked',
          'Post straight to X, and a No watermark switch for sharing the original photo',
        ],
        improved: [
          'Split photo detail on the unfolded iPhone Duo and iPad, and a full-screen canvas on Duo to swipe through photos continuously',
          'Smart Categories sort your most recent photos first, then work back in time, and keep going in the background batch after batch',
          'Photo detail and Place Memories load faster, and photos open at their own aspect ratio',
          'Onboarding redesigned for iPhone Duo, with new Cleanup, Assistant and Stats pages; photo access is only requested on the permission page',
          'Line illustrations for empty states and a wider sidebar on iPad in portrait',
          'Cold launch no longer flashes white',
        ],
        fixed: [
          'Fixed Shuffle Mode showing only 7 photos',
          'Fixed the Lock Screen reporting organizing as finished after a background launch',
          'Fixed the assistant missing photos or matching the wrong place',
          'Fixed a crash when filtering the gallery on the iPhone Duo outer screen',
          'Fixed the photo editor preview being clipped on iPhone Duo',
          'Fixed the detail view not updating when switching categories in the sidebar',
          'Fixed Place Memories cards at the edge of the row not loading their covers',
          'Fixed the onboarding close button on iPhone Duo sitting behind the status bar',
          'Fixed an extra Continue tap during onboarding skipping past the paywall',
        ],
      },
      zh: {
        added: [
          'Recap 助手可按日期、日期区间、季节、节日、拍摄时段、地点、智能分类或收藏找照片；也可以直接问 Siri；离开页面后对话保留',
          '清理：连拍和相似照片自动归组，每组挑出最好的一张，并显示占用的空间',
          '整理进度显示在锁屏与灵动岛',
          '往年同周可以切换年份',
          '启动时回到上次打开的页面',
          '首次引导时可以先浏览示例图库，再决定是否授权相册',
          '照片长按菜单新增「收藏」',
          '个人页新增会员卡，可查看已解锁的权益',
          '分享可直连 X 发帖；新增「无水印」开关，直接分享原图',
        ],
        improved: [
          'iPhone Duo 展开后与 iPad 的照片详情改为分栏布局；Duo 大图改为可连续滑动的全屏画布',
          '智能分类先整理最近的照片，再按时间往前补，并在后台一批接一批继续',
          '照片详情与地点回顾加载更快，打开时按照片原始比例显示',
          '首次引导为 iPhone Duo 重新设计，新增清理、助手和照片统计页；只在权限页请求相册授权',
          '空状态改为线条插画；iPad 竖屏侧边栏加宽',
          '冷启动不再先闪白屏',
        ],
        fixed: [
          '修复随机模式只显示 7 张照片的问题',
          '修复后台启动后锁屏误报「整理完成」的问题',
          '修复助手漏查照片或误匹配地点的问题',
          '修复在 iPhone Duo 外屏筛选图库时可能闪退的问题',
          '修复 iPhone Duo 照片编辑预览被裁切的问题',
          '修复侧边栏切换分类后详情不更新的问题',
          '修复地点回顾行末露出的卡片不加载封面的问题',
          '修复 iPhone Duo 引导页关闭按钮被状态栏遮挡的问题',
          '修复引导页多点一次「继续」会越过付费墙的问题',
        ],
      },
    },
  },
  {
    version: '0.1 (230)', date: '2026-11-03',
    title: { en: 'Landscape and iPad layouts', zh: '横屏与 iPad 布局' },
    body: {
      en: 'Home, the photo viewer and the editor keep their layout when you rotate or use split view on iPad.',
      zh: '旋转屏幕或在 iPad 分屏时，首页、照片查看与编辑都保持正确布局。',
    },
    changes: {
      en: {
        improved: [
          'Home, the photo viewer and the editor keep their layout when you rotate or use split view on iPad',
          'A larger name and app icon in the instant-photo signature',
        ],
        fixed: ['Fixed landscape photos in photo detail not filling the space beneath the controls'],
      },
      zh: {
        improved: ['旋转屏幕或在 iPad 分屏时，首页、照片查看与编辑都保持正确布局', '拍立得署名行的名字和 App 图标加大'],
        fixed: ['修复横屏照片在详情页未铺满控件下方区域的问题'],
      },
    },
  },
  {
    version: '0.1 (228)', date: '2026-11-02',
    title: { en: 'Instant-photo signature row', zh: '拍立得署名行' },
    body: {
      en: 'Shared instant-photo cards get a fixed signature row with a clearer caption.',
      zh: '分享的拍立得卡片使用固定署名行，标题更清晰。',
    },
    changes: {
      en: {
        improved: [
          'Shared instant-photo cards get a fixed signature row with a clearer caption',
          'Default share captions are a step bolder, with spacing that matches the template',
        ],
        fixed: [
          'Fixed the caption colliding with the Recap signature on the first line of a shared instant photo',
          'Fixed blurry or uneven dividers between Home cards',
        ],
      },
      zh: {
        improved: ['分享的拍立得卡片使用固定署名行，标题更清晰', '默认分享卡片的文字加粗一档，间距与模板一致'],
        fixed: ['修复分享的拍立得首行文字与 Recap 署名重叠的问题', '修复首页卡片分隔线模糊、粗细不一的问题'],
      },
    },
  },
  {
    version: '0.1 (201)', date: '2026-10-19',
    title: { en: 'Swipe to select', zh: '滑动多选' },
    body: {
      en: 'Drag across the photo grid to select many photos at once.',
      zh: '在照片网格中连续滑动即可多选。',
    },
    changes: {
      en: {
        added: ['Drag across the photo grid to select many photos at once'],
        improved: [
          'Home appears right away on launch',
          'A warmer color scheme with serif titles, and a refined dark mode',
          'Background organizing starts more reliably and retries after an interruption',
        ],
      },
      zh: {
        added: ['在照片网格中连续滑动即可多选'],
        improved: ['启动后首页立即显示', '更温暖的配色与衬线标题，深色模式同步优化', '后台整理启动更可靠，中断后会自动重试'],
      },
    },
  },
  {
    version: '0.1 (198)', date: '2026-10-15',
    title: { en: 'Photo calendar', zh: '照片月历' },
    body: {
      en: 'A month-first calendar and a yearly heatmap show how many photos you took each day.',
      zh: '按月份浏览的日历和全年热力图，显示每天拍了多少张照片。',
    },
    changes: {
      en: {
        added: [
          'Photo statistics: a month-first calendar and a yearly heatmap of how many photos you took each day',
          'Hide a photo from its long-press menu',
          'A favorite badge on photo thumbnails',
          'Organizing can keep going in the background, with a setting to turn it off',
        ],
        improved: ['The current week stands out on Home, with a square thumbnail strip', 'The photo wall cover loops seamlessly'],
        fixed: ['Fixed an error shown when cancelling a photo deletion', 'Fixed hidden or deleted photos staying visible in Recap'],
      },
      zh: {
        added: ['照片统计：按月份浏览的日历与全年热力图，显示每天拍了多少张', '照片长按菜单可隐藏照片', '收藏的照片在缩略图上显示标记', '整理可在后台继续，并可在设置中关闭'],
        improved: ['首页突出本周，缩略图条改为方形', '照片墙封面无缝循环'],
        fixed: ['修复取消删除照片时提示出错的问题', '修复隐藏或删除的照片没有及时从 Recap 中消失的问题'],
      },
    },
  },
  {
    version: '0.1', date: '2026-10-09',
    title: { en: 'City recaps and Auto Memory', zh: '城市回顾与自动回忆' },
    body: {
      en: 'Place recaps are grouped by city with custom covers, and Auto Memory keeps organizing new photos in the background.',
      zh: '地点回顾按城市归组并支持自定义封面，自动回忆在后台持续整理新照片。',
    },
    changes: {
      en: {
        added: ['Place recaps grouped by city on Home, with custom covers', 'Auto Memory keeps organizing new photos in the background'],
        improved: ['Thumbnails load with less battery use'],
      },
      zh: {
        added: ['首页地点回顾按城市归组，支持自定义封面', '自动回忆在后台持续整理新照片'],
        improved: ['缩略图加载更省电'],
      },
    },
  },
];
