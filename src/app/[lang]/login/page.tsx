import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, link, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: PageProps<"/[lang]/login">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "تسجيل دخول" : "Sign in" };
}
import Link from "next/link";
import { Field, FormShell } from "@/components/forms";

export default async function Login({ params }: PageProps<"/[lang]/login">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  return (
    <div className="container-x grid min-h-[70vh] place-items-center py-16">
      <div className="card w-full max-w-md p-7 sm:p-9">
        <h1 className="text-3xl font-bold">{t("تسجيل دخول", "Sign in")}</h1>
        <p className="mb-6 mt-2 text-ink-soft">{t("تابع تبرعاتك وإيصالاتك من حسابك.", "Follow your donations and receipts from your account.")}</p>
        <FormShell lang={lang} submit={t("دخول", "Sign in")} endpoint="Account/Login">
          <div className="grid gap-4">
            <Field label={t("اسم المستخدم", "Username")} name="UserName" required autoComplete="username" />
            <Field label={t("كلمة المرور", "Password")} name="Password" type="password" required autoComplete="current-password" />
          </div>
        </FormShell>
        <p className="mt-6 text-[15px] text-ink-soft">{t("ليس لديك حساب؟", "No account yet?")} <Link href={link(lang, "/register")} className="font-display font-semibold text-teal">{t("حساب جديد", "Create one")}</Link></p>
      </div>
    </div>
  );
}
