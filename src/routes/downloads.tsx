import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import ScrollReveal from "../components/ScrollReveal";

const files = [
  { key: "downloadBarangayClearance" as const, icon: "📋" },
  { key: "downloadIndigency" as const, icon: "🪪" },
  { key: "downloadBusinessPermit" as const, icon: "🏪" },
  { key: "downloadBlotter" as const, icon: "📝" },
  { key: "downloadCedula" as const, icon: "📄" },
  { key: "downloadHealth" as const, icon: "🏥" },
];

export const Route = createFileRoute("/downloads")({
  component: DownloadsPage,
});

function DownloadsPage() {
  const { lang } = useLang();

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
            {t.downloadsLabel[lang]}
          </span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-neutral-900">
            {t.downloadsTitle[lang]}
          </h1>
          <p className="mt-2 text-neutral-500">
            {t.downloadsSubtitle[lang]}
          </p>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {files.map((f, i) => (
            <ScrollReveal key={f.key} delay={i * 80}>
              <div className="bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg hover:border-primary/20 transition-all">
                <div className="flex items-start gap-4">
                  <span className="text-3xl">{f.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-neutral-900 mb-3">
                      {t[f.key][lang]}
                    </h3>
                    <div className="flex gap-2">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-primary-light text-primary px-3 py-1.5 text-xs font-semibold">
                        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                        {t.downloadPdf[lang]}
                      </span>
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-neutral-100 text-neutral-600 px-3 py-1.5 text-xs font-semibold">
                        <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        {t.downloadDoc[lang]}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-8 rounded-xl bg-amber-50 border border-amber-200 p-5 text-sm text-amber-800 flex items-start gap-3">
          <svg className="size-5 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{t.downloadNote[lang]}</span>
        </ScrollReveal>
      </div>
    </div>
  );
}
