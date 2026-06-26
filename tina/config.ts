/**
 * Tina CMS 配置
 *
 * 定义 4 个内容集合：articles、works、profile
 * 每个集合包含中英双语字段
 *
 * 注意：Tina CMS 需要在 Vercel 部署后通过 Tina Cloud 接入。
 * 本地开发时，先通过直接编辑 Markdown 文件管理内容。
 * 部署到 Vercel 后，访问 /admin 即可使用可视化后台。
 */

import { defineConfig } from "tinacms";

export default defineConfig({
  // Tina Cloud 配置（部署后填入实际值）
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  branch: process.env.HEAD || "main",

  build: {
    outputFolder: "public/admin",
    publicFolder: "public",
  },

  // 媒体文件存储位置
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },

  schema: {
    collections: [
      // ========================
      // 文章集合（生活文章 + 兴趣分享）
      // ========================
      {
        name: "articles",
        label: "文章",
        path: "content/articles",
        format: "md",
        fields: [
          {
            type: "string",
            name: "slug",
            label: "Slug (URL标识)",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "titleZh",
            label: "中文标题",
            required: true,
          },
          {
            type: "string",
            name: "titleEn",
            label: "英文标题",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "日期",
            required: true,
          },
          {
            type: "image",
            name: "coverImage",
            label: "封面图",
          },
          {
            type: "string",
            name: "tags",
            label: "标签",
            list: true,
            options: ["生活", "旅行", "美食", "好物"],
          },
          {
            type: "string",
            name: "summaryZh",
            label: "中文摘要",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "summaryEn",
            label: "英文摘要",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "bodyZh",
            label: "中文正文",
            isBody: true,
          },
          {
            type: "rich-text",
            name: "bodyEn",
            label: "英文正文",
          },
          {
            type: "string",
            name: "status",
            label: "发布状态",
            options: ["draft", "published"],
          },
          {
            type: "string",
            name: "type",
            label: "内容类型",
            options: ["life", "interest"],
          },
        ],
      },

      // ========================
      // 作品集合
      // ========================
      {
        name: "works",
        label: "作品",
        path: "content/works",
        format: "md",
        fields: [
          {
            type: "string",
            name: "slug",
            label: "Slug (URL标识)",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "titleZh",
            label: "中文作品名",
            required: true,
          },
          {
            type: "string",
            name: "titleEn",
            label: "英文作品名",
            required: true,
          },
          {
            type: "datetime",
            name: "date",
            label: "完成时间",
          },
          {
            type: "image",
            name: "coverImage",
            label: "封面图",
          },
          {
            type: "string",
            name: "category",
            label: "类别",
            options: ["design", "writing", "other"],
          },
          {
            type: "string",
            name: "descriptionZh",
            label: "中文一句话描述",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "descriptionEn",
            label: "英文一句话描述",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "rich-text",
            name: "detailZh",
            label: "中文详细介绍",
            isBody: true,
          },
          {
            type: "rich-text",
            name: "detailEn",
            label: "英文详细介绍",
          },
          {
            type: "image",
            name: "images",
            label: "图片组",
            list: true,
          },
          {
            type: "boolean",
            name: "published",
            label: "是否展示",
          },
        ],
      },

      // ========================
      // 个人资料（单条记录）
      // ========================
      {
        name: "profile",
        label: "个人资料",
        path: "content/profile",
        format: "md",
        fields: [
          {
            type: "string",
            name: "nickname",
            label: "昵称",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "introZh",
            label: "中文一句话介绍",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "string",
            name: "introEn",
            label: "英文一句话介绍",
            ui: {
              component: "textarea",
            },
          },
          {
            type: "image",
            name: "avatar",
            label: "头像",
          },
          {
            type: "rich-text",
            name: "bioZh",
            label: "中文自我介绍",
          },
          {
            type: "rich-text",
            name: "bioEn",
            label: "英文自我介绍",
          },
          {
            type: "string",
            name: "github",
            label: "GitHub 链接",
          },
          {
            type: "string",
            name: "xiaohongshu",
            label: "小红书链接",
          },
          {
            type: "string",
            name: "weibo",
            label: "微博链接",
          },
          {
            type: "string",
            name: "email",
            label: "邮箱",
          },
        ],
      },
    ],
  },
});
