import { BARANGAY } from "../lib/data";

export default function MapLocation() {
  return (
    <section id="location" className="py-16 sm:py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Lokasyon
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
              Hanapin ang Barangay Hall
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
                  <span className="text-sm font-medium text-neutral-900">Office Hours</span>
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
                  <span className="text-sm font-medium text-neutral-900">Telepono</span>
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
          </div>

          <div className="rounded-xl overflow-hidden shadow-lg border border-neutral-200 aspect-[4/3] bg-neutral-100 flex items-center justify-center">
            <div className="text-center p-6">
              <svg className="size-12 mx-auto text-neutral-300 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeWidth={1.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-sm text-neutral-400">Interactive map will be embedded here</p>
              <p className="text-xs text-neutral-300 mt-1">(Replace with Google Maps embed)</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
