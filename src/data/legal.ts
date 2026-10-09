export const legal = {
  en: {
    privacy: {
      title: 'Privacy notes',
      intro: 'This draft describes the current Recap beta and this website. It needs the product owner’s review before public release.',
      sections: [
        { title: 'Your photo library', text: 'Recap uses the photo-library permission you grant through iOS. You may allow access to your library or a selected set of photos. Local photo indexes and classification results are kept on your device. City collections use location metadata already associated with accessible photos.' },
        { title: 'Organization and the assistant', text: 'Photo classification and indexed search run on your device. The assistant uses Apple’s on-device Foundation Models when available. It receives conversation text, supported category information, and limited summaries; it does not receive photo pixels, photo identifiers, file paths, or coordinates. Conversations are held in the current assistant session and cleared when it closes.' },
        { title: 'Apple system services', text: 'Local processing does not mean that every action is offline. iCloud photo downloads, map displays, and place-name lookups may use Apple’s services and the network. Their handling of data is governed by Apple’s policies. Recap’s current beta does not provide its own cross-device cloud sync.' },
        { title: 'Profile, sharing, and feedback', text: 'Recap creates a local profile without asking you to register a Recap account. Profile information and local records are stored on the device. Photos you explicitly share are passed to the destination you choose. Feedback you send through TestFlight or email may include your description, screenshots, or diagnostic files you attach.' },
        { title: 'This website', text: 'This website has no account creation, email collection form, or added analytics scripts. When published on Cloudflare Pages, Cloudflare handles ordinary web requests and may process request metadata according to its own privacy policy. Following a TestFlight link takes you to Apple’s service.' },
        { title: 'Your choices', text: 'You can change photo access in iOS Settings, choose what you share, and decide whether to send feedback. Removing the app removes its local app container; photos managed by Apple Photos and iCloud remain subject to those services and your own photo-library actions.' },
      ],
    },
    terms: {
      title: 'Beta terms',
      intro: 'These are review notes for the Recap beta, not a finalized legal agreement. They must be reviewed before public release.',
      sections: [
        { title: 'About Recap', text: 'Recap helps you browse, organize, and revisit photos you permit it to access. Features described on this website must be available in the public beta before the website is released.' },
        { title: 'Beta availability', text: 'Beta software may change, contain bugs, or become unavailable. TestFlight invitations, compatible builds, and build expiration are controlled through Apple’s TestFlight service. Apple’s applicable service terms also apply.' },
        { title: 'Your photos and permissions', text: 'You keep rights to your own photos. Only share or use content you are permitted to use. Review the iOS permission request and any editing or sharing action before continuing. Keep important photos backed up using a method you trust.' },
        { title: 'Membership features', text: 'Some advanced capabilities require an in-app entitlement. Current availability and product information are shown in the app. This website does not establish a price, free trial, or promise of permanent access to beta capabilities.' },
        { title: 'Local assistant', text: 'The assistant depends on Apple Intelligence eligibility, settings, and model readiness. Results are limited to supported local indexes and may be incomplete or inaccurate. The assistant does not identify arbitrary people or locations from images.' },
        { title: 'Feedback and updates', text: 'Use TestFlight’s feedback feature or the published contact address to report problems. Material changes to these notes should be reflected here when the website and app are updated.' },
      ],
    },
  },
  zh: {
    privacy: {
      title: '隐私说明',
      intro: '本草稿说明当前 Recap 测试版与官网的数据处理范围，正式发布前需要产品负责人核对。',
      sections: [
        { title: '你的照片库', text: 'Recap 使用你在 iOS 中授予的照片权限，可以访问完整相册或你选定的部分照片。照片索引与分类结果保存在当前设备。城市回顾使用可访问照片已有的地点信息。' },
        { title: '照片整理与助手', text: '照片分类与索引检索在设备上运行。助手在可用时使用 Apple 设备端 Foundation Models，接收对话文字、支持的分类信息与有限摘要，不接收照片像素、照片标识符、文件路径或坐标。对话只保留在当前助手会话中，关闭后清空。' },
        { title: 'Apple 系统服务', text: '本地处理不代表所有操作都离线。iCloud 照片下载、地图展示与地名查询可能使用 Apple 服务和网络，相关数据处理遵循 Apple 的政策。当前测试版不提供 Recap 自建的跨设备云同步。' },
        { title: '个人资料、分享与反馈', text: 'Recap 创建本地资料，无需注册 Recap 账号。资料与本地记录保存在当前设备。主动分享的照片会交给你选择的分享目标。通过 TestFlight 或邮件发送的反馈，可能包含你的描述、截图或主动附加的诊断文件。' },
        { title: '这个网站', text: '本网站不提供账号注册或邮箱收集表单，也不添加统计追踪脚本。部署到 Cloudflare Pages 后，Cloudflare 会处理正常网页请求，并可能按照其隐私政策处理请求信息。点击 TestFlight 邀请会进入 Apple 服务。' },
        { title: '你的选择', text: '你可以在 iOS 设置中调整照片权限，自行选择分享内容和是否发送反馈。卸载 App 会移除其本地应用容器；Apple 照片与 iCloud 管理的照片仍由相应服务和你对照片库的操作决定。' },
      ],
    },
    terms: {
      title: '测试版使用说明',
      intro: '以下为 Recap 测试版使用说明草稿，尚不是最终法律协议，正式发布前需要审阅。',
      sections: [
        { title: '关于 Recap', text: 'Recap 帮助你浏览、整理和回顾获准访问的照片。官网介绍的功能需要在公开测试构建中可用，才能正式发布网站。' },
        { title: '测试版可用性', text: '测试软件可能调整、出现问题或停止可用。TestFlight 邀请、兼容构建与构建有效期通过 Apple TestFlight 服务管理，Apple 的相关服务条款同样适用。' },
        { title: '照片与权限', text: '你保留自己照片的权利，仅使用和分享有权使用的内容。请核对系统权限请求，以及具体的编辑或分享操作。重要照片应使用你信任的方法备份。' },
        { title: '会员能力', text: '部分高级功能需要 App 内权益。当前功能与商品信息以 App 内展示为准，本网站不约定价格、免费试用，也不承诺测试能力永久开放。' },
        { title: '本地助手', text: '助手依赖 Apple Intelligence 设备支持、设置与模型就绪状态。结果受本地支持索引范围限制，可能不完整或不准确。助手不会从照片中识别任意人物或地点。' },
        { title: '反馈与更新', text: '可以通过 TestFlight 反馈功能或已公布的联系邮箱反馈问题。这些说明发生实质变更时，应随网站和 App 更新同步公布。' },
      ],
    },
  },
} as const;
