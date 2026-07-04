import { BARANGAY } from "../lib/data";

const stats = [
  { label: "Populasyon", value: "12,450+" },
  { label: "Land Area", value: BARANGAY.landArea },
  { label: "Puroks", value: BARANGAY.puroks.toString() },
  { label: "Taon Itinatag", value: BARANGAY.established.toString() },
];

export default function QuickStats() {
  return (
    <section className="relative -mt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden shadow-lg shadow-neutral-200/50">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white px-6 py-6 sm:py-8 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-neutral-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
