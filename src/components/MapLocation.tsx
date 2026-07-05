import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { BARANGAY } from "../lib/data";
import ScrollReveal from "./ScrollReveal";

export default function MapLocation() {
  const { lang } = useLang();

  return (
    <section id="location" className="py-16 sm:py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <ScrollReveal>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              {t.locationLabel[lang]}
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
              {t.locationTitle[lang]}
            </h2>
            <p className="mt-2 text-neutral-500 leading-relaxed">{BARANGAY.address}</p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 size-5 rounded bg-primary-light flex items-center justify-center shrink-0">
                  <svg className="size-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-neutral-900">{t.locationOfficeHours[lang]}</span>
                  <p className="text-sm text-neutral-500">{BARANGAY.officeHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 size-5 rounded bg-primary-light flex items-center justify-center shrink-0">
                  <svg className="size-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-neutral-900">{t.locationPhone[lang]}</span>
                  <p className="text-sm text-neutral-500">{BARANGAY.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="mt-0.5 size-5 rounded bg-primary-light flex items-center justify-center shrink-0">
                  <svg className="size-3 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <span className="text-sm font-medium text-neutral-900">Email</span>
                  <p className="text-sm text-blue-600">{BARANGAY.email}</p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="rounded-xl overflow-hidden shadow-lg border border-neutral-200 aspect-[4/3]">
              <iframe
                src={BARANGAY.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 300 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Barangay Maanahao Location"
                className="w-full h-full"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
