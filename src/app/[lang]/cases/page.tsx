import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, tr } from "@/lib/i18n";
import { PageHero, DonateBand } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/cases">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "حالات حرجة" : "Critical cases" };
}
import CasesExplorer, { type CaseItem } from "@/components/CasesExplorer";
import { CampaignCard, SectionHead } from "@/components/ui";
import { campaigns } from "@/lib/content";

// The live API (/MersalAPI/api/Case/GetCasesHomeView) returned no published cases when the content
// snapshot was taken. Fill this list from that endpoint once the backend is connected.
const cases: CaseItem[] = [];

export default async function Cases({ params }: PageProps<"/[lang]/cases">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  return (
    <>
      <PageHero lang={lang} title={t("حالات حرجة", "Critical cases")} lead={t("حالات تحتاج إلى مشاركتك بالمال (صدقات أو زكاة). يمكنك المساعدة في حالة واحدة أو أكثر.", "Cases that need your financial support (Sadaqa or Zakat). You can help one case or several.")} crumbs={[{ label: t("حالات حرجة", "Critical cases") }]} />
      <div className="container-x mt-12"><CasesExplorer lang={lang} cases={cases} /></div>
      <section className="container-x mt-20">
        <SectionHead eyebrow={t("حملات مفتوحة", "Open campaigns")} title={t("ادعم حملة قائمة الآن", "Support a running campaign")} />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{campaigns.slice(0, 3).map((c) => <CampaignCard key={c.id} c={c} lang={lang} />)}</div>
      </section>
      <DonateBand lang={lang} />
    </>
  );
}
