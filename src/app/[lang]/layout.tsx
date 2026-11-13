import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { buildNav } from "@/lib/nav";
import { dirOf, isLocale, locales, org, tr } from "@/lib/i18n";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = tr(lang);
  return {
    metadataBase: new URL("https://www.mersal-ngo.org"),
    title: { default: org.name[lang], template: `%s | ${org.short[lang]}` },
    description: t(
      "مرسال مؤسسة خيرية غير هادفة للربح تعمل في مجال الصحة، تقدم الرعاية الطبية بجودة عالية لكل من يحتاجها بلا تمييز.",
      "Mersal is a non-profit health charity in Egypt providing high-quality medical care to everyone who needs it, without discrimination.",
    ),
    alternates: { languages: { ar: "/ar", en: "/en" } },
    openGraph: { type: "website", siteName: org.name[lang], locale: lang === "ar" ? "ar_EG" : "en_US", images: ["/media/family-sponsorship-1.jpg"] },
  };
}

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  return (
    <html lang={lang} dir={dirOf(lang)}>
      <body className="flex min-h-screen flex-col">
        <noscript><style>{`.reveal{opacity:1!important;transform:none!important}`}</style></noscript>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-sun focus:px-5 focus:py-2 focus:text-teal-deep">
          {t("تخطَّ إلى المحتوى", "Skip to content")}
        </a>
        <Suspense>
          <Header lang={lang} nav={buildNav(lang)} />
        </Suspense>
        <main id="main" className="flex-1">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
