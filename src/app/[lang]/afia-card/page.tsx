import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, org, tr } from "@/lib/i18n";
import { PageHero, DonateBand } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/afia-card">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "كارت عافية" : "Afia card" };
}
import { BadgePercent, Check } from "lucide-react";
import { afiaServices } from "@/lib/content";

export default async function Afia({ params }: PageProps<"/[lang]/afia-card">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  const perks = [
    t("خصومات سنوية تصل حتى 70% تغطي كافة الخدمات الطبية", "Annual discounts of up to 70% covering all medical services"),
    t("لا يوجد حد أقصى للخصومات", "No cap on discounts"),
    t("لا يوجد خطابات تحويل أو موافقات", "No referral letters or approvals needed"),
    t("تغطي جميع التخصصات وشبكة واسعة من مقدمي الخدمات", "Covers all specialties and a wide provider network"),
    t("فريق خدمة عملاء مدرب ومتوفر على مدار اليوم للمساعدة", "A trained customer-service team available all day"),
    t("الكارت يوفر الخصم بشكل عائلي (صاحب الكارت، الزوج والزوجة، الأولاد)", "Family coverage (cardholder, spouse and children)"),
  ];
  return (
    <>
      <PageHero lang={lang} title={t("كارت عافية", "Afia card")} lead={t("كارت خصومات عائلي للخدمات الطبية: يوفر لحامله وعائلته خصومات على جميع الخدمات الطبية من خلال شبكة تعاقدات واسعة، بنسب خصم تصل حتى 70%.", "A family discount card for medical services: discounts for the holder and their family across a wide contracted network, up to 70% off.")} crumbs={[{ label: t("كارت عافية", "Afia card") }]}>
        <a href={`tel:${org.hotline}`} className="btn-sun">{t("اطلب الكارت", "Request the card")} · <span dir="ltr">{org.hotline}</span></a>
      </PageHero>
      <div className="container-x mt-14 grid gap-10 lg:grid-cols-2">
        <section className="card p-7">
          <h2 className="mb-5 text-2xl font-bold">{t("مزايا الكارت", "Card benefits")}</h2>
          <ul className="space-y-4">
            {perks.map((p) => <li key={p} className="flex gap-3 text-[17px] leading-8 text-ink-soft"><span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-mist text-teal"><Check size={13} strokeWidth={3} aria-hidden /></span>{p}</li>)}
          </ul>
        </section>
        <section>
          <h2 className="mb-5 text-2xl font-bold">{t("الخدمات التي يغطيها كارت «عافية»", "Services covered by the Afia card")}</h2>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {afiaServices.map((s) => <li key={s.ar} lang="ar" className="flex items-center gap-2 rounded-2xl bg-sun-mist px-4 py-4 font-display font-medium"><BadgePercent size={18} className="shrink-0 text-sun-deep" aria-hidden />{s.ar.trim()}</li>)}
          </ul>
        </section>
      </div>
      <DonateBand lang={lang} />
    </>
  );
}
