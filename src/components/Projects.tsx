import { useLang } from "../lib/LanguageContext";
import { t } from "../lib/translations";
import ScrollReveal from "./ScrollReveal";

const projects = [
  {
    icon: "🛣️",
    color: "from-blue-500 to-blue-600",
    titleEn: "Farm-to-Market Road Concreting",
    titleFil: "Konkretisyon ng Farm-to-Market Road",
    descEn: "Concreting of 1.2 km farm-to-market road connecting Purok 3 to the national highway.",
    descFil: "Konkretisyon ng 1.2 km farm-to-market road na nagdudugtong sa Purok 3 hanggang national highway.",
    statusEn: "Ongoing",
    statusFil: "Kasalukuyan",
    statusColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: "💡",
    color: "from-amber-500 to-amber-600",
    titleEn: "Solar Street Lights Installation",
    titleFil: "Pag-install ng Solar Street Lights",
    descEn: "Installation of 25 solar-powered street lights across all 7 puroks.",
    descFil: "Pag-install ng 25 solar-powered street lights sa lahat ng 7 purok.",
    statusEn: "Completed",
    statusFil: "Tapos",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    icon: "🚰",
    color: "from-cyan-500 to-cyan-600",
    titleEn: "Level II Water System",
    titleFil: "Level II Water System",
    descEn: "Installation of communal faucets serving 50 households in Purok 5 and 6.",
    descFil: "Pag-install ng communal faucets na magsisilbi sa 50 kabahayan sa Purok 5 at 6.",
    statusEn: "Ongoing",
    statusFil: "Kasalukuyan",
    statusColor: "bg-amber-100 text-amber-700",
  },
  {
    icon: "🏫",
    color: "from-green-500 to-green-600",
    titleEn: "Daycare Center Renovation",
    titleFil: "Renovasyon ng Daycare Center",
    descEn: "Complete renovation of the barangay daycare center including new classrooms and playground.",
    descFil: "Buong renovation ng barangay daycare center kabilang ang mga bagong classroom at playground.",
    statusEn: "Completed",
    statusFil: "Tapos",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    icon: "🌿",
    color: "from-emerald-500 to-emerald-600",
    titleEn: "Barangay Greening Project",
    titleFil: "Proyektong Pagtatanim ng Barangay",
    descEn: "Tree planting and establishment of a community garden along the main road.",
    descFil: "Pagtatanim ng puno at pagtatayo ng community garden sa tabi ng pangunahing kalsada.",
    statusEn: "Completed",
    statusFil: "Tapos",
    statusColor: "bg-green-100 text-green-700",
  },
  {
    icon: "🏥",
    color: "from-red-500 to-red-600",
    titleEn: "Health Center Equipment Upgrade",
    titleFil: "Pag-upgrade ng Kagamitan ng Health Center",
    descEn: "Procurement of new medical equipment for the Barangay Health Center.",
    descFil: "Pagbili ng bagong medical equipment para sa Barangay Health Center.",
    statusEn: "Planned",
    statusFil: "Binalak",
    statusColor: "bg-purple-100 text-purple-700",
  },
];

export default function Projects() {
  const { lang } = useLang();

  return (
    <section id="projects" className="py-16 sm:py-20 bg-white px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <ScrollReveal className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            {t.projectsLabel[lang]}
          </span>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
            {t.projectsTitle[lang]}
          </h2>
          <p className="mt-2 text-neutral-500 max-w-lg mx-auto">
            {t.projectsSubtitle[lang]}
          </p>
        </ScrollReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <ScrollReveal key={i} delay={i * 80}>
              <div className="group rounded-xl border border-neutral-200 p-5 hover:shadow-lg hover:border-primary/20 transition-all">
                <div className="flex items-start gap-4">
                  <div className={`size-14 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center shrink-0 shadow-sm`}>
                    <span className="text-2xl">{p.icon}</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-neutral-900 mb-1">
                      {lang === "en" ? p.titleEn : p.titleFil}
                    </h3>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-2">
                      {lang === "en" ? p.descEn : p.descFil}
                    </p>
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${p.statusColor}`}>
                      {lang === "en" ? p.statusEn : p.statusFil}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
