export const locales = ["zh", "en", "lo", "th"] as const;
export type Lang = (typeof locales)[number];

export const defaultLang: Lang = "zh";

export const languages: Record<Lang, { label: string; native: string; htmlLang: string }> = {
	zh: { label: "Chinese", native: "中文", htmlLang: "zh-CN" },
	en: { label: "English", native: "English", htmlLang: "en" },
	lo: { label: "Lao", native: "ລາວ", htmlLang: "lo-LA" },
	th: { label: "Thai", native: "ไทย", htmlLang: "th-TH" },
};

export function isLang(value: string | undefined): value is Lang {
	return !!value && (locales as readonly string[]).includes(value);
}
