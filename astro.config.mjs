// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://laostips.com",
	integrations: [
		mdx(),
		sitemap({
			i18n: {
				defaultLocale: "zh",
				locales: {
					zh: "zh-CN",
					en: "en",
					lo: "lo-LA",
					th: "th-TH",
				},
			},
		}),
	],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
});
