import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { BARANGAY } from "../lib/data";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
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

        <ScrollReveal>
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {BARANGAY.name}
          </span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-neutral-900">
            {t.aboutTitle[lang]}
          </h1>
        </ScrollReveal>

        <div className="mt-10 grid gap-8 sm:gap-10">
          <ScrollReveal className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <span className="size-2 rounded-full bg-primary" />
              {t.aboutHistory[lang]}
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              {lang === "en" ? BARANGAY.historyEn : BARANGAY.history}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={100} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <span className="size-2 rounded-full bg-accent" />
              {t.aboutMission[lang]}
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              {lang === "en" ? BARANGAY.missionEn : BARANGAY.mission}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <span className="size-2 rounded-full bg-secondary" />
              {t.aboutVision[lang]}
            </h2>
            <p className="text-neutral-600 leading-relaxed">
              {lang === "en" ? BARANGAY.visionEn : BARANGAY.vision}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={300} className="mt-10 bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 sm:p-10 text-center text-white">
          <p className="text-lg sm:text-xl font-semibold mb-2">
            {BARANGAY.tagline}
          </p>
          <p className="text-white/80">
            {BARANGAY.address} | {BARANGAY.phone}
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}
