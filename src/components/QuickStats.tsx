import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import { BARANGAY } from "../lib/data";

const statsKeys = [
  { labelKey: "statsPopulation" as const, value: "3,420+" },
  { labelKey: "statsLandArea" as const, value: BARANGAY.landArea },
  { labelKey: "statsPuroks" as const, value: BARANGAY.puroks.toString() },
  { labelKey: "statsEstablished" as const, value: BARANGAY.established.toString() },
];

export default function QuickStats() {
  const { lang } = useLang();

  return (
    <section className="relative -mt-12 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden shadow-lg shadow-neutral-200/50">
          {statsKeys.map((s) => (
            <div key={s.labelKey} className="bg-white px-6 py-6 sm:py-8 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold text-primary">
                {s.value}
              </div>
              <div className="mt-1 text-sm font-medium text-neutral-500">
                {t[s.labelKey][lang]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
