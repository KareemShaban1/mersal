"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDown, Globe, HeartHandshake, Menu, Phone, X } from "lucide-react";
import type { NavItem } from "@/lib/nav";
import { link, org, tr, type Locale } from "@/lib/i18n";

export default function Header({ lang, nav }: { lang: Locale; nav: NavItem[] }) {
  const t = tr(lang);
  const pathname = usePathname() ?? `/${lang}`;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const other: Locale = lang === "ar" ? "en" : "ar";
  const switchHref = pathname.replace(new RegExp(`^/${lang}(?=/|$)`), `/${other}`);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);

  const isActive = (i: NavItem) =>
    [i.href, ...(i.children?.map((c) => c.href) ?? [])].some((h) => h && pathname.startsWith(link(lang, h)));

  return (
    <header className="sticky top-0 z-50">
      {/* utility bar */}
      <div className="bg-teal-deep text-[13px] text-white/85">
        <div className="container-x flex h-10 items-center justify-between gap-4">
          <a href={`tel:${org.hotline}`} className="flex items-center gap-2 font-display font-medium hover:text-sun">
            <Phone size={14} aria-hidden />
            <span>{t("الخط الساخن", "Hotline")}</span>
            <span dir="ltr" className="font-semibold text-sun">{org.hotline}</span>
          </a>
          <nav aria-label={t("روابط سريعة", "Quick links")} className="flex items-center gap-4 sm:gap-5">
            <Link href={link(lang, "/request-help")} className="hidden hover:text-sun sm:inline">{t("تسجيل حالة جديدة", "Register a case")}</Link>
            <Link href={link(lang, "/login")} className="hidden hover:text-sun sm:inline">{t("تسجيل دخول", "Sign in")}</Link>
            <Link href={switchHref} hrefLang={other} lang={other} className="flex items-center gap-1.5 font-medium hover:text-sun">
              <Globe size={14} aria-hidden />{other === "en" ? "English" : "العربية"}
            </Link>
          </nav>
        </div>
      </div>

      {/* main bar */}
      <div className={`border-b transition-all duration-300 ${scrolled ? "border-ink/10 bg-cream/90 shadow-soft backdrop-blur-md" : "border-transparent bg-cream"}`}>
        <div className="container-x flex h-[72px] items-center justify-between gap-6">
          <Link href={link(lang)} className="shrink-0" aria-label={org.name[lang]}>
            <Image src="/media/logo.png" alt={org.name[lang]} width={96} height={56} priority className="h-12 w-auto" />
          </Link>

          <nav aria-label={t("القائمة الرئيسية", "Main menu")} className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => (
                <li key={item.label} className="group relative">
                  {item.children ? (
                    <>
                      <Link
                        href={link(lang, item.href ?? item.children[0].href)}
                        className={`flex items-center gap-1 rounded-full px-3.5 py-2 font-display text-[15px] font-medium transition hover:bg-teal-mist hover:text-teal ${isActive(item) ? "text-teal" : "text-ink"}`}
                      >
                        {item.label}
                        <ChevronDown size={15} className="opacity-50 transition group-hover:rotate-180" aria-hidden />
                      </Link>
                      <div className="invisible absolute start-0 top-full z-10 w-72 translate-y-1 pt-2 opacity-0 transition duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                        <ul className="card overflow-hidden p-2">
                          {item.children.map((c) => (
                            <li key={c.href}>
                              <Link href={link(lang, c.href)} className="block rounded-2xl px-4 py-2.5 text-[15px] text-ink-soft transition hover:bg-teal-mist hover:text-teal">
                                {c.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    <Link href={link(lang, item.href!)} className={`rounded-full px-3.5 py-2 font-display text-[15px] font-medium transition hover:bg-teal-mist hover:text-teal ${isActive(item) ? "text-teal" : "text-ink"}`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href={link(lang, "/donate")} className="btn-sun !px-5 !py-2.5">
              <HeartHandshake size={18} aria-hidden />{t("تبرع الآن", "Donate")}
            </Link>
            <button type="button" onClick={() => setOpen(true)} aria-label={t("فتح القائمة", "Open menu")} aria-expanded={open} className="grid size-11 place-items-center rounded-full border border-ink/10 bg-white xl:hidden">
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[60] xl:hidden" role="dialog" aria-modal="true" aria-label={t("القائمة", "Menu")}>
          <button className="absolute inset-0 bg-teal-deep/50 backdrop-blur-sm" onClick={() => setOpen(false)} aria-label={t("إغلاق", "Close")} />
          <div className="absolute inset-y-0 end-0 flex w-[min(88vw,380px)] flex-col overflow-y-auto bg-cream p-5 shadow-lift">
            <div className="mb-4 flex items-center justify-between">
              <Image src="/media/logo.png" alt="" width={80} height={46} className="h-10 w-auto" />
              <button type="button" onClick={() => setOpen(false)} aria-label={t("إغلاق القائمة", "Close menu")} className="grid size-11 place-items-center rounded-full border border-ink/10 bg-white">
                <X size={20} />
              </button>
            </div>
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.label}>
                  {item.children ? (
                    <details className="group rounded-2xl open:bg-white">
                      <summary className="flex cursor-pointer list-none items-center justify-between rounded-2xl px-4 py-3 font-display font-medium [&::-webkit-details-marker]:hidden">
                        {item.label}
                        <ChevronDown size={18} className="opacity-50 transition group-open:rotate-180" aria-hidden />
                      </summary>
                      <ul className="pb-2">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link href={link(lang, c.href)} onClick={() => setOpen(false)} className="block px-6 py-2 text-[15px] text-ink-soft hover:text-teal">{c.label}</Link>
                          </li>
                        ))}
                      </ul>
                    </details>
                  ) : (
                    <Link href={link(lang, item.href!)} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-display font-medium">{item.label}</Link>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-auto space-y-2 pt-6">
              <Link href={link(lang, "/request-help")} onClick={() => setOpen(false)} className="btn-ghost w-full">{t("تسجيل حالة جديدة", "Register a case")}</Link>
              <Link href={link(lang, "/login")} onClick={() => setOpen(false)} className="btn-ghost w-full">{t("تسجيل دخول", "Sign in")}</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
