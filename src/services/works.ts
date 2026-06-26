/**
 * 作品服务 — 作品列表的排序、筛选逻辑
 */
import type { Work, WorkPreview, WorkCategory } from "../domain/work";
import type { Lang } from "../i18n/index";

/**
 * 从作品全集中提取指定语言的预览信息
 */
export function getWorkPreviews(
  works: Work[],
  lang: Lang,
): WorkPreview[] {
  return works
    .filter((w) => w.published)
    .map((w) => ({
      slug: w.slug,
      title: lang === "zh" ? w.titleZh : w.titleEn,
      date: w.date,
      coverImage: w.coverImage,
      category: w.category,
      description: lang === "zh" ? w.descriptionZh : w.descriptionEn,
    }));
}

/**
 * 按日期排序（最新在前）
 */
export function sortWorksByDate(works: WorkPreview[]): WorkPreview[] {
  return [...works].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * 按类别筛选作品
 */
export function filterWorksByCategory(
  works: WorkPreview[],
  category: WorkCategory | "all",
): WorkPreview[] {
  if (category === "all") return works;
  return works.filter((w) => w.category === category);
}

/**
 * 获取精选作品（前 N 个）
 */
export function getFeaturedWorks(
  works: WorkPreview[],
  count: number = 2,
): WorkPreview[] {
  return sortWorksByDate(works).slice(0, count);
}
