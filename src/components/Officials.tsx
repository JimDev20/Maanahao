import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { officials } from "../lib/data";

export default function Officials() {
  const { lang } = useLang();

  return (
    <section id="officials" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.officialsLabel[lang]}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
            {t.officialsTitle[lang]}
          </h2>
          <p className="mt-2 text-neutral-500 max-w-lg mx-auto">
            {t.officialsSubtitle[lang]}
          </p>
        </div>

        <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {officials.map((official) => (
            <div key={official.name} className="text-center group">
              <div className="mx-auto size-24 sm:size-28 rounded-full bg-gradient-to-br from-primary-light to-neutral-200 flex items-center justify-center mb-3 shadow-sm group-hover:shadow-md transition-shadow">
                <span className="text-3xl sm:text-4xl font-bold text-primary/40">
                  {official.name.charAt(0)}
                </span>
              </div>
              <h3 className="font-semibold text-sm sm:text-base text-neutral-900 leading-tight">
                {official.name}
              </h3>
              <p className="text-xs sm:text-sm text-primary font-medium">
                {lang === "bcl" ? official.positionBcl : lang === "en" ? official.positionEn : official.positionFil}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
