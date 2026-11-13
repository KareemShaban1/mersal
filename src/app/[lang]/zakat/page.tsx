import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, tr } from "@/lib/i18n";
import { PageHero, IntegrationNote } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/zakat">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "حاسبة الزكاة" : "Zakat calculator" };
}
import ZakatCalculator from "@/components/ZakatCalculator";
import { donation } from "@/lib/content";

export default async function Zakat({ params }: PageProps<"/[lang]/zakat">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  const zakatDest = donation.destinations.find((d) => d.code === "DonZakat")?.id ?? donation.destinations[0].id;
  return (
    <>
      <PageHero lang={lang} title={t("حساب الزكاة", "Zakat calculator")} lead={t("أدخل قيمة ما تملك في كل بند، وسنحسب لك زكاة المال بنسبة 2.5%.", "Enter the value of what you own in each category and we will calculate your Zakat at 2.5%.")} crumbs={[{ label: t("حاسبة الزكاة", "Zakat calculator") }]} />
      <div className="container-x mt-12">
        <div className="mb-8">
          <IntegrationNote>{t("رجاء ملاحظة أنه يتم حساب الزكاة على المبلغ حتى وإن لم يبلغ النصاب؛ والنصاب هو سعر 85 جرام من الذهب عيار 21، مرّ عليه حول كامل.", "Please note the calculator computes Zakat even if the amount is below the nisab; the nisab is the price of 85 grams of 21-karat gold, held for a full lunar year.")}</IntegrationNote>
        </div>
        <ZakatCalculator lang={lang} zakatDest={zakatDest} />
      </div>
    </>
  );
}
