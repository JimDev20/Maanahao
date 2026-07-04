import { announcements } from "../lib/data";

const categoryColors: Record<string, string> = {
  Kalusugan: "bg-green-100 text-green-700",
  Pampubliko: "bg-blue-100 text-blue-700",
  Serbisyo: "bg-purple-100 text-purple-700",
  Ordinansa: "bg-amber-100 text-amber-700",
};

export default function Announcements() {
  return (
    <section id="announcements" className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Barangay News
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold text-neutral-900">
              Mga Anunsyo at Balita
            </h2>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {announcements.map((item) => (
            <article
              key={item.id}
              className="group bg-white rounded-xl border border-neutral-200 p-5 hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                    categoryColors[item.category] ?? "bg-neutral-100 text-neutral-700"
                  }`}
                >
                  {item.category}
                </span>
                <span className="text-xs text-neutral-400">{item.date}</span>
              </div>
              <h3 className="font-semibold text-neutral-900 leading-snug mb-2 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
