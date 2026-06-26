/**
 * 个人资料实体 — 全站只有一份，可在后台修改
 */
export interface Profile {
  /** 昵称 */
  nickname: string;
  /** 中文一句话介绍 */
  introZh: string;
  /** 英文一句话介绍 */
  introEn: string;
  /** 头像图片路径 */
  avatar: string;
  /** 中文自我介绍正文 (Markdown) */
  bioZh: string;
  /** 英文自我介绍正文 (Markdown) */
  bioEn: string;
  /** GitHub 用户名或完整链接 */
  github: string;
  /** 小红书链接 */
  xiaohongshu: string;
  /** 微博链接 */
  weibo: string;
  /** 邮箱地址 */
  email: string;
}

/** 默认个人资料 — 在没有配置时使用 */
export const DEFAULT_PROFILE: Profile = {
  nickname: "小漫",
  introZh: "用文字和镜头记录生活的温柔角落 🌿",
  introEn: "Capturing life's gentle moments through words and lens 🌿",
  avatar: "/images/avatar.svg",
  bioZh: "这里是关于我的一段自我介绍...",
  bioEn: "Here is a brief introduction about me...",
  github: "https://github.com/manjiangprayuki2204-dev",
  xiaohongshu: "",
  weibo: "",
  email: "manjiangprayuki2204@163.com",
};
