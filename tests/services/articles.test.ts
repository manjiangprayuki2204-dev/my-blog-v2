/**
 * 文章服务单元测试
 */
import { describe, it, expect } from "vitest";
import {
  formatDate,
  filterByTag,
  searchArticles,
  getAdjacentArticles,
  sortByDate,
} from "../../src/services/articles";
import type { ArticlePreview } from "../../src/domain/article";

// ===== 测试数据 =====
const mockArticles: ArticlePreview[] = [
  {
    slug: "hello-world",
    title: "你好，世界",
    date: "2026-06-26",
    coverImage: "/images/placeholder.jpg",
    tags: ["生活"],
    summary: "第一篇博客",
    type: "life",
  },
  {
    slug: "cafe",
    title: "宝藏咖啡馆",
    date: "2026-06-20",
    coverImage: "/images/placeholder.jpg",
    tags: ["美食", "生活"],
    summary: "咖啡馆探店 cafe review",
    type: "interest",
  },
  {
    slug: "tokyo",
    title: "东京散步",
    date: "2026-06-10",
    coverImage: "/images/placeholder.jpg",
    tags: ["旅行"],
    summary: "东京旅行记录",
    type: "interest",
  },
];

// ===== 测试用例 =====

describe("formatDate", () => {
  it("should format date in Chinese", () => {
    const result = formatDate("2026-06-26", "zh");
    expect(result).toBe("2026年6月26日");
  });

  it("should format date in English", () => {
    const result = formatDate("2026-06-26", "en");
    expect(result).toContain("June");
    expect(result).toContain("26");
    expect(result).toContain("2026");
  });

  it("should handle single-digit month and day in Chinese", () => {
    const result = formatDate("2026-01-05", "zh");
    expect(result).toBe("2026年1月5日");
  });

  it("should return original string for invalid date", () => {
    const result = formatDate("not-a-date", "zh");
    expect(result).toBe("not-a-date");
  });
});

describe("sortByDate", () => {
  it("should sort articles by date descending", () => {
    const sorted = sortByDate(mockArticles);
    expect(sorted[0].slug).toBe("hello-world"); // 最新
    expect(sorted[2].slug).toBe("tokyo"); // 最旧
  });

  it("should not mutate the original array", () => {
    const original = [...mockArticles];
    sortByDate(mockArticles);
    expect(mockArticles).toEqual(original);
  });
});

describe("filterByTag", () => {
  it("should return all articles when tag is '全部'", () => {
    const result = filterByTag(mockArticles, "全部");
    expect(result).toHaveLength(3);
  });

  it("should return all articles when tag is 'All'", () => {
    const result = filterByTag(mockArticles, "All");
    expect(result).toHaveLength(3);
  });

  it("should filter by specific tag", () => {
    const result = filterByTag(mockArticles, "旅行");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("tokyo");
  });

  it("should return empty array when no articles match tag", () => {
    const result = filterByTag(mockArticles, "不存在的标签");
    expect(result).toHaveLength(0);
  });
});

describe("searchArticles", () => {
  it("should find articles by title", () => {
    const result = searchArticles(mockArticles, "咖啡馆");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("cafe");
  });

  it("should find articles by summary", () => {
    const result = searchArticles(mockArticles, "探店");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("cafe");
  });

  it("should find articles by tag", () => {
    const result = searchArticles(mockArticles, "旅行");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("tokyo");
  });

  it("should return empty array for empty query", () => {
    const result = searchArticles(mockArticles, "");
    expect(result).toHaveLength(0);
  });

  it("should be case insensitive", () => {
    // Test with mixed case — "CafE" should match "cafe" in the summary
    const result = searchArticles(mockArticles, "CafE");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("cafe");
  });
});

describe("getAdjacentArticles", () => {
  it("should return prev and next articles", () => {
    const sorted = sortByDate(mockArticles);
    const { prev, next } = getAdjacentArticles(sorted, "cafe");
    expect(prev?.slug).toBe("hello-world");
    expect(next?.slug).toBe("tokyo");
  });

  it("should return null prev for first article", () => {
    const sorted = sortByDate(mockArticles);
    const { prev, next } = getAdjacentArticles(sorted, "hello-world");
    expect(prev).toBeNull();
    expect(next?.slug).toBe("cafe");
  });

  it("should return null next for last article", () => {
    const sorted = sortByDate(mockArticles);
    const { prev, next } = getAdjacentArticles(sorted, "tokyo");
    expect(prev?.slug).toBe("cafe");
    expect(next).toBeNull();
  });
});
