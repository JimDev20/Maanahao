import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { gallery } from "../lib/data";
import ScrollReveal from "./ScrollReveal";

export default function Gallery() {
  const { lang } = useLang();

  return (
    <section id="gallery" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.galleryLabel[lang]}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
            {t.galleryTitle[lang]}
          </h2>
          <p className="mt-2 text-neutral-500 max-w-lg mx-auto">
            {t.gallerySubtitle[lang]}
          </p>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((item, i) => (
            <ScrollReveal key={item.id} delay={i * 100}>
              <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                <div className={`aspect-[4/3] bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                  <span className="text-6xl sm:text-7xl opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-500">
                    {item.icon}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-bold text-white">
                    {lang === "en" ? item.titleEn : item.titleFil}
                  </h3>
                  <p className="text-sm text-white/80 line-clamp-1">
                    {lang === "en" ? item.descriptionEn : item.descriptionFil}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
