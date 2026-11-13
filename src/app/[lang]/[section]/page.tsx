import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { DonateBand, PageCard, PageHero } from "@/components/ui";
import { bySection, isSection, sections } from "@/lib/content";
import { isLocale, locales } from "@/lib/i18n";

export function generateStaticParams() {
  return locales.flatMap((lang) => Object.keys(sections).map((section) => ({ lang, section })));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[section]">): Promise<Metadata> {
  const { lang, section } = await params;
  if (!isLocale(lang) || !isSection(section)) return {};
  return { title: sections[section].title[lang], description: sections[section].lead[lang] };
}

export default async function SectionIndex({ params }: PageProps<"/[lang]/[section]">) {
  const { lang, section } = await params;
  if (!isLocale(lang) || !isSection(section)) notFound();
  const s = sections[section];
  return (
    <>
      <PageHero lang={lang} title={s.title[lang]} lead={s.lead[lang]} crumbs={[{ label: s.title[lang] }]} />
      <div className="container-x mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {bySection(section).map((p, i) => <Reveal key={p.id} delay={(i % 3) * 90}><PageCard p={p} lang={lang} index={i} /></Reveal>)}
      </div>
      <DonateBand lang={lang} />
    </>
  );
}
