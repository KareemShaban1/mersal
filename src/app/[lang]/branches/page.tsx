import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, DonateBand, PageHero } from "@/components/ui";
import { excerpt, pageBySlug } from "@/lib/content";
import { isLocale, link, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/branches">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const p = pageBySlug("branches")!;
  return { title: p.title[lang], description: excerpt(p, lang, 155) };
}

export default async function Page({ params }: PageProps<"/[lang]/branches">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  const p = pageBySlug("branches")!;
  return (
    <>
      <PageHero lang={lang} title={p.title[lang]} lead={t("فروع مرسال ونقاط التبرع في القاهرة الكبرى والإسكندرية وسوهاج. اضغط على أي فرع لفتح موقعه على الخريطة.", "Mersal branches and donation points across Greater Cairo, Alexandria and Sohag. Tap a branch to open it on the map.")} crumbs={[{ label: p.title[lang] }]} image={undefined}>
        <Link href={link(lang, "/contact")} className="btn-ghost">{t("اتصل بنا", "Contact us")}</Link>
      </PageHero>
      <article className="container-x mt-14 max-w-3xl"><Blocks blocks={p.blocks[lang]} /></article>
      <DonateBand lang={lang} />
    </>
  );
}
