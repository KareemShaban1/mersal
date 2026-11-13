import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, tr } from "@/lib/i18n";
import { PageHero, DonateBand } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/albums">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "ألبومات" : "Albums" };
}
import Image from "next/image";
import { Smile } from "@/components/ui";
import { albums } from "@/lib/content";

export default async function Albums({ params }: PageProps<"/[lang]/albums">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  return (
    <>
      <PageHero lang={lang} title={t("ألبومات", "Albums")} lead={t("لحظات من فعاليات مرسال وحملاتها وزياراتها الميدانية.", "Moments from Mersal’s events, campaigns and field visits.")} crumbs={[{ label: t("ألبومات", "Albums") }]} />
      <ul className="container-x mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {albums.map((a) => (
          <li key={a.id} className="card overflow-hidden">
            <div className="relative aspect-[4/3] bg-teal-mist">
              {a.image ? <Image src={a.image} alt="" fill sizes="(min-width:1024px) 380px, 90vw" className="object-cover" /> : <div className="grid h-full place-items-center text-teal"><Smile className="w-24" /></div>}
            </div>
            <div className="p-5">
              <h2 className="text-lg font-semibold leading-8">{a.title[lang]}</h2>
              {a.date && <p className="mt-1 text-sm text-ink-soft"><time dateTime={a.date}>{a.date.slice(0, 4)}</time></p>}
            </div>
          </li>
        ))}
      </ul>
      <DonateBand lang={lang} />
    </>
  );
}
