import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, org, tr } from "@/lib/i18n";
import { PageHero } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/request-help">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "تسجيل حالة جديدة" : "Register a new case" };
}
import { Field, FormShell, Select, TextArea } from "@/components/forms";
import { bySection } from "@/lib/content";

export default async function RequestHelp({ params }: PageProps<"/[lang]/request-help">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  const legend = "mb-4 font-display text-lg font-semibold text-ink";
  return (
    <>
      <PageHero lang={lang} title={t("تسجيل حالة جديدة", "Register a new case")} lead={t("إذا كنت مريضًا أو تعرف مريضًا يحتاج مساعدة طبية، سجّل بياناته وسيتواصل فريق مرسال بعد دراسة الحالة. للحالات العاجلة اتصل فورًا بالخط الساخن.", "If you are a patient, or know one who needs medical help, register the details and the Mersal team will get in touch after reviewing the case. For urgent cases, call the hotline right away.")} crumbs={[{ label: t("تسجيل حالة جديدة", "Register a case") }]}>
        <a href={`tel:${org.hotline}`} className="btn-sun">{t("حالة عاجلة؟ اتصل", "Urgent? Call")} <span dir="ltr">{org.hotline}</span></a>
      </PageHero>
      <div className="container-x mt-12 max-w-3xl">
        <FormShell lang={lang} submit={t("إرسال الطلب", "Submit request")} endpoint="Case/Create" className="card space-y-10 p-6 sm:p-9">
          <fieldset>
            <legend className={legend}>{t("بيانات الحالة", "Patient details")}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field half label={t("اسم الحالة", "Patient name")} name="CaseName" required />
              <Field half label={t("السن", "Age")} name="Age" type="number" required dir="ltr" />
              <Select half label={t("النوع", "Gender")} name="Gender" required options={[t("ذكر", "Male"), t("أنثى", "Female")]} />
              <Field half label={t("الجنسية", "Nationality")} name="Nationality" />
              <Field half label={t("موبايل", "Mobile")} name="Mobile" type="tel" required dir="ltr" />
              <Field half label={t("تليفون آخر", "Other phone")} name="Phone" type="tel" dir="ltr" />
            </div>
          </fieldset>
          <fieldset>
            <legend className={legend}>{t("الحالة الطبية", "Medical need")}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field half label={t("نوع المرض / التشخيص", "Condition / diagnosis")} name="DiseaseType" required />
              <Select half label={t("الخدمة المطلوبة", "Service needed")} name="ServiceType" required options={[...bySection("services").map((s) => s.title[lang]), t("أخرى", "Other")]} />
              <TextArea label={t("وصف الحالة", "Describe the case")} name="Description" required />
              <label className="block sm:col-span-2">
                <span className="label">{t("تقارير أو مستندات طبية (اختياري)", "Medical reports or documents (optional)")}</span>
                <input type="file" name="file" multiple className="field file:me-4 file:rounded-full file:border-0 file:bg-teal-mist file:px-4 file:py-1.5 file:font-display file:text-sm file:font-semibold file:text-teal" />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend className={legend}>{t("العنوان", "Address")}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field half label={t("المحافظة", "Governorate")} name="Governorate" required />
              <Field half label={t("الحي / المنطقة", "District / area")} name="Region" />
              <Field label={t("العنوان بالتفصيل", "Full address")} name="AddressLine1" />
            </div>
          </fieldset>
          <fieldset>
            <legend className={legend}>{t("بيانات المُبلِّغ (إن لم تكن المريض)", "Reporter details (if you are not the patient)")}</legend>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field half label={t("اسم المبلّغ", "Reporter name")} name="NameAnonymous" />
              <Field half label={t("تليفون المبلّغ", "Reporter phone")} name="PhoneNumberAnonymous" type="tel" dir="ltr" />
              <Field label={t("اسم الجهة (إن وجدت)", "Organisation (if any)")} name="OrganizationName" />
            </div>
          </fieldset>
        </FormShell>
      </div>
    </>
  );
}
