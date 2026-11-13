import { bySection, pageHref, sections, type Section } from "./content";
import type { Locale } from "./i18n";

export type NavItem = { label: string; href?: string; children?: { label: string; href: string }[] };

export function buildNav(l: Locale): NavItem[] {
  const t = (ar: string, en: string) => (l === "ar" ? ar : en);
  const group = (s: Section): NavItem => ({
    label: sections[s].title[l],
    href: `/${s}`,
    children: bySection(s).map((p) => ({ label: p.title[l], href: pageHref(p) })),
  });
  return [
    { label: t("عن مرسال", "About"), href: "/about" },
    group("projects"),
    group("services"),
    group("sustainability"),
    {
      label: t("ساعد مرسال", "Get involved"),
      children: [
        { label: t("طرق التبرع", "Ways to give"), href: "/ways-to-give" },
        { label: t("تطوع مع مرسال", "Volunteer"), href: "/volunteer" },
        { label: t("حالات حرجة", "Critical cases"), href: "/cases" },
        { label: t("حاسبة الزكاة", "Zakat calculator"), href: "/zakat" },
        { label: t("كارت عافية", "Afia card"), href: "/afia-card" },
      ],
    },
    {
      label: t("تواصل معنا", "Contact"),
      children: [
        { label: t("اتصل بنا", "Contact us"), href: "/contact" },
        { label: t("فروع مرسال", "Branches"), href: "/branches" },
        { label: t("الأسئلة الشائعة", "FAQ"), href: "/faq" },
        { label: t("ألبومات", "Albums"), href: "/albums" },
        { label: t("فيديوهات", "Videos"), href: "/videos" },
      ],
    },
  ];
}
