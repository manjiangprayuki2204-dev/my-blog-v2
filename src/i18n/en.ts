/**
 * English UI translation dictionary
 * Contains all interface text (nav, buttons, labels, hints, etc.)
 */
const en = {
  // Site
  siteTitle: "Xiaoman's Corner",

  // Navigation
  nav: {
    home: "Home",
    blog: "Blog",
    works: "Works",
    about: "About",
    search: "Search",
    language: "Language",
    theme: "Theme",
  },

  // Homepage Hero
  hero: {
    readPosts: "Read Posts",
    aboutMe: "About Me",
  },

  // Homepage section titles
  home: {
    latestPosts: "Latest Posts",
    featuredWorks: "Featured Works",
    viewAll: "View All",
  },

  // Blog
  blog: {
    title: "Blog",
    all: "All",
    filterBy: "Filter by tag",
    readMore: "Read More",
    prevPost: "Previous",
    nextPost: "Next",
    noResults: "No articles found",
    comments: "Comments",
    loadingComments: "Loading comments…",
  },

  // Tags
  tags: {
    all: "All",
    life: "Life",
    travel: "Travel",
    food: "Food",
    goods: "Goods",
  },

  // Works
  works: {
    title: "Works",
    all: "All",
    design: "Design",
    writing: "Writing",
    other: "Other",
    viewDetail: "View Details",
  },

  // About
  about: {
    title: "About Me",
    bio: "Bio",
    social: "Social Links",
  },

  // Search
  search: {
    placeholder: "Search articles…",
    noResults: "No results found",
    searching: "Searching…",
    close: "Close (ESC)",
  },

  // Theme
  theme: {
    light: "Light Mode",
    dark: "Dark Mode",
    switchToLight: "Switch to light mode",
    switchToDark: "Switch to dark mode",
  },

  // Language
  language: {
    zh: "中文",
    en: "English",
    switchTo: "Switch language",
  },

  // Footer
  footer: {
    copyright: "© 2026 Xiaoman's Corner",
    builtWith: "Built with Astro + Tina CMS",
  },

  // 404
  notFound: {
    title: "Page Not Found",
    message:
      "The page you are looking for does not exist or has been moved elsewhere.",
    backHome: "Back to Home",
  },

  // Common
  common: {
    backToTop: "Back to top",
    loading: "Loading…",
    draft: "Draft",
    published: "Published",
  },
} as const;

export default en;
export type EnTranslations = typeof en;
