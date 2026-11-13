import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale, org, tr } from "@/lib/i18n";
import { PageHero, DonateBand } from "@/components/ui";

export async function generateMetadata({ params }: PageProps<"/[lang]/videos">): Promise<Metadata> {
  const { lang } = await params;
  return { title: lang === "ar" ? "فيديوهات" : "Videos" };
}

export default async function Videos({ params }: PageProps<"/[lang]/videos">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = tr(lang);
  const channel = org.social.find((s) => s.name === "YouTube")!.url;
  return (
    <>
      <PageHero lang={lang} title={t("فيديوهات", "Videos")} lead={t("شاهد قصص مرسال وحملاتها من قناتنا على يوتيوب.", "Watch Mersal’s stories and campaigns from our YouTube channel.")} crumbs={[{ label: t("فيديوهات", "Videos") }]}>
        <a href={channel} target="_blank" rel="noopener noreferrer" className="btn-ghost">{t("قناة مرسال على يوتيوب", "Mersal on YouTube")}</a>
      </PageHero>
      <div className="container-x mt-14 max-w-4xl">
        <div className="aspect-video overflow-hidden rounded-[32px] bg-teal-deep shadow-lift">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/videoseries?list=${org.youtubePlaylist}`}
            title={t("قائمة فيديوهات مرسال", "Mersal video playlist")}
            loading="lazy" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen className="size-full border-0"
          />
        </div>
      </div>
      <DonateBand lang={lang} />
    </>
  );
}
