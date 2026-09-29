import type { AppPage, Locale } from '../i18n/types';

export type LegalBlock =
  | { type: 'p'; text: string }
  | { type: 'ul'; items: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDoc = {
  title: string;
  lastUpdated: string;
  intro: LegalBlock[];
  sections: LegalSection[];
};

const privacyEn: LegalDoc = {
  title: 'Privacy Policy',
  lastUpdated: 'Last updated: 29 September 2026',
  intro: [
    {
      type: 'p',
      text: 'This policy explains how Hong Kong AI Automation Agency (HKAAA) handles personal data on hkaiautomation.com. We follow the Personal Data (Privacy) Ordinance (Cap. 486) of Hong Kong.',
    },
  ],
  sections: [
    {
      heading: 'Who we are',
      blocks: [
        {
          type: 'p',
          text: 'We are Hong Kong AI Automation Agency (HKAAA), a Hong Kong web design and AI automation agency.',
        },
        {
          type: 'p',
          text: 'Office: Room N, 9/F, Kwun Tong Industrial Centre, 460 Kwun Tong Road, Kowloon, Hong Kong',
        },
        {
          type: 'p',
          text: 'Email: info@hkaiautomation.com',
        },
        {
          type: 'p',
          text: 'Phone: +852 9167 8204',
        },
        {
          type: 'p',
          text: 'We are the data user for personal data collected through this website.',
        },
      ],
    },
    {
      heading: 'What we collect',
      blocks: [
        {
          type: 'p',
          text: 'From the contact form, if you choose to send it:',
        },
        {
          type: 'ul',
          items: [
            'name',
            'email address',
            'service you are asking about',
            'your message',
          ],
        },
        {
          type: 'p',
          text: 'These fields are needed so we can reply. If you leave them blank, we cannot handle the enquiry.',
        },
        {
          type: 'p',
          text: 'We do not ask for your Hong Kong Identity Card number on this site.',
        },
        {
          type: 'p',
          text: 'If you book a call, Calendly collects what you type on their booking page. That is under Calendly’s own privacy policy.',
        },
        {
          type: 'p',
          text: 'If you write to us on email, WhatsApp, or social media, we keep what we need to reply.',
        },
        {
          type: 'p',
          text: 'Server logs from our host (Netlify) may include IP address, browser type, and pages requested. We use this to run and secure the site, not to build marketing profiles.',
        },
        {
          type: 'p',
          text: 'We store your language choice (en or zh) in your browser. That is not used to identify you.',
        },
      ],
    },
    {
      heading: 'Why we collect it (purpose)',
      blocks: [
        {
          type: 'ul',
          items: [
            'to reply to enquiries',
            'to send a quote or book a discovery call',
            'to deliver work if we take you on as a client',
            'to keep basic business records',
            'to protect the site from spam and abuse',
          ],
        },
        { type: 'p', text: 'We do not sell personal data.' },
        {
          type: 'p',
          text: 'We do not use website enquiries for a newsletter or other direct marketing unless you have agreed under the Ordinance. A reply about the service you asked for is not a marketing blast.',
        },
        {
          type: 'p',
          text: 'If we ever send commercial electronic messages (email or similar) that are marketing, we will follow the Unsolicited Electronic Messages Ordinance (Cap. 593): accurate sender details and a working unsubscribe.',
        },
      ],
    },
    {
      heading: 'Who we share it with',
      blocks: [
        { type: 'p', text: 'Only people and processors who need it:' },
        {
          type: 'ul',
          items: [
            'our Hong Kong team',
            'Supabase, which stores form leads',
            'Resend, which emails us when a lead arrives',
            'Netlify, which hosts the site',
            'Calendly, if you book a call',
            'professional advisers (for example accountants or lawyers) if required',
            'authorities if Hong Kong law requires it',
          ],
        },
        {
          type: 'p',
          text: 'Some of these processors are outside Hong Kong. Cap. 486 section 33 is not yet in operation. We still choose vendors that protect data with access controls and encryption in transit.',
        },
      ],
    },
    {
      heading: 'How long we keep it',
      blocks: [
        {
          type: 'p',
          text: 'We keep enquiry data while we are talking to you, and for a short time after if a quote is open.',
        },
        {
          type: 'p',
          text: 'If we do not start a project, we delete or anonymise the lead when we no longer need it.',
        },
        {
          type: 'p',
          text: 'If we start a project, we keep client records as long as needed to deliver the work, handle support, and meet tax and accounting duties in Hong Kong (often up to seven years).',
        },
      ],
    },
    {
      heading: 'Security',
      blocks: [
        {
          type: 'p',
          text: 'Access to leads is limited. The public form can insert a row; it cannot read other people’s data. We use HTTPS. No method is perfect. Please do not send passwords, bank details, or ID copies through the public form.',
        },
      ],
    },
    {
      heading: 'Your rights (Cap. 486)',
      blocks: [
        { type: 'p', text: 'You may:' },
        {
          type: 'ul',
          items: [
            'ask whether we hold your personal data',
            'request a copy (data access request)',
            'ask us to correct data that is inaccurate',
          ],
        },
        {
          type: 'p',
          text: 'Write to info@hkaiautomation.com with “Personal data request” in the subject. We may need to verify it is you. We may charge a fee that is not excessive, as the Ordinance allows. We aim to respond within 40 days.',
        },
        {
          type: 'p',
          text: 'You may complain to the Privacy Commissioner for Personal Data, Hong Kong: https://www.pcpd.org.hk',
        },
      ],
    },
    {
      heading: 'Children',
      blocks: [
        {
          type: 'p',
          text: 'This site is for businesses. We do not knowingly collect personal data from people under 18.',
        },
      ],
    },
    {
      heading: 'Changes',
      blocks: [
        {
          type: 'p',
          text: 'We will update the date at the top when this policy changes. The current version is always on this page.',
        },
      ],
    },
  ],
};

const termsEn: LegalDoc = {
  title: 'Terms of Use',
  lastUpdated: 'Last updated: 29 September 2026',
  intro: [
    {
      type: 'p',
      text: 'These terms govern use of hkaiautomation.com and enquiries you send through it. They are governed by the laws of the Hong Kong Special Administrative Region.',
    },
    {
      type: 'p',
      text: 'They are not the contract for a paid website or automation project. Paid work needs a written quote and scope that you accept.',
    },
  ],
  sections: [
    {
      heading: 'Who we are',
      blocks: [
        { type: 'p', text: 'Hong Kong AI Automation Agency (HKAAA)' },
        {
          type: 'p',
          text: 'Office: Room N, 9/F, Kwun Tong Industrial Centre, 460 Kwun Tong Road, Kowloon, Hong Kong',
        },
        { type: 'p', text: 'Email: info@hkaiautomation.com' },
      ],
    },
    {
      heading: 'Using the site',
      blocks: [
        {
          type: 'p',
          text: 'Use the site lawfully. Do not attempt to break it, scrape it in a way that harms the service, or submit malware or spam (including filling hidden fields).',
        },
        { type: 'p', text: 'We may change or pause the site without notice.' },
      ],
    },
    {
      heading: 'Enquiries, quotes, and booking',
      blocks: [
        {
          type: 'p',
          text: 'Sending the form or booking Calendly is a request to talk. It does not create a supply contract.',
        },
        {
          type: 'p',
          text: 'Prices are not listed because every brief is different. A quote is valid only as written, for the period we state.',
        },
        {
          type: 'p',
          text: 'Discovery calls are a chance to agree scope. They are not free delivery of the full project.',
        },
      ],
    },
    {
      heading: 'Services (when we do take you on)',
      blocks: [
        {
          type: 'p',
          text: 'Typical work: web design, SEO, content, chatbots, workflow automation, and related lead tools. Website first. AI when you are ready.',
        },
        {
          type: 'p',
          text: 'We will use reasonable care and skill (Supply of Services (Implied Terms) Ordinance, Cap. 457). Timeframes we give are estimates unless the quote says a fixed date.',
        },
        {
          type: 'p',
          text: 'We do not promise search ranking, traffic numbers, or sales results. SEO and automation depend on your market, content, and how you use the tools.',
        },
        {
          type: 'p',
          text: 'If we use AI tools in the work, you still own the deliverables we hand over under the project terms. You must check facts, legal, and brand fit before you publish.',
        },
        {
          type: 'p',
          text: 'You must have the right to give us logos, copy, photos, and data. You keep those materials. We keep our pre-existing tools, process, and components unless the quote says otherwise. After full payment, you receive the licence or assignment described in the quote.',
        },
        {
          type: 'p',
          text: 'Third-party products (hosting, domains, Calendly, WhatsApp, n8n, and similar) stay under their own terms and fees.',
        },
      ],
    },
    {
      heading: 'Site content',
      blocks: [
        {
          type: 'p',
          text: 'Text, layout, and graphics on this marketing site belong to us or our licensors. You may not copy the site as a template for another business.',
        },
        {
          type: 'p',
          text: 'Client names and quotes on the testimonials strip are used as shown. They are not a guarantee you will get the same outcome.',
        },
      ],
    },
    {
      heading: 'Liability',
      blocks: [
        {
          type: 'p',
          text: 'Nothing in these terms excludes liability that Hong Kong law does not allow us to exclude, including death or personal injury caused by our negligence (Control of Exemption Clauses Ordinance, Cap. 71).',
        },
        {
          type: 'p',
          text: 'For use of this website (not a signed project): we are not liable for loss of profit, data, or indirect loss from using or not being able to use the site. Any remaining liability for website use is limited to the fullest extent permitted by Hong Kong law.',
        },
        {
          type: 'p',
          text: 'A signed project is covered by that quote, not by these website terms.',
        },
      ],
    },
    {
      heading: 'Privacy',
      blocks: [
        {
          type: 'p',
          text: 'Personal data is handled as in our Privacy Policy.',
        },
      ],
    },
    {
      heading: 'Links',
      blocks: [
        {
          type: 'p',
          text: 'Calendly, social networks, and other outbound links are not under our control.',
        },
      ],
    },
    {
      heading: 'Governing law',
      blocks: [
        {
          type: 'p',
          text: 'Hong Kong law. Courts of Hong Kong have exclusive jurisdiction, except we may seek urgent relief elsewhere if needed to protect our rights.',
        },
        {
          type: 'p',
          text: 'If the English and Traditional Chinese versions differ, the English version of these Terms prevails.',
        },
      ],
    },
  ],
};

const privacyZh: LegalDoc = {
  title: '私隱政策',
  lastUpdated: '最後更新日期：2026年9月29日',
  intro: [
    {
      type: 'p',
      text: '本政策說明香港人工智能自動化機構（HKAAA）在 hkaiautomation.com 如何處理個人資料。我們遵守香港《個人資料（私隱）條例》（第 486 章）。',
    },
  ],
  sections: [
    {
      heading: '我們是誰',
      blocks: [
        {
          type: 'p',
          text: '我們是香港人工智能自動化機構（HKAAA），香港網頁設計與 AI 自動化機構。',
        },
        {
          type: 'p',
          text: '辦事處：Room N, 9/F, Kwun Tong Industrial Centre, 460 Kwun Tong Road, Kowloon, Hong Kong',
        },
        { type: 'p', text: '電郵：info@hkaiautomation.com' },
        { type: 'p', text: '電話：+852 9167 8204' },
        {
          type: 'p',
          text: '就本網站收集的個人資料，我們是資料使用者。',
        },
      ],
    },
    {
      heading: '我們收集什麼',
      blocks: [
        { type: 'p', text: '你透過聯絡表格提交時，我們會收集：' },
        {
          type: 'ul',
          items: ['姓名', '電郵地址', '你查詢的服務', '訊息內容'],
        },
        {
          type: 'p',
          text: '這些欄位是為了回覆你。若不提供，我們無法處理查詢。',
        },
        {
          type: 'p',
          text: '本網站不會要求你提供香港身份證號碼。',
        },
        {
          type: 'p',
          text: '若你透過 Calendly 預約通話，該頁收集的資料受 Calendly 的私隱政策約束。',
        },
        {
          type: 'p',
          text: '若你以電郵、WhatsApp 或社交平台聯絡我們，我們會保留回覆所需的內容。',
        },
        {
          type: 'p',
          text: '主機（Netlify）的伺服器紀錄可能包括 IP 地址、瀏覽器類型及瀏覽頁面。用途是營運及保安網站，不是建立推廣檔案。',
        },
        {
          type: 'p',
          text: '語言選擇（en 或 zh）只存在你的瀏覽器，不會用來識別你的身分。',
        },
      ],
    },
    {
      heading: '收集目的',
      blocks: [
        {
          type: 'ul',
          items: [
            '回覆查詢',
            '提供報價或安排發現通話',
            '若雙方合作，用以交付工作',
            '保存基本業務紀錄',
            '防止垃圾訊息及濫用',
          ],
        },
        { type: 'p', text: '我們不會出售個人資料。' },
        {
          type: 'p',
          text: '除你根據條例同意外，我們不會把網站查詢用作電子報或其他直接促銷。就你查詢的服務作出回覆，並非推廣訊息。',
        },
        {
          type: 'p',
          text: '若日後發送屬直接促銷的商業電子訊息，我們會遵守《非應邀電子訊息條例》（第 593 章）：準確的發件人資料及有效的取消接收方法。',
        },
      ],
    },
    {
      heading: '誰會接觸你的資料',
      blocks: [
        { type: 'p', text: '只限有需要的人士及處理者：' },
        {
          type: 'ul',
          items: [
            '我們的香港團隊',
            'Supabase（儲存表格查詢）',
            'Resend（有新查詢時電郵通知我們）',
            'Netlify（網站託管）',
            'Calendly（若你預約通話）',
            '專業顧問（例如會計師或律師，如有需要）',
            '香港法律要求時的主管當局',
          ],
        },
        {
          type: 'p',
          text: '部分處理者位於香港以外。《個人資料（私隱）條例》第 33 條尚未實施。我們仍會選用有存取控制及傳輸加密的供應商。',
        },
      ],
    },
    {
      heading: '保存多久',
      blocks: [
        {
          type: 'p',
          text: '查詢資料會在溝通及報價有效期間保存。',
        },
        {
          type: 'p',
          text: '若未展開項目，我們會在不再需要時刪除或匿名化該筆查詢。',
        },
        {
          type: 'p',
          text: '若展開項目，我們會按交付、支援，以及香港稅務與會計需要保存客戶紀錄（一般可達七年）。',
        },
      ],
    },
    {
      heading: '保安',
      blocks: [
        {
          type: 'p',
          text: '查詢資料的存取受限制。公開表格只能新增一筆資料，不能讀取其他人的資料。網站使用 HTTPS。請勿經公開表格發送密碼、銀行資料或身份證明文件。',
        },
      ],
    },
    {
      heading: '你的權利（第 486 章）',
      blocks: [
        { type: 'p', text: '你可以：' },
        {
          type: 'ul',
          items: [
            '查詢我們是否持有你的個人資料',
            '要求查閱副本',
            '要求改正不準確的資料',
          ],
        },
        {
          type: 'p',
          text: '請電郵 info@hkaiautomation.com，主旨註明「個人資料要求」。我們或須核實你的身分。條例容許收取不高於所需的費用。我們會爭取在 40 日內回覆。',
        },
        {
          type: 'p',
          text: '你亦可向香港個人資料私隱專員公署投訴：https://www.pcpd.org.hk',
        },
      ],
    },
    {
      heading: '未成年人',
      blocks: [
        {
          type: 'p',
          text: '本網站面向企業。我們不會明知而收集 18 歲以下人士的個人資料。',
        },
      ],
    },
    {
      heading: '修訂',
      blocks: [
        {
          type: 'p',
          text: '政策更新時會改頂部日期。以本頁最新版本為準。',
        },
      ],
    },
  ],
};

const termsZh: LegalDoc = {
  title: '使用條款',
  lastUpdated: '最後更新日期：2026年9月29日',
  intro: [
    {
      type: 'p',
      text: '本條款規管你使用 hkaiautomation.com 及經網站提交的查詢。適用法律為香港特別行政區法律。',
    },
    {
      type: 'p',
      text: '本條款不是收費網站或自動化項目的合約。收費工作須另有書面報價及範圍，並經你接受。',
    },
  ],
  sections: [
    {
      heading: '我們是誰',
      blocks: [
        { type: 'p', text: '香港人工智能自動化機構（HKAAA）' },
        {
          type: 'p',
          text: '辦事處：Room N, 9/F, Kwun Tong Industrial Centre, 460 Kwun Tong Road, Kowloon, Hong Kong',
        },
        { type: 'p', text: '電郵：info@hkaiautomation.com' },
      ],
    },
    {
      heading: '使用網站',
      blocks: [
        {
          type: 'p',
          text: '請合法使用本網站。請勿破壞服務、以損害系統的方式擷取內容，或提交惡意程式或垃圾訊息（包括填寫隱藏欄位）。',
        },
        {
          type: 'p',
          text: '我們可在不另行通知下更改或暫停網站。',
        },
      ],
    },
    {
      heading: '查詢、報價與預約',
      blocks: [
        {
          type: 'p',
          text: '提交表格或經 Calendly 預約，只是聯絡要求，並不構成供應合約。',
        },
        {
          type: 'p',
          text: '網站不列出價格，因為每個項目不同。報價只以書面為準，並受所列有效期約束。',
        },
        {
          type: 'p',
          text: '發現通話用以釐清範圍，並非免費完成整個項目。',
        },
      ],
    },
    {
      heading: '服務（若雙方合作）',
      blocks: [
        {
          type: 'p',
          text: '典型工作包括網頁設計、搜尋排名、內容、聊天機械人、工作流程自動化及相關獲客工具。網站優先，你準備好時再加入 AI。',
        },
        {
          type: 'p',
          text: '我們會以合理技術及謹慎提供服務（《服務提供（隱含條款）條例》，第 457 章）。時間表除非報價訂明固定日期，否則屬估計。',
        },
        {
          type: 'p',
          text: '我們不保證搜尋排名、流量或銷售結果。搜尋優化與自動化視乎市場、內容及你如何使用工具。',
        },
        {
          type: 'p',
          text: '若工作中使用 AI 工具，在項目條款下你仍擁有我們交付的成品。發佈前請自行核對事實、法律及品牌是否合適。',
        },
        {
          type: 'p',
          text: '你須有權向我們提供標誌、文案、照片及資料。該等材料仍屬你所有。除非報價另有訂明，我們保留既有工具、流程及元件。全數付款後，你取得報價所述的特許或轉讓。',
        },
        {
          type: 'p',
          text: '第三方產品（託管、域名、Calendly、WhatsApp、n8n 等）仍受其本身條款及收費約束。',
        },
      ],
    },
    {
      heading: '網站內容',
      blocks: [
        {
          type: 'p',
          text: '本宣傳網站的文字、排版及圖像屬我們或授權方所有。請勿把本網站複製作其他業務範本。',
        },
        {
          type: 'p',
          text: '評價區的客戶名稱及引述按所示使用，並不保證你會得到相同結果。',
        },
      ],
    },
    {
      heading: '法律責任',
      blocks: [
        {
          type: 'p',
          text: '本條款不排除香港法律不容排除的責任，包括因我們疏忽引致的死亡或人身傷害（《管制免責條款條例》，第 71 章）。',
        },
        {
          type: 'p',
          text: '就使用本網站（並非已簽署的項目）：我們不就使用或無法使用網站所致的利潤損失、資料損失或間接損失負責。其餘因使用網站而產生的責任，在香港法律容許的最大範圍內予以限制。',
        },
        {
          type: 'p',
          text: '已簽署項目以該份報價為準，不受本網站使用條款約束。',
        },
      ],
    },
    {
      heading: '私隱',
      blocks: [
        { type: 'p', text: '個人資料按《私隱政策》處理。' },
      ],
    },
    {
      heading: '連結',
      blocks: [
        {
          type: 'p',
          text: 'Calendly、社交平台及其他外連網站不在我們控制範圍。',
        },
      ],
    },
    {
      heading: '適用法律',
      blocks: [
        {
          type: 'p',
          text: '香港法律。香港法院有專屬司法管轄權。為保障權利，我們仍可在其他地方申請緊急濟助。',
        },
        {
          type: 'p',
          text: '如英文版與繁體版不一致，以本《使用條款》英文版為準。',
        },
      ],
    },
  ],
};

const DOCS: Record<Locale, Record<'privacy' | 'terms', LegalDoc>> = {
  en: { privacy: privacyEn, terms: termsEn },
  'zh-Hant': { privacy: privacyZh, terms: termsZh },
};

export function getLegalDoc(locale: Locale, page: Exclude<AppPage, 'home'>) {
  return DOCS[locale][page];
}
