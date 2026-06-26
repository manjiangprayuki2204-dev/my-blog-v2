/**
 * 图片上传 API — Vercel Serverless Function
 *
 * 接收 base64 图片，通过 GitHub API 存入 public/images/
 * 返回可访问的图片路径
 */

const OWNER = "manjiangprayuki2204-dev";
const REPO = "my-blog-v2";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const token = process.env.GITHUB_TOKEN;
  if (!token) return res.status(500).json({ error: "GITHUB_TOKEN 未配置" });

  try {
    const { filename, data } = req.body; // data: base64 内容（不含 data:xxx;base64, 前缀）
    if (!filename || !data) return res.status(400).json({ error: "缺少 filename 或 data" });

    // 生成唯一文件名，避免覆盖
    const ext = filename.includes(".") ? filename.split(".").pop() : "jpg";
    const base = filename.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_一-鿿-]/g, "-");
    const ts = Date.now();
    const safeName = `${base}-${ts}.${ext}`;
    const path = `public/images/${safeName}`;

    const base64Content = data.replace(/^data:[^;]+;base64,/, "");

    const gh = (url, opts = {}) =>
      fetch(`https://api.github.com${url}`, {
        ...opts,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...opts.headers,
        },
      });

    const apiPath = `/repos/${OWNER}/${REPO}/contents/${path}`;
    const resp = await gh(apiPath, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: `📷 上传图片 ${safeName}`,
        content: base64Content,
        branch: "main",
      }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      return res.status(resp.status).json({ error: err.message || `上传失败 ${resp.status}` });
    }

    const result = await resp.json();
    return res.json({
      ok: true,
      path: `/images/${safeName}`,
      url: result.content?.html_url,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
