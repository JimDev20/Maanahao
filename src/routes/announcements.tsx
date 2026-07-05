import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { announcements } from "../lib/data";
import ScrollReveal from "../components/ScrollReveal";

const categoryColors: Record<string, string> = {
  Health: "bg-green-100 text-green-700",
  "Public Safety": "bg-blue-100 text-blue-700",
  Service: "bg-purple-100 text-purple-700",
  Ordinance: "bg-amber-100 text-amber-700",
  Kalusugan: "bg-green-100 text-green-700",
  Pampubliko: "bg-blue-100 text-blue-700",
  Serbisyo: "bg-purple-100 text-purple-700",
  Ordinansa: "bg-amber-100 text-amber-700",
};

export const Route = createFileRoute("/announcements")({
  component: AnnouncementsPage,
});

function AnnouncementsPage() {
  const { lang } = useLang();
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <ScrollReveal>
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors mb-6"
          >
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            {t.aboutBack[lang]}
          </Link>
        </ScrollReveal>

        <ScrollReveal className="mb-10">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.announcementsLabel[lang]}
          </span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-neutral-900">
            {t.announcementsTitle[lang]}
          </h1>
        </ScrollReveal>

        {selected !== null ? (
          <ScrollReveal>
            <button
              onClick={() => setSelected(null)}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors mb-6"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              {lang === "en" ? "Back to all announcements" : "Bumalik sa lahat ng anunsyo"}
            </button>

            <article className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-10">
              <div className="flex items-center gap-2 mb-4">
                <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[announcements[selected].category] ?? "bg-neutral-100 text-neutral-700"}`}>
                  {announcements[selected].category}
                </span>
                <span className="text-xs text-neutral-400">{announcements[selected].date}</span>
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 mb-4">
                {lang === "en" ? announcements[selected].titleEn : announcements[selected].titleFil}
              </h2>
              <div className="prose prose-neutral max-w-none">
                <p className="text-neutral-600 leading-relaxed whitespace-pre-line">
                  {lang === "en" ? announcements[selected].contentEn : announcements[selected].contentFil}
                </p>
              </div>
            </article>
          </ScrollReveal>
        ) : (
          <div className="grid gap-5">
            {announcements.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 80}>
                <button
                  onClick={() => setSelected(i)}
                  className="w-full text-left bg-white rounded-xl border border-neutral-200 p-5 sm:p-6 hover:shadow-lg hover:border-primary/20 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${categoryColors[item.category] ?? "bg-neutral-100 text-neutral-700"}`}>
                      {item.category}
                    </span>
                    <span className="text-xs text-neutral-400">{item.date}</span>
                  </div>
                  <h2 className="font-bold text-neutral-900 mb-2 group-hover:text-primary transition-colors">
                    {lang === "en" ? item.titleEn : item.titleFil}
                  </h2>
                  <p className="text-sm text-neutral-500 leading-relaxed line-clamp-2">
                    {lang === "en" ? item.excerptEn : item.excerptFil}
                  </p>
                </button>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
