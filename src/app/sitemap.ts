import type { MetadataRoute } from "next";
import { pageHref, pages, sections } from "@/lib/content";
import { locales } from "@/lib/i18n";

const base = "https://www.mersal-ngo.org";
const fixed = ["", "/donate", "/contact", "/faq", "/zakat", "/afia-card", "/albums", "/videos", "/cases", "/request-help"];

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...fixed, ...Object.keys(sections).map((s) => `/${s}`), ...pages.map(pageHref)];
  return paths.flatMap((p) => locales.map((l) => ({
    url: `${base}/${l}${p}`,
    alternates: { languages: Object.fromEntries(locales.map((x) => [x, `${base}/${x}${p}`])) },
  })));
}
