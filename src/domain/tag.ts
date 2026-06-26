/**
 * 标签实体
 */
export interface Tag {
  /** 标签唯一标识 */
  slug: string;
  /** 中文名 */
  nameZh: string;
  /** 英文名 */
  nameEn: string;
}

/** 预设标签列表 */
export const PRESET_TAGS: Tag[] = [
  { slug: "life", nameZh: "生活", nameEn: "Life" },
  { slug: "travel", nameZh: "旅行", nameEn: "Travel" },
  { slug: "food", nameZh: "美食", nameEn: "Food" },
  { slug: "goods", nameZh: "好物", nameEn: "Goods" },
];

/**
 * 根据 slug 获取标签的中文或英文名
 */
export function getTagName(
  slug: string,
  lang: "zh" | "en",
): string {
  const tag = PRESET_TAGS.find((t) => t.slug === slug);
  if (!tag) return slug;
  return lang === "zh" ? tag.nameZh : tag.nameEn;
}
