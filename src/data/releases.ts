/** Recap beta builds, newest first. Drafted from the app's git history; review before each release. */
export const releases = [
  {
    version: '0.1 (230)', date: '2026-11-03',
    title: { en: 'Landscape and iPad layouts', zh: '横屏与 iPad 布局' },
    body: {
      en: 'Home, the photo viewer and the editor keep their layout when you rotate or use split view on iPad.',
      zh: '旋转屏幕或在 iPad 分屏时，首页、照片查看与编辑都保持正确布局。',
    },
  },
  {
    version: '0.1 (228)', date: '2026-11-02',
    title: { en: 'Instant-photo signature row', zh: '拍立得署名行' },
    body: {
      en: 'Shared instant-photo cards get a fixed signature row with a clearer caption.',
      zh: '分享的拍立得卡片使用固定署名行，标题更清晰。',
    },
  },
  {
    version: '0.1 (201)', date: '2026-10-19',
    title: { en: 'Swipe to select', zh: '滑动多选' },
    body: {
      en: 'Drag across the photo grid to select many photos at once, or hide a photo from its menu.',
      zh: '在照片网格中连续滑动即可多选，也可以从菜单中隐藏照片。',
    },
  },
  {
    version: '0.1 (198)', date: '2026-10-15',
    title: { en: 'Photo calendar', zh: '照片月历' },
    body: {
      en: 'A month-first calendar shows how many photos you took each day.',
      zh: '按月份浏览的日历，显示每天拍了多少张照片。',
    },
  },
  {
    version: '0.1', date: '2026-10-09',
    title: { en: 'City recaps and Auto Memory', zh: '城市回顾与自动回忆' },
    body: {
      en: 'Place recaps are grouped by city with custom covers, and Auto Memory keeps organizing new photos in the background.',
      zh: '地点回顾按城市归组并支持自定义封面，自动回忆在后台持续整理新照片。',
    },
  },
] as const;

export type Release = (typeof releases)[number];
