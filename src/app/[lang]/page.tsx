import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Building2, Calculator, HandHeart, Landmark, LifeBuoy, MessageSquareText, PhoneCall, ShieldCheck, Smartphone, Sparkles, Store, UserRoundCheck, Users } from "lucide-react";
import QuickDonate from "@/components/QuickDonate";
import Reveal from "@/components/Reveal";
import { Arrow, CampaignCard, DonateBand, PageCard, SectionHead, Smile } from "@/components/ui";
import { bySection, campaigns, donation, pageHref } from "@/lib/content";
import { isLocale, link, org, tr } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  const projects = bySection("projects");
  const services = bySection("services");

  const stats = [
    { n: "+5,000", l: t("مريض يحصل على علاجه الشهري", "patients receive monthly treatment") },
    { n: "+1,400", l: t("مريض استضافتهم دار الضيافة", "patients hosted at the Guest House") },
    { n: "24/7", l: t("فريق طوارئ يستقبل الحالات العاجلة", "emergency team for urgent cases") },
    { n: "7", l: t("فروع في القاهرة والإسكندرية وسوهاج", "branches across Cairo, Alexandria and Sohag") },
  ];
  const values = [
    { i: UserRoundCheck, h: t("المريض أولًا", "Patient first"), p: t("المريض له الأولوية المطلقة في كل قرار.", "The patient is the absolute priority in every decision.") },
    { i: ShieldCheck, h: t("الخصوصية", "Privacy"), p: t("خصوصية المريض الطبية والشخصية ميثاق شرف لا نتهاون به.", "Medical and personal privacy is a pledge we never compromise.") },
    { i: Users, h: t("علاج بلا تمييز", "No discrimination"), p: t("باب مفتوح للجميع بلا تفرقة بين دين أو جنسية أو لون أو لغة.", "An open door for all, regardless of religion, nationality, colour or language.") },
    { i: Sparkles, h: t("المصداقية والشفافية", "Transparency"), p: t("نعرض مصادر دخلنا وإنفاقنا: حجم التبرعات والمصروفات.", "We disclose our income and spending: donations and expenses.") },
  ];
  const ways = [
    { i: Smartphone, h: t("فوري", "Fawry"), p: t("كود مرسال 9200", "Mersal code 9200") },
    { i: MessageSquareText, h: t("رسالة قصيرة", "SMS"), p: t("ابعت «مرسال» إلى 9599 بـ 5 جنيه", "Text “Mersal” to 9599 for EGP 5") },
    { i: Landmark, h: t("تحويل بنكي", "Bank transfer"), p: lang === "ar" ? `${donation.banks.length} بنوك بالجنيه والدولار واليورو` : `${donation.banks.length} banks in EGP, USD and EUR` },
    { i: PhoneCall, h: t("مندوب لباب البيت", "Home collection"), p: t(`اتصل بـ ${org.hotline}`, `Call ${org.hotline}`) },
    { i: HandHeart, h: t("إنستاباي والمحافظ", "InstaPay & wallets"), p: t("فودافون كاش، اتصالات، أورانج", "Vodafone Cash, Etisalat, Orange") },
    { i: Store, h: t("فروع مرسال", "At our branches"), p: t("تبرع نقدًا أو بالبطاقة", "Give in cash or by card") },
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="absolute -start-40 top-10 size-[420px] rounded-full bg-sun-mist" />
        <div aria-hidden className="absolute -end-32 bottom-0 size-[360px] rounded-full bg-teal-mist" />
        <div className="container-x relative grid items-center gap-12 pb-16 pt-10 lg:grid-cols-[1.05fr_1fr] lg:pb-24 lg:pt-16">
          <div>
            <p className="eyebrow mb-5">{t("مؤسسة خيرية تعمل في مجال الصحة", "A health charity in Egypt")}</p>
            <h1 className="text-[2.6rem] font-bold leading-[1.2] text-ink sm:text-6xl sm:leading-[1.15]">
              {t("نفتح باب ", "We open a new ")}
              <span className="relative whitespace-nowrap text-teal">
                {t("أمل جديد", "door of hope")}
                <svg viewBox="0 0 200 20" preserveAspectRatio="none" fill="none" aria-hidden className="absolute start-0 top-[92%] h-4 w-full text-sun"><path className="draw" d="M4 6c50 14 142 14 192 0" stroke="currentColor" strokeWidth="7" strokeLinecap="round" /></svg>
              </span>
              {t(" لكل مريض", " for every patient")}
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-9 text-ink-soft">
              {t(
                "مرسال توفّر الرعاية الطبية غير المغطاة في النظام الحكومي، بجودة عالية، لكل من يحتاجها من غير القادرين — بلا أي تفرقة.",
                "Mersal provides the medical care the public system does not cover, at high quality, to everyone who cannot afford it — without any discrimination.",
              )}
            </p>
            <div className="mt-8 max-w-xl">
              <QuickDonate lang={lang} destinations={donation.destinations.map((d) => ({ id: d.id, label: d[lang] }))} />
            </div>
            <p className="mt-4 flex items-center gap-2 text-sm text-ink-soft">
              <LifeBuoy size={16} className="text-teal" aria-hidden />
              {t("تحتاج مساعدة طبية؟", "Need medical help?")}
              <Link href={link(lang, "/request-help")} className="font-display font-semibold text-teal underline decoration-sun decoration-2 underline-offset-4">{t("سجّل حالة جديدة", "Register a case")}</Link>
            </p>
          </div>

          <div className="relative mx-auto h-[420px] w-full max-w-[520px] sm:h-[540px]">
            <div className="absolute end-0 top-0 h-[78%] w-[62%] overflow-hidden rounded-t-[999px] rounded-b-[36px] bg-teal shadow-lift">
              <Image src="/media/family-sponsorship-1.jpg" alt={t("مريضة تبتسم مع ممرضتها", "A patient smiling with her nurse")} fill priority sizes="(min-width:1024px) 320px, 60vw" className="object-cover" />
            </div>
            <div className="floaty absolute bottom-0 start-0 h-[52%] w-[46%] overflow-hidden rounded-[36px] border-[6px] border-cream shadow-lift">
              <Image src="/media/children-hospital-1.jpg" alt={t("طفلة في المستشفى تحتضن دميتها", "A child in hospital hugging her teddy bear")} fill sizes="(min-width:1024px) 240px, 45vw" className="object-cover" />
            </div>
            <div className="absolute start-[6%] top-[6%] grid size-28 place-items-center rounded-full bg-sun text-teal-deep shadow-soft sm:size-32">
              <div className="text-center font-display leading-tight">
                <span className="block text-xs font-medium">{t("الخط الساخن", "Hotline")}</span>
                <span className="block text-2xl font-bold sm:text-3xl">{org.hotline}</span>
              </div>
            </div>
            <div className="absolute bottom-[8%] end-[2%] rounded-3xl bg-white px-5 py-4 shadow-lift">
              <p className="font-display text-sm font-semibold text-ink">{t("علاج بلا تمييز", "Care without discrimination")}</p>
              <p className="text-xs text-ink-soft">{t("دين · جنسية · لون · لغة", "religion · nationality · colour · language")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className="container-x">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[32px] bg-teal text-white lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 80} className="flex flex-col-reverse justify-end bg-teal-deep p-5 sm:p-8">
              <dt className="mt-2 text-[15px] leading-7 text-white/75">{s.l}</dt>
              <dd dir="ltr" className="font-display text-3xl font-bold text-sun sm:text-5xl">{s.n}</dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* CAMPAIGNS */}
      <section className="container-x mt-24">
        <SectionHead
          eyebrow={t("حملات تحتاج مشاركتك", "Campaigns that need you")}
          title={t("اختر أين يذهب تبرعك", "Choose where your gift goes")}
          lead={t("صدقات أو زكاة — يمكنك المساهمة بسهم واحد أو أكثر في أي حملة.", "Sadaqa or Zakat — contribute one share or more to any campaign.")}
          action={<Link href={link(lang, "/donate")} className="btn-ghost shrink-0">{t("تبرع عام", "General donation")}<Arrow lang={lang} /></Link>}
        />
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {campaigns.map((c, i) => <Reveal key={c.id} delay={(i % 3) * 90} className="w-[82%] shrink-0 snap-center sm:w-auto"><CampaignCard c={c} lang={lang} /></Reveal>)}
        </div>
      </section>

      {/* ABOUT / VALUES */}
      <section className="mt-24 bg-sand py-20">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative mx-auto w-full max-w-md">
            <div aria-hidden className="absolute -inset-4 rotate-3 rounded-[44px] bg-teal/15" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] shadow-lift">
              <Image src="/media/guest-house-1.jpg" alt={t("متطوع من مرسال يرافق مريضًا على كرسي متحرك", "A Mersal volunteer accompanying a patient in a wheelchair")} fill sizes="(min-width:1024px) 440px, 90vw" className="object-cover" />
            </div>
            <Smile className="absolute -bottom-8 -start-6 w-32 text-sun" />
          </Reveal>
          <div>
            <p className="eyebrow mb-3">{t("من نحن", "Who we are")}</p>
            <h2 className="text-3xl font-bold sm:text-[2.5rem]">{t("نرافق المريض في رحلة العلاج بأكملها", "We stay with the patient for the whole journey")}</h2>
            <p className="mt-5 text-lg leading-9 text-ink-soft">
              {t(
                "عبر شبكة من الأطباء والمستشفيات المتعاقدة، تفتح مرسال أبوابها لكل المرضى أيًّا كانت درجة خطورة حالتهم، مع الحفاظ على السرية والخصوصية التامة لكل مريض.",
                "Through a network of contracted doctors and hospitals, Mersal opens its doors to all patients however serious their condition, while protecting every patient’s privacy.",
              )}
            </p>
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {values.map((v) => (
                <li key={v.h} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white text-teal shadow-soft"><v.i size={22} aria-hidden /></span>
                  <div><h3 className="font-semibold text-ink">{v.h}</h3><p className="mt-1 text-[15px] leading-7 text-ink-soft">{v.p}</p></div>
                </li>
              ))}
            </ul>
            <Link href={link(lang, "/about")} className="btn-teal mt-9">{t("تعرّف على مرسال", "More about Mersal")}<Arrow lang={lang} /></Link>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="container-x mt-24">
        <SectionHead
          eyebrow={t("مشاريع مرسال", "Our projects")}
          title={t("مشاريع طبية قائمة بتبرعاتكم", "Medical projects built on your giving")}
          action={<Link href={link(lang, "/projects")} className="btn-ghost shrink-0">{lang === "ar" ? `كل المشاريع (${projects.length})` : `All ${projects.length} projects`}<Arrow lang={lang} /></Link>}
        />
        <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {projects.slice(0, 6).map((p, i) => <Reveal key={p.id} delay={(i % 3) * 90} className="w-[82%] shrink-0 snap-center sm:w-auto"><PageCard p={p} lang={lang} index={i} /></Reveal>)}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x mt-24">
        <SectionHead eyebrow={t("خدمات مرسال", "Our services")} title={t("كل ما يحتاجه المريض، في مكان واحد", "Everything a patient needs, in one place")} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li key={s.id}>
              <Link href={link(lang, pageHref(s))} className="group flex items-center gap-4 rounded-3xl border border-ink/[0.07] bg-white p-3 pe-5 transition hover:border-teal hover:shadow-soft">
                <span className="relative size-20 shrink-0 overflow-hidden rounded-2xl bg-teal-mist">
                  {s.images[0] && <Image src={s.images[0]} alt="" fill sizes="80px" className="object-cover" />}
                </span>
                <span className="flex-1">
                  <span className="block text-xs text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
                  <span className="block font-display text-lg font-semibold text-ink group-hover:text-teal">{s.title[lang]}</span>
                </span>
                <span className="text-teal opacity-0 transition group-hover:opacity-100"><Arrow lang={lang} /></span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* WAYS TO GIVE */}
      <section className="container-x mt-24">
        <div className="rounded-[40px] bg-sun-mist px-6 py-12 sm:px-12 sm:py-14">
          <SectionHead center eyebrow={t("طرق التبرع", "Ways to give")} title={t("تبرّع بالطريقة الأسهل لك", "Give the way that suits you")} />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ways.map((w) => (
              <li key={w.h} className="flex items-center gap-4 rounded-3xl bg-white p-5 shadow-soft">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-teal text-white"><w.i size={22} aria-hidden /></span>
                <div><h3 className="font-semibold text-ink">{w.h}</h3><p className="text-[15px] text-ink-soft">{w.p}</p></div>
              </li>
            ))}
          </ul>
          <div className="mt-8 text-center"><Link href={link(lang, "/ways-to-give")} className="btn-teal">{t("تفاصيل طرق التبرع والحسابات البنكية", "Details and bank accounts")}<Arrow lang={lang} /></Link></div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="container-x mt-8 grid gap-6 md:grid-cols-2">
        {[
          { i: Calculator, h: t("احسب زكاتك", "Calculate your Zakat"), p: t("حاسبة تفصيلية للنقود والذهب والفضة والاستثمارات والتجارة.", "A detailed calculator for cash, gold, silver, investments and business."), href: "/zakat", cta: t("افتح الحاسبة", "Open calculator") },
          { i: Building2, h: t("مستشفى مرسال للأطفال", "Mersal Children’s Hospital"), p: t("مستشفى خيري متخصص في طب الأطفال: حضانات، رعاية مركزة، ووحدة زرع نخاع.", "A charitable paediatric hospital: incubators, intensive care and a bone-marrow transplant unit."), href: "/projects/children-hospital", cta: t("اعرف عن المستشفى", "About the hospital") },
        ].map((c) => (
          <Link key={c.href} href={link(lang, c.href)} className="card group flex gap-5 p-7 transition hover:-translate-y-1 hover:shadow-lift">
            <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-teal-mist text-teal"><c.i size={26} aria-hidden /></span>
            <div>
              <h3 className="text-xl font-semibold">{c.h}</h3>
              <p className="mt-1.5 text-[15px] leading-7 text-ink-soft">{c.p}</p>
              <span className="mt-3 flex items-center gap-2 font-display text-sm font-semibold text-teal">{c.cta}<Arrow lang={lang} size={16} /></span>
            </div>
          </Link>
        ))}
      </section>

      <DonateBand lang={lang} />
    </>
  );
}
