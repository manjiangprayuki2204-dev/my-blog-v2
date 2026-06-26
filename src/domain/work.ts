/**
 * 作品实体 — 对应「作品集」内容类型
 */
export interface Work {
  /** URL 友好的唯一标识 */
  slug: string;
  /** 中文作品名 */
  titleZh: string;
  /** 英文作品名 */
  titleEn: string;
  /** 完成时间 (YYYY-MM-DD) */
  date: string;
  /** 封面图路径 */
  coverImage: string;
  /** 类别 */
  category: WorkCategory;
  /** 中文一句话描述 */
  descriptionZh: string;
  /** 英文一句话描述 */
  descriptionEn: string;
  /** 中文详细介绍 (Markdown) */
  detailZh: string;
  /** 英文详细介绍 (Markdown) */
  detailEn: string;
  /** 图片组路径列表 */
  images: string[];
  /** 是否在网站上展示 */
  published: boolean;
}

/** 作品类别 */
export type WorkCategory = "design" | "writing" | "other";

/** 作品类别常量 */
export const WORK_CATEGORIES = {
  DESIGN: "design",
  WRITING: "writing",
  OTHER: "other",
} as const;

/** 类别显示名（中文） */
export const WORK_CATEGORY_LABELS_ZH: Record<WorkCategory, string> = {
  design: "设计",
  writing: "文字",
  other: "其他",
};

/** 类别显示名（英文） */
export const WORK_CATEGORY_LABELS_EN: Record<WorkCategory, string> = {
  design: "Design",
  writing: "Writing",
  other: "Other",
};

/** 作品列表项 */
export interface WorkPreview {
  slug: string;
  title: string;
  date: string;
  coverImage: string;
  category: WorkCategory;
  description: string;
}
