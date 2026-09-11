import rss from "@astrojs/rss";
import { SITE_NAME, SITE_URL } from "../../consts";
import { locales } from "../../i18n/config";
import { useTranslations, localizePath, parseContentId } from "../../i18n/utils";
import { getPostsByLang } from "../../lib/posts";

export function getStaticPaths() {
	return locales.map((lang) => ({ params: { lang } }));
}

export async function GET(context) {
	const lang = context.params.lang;
	const t = useTranslations(lang);
	const posts = await getPostsByLang(lang);

	return rss({
		title: `${SITE_NAME} — ${t("blog.title")}`,
		description: t("blog.description"),
		site: context.site ?? SITE_URL,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.pubDate,
			link: localizePath(`/blog/${parseContentId(post.id).slug}/`, lang),
		})),
		customData: `<language>${lang}</language>`,
	});
}
