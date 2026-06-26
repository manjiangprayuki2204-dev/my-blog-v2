/**
 * 中文 UI 翻译字典
 * 包含所有界面文字（导航、按钮、标签、提示等）
 */
const zh = {
  // 网站
  siteTitle: "小漫的角落",

  // 导航
  nav: {
    home: "首页",
    blog: "文章",
    works: "作品集",
    about: "关于我",
    search: "搜索",
    language: "语言",
    theme: "主题",
  },

  // 首页 Hero
  hero: {
    readPosts: "看看文章",
    aboutMe: "了解我",
  },

  // 首页区块标题
  home: {
    latestPosts: "最新文章",
    featuredWorks: "作品精选",
    viewAll: "查看全部",
  },

  // 文章
  blog: {
    title: "文章",
    all: "全部",
    filterBy: "按标签筛选",
    readMore: "阅读全文",
    prevPost: "上一篇",
    nextPost: "下一篇",
    noResults: "没有找到相关文章",
    comments: "评论",
    loadingComments: "评论加载中…",
  },

  // 标签
  tags: {
    all: "全部",
    life: "生活",
    travel: "旅行",
    food: "美食",
    goods: "好物",
  },

  // 作品
  works: {
    title: "作品集",
    all: "全部",
    design: "设计",
    writing: "文字",
    other: "其他",
    viewDetail: "查看详情",
  },

  // 关于
  about: {
    title: "关于我",
    bio: "自我介绍",
    social: "社交链接",
  },

  // 搜索
  search: {
    placeholder: "搜索文章…",
    noResults: "没有找到相关内容",
    searching: "搜索中…",
    close: "关闭 (ESC)",
  },

  // 主题
  theme: {
    light: "浅色模式",
    dark: "深色模式",
    switchToLight: "切换到浅色模式",
    switchToDark: "切换到深色模式",
  },

  // 语言
  language: {
    zh: "中文",
    en: "English",
    switchTo: "切换语言",
  },

  // 页脚
  footer: {
    copyright: "© 2026 小漫的角落",
    builtWith: "由 Astro + Tina CMS 构建",
  },

  // 404
  notFound: {
    title: "页面未找到",
    message: "你访问的页面不存在，或者已经被移到了别的地方。",
    backHome: "返回首页",
  },

  // 通用
  common: {
    backToTop: "回到顶部",
    loading: "加载中…",
    draft: "草稿",
    published: "已发布",
  },
} as const;

export default zh;
export type ZhTranslations = typeof zh;
