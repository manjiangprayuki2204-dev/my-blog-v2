/**
 * GitHub Content API — Vercel Serverless Function
 *
 * 处理 Markdown 文件读写、列表、删除
 * 使用 GitHub REST API，通过 GITHUB_TOKEN 认证
 */

const OWNER = "manjiangprayuki2204-dev";
const REPO = "my-blog-v2";

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "GITHUB_TOKEN 未配置" });
  }

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

  try {
    if (req.method === "GET") {
      return handleGet(req, res, gh);
    } else if (req.method === "POST" || req.method === "PUT") {
      return handleSave(req, res, gh);
    } else if (req.method === "DELETE") {
      return handleDelete(req, res, gh);
    }
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* ─── GET：读取文件或列出目录 ─── */
async function handleGet(req, res, gh) {
  const { path } = req.query;
  if (!path) {
    return res.status(400).json({ error: "缺少 path 参数" });
  }

  // 判断是否是目录：以 / 结尾或路径里没有 .
  const isDir = path.endsWith("/") || !path.split("/").pop().includes(".");

  if (isDir) {
    const cleanPath = path.endsWith("/") ? path : path + "/";
    const apiPath = `/repos/${OWNER}/${REPO}/contents/${cleanPath}`;
    const resp = await gh(apiPath);
    if (!resp.ok) {
      return res.status(resp.status).json({ error: `GitHub API ${resp.status}` });
    }
    const files = await resp.json();
    const list = files.map((f) => ({
      name: f.name,
      path: f.path,
      sha: f.sha,
      type: f.type,
    }));
    return res.json({ items: list });
  } else {
    const apiPath = `/repos/${OWNER}/${REPO}/contents/${path}`;
    const resp = await gh(apiPath);
    if (!resp.ok) {
      return res.status(resp.status).json({ error: `GitHub API ${resp.status}` });
    }
    const file = await resp.json();
    const content = Buffer.from(file.content, "base64").toString("utf-8");
    return res.json({
      path: file.path,
      sha: file.sha,
      content,
    });
  }
}

/* ─── POST / PUT：创建或更新文件 ─── */
async function handleSave(req, res, gh) {
  const { path, content, message } = req.body;
  if (!path || content === undefined) {
    return res.status(400).json({ error: "缺少 path 或 content" });
  }

  const base64Content = Buffer.from(content, "utf-8").toString("base64");

  // 先尝试获取现有文件的 sha（用于更新）
  let sha = req.body.sha || null;
  if (!sha) {
    const apiPath = `/repos/${OWNER}/${REPO}/contents/${path}`;
    const check = await gh(apiPath);
    if (check.ok) {
      const existing = await check.json();
      sha = existing.sha;
    }
  }

  const body = {
    message: message || `✏️ 更新 ${path}`,
    content: base64Content,
    branch: "main",
  };
  if (sha) body.sha = sha;

  const apiPath = `/repos/${OWNER}/${REPO}/contents/${path}`;
  const resp = await gh(apiPath, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const errData = await resp.json().catch(() => ({}));
    return res.status(resp.status).json({ error: errData.message || `GitHub API ${resp.status}` });
  }

  const result = await resp.json();
  return res.json({
    ok: true,
    path: result.content?.path,
    sha: result.content?.sha,
    url: result.content?.html_url,
  });
}

/* ─── DELETE：删除文件 ─── */
async function handleDelete(req, res, gh) {
  const { path } = req.body;
  if (!path) {
    return res.status(400).json({ error: "缺少 path" });
  }

  // 先获取 sha
  const apiPath = `/repos/${OWNER}/${REPO}/contents/${path}`;
  const check = await gh(apiPath);
  if (!check.ok) {
    return res.status(check.status).json({ error: "文件不存在" });
  }
  const existing = await check.json();

  const resp = await gh(apiPath, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      message: `🗑️ 删除 ${path}`,
      sha: existing.sha,
      branch: "main",
    }),
  });

  if (!resp.ok) {
    return res.status(resp.status).json({ error: `删除失败` });
  }

  return res.json({ ok: true });
}
