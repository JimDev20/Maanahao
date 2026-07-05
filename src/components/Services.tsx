import { Link } from "@tanstack/react-router";
import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { services } from "../lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Services() {
  const { lang } = useLang();

  return (
    <section id="services" className="py-16 sm:py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.servicesLabel[lang]}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
            {t.servicesTitle[lang]}
          </h2>
          <p className="mt-2 text-neutral-500 max-w-lg mx-auto">
            {t.servicesSubtitle[lang]}
          </p>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 80}>
              <Link
                to="/services"
                className="group block rounded-xl border border-neutral-200 p-5 hover:border-primary/20 hover:shadow-lg hover:bg-primary-light/30 transition-all"
              >
                <span className="text-3xl block mb-3">{service.icon}</span>
                <h3 className="font-semibold text-neutral-900 mb-1">
                  {lang === "en" ? service.titleEn : service.titleFil}
                </h3>
                <p className="text-sm text-neutral-500 leading-relaxed mb-3">
                  {lang === "en" ? service.descEn : service.descFil}
                </p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  {t.servicesLearnHow[lang]}
                  <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all active:scale-[0.97]"
          >
            {lang === "en" ? "View All Services" : "Tingnan Lahat ng Serbisyo"}
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
