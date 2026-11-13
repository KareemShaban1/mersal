"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CreditCard, Landmark, Lock, Smartphone, Truck, Wallet } from "lucide-react";
import { CopyButton, Field, FormShell, TextArea } from "@/components/forms";
import { IntegrationNote } from "@/components/ui";
import { org, tr, type Locale } from "@/lib/i18n";

type Bank = { id: number; name: { ar: string; en: string }; logo: string | null; accounts: { number: string; currency: string }[] };
type Props = {
  lang: Locale;
  destinations: { id: number; label: string }[];
  banks: Bank[];
  otherWays: string[];
  methods: { title: string; desc: string; logo: string | null }[];
};

const presets = { EGP: [50, 100, 500, 1000], USD: [10, 25, 50, 100] };

export default function DonateForm({ lang, destinations, banks, otherWays, methods }: Props) {
  const t = tr(lang);
  const q = useSearchParams();
  const qAmount = Number(q.get("amount")) || 0;
  const qDest = Number(q.get("dest"));
  const tabs = [
    { id: "online", label: t("الدفع الإلكتروني", "Online payment"), icon: CreditCard },
    { id: "bank", label: t("حسابات بنكية", "Bank accounts"), icon: Landmark },
    { id: "rep", label: t("مندوب", "Home collection"), icon: Truck },
    { id: "other", label: t("وسائل أخرى", "Other ways"), icon: Wallet },
  ] as const;
  const [tab, setTab] = useState<(typeof tabs)[number]["id"]>("online");
  const [abroad, setAbroad] = useState(false);
  const cur = abroad ? "USD" : "EGP";
  const [amount, setAmount] = useState(qAmount && !presets.EGP.includes(qAmount) ? 0 : qAmount || 500);
  const [custom, setCustom] = useState(qAmount && !presets.EGP.includes(qAmount) ? String(qAmount) : "");
  const [dest, setDest] = useState(destinations.some((d) => d.id === qDest) ? qDest : destinations[0].id);
  const [method, setMethod] = useState<"card" | "fawry">("card");
  const [submitted, setSubmitted] = useState(false);
  const value = custom ? Number(custom) || 0 : amount;
  const curLabel = cur === "EGP" ? t("جنيه", "EGP") : t("دولار", "USD");

  return (
    <div>
      <div role="tablist" aria-label={t("طريقة التبرع", "Donation method")} className="mb-8 grid grid-cols-2 gap-2 rounded-[28px] bg-sand p-2 sm:grid-cols-4">
        {tabs.map((x) => (
          <button key={x.id} role="tab" id={`tab-${x.id}`} aria-selected={tab === x.id} aria-controls={`panel-${x.id}`} onClick={() => setTab(x.id)}
            className={`flex items-center justify-center gap-2 rounded-[22px] px-3 py-3 font-display text-sm font-semibold transition ${tab === x.id ? "bg-white text-teal shadow-soft" : "text-ink-soft hover:text-ink"}`}>
            <x.icon size={18} aria-hidden />{x.label}
          </button>
        ))}
      </div>

      {tab === "online" && (
        <form role="tabpanel" id="panel-online" aria-labelledby="tab-online" className="space-y-8" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} onChange={() => submitted && setSubmitted(false)}>
          <fieldset>
            <legend className="mb-4 flex items-center gap-3 font-display text-lg font-semibold"><span className="grid size-8 place-items-center rounded-full bg-teal text-sm text-white">1</span>{t("اختر المبلغ", "Choose an amount")}</legend>
            <div className="mb-4 inline-flex rounded-full bg-sand p-1 text-sm">
              {[false, true].map((a) => (
                <button key={String(a)} type="button" aria-pressed={abroad === a} onClick={() => { setAbroad(a); setAmount(a ? 25 : 500); setCustom(""); }}
                  className={`rounded-full px-5 py-2 font-display font-medium transition ${abroad === a ? "bg-teal text-white" : "text-ink-soft"}`}>
                  {a ? t("خارج مصر", "Outside Egypt") : t("داخل مصر", "Inside Egypt")}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
              {presets[cur].map((p) => (
                <button key={p} type="button" aria-pressed={!custom && amount === p} onClick={() => { setAmount(p); setCustom(""); }}
                  className={`rounded-2xl border py-4 font-display text-lg font-semibold transition ${!custom && amount === p ? "border-teal bg-teal text-white" : "border-ink/12 bg-white hover:border-teal"}`}>
                  {p} <span className="text-xs font-normal opacity-80">{curLabel}</span>
                </button>
              ))}
              <label className="relative col-span-2 sm:col-span-1">
                <span className="sr-only">{t("مبلغ آخر", "Other amount")}</span>
                <input inputMode="numeric" value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))} placeholder={t("مبلغ آخر", "Other")} className="field h-full !py-4 text-center font-display text-lg font-semibold" />
              </label>
            </div>
            <label className="mt-5 block max-w-sm">
              <span className="label">{t("جهة التبرع", "Donation purpose")}</span>
              <select className="field" value={dest} onChange={(e) => setDest(Number(e.target.value))}>
                {destinations.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
              </select>
            </label>
          </fieldset>

          <fieldset>
            <legend className="mb-4 flex items-center gap-3 font-display text-lg font-semibold"><span className="grid size-8 place-items-center rounded-full bg-teal text-sm text-white">2</span>{t("بياناتك", "Your details")}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field half label={t("اسم المتبرع", "Full name")} name="DonatorName" required autoComplete="name" />
              <Field half label={t("التليفون", "Phone")} name="Phone" type="tel" required dir="ltr" autoComplete="tel" />
              <Field half label={t("البريد الإلكتروني", "Email")} name="DonatorEmail" type="email" required dir="ltr" autoComplete="email" />
              <Field half label={t("العنوان", "Address")} name="Address" required autoComplete="street-address" />
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-4 flex items-center gap-3 font-display text-lg font-semibold"><span className="grid size-8 place-items-center rounded-full bg-teal text-sm text-white">3</span>{t("طريقة الدفع", "Payment method")}</legend>
            <div className="grid gap-3 sm:grid-cols-2">
              {([["card", CreditCard, t("بطاقة بنكية", "Bank card"), t("فيزا / ماستركارد عبر بوابة بنك مصر", "Visa / Mastercard via Banque Misr gateway")], ["fawry", Smartphone, t("فوري", "Fawry"), t("ادفع بكود فوري من أي منفذ", "Pay with a Fawry reference at any outlet")]] as const)
                .filter(([id]) => !(abroad && id === "fawry"))
                .map(([id, Icon, h, p]) => (
                  <label key={id} className={`flex cursor-pointer items-center gap-4 rounded-3xl border p-4 transition ${method === id ? "border-teal bg-teal-mist" : "border-ink/12 bg-white hover:border-teal"}`}>
                    <input type="radio" name="method" className="sr-only" checked={method === id} onChange={() => setMethod(id)} />
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white text-teal shadow-soft"><Icon size={20} aria-hidden /></span>
                    <span><span className="block font-display font-semibold">{h}</span><span className="block text-sm text-ink-soft">{p}</span></span>
                  </label>
                ))}
            </div>
          </fieldset>

          <div className="rounded-3xl bg-sand p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
            <p className="font-display text-lg">
              {t("إجمالي التبرع", "Total")}: <strong className="text-2xl text-teal">{value || "—"}</strong> {curLabel}
              <span className="block text-sm text-ink-soft">{destinations.find((d) => d.id === dest)?.label}</span>
            </p>
            <button type="submit" disabled={!value} className="btn-sun mt-4 w-full disabled:cursor-not-allowed disabled:opacity-50 sm:mt-0 sm:w-auto">
              <Lock size={16} aria-hidden />{t("متابعة إلى الدفع الآمن", "Continue to secure payment")}
            </button>
          </div>
          {submitted && (
            <div role="status">
              <IntegrationNote>
                {t(
                  "بوابة الدفع غير مفعّلة في هذه النسخة بعد (تحتاج بيانات اعتماد بنك مصر وفوري)، لذلك لم يُخصم أي مبلغ. يمكنك إتمام التبرع الآن عبر ",
                  "The payment gateway is not connected in this build yet (it needs the Banque Misr and Fawry credentials), so nothing was charged. You can complete your donation now on ",
                )}
                <a className="font-semibold text-teal underline" href={`https://www.mersal-ngo.org/Donation?donationDestID=${dest}`} target="_blank" rel="noopener noreferrer">{t("صفحة التبرع الحالية", "the current donation page")}</a>.
              </IntegrationNote>
            </div>
          )}
        </form>
      )}

      {tab === "bank" && (
        <div role="tabpanel" id="panel-bank" aria-labelledby="tab-bank">
          <p className="mb-6 text-ink-soft">{t("حوّل تبرعك مباشرة إلى حسابات مؤسسة مرسال في البنوك التالية:", "Transfer directly to Mersal Foundation’s accounts at the following banks:")}</p>
          <ul className="grid gap-4 md:grid-cols-2">
            {banks.map((b) => (
              <li key={b.id} className="card p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="relative grid h-12 w-24 shrink-0 place-items-center overflow-hidden rounded-xl bg-white">
                    {b.logo && <Image src={b.logo} alt="" fill sizes="96px" className="object-contain" />}
                  </span>
                  <h3 className="font-semibold">{b.name[lang]}</h3>
                </div>
                <dl className="space-y-2">
                  {b.accounts.map((a) => (
                    <div key={a.number} className="flex items-center justify-between gap-3 rounded-2xl bg-cream px-4 py-2.5">
                      <dt className="w-10 font-display text-sm font-semibold text-teal">{a.currency}</dt>
                      <dd dir="ltr" className="flex-1 font-mono text-[15px] tracking-wide">{a.number}</dd>
                      <CopyButton value={a.number} lang={lang} />
                    </div>
                  ))}
                </dl>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tab === "rep" && (
        <div role="tabpanel" id="panel-rep" aria-labelledby="tab-rep">
          <p className="mb-6 text-ink-soft">
            {t("اطلب مندوب مرسال ليصلك لحد باب البيت، أو اتصل مباشرة بالخط الساخن ", "Request a Mersal representative to collect from your door, or call the hotline ")}
            <a href={`tel:${org.hotline}`} dir="ltr" className="font-display font-bold text-teal">{org.hotline}</a>.
          </p>
          <FormShell lang={lang} submit={t("اطلب مندوب", "Request collection")} endpoint="RepresentativeDonation">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field half label={t("الاسم", "Name")} name="Name" required autoComplete="name" />
              <Field half label={t("التليفون", "Phone")} name="Phone" type="tel" required dir="ltr" autoComplete="tel" />
              <Field half label={t("المبلغ بالجنيه", "Amount (EGP)")} name="Amount" type="number" required dir="ltr" />
              <Field half label={t("الموعد المناسب", "Preferred time")} name="Time" type="datetime-local" />
              <TextArea label={t("العنوان بالتفصيل", "Full address")} name="Address" required rows={3} />
            </div>
          </FormShell>
        </div>
      )}

      {tab === "other" && (
        <div role="tabpanel" id="panel-other" aria-labelledby="tab-other">
          <ul className="grid gap-4 sm:grid-cols-3">
            {methods.map((m) => (
              <li key={m.title} className="card flex flex-col items-center p-6 text-center">
                <span className="relative mb-4 block h-16 w-32">{m.logo && <Image src={m.logo} alt="" fill sizes="128px" className="object-contain" />}</span>
                <h3 className="font-semibold">{m.title}</h3>
                <p className="mt-1 text-[15px] text-ink-soft">{m.desc}</p>
              </li>
            ))}
          </ul>
          <h3 className="mb-3 mt-8 font-display font-semibold">{t("نقبل التبرعات أيضًا عبر", "We also accept donations through")}</h3>
          <ul className="flex flex-wrap gap-2">
            {otherWays.map((w) => <li key={w} className="rounded-full border border-ink/10 bg-white px-4 py-2 text-[15px]">{w}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
