"use client";

import { useState, type ReactNode } from "react";
import { Check, CheckCircle2, Copy } from "lucide-react";
import { IntegrationNote } from "@/components/ui";
import { tr, type Locale } from "@/lib/i18n";

/**
 * Form shell with native validation. Submission is NOT wired to a backend yet:
 * replace `onSubmit` with a call to Mersal's API (see README → Integration points).
 */
export function FormShell({ lang, children, submit, endpoint, className = "" }: {
  lang: Locale; children: ReactNode; submit: string; endpoint: string; className?: string;
}) {
  const t = tr(lang);
  const [done, setDone] = useState(false);
  return (
    <form
      className={className}
      data-endpoint={endpoint}
      onSubmit={(e) => { e.preventDefault(); setDone(true); }}
      onChange={() => done && setDone(false)}
    >
      {children}
      <button type="submit" className="btn-teal mt-6 w-full sm:w-auto">{submit}</button>
      {done && (
        <div className="mt-4" role="status">
          <IntegrationNote>
            {t(
              "البيانات سليمة، لكن هذا النموذج لم يُربط بعد بنظام مرسال في هذه النسخة، فلم يُرسَل شيء. للتواصل الآن اتصل بـ 19340.",
              "Your details are valid, but this form is not connected to Mersal’s system in this build yet, so nothing was sent. To reach us now, call 19340.",
            )}
          </IntegrationNote>
        </div>
      )}
    </form>
  );
}

export function Field({ label, name, type = "text", required, placeholder, dir, autoComplete, half }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; dir?: "ltr" | "rtl"; autoComplete?: string; half?: boolean;
}) {
  return (
    <label className={`block ${half ? "" : "sm:col-span-2"}`}>
      <span className="label">{label}{required && <span className="text-teal"> *</span>}</span>
      <input className="field" name={name} type={type} required={required} placeholder={placeholder} dir={dir} autoComplete={autoComplete} />
    </label>
  );
}

export function Select({ label, name, options, required, half }: { label: string; name: string; options: string[]; required?: boolean; half?: boolean }) {
  return (
    <label className={`block ${half ? "" : "sm:col-span-2"}`}>
      <span className="label">{label}{required && <span className="text-teal"> *</span>}</span>
      <select className="field" name={name} required={required} defaultValue="">
        <option value="" disabled>—</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}

export function TextArea({ label, name, required, rows = 4 }: { label: string; name: string; required?: boolean; rows?: number }) {
  return (
    <label className="block sm:col-span-2">
      <span className="label">{label}{required && <span className="text-teal"> *</span>}</span>
      <textarea className="field" name={name} rows={rows} required={required} />
    </label>
  );
}

export function CopyButton({ value, lang }: { value: string; lang: Locale }) {
  const t = tr(lang);
  const [ok, setOk] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => { try { await navigator.clipboard.writeText(value); setOk(true); setTimeout(() => setOk(false), 1800); } catch {} }}
      className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1 text-xs font-medium text-ink-soft transition hover:border-teal hover:text-teal"
      aria-label={`${t("نسخ", "Copy")} ${value}`}
    >
      {ok ? <Check size={13} aria-hidden /> : <Copy size={13} aria-hidden />}
      <span aria-live="polite">{ok ? t("تم النسخ", "Copied") : t("نسخ", "Copy")}</span>
    </button>
  );
}

export const Done = CheckCircle2;
