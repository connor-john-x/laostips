import { defaultLang, isLang, languages, locales, type Lang } from "./config";
import { t, type UIKey } from "./ui";

export function getLangFromUrl(url: URL): Lang {
	const [, maybeLang] = url.pathname.split("/");
	return isLang(maybeLang) ? maybeLang : defaultLang;
}

export function useTranslations(lang: Lang) {
	return function translate(key: UIKey): string {
		return t(lang, key);
	};
}

/** Prefix an internal path (e.g. "/travel/") with a locale. */
export function localizePath(path: string, lang: Lang): string {
	const clean = path === "/" ? "" : path.replace(/^\/+/, "");
	return `/${lang}/${clean}`.replace(/\/+$/, "/");
}

/** Remove the leading locale segment from a pathname. */
export function stripLocale(pathname: string): string {
	const [, maybeLang, ...rest] = pathname.split("/");
	if (isLang(maybeLang)) {
		return "/" + rest.join("/");
	}
	return pathname;
}

/** Alternate language URLs for a given locale-less path. */
export function getAlternates(pathWithoutLang: string) {
	return locales.map((lang) => ({
		lang,
		href: localizePath(pathWithoutLang, lang),
		htmlLang: languages[lang].htmlLang,
	}));
}

/** Parse a content id like "zh/visa-guide" into lang + slug. */
export function parseContentId(id: string): { lang: Lang; slug: string } {
	const [maybeLang, ...rest] = id.split("/");
	if (isLang(maybeLang)) {
		return { lang: maybeLang, slug: rest.join("/") };
	}
	return { lang: defaultLang, slug: id };
}

/** Pick the best matching language from an Accept-Language header. */
export function matchLang(header: string | null): Lang {
	if (!header) return defaultLang;
	const preferred = header
		.split(",")
		.map((part) => part.split(";")[0].trim().toLowerCase());
	for (const tag of preferred) {
		const base = tag.split("-")[0];
		if (isLang(base)) return base;
	}
	return defaultLang;
}

export function formatDate(date: Date, lang: Lang): string {
	const localeMap: Record<Lang, string> = {
		zh: "zh-CN",
		en: "en-US",
		lo: "lo-LA",
		th: "th-TH",
	};
	return new Intl.DateTimeFormat(localeMap[lang], {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);
}
