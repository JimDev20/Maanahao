export type Lang = "bcl" | "en" | "fil";

export const LANG_LABELS: Record<Lang, string> = {
  bcl: "Bisaya",
  en: "English",
  fil: "Tagalog",
};

export const t = {
  navHome: { bcl: "Purohan", en: "Home", fil: "Home" },
  navServices: { bcl: "Serbisyo", en: "Services", fil: "Serbisyo" },
  navAnnouncements: { bcl: "Anunsyo", en: "Announcements", fil: "Anunsyo" },
  navOfficials: { bcl: "Opisyal", en: "Officials", fil: "Opisyal" },
  navContact: { bcl: "Kontak", en: "Contact", fil: "Kontak" },

  heroOfficeHours: { bcl: "Lunes–Biyernes, 8:00 AM – 5:00 PM", en: "Mon–Fri, 8:00 AM – 5:00 PM", fil: "Lunes–Biyernes, 8:00 AM – 5:00 PM" },
  heroTagline: { bcl: "Serbisyong Tapat, Barangay na Maunlad", en: "Honest Service, Progressive Barangay", fil: "Serbisyong Tapat, Barangay na Maunlad" },
  heroSubtitle: { bcl: "Palanas, Masbate — Naglilingkod nang tapat asin may pagmakolog sa lambang pamilya kan satuyang komunidad.", en: "Palanas, Masbate — Serving faithfully with care for every family in our community.", fil: "Palanas, Masbate — Naglilingkod nang tapat at may malasakit sa bawat pamilya ng ating komunidad." },
  heroRequestDoc: { bcl: "Mag-request nin Dokumento", en: "Request Document", fil: "Request Document" },
  heroReportConcern: { bcl: "Mag-report nin Problema", en: "Report a Concern", fil: "Report a Concern" },
  heroViewAnnouncements: { bcl: "Hilingon mga Anunsyo", en: "View Announcements", fil: "View Announcements" },

  statsPopulation: { bcl: "Populasyon", en: "Population", fil: "Populasyon" },
  statsLandArea: { bcl: "Rona", en: "Land Area", fil: "Lawak ng Lupa" },
  statsPuroks: { bcl: "Purok", en: "Puroks", fil: "Purok" },
  statsEstablished: { bcl: "Taon Natindog", en: "Established", fil: "Taon Itinatag" },

  announcementsLabel: { bcl: "Barangay News", en: "Barangay News", fil: "Barangay News" },
  announcementsTitle: { bcl: "Mga Anunsyo asin Balita", en: "Announcements & News", fil: "Mga Anunsyo at Balita" },
  announcementsViewAll: { bcl: "Hilingon Gabos", en: "View All", fil: "Tingnan Lahat" },

  servicesLabel: { bcl: "Samuyang Serbisyo", en: "Our Services", fil: "Aming Serbisyo" },
  servicesTitle: { bcl: "Serbisyong Itinatao sa Komunidad", en: "Services for the Community", fil: "Serbisyong Handog sa Komunidad" },
  servicesSubtitle: { bcl: "Mabilis, malinig, asin may pagmakolog — yaon digdi an mga serbisyong makukua nindo sa satuyang barangay hall.", en: "Fast, clean, and caring — here are the services available at your barangay hall.", fil: "Mabilis, malinis, at may malasakit — narito ang mga serbisyong makukuha ninyo sa ating barangay hall." },
  servicesLearnHow: { bcl: "Aramon kun paano", en: "Learn how", fil: "Alamin paano" },

  officialsLabel: { bcl: "Barangay Council", en: "Barangay Council", fil: "Barangay Council" },
  officialsTitle: { bcl: "Samuyang mga Opisyal", en: "Your Officials", fil: "Ang Inyong mga Opisyal" },
  officialsSubtitle: { bcl: "An samuyang lingkod-bayan, handang maglingkod ano man na oras.", en: "Your public servants, ready to serve anytime.", fil: "Ang inyong lingkod-bayan, handang maglingkod anumang oras." },

  locationLabel: { bcl: "Kinamumugtakan", en: "Location", fil: "Lokasyon" },
  locationTitle: { bcl: "Hanapon an Barangay Hall", en: "Find the Barangay Hall", fil: "Hanapin ang Barangay Hall" },
  locationOfficeHours: { bcl: "Oras kan Opisina", en: "Office Hours", fil: "Oras ng Opisina" },
  locationPhone: { bcl: "Telepono", en: "Telephone", fil: "Telepono" },
  locationMapPlaceholder: { bcl: "An interactive map ilalaag digdi", en: "Interactive map will be embedded here", fil: "Interactive map will be embedded here" },

  emergencyLabel: { bcl: "EMERGENCY HOTLINES", en: "EMERGENCY HOTLINES", fil: "EMERGENCY HOTLINES" },
  emergencyTitle: { bcl: "Nangangaipo nin Tabang?", en: "Need Help?", fil: "Nangangailangan ng Tulong?" },
  emergencySubtitle: { bcl: "Tumawag sa minasunod na numero sa oras nin emergency.", en: "Call the following numbers in case of emergency.", fil: "Tumawag sa mga sumusunod na numero sa oras ng emergency." },

  contactLabel: { bcl: "Makipag-ulay", en: "Get in Touch", fil: "Makipag-ugnayan" },
  contactTitle: { bcl: "May Hapot o Suhestyon?", en: "Questions or Suggestions?", fil: "May Katanungan o Mungkahi?" },
  contactSubtitle: { bcl: "Magwalat nin mensahe asin babalikan mi kamo sa madali sanang panahon.", en: "Leave a message and we'll get back to you as soon as possible.", fil: "Mag-iwan ng mensahe at babalikan ka namin sa lalong madaling panahon." },
  contactName: { bcl: "Pangaran", en: "Name", fil: "Pangalan" },
  contactEmail: { bcl: "Email o Telepono", en: "Email or Phone", fil: "Email o Telepono" },
  contactSubject: { bcl: "Paksa kan Mensahe", en: "Subject", fil: "Paksa ng Mensahe" },
  contactSubjectPlaceholder: { bcl: "Pumili nin paksa...", en: "Choose a subject...", fil: "Pumili ng paksa..." },
  contactSubjectDoc: { bcl: "Request nin Dokumento", en: "Document Request", fil: "Request ng Dokumento" },
  contactSubjectReport: { bcl: "Mag-report nin Insidente", en: "Report an Incident", fil: "Mag-report ng Insidente" },
  contactSubjectFeedback: { bcl: "Suhestyon o Feedback", en: "Suggestion or Feedback", fil: "Mungkahi o Feedback" },
  contactSubjectOther: { bcl: "Iba pa", en: "Other", fil: "Iba pa" },
  contactMessage: { bcl: "Mensahe", en: "Message", fil: "Mensahe" },
  contactMessagePlaceholder: { bcl: "Isurat an samuyang mensahe...", en: "Write your message...", fil: "Isulat ang inyong mensahe..." },
  contactSubmit: { bcl: "Ipadara an Mensahe", en: "Send Message", fil: "Ipasa ang Mensahe" },
  contactVisit: { bcl: "Bisitahon Kami", en: "Visit Us", fil: "Bisitahin Kami" },
  contactCall: { bcl: "Tawagan Kami", en: "Call Us", fil: "Tawagan Kami" },
  contactFacebook: { bcl: "Facebook Page", en: "Facebook Page", fil: "Facebook Page" },

  footerTagline: { bcl: "Serbisyong Tapat, Barangay na Maunlad. Naglilingkod nang bilog na puso sa lambang pamilyang Pilipino.", en: "Honest Service, Progressive Barangay. Serving every Filipino family with all our heart.", fil: "Serbisyong Tapat, Barangay na Maunlad. Naglilingkod nang buong puso sa bawat pamilyang Pilipino." },
  footerQuickLinks: { bcl: "Mabilis na Link", en: "Quick Links", fil: "Mabilis na Link" },
  footerOffice: { bcl: "Opisina", en: "Office", fil: "Opisina" },
  footerFollow: { bcl: "Sumunod", en: "Follow Us", fil: "Sumubaybay" },
  footerDataPrivacy: { bcl: "Bilang pagtalima sa Data Privacy Act (RA 10173)", en: "In compliance with the Data Privacy Act (RA 10173)", fil: "Bilang pagtalima sa Data Privacy Act (RA 10173)" },
};

export function useLang(lang: Lang) {
  return (key: keyof typeof t): string => t[key][lang];
}
