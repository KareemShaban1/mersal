import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { bySection } from "@/lib/content";
import { link, org, tr, type Locale } from "@/lib/i18n";

export default function Footer({ lang }: { lang: Locale }) {
  const t = tr(lang);
  const cols = [
    {
      title: t("المؤسسة", "Foundation"),
      links: [
        [t("عن مرسال", "About Mersal"), "/about"], [t("فروع مرسال", "Branches"), "/branches"], [t("الأسئلة الشائعة", "FAQ"), "/faq"],
        [t("ألبومات", "Albums"), "/albums"], [t("فيديوهات", "Videos"), "/videos"], [t("اتصل بنا", "Contact us"), "/contact"],
      ],
    },
    { title: t("المشاريع", "Projects"), links: bySection("projects").slice(0, 6).map((p) => [p.title[lang], `/projects/${p.slug}`]) },
    {
      title: t("شارك معنا", "Get involved"),
      links: [
        [t("تبرع الآن", "Donate now"), "/donate"], [t("طرق التبرع", "Ways to give"), "/ways-to-give"], [t("حاسبة الزكاة", "Zakat calculator"), "/zakat"],
        [t("تطوع مع مرسال", "Volunteer"), "/volunteer"], [t("حالات حرجة", "Critical cases"), "/cases"], [t("كارت عافية", "Afia card"), "/afia-card"],
      ],
    },
  ];
  return (
    <footer className="relative mt-24 bg-teal-deep text-white/75">
      <svg aria-hidden viewBox="0 0 1440 60" preserveAspectRatio="none" className="absolute -top-[59px] block h-[60px] w-full text-teal-deep"><path fill="currentColor" d="M0 60V32C240 4 480 0 720 18s480 30 720 6v36z" /></svg>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <span className="inline-block rounded-2xl bg-white p-2.5"><Image src="/media/logo.png" alt={org.name[lang]} width={110} height={64} className="h-14 w-auto" /></span>
          <p className="mt-5 max-w-sm leading-8">{t("مؤسسة خيرية غير هادفة للربح تعمل في مجال الصحة، تفتح بابها لكل مريض بلا تمييز.", "A non-profit health charity that opens its door to every patient, without discrimination.")}</p>
          <ul className="mt-6 space-y-3 text-[15px]">
            <li className="flex gap-3"><MapPin size={18} className="mt-1 shrink-0 text-sun" aria-hidden />{org.address[lang]}</li>
            <li className="flex gap-3"><Phone size={18} className="mt-1 shrink-0 text-sun" aria-hidden /><span dir="ltr"><a className="hover:text-white" href={`tel:${org.hotline}`}>{org.hotline}</a> · <a className="hover:text-white" href={`tel:${org.phone}`}>{org.phone}</a></span></li>
            <li className="flex gap-3"><Mail size={18} className="mt-1 shrink-0 text-sun" aria-hidden /><a className="hover:text-white" href={`mailto:${org.email}`}>{org.email}</a></li>
          </ul>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="mb-4 font-display text-base font-semibold text-white">{c.title}</h2>
              <ul className="space-y-2.5 text-[15px]">
                {c.links.map(([label, href]) => (
                  <li key={href}><Link href={link(lang, href)} className="transition hover:text-sun">{label}</Link></li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-sm sm:flex-row">
          <p>© {org.name[lang]}</p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {org.social.map((s) => (
              <li key={s.name}><a href={s.url} target="_blank" rel="noopener noreferrer" className="transition hover:text-sun">{s.name}</a></li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
