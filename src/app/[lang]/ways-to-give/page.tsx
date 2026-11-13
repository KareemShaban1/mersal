import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks, DonateBand, PageHero } from "@/components/ui";
import { excerpt, pageBySlug } from "@/lib/content";
import { isLocale, link, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/ways-to-give">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const p = pageBySlug("ways-to-give")!;
  return { title: p.title[lang], description: excerpt(p, lang, 155) };
}

export default async function Page({ params }: PageProps<"/[lang]/ways-to-give">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  const p = pageBySlug("ways-to-give")!;
  return (
    <>
      <PageHero lang={lang} title={p.title[lang]} lead={t("كل الطرق المتاحة للتبرع لمؤسسة مرسال: مندوب، فوري، محافظ إلكترونية، رسائل قصيرة، فروع وتحويل بنكي.", "Every way to give to Mersal: home collection, Fawry, mobile wallets, SMS, branches and bank transfer.")} crumbs={[{ label: p.title[lang] }]} image={undefined}>
        <Link href={link(lang, "/donate")} className="btn-sun">{t("تبرع أونلاين الآن", "Donate online now")}</Link>
      </PageHero>
      <article className="container-x mt-14 max-w-3xl"><Blocks blocks={p.blocks[lang]} /></article>
      <DonateBand lang={lang} />
    </>
  );
}
