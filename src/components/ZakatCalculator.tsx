"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { link, num, tr, type Locale } from "@/lib/i18n";

const RATE = 0.025;

export default function ZakatCalculator({ lang, zakatDest }: { lang: Locale; zakatDest: number }) {
  const t = tr(lang);
  const groups = useMemo(() => [
    { id: "cash", title: t("زكاة النقود", "Cash"), fields: [
      ["hand", t("النقد في اليد", "Cash in hand")], ["savings", t("حسابات التوفير", "Savings accounts")],
      ["current", t("الحسابات الجارية", "Current accounts")], ["deposits", t("الإيداعات الثابتة", "Fixed deposits")] ] },
    { id: "metals", title: t("الذهب والفضة والأحجار الكريمة", "Gold, silver and precious stones"), fields: [
      ["gold", t("قيمة الذهب", "Value of gold")], ["silver", t("قيمة الفضة", "Value of silver")], ["stones", t("قيمة الأحجار الكريمة", "Value of precious stones")] ] },
    { id: "invest", title: t("القروض والاستثمارات", "Loans and investments"), fields: [
      ["loans", t("قروض مستحقة لك واستثمارات", "Loans owed to you and investments")], ["realestate", t("الاستثمارات العقارية", "Real-estate investments")], ["shares", t("أسهم في شركات", "Company shares")] ] },
    { id: "business", title: t("الأعمال والزراعة", "Business and agriculture"), fields: [
      ["business", t("قيمة بضاعة التجارة والأعمال", "Business goods and trade value")], ["agri", t("المنتجات الزراعية", "Agricultural products")], ["animals", t("حيوانات وطيور داجنة وأسماك", "Livestock, poultry and fish")] ] },
  ], [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const [v, setV] = useState<Record<string, string>>({});
  const n = (k: string) => Number(v[k]) || 0;
  const assets = groups.flatMap((g) => g.fields).reduce((s, [k]) => s + n(k), 0);
  const liabilities = n("liabilities");
  const base = Math.max(0, assets - liabilities);
  const zakat = Math.round(base * RATE);
  const input = (k: string, label: string) => (
    <label key={k} className="block">
      <span className="label">{label}</span>
      <span className="relative block">
        <input inputMode="decimal" dir="ltr" className="field pe-14 text-end" value={v[k] ?? ""} placeholder="0"
          onChange={(e) => setV({ ...v, [k]: e.target.value.replace(/[^\d.]/g, "") })} />
        <span className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-sm text-ink-soft">{t("جنيه", "EGP")}</span>
      </span>
    </label>
  );
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
      <div className="space-y-6">
        {groups.map((g) => (
          <fieldset key={g.id} className="card p-6">
            <legend className="float-start mb-4 w-full font-display text-lg font-semibold">{g.title}</legend>
            <div className="clear-both grid gap-4 sm:grid-cols-2">{g.fields.map(([k, l]) => input(k, l))}</div>
          </fieldset>
        ))}
        <fieldset className="card p-6">
          <legend className="float-start mb-4 w-full font-display text-lg font-semibold">{t("الالتزامات (تُخصم)", "Liabilities (deducted)")}</legend>
          <div className="clear-both grid gap-4 sm:grid-cols-2">{input("liabilities", t("ديون ومسؤوليات مستحقة عليك", "Debts and obligations you owe"))}</div>
        </fieldset>
      </div>
      <aside className="h-fit rounded-[28px] bg-teal-deep p-7 text-white lg:sticky lg:top-32" aria-live="polite">
        <dl className="space-y-3 text-[15px]">
          <div className="flex justify-between"><dt className="text-white/70">{t("إجمالي الأموال", "Total assets")}</dt><dd dir="ltr">{num(lang, assets)}</dd></div>
          <div className="flex justify-between"><dt className="text-white/70">{t("الالتزامات", "Liabilities")}</dt><dd dir="ltr">− {num(lang, liabilities)}</dd></div>
          <div className="flex justify-between border-t border-white/15 pt-3"><dt className="text-white/70">{t("الوعاء الزكوي", "Zakatable amount")}</dt><dd dir="ltr">{num(lang, base)}</dd></div>
        </dl>
        <p className="mt-6 text-sm text-white/70">{t("القيمة النهائية للزكاة (2.5%)", "Zakat due (2.5%)")}</p>
        <p className="font-display text-5xl font-bold text-sun"><span dir="ltr">{num(lang, zakat)}</span> <span className="text-lg font-medium">{t("جنيه", "EGP")}</span></p>
        <Link href={link(lang, `/donate?amount=${zakat}&dest=${zakatDest}`)} aria-disabled={!zakat} className={`btn-sun mt-6 w-full ${zakat ? "" : "pointer-events-none opacity-50"}`}>
          {t("أخرج زكاتك لمرسال", "Pay your Zakat to Mersal")}
        </Link>
      </aside>
    </div>
  );
}
