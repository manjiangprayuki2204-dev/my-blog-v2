import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://xiaoman.vercel.app",
  integrations: [sitemap()],
  i18n: {
    defaultLocale: "zh",
    locales: ["zh", "en"],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  vite: {
    ssr: {
      noExternal: ["@pagefind/default-ui"],
    },
  },
});
