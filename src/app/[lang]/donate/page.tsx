import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PhoneCall, ShieldCheck } from "lucide-react";
import DonateForm from "@/components/DonateForm";
import { PageHero } from "@/components/ui";
import { campaigns, donation } from "@/lib/content";
import { isLocale, org, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/donate">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "تبرع الآن" : "Donate now" };
}

export default async function Donate({ params }: PageProps<"/[lang]/donate">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  // general purposes first, then each running campaign as its own destination
  const destinations = [
    ...donation.destinations.map((d) => ({ id: d.id, label: d[lang] })),
    ...campaigns.map((c) => ({ id: Number(c.destinationId), label: c.title[lang] })),
  ].filter((d, i, a) => a.findIndex((x) => x.id === d.id) === i);
  return (
    <>
      <PageHero lang={lang} title={t("تبرعك يصل لمريض ينتظر", "Your gift reaches a patient who is waiting")} lead={t("اختر المبلغ وجهة التبرع وطريقة الدفع التي تناسبك. صدقة، زكاة مال، أو تبرع عام.", "Choose the amount, purpose and payment method that suit you — Sadaqa, Zakat or a general donation.")} crumbs={[{ label: t("تبرع الآن", "Donate") }]} />
      <div className="container-x mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="card p-5 sm:p-8">
          <Suspense fallback={<div className="h-96 animate-pulse rounded-3xl bg-sand" />}>
            <DonateForm
              lang={lang}
              destinations={destinations}
              banks={donation.banks}
              otherWays={donation.otherWays.map((w) => w[lang])}
              methods={donation.methods.map((m) => ({ title: m.title[lang], desc: m.desc[lang], logo: m.logo }))}
            />
          </Suspense>
        </div>
        <aside className="space-y-5">
          <div className="rounded-[28px] bg-teal p-7 text-white">
            <PhoneCall className="mb-3 text-sun" aria-hidden />
            <p className="text-white/85">{t("يمكنك التبرع من خلال الخط الساخن", "You can also donate through our hotline")}</p>
            <a href={`tel:${org.hotline}`} dir="ltr" className="mt-1 block font-display text-5xl font-bold text-sun">{org.hotline}</a>
            <p className="mt-2 text-sm text-white/75">{t("ليصلك مندوبنا لحد باب البيت", "and our representative will come to your door")}</p>
          </div>
          <div className="card p-6">
            <ShieldCheck className="mb-3 text-teal" aria-hidden />
            <h2 className="font-semibold">{t("أين يذهب تبرعك؟", "Where does your gift go?")}</h2>
            <p className="mt-2 text-[15px] leading-7 text-ink-soft">{t("تعرض مرسال مصادر دخلها وإنفاقها من حيث حجم التبرعات والمصروفات الإدارية والطبية، وتحافظ على خصوصية كل مريض.", "Mersal discloses its income and spending — donations, administrative and medical expenses — and protects every patient’s privacy.")}</p>
          </div>
        </aside>
      </div>
    </>
  );
}
