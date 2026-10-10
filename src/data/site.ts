export type Locale = 'en' | 'zh';

export const site = {
  origin: 'https://recapmoments.app',
  testflightUrl: (import.meta.env.PUBLIC_TESTFLIGHT_URL ?? '').trim(),
  contactEmail: (import.meta.env.PUBLIC_CONTACT_EMAIL ?? '').trim(),
  legalApproved: import.meta.env.LEGAL_CONTENT_APPROVED === 'true',
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

export const copy = {
  en: {
    lang: 'en', otherLanguage: '简体中文', languageLabel: 'Switch to Simplified Chinese',
    title: 'Recap — Relive the moments you almost forgot.',
    description: 'Rediscover your photo library through weekly recaps, city memories, and familiar themes. Recap for iPhone and iPad. Join the TestFlight beta.',
    skip: 'Skip to content', features: 'The little things', faq: 'Questions',
    join: 'Join the TestFlight beta', pending: 'Beta invitations coming soon',
    explore: 'Explore Recap',
    heroLines: ['Relive the moments', 'you almost forgot.'],
    heroDescription: 'Rediscover your photo library through weekly recaps, city memories, and familiar themes.',
    heroAlt: 'A hand holding a front-facing phone displaying Recap’s real home screen and this week’s photo card.',
    weekly: {
      title: 'Your days deserve\na second look.',
      body: 'The walk. The weekend. The photo you took for no particular reason. Browse your photos week by week, and find the life between the highlights.',
      alt: 'A real Recap weekly photo grid showing a bamboo forest, a dog, a coastline, and hills.',
    },
    cities: {
      title: 'Same city.\nA thousand memories.',
      body: 'Revisit the places your photos remember. Open a city collection and see the moments connected to it, even when they’re weeks apart.',
      alt: 'Recap’s city collection directory, with photo covers, city names, capture dates, and photo counts. The locations are demonstration data.',
    },
    themes: {
      title: 'Different days.\nFamiliar feelings.',
      body: 'Pets, plants, the sea, the last light of the day. On-device organization brings familiar themes together, so a little curiosity can take you a long way.',
      alt: 'Recap’s theme collections for pets, plants, the sea, and sunsets, using demonstration photos.',
    },
    moreTitle: 'Stay a little longer.',
    more: [
      { title: 'Let a moment find you.', body: 'With Absolute, explore random photos and stumble into something you’d almost forgotten.', kind: 'random' },
      { title: 'Make it worth sharing.', body: 'Turn a favorite photo into a thoughtfully framed card, ready to share.', kind: 'share' },
      { title: 'Start with a question.', body: 'On Apple Intelligence devices, ask in your own words to find photos through indexed themes, dates, and favorites.', kind: 'assistant' },
    ],
    privacyTitle: 'Your memories\nstay personal.',
    privacyBody: 'Photo organization and the assistant run on your device. There’s no new Recap account to create. Just your photos, and a new way to spend time with them.',
    privacyNote: 'System services such as iCloud photo downloads and map lookups may use the network.',
    privacyLink: 'Read our privacy notes',
    faqTitle: 'A few things you might wonder.',
    questions: [
      { question: 'How can I try Recap?', answer: 'Recap is currently in beta. When public invitations are available, the beta button will take you to Apple’s TestFlight invitation. Install TestFlight, accept the invitation, then install Recap. Invitations are still being prepared.', id: 'installation' },
      { question: 'Which devices are supported?', answer: 'Recap targets iPhone and iPad running iOS 18.6 or later. The local assistant has additional Apple Intelligence requirements; the other advertised browsing features don’t require Apple Intelligence.', id: 'devices' },
      { question: 'Does Recap need access to all my photos?', answer: 'You can grant full access or choose a limited selection. Recap can only browse and organize photos you allow it to access. City collections need location information in those photos.', id: 'permissions' },
      { question: 'Are my photos processed locally?', answer: 'Photo classification, indexed search, and the assistant run on your device. The assistant does not receive photo pixels or send your conversation to GPT. iCloud photo downloads, location names, and maps may rely on Apple’s network services.', id: 'local-processing' },
      { question: 'What can the assistant find?', answer: 'It searches existing photo indexes using supported themes, recognition tags, dates, favorites, and media types. It does not recognize arbitrary people or places. It requires iOS 26+, an eligible device, Apple Intelligence enabled, and a ready local model.', id: 'assistant' },
      { question: 'Does everything come with the free version?', answer: 'Some advanced features require a membership. Random browsing currently requires Absolute access. Availability and membership details are shown inside the app; the website does not promise that every beta feature is free.', id: 'membership' },
      { question: 'How can I send feedback?', answer: 'Beta testers can open Recap in TestFlight and choose “Send Beta Feedback.” Screenshots and a short description of what happened are always helpful.', id: 'contact' },
    ],
    closingTitle: 'Take another look.',
    closingBody: 'A whole lot of life. Already in your pocket.',
    privacy: 'Privacy', terms: 'Terms', contact: 'Contact', credits: 'Photo credits',
    legalDraft: 'Review draft — not yet approved for publication', updated: 'Updated October 9, 2026', back: 'Back to Recap',
    notFound: 'This moment seems to have wandered off.', notFoundBody: 'The page you’re looking for isn’t here. Let’s go back.',
  },
  zh: {
    lang: 'zh-Hans', otherLanguage: 'English', languageLabel: '切换为英文',
    title: 'Recap — 把拍过的日子，再过一遍。',
    description: '按周回看生活，从城市和主题里，重新发现值得记住的时刻。Recap 支持 iPhone 和 iPad，现处于 TestFlight 测试阶段。',
    skip: '跳到正文', features: '那些小事', faq: '常见问题',
    join: '加入 TestFlight 测试', pending: '测试邀请准备中',
    explore: '看看 Recap',
    heroLines: ['把拍过的日子，', '再过一遍。'],
    heroDescription: '按周回看生活，从城市和主题里，重新发现值得记住的时刻。',
    heroAlt: '手握正面手机，屏幕展示 Recap 真实首页和本周照片卡片。',
    weekly: {
      title: '日子值得，\n再看一遍。',
      body: '散步、周末，还有那张没有特别理由拍下的照片。按周翻看相册，重新发现那些大事之间的小日子。',
      alt: 'Recap 真实周回顾照片网格，展示竹林、宠物、海岸与山野。',
    },
    cities: {
      title: '同一座城，\n不同的回忆。',
      body: '沿着照片里的地点，再走一次。打开一座城市的回顾，把相隔几周的片段，放回同一个地方。',
      alt: 'Recap 真实城市回顾目录，展示照片封面、城市名称、拍摄日期与数量；地点为演示数据。',
    },
    themes: {
      title: '不同的日子，\n熟悉的心情。',
      body: '宠物、花草、海边，或是一天最后的光。设备上的照片整理，把熟悉的主题放在一起，让一点好奇心，带你多看一会儿。',
      alt: 'Recap 真实主题回顾卡片，展示宠物、植物、海边和日落；使用演示照片。',
    },
    moreTitle: '不妨，再待一会儿。',
    more: [
      { title: '让回忆，偶然找到你。', body: '使用 Absolute 随机看看照片，偶遇一个差点忘记的瞬间。', kind: 'random' },
      { title: '喜欢的照片，值得分享。', body: '把一张喜欢的照片做成精心呈现的卡片，再分享出去。', kind: 'share' },
      { title: '从一个问题，开始回顾。', body: '在支持 Apple Intelligence 的设备上，用自己的话提问，通过已有主题、日期和收藏索引寻找照片。', kind: 'assistant' },
    ],
    privacyTitle: '你的回忆，\n保持私密。',
    privacyBody: '照片分类和助手都在设备上运行。无需注册新的 Recap 账号，只有你的照片，和一种重新陪伴它们的方式。',
    privacyNote: 'iCloud 照片下载、地图与地名查询等系统服务可能联网。',
    privacyLink: '阅读隐私说明',
    faqTitle: '几个小问题。',
    questions: [
      { question: '如何体验 Recap？', answer: 'Recap 目前处于测试阶段。公开邀请准备好后，测试按钮会打开 Apple TestFlight 邀请页面。安装 TestFlight、接受邀请后，即可安装 Recap。目前公开测试邀请仍在准备中。', id: 'installation' },
      { question: '支持哪些设备？', answer: 'Recap 面向 iOS 18.6 及以上的 iPhone 和 iPad。本地助手另有 Apple Intelligence 要求，其他已介绍的浏览功能不依赖 Apple Intelligence。', id: 'devices' },
      { question: '必须授权整个相册吗？', answer: '可以授予完整权限，也可以仅选择部分照片。Recap 只能浏览和整理你允许访问的照片。城市回顾需要这些照片具有地点信息。', id: 'permissions' },
      { question: '照片会在本地处理吗？', answer: '照片分类、索引检索与助手都在设备上运行。助手不会接收照片像素，也不会把对话发送给 GPT。iCloud 照片下载、地名与地图可能使用 Apple 的网络服务。', id: 'local-processing' },
      { question: '助手可以找到什么？', answer: '助手通过已有照片索引中的支持主题、识别标签、日期、收藏与媒体类型找图，不会识别任意人物或地点。需要 iOS 26+、兼容设备、已启用 Apple Intelligence，以及就绪的本地模型。', id: 'assistant' },
      { question: '所有功能都免费吗？', answer: '部分高级能力需要会员，随机回看目前需要 Absolute 权益。功能开放范围和会员说明以 App 内展示为准，官网不承诺所有测试功能免费。', id: 'membership' },
      { question: '如何反馈问题？', answer: '测试用户可以在 TestFlight 中打开 Recap，选择“发送 Beta 反馈”。附上截图和简短的问题描述，会更方便定位。', id: 'contact' },
    ],
    closingTitle: '再看一眼吧。',
    closingBody: '口袋里，装着好多日子。',
    privacy: '隐私政策', terms: '使用条款', contact: '联系', credits: '照片来源',
    legalDraft: '待审阅草稿，尚未批准发布', updated: '更新于 2026 年 10 月 9 日', back: '返回 Recap',
    notFound: '这一页，好像走远了。', notFoundBody: '没有找到你要访问的页面，先回到首页吧。',
  },
} as const;
