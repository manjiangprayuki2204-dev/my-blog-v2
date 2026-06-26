/**
 * 文章服务 — 文章列表的排序、筛选、搜索逻辑
 */
import type { Article, ArticlePreview } from "../domain/article";
import type { Lang } from "../i18n/index";

/**
 * 从文章全集中提取指定语言的预览信息
 * @param articles 所有文章
 * @param lang 目标语言
 * @returns 对应语言的文章预览列表
 */
export function getArticlePreviews(
  articles: Article[],
  lang: Lang,
): ArticlePreview[] {
  return articles
    .filter((a) => a.status === "published")
    .map((a) => ({
      slug: a.slug,
      title: lang === "zh" ? a.titleZh : a.titleEn,
      date: a.date,
      coverImage: a.coverImage,
      tags: a.tags,
      summary: lang === "zh" ? a.summaryZh : a.summaryEn,
      type: a.type,
    }));
}

/**
 * 按日期排序（最新在前）
 */
export function sortByDate(articles: ArticlePreview[]): ArticlePreview[] {
  return [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

/**
 * 按标签筛选文章
 * @param articles 文章列表
 * @param tag 标签名（传 "全部" 或 "All" 时不筛选）
 */
export function filterByTag(
  articles: ArticlePreview[],
  tag: string,
): ArticlePreview[] {
  if (!tag || tag === "全部" || tag === "All") return articles;
  return articles.filter((a) => a.tags.includes(tag));
}

/**
 * 按内容类型筛选
 */
export function filterByType(
  articles: ArticlePreview[],
  type: "life" | "interest" | "all",
): ArticlePreview[] {
  if (type === "all") return articles;
  return articles.filter((a) => a.type === type);
}

/**
 * 获取最新 N 篇文章
 */
export function getLatest(
  articles: ArticlePreview[],
  count: number = 3,
): ArticlePreview[] {
  return sortByDate(articles).slice(0, count);
}

/**
 * 关键词搜索文章（匹配标题和摘要）
 * @param articles 文章列表
 * @param query 搜索关键词
 */
export function searchArticles(
  articles: ArticlePreview[],
  query: string,
): ArticlePreview[] {
  if (!query.trim()) return [];
  const lowerQuery = query.toLowerCase();
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(lowerQuery) ||
      a.summary.toLowerCase().includes(lowerQuery) ||
      a.tags.some((t) => t.toLowerCase().includes(lowerQuery)),
  );
}

/**
 * 格式化日期为可读字符串
 * @param dateStr YYYY-MM-DD 格式的日期字符串
 * @param lang 语言
 */
export function formatDate(dateStr: string, lang: Lang): string {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;

  if (lang === "zh") {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 获取文章的相邻文章（上一篇/下一篇）
 */
export function getAdjacentArticles(
  articles: ArticlePreview[],
  currentSlug: string,
): {
  prev: ArticlePreview | null;
  next: ArticlePreview | null;
} {
  const sorted = sortByDate(articles);
  const index = sorted.findIndex((a) => a.slug === currentSlug);

  return {
    prev: index > 0 ? sorted[index - 1] : null,
    next: index < sorted.length - 1 ? sorted[index + 1] : null,
  };
}

/**
 * 统计各标签的文章数量
 */
export function getTagCounts(
  articles: ArticlePreview[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const a of articles) {
    for (const tag of a.tags) {
      counts[tag] = (counts[tag] || 0) + 1;
    }
  }
  return counts;
}
