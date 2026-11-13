import pagesJson from "@/content/pages.json";
import campaignsJson from "@/content/campaigns.json";
import donationJson from "@/content/donation.json";
import branchesJson from "@/content/branches.json";
import albumsJson from "@/content/albums.json";
import faqJson from "@/content/faq.json";
import afiaJson from "@/content/afia.json";
import type { L10n, Locale } from "./i18n";

export type Block = { t: "h" | "p" | "li"; x: string; href?: string };
export type Section = "projects" | "services" | "sustainability";
export type ContentPage = {
  id: number; slug: string; group: Section | "about" | "info"; title: L10n;
  blocks: Record<Locale, Block[]>; images: string[]; map: string | null;
};
export type Campaign = {
  id: number; title: L10n; desc: L10n; goal: number; unit: string; unitAmount: number;
  achieved: number; image: string | null; destinationId: string; pageId: number;
};

export const pages = pagesJson as ContentPage[];
export const campaigns = campaignsJson as Campaign[];
export const donation = donationJson;
export const branches = branchesJson;
export const albums = albumsJson;
export const faq = faqJson as Record<Locale, { q: string; a: Block[] }[]>;
export const afiaServices = afiaJson;

export const sections: Record<Section, { title: L10n; lead: L10n }> = {
  projects: {
    title: { ar: "مشاريع مرسال", en: "Mersal Projects" },
    lead: { ar: "مشاريع طبية قائمة بتبرعاتكم، تفتح باب أمل جديد لكل مريض لم يجد مكانًا آخر.", en: "Medical projects built on your donations, opening a new door of hope for patients with nowhere else to turn." },
  },
  services: {
    title: { ar: "خدمات مرسال", en: "Mersal Services" },
    lead: { ar: "نرافق المريض في رحلة العلاج كلها: من الكشف والفحوصات حتى الجراحة والدواء وكفالة الأسرة.", en: "We walk with each patient through the whole journey: from check-ups and tests to surgery, medication and family support." },
  },
  sustainability: {
    title: { ar: "مشاريع الاستدامة", en: "Sustainability Projects" },
    lead: { ar: "مشاريع تعود أرباحها لعلاج المرضى، لضمان استمرار الخدمة.", en: "Ventures whose profits go back into treating patients, keeping our services running." },
  },
};
export const isSection = (s: string): s is Section => s in sections;
export const bySection = (s: Section) => pages.filter((p) => p.group === s);
export const pageBySlug = (slug: string) => pages.find((p) => p.slug === slug);
export const pageById = (id: number) => pages.find((p) => p.id === id);
export const pageHref = (p: ContentPage) =>
  p.group === "about" ? "/about" : p.group === "info" ? `/${p.slug}` : `/${p.group}/${p.slug}`;

/** First paragraph of a page, used as card excerpt / meta description */
export const excerpt = (p: ContentPage, l: Locale, max = 150) => {
  const b = p.blocks[l].find((b) => b.t === "p" && b.x.length > 40) ?? p.blocks[l][0];
  const x = b?.x ?? "";
  return x.length > max ? x.slice(0, x.lastIndexOf(" ", max)) + "…" : x;
};
