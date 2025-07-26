import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    // 页面标题与内容
    welcome: 'Welcome to Our Charity Website',
    subtitle: 'Helping older Australians stay healthy, connected and empowered.',
    explore: 'Explore Key Services',
    updates: 'Latest Updates',
    search: 'Find Services and Support',
    searchPlaceholder: 'Search by suburb or service name...',
    update1: 'New walking group launched in Victoria!',
    update2: 'Access the updated senior mental health guide.',
    support: 'Support',
    btnScreenReader: 'Screen Reader',

    // 服务卡片标题 & 描述
    'Health Info': 'Health Info',
    'Community Programs': 'Community Programs',
    'Digital Skills': 'Digital Skills',
    'Caregiver Tools': 'Caregiver Tools',
    desc1: 'Tips and guides for managing chronic conditions.',
    desc2: 'Join local wellness and social events.',
    desc3: 'Learn to use devices and stay safe online.',
    desc4: 'Support resources for families and carers.',

    // 导航栏
    nav: {
      home: 'Home',
      about: 'About Us',
      health: 'Health & Wellbeing',
      community: 'Community Programs',
      skills: 'Digital Skills Hub',
      caregiver: 'Caregiver Resources',
      help: 'Help Centre',
      donate: 'Donate'
    }
  },

  zh: {
    welcome: '欢迎来到我们的慈善网站',
    subtitle: '帮助老年人保持健康、联系和自立。',
    explore: '探索服务',
    updates: '最新更新',
    search: '查找服务与支持',
    searchPlaceholder: '按地区或服务名称搜索...',
    update1: '维州新开设步行小组！',
    update2: '获取新版老年人心理健康指南。',
    support: '支持',
    btnScreenReader: '屏幕阅读器',

    'Health Info': '健康信息',
    'Community Programs': '社区项目',
    'Digital Skills': '数字技能',
    'Caregiver Tools': '照护者工具',
    desc1: '慢性病管理小贴士和指南。',
    desc2: '参与本地健康与社交活动。',
    desc3: '学习设备使用与上网安全。',
    desc4: '为家庭和看护人提供支持资源。',

    nav: {
      home: '首页',
      about: '关于我们',
      health: '健康与福祉',
      community: '社区项目',
      skills: '数字技能中心',
      caregiver: '照护者资源',
      help: '帮助中心',
      donate: '捐赠'
    }
  },

  ur: {
    welcome: 'ہماری خیراتی ویب سائٹ میں خوش آمدید',
    subtitle: 'بزرگ آسٹریلینز کی صحت، روابط اور خود انحصاری میں مدد کریں۔',
    explore: 'اہم خدمات دریافت کریں',
    updates: 'تازہ ترین معلومات',
    search: 'سروسز اور سپورٹ تلاش کریں',
    searchPlaceholder: 'علاقہ یا سروس کا نام درج کریں...',
    update1: 'وکٹوریہ میں نئی واکنگ گروپ شروع!',
    update2: 'ذہنی صحت کی تازہ ترین گائیڈ دیکھیں۔',
    support: 'مدد',
    btnScreenReader: 'اسکرین ریڈر',

    'Health Info': 'صحت کی معلومات',
    'Community Programs': 'کمیونٹی پروگرامز',
    'Digital Skills': 'ڈیجیٹل مہارتیں',
    'Caregiver Tools': 'نگہداشت کے اوزار',
    desc1: 'دائمی بیماریوں کے لیے نکات اور رہنما اصول۔',
    desc2: 'مقامی تقریبات میں شامل ہوں۔',
    desc3: 'آلات کا استعمال اور آن لائن تحفظ سیکھیں۔',
    desc4: 'خاندانوں اور نگہداشت کرنے والوں کے لیے وسائل۔',

    nav: {
      home: 'ہوم',
      about: 'ہمارے بارے میں',
      health: 'صحت اور فلاح',
      community: 'کمیونٹی پروگرامز',
      skills: 'ڈیجیٹل اسکلز حب',
      caregiver: 'نگہداشت وسائل',
      help: 'مدد مرکز',
      donate: 'عطیہ'
    }
  }
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

export default i18n
