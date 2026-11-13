import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, org, tr } from "@/lib/i18n";
import { PageHero } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/contact">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "اتصل بنا" : "Contact us" };
}
import { Mail, MapPin, Phone } from "lucide-react";
import { Field, FormShell, TextArea } from "@/components/forms";
import { branches } from "@/lib/content";

export default async function Contact({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  return (
    <>
      <PageHero lang={lang} title={t("تواصل معنا", "Get in touch")} lead={t("فريق مرسال جاهز للرد على استفساراتك عن التبرع، تسجيل الحالات، أو التطوع.", "The Mersal team is ready to answer your questions about donating, registering cases or volunteering.")} crumbs={[{ label: t("اتصل بنا", "Contact us") }]} />
      <div className="container-x mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
        <section className="card h-fit p-6 sm:p-8">
          <h2 className="mb-5 text-2xl font-bold">{t("أرسل لنا رسالة", "Send us a message")}</h2>
          <FormShell lang={lang} submit={t("إرسال", "Send message")} endpoint="ContactUs">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field half label={t("الاسم", "Name")} name="Name" required autoComplete="name" />
              <Field half label={t("البريد الإلكتروني", "Email")} name="Email" type="email" required dir="ltr" autoComplete="email" />
              <TextArea label={t("الرسالة", "Message")} name="Message" required rows={5} />
            </div>
          </FormShell>
          <ul className="mt-8 space-y-3 border-t border-ink/10 pt-6 text-[15px]">
            <li className="flex gap-3"><Phone size={18} className="mt-1 text-teal" aria-hidden /><span dir="ltr"><a href={`tel:${org.hotline}`} className="font-semibold hover:text-teal">{org.hotline}</a> · <a href={`tel:${org.phone}`} className="hover:text-teal">{org.phone}</a></span></li>
            <li className="flex gap-3"><Mail size={18} className="mt-1 text-teal" aria-hidden /><a href={`mailto:${org.email}`} className="hover:text-teal">{org.email}</a></li>
          </ul>
        </section>
        <section>
          <h2 className="mb-5 text-2xl font-bold">{t("فروعنا", "Our branches")}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {branches.map((b) => (
              <li key={b.id} className="card flex flex-col p-5">
                <h3 className="font-semibold text-teal">{b.name[lang]}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-7 text-ink-soft">{b.address[lang] || b.address.ar}</p>
                {b.map && <a href={b.map} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1.5 font-display text-sm font-semibold text-teal hover:underline"><MapPin size={15} aria-hidden />{t("افتح على الخريطة", "Open in Maps")}</a>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
