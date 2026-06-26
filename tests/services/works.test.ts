/**
 * 作品服务单元测试
 */
import { describe, it, expect } from "vitest";
import {
  filterWorksByCategory,
  sortWorksByDate,
} from "../../src/services/works";
import type { WorkPreview } from "../../src/domain/work";

const mockWorks: WorkPreview[] = [
  {
    slug: "brand-design",
    title: "品牌设计",
    date: "2025-12-15",
    coverImage: "/images/placeholder.jpg",
    category: "design",
    description: "品牌视觉设计",
  },
  {
    slug: "illustration",
    title: "插画系列",
    date: "2025-08-20",
    coverImage: "/images/placeholder.jpg",
    category: "design",
    description: "城市角落插画",
  },
  {
    slug: "essay",
    title: "随笔集",
    date: "2025-05-10",
    coverImage: "/images/placeholder.jpg",
    category: "writing",
    description: "个人随笔",
  },
];

describe("filterWorksByCategory", () => {
  it("should return all works when category is 'all'", () => {
    const result = filterWorksByCategory(mockWorks, "all");
    expect(result).toHaveLength(3);
  });

  it("should filter by design category", () => {
    const result = filterWorksByCategory(mockWorks, "design");
    expect(result).toHaveLength(2);
  });

  it("should filter by writing category", () => {
    const result = filterWorksByCategory(mockWorks, "writing");
    expect(result).toHaveLength(1);
    expect(result[0].slug).toBe("essay");
  });

  it("should return empty array for category with no matches", () => {
    const result = filterWorksByCategory(mockWorks, "other");
    expect(result).toHaveLength(0);
  });
});

describe("sortWorksByDate", () => {
  it("should sort works by date descending", () => {
    const sorted = sortWorksByDate(mockWorks);
    expect(sorted[0].slug).toBe("brand-design");
    expect(sorted[2].slug).toBe("essay");
  });
});
