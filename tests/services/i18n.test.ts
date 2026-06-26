/**
 * i18n 服务单元测试
 */
import { describe, it, expect } from "vitest";
import {
  getTranslations,
  getAlternateUrl,
  isValidLang,
  getLangFromPath,
} from "../../src/i18n/index";

describe("getTranslations", () => {
  it("should return Chinese translations when lang is 'zh'", () => {
    const t = getTranslations("zh");
    expect(t.siteTitle).toBe("小漫的角落");
    expect(t.nav.home).toBe("首页");
  });

  it("should return English translations when lang is 'en'", () => {
    const t = getTranslations("en");
    expect(t.siteTitle).toBe("Xiaoman's Corner");
    expect(t.nav.home).toBe("Home");
  });
});

describe("getAlternateUrl", () => {
  it("should switch /zh/ to /en/", () => {
    const result = getAlternateUrl("https://xiaoman.vercel.app/zh/blog/hello", "en");
    expect(result).toBe("/en/blog/hello");
  });

  it("should switch /en/ to /zh/", () => {
    const result = getAlternateUrl("https://xiaoman.vercel.app/en/blog/hello", "zh");
    expect(result).toBe("/zh/blog/hello");
  });

  it("should handle root path", () => {
    const result = getAlternateUrl("https://xiaoman.vercel.app/zh/", "en");
    expect(result).toBe("/en/");
  });

  it("should handle URLs without lang prefix", () => {
    const result = getAlternateUrl("https://xiaoman.vercel.app/", "en");
    expect(result).toBe("/en/");
  });
});

describe("isValidLang", () => {
  it("should return true for 'zh'", () => {
    expect(isValidLang("zh")).toBe(true);
  });

  it("should return true for 'en'", () => {
    expect(isValidLang("en")).toBe(true);
  });

  it("should return false for invalid lang", () => {
    expect(isValidLang("fr")).toBe(false);
    expect(isValidLang("")).toBe(false);
  });
});

describe("getLangFromPath", () => {
  it("should extract 'zh' from /zh/blog/hello", () => {
    expect(getLangFromPath("/zh/blog/hello")).toBe("zh");
  });

  it("should extract 'en' from /en/about", () => {
    expect(getLangFromPath("/en/about")).toBe("en");
  });

  it("should default to 'zh' for paths without lang prefix", () => {
    expect(getLangFromPath("/blog/hello")).toBe("zh");
    expect(getLangFromPath("/")).toBe("zh");
  });
});
