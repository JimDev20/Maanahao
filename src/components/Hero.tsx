import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { BARANGAY } from "../lib/data";
import { getSiteSection, type SiteContent } from "../api/siteContent";
import HeroParticles from "./HeroParticles";

export default function Hero() {
  const { lang } = useLang();
  const [content, setContent] = useState<SiteContent | null>(null);

  useEffect(() => {
    getSiteSection("hero").then(setContent).catch(() => {});
  }, []);

  const title = content?.title || BARANGAY.name;
  const tagline = content?.subtitle || t.heroTagline[lang];
  const subtitle = content?.body || t.heroSubtitle[lang];
  const officeHours = (content?.meta as Record<string, string>)?.officeHours || t.heroOfficeHours[lang];
  const ctaText = content?.button_text || t.heroRequestDoc[lang];
  const ctaLink = content?.button_link || "/services";
  const cta2Text = (content?.meta as Record<string, string>)?.ctaSecondary || t.heroViewAnnouncements[lang];
  const cta2Link = (content?.meta as Record<string, string>)?.ctaSecondaryLink || "/announcements";
  const bgImage = content?.image_url;

  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center bg-gradient-to-br from-primary via-primary-dark to-[#001a5e] overflow-hidden"
    >
      {bgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary-dark/70 to-[#001a5e]/90" />

      <HeroParticles />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(252,209,22,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(206,17,38,0.06),transparent_50%)]" />

      <div className="absolute top-20 right-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-24 lg:py-40">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm mb-6 animate-fade-in-up">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            {officeHours}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-4 animate-fade-in-up">
            {title}
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-accent mb-2 animate-fade-in-up">
            {tagline}
          </p>

          <p className="text-base sm:text-lg text-white/80 max-w-xl mb-8 animate-fade-in-up">
            {subtitle}
          </p>

          <div className="flex flex-wrap gap-3 animate-fade-in-up">
            <Link
              to={ctaLink}
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-neutral-900 shadow-lg shadow-accent/25 hover:bg-yellow-300 hover:shadow-xl hover:shadow-accent/40 transition-all active:scale-[0.97]"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {ctaText}
            </Link>
            <Link
              to={cta2Link}
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm border border-white/20 hover:bg-white/25 hover:shadow-lg transition-all active:scale-[0.97]"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              {cta2Text}
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-neutral-50 via-neutral-50/80 to-transparent" />
    </section>
  );
}
