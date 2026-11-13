import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, DonateBand, PageHero } from "@/components/ui";
import { excerpt, pageBySlug } from "@/lib/content";
import { isLocale, link, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/volunteer">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const p = pageBySlug("volunteer")!;
  return { title: p.title[lang], description: excerpt(p, lang, 155) };
}

export default async function Page({ params }: PageProps<"/[lang]/volunteer">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  const p = pageBySlug("volunteer")!;
  return (
    <>
      <PageHero lang={lang} title={p.title[lang]} lead={excerpt(p, lang, 200)} crumbs={[{ label: p.title[lang] }]} image={p.images[0]}>
        <Link href={link(lang, "/contact")} className="btn-sun">{t("للتطوع تواصل معنا", "Contact us to volunteer")}</Link>
      </PageHero>
      <article className="container-x mt-14 max-w-3xl"><Blocks blocks={p.blocks[lang]} /></article>
      <DonateBand lang={lang} />
    </>
  );
}
