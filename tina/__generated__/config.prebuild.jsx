// tina/config.ts
import { defineConfig } from "tinacms";
var config_default = defineConfig({
  // Tina Cloud 配置（部署后填入实际值）
  clientId: process.env.TINA_CLIENT_ID || "",
  token: process.env.TINA_TOKEN || "",
  branch: process.env.HEAD || "main",
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  // 媒体文件存储位置
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      // ========================
      // 文章集合（生活文章 + 兴趣分享）
      // ========================
      {
        name: "articles",
        label: "\u6587\u7AE0",
        path: "content/articles",
        format: "md",
        fields: [
          {
            type: "string",
            name: "slug",
            label: "Slug (URL\u6807\u8BC6)",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "titleZh",
            label: "\u4E2D\u6587\u6807\u9898",
            required: true
          },
          {
            type: "string",
            name: "titleEn",
            label: "\u82F1\u6587\u6807\u9898",
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "\u65E5\u671F",
            required: true
          },
          {
            type: "image",
            name: "coverImage",
            label: "\u5C01\u9762\u56FE"
          },
          {
            type: "string",
            name: "tags",
            label: "\u6807\u7B7E",
            list: true,
            options: ["\u751F\u6D3B", "\u65C5\u884C", "\u7F8E\u98DF", "\u597D\u7269"]
          },
          {
            type: "string",
            name: "summaryZh",
            label: "\u4E2D\u6587\u6458\u8981",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "summaryEn",
            label: "\u82F1\u6587\u6458\u8981",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "bodyZh",
            label: "\u4E2D\u6587\u6B63\u6587",
            isBody: true
          },
          {
            type: "rich-text",
            name: "bodyEn",
            label: "\u82F1\u6587\u6B63\u6587"
          },
          {
            type: "string",
            name: "status",
            label: "\u53D1\u5E03\u72B6\u6001",
            options: ["draft", "published"]
          },
          {
            type: "string",
            name: "type",
            label: "\u5185\u5BB9\u7C7B\u578B",
            options: ["life", "interest"]
          }
        ]
      },
      // ========================
      // 作品集合
      // ========================
      {
        name: "works",
        label: "\u4F5C\u54C1",
        path: "content/works",
        format: "md",
        fields: [
          {
            type: "string",
            name: "slug",
            label: "Slug (URL\u6807\u8BC6)",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "titleZh",
            label: "\u4E2D\u6587\u4F5C\u54C1\u540D",
            required: true
          },
          {
            type: "string",
            name: "titleEn",
            label: "\u82F1\u6587\u4F5C\u54C1\u540D",
            required: true
          },
          {
            type: "datetime",
            name: "date",
            label: "\u5B8C\u6210\u65F6\u95F4"
          },
          {
            type: "image",
            name: "coverImage",
            label: "\u5C01\u9762\u56FE"
          },
          {
            type: "string",
            name: "category",
            label: "\u7C7B\u522B",
            options: ["design", "writing", "other"]
          },
          {
            type: "string",
            name: "descriptionZh",
            label: "\u4E2D\u6587\u4E00\u53E5\u8BDD\u63CF\u8FF0",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "descriptionEn",
            label: "\u82F1\u6587\u4E00\u53E5\u8BDD\u63CF\u8FF0",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "rich-text",
            name: "detailZh",
            label: "\u4E2D\u6587\u8BE6\u7EC6\u4ECB\u7ECD",
            isBody: true
          },
          {
            type: "rich-text",
            name: "detailEn",
            label: "\u82F1\u6587\u8BE6\u7EC6\u4ECB\u7ECD"
          },
          {
            type: "image",
            name: "images",
            label: "\u56FE\u7247\u7EC4",
            list: true
          },
          {
            type: "boolean",
            name: "published",
            label: "\u662F\u5426\u5C55\u793A"
          }
        ]
      },
      // ========================
      // 个人资料（单条记录）
      // ========================
      {
        name: "profile",
        label: "\u4E2A\u4EBA\u8D44\u6599",
        path: "content/profile",
        format: "md",
        fields: [
          {
            type: "string",
            name: "nickname",
            label: "\u6635\u79F0",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "introZh",
            label: "\u4E2D\u6587\u4E00\u53E5\u8BDD\u4ECB\u7ECD",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "string",
            name: "introEn",
            label: "\u82F1\u6587\u4E00\u53E5\u8BDD\u4ECB\u7ECD",
            ui: {
              component: "textarea"
            }
          },
          {
            type: "image",
            name: "avatar",
            label: "\u5934\u50CF"
          },
          {
            type: "rich-text",
            name: "bioZh",
            label: "\u4E2D\u6587\u81EA\u6211\u4ECB\u7ECD"
          },
          {
            type: "rich-text",
            name: "bioEn",
            label: "\u82F1\u6587\u81EA\u6211\u4ECB\u7ECD"
          },
          {
            type: "string",
            name: "github",
            label: "GitHub \u94FE\u63A5"
          },
          {
            type: "string",
            name: "xiaohongshu",
            label: "\u5C0F\u7EA2\u4E66\u94FE\u63A5"
          },
          {
            type: "string",
            name: "weibo",
            label: "\u5FAE\u535A\u94FE\u63A5"
          },
          {
            type: "string",
            name: "email",
            label: "\u90AE\u7BB1"
          }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
