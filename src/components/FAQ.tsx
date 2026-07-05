import { useState } from "react";
import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import ScrollReveal from "./ScrollReveal";

const faqKeys: Array<{ q: keyof typeof t; a: keyof typeof t }> = [
  { q: "faqQ1", a: "faqA1" },
  { q: "faqQ2", a: "faqA2" },
  { q: "faqQ3", a: "faqA3" },
  { q: "faqQ4", a: "faqA4" },
  { q: "faqQ5", a: "faqA5" },
  { q: "faqQ6", a: "faqA6" },
];

export default function FAQ() {
  const { lang } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-16 sm:py-20 bg-neutral-50 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <ScrollReveal className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.faqLabel[lang]}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
            {t.faqTitle[lang]}
          </h2>
          <p className="mt-2 text-neutral-500">
            {t.faqSubtitle[lang]}
          </p>
        </ScrollReveal>

        <div className="space-y-3">
          {faqKeys.map((item, i) => {
            const isOpen = open === i;
            return (
              <ScrollReveal key={i} delay={i * 80}>
                <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden transition-all">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <span className="font-medium text-neutral-900 pr-4">
                      {t[item.q][lang]}
                    </span>
                    <svg
                      className={`size-5 shrink-0 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-4 animate-fade-in">
                      <p className="text-sm text-neutral-500 leading-relaxed">
                        {t[item.a][lang]}
                      </p>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
