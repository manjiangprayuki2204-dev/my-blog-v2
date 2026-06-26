/**
 * 文章实体 — 对应「生活文章」和「兴趣分享」两种内容类型
 * 区别仅在于 tags 的可选值不同
 */
export interface Article {
  /** URL 友好的唯一标识，如 "hello-world" */
  slug: string;
  /** 中文标题 */
  titleZh: string;
  /** 英文标题 */
  titleEn: string;
  /** 发布日期 (YYYY-MM-DD) */
  date: string;
  /** 封面图路径，相对于 /public/images/ */
  coverImage: string;
  /** 标签列表，如 ["生活", "旅行"] 或 ["Life", "Travel"] */
  tags: string[];
  /** 中文摘要，约100字 */
  summaryZh: string;
  /** 英文摘要，约100字 */
  summaryEn: string;
  /** 中文正文 (Markdown) */
  bodyZh: string;
  /** 英文正文 (Markdown) */
  bodyEn: string;
  /** 发布状态：草稿(draft) 或 已发布(published) */
  status: "draft" | "published";
  /** 内容类型：生活文章 或 兴趣分享 */
  type: "life" | "interest";
}

/**
 * 文章列表项 — 用于卡片展示的精简信息
 */
export interface ArticlePreview {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  tags: string[];
  summary: string;
  type: "life" | "interest";
}

/** 文章状态常量 */
export const ARTICLE_STATUS = {
  DRAFT: "draft",
  PUBLISHED: "published",
} as const;

/** 文章类型常量 */
export const ARTICLE_TYPE = {
  LIFE: "life",
  INTEREST: "interest",
} as const;

/** 默认标签（中文） */
export const DEFAULT_TAGS_ZH = ["全部", "生活", "旅行", "美食", "好物"] as const;

/** 默认标签（英文） */
export const DEFAULT_TAGS_EN = [
  "All",
  "Life",
  "Travel",
  "Food",
  "Goods",
] as const;
