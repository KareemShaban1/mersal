"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartHandshake } from "lucide-react";
import { link, tr, type Locale } from "@/lib/i18n";

const presets = [100, 500, 750, 1000];

export default function QuickDonate({ lang, destinations }: { lang: Locale; destinations: { id: number; label: string }[] }) {
  const t = tr(lang);
  const [amount, setAmount] = useState(500);
  const [custom, setCustom] = useState("");
  const [dest, setDest] = useState(destinations[0]?.id);
  const value = custom ? Number(custom) || 0 : amount;
  return (
    <div className="card p-5 sm:p-6">
      <p className="mb-3 font-display text-sm font-semibold text-ink">{t("تبرع سريع", "Quick donation")}</p>
      <div role="group" aria-label={t("اختر المبلغ", "Choose amount")} className="grid grid-cols-4 gap-2">
        {presets.map((p) => (
          <button key={p} type="button" aria-pressed={!custom && amount === p} onClick={() => { setAmount(p); setCustom(""); }}
            className={`rounded-2xl border py-2.5 font-display text-[15px] font-semibold transition ${!custom && amount === p ? "border-teal bg-teal text-white" : "border-ink/12 bg-white text-ink hover:border-teal"}`}>
            {p}
          </button>
        ))}
      </div>
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <label className="relative block">
          <span className="sr-only">{t("مبلغ آخر بالجنيه", "Other amount in EGP")}</span>
          <input inputMode="numeric" value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, ""))} placeholder={t("مبلغ آخر", "Other amount")} className="field !py-2.5 pe-14" />
          <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft">{t("جنيه", "EGP")}</span>
        </label>
        <label>
          <span className="sr-only">{t("جهة التبرع", "Donation purpose")}</span>
          <select value={dest} onChange={(e) => setDest(Number(e.target.value))} className="field !py-2.5">
            {destinations.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
          </select>
        </label>
      </div>
      <Link href={link(lang, `/donate?amount=${value}&dest=${dest}`)} className="btn-sun mt-4 w-full">
        <HeartHandshake size={18} aria-hidden />
        {value > 0 ? (lang === "ar" ? `تبرع بـ ${value} جنيه` : `Donate EGP ${value}`) : t("تبرع الآن", "Donate now")}
      </Link>
    </div>
  );
}
