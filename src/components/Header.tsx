import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useLang } from "../lib/LanguageContext";
import { LANG_LABELS, t, type Lang } from "../lib/translations";
import { BARANGAY } from "../lib/data";

const langs: Lang[] = ["bcl", "en", "fil"];

export default function Header() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const links = [
    { key: "navHome" as const, href: "/" },
    { key: "navServices" as const, href: "/#services" },
    { key: "navAnnouncements" as const, href: "/#announcements" },
    { key: "navOfficials" as const, href: "/#officials" },
    { key: "navContact" as const, href: "/#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs leading-none">
            <span className="text-center">
              BRGY
              <br />
              MN
            </span>
          </div>
          <div className="leading-tight">
            <span className="block font-bold text-sm sm:text-base text-neutral-900">
              {BARANGAY.name}
            </span>
            <span className="block text-xs text-neutral-500">
              {BARANGAY.municipality}
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.key}
              to={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary transition-colors"
            >
              {t[link.key][lang]}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span className="hidden sm:inline">{LANG_LABELS[lang]}</span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1 bg-white rounded-xl shadow-lg border border-neutral-200 py-1 min-w-[140px]">
                {langs.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setLangOpen(false); }}
                    className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                      l === lang ? "bg-primary-light text-primary font-semibold" : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {LANG_LABELS[l]}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden size-10 flex items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {links.map((link) => (
              <Link
                key={link.key}
                to={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary transition-colors"
              >
                {t[link.key][lang]}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
