import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, DonateBand, PageCard, PageHero, SectionHead } from "@/components/ui";
import { bySection, excerpt, pageBySlug } from "@/lib/content";
import { isLocale, link, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/about">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const p = pageBySlug("about")!;
  return { title: p.title[lang], description: excerpt(p, lang, 155) };
}

export default async function About({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  const p = pageBySlug("about")!;
  return (
    <>
      <PageHero lang={lang} title={t("عن مرسال", "About Mersal")} lead={t("مؤسسة خيرية غير هادفة للربح تعمل في مجال الصحة — تحت شعار «فتح باب أمل جديد».", "A non-profit charity working in health — under the motto “opening a new door of hope”.")} crumbs={[{ label: p.title[lang] }]} image="/media/emergency-team-2.jpg">
        <Link href={link(lang, "/donate")} className="btn-sun">{t("تبرع الآن", "Donate now")}</Link>
        <Link href={link(lang, "/volunteer")} className="btn-ghost">{t("تطوع معنا", "Volunteer")}</Link>
      </PageHero>
      <article className="container-x mt-14 max-w-3xl"><Blocks blocks={p.blocks[lang]} /></article>
      <section className="container-x mt-20">
        <SectionHead eyebrow={t("مشاريعنا", "Our projects")} title={t("مشاريع طبية تعمل عليها المؤسسة", "Medical projects we run")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{bySection("projects").slice(0, 6).map((x, i) => <PageCard key={x.id} p={x} lang={lang} index={i} />)}</div>
      </section>
      <DonateBand lang={lang} />
    </>
  );
}
