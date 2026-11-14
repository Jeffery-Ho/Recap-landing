export type Locale = 'en' | 'zh';

export const site = {
  origin: 'https://recapmoments.app',
  testflightUrl: (import.meta.env.PUBLIC_TESTFLIGHT_URL ?? 'https://testflight.apple.com/join/zhd3PaV4').trim(),
  operator: 'Recap Team',
  // The developer credit in the footer, as on polaris-ai.work.
  developer: { name: 'Jeffery Ho', url: 'https://x.com/JefferyHo_' },
  contactEmail: (import.meta.env.PUBLIC_CONTACT_EMAIL ?? 'support@recapmoments.app').trim(),
  legalApproved: (import.meta.env.LEGAL_CONTENT_APPROVED ?? 'true') === 'true',
};

if (site.testflightUrl && !/^https:\/\/testflight\.apple\.com\/join\/[A-Za-z0-9]+\/?$/.test(site.testflightUrl)) {
  throw new Error('PUBLIC_TESTFLIGHT_URL must be a public https://testflight.apple.com/join/ invitation.');
}
if (site.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contactEmail)) {
  throw new Error('PUBLIC_CONTACT_EMAIL must be a public email address.');
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** True when the site is built under a sub-path (the /v2/ preview), which must stay out of search results. */
export const isPreviewBuild = base !== '';

/** A root-relative path to a file in public/, prefixed with the build's base path. */
export function withBase(path: string) {
  return `${base}${path}`;
}

/** The page's path on the production site, for canonical and hreflang URLs. */
export function sitePath(locale: Locale, page = '') {
  return `${locale === 'zh' ? '/zh/' : '/'}${page ? `${page}/` : ''}`;
}

/** The page's path in this build, for links. */
export function localPath(locale: Locale, page = '') {
  return withBase(sitePath(locale, page));
}

/** Absolute prices: CNY for the Chinese page, as configured in `Recap.storekit` (China mainland App Store), and USD for
 * the English page, at the matching App Store price tiers ($1.99 / $9.99 / $19.99 for ¥12 / ¥68 / ¥128). */
export const pricing = {
  en: [
    { label: 'Monthly', price: '$1.99', period: '/ month' },
    { label: 'Yearly', price: '$9.99', period: '/ year' },
    { label: 'Lifetime', price: '$19.99', period: 'one-time' },
  ],
  zh: [
    { label: '月度', price: '¥12', period: '/ 月' },
    { label: '年度', price: '¥68', period: '/ 年' },
    { label: '终身', price: '¥128', period: '一次买断' },
  ],
} as const;

export const copy = {
  en: {
    lang: 'en', otherLanguage: '简体中文', otherLanguageShort: '中', languageLabel: 'Switch to Simplified Chinese', languageMenuLabel: 'Language', themeLabel: 'Theme', themeDark: 'Dark theme', themeLight: 'Light theme',
    title: 'Recap — Rediscover Your Photo Memories',
    description: 'Rediscover the moments in your photo library with weekly recaps, city memories, and themed collections. Made for iPhone and iPad.',
    skip: 'Skip to content',
    nav: { features: 'Features', pricing: 'Pricing', faq: 'FAQ', updates: 'Updates', menu: 'Main navigation' },
    join: 'Join TestFlight', pending: 'TestFlight invitations coming soon',
    heroLines: ['Your {0} memories,', 'week to {1} week.'],
    heroBadge: 'Recap now runs on iPhone Duo',
    heroDescription: 'Sorted on its own, fun to browse, easy to share: every week of your photos finds its place.',
    heroNote: 'For iPhone and iPad. Your photos stay on your device.',
    chapters: { sort: 'Sort', browse: 'Browse', share: 'Share', stats: 'Stats' },
    featuresIntro: {
      title: ['Thousands of photos, and never the one you want.', 'Recap sorts them for you.'],
      body: 'By week, by place and by what’s in them, and the near-duplicates cleared out. No albums to build.',
      label: 'How Recap sorts your photos',
      choose: 'Choose a way to sort',
    },
    features: [
      {
        id: 'week', label: 'By week', icon: 'calendar',
        title: ['The camera roll only gets longer.', 'Recap files it week by week.'],
        body: 'Every week gets a card of its own, newest first. Scroll back and every week is still there.',
        states: ['This Week · 18 photos', 'Week 44 · 12 photos', 'Week 43 · 12 photos'],
      },
      {
        id: 'places', label: 'By place', icon: 'pin',
        title: ['Trip photos end up all over the library.', 'Recap gathers them by city.'],
        body: 'Trips, weekends and days passing through: Recap finds the places in your photos and keeps one recap for each city.',
        states: ['Kyoto · 42 photos', 'Okinawa · 36 photos', 'Tokyo · 28 photos', 'Nagoya · 19 photos'],
      },
      {
        id: 'categories', label: 'Smart Categories', icon: 'sparkle',
        title: ['Finding the dog photos takes forever.', 'Recap sorts by what’s in them.'],
        body: 'Pets, flowers, the sea and sunsets, each in a category of its own, one tap away. Recognition runs on your iPhone.',
        states: ['Pet friends', 'Flowers', 'Sunset moments', 'Mountains'],
      },
      {
        id: 'cleanup', label: 'Clean up', icon: 'layers',
        title: ['Bursts and near-duplicates fill the library.', 'Recap keeps the best of each set.'],
        body: 'Similar shots are grouped together with the best one picked out. Clear the rest in one go.',
        states: ['Doorstep cats · 6 similar', 'Sabani sail · 4 similar'],
      },
    ],
    browse: {
      title: ['Looking back should be fun.', 'Three new ways to browse.'],
      body: 'Shuffle the whole library, turn photos into instant prints, and step back into the same week years ago.',
      absolute: 'Part of Absolute',
      shuffleBar: { label: 'On the road', change: 'Show Another Set' },
      items: [
        { id: 'random', label: 'Shuffle Mode', title: 'Turn your iPhone into a photo frame.', body: 'Tap Shuffle Mode and turn your iPhone sideways. Photos lay themselves out and keep turning up moments you’d almost forgotten.', absolute: true },
        { id: 'print', label: 'Instant prints', title: 'Turn photos into instant prints.', body: 'Pick a frame color, write a line, then flip it over for the time and place. Try it right here.', absolute: false },
        { id: 'past', label: 'This week in past years', title: 'Back to this week, last year.', body: 'Turn the year wheel back to the same week one, two or three years ago.', absolute: true },
      ],
      print: {
        colors: 'Paper color', flip: 'Flip',
        colorNames: ['White', 'Cream', 'Sage', 'Sky', 'Blush', 'Ink'],
        text: 'The sea at Kouri Island', captions: ['The sea at Kouri Island', 'The last of summer', 'Watching the sea with you'], time: '4:20 PM', place: 'Kouri Island, Okinawa', signature: 'Recap',
        alt: 'An instant print of a beach and the Kouri Bridge in Okinawa',
      },
    },
    share: {
      title: ['Moments worth keeping', 'are worth sharing.'],
      body: 'Straight to Instagram, Threads and X, as a Live Photo or a template.',
      apps: { title: ['Share straight to', 'Instagram, Threads and X.'], note: 'Direct' },
      live: { title: ['Share a Live Photo', 'that’s yours alone.'], caption: 'Kamo River, Kyoto', stories: 'Stories', story: 'Your story', now: 'now', message: 'Send message' },
      templates: {
        title: ['Stamped with the time and place.', ''], body: 'The default card, a Polaroid or an instax Mini. More templates are on the way.',
        cover: { week: 'Week 45', place: 'Kamakura', time: 'Sat · 5:20 PM' },
        items: [{ kind: 'Polaroid', place: 'Kyoto', date: 'Sun · 5:20 PM' }, { kind: 'instax mini', place: 'Nagoya', date: 'Sat · 4:05 PM' }],
      },
    },
    heatmap: {
      title: ['A year of your days,', 'in photos.'],
      body: 'Every day you took photos lights up a square. The weeks you travelled glow brightest.',
      label: 'Days with photos over the past year',
      stats: { photos: 'photos', days: 'days with photos', streak: 'day longest streak' },
      less: 'Less', more: 'More',
      weekdays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      tip: '{date} · {count} photos', tipNone: '{date} · No photos',
    },
    heroStage: {
      label: 'Photos from the past few weeks around Recap',
      hand: 'Recap’s Gallery on an unfolded iPhone Duo held in both hands: weeks in the sidebar, the week’s photos beside them.',
      also: 'Also available on iPhone and iPad',
    },
    badge: { join: 'Join on', joinMain: 'TestFlight', soon: 'Coming soon to the', soonMain: 'App Store' },
    privacySection: {
      title: ['Your photos stay on your phone.', 'No account. No cloud album.'],
      lead: 'Recap works with the library you already have, and nothing leaves your device to do it.',
      items: [
        { title: 'Organized on device', body: 'Categories, search and the assistant run on your iPhone. Your photos are never uploaded.' },
        { title: 'Nothing to sign up for', body: 'Open the app and start with the photos you already have.' },
        { title: 'Only what you allow', body: 'Share your whole library or just a few photos. Recap sees nothing else.' },
        { title: 'Apple’s services, nothing more', body: 'iCloud photo downloads, maps and place names come from Apple and may use the network.' },
      ],
      link: 'Read the Privacy Policy',
    },
    pricingCopy: {
      title: ['Free to look back.', 'Absolute, yearly or for good.'],
      lead: 'Weekly recaps, Place Memories, Smart Categories and share cards are free. Absolute adds more categories, Shuffle Mode, Live Photo sharing, this week two or more years back and more share templates: subscribe yearly, or buy once and keep it for life.',
      recommended: 'Recommended',
      free: {
        name: 'Free', description: 'Everything you need to look back.', price: '$0', priceNote: 'No account, no payment details',
        features: ['Weekly recaps', 'Place Memories', 'Smart Categories', 'Share cards'],
        cta: 'Download Recap',
      },
      yearly: {
        name: 'Yearly', description: 'More Smart Categories, Shuffle Mode, Live Photo sharing and this week in years past.', priceNote: 'Billed yearly, cancel anytime',
        features: ['Everything in Free', 'More Smart Categories', 'Shuffle Mode', 'Live Photo sharing', 'This week, two or more years back', 'More share templates'],
        cta: 'Get Absolute yearly',
      },
      lifetime: {
        name: 'Lifetime', description: 'More Smart Categories, Shuffle Mode, Live Photo sharing and this week in years past.', priceNote: 'One-time purchase, kept for life',
        features: ['Everything in Free', 'More Smart Categories', 'Shuffle Mode', 'Live Photo sharing', 'This week, two or more years back', 'More share templates'],
        cta: 'Get Absolute for life',
      },
      footnote: 'US App Store prices. Other regions follow local App Store pricing.',
    },
    install: {
      title: ['Your memories, ', 'week to week.'],
      lead: 'Available now on TestFlight for iPhone and iPad on iOS 18.6 or later. No account needed.',
      help: 'How to install from TestFlight',
      steps: ['Install TestFlight from the App Store.', 'Open the Recap invitation and accept it.', 'Install Recap and pick the photos it can see.'],
      note: 'Feedback sent from TestFlight goes straight to the developer.',
    },
    faq: 'Questions', faqTitle: 'Questions?',
    questions: [
      { question: 'How can I try Recap?', answer: 'Tap any TestFlight button on this page to open the TestFlight invitation, accept it, then install Recap.', id: 'installation' },
      { question: 'Which devices are supported?', answer: 'iPhone and iPad on iOS 18.6 or later. The assistant also needs Apple Intelligence.', id: 'devices' },
      { question: 'Does Recap need my whole library?', answer: 'No. Share your whole library or just a few photos. Place Memories needs photos with location.', id: 'permissions' },
      { question: 'Are my photos processed locally?', answer: 'Yes. Categories, search and the assistant run on your device. iCloud downloads, maps and place names use Apple’s services.', id: 'local-processing' },
      { question: 'What can the assistant find?', answer: 'It searches your themes, dates, favorites and media types. It needs iOS 26+, Apple Intelligence and a ready on-device model.', id: 'assistant' },
      { question: 'Does everything come with the free version?', answer: 'Everyday recaps are free. More Smart Categories, Shuffle Mode, Live Photo sharing, this week two or more years back and more share templates need Absolute.', id: 'membership' },
      { question: 'How can I send feedback?', answer: 'In TestFlight, open Recap and choose Send Beta Feedback. A screenshot helps.', id: 'contact' },
    ],
    updates: {
      title: 'Release notes', sectionTitle: 'What’s new.', seeAll: 'See all release notes',
      pageTitle: 'Release notes — Recap', pageDescription: 'What’s new in each Recap build.',
    },
    closingTitle: ['For every day', 'worth a second look.'],
    footer: {
      tagline: 'Every day worth a second look.',
      product: 'Product', support: 'Install & help', legal: 'Legal', install: 'Install', made: 'Made with', love: 'love',
    },
    privacy: 'Privacy Policy', terms: 'Terms of Service', contact: 'Contact', credits: 'Photo credits',
    contactPage: {
      title: 'How can we help?', description: 'Get help with Recap: common questions, email support, TestFlight feedback and release notes.',
      groups: { help: 'Get help', follow: 'Follow along' }, channels: 'Contact channels',
      faq: { title: 'Common questions', body: 'Weekly recaps, privacy, Absolute and installing.' },
      email: { title: 'Email support', body: 'For bugs, include your iPhone model, iOS version and Recap version.' },
      feedback: { title: 'TestFlight feedback', body: 'In TestFlight, open Recap and choose Send Beta Feedback. A screenshot helps.' },
      x: { title: 'X', body: 'Product news and behind-the-scenes notes.' },
      updates: { title: 'Release notes', body: 'Every update to Recap.' },
    },
    legalDraft: 'Review draft — not yet approved for publication', updated: 'Last updated', back: 'Back to Recap',
    notFound: 'This moment seems to have wandered off.', notFoundBody: 'The page you’re looking for isn’t here. Let’s go back.',
  },
  zh: {
    lang: 'zh-Hans', otherLanguage: 'English', otherLanguageShort: 'EN', languageLabel: '切换为英文', languageMenuLabel: '语言', themeLabel: '主题', themeDark: '深色', themeLight: '浅色',
    title: 'Recap — 重温照片里的生活',
    description: '用 Recap 按周回看照片，重温城市回忆，通过主题发现值得记住的瞬间。适用于 iPhone 和 iPad。',
    skip: '跳到正文',
    nav: { features: '功能', pricing: '定价', faq: '常见问题', updates: '更新', menu: '主导航' },
    join: '在 TestFlight 体验', pending: 'TestFlight 邀请准备中',
    heroLines: ['你的{0}回忆，', '一周又{1}一周。'],
    heroBadge: 'Recap 现已适配 iPhone Duo',
    heroDescription: '自动整理，好好浏览，轻松分享，每一周的照片都有去处。',
    heroNote: '适用于 iPhone 与 iPad，照片只留在你的设备上。',
    chapters: { sort: '整理', browse: '浏览', share: '分享', stats: '统计' },
    featuresIntro: {
      title: ['几万张照片，找不到想要的那张。', 'Recap 自动帮你整理好。'],
      body: '按周、按地点、按内容自动归类，再清掉重复的照片，不用自己建相册。',
      label: 'Recap 如何整理照片',
      choose: '选择一种整理方式',
    },
    features: [
      {
        id: 'week', label: '按周分类', icon: 'calendar',
        title: ['照片越拍越多，越翻越乱。', 'Recap 按周帮你收好。'],
        body: '每一周一张卡片，最新的在最上面。往下翻，每一周都还在。',
        states: ['本周 · 18 张', '第 44 周 · 12 张', '第 43 周 · 12 张'],
      },
      {
        id: 'places', label: '按地点整理', icon: 'pin',
        title: ['旅行的照片，散落在相册各处。', 'Recap 按城市自动收在一起。'],
        body: '旅行、周末、路过，Recap 找出照片里的地点，每座城一份回顾。',
        states: ['京都 · 42 张', '冲绳 · 36 张', '东京 · 28 张', '名古屋 · 19 张'],
      },
      {
        id: 'categories', label: '智能分类', icon: 'sparkle',
        title: ['想找小狗的照片，要翻很久。', 'Recap 按内容自动分类。'],
        body: '宠物、花卉、海边、日落各归各位，点一下就到。识别全程在 iPhone 上完成。',
        states: ['宠物时光', '花卉', '日落时刻', '山野'],
      },
      {
        id: 'cleanup', label: '清理', icon: 'layers',
        title: ['连拍和相似照片，占满了相册。', 'Recap 每组帮你留下最好的一张。'],
        body: '相似的照片自动归成一组，挑出最好的一张，其余一次清掉。',
        states: ['门口的猫 · 6 张相似', '冲绳帆船 · 4 张相似'],
      },
    ],
    browse: {
      title: ['回看照片，也可以很好玩。', '三种新的翻相册方式。'],
      body: '随机铺满整个相册，把照片做成拍立得，再回到往年的同一周。',
      absolute: 'Absolute 功能',
      shuffleBar: { label: '旅途风景', change: '换一组' },
      items: [
        { id: 'random', label: '随机模式', title: '把手机变成相框。', body: '点一下随机模式，把手机横过来。照片自己铺开、自己翻页，翻出那些差点忘记的瞬间。', absolute: true },
        { id: 'print', label: '拍立得', title: '把照片变成拍立得。', body: '换一种边框颜色，写一句话，再翻到背面看时间和地点。就在这里试试。', absolute: false },
        { id: 'past', label: '往年同周', title: '回到去年的这一周。', body: '拨动年份，回到一年前、两年前、三年前的同一周。', absolute: true },
      ],
      print: {
        colors: '相纸颜色', flip: '翻转',
        colorNames: ['白', '米', '鼠尾草绿', '天蓝', '浅粉', '墨黑'],
        text: '古宇利岛的海', captions: ['古宇利岛的海', '夏天的尾巴', '和你一起看海'], time: '下午4:20', place: '冲绳 · 古宇利岛', signature: 'Recap',
        alt: '一张拍立得：冲绳古宇利大桥旁的海滩',
      },
    },
    share: {
      title: ['喜欢的瞬间，', '分享出去。'],
      body: '直连 Instagram、Threads 和 X，分享 Live Photo，或套用模板。',
      apps: { title: ['一键直连', 'Instagram、Threads 和 X。'], note: '直连' },
      live: { title: ['把专属于你的 Live Photo', '分享出去。'], caption: '京都 · 鸭川', stories: '快拍', story: '你的快拍', now: '刚刚', message: '发送消息' },
      templates: {
        title: ['记录时间和地点。', ''], body: '默认卡片、宝丽来、富士 instax，更多模板即将推出。',
        cover: { week: '第 45 周', place: '镰仓', time: '周六 · 17:20' },
        items: [{ kind: 'Polaroid', place: '京都', date: '周日 · 17:20' }, { kind: 'instax mini', place: '名古屋', date: '周六 · 16:05' }],
      },
    },
    heatmap: {
      title: ['这一年，', '你拍下了多少日子。'],
      body: '拍过照片的每一天都会点亮一格，旅行的那几周最亮。',
      label: '过去一年里拍过照片的日子',
      stats: { photos: '张照片', days: '天拍过照片', streak: '天最长连续' },
      less: '少', more: '多',
      weekdays: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      tip: '{date} · {count} 张', tipNone: '{date} · 没有照片',
    },
    heroStage: {
      label: '围绕 Recap 的近几周照片',
      hand: '双手横握展开的 iPhone Duo，Recap 图库左侧按周列出，右侧是这一周的照片。',
      also: '同样支持 iPhone 与 iPad',
    },
    badge: { join: '加入', joinMain: 'TestFlight', soon: '即将上架', soonMain: 'App Store' },
    privacySection: {
      title: ['你的照片，只在你的手机上。', '没有账号，也没有云端相册。'],
      lead: 'Recap 用你已有的相册工作，整理照片不需要把任何东西传出去。',
      items: [
        { title: '在设备上整理', body: '分类、检索和助手都在 iPhone 上运行，照片不会上传。' },
        { title: '不用注册', body: '打开就能用，从你已有的照片开始。' },
        { title: '只看你允许的', body: '可以授权整个相册，也可以只选几张。其余的 Recap 看不到。' },
        { title: '联网的只有系统服务', body: 'iCloud 照片下载、地图和地名由 Apple 提供，可能会联网。' },
      ],
      link: '阅读隐私政策',
    },
    pricingCopy: {
      title: ['免费回看。', 'Absolute，按年或终身。'],
      lead: '每周回顾、地点回顾、智能分类和分享卡片都免费。Absolute 加上更多智能分类、随机模式、Live Photo 分享、两年前及更早的往年同周和更多分享模板，可以按年订阅，也可以一次买断、终身使用。',
      recommended: '推荐',
      free: {
        name: '免费', description: '回看需要的，都在这里。', price: '¥0', priceNote: '无需账号，无需支付信息',
        features: ['每周回顾', '地点回顾', '智能分类', '分享卡片'],
        cta: '下载 Recap',
      },
      yearly: {
        name: '年付', description: '更多智能分类、随机模式、Live Photo 分享和往年同周。', priceNote: '按年订阅，随时取消',
        features: ['免费版全部内容', '更多智能分类', '随机模式', 'Live Photo 分享', '两年前及更早的往年同周', '更多分享模板'],
        cta: '按年获取 Absolute',
      },
      lifetime: {
        name: '终身', description: '更多智能分类、随机模式、Live Photo 分享和往年同周。', priceNote: '一次购买，终身使用',
        features: ['免费版全部内容', '更多智能分类', '随机模式', 'Live Photo 分享', '两年前及更早的往年同周', '更多分享模板'],
        cta: '终身获取 Absolute',
      },
      footnote: '以上为中国大陆 App Store 价格，其他地区以当地 App Store 为准。',
    },
    install: {
      title: ['你的回忆，', '一周又一周。'],
      lead: '现已上线 TestFlight，支持 iOS 18.6 及以上的 iPhone 和 iPad，无需注册账号。',
      help: '如何通过 TestFlight 安装',
      steps: ['在 App Store 安装 TestFlight。', '打开 Recap 邀请并接受。', '安装 Recap，选择允许访问的照片。'],
      note: '在 TestFlight 里发送的反馈，会直接到开发者手里。',
    },
    faq: '常见问题', faqTitle: '还有疑问？',
    questions: [
      { question: '如何体验 Recap？', answer: '点页面上任意一个 TestFlight 按钮，打开 TestFlight 邀请并接受，然后安装 Recap。', id: 'installation' },
      { question: '支持哪些设备？', answer: 'iOS 18.6 及以上的 iPhone 和 iPad。助手另需 Apple Intelligence。', id: 'devices' },
      { question: '必须授权整个相册吗？', answer: '不用。可以授权整个相册，也可以只选几张。地点回顾需要照片带有位置信息。', id: 'permissions' },
      { question: '照片会在本地处理吗？', answer: '是。分类、检索和助手都在设备上运行。iCloud 下载、地图和地名使用 Apple 的服务。', id: 'local-processing' },
      { question: '助手可以找到什么？', answer: '它检索你的主题、日期、收藏和媒体类型。需要 iOS 26+、Apple Intelligence 和就绪的本地模型。', id: 'assistant' },
      { question: '所有功能都免费吗？', answer: '日常回顾免费。更多智能分类、随机模式、Live Photo 分享、两年前及更早的往年同周和更多分享模板需要 Absolute。', id: 'membership' },
      { question: '如何反馈问题？', answer: '在 TestFlight 里打开 Recap，选择“发送 Beta 反馈”，附上截图会更好。', id: 'contact' },
    ],
    updates: {
      title: '更新日志', sectionTitle: '最近更新了什么。', seeAll: '查看全部更新',
      pageTitle: '更新日志 — Recap', pageDescription: 'Recap 每个版本的新变化。',
    },
    closingTitle: ['为每一个', '想再看一眼的日子。'],
    footer: {
      tagline: '每一个，想再看一眼的日子。',
      product: '产品', support: '安装与帮助', legal: '法律', install: '安装', made: 'Made with', love: 'love',
    },
    privacy: '隐私政策', terms: '服务条款', contact: '联系', credits: '照片来源',
    contactPage: {
      title: '需要什么帮助？', description: '获取 Recap 帮助：常见问题、邮件支持、TestFlight 反馈与更新日志。',
      groups: { help: '获取帮助', follow: '关注动态' }, channels: '联系渠道',
      faq: { title: '常见问题', body: '每周回顾、隐私、Absolute 与安装。' },
      email: { title: '邮件支持', body: '反馈问题时，请附上 iPhone 型号、iOS 版本和 Recap 版本。' },
      feedback: { title: 'TestFlight 反馈', body: '在 TestFlight 里打开 Recap，选择“发送 Beta 反馈”，附上截图会更好。' },
      x: { title: 'X', body: '产品动态与幕后记录。' },
      updates: { title: '更新日志', body: 'Recap 的每一次更新。' },
    },
    legalDraft: '待审阅草稿，尚未批准发布', updated: '最后更新', back: '返回 Recap',
    notFound: '这一页，好像走远了。', notFoundBody: '没有找到你要访问的页面，先回到首页吧。',
  },
} as const;
