import type { Locale } from './site';

interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  links?: { label: string; href: string }[];
}

interface LegalDocument {
  title: string;
  description: string;
  intro: string;
  sections: LegalSection[];
}

export const legalUpdated = '2026-10-27';

export const legal: Record<Locale, Record<'privacy' | 'terms', LegalDocument>> = {
  en: {
    privacy: {
      title: 'Privacy Policy',
      description: 'How Recap handles your photos, on-device assistant, permissions, purchases, feedback, and website visits, and the choices available to you.',
      intro: 'Your photo library is personal. Recap organizes photos and runs its assistant on your device. This policy explains that local processing, the network services used for particular actions, and the information you choose to share with us.',
      sections: [
        {
          id: 'scope', title: 'Who we are and what this policy covers',
          paragraphs: [
            'This policy covers Recap for iPhone and iPad, including its TestFlight beta, this website, and support communications. Recap is provided by the service provider identified in the contact section below, referred to as “we” or “us”.',
            'We do not require a Recap account, sell your personal information, use your photo library for advertising, or upload photos or assistant conversations to a Recap server for model training. Apple, your email provider, and apps you choose to share with have their own privacy policies.',
          ],
        },
        {
          id: 'photo-library', title: 'Photos, metadata, and local records',
          paragraphs: [
            'With your permission, Recap reads accessible photos and videos from Apple Photos, together with capture dates, media types, favorites, album membership, and location metadata already attached to those items. These support weekly recaps, city collections, themes, search, and photo viewing.',
            'Indexes, classification results, thumbnails, preferences, your chosen profile name and avatar, and app records are stored on your device. Photo classification runs on-device. Granting photo access does not by itself send your library to us. Photo locations can reveal sensitive information about places you have visited; city collections use this metadata and may omit photos without it.',
          ],
        },
        {
          id: 'on-device-assistant', title: 'The on-device assistant',
          paragraphs: [
            'When available, the assistant uses Apple’s on-device Foundation Models. It receives conversation text, aggregate photo-index statistics, supported category and recognition labels, and local help information. The model does not receive photo pixels, thumbnails, photo identifiers, file paths, or coordinates. Matching photos are retrieved separately from the local index.',
            'Messages and photo results stay in memory for the current assistant session and are cleared when it ends or closes. They are not saved as conversation history or sent to an external AI service. Apple may need a network connection to download or prepare system models.',
          ],
        },
        {
          id: 'permissions', title: 'Permissions and your controls',
          paragraphs: ['Recap requests system permissions for the features you use. You can change them in iOS or iPadOS Settings.'],
          items: [
            'Photos: choose full access, selected photos, or no access. Recap can only organize currently accessible items. Restricted or withdrawn access limits browsing and indexing.',
            'Camera: used if you choose to take a profile photo. Declining it does not prevent photo-library browsing.',
            'Saving, editing, deleting, and sharing: actions you initiate may change Apple Photos or pass selected content to another app. Review system prompts and the destination before confirming.',
          ],
        },
        {
          id: 'purchases', title: 'Purchases and entitlements',
          paragraphs: [
            'Apple handles App Store payments. Recap uses StoreKit to obtain product information and verify entitlements, including the product, expiration, and revocation status, to unlock features and restore eligible purchases. We do not receive your full payment-card information. Apple handles billing and Apple Account information under its own policies. TestFlight purchases use Apple’s test environment rather than a production payment.',
          ],
        },
        {
          id: 'diagnostics-support', title: 'Diagnostics, TestFlight, and support',
          paragraphs: [
            'Recap keeps local performance logs to help investigate reliability and speed. They may contain event names, timestamps, durations, item counts, cache state, and technical session identifiers. These local logs are not automatically uploaded to us.',
            'Email feedback drafts include your description and technical context such as device model, hardware model identifier, system version, region, time zone, app version, build, and app language. The in-app mail flow also attaches recent performance logs. Your email address, message, and any screenshots or files you send become available to us and your email provider. Review the draft and attachments before sending; preparing a draft does not send it.',
            'TestFlight is a separate Apple service. Apple makes beta usage and crash information available to developers under its TestFlight terms and privacy information. TestFlight feedback may include screenshots, comments, and technical details. We use information received through these channels to answer requests, diagnose problems, and improve Recap.',
          ],
          links: [{ label: 'Apple TestFlight: testing, feedback, and privacy', href: 'https://testflight.apple.com/' }],
        },
        {
          id: 'website', title: 'This website',
          paragraphs: [
            'This website has no Recap account registration, email collection form, advertising trackers, or added analytics scripts. It does not use cookies or browser storage for advertising or visitor profiling.',
            'Vercel hosts this website, and Cloudflare provides delivery and protection. These providers process ordinary web requests, which may include your IP address, requested URL, browser information, request time, and security records, to deliver and protect the site. They handle that information under the applicable service arrangements and privacy notices. External links take you to the chosen provider’s service.',
          ],
          links: [
            { label: 'Vercel Privacy Notice', href: 'https://vercel.com/legal/privacy-notice' },
            { label: 'Cloudflare Privacy Policy', href: 'https://www.cloudflare.com/privacypolicy/' },
          ],
        },
        {
          id: 'third-parties', title: 'Sharing, system services, and international processing',
          paragraphs: [
            'Local processing does not make every feature offline. Apple may process network requests for iCloud photo downloads, maps, place-name lookups, system model downloads, purchases, device backups, and TestFlight. Map or place-name requests may send relevant location information to Apple. Recap does not currently provide its own cross-device cloud sync.',
            'Sharing a photo or card, opening an external map, or sending feedback passes the selected content and information needed for that action to your chosen destination. Recipients apply their own use, retention, and sharing practices. Email and website delivery providers process information needed for those services.',
            'We may disclose information where legally required or reasonably necessary to address fraud, abuse, security incidents, or legal claims. Providers may process information outside your country or region. Where a transfer arranged by us requires safeguards under applicable law, we use the safeguards that law requires.',
          ],
          links: [{ label: 'Apple Privacy Policy', href: 'https://www.apple.com/legal/privacy/' }],
        },
        {
          id: 'retention-security', title: 'Retention, deletion, and security',
          paragraphs: [
            'Local indexes, caches, profile details, and settings remain on your device until removed or replaced during normal app operation or deleted with the app. Revoking photo access does not necessarily erase previously created local records. Deleting the app removes its local container according to Apple’s platform behavior; offloading may retain its data.',
            'Removing Recap does not delete Apple Photos originals, iCloud copies, backups, shared copies, or email. Manage those through Apple or the relevant recipient. Changes or deletions you explicitly make in Apple Photos through Recap may sync through your own iCloud Photos settings.',
            'We keep support messages, attachments, and related technical records only as long as reasonably needed for support, security, legal obligations, or legal claims, and then delete or de-identify them. Providers may have separate retention periods. You can request deletion of information you sent us using the contact details below.',
            'We use reasonable safeguards appropriate to the information handled and rely on Apple’s platform protections for local app data. No storage or transmission method is completely secure. Protect your device, accounts, and backups.',
          ],
        },
        {
          id: 'rights', title: 'Your rights and choices',
          paragraphs: [
            'Depending on applicable law, you may have rights to access, correct, delete, obtain a copy of, restrict, or object to processing of personal information, and to withdraw consent where consent is the basis for processing. You may contact the relevant privacy regulator. This policy does not limit mandatory rights.',
            'Where a legal basis is required, we rely on your permission or consent for optional access and sharing, fulfilling requests for functionality and support, legitimate interests in reliability and security where permitted, and legal obligations. A system permission does not authorize unrelated processing.',
          ],
          items: [
            'Change photo or camera access in system Settings and decide which optional features to use.',
            'Review shared content, support messages, and attachments before sending.',
            'Contact us about information we hold. We cannot remotely view or erase a photo library stored only on your device.',
            'Use Apple’s or another provider’s privacy controls for information it holds independently. We may request only information reasonably needed to identify and handle your request.',
          ],
        },
        {
          id: 'children', title: 'Children’s privacy',
          paragraphs: [
            'Recap is not specifically directed at children. We do not knowingly collect children’s personal information without parental consent where it is required. Eligibility also depends on the App Store rating and the terms of Apple services used. A parent or guardian who believes a child sent us personal information can contact us for review and deletion where required. Please do not include private photos unless necessary to handle the request.',
          ],
        },
        {
          id: 'changes', title: 'Changes to this policy',
          paragraphs: [
            'We will update this page and its date when our practices or relevant requirements change. Where required, we will provide additional notice and obtain necessary consent before materially different processing begins. Optional sharing remains your choice; reading this policy or continuing to browse does not replace consent required by law.',
          ],
        },
      ],
    },
    terms: {
      title: 'Terms of Service',
      description: 'Terms for using Recap: licensing, your photos, memberships, subscriptions, TestFlight testing, the local assistant, and consumer rights.',
      intro: 'These terms explain how you may use Recap and this website, what to expect from paid features and the beta, and the rights that remain yours. Please read them with our Privacy Policy and applicable Apple terms.',
      sections: [
        {
          id: 'scope', title: 'About these terms',
          paragraphs: [
            'Recap is provided by the service provider identified below (“we” or “us”). It helps you browse, organize, and revisit photos you allow it to access. These terms cover Recap, its website, and related support. By using these services, you agree to the terms applicable to that use. If you do not agree, stop using them.',
            'You must be legally able to accept these terms or have any legally required parental consent and supervision. Apple’s age, account, and store requirements also apply. The Privacy Policy explains data handling; accepting these terms does not replace separate consent required by law.',
          ],
        },
        {
          id: 'license', title: 'App license and intellectual property',
          paragraphs: [
            'For App Store versions, Apple’s Standard Licensed Application End User License Agreement applies unless a separate custom EULA is provided with that version. This page supplements that license with Recap’s service information and does not replace Apple’s official text. If a conflict concerns the app license, the applicable EULA controls.',
            'Recap’s software, branding, and original website materials belong to us or the relevant rights holders. Use the app within its license. Do not redistribute it, bypass purchase or security controls, disrupt services, or infringe others’ rights. Restrictions on copying, modification, and reverse engineering remain subject to applicable law and relevant open-source licenses.',
          ],
          links: [{ label: 'Apple Standard EULA — official text', href: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/' }],
        },
        {
          id: 'requirements', title: 'Devices, permissions, and availability',
          paragraphs: [
            'Availability depends on the app version, device, operating system, region, permissions, and required entitlements. The store listing or TestFlight invitation provides the requirements for that build. Limited photo access, missing location metadata, unavailable iCloud originals, or unfinished indexing may affect results. Apple system services and external actions may need a network connection.',
          ],
        },
        {
          id: 'your-content', title: 'Your photos and responsibilities',
          paragraphs: [
            'You keep your rights in your photos, videos, and other content. Using Recap does not transfer ownership to us or grant us a right to publish it. Recap processes permitted content to provide the features you use.',
            'Use and share only content you are authorized to use. Respect others’ privacy, copyright, and other rights. Review sharing recipients and save, edit, or delete actions. Changes to Apple Photos may also affect other devices through iCloud Photos.',
            'Recap is not a backup service. Independently back up important originals. Removing the app or changing devices may remove local indexes, preferences, and app records; do not use them as your only copy of important information.',
          ],
        },
        {
          id: 'purchases', title: 'Memberships, subscriptions, and refunds',
          paragraphs: [
            'Some features require a paid entitlement. The purchase screen and Apple confirmation show the product, price, currency, billing period, included features, and any trial or offer. Review them before confirming. Website descriptions do not create a free trial or guarantee permanent free access.',
            'Production purchases are charged through your Apple Account. Auto-renewing subscriptions renew unless canceled under Apple’s displayed conditions. Manage or cancel in Settings > your name > Subscriptions. Deleting Recap does not cancel a subscription. Any trial or offer’s duration, eligibility, and conversion to paid service are shown at purchase; cancel before the applicable deadline to avoid renewal charges.',
            'A one-time purchase does not recur. It provides the entitlement described at purchase and does not promise support for every future device or every separately offered future product. Restore eligible purchases using the app’s restore function and the original purchasing Apple Account.',
            'Apple handles App Store refund requests under its rules and applicable consumer law. Eligibility depends on the circumstances and region. Contact us about feature or entitlement issues and use Apple’s refund process for an Apple charge. Statutory refund and consumer rights remain unaffected.',
          ],
          links: [
            { label: 'Manage or cancel an Apple subscription', href: 'https://support.apple.com/118428' },
            { label: 'Request an App Store refund', href: 'https://support.apple.com/118223' },
          ],
        },
        {
          id: 'beta', title: 'TestFlight beta testing',
          paragraphs: [
            'Beta versions may contain defects, change without a fixed release schedule, or expire. Access depends on invitations, compatible builds, and Apple’s TestFlight service. Back up important content and read the notes for your build.',
            'TestFlight in-app purchases are test transactions, are not charged as production purchases, and do not carry over as paid App Store entitlements. Test access does not promise a free production license. Apple’s TestFlight terms and privacy information govern the testing service and diagnostics it makes available.',
          ],
          links: [{ label: 'Apple TestFlight information', href: 'https://testflight.apple.com/' }],
        },
        {
          id: 'assistant', title: 'Classification, search, and the assistant',
          paragraphs: [
            'Classifications, city groupings, search results, and assistant responses may be incomplete or incorrect. They help you browse; they are not a verified record of people, events, or places.',
            'The local assistant requires a supported device, iOS or iPadOS 26 or later, Apple Intelligence enabled, and a ready model. It uses supported local indexes and help information, does not inspect photo pixels, and does not identify arbitrary people or infer arbitrary places. Review results before relying on or sharing them. An unavailable model may make the assistant unavailable.',
          ],
        },
        {
          id: 'third-parties', title: 'Third-party services',
          paragraphs: [
            'Apple Photos, iCloud, maps, App Store, TestFlight, email, and apps or websites you open are operated by their respective providers under their own terms and policies. Their availability may affect Recap features. We do not control a recipient’s use of content you share. Review destinations, permissions, and applicable terms. The Privacy Policy explains relevant data flows.',
          ],
        },
        {
          id: 'availability-termination', title: 'Updates, interruptions, and ending use',
          paragraphs: [
            'We may update features to improve Recap, address security, comply with law, or respond to platform changes. We cannot guarantee uninterrupted or error-free operation. Material changes affecting paid access remain subject to purchase terms and mandatory consumer protections, including required notice and remedies.',
            'You can stop using Recap and delete it at any time. Cancel subscriptions separately through Apple. App usage rights may end as provided by the applicable EULA, including for a license breach. Ending use does not automatically remove copies held by Apple, email providers, or sharing recipients.',
          ],
        },
        {
          id: 'liability', title: 'Warranties and responsibility',
          paragraphs: [
            'To the extent permitted by law and subject to the applicable EULA, Recap and this website are provided on an “as is” and “as available” basis. We do not promise that results will always be accurate, every photo will be indexed, or third-party services will always work.',
            'Liability limitations apply only as permitted by applicable law and the app license. These terms do not exclude liability that cannot lawfully be excluded or remove mandatory warranties, remedies, or consumer protections. They do not limit rights concerning fraud, intentional misconduct, or personal injury where such limits are prohibited.',
          ],
        },
        {
          id: 'law', title: 'Applicable law and disputes',
          paragraphs: [
            'The app EULA sets out its governing-law and dispute provisions. For other services and website use, applicable law determines the governing rules and competent courts. These terms do not impose mandatory arbitration or waive mandatory local court or consumer remedies. You may contact us to try to resolve a concern, but doing so is not a condition for exercising statutory rights or contacting a regulator or competent court.',
          ],
        },
        {
          id: 'changes', title: 'Changes and language versions',
          paragraphs: [
            'We may update these terms as Recap or requirements change. The date above identifies this version. We will communicate material changes and seek acceptance where required before they apply. Changes do not retroactively remove accrued rights.',
            'English and Simplified Chinese versions are intended to have the same meaning. Differences are subject to applicable law and mandatory language protections. Apple’s official EULA text remains authoritative for that agreement.',
          ],
        },
      ],
    },
  },
  zh: {
    privacy: {
      title: '隐私政策',
      description: '了解 Recap 如何处理照片库、本地助手、系统权限、购买、反馈与网站访问，以及你可以行使的选择和权利。',
      intro: '照片库记录着你的私人生活。Recap 在设备上整理照片并运行助手。本政策说明本地处理的范围、特定操作涉及的网络服务，以及你主动向我们提供的信息。',
      sections: [
        {
          id: 'scope', title: '我们是谁与政策适用范围',
          paragraphs: [
            '本政策适用于 iPhone 和 iPad 上的 Recap App（包括 TestFlight 测试版）、本网站及相关支持沟通。Recap 由本页联系方式中列明的服务提供方提供，以下称“我们”。',
            'Recap 无需注册独立账号。我们不出售你的个人信息，不利用你的照片库投放广告，也不会将照片或助手对话上传到 Recap 服务器用于训练模型。Apple、你的邮件服务商及你选择的分享目标，分别按照各自的隐私政策处理信息。',
          ],
        },
        {
          id: 'photo-library', title: '照片、元数据与本地记录',
          paragraphs: [
            '获得你的授权后，Recap 会读取 Apple 照片中允许访问的照片、视频，以及拍摄日期、媒体类型、收藏状态、相册归属和照片已有的地点信息，用于周回顾、城市回忆、主题整理、检索和照片浏览。',
            '照片索引、分类结果、缩略图、偏好设置、你选择的名字和头像等本地资料，以及 App 运行记录保存在设备上。照片分类使用设备端处理。授予照片权限本身不会将照片库发送给我们。照片地点可能反映你曾到访的位置，具有敏感性；城市回顾使用这些元数据，缺少地点信息的照片可能不会出现在相应城市中。',
          ],
        },
        {
          id: 'on-device-assistant', title: '设备端助手',
          paragraphs: [
            '在可用时，Recap 助手调用 Apple 设备端 Foundation Models。模型接收对话文字、照片索引汇总统计、支持的分类与识别标签，以及本地使用帮助，不接收照片像素、缩略图、照片标识符、文件路径或坐标。照片匹配由 App 另行通过本地索引完成。',
            '对话及照片结果仅保留在当前助手会话的内存中，结束或关闭会话后清空，不保存为历史对话，也不会发送给外部 AI 服务。Apple 下载或准备系统模型时可能需要联网。',
          ],
        },
        {
          id: 'permissions', title: '系统权限与控制',
          paragraphs: ['Recap 根据你使用的功能申请系统权限。你可以随时在 iOS 或 iPadOS 设置中调整。'],
          items: [
            '照片：可以允许完整访问、仅选定照片，或拒绝访问。Recap 只能整理当前获准访问的内容；限制或撤回权限会影响浏览与索引。',
            '相机：在你选择拍摄个人头像时使用。拒绝相机权限不影响照片库浏览。',
            '保存、编辑、删除与分享：你主动执行的操作可能修改 Apple 照片中的内容，或将选定内容传给其他 App。请在确认前核对系统提示与接收目标。',
          ],
        },
        {
          id: 'purchases', title: '购买与权益信息',
          paragraphs: [
            'App Store 付款由 Apple 处理。Recap 通过 StoreKit 获取商品信息并核验购买权益，包括商品、到期与撤销状态，用于开放相应功能和恢复符合条件的购买。我们不会收到你的完整银行卡信息。账单和 Apple 账户信息由 Apple 按其政策处理。TestFlight 中的购买使用 Apple 测试环境，并非正式付款。',
          ],
        },
        {
          id: 'diagnostics-support', title: '本地诊断、TestFlight 与反馈',
          paragraphs: [
            'Recap 会在本地记录性能日志，用于排查可靠性与速度问题，可能包含事件名称、时间、耗时、项目数量、缓存状态及技术会话标识。这些日志不会自动上传给我们。',
            '邮件反馈草稿会包含你的问题描述，以及设备型号、硬件型号标识、系统版本、地区、时区、App 版本、构建号和应用语言等技术环境。App 内的系统邮件流程还会附上最近的性能日志。你发送的邮箱地址、正文、截图及附件会提供给我们和邮件服务商。发送前请检查草稿与附件；生成草稿不会自动发出邮件。',
            'TestFlight 是 Apple 独立提供的服务。Apple 会依据 TestFlight 条款和隐私说明，向开发者提供测试使用与崩溃信息。通过 TestFlight 提交的反馈还可能包含截图、评论与技术详情。我们使用这些渠道收到的信息回复请求、排查问题并改进 Recap。',
          ],
          links: [{ label: 'Apple TestFlight：测试、反馈与隐私说明', href: 'https://testflight.apple.com/' }],
        },
        {
          id: 'website', title: '本网站',
          paragraphs: [
            '本网站不提供 Recap 账号注册或邮箱收集表单，不添加广告追踪或统计分析脚本，也不使用 Cookie 或浏览器存储进行广告投放或访客画像分析。',
            '本网站由 Vercel 托管，Cloudflare 提供内容分发与安全保护。服务商会处理正常网页请求，其中可能包含 IP 地址、访问网址、浏览器信息、请求时间与安全记录，用于提供网页和保障安全，并按照适用的服务约定及隐私说明处理相关信息。点击外部链接后，你会进入对应服务商的网站或服务。',
          ],
          links: [
            { label: 'Vercel 隐私说明', href: 'https://vercel.com/legal/privacy-notice' },
            { label: 'Cloudflare 隐私政策', href: 'https://www.cloudflare.com/privacypolicy/' },
          ],
        },
        {
          id: 'third-parties', title: '分享、系统服务与跨境处理',
          paragraphs: [
            '本地处理不代表所有功能都离线。iCloud 原片下载、地图、地名查询、系统模型下载、购买、设备备份及 TestFlight 可能由 Apple 通过网络提供；地图或地名查询可能向 Apple 发送相关地点信息。当前 Recap 不提供自建的跨设备云同步。',
            '主动分享照片或卡片、打开外部地图，或发送反馈时，选定内容及完成操作所需的信息会交给你选择的目标。接收方按自身规则使用、保留或继续分享这些信息。邮件和网站分发服务商会处理提供相应服务所必需的信息。',
            '依法需要，或为合理处理欺诈、滥用、安全事件及法律争议时，我们可能披露相关信息。服务商可能在你所在国家或地区以外处理信息。对于由我们安排、且依法需要传输保障的数据传输，我们会采用适用法律要求的保护措施。',
          ],
          links: [{ label: 'Apple 隐私政策', href: 'https://www.apple.com/legal/privacy/' }],
        },
        {
          id: 'retention-security', title: '保留、删除与安全',
          paragraphs: [
            '本地索引、缓存、个人资料和设置保留在设备上，直至被 App 正常运行移除或替换，或随 App 一并删除。撤回照片权限不一定自动清除此前的本地记录。删除 App 会按 Apple 平台机制移除本地应用容器；系统的“卸载 App”功能可能保留应用数据。',
            '移除 Recap 不会删除 Apple 照片原片、iCloud 副本、设备备份、已分享副本或邮件，请通过 Apple 或相应接收方管理。你在 Recap 中明确对 Apple 照片执行的修改或删除，可能随自己的 iCloud 照片设置同步。',
            '支持邮件、附件及相关技术记录，仅在处理请求、维护安全、履行法律义务或处理争议合理必要的期限内保留，之后删除或去标识化。服务商可能有独立保留期限。你可以通过下方联系方式申请删除已发送给我们的信息。',
            '我们依据所处理信息的性质采取合理保护措施，本地 App 数据依赖 Apple 平台安全机制保护。任何存储或传输都无法保证绝对安全，请妥善保护设备、账户与备份。',
          ],
        },
        {
          id: 'rights', title: '你的权利与选择',
          paragraphs: [
            '根据适用法律，你可能享有访问、更正、删除、获取副本、限制或反对处理个人信息的权利，以及在基于同意处理时撤回同意的权利。你也可以联系有权受理的隐私监管机构。本政策不限制法律强制保障的权利。',
            '依法需要处理依据时，我们根据场景依赖你对可选访问或分享的许可与同意、为实现你请求的功能和支持所必需的处理、法律允许的可靠性和安全正当利益，以及法定义务。系统授权不代表允许与功能无关的处理。',
          ],
          items: [
            '在系统设置中更改照片和相机权限，选择是否使用可选功能。',
            '发送前检查分享内容、支持邮件正文与附件。',
            '就我们实际持有的信息联系我们；我们无法远程查看或删除仅在你设备上的照片库。',
            '通过 Apple 或其他服务商的隐私控制管理其独立持有的信息。处理请求时，我们可能需要合理必要的信息来核实并查找记录。',
          ],
        },
        {
          id: 'children', title: '儿童与未成年人隐私',
          paragraphs: [
            'Recap 并非专门面向儿童的服务。对于依法需要监护人同意的儿童个人信息，我们不会在明知未取得相应同意的情况下收集。使用资格还须符合 App Store 年龄分级及 Apple 服务要求。家长或监护人如认为儿童已向我们发送个人信息，可以联系我们核查并依法删除。除确有必要外，请勿提供私人照片。',
          ],
        },
        {
          id: 'changes', title: '政策更新',
          paragraphs: [
            '数据处理方式或相关要求变化时，我们会更新本页及日期。依法需要时，我们会另行通知，并在引入实质不同的处理前取得必要同意。可选分享仍由你选择；阅读本政策或继续浏览不能替代法律要求的同意。',
          ],
        },
      ],
    },
    terms: {
      title: '服务条款',
      description: 'Recap 服务条款：应用许可、照片权利、会员订阅、TestFlight 测试、本地助手及消费者权益。',
      intro: '本条款说明 Recap 与本网站的使用规则、付费功能和测试版的适用条件，以及你保留的权利。请一并阅读隐私政策与适用的 Apple 条款。',
      sections: [
        {
          id: 'scope', title: '条款范围与使用资格',
          paragraphs: [
            'Recap 由本页列明的服务提供方提供，以下称“我们”，帮助你浏览、整理和回顾获准访问的照片。本条款适用于 Recap、本网站及相关支持。使用相应服务即表示你同意适用于该使用行为的条款；如不同意，请停止使用。',
            '你应具有接受本条款所需的法律能力，或在依法需要的监护人同意与监督下使用。Apple 的年龄、账户及商店要求同时适用。隐私政策说明数据处理方式；接受本条款不能替代法律要求另行取得的同意。',
          ],
        },
        {
          id: 'license', title: '应用许可与知识产权',
          paragraphs: [
            '通过 App Store 获取的版本，除非该版本另行提供自定义最终用户许可协议，否则适用 Apple《许可应用程序最终用户许可协议》标准版（Standard EULA）。本页补充说明 Recap 服务规则，不替代 Apple 正式文本；涉及应用许可的冲突，以适用 EULA 为准。',
            'Recap 软件、品牌及网站原创内容的权利归我们或相应权利人所有。请在许可范围内使用，不得擅自再分发、绕过购买或安全控制、干扰服务，或侵害他人权利。复制、修改和反向工程的限制，受适用法律及相关开源许可允许范围的约束。',
          ],
          links: [{ label: 'Apple Standard EULA 官方文本', href: 'https://www.apple.com/legal/internet-services/itunes/dev/stdeula/' }],
        },
        {
          id: 'requirements', title: '设备、权限与功能条件',
          paragraphs: [
            '可用性取决于 App 版本、设备、系统、地区、权限及对应权益。具体构建的要求以商店页面或 TestFlight 邀请为准。照片权限受限、缺少地点信息、iCloud 原片暂不可用或索引未完成，都可能影响结果。Apple 系统服务及外部操作可能需要联网。',
          ],
        },
        {
          id: 'your-content', title: '你的照片与使用责任',
          paragraphs: [
            '你保留照片、视频及其他内容的原有权利。使用 Recap 不转让其所有权，也不授予我们公开发布的权利。Recap 仅为提供你使用的功能处理获准访问的内容。',
            '请仅使用和分享有权使用的内容，尊重他人隐私、著作权及其他权利。请核对分享目标，以及保存、编辑和删除操作。对 Apple 照片的修改可能通过 iCloud 照片影响其他设备。',
            'Recap 不提供照片备份服务。请独立备份重要原片。移除 App 或更换设备可能丢失本地索引、偏好及应用记录，请勿将其作为重要信息的唯一副本。',
          ],
        },
        {
          id: 'purchases', title: '会员、订阅、恢复购买与退款',
          paragraphs: [
            '部分功能需要付费权益。商品、价格、币种、计费周期、功能范围及试用或优惠，以购买页面与 Apple 确认界面为准，请在确认前阅读。官网介绍不自动构成免费试用，也不承诺永久免费。',
            '正式购买通过 Apple 账户收费。自动续订订阅按 Apple 显示的条件续订，除非你及时取消。可在“设置 > 你的姓名 > 订阅”中管理或取消。删除 Recap 不会取消订阅。试用或优惠的期限、资格与转为付费的条件会在购买时展示；如不希望续订，请在适用截止时间前取消。',
            '一次性购买不自动续费，提供购买时说明的权益，不承诺支持所有未来设备或包含今后另行提供的所有产品。符合条件的购买可使用原购买 Apple 账户，通过 App 内恢复购买功能恢复。',
            'App Store 退款由 Apple 根据其规则及适用消费者法律处理，资格因情况和地区而异。功能或权益异常可联系我们；Apple 扣款的退款请使用官方申请流程。法定退款及消费者权利不受影响。',
          ],
          links: [
            { label: '管理或取消 Apple 订阅', href: 'https://support.apple.com/zh-cn/118428' },
            { label: '申请 App Store 退款', href: 'https://support.apple.com/zh-cn/118223' },
          ],
        },
        {
          id: 'beta', title: 'TestFlight 测试版',
          paragraphs: [
            '测试版可能存在缺陷、调整功能、没有固定发布时间，或到期无法打开。测试资格取决于邀请、兼容构建及 Apple TestFlight 服务。测试前请备份重要内容并阅读构建说明。',
            'TestFlight App 内购买属于测试交易，不会作为正式购买扣款，也不会自动转为 App Store 付费权益。测试资格不代表免费获得正式版。TestFlight 服务及其提供的诊断信息适用 Apple 相关条款与隐私说明。',
          ],
          links: [{ label: 'Apple TestFlight 说明', href: 'https://testflight.apple.com/' }],
        },
        {
          id: 'assistant', title: '自动整理、搜索与助手结果',
          paragraphs: [
            '分类、城市归类、检索及助手回复可能不完整或不准确，仅辅助浏览，不构成对人物、事件或地点的核实记录。',
            '本地助手需要兼容设备、iOS 或 iPadOS 26 及以上、已启用 Apple Intelligence 且模型就绪。它使用支持的本地索引和帮助，不查看照片像素，不识别任意人物或推断任意地点。依赖或分享结果前请核对。模型不可用时，助手也可能不可用。',
          ],
        },
        {
          id: 'third-parties', title: '第三方服务',
          paragraphs: [
            'Apple 照片、iCloud、地图、App Store、TestFlight、邮件及你打开的 App 或网站由相应服务商运营，适用其条款与政策，可用性可能影响 Recap 功能。我们不控制接收方如何使用分享内容。请核对目标、权限与条款，相关数据流转见隐私政策。',
          ],
        },
        {
          id: 'availability-termination', title: '更新、中断与终止使用',
          paragraphs: [
            '我们可能为改进、安全、守法或平台变化而更新功能，无法保证始终不中断或没有错误。涉及付费权益的重大变化仍受购买约定及强制性消费者保护约束，包括依法需要的通知与补救。',
            '你可随时停止使用并删除 App，订阅需另行通过 Apple 取消。使用许可可按适用 EULA 终止，包括违反许可的情形。停止使用不自动删除 Apple、邮件服务商或分享接收方的副本。',
          ],
        },
        {
          id: 'liability', title: '保证与责任边界',
          paragraphs: [
            '在适用法律允许并受适用 EULA 约束的范围内，Recap 与本网站按“现状”和“可用”状态提供，不保证结果始终准确、每张照片均可索引或第三方服务持续可用。',
            '责任限制仅在法律与应用许可允许的范围内适用，不排除依法不得排除的责任，也不削减法定保证、补救或消费者保护。欺诈、故意不当行为及人身伤害等责任，法律禁止限制时不受本页限制。',
          ],
        },
        {
          id: 'law', title: '适用法律与争议处理',
          paragraphs: [
            '应用许可的法律适用和争议条款见 EULA。其他服务及网站使用的适用规则和有权法院依适用法律确定。本条款不强制仲裁，不要求放弃当地强制性诉讼或消费者救济。欢迎联系我们尝试解决争议，但这不是行使法定权利、投诉或向有权法院寻求救济的前提。',
          ],
        },
        {
          id: 'changes', title: '条款更新与语言版本',
          paragraphs: [
            '我们可能随 Recap 或相关要求的变化更新条款，上方日期标识当前版本。依法需要时，重大变更会通知并在生效前取得必要接受，不追溯剥夺已产生的权利。',
            '英文与简体中文版本意在表达相同含义。差异依适用法律及强制性语言保护处理。Apple EULA 以 Apple 官方文本为准。',
          ],
        },
      ],
    },
  },
};
