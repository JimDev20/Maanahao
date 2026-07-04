import { emergencyContacts } from "../lib/data";

export default function EmergencyHotlines() {
  return (
    <section id="emergency" className="py-16 sm:py-20 bg-gradient-to-br from-secondary to-red-700 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-semibold text-white/90 backdrop-blur-sm mb-4">
          <span className="size-2 rounded-full bg-white animate-pulse" />
          EMERGENCY HOTLINES
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Nangangailangan ng Tulong?
        </h2>
        <p className="text-white/80 mb-10 max-w-md mx-auto">
          Tumawag sa mga sumusunod na numero sa oras ng emergency.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          {emergencyContacts.map((contact) => (
            <a
              key={contact.name}
              href={`tel:${contact.number.replace(/[^0-9]/g, "")}`}
              className="flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-4 text-left hover:bg-white/20 transition-all group active:scale-[0.98] border border-white/10"
            >
              <span className="text-2xl">{contact.icon}</span>
              <div>
                <div className="text-sm font-medium text-white/80">{contact.name}</div>
                <div className="text-lg font-bold text-white group-hover:underline">
                  {contact.number}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
