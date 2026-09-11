import { getCollection, type CollectionEntry } from "astro:content";
import type { Category } from "../consts";
import type { Lang } from "../i18n/config";
import { parseContentId } from "../i18n/utils";

export type Post = CollectionEntry<"blog">;

export interface CardPost {
	slug: string;
	title: string;
	description: string;
	category: Category;
	pubDate: Date;
	heroImage?: string;
}

function isPublished(post: Post): boolean {
	return !post.data.draft;
}

export async function getPostsByLang(lang: Lang): Promise<Post[]> {
	const posts = await getCollection("blog", (post) => {
		return isPublished(post) && parseContentId(post.id).lang === lang;
	});
	return posts.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getPostsByLangCategory(lang: Lang, category: Category): Promise<Post[]> {
	const posts = await getPostsByLang(lang);
	return posts.filter((post) => post.data.category === category);
}

export function toCard(post: Post): CardPost {
	return {
		slug: parseContentId(post.id).slug,
		title: post.data.title,
		description: post.data.description,
		category: post.data.category,
		pubDate: post.data.pubDate,
		heroImage: post.data.heroImage,
	};
}

export function readingMinutes(post: Post): number {
	const body = post.body ?? "";
	const words = body.trim().split(/\s+/).length;
	// CJK / Lao / Thai text has no spaces, so fall back to character count.
	const cjkChars = (body.match(/[\u0E00-\u0EFF\u4E00-\u9FFF\u3040-\u30FF]/g) || []).length;
	const units = Math.max(words, cjkChars / 3);
	return Math.max(1, Math.round(units / 220));
}
