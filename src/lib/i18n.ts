export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";
export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);
export const dirOf = (l: Locale) => (l === "ar" ? "rtl" : "ltr");
export type L10n = { ar: string; en: string };

/** Inline translator: const t = tr(lang); t("عربي", "English") */
export const tr = (l: Locale) => (ar: string, en: string) => (l === "ar" ? ar : en);
/** Locale-prefixed internal link */
export const link = (l: Locale, path = "") => `/${l}${path.startsWith("/") || path === "" ? path : `/${path}`}`;
/** Latin digits in both languages, matching how Mersal writes phone numbers and amounts */
export const num = (_l: Locale, n: number) => new Intl.NumberFormat("en-US").format(n);

export const org = {
  name: { ar: "مؤسسة مرسال للأعمال الخيرية والتنموية", en: "Mersal Foundation for Charity & Development" },
  short: { ar: "مرسال", en: "Mersal" },
  hotline: "19340",
  phone: "01200002870",
  email: "info@mersal-ngo.org",
  address: { ar: "8 شارع 263 - المعادي الجديدة، القاهرة", en: "8 St. 263, New Maadi, Cairo" },
  social: [
    { name: "Facebook", url: "https://www.facebook.com/Mersalfoundation" },
    { name: "Instagram", url: "https://www.instagram.com/mersal_foundation" },
    { name: "X", url: "https://twitter.com/Mersalcharity" },
    { name: "LinkedIn", url: "https://www.linkedin.com/company/18765843/" },
    { name: "YouTube", url: "https://www.youtube.com/channel/UC30Ek5Wl1us6LD6BLkegsHQ" },
  ],
  youtubePlaylist: "PL1qS8dUXKkE_f69yoMJb1Dea54fTrkwRF",
};
