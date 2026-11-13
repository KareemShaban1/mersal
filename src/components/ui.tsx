import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check, ChevronLeft, ChevronRight, Info } from "lucide-react";
import type { Block, Campaign, ContentPage } from "@/lib/content";
import { excerpt, pageHref } from "@/lib/content";
import { link, num, tr, type Locale } from "@/lib/i18n";

export const Arrow = ({ lang, size = 18 }: { lang: Locale; size?: number }) =>
  lang === "ar" ? <ArrowLeft size={size} aria-hidden /> : <ArrowRight size={size} aria-hidden />;

/** Brand "smile" stroke, echoing Mersal's «ابعت فرحة» mark */
export const Smile = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 120 60" fill="none" aria-hidden className={className}>
    <path className="draw" d="M8 12c14 34 74 48 104 4" stroke="currentColor" strokeWidth="9" strokeLinecap="round" />
  </svg>
);

export function SectionHead({ eyebrow, title, lead, center, action }: { eyebrow?: string; title: string; lead?: string; center?: boolean; action?: ReactNode }) {
  return (
    <div className={`mb-10 flex flex-col gap-5 ${center ? "items-center text-center" : "sm:flex-row sm:items-end sm:justify-between"}`}>
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h2 className="text-3xl font-bold text-ink sm:text-[2.5rem]">{title}</h2>
        {lead && <p className="mt-4 text-lg text-ink-soft">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHero({ lang, title, lead, crumbs = [], image, children }: {
  lang: Locale; title: string; lead?: string; crumbs?: { label: string; href?: string }[]; image?: string; children?: ReactNode;
}) {
  const t = tr(lang);
  const Sep = lang === "ar" ? ChevronLeft : ChevronRight;
  return (
    <section className="relative overflow-hidden bg-sand">
      <div aria-hidden className="absolute -end-24 -top-24 size-80 rounded-full bg-sun-mist" />
      <div aria-hidden className="absolute -bottom-32 start-1/4 size-72 rounded-full bg-teal-mist" />
      <div className={`container-x relative grid items-center gap-10 py-14 sm:py-20 ${image ? "lg:grid-cols-[1.15fr_1fr]" : ""}`}>
        <div>
          <nav aria-label={t("مسار التنقل", "Breadcrumb")} className="mb-5 text-sm text-ink-soft">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href={link(lang)} className="hover:text-teal">{t("الرئيسية", "Home")}</Link></li>
              {crumbs.map((c) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  <Sep size={14} aria-hidden className="opacity-50" />
                  {c.href ? <Link href={link(lang, c.href)} className="hover:text-teal">{c.label}</Link> : <span aria-current="page" className="text-ink">{c.label}</span>}
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="max-w-3xl text-4xl font-bold text-ink sm:text-5xl">{title}</h1>
          {lead && <p className="mt-5 max-w-2xl text-lg leading-9 text-ink-soft">{lead}</p>}
          {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
        </div>
        {image && (
          <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
            <div aria-hidden className="absolute -inset-3 -rotate-3 rounded-[40px] bg-sun/70" />
            <div className="relative h-full overflow-hidden rounded-[36px] shadow-lift">
              <Image src={image} alt="" fill sizes="(min-width:1024px) 500px, 90vw" className="object-cover" priority />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/** Renders the structured content blocks captured from the CMS */
export function Blocks({ blocks }: { blocks: Block[] }) {
  const out: ReactNode[] = [];
  let list: Block[] = [];
  const flush = () => {
    if (!list.length) return;
    const items = list;
    out.push(
      <ul key={`l${out.length}`} className="mb-6 space-y-3">
        {items.map((b, i) => (
          <li key={i} className="flex gap-3 text-[17px] leading-8 text-ink-soft">
            <span className="mt-1.5 grid size-5 shrink-0 place-items-center rounded-full bg-teal-mist text-teal"><Check size={13} strokeWidth={3} aria-hidden /></span>
            {b.href ? <a href={b.href} target="_blank" rel="noopener noreferrer" className="underline decoration-sun decoration-2 underline-offset-4 hover:text-teal">{b.x}</a> : <span>{b.x}</span>}
          </li>
        ))}
      </ul>,
    );
    list = [];
  };
  blocks.forEach((b, i) => {
    if (b.t === "li") return void list.push(b);
    flush();
    // short standalone lines ending with ":" act as sub-headings in the source content
    const heading = b.t === "h" || (b.x.length < 60 && /[:؟?]$/.test(b.x));
    out.push(heading ? <h3 key={i}>{b.x.replace(/:$/, "")}</h3> : <p key={i}>{b.x}</p>);
  });
  flush();
  return <div className="prose-m">{out}</div>;
}

export function CampaignCard({ c, lang }: { c: Campaign; lang: Locale }) {
  const t = tr(lang);
  const pct = Math.min(100, Math.round((c.achieved / c.goal) * 100));
  return (
    <article className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-square overflow-hidden bg-sand">
        {c.image && <Image src={c.image} alt="" fill sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 92vw" className="object-cover transition duration-700 group-hover:scale-105" />}
        <span className="absolute start-4 top-4 rounded-full bg-white/95 px-3 py-1 font-display text-xs font-semibold text-teal-deep shadow-soft">
          {lang === "ar" ? `السهم ${num(lang, c.unitAmount)} جنيه` : `Share: EGP ${num(lang, c.unitAmount)}`}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-ink">{c.title[lang]}</h3>
        {c.desc[lang] !== c.title[lang] && <p className="mt-1.5 text-[15px] text-ink-soft">{c.desc[lang]}</p>}
        <div className="mt-auto pt-6">
          <div className="mb-2 flex items-baseline justify-between text-sm">
            <span className="font-display font-semibold text-teal">{num(lang, c.achieved)} <span className="font-normal text-ink-soft">{t("تم توفيره", "provided")}</span></span>
            <span className="text-ink-soft">{t("الهدف", "Goal")} {num(lang, c.goal)}</span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-sand" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={`${c.title[lang]}: ${pct}%`}>
            <div className="h-full rounded-full bg-gradient-to-l from-sun to-teal rtl:bg-gradient-to-r" style={{ width: `${Math.max(pct, 2)}%` }} />
          </div>
          <Link href={link(lang, `/donate?dest=${c.destinationId}&amount=${c.unitAmount}`)} className="btn-teal mt-5 w-full">
            {t("تبرع لهذه الحملة", "Give to this campaign")}
          </Link>
        </div>
      </div>
    </article>
  );
}

export function PageCard({ p, lang, index = 0 }: { p: ContentPage; lang: Locale; index?: number }) {
  const t = tr(lang);
  return (
    <Link href={link(lang, pageHref(p))} className="card group flex h-full flex-col overflow-hidden transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-teal-mist">
        {p.images[0]
          ? <Image src={p.images[0]} alt="" fill sizes="(min-width:1024px) 380px, (min-width:640px) 50vw, 92vw" className="object-cover transition duration-700 group-hover:scale-105" />
          : <div className={`grid h-full place-items-center ${index % 2 ? "bg-sun-mist text-sun-deep" : "bg-teal-mist text-teal"}`}><Smile className="w-24" /></div>}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold text-ink transition group-hover:text-teal">{p.title[lang]}</h3>
        <p className="mt-2 text-[15px] leading-7 text-ink-soft">{excerpt(p, lang, 130)}</p>
        <span className="mt-auto flex items-center gap-2 pt-5 font-display text-sm font-semibold text-teal">{t("اعرف أكثر", "Learn more")}<Arrow lang={lang} size={16} /></span>
      </div>
    </Link>
  );
}

/** Honest marker for features that still need the foundation's backend connected */
export function IntegrationNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2.5 rounded-2xl bg-sun-mist px-4 py-3 text-sm leading-6 text-ink">
      <Info size={18} className="mt-0.5 shrink-0 text-sun-deep" aria-hidden />
      <span>{children}</span>
    </p>
  );
}

export function DonateBand({ lang }: { lang: Locale }) {
  const t = tr(lang);
  return (
    <section className="container-x mt-24">
      <div className="relative overflow-hidden rounded-[40px] bg-teal px-6 py-14 text-center text-white sm:px-12 sm:py-16">
        <div aria-hidden className="absolute -start-16 -top-16 size-56 rounded-full bg-teal-bright/40" />
        <div aria-hidden className="absolute -bottom-20 -end-10 size-64 rounded-full bg-teal-deep/40" />
        <div className="relative mx-auto max-w-2xl">
          <Smile className="mx-auto mb-4 w-20 text-sun" />
          <h2 className="text-3xl font-bold sm:text-4xl">{t("تبرعك يفتح باب أمل جديد", "Your gift opens a new door of hope")}</h2>
          <p className="mt-4 text-lg text-white/85">{t("صدقة أو زكاة أو صدقة جارية — كل مساهمة تصل لمريض ينتظر علاجه.", "Sadaqa, Zakat or ongoing charity — every contribution reaches a patient waiting for treatment.")}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={link(lang, "/donate")} className="btn-sun">{t("تبرع الآن", "Donate now")}</Link>
            <Link href={link(lang, "/ways-to-give")} className="btn border border-white/40 text-white hover:bg-white/10">{t("كل طرق التبرع", "All ways to give")}</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
