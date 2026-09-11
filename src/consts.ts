// Global site configuration. Edit these values to make the site yours.

export const SITE_URL = "https://laostips.com";
export const SITE_NAME = "LaosTips";
export const CONTACT_EMAIL = "saeleeferyfong@gmail.com";

/** Google AdSense publisher id, e.g. "ca-pub-0000000000000000". */
export const ADSENSE_CLIENT = import.meta.env.PUBLIC_ADSENSE_CLIENT ?? "";

/** Set to true once AdSense is approved and you want real ads to render. */
export const ADSENSE_ENABLED = false;

/**
 * Disable automatic browser translation (Chrome / Edge / Google Translate).
 * The site ships its own 4-language switcher, so browser auto-translate only
 * gets in the way (e.g. auto-converting the Lao version back to Chinese).
 * Set to false if you want to allow browser translation.
 */
export const DISABLE_AUTO_TRANSLATE = true;

/** Analytics: Cloudflare Web Analytics token (optional). */
export const CF_ANALYTICS_TOKEN = import.meta.env.PUBLIC_CF_ANALYTICS_TOKEN ?? "";

/**
 * Newsletter provider endpoint, e.g. a Buttondown / ConvertKit / Mailchimp
 * form action. Leave empty to fall back to a mailto: link.
 */
export const NEWSLETTER_ACTION = import.meta.env.PUBLIC_NEWSLETTER_ACTION ?? "";

export const SOCIALS = [
	{ label: "Facebook", href: "https://facebook.com/" },
	{ label: "YouTube", href: "https://youtube.com/" },
	{ label: "X", href: "https://x.com/" },
] as const;

export const CATEGORIES = ["travel", "work", "living"] as const;
export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_PATHS: Record<Category, string> = {
	travel: "/travel/",
	work: "/work/",
	living: "/living/",
};
