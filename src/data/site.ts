export type Locale = 'en' | 'zh';

export const site = {
  origin: 'https://recapmoments.app',
  testflightUrl: (import.meta.env.PUBLIC_TESTFLIGHT_URL ?? 'https://testflight.apple.com/join/zhd3PaV4').trim(),
  operator: 'Recap Team',
  contactEmail: (import.meta.env.PUBLIC_CONTACT_EMAIL ?? 'support@recapmoments.app').trim(),
  legalApproved: (import.meta.env.LEGAL_CONTENT_APPROVED ?? 'true') === 'true',
};

if (site.testflightUrl && !/^https:\/\/testflight\.apple\.com\/join\/[A-Za-z0-9]+\/?$/.test(site.testflightUrl)) {
  throw new Error('PUBLIC_TESTFLIGHT_URL must be a public https://testflight.apple.com/join/ invitation.');
}
if (site.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.contactEmail)) {
  throw new Error('PUBLIC_CONTACT_EMAIL must be a public email address.');
}

export function localPath(locale: Locale, page = '') {
  return `${locale === 'zh' ? '/zh/' : '/'}${page ? `${page}/` : ''}`;
}

/** Absolute prices in CNY, as configured in `Recap.storekit` (China mainland App Store). */
export const pricing = {
  en: [
    { label: 'Monthly', price: '¥12', period: '/ month' },
    { label: 'Yearly', price: '¥68', period: '/ year' },
    { label: 'Lifetime', price: '¥128', period: 'one-time' },
  ],
  zh: [
    { label: '月度', price: '¥12', period: '/ 月' },
    { label: '年度', price: '¥68', period: '/ 年' },
    { label: '终身', price: '¥128', period: '一次买断' },
  ],
} as const;

export const copy = {
  en: {
    lang: 'en', otherLanguage: '简体中文', otherLanguageShort: '中', languageLabel: 'Switch to Simplified Chinese',
    title: 'Recap — Rediscover Your Photo Memories',
    description: 'Rediscover the moments in your photo library with weekly recaps, city memories, and themed collections. Made for iPhone and iPad.',
    skip: 'Skip to content',
    nav: { features: 'Features', pricing: 'Pricing', faq: 'FAQ', updates: 'Updates', menu: 'Main navigation' },
    join: 'Join the TestFlight beta', pending: 'Beta invitations coming soon',
    heroLines: ['Relive the {0} moments', 'you {1} almost forgot.'],
    heroDescription: 'Rediscover your photo library through weekly recaps, city memories, and familiar themes.',
    heroNote: 'For iPhone and iPad. Your photos stay on your device.',
    heroAlt: 'Recap’s latest home screen on iPhone Duo, unfolded with the sidebar beside this week’s photos.',
    heroAltPhone: 'Recap’s latest home screen on iPhone: this week’s photo card, favorites and media types.',
    features: [
      {
        id: 'week', label: 'This Week', icon: 'calendar',
        title: ['Thousands of photos, and this week gets lost.', 'Recap opens on it.'],
        body: 'Recap’s home starts with this week: the photos from these few days sit in one card at the top. Go back, and every week has a card of its own.',
        states: ['This Week · 18 photos', 'Week 44 · 12 photos', 'Week 43 · 12 photos'],
      },
      {
        id: 'places', label: 'Place Memories', icon: 'pin',
        title: ['Same city, months apart.', 'Recap gathers it into one recap.'],
        body: 'Trips, weekends and days passing through end up months apart in your library. Recap groups the places in your photos by city.',
        states: ['Kyoto · 42 photos', 'Lake Kawaguchi · 18 photos', 'Reykjavík · 21 photos'],
      },
      {
        id: 'categories', label: 'Smart Categories', icon: 'sparkle',
        title: ['Finding the dog photos means endless scrolling.', 'Smart Categories sorts them on device.'],
        body: 'Recap recognizes pets, flowers, the sea, sunsets and more right on your iPhone, and keeps each in its own category.',
        states: ['Pet friends', 'Flowers', 'By the sea', 'Sunset moments'],
      },
    ],
    more: {
      hero: {
        title: ['Everyone has shuffle.', 'Recap turns your iPhone into a frame.'],
        body: 'Tap Shuffle Mode and turn your iPhone sideways. Photos lay themselves out and keep turning up moments you’d almost forgotten.',
        cta: 'See pricing', note: 'Part of Absolute · unlock in the app',
      },
      groups: [
        {
          title: ['More than this week.', 'Photos that move, and this week in years past.'], note: 'Part of Absolute',
          cards: [
            { id: 'live', title: 'Instant photos that move.', body: 'Turn a Live Photo into a moving instant photo and share it in a tap.' },
            { id: 'past', title: 'What were you doing this week last year?', body: 'Turn the year wheel back to the same week, one, two, three years ago.' },
          ],
        },
        {
          title: ['Easy to find.', 'Easy to share.'], note: '',
          cards: [
            { id: 'assistant', title: 'Find photos in a sentence.', body: 'Ask in your own words. Recap searches your themes, dates and favorites on device.' },
            { id: 'share', title: 'A favorite, made into a print.', body: 'Turn any photo into a signed instant photo, ready to share.' },
          ],
        },
      ],
    },
    scenes: {
      weekdays: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      weekCaption: 'Wed · Nov 5',
      weekTitle: 'Week 45',
      random: 'Random',
      live: 'LIVE', share: 'Share', shared: 'Sent as a moving instant photo',
      week: 'Week 45',
      query: 'Photos by the sea last summer', searching: 'Searching your indexes…', results: '3 photos',
      frames: ['Classic', 'Instant', 'Border'], signature: 'Recap',
    },
    wall: {
      label: 'Photos sorted into weeks, from this week back to week 40',
      weeks: [
        { name: 'This Week', dates: 'Nov 2 – 8', count: '18 photos' },
        { name: 'Week 44', dates: 'Oct 26 – Nov 1', count: '12 photos' },
        { name: 'Week 43', dates: 'Oct 19 – 25', count: '12 photos' },
        { name: 'Week 42', dates: 'Oct 12 – 18', count: '9 photos' },
        { name: 'Week 41', dates: 'Oct 5 – 11', count: '14 photos' },
        { name: 'Week 40', dates: 'Sep 28 – Oct 4', count: '7 photos' },
      ],
    },
    devicesSection: {
      title: ['On any screen,', 'it starts with this week.'],
      body: 'Open Recap on iPhone and this week is right there. Unfold iPhone Duo and every week and category sits in the sidebar, with the week’s photos beside it.',
    },
    badge: { join: 'Join the beta on', joinMain: 'TestFlight', soon: 'Coming soon to the', soonMain: 'App Store' },
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
      title: ['Free to look back.', 'Absolute, yours for good.'],
      lead: 'Weekly recaps, Place Memories, Smart Categories and share cards are free. Absolute adds Shuffle Mode, Live Photo and this week in past years, bought once and kept for life.',
      recommended: 'Recommended',
      free: {
        name: 'Free', description: 'Everything you need to look back.', price: '¥0', priceNote: 'No account, no payment details',
        features: ['Weekly recaps', 'Place Memories', 'Smart Categories', 'Share cards'],
        cta: 'Get started',
      },
      absolute: {
        name: 'Absolute', description: 'For the moments you’d never see again.',
        priceNote: 'One-time purchase', altPrices: 'Or {monthly} monthly, {yearly} yearly',
        features: ['Everything in Free', 'Shuffle Mode', 'Live Photo', 'This week in past years'],
        cta: 'Unlock in the app',
      },
      footnote: 'China mainland App Store prices. Other regions follow local App Store pricing.',
    },
    install: {
      title: ['Try it today.', 'Coming soon to the App Store.'],
      lead: 'Recap is in public beta on TestFlight, for iPhone and iPad on iOS 18.6 or later.',
      steps: ['Install TestFlight from the App Store.', 'Open the Recap invitation and accept it.', 'Install Recap and pick the photos it can see.'],
      note: 'Feedback sent from TestFlight goes straight to the developer.',
    },
    faq: 'Questions', faqTitle: 'Questions?',
    questions: [
      { question: 'How can I try Recap?', answer: 'Tap any beta button on this page to open the TestFlight invitation, accept it, then install Recap.', id: 'installation' },
      { question: 'Which devices are supported?', answer: 'iPhone and iPad on iOS 18.6 or later. The assistant also needs Apple Intelligence.', id: 'devices' },
      { question: 'Does Recap need my whole library?', answer: 'No. Share your whole library or just a few photos. Place Memories needs photos with location.', id: 'permissions' },
      { question: 'Are my photos processed locally?', answer: 'Yes. Categories, search and the assistant run on your device. iCloud downloads, maps and place names use Apple’s services.', id: 'local-processing' },
      { question: 'What can the assistant find?', answer: 'It searches your themes, dates, favorites and media types. It needs iOS 26+, Apple Intelligence and a ready on-device model.', id: 'assistant' },
      { question: 'Does everything come with the free version?', answer: 'Everyday recaps are free. Shuffle Mode, Live Photo and this week in past years need Absolute.', id: 'membership' },
      { question: 'How can I send feedback?', answer: 'In TestFlight, open Recap and choose Send Beta Feedback. A screenshot helps.', id: 'contact' },
    ],
    updates: {
      title: 'Release notes', sectionTitle: 'What’s new.', seeAll: 'See all release notes',
      pageTitle: 'Release notes — Recap', pageDescription: 'What’s new in each Recap beta build.',
    },
    closingTitle: ['For every day', 'worth a second look.'],
    footer: {
      tagline: 'Every day worth a second look.',
      product: 'Product', support: 'Install & help', legal: 'Legal', install: 'Install', made: 'Made for iPhone and iPad.',
    },
    privacy: 'Privacy Policy', terms: 'Terms of Service', contact: 'Contact', credits: 'Photo credits',
    legalDraft: 'Review draft — not yet approved for publication', updated: 'Last updated', back: 'Back to Recap',
    notFound: 'This moment seems to have wandered off.', notFoundBody: 'The page you’re looking for isn’t here. Let’s go back.',
  },
  zh: {
    lang: 'zh-Hans', otherLanguage: 'English', otherLanguageShort: 'EN', languageLabel: '切换为英文',
    title: 'Recap — 重温照片里的生活',
    description: '用 Recap 按周回看照片，重温城市回忆，通过主题发现值得记住的瞬间。适用于 iPhone 和 iPad。',
    skip: '跳到正文',
    nav: { features: '功能', pricing: '定价', faq: '常见问题', updates: '更新', menu: '主导航' },
    join: '加入 TestFlight 测试', pending: '测试邀请准备中',
    heroLines: ['把拍过的{0}日子，', '再{1}过一遍。'],
    heroDescription: '按周回看生活，从城市和主题里，重新发现值得记住的时刻。',
    heroNote: '适用于 iPhone 与 iPad，照片只留在你的设备上。',
    heroAlt: 'iPhone Duo 展开后的 Recap 最新首页：侧栏与本周照片并排显示。',
    heroAltPhone: 'iPhone 上的 Recap 最新首页：本周照片卡片、个人收藏与媒体类型。',
    features: [
      {
        id: 'week', label: '本周', icon: 'calendar',
        title: ['几万张照片里，找不到这一周。', '打开 Recap，先看本周。'],
        body: 'Recap 的主页从这一周开始：这几天拍下的照片收在最上面一张卡片里。往前翻，每一周都有自己的一张。',
        states: ['本周 · 18 张', '第 44 周 · 12 张', '第 43 周 · 12 张'],
      },
      {
        id: 'places', label: '地点回顾', icon: 'pin',
        title: ['同一座城，散在好几个月里。', 'Recap 把它收成一份回顾。'],
        body: '旅行、周末和路过，在相册里被几个月的时间隔开。Recap 按城市把照片里的地点收在一起。',
        states: ['京都 · 42 张', '河口湖 · 18 张', '雷克雅未克 · 21 张'],
      },
      {
        id: 'categories', label: '智能分类', icon: 'sparkle',
        title: ['想找小狗的照片，只能一直往下翻。', '智能分类在设备上帮你分好。'],
        body: 'Recap 在 iPhone 上识别宠物、花卉、海边、日落等内容，各自收进一个分类。',
        states: ['宠物时光', '花卉', '海边', '日落时刻'],
      },
    ],
    more: {
      hero: {
        title: ['随机播放，谁都有。', 'Recap 把手机变成相框。'],
        body: '点一下随机模式，把手机横过来。照片自己铺开、自己翻页，翻出那些差点忘记的瞬间。',
        cta: '查看定价', note: 'Absolute 功能 · 在 App 内解锁',
      },
      groups: [
        {
          title: ['不止这一周。', '还有会动的照片，和往年的今天。'], note: 'Absolute 功能',
          cards: [
            { id: 'live', title: '会动的拍立得。', body: '把 Live Photo 做成会动的拍立得，一键分享给朋友。' },
            { id: 'past', title: '去年的这一周，你在做什么？', body: '拨动年份，回到一年前、两年前、三年前的同一周。' },
          ],
        },
        {
          title: ['找得到，', '也分享得出去。'], note: '',
          cards: [
            { id: 'assistant', title: '一句话，找到照片。', body: '用自己的话提问，在设备上检索已有的主题、日期和收藏。' },
            { id: 'share', title: '喜欢的照片，做成拍立得。', body: '带上署名，分享出去。' },
          ],
        },
      ],
    },
    scenes: {
      weekdays: ['一', '二', '三', '四', '五', '六', '日'],
      weekCaption: '周三 · 11月5日',
      weekTitle: '第 45 周',
      random: '随机模式',
      live: 'LIVE', share: '分享', shared: '已作为动态拍立得分享',
      week: '第 45 周',
      query: '找出去年夏天在海边拍的照片', searching: '正在检索照片索引…', results: '3 张照片',
      frames: ['经典', '拍立得', '留白'], signature: 'Recap',
    },
    wall: {
      label: '按周排好的照片，从本周到第 40 周',
      weeks: [
        { name: '本周', dates: '11月2日 – 8日', count: '18 张' },
        { name: '第 44 周', dates: '10月26日 – 11月1日', count: '12 张' },
        { name: '第 43 周', dates: '10月19日 – 25日', count: '12 张' },
        { name: '第 42 周', dates: '10月12日 – 18日', count: '9 张' },
        { name: '第 41 周', dates: '10月5日 – 11日', count: '14 张' },
        { name: '第 40 周', dates: '9月28日 – 10月4日', count: '7 张' },
      ],
    },
    devicesSection: {
      title: ['大屏小屏，', '都从这一周开始。'],
      body: '在 iPhone 上打开 Recap，先看到的就是本周。展开 iPhone Duo，侧栏列出每一周和分类，旁边就是这一周的照片。',
    },
    badge: { join: '加入公开测试', joinMain: 'TestFlight', soon: '即将上架', soonMain: 'App Store' },
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
      title: ['免费回看。', 'Absolute，一次买断。'],
      lead: '每周回顾、地点回顾、智能分类和分享卡片都免费。Absolute 加上随机模式、Live Photo 和往年同周，一次购买，终身使用。',
      recommended: '推荐',
      free: {
        name: '免费', description: '回看需要的，都在这里。', price: '¥0', priceNote: '无需账号，无需支付信息',
        features: ['每周回顾', '地点回顾', '智能分类', '分享卡片'],
        cta: '开始使用',
      },
      absolute: {
        name: 'Absolute', description: '给那些原本不会再看到的瞬间。',
        priceNote: '一次购买', altPrices: '也可按月 {monthly} 或按年 {yearly} 订阅',
        features: ['免费版全部内容', '随机模式', 'Live Photo', '往年同周'],
        cta: '在 App 内解锁',
      },
      footnote: '以上为中国大陆 App Store 价格，其他地区以当地 App Store 为准。',
    },
    install: {
      title: ['现在就能试。', '正式版即将上架 App Store。'],
      lead: 'Recap 正在 TestFlight 公开测试，支持 iOS 18.6 及以上的 iPhone 和 iPad。',
      steps: ['在 App Store 安装 TestFlight。', '打开 Recap 测试邀请并接受。', '安装 Recap，选择允许访问的照片。'],
      note: '在 TestFlight 里发送的反馈，会直接到开发者手里。',
    },
    faq: '常见问题', faqTitle: '还有疑问？',
    questions: [
      { question: '如何体验 Recap？', answer: '点页面上任意一个测试按钮，打开 TestFlight 邀请并接受，然后安装 Recap。', id: 'installation' },
      { question: '支持哪些设备？', answer: 'iOS 18.6 及以上的 iPhone 和 iPad。助手另需 Apple Intelligence。', id: 'devices' },
      { question: '必须授权整个相册吗？', answer: '不用。可以授权整个相册，也可以只选几张。地点回顾需要照片带有位置信息。', id: 'permissions' },
      { question: '照片会在本地处理吗？', answer: '是。分类、检索和助手都在设备上运行。iCloud 下载、地图和地名使用 Apple 的服务。', id: 'local-processing' },
      { question: '助手可以找到什么？', answer: '它检索你的主题、日期、收藏和媒体类型。需要 iOS 26+、Apple Intelligence 和就绪的本地模型。', id: 'assistant' },
      { question: '所有功能都免费吗？', answer: '日常回顾免费。随机模式、Live Photo 和往年同周需要 Absolute。', id: 'membership' },
      { question: '如何反馈问题？', answer: '在 TestFlight 里打开 Recap，选择“发送 Beta 反馈”，附上截图会更好。', id: 'contact' },
    ],
    updates: {
      title: '更新日志', sectionTitle: '最近更新了什么。', seeAll: '查看全部更新',
      pageTitle: '更新日志 — Recap', pageDescription: 'Recap 每个测试版本的新变化。',
    },
    closingTitle: ['为每一个', '想再看一眼的日子。'],
    footer: {
      tagline: '每一个，想再看一眼的日子。',
      product: '产品', support: '安装与帮助', legal: '法律', install: '安装', made: '为 iPhone 与 iPad 打造。',
    },
    privacy: '隐私政策', terms: '服务条款', contact: '联系', credits: '照片来源',
    legalDraft: '待审阅草稿，尚未批准发布', updated: '最后更新', back: '返回 Recap',
    notFound: '这一页，好像走远了。', notFoundBody: '没有找到你要访问的页面，先回到首页吧。',
  },
} as const;
