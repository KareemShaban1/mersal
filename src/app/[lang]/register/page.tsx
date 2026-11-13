import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, link, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/register">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "حساب جديد" : "Create account" };
}
import Link from "next/link";
import { Field, FormShell } from "@/components/forms";

export default async function Register({ params }: PageProps<"/[lang]/register">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  return (
    <div className="container-x grid place-items-center py-16">
      <div className="card w-full max-w-2xl p-7 sm:p-9">
        <h1 className="text-3xl font-bold">{t("حساب جديد", "Create an account")}</h1>
        <p className="mb-6 mt-2 text-ink-soft">{t("سجّل لمتابعة تبرعاتك بسهولة.", "Register to follow your donations easily.")}</p>
        <FormShell lang={lang} submit={t("إنشاء الحساب", "Create account")} endpoint="Account/Register">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field half label={t("الاسم الأول", "First name")} name="FirstName" required autoComplete="given-name" />
            <Field half label={t("الاسم الأخير", "Last name")} name="LastName" required autoComplete="family-name" />
            <Field half label={t("البريد الإلكتروني", "Email")} name="Email" type="email" required dir="ltr" autoComplete="email" />
            <Field half label={t("التليفون", "Phone")} name="Phone" type="tel" required dir="ltr" autoComplete="tel" />
            <Field half label={t("كلمة المرور", "Password")} name="Password" type="password" required autoComplete="new-password" />
            <Field half label={t("تأكيد كلمة المرور", "Confirm password")} name="ConfirmPassword" type="password" required autoComplete="new-password" />
            <Field half label={t("المحافظة", "Governorate")} name="Governorate" />
            <Field half label={t("الحي / المنطقة", "District")} name="District" />
            <Field label={t("العنوان", "Address")} name="AddressLine1" autoComplete="street-address" />
          </div>
        </FormShell>
        <p className="mt-6 text-[15px] text-ink-soft">{t("لديك حساب بالفعل؟", "Already have an account?")} <Link href={link(lang, "/login")} className="font-display font-semibold text-teal">{t("تسجيل دخول", "Sign in")}</Link></p>
      </div>
    </div>
  );
}
