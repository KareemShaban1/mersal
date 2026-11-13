import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, link, tr } from "@/lib/i18n";
import { PageHero, DonateBand } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/faq">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "الأسئلة الشائعة" : "Frequently asked questions" };
}
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { Blocks } from "@/components/ui";
import { faq } from "@/lib/content";

export default async function Faq({ params }: PageProps<"/[lang]/faq">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  const items = faq[lang];
  const jsonLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a.map((b) => b.x).join(" ") } })) };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <PageHero lang={lang} title={t("الأسئلة الشائعة", "Frequently asked questions")} lead={t("إجابات عن أكثر الأسئلة عن التبرع، الزكاة، تسجيل الحالات والتطوع.", "Answers to the most common questions about donating, Zakat, registering cases and volunteering.")} crumbs={[{ label: t("الأسئلة الشائعة", "FAQ") }]} />
      <div className="container-x mt-14 max-w-3xl space-y-3">
        {items.map((i, n) => (
          <details key={n} open={n === 0} className="card group overflow-hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-lg font-semibold [&::-webkit-details-marker]:hidden">
              {i.q}
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-teal-mist text-teal transition group-open:rotate-180"><ChevronDown size={18} aria-hidden /></span>
            </summary>
            <div className="border-t border-ink/[0.06] px-6 pb-2 pt-5"><Blocks blocks={i.a} /></div>
          </details>
        ))}
        <p className="pt-6 text-center text-ink-soft">{t("لم تجد إجابتك؟", "Didn’t find your answer?")} <Link href={link(lang, "/contact")} className="font-display font-semibold text-teal underline decoration-sun decoration-2 underline-offset-4">{t("تواصل معنا", "Contact us")}</Link></p>
      </div>
      <DonateBand lang={lang} />
    </>
  );
}
