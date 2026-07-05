import { Link } from "@tanstack/react-router";
import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { announcements } from "../lib/data";
import ScrollReveal from "./ScrollReveal";

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

export default function Announcements() {
  const { lang } = useLang();

  return (
    <section id="announcements" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {t.announcementsLabel[lang]}
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
              {t.announcementsTitle[lang]}
            </h2>
          </div>
          <Link
            to="/announcements"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            {t.announcementsViewAll[lang]}
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {announcements.slice(0, 4).map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 100}>
              <Link
                to="/announcements"
                className="group block bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg hover:border-primary/20 transition-all"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      categoryColors[item.category] ?? "bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-xs text-neutral-400">{item.date}</span>
                </div>
                <h3 className="font-semibold text-neutral-900 leading-snug mb-2 group-hover:text-primary transition-colors">
                  {lang === "en" ? item.titleEn : item.titleFil}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                  {lang === "en" ? item.excerptEn : item.excerptFil}
                </p>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-8 text-center sm:hidden">
          <Link
            to="/announcements"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
          >
            {t.announcementsViewAll[lang]}
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
