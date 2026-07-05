import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { submitReport } from "../lib/server/actions";
import ScrollReveal from "../components/ScrollReveal";

export const Route = createFileRoute("/report")({
  component: ReportPage,
});

function ReportPage() {
  const { lang } = useLang();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);
    try {
      await submitReport({
        data: {
          name: data.get("name") as string,
          contact: data.get("contact") as string,
          type: data.get("type") as string,
          description: data.get("description") as string,
          location: data.get("location") as string,
          date: data.get("date") as string,
        },
      });
      setSubmitted(true);
    } catch (err) {
      console.error("Report submission failed", err);
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="pt-24 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <ScrollReveal>
            <div className="rounded-2xl bg-green-50 border border-green-200 p-8 sm:p-12">
              <div className="size-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
                <svg className="size-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-green-800 mb-3">
                {lang === "en" ? "Report Submitted!" : "Naipasa ang Ulat!"}
              </h1>
              <p className="text-green-600 mb-6">
                {t.reportSuccess[lang]}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => setSubmitted(false)}
                  className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark transition-all"
                >
                  {t.reportNew[lang]}
                </button>
                <Link
                  to="/"
                  className="rounded-xl border border-neutral-300 px-6 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-50 transition-all"
                >
                  {t.aboutBack[lang]}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 sm:pt-28 sm:pb-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
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

        <ScrollReveal className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900">
            {t.reportTitle[lang]}
          </h1>
          <p className="mt-2 text-neutral-500">
            {t.reportSubtitle[lang]}
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-5">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t.requestFullName[lang]}
              </label>
              <input
                name="name"
                type="text"
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="Juan M. Dela Cruz"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t.reportContact[lang]}
              </label>
              <input
                name="contact"
                type="text"
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="juan@email.com / 0917-123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t.reportType[lang]}
              </label>
              <select
                name="type"
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white"
              >
                <option value="">{t.reportTypePlaceholder[lang]}</option>
                <option value="emergency">{t.reportTypeEmergency[lang]}</option>
                <option value="complaint">{t.reportTypeComplaint[lang]}</option>
                <option value="suspicious">{t.reportTypeSuspicious[lang]}</option>
                <option value="accident">{t.reportTypeAccident[lang]}</option>
                <option value="other">{t.reportTypeOther[lang]}</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t.reportDescription[lang]}
              </label>
              <textarea
                name="description"
                rows={4}
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                placeholder={t.reportDescriptionPlaceholder[lang]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t.reportLocation[lang]}
              </label>
              <input
                name="location"
                type="text"
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder={t.reportLocationPlaceholder[lang]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-1">
                {t.reportDate[lang]}
              </label>
              <input
                name="date"
                type="date"
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all active:scale-[0.97] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  {lang === "en" ? "Submitting..." : "Ipinapasa..."}
                </>
              ) : (
                t.reportSubmit[lang]
              )}
            </button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  );
}
