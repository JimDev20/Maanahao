import { createFileRoute, Link } from "@tanstack/react-router";
import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { services } from "../lib/data";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
});

function ServicesPage() {
  const { lang } = useLang();

  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
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
            {t.servicesLabel[lang]}
          </span>
          <h1 className="mt-1 text-3xl sm:text-4xl font-bold text-neutral-900">
            {t.servicesTitle[lang]}
          </h1>
          <p className="mt-2 text-neutral-500 max-w-2xl">
            {t.servicesSubtitle[lang]}
          </p>
        </ScrollReveal>

        <div className="grid gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 80}>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 hover:shadow-lg hover:border-primary/20 transition-all">
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="text-4xl shrink-0 mt-1">{service.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h2 className="text-xl font-bold text-neutral-900 mb-2">
                      {lang === "en" ? service.titleEn : service.titleFil}
                    </h2>
                    <p className="text-neutral-600 mb-4">
                      {lang === "en" ? service.descEn : service.descFil}
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 mb-2 flex items-center gap-1.5">
                          <svg className="size-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {t.servicesRequirements[lang]}
                        </h3>
                        <ul className="space-y-1">
                          {(lang === "en" ? service.requirementsEn : service.requirementsFil).map((req, j) => (
                            <li key={j} className="text-sm text-neutral-500 flex items-start gap-2">
                              <span className="text-primary mt-0.5">•</span>
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-sm font-bold text-neutral-900 mb-2 flex items-center gap-1.5">
                          <svg className="size-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {t.servicesProcedure[lang]}
                        </h3>
                        <ol className="space-y-1">
                          {(lang === "en" ? service.procedureEn : service.procedureFil).map((step, j) => (
                            <li key={j} className="text-sm text-neutral-500 flex items-start gap-2">
                              <span className="size-5 rounded-full bg-primary-light text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {j + 1}
                              </span>
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-4 border-t border-neutral-100">
                      <div>
                        <span className="text-xs text-neutral-400">{t.servicesFee[lang]}:</span>
                        <span className="ml-1.5 text-sm font-semibold text-neutral-900">
                          {lang === "en" ? service.feeEn : service.feeFil}
                        </span>
                      </div>
                      <Link
                        to="/request"
                        className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-all active:scale-[0.97]"
                      >
                        {t.servicesRequest[lang]}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
