import { BARANGAY } from "../lib/data";

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Makipag-ugnayan
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
            May Katanungan o Mungkahi?
          </h2>
          <p className="mt-2 text-neutral-500">
            Mag-iwan ng mensahe at babalikan ka namin sa lalong madaling panahon.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1">
                Pangalan
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="Juan Dela Cruz"
              />
            </div>
            <div>
              <label htmlFor="contact-info" className="block text-sm font-medium text-neutral-700 mb-1">
                Email o Telepono
              </label>
              <input
                id="contact-info"
                type="text"
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
                placeholder="juan@email.com / 0917-123-4567"
              />
            </div>
            <div>
              <label htmlFor="concern" className="block text-sm font-medium text-neutral-700 mb-1">
                Paksa ng Mensahe
              </label>
              <select
                id="concern"
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white"
              >
                <option value="">Pumili ng paksa...</option>
                <option value="document">Request ng Dokumento</option>
                <option value="report">Mag-report ng Insidente</option>
                <option value="feedback">Mungkahi o Feedback</option>
                <option value="other">Iba pa</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1">
                Mensahe
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
                placeholder="Isulat ang inyong mensahe..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all active:scale-[0.97]"
            >
              Ipasa ang Mensahe
            </button>
          </form>

          <div className="flex flex-col justify-center space-y-6">
            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-primary-light flex items-center justify-center shrink-0">
                <svg className="size-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Bisitahin Kami</h3>
                <p className="text-sm text-neutral-500">{BARANGAY.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-accent-light flex items-center justify-center shrink-0">
                <svg className="size-6 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Tawagan Kami</h3>
                <p className="text-sm text-neutral-500">{BARANGAY.phone}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="size-12 rounded-xl bg-secondary-light flex items-center justify-center shrink-0">
                <svg className="size-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Facebook Page</h3>
                <a
                  href={BARANGAY.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  @BarangaySanJuan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
