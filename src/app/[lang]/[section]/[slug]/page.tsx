import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HeartHandshake, PhoneCall } from "lucide-react";
import { Arrow, Blocks, DonateBand, PageHero } from "@/components/ui";
import { bySection, campaigns, excerpt, isSection, pageHref, pages, sections } from "@/lib/content";
import { isLocale, link, locales, num, org, tr } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((lang) => pages.filter((p) => isSection(p.group)).map((p) => ({ lang, section: p.group, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[section]/[slug]">): Promise<Metadata> {
  const { lang, section, slug } = await params;
  const p = pages.find((x) => x.group === section && x.slug === slug);
  if (!isLocale(lang) || !p) return {};
  return { title: p.title[lang], description: excerpt(p, lang, 155), openGraph: p.images[0] ? { images: [p.images[0]] } : undefined };
}

export default async function Detail({ params }: PageProps<"/[lang]/[section]/[slug]">) {
  const { lang, section, slug } = await params;
  const p = pages.find((x) => x.group === section && x.slug === slug);
  if (!isLocale(lang) || !isSection(section) || !p) notFound();
  const t = tr(lang);
  const campaign = campaigns.find((c) => c.pageId === p.id);
  const siblings = bySection(section).filter((x) => x.id !== p.id).slice(0, 5);
  const [cover, ...gallery] = p.images;
  const leadBlock = p.blocks[lang].find((b) => b.t === "p" && b.x.length > 40);
  const fullLead = leadBlock && leadBlock.x.length <= 340;
  const body = fullLead ? p.blocks[lang].filter((b) => b !== leadBlock) : p.blocks[lang];
  const donateHref = campaign ? `/donate?dest=${campaign.destinationId}&amount=${campaign.unitAmount}` : "/donate";
  return (
    <>
      <PageHero lang={lang} title={p.title[lang]} lead={fullLead ? leadBlock.x : excerpt(p, lang, 220)} image={cover}
        crumbs={[{ label: sections[section].title[lang], href: `/${section}` }, { label: p.title[lang] }]}>
        <Link href={link(lang, donateHref)} className="btn-sun"><HeartHandshake size={18} aria-hidden />{t("ادعم هذا المشروع", "Support this work")}</Link>
      </PageHero>

      <div className="container-x mt-14 grid gap-12 lg:grid-cols-[1fr_340px]">
        <article>
          <Blocks blocks={body} />
          {gallery.length > 0 && (
            <ul className="mt-10 grid gap-4 sm:grid-cols-2">
              {gallery.map((src) => (
                <li key={src} className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-sand shadow-soft">
                  <Image src={src} alt="" fill sizes="(min-width:1024px) 400px, 90vw" className="object-cover" />
                </li>
              ))}
            </ul>
          )}
          {p.map && (
            <iframe src={p.map} title={t("الموقع على الخريطة", "Location on the map")} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="mt-10 h-80 w-full rounded-[28px] border-0 shadow-soft" />
          )}
        </article>

        <aside className="space-y-5 lg:sticky lg:top-32 lg:h-fit">
          {campaign && (
            <div className="rounded-[28px] bg-teal-deep p-7 text-white">
              <p className="text-sm text-white/70">{campaign.title[lang]}</p>
              <p className="mt-1 font-display text-4xl font-bold text-sun">{num(lang, campaign.achieved)}</p>
              <p className="text-sm text-white/75">{lang === "ar" ? `تم توفيره من ${num(lang, campaign.goal)} ${campaign.unit}` : `provided of ${num(lang, campaign.goal)} shares`}</p>
              <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-sun" style={{ width: `${Math.max(2, Math.min(100, (campaign.achieved / campaign.goal) * 100))}%` }} /></div>
              <Link href={link(lang, donateHref)} className="btn-sun mt-6 w-full">{lang === "ar" ? `تبرع بسهم (${num(lang, campaign.unitAmount)} جنيه)` : `Give a share (EGP ${num(lang, campaign.unitAmount)})`}</Link>
            </div>
          )}
          <div className="card p-6">
            <PhoneCall className="mb-3 text-teal" aria-hidden />
            <h2 className="font-semibold">{t("تحتاج هذه الخدمة؟", "Need this service?")}</h2>
            <p className="mt-1 text-[15px] leading-7 text-ink-soft">{t("اتصل بالخط الساخن أو سجّل حالة جديدة وسيتواصل معك فريق مرسال.", "Call the hotline or register a case and the Mersal team will contact you.")}</p>
            <a href={`tel:${org.hotline}`} dir="ltr" className="mt-3 block font-display text-3xl font-bold text-teal">{org.hotline}</a>
            <Link href={link(lang, "/request-help")} className="btn-ghost mt-4 w-full">{t("تسجيل حالة جديدة", "Register a case")}</Link>
          </div>
          <nav aria-label={sections[section].title[lang]} className="card p-6">
            <h2 className="mb-3 font-semibold">{sections[section].title[lang]}</h2>
            <ul className="space-y-1">
              {siblings.map((s) => (
                <li key={s.id}><Link href={link(lang, pageHref(s))} className="flex items-center justify-between rounded-xl px-3 py-2 text-[15px] text-ink-soft transition hover:bg-teal-mist hover:text-teal">{s.title[lang]}<Arrow lang={lang} size={15} /></Link></li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
      <DonateBand lang={lang} />
    </>
  );
}
