import { Link } from "@tanstack/react-router";
import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { BARANGAY } from "../lib/data";

export default function Footer() {
  const { lang } = useLang();

  return (
    <footer className="bg-neutral-900 text-neutral-300 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl py-12 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="size-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold text-xs leading-none">
                <span className="text-center">
                  BRGY
                  <br />
                  MN
                </span>
              </div>
              <div className="leading-tight">
                <span className="block font-bold text-sm text-white">{BARANGAY.name}</span>
                <span className="block text-xs text-neutral-400">{BARANGAY.municipality}</span>
              </div>
            </div>
            <p className="text-sm text-neutral-400 leading-relaxed">
              {t.footerTagline[lang]}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-white mb-3">{t.footerQuickLinks[lang]}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  {t.navHome[lang]}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  {t.navAbout[lang]}
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  {t.navServices[lang]}
                </Link>
              </li>
              <li>
                <Link to="/announcements" className="text-sm text-neutral-400 hover:text-white transition-colors">
                  {t.navAnnouncements[lang]}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-white mb-3">{t.footerOffice[lang]}</h3>
            <ul className="space-y-2 text-sm text-neutral-400">
              <li>{BARANGAY.address}</li>
              <li>{BARANGAY.phone}</li>
              <li>{BARANGAY.email}</li>
              <li>{BARANGAY.officeHours}</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-sm text-white mb-3">{t.footerFollow[lang]}</h3>
            <a
              href={BARANGAY.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2.5 text-sm font-medium text-white hover:bg-white/20 transition-colors"
            >
              <svg className="size-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook Page
            </a>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; 2026 {BARANGAY.name}. All rights reserved.</p>
          <p className="hover:text-white transition-colors underline underline-offset-2">
            {t.footerDataPrivacy[lang]}
          </p>
        </div>
      </div>
    </footer>
  );
}
