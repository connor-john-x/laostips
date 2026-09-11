import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
	// Content lives in `src/content/blog/<lang>/<slug>.md`.
	// The first path segment is the language code (zh, en, lo, th).
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		category: z.enum(["travel", "work", "living"]).default("travel"),
		tags: z.array(z.string()).default([]),
		author: z.string().default("LaosTips"),
		featured: z.boolean().default(false),
		draft: z.boolean().default(false),
	}),
});

export const collections = { blog };
