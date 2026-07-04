import { Link } from "@tanstack/react-router";
import { BARANGAY } from "../lib/data";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-primary to-primary-dark overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

      <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white/90 backdrop-blur-sm mb-6">
            <span className="size-2 rounded-full bg-accent animate-pulse" />
            Lunes–Biyernes, 8:00 AM – 5:00 PM
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-4">
            {BARANGAY.name}
          </h1>

          <p className="text-xl sm:text-2xl font-semibold text-accent mb-2">
            {BARANGAY.tagline}
          </p>

          <p className="text-base sm:text-lg text-white/80 max-w-xl mb-8">
            {BARANGAY.municipality} — Naglilingkod nang tapat at may malasakit
            sa bawat pamilya ng ating komunidad.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href="#services"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-sm font-bold text-neutral-900 shadow-lg shadow-accent/25 hover:bg-yellow-300 transition-all active:scale-[0.97]"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Request Document
            </a>
            <a
              href="#emergency"
              className="inline-flex items-center gap-2 rounded-xl bg-white/15 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm border border-white/20 hover:bg-white/25 transition-all active:scale-[0.97]"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Report a Concern
            </a>
            <a
              href="#announcements"
              className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm border border-white/15 hover:bg-white/20 transition-all active:scale-[0.97]"
            >
              <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
              View Announcements
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-neutral-50 to-transparent" />
    </section>
  );
}
