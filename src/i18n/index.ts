/**
 * i18n 工具 — 语言切换和翻译获取
 */
import zh from "./zh";
import en from "./en";

export type Lang = "zh" | "en";

/** UI 翻译字典集合 */
const dictionaries = { zh, en } as const;

/**
 * 根据语言获取翻译字典
 */
export function getTranslations(lang: Lang) {
  return dictionaries[lang];
}

/**
 * 获取当前 URL 对应的另一种语言的 URL
 * 例如：/zh/blog/hello → /en/blog/hello
 * 例如：/zh/about → /en/about
 */
export function getAlternateUrl(currentUrl: string, targetLang: Lang): string {
  try {
    const url = new URL(currentUrl);
    const pathParts = url.pathname.split("/").filter(Boolean);
    const hadTrailingSlash = url.pathname.endsWith("/");

    // 如果当前路径有语言前缀，替换它
    if (pathParts[0] === "zh" || pathParts[0] === "en") {
      pathParts[0] = targetLang;
    } else {
      // 否则在前面加上语言前缀
      pathParts.unshift(targetLang);
    }

    let newPath = "/" + pathParts.join("/");
    // 保留尾部斜杠
    if (hadTrailingSlash && !newPath.endsWith("/")) {
      newPath += "/";
    }
    return newPath + (url.search || "");
  } catch {
    return `/${targetLang}/`;
  }
}

/**
 * Lang 类型守卫
 */
export function isValidLang(lang: string): lang is Lang {
  return lang === "zh" || lang === "en";
}

/**
 * 从 URL 路径中提取当前语言
 */
export function getLangFromPath(pathname: string): Lang {
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (isValidLang(firstSegment)) {
    return firstSegment;
  }
  return "zh"; // 默认中文
}

export { zh, en };
