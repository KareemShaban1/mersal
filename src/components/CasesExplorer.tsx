"use client";

import Link from "next/link";
import { useState } from "react";
import { HeartPulse } from "lucide-react";
import { link, tr, type Locale } from "@/lib/i18n";

export type CaseItem = { id: number; title: string; summary: string; age: "infant" | "child" | "youth" | "senior"; funded: boolean };

export default function CasesExplorer({ lang, cases }: { lang: Locale; cases: CaseItem[] }) {
  const t = tr(lang);
  const ages = [
    ["all", t("الكل", "All")], ["infant", t("رضع 0-2", "Infants 0–2")], ["child", t("أطفال 2-18", "Children 2–18")],
    ["youth", t("شباب 18-40", "Adults 18–40")], ["senior", t("أكبر من 40", "Over 40")],
  ] as const;
  const states = [["all", t("كل الحالات", "Any status")], ["open", t("لم يتم تأمينها", "Not yet funded")], ["funded", t("تم تأمينها", "Funded")]] as const;
  const [age, setAge] = useState<string>("all");
  const [state, setState] = useState<string>("all");
  const list = cases.filter((c) => (age === "all" || c.age === age) && (state === "all" || (state === "funded") === c.funded));
  const chip = (active: boolean) => `rounded-full border px-4 py-2 font-display text-sm font-medium transition ${active ? "border-teal bg-teal text-white" : "border-ink/12 bg-white text-ink-soft hover:border-teal hover:text-teal"}`;
  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="group" aria-label={t("الفئة العمرية", "Age group")} className="flex flex-wrap gap-2">
          {ages.map(([id, l]) => <button key={id} type="button" aria-pressed={age === id} onClick={() => setAge(id)} className={chip(age === id)}>{l}</button>)}
        </div>
        <div role="group" aria-label={t("حالة التمويل", "Funding status")} className="flex flex-wrap gap-2">
          {states.map(([id, l]) => <button key={id} type="button" aria-pressed={state === id} onClick={() => setState(id)} className={chip(state === id)}>{l}</button>)}
        </div>
      </div>
      {list.length ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((c) => (
            <li key={c.id} className="card p-6">
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${c.funded ? "bg-teal-mist text-teal" : "bg-sun-mist text-sun-deep"}`}>{c.funded ? t("تم تأمينها", "Funded") : t("تحتاج دعمك", "Needs support")}</span>
              <h3 className="mt-3 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-[15px] leading-7 text-ink-soft">{c.summary}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-[32px] border border-dashed border-ink/15 bg-white px-6 py-16 text-center" role="status">
          <HeartPulse className="mx-auto mb-4 text-teal" size={40} aria-hidden />
          <h2 className="text-xl font-semibold">{t("لا توجد حالات منشورة بهذه المواصفات الآن", "No published cases match this filter right now")}</h2>
          <p className="mx-auto mt-2 max-w-md text-ink-soft">{t("حفاظًا على خصوصية المرضى، تُنشر الحالات الحرجة عند الحاجة فقط. يمكنك دعم كل الحالات عبر التبرع العام أو إحدى الحملات.", "To protect patients’ privacy, critical cases are published only when needed. You can support all cases through a general donation or one of our campaigns.")}</p>
          <Link href={link(lang, "/donate")} className="btn-sun mt-6">{t("تبرع عام", "General donation")}</Link>
        </div>
      )}
    </div>
  );
}
