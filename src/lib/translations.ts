export type Lang = "en" | "fil";

export const LANG_LABELS: Record<Lang, string> = {
  en: "English",
  fil: "Tagalog",
};

export const t = {
  navHome: { en: "Home", fil: "Home" },
  navServices: { en: "Services", fil: "Serbisyo" },
  navAnnouncements: { en: "Announcements", fil: "Anunsyo" },
  navOfficials: { en: "Officials", fil: "Opisyal" },
  navContact: { en: "Contact", fil: "Kontak" },

  heroOfficeHours: { en: "Mon–Fri, 8:00 AM – 5:00 PM", fil: "Lunes–Biyernes, 8:00 AM – 5:00 PM" },
  heroTagline: { en: "Honest Service, Progressive Barangay", fil: "Serbisyong Tapat, Barangay na Maunlad" },
  heroSubtitle: { en: "Palanas, Masbate — Serving faithfully with care for every family in our community.", fil: "Palanas, Masbate — Naglilingkod nang tapat at may malasakit sa bawat pamilya ng ating komunidad." },
  heroRequestDoc: { en: "Request Document", fil: "Request Document" },
  heroReportConcern: { en: "Report a Concern", fil: "Report a Concern" },
  heroViewAnnouncements: { en: "View Announcements", fil: "View Announcements" },

  statsPopulation: { en: "Population", fil: "Populasyon" },
  statsLandArea: { en: "Land Area", fil: "Lawak ng Lupa" },
  statsPuroks: { en: "Puroks", fil: "Purok" },
  statsEstablished: { en: "Established", fil: "Taon Itinatag" },

  announcementsLabel: { en: "Barangay News", fil: "Barangay News" },
  announcementsTitle: { en: "Announcements & News", fil: "Mga Anunsyo at Balita" },
  announcementsViewAll: { en: "View All", fil: "Tingnan Lahat" },

  servicesLabel: { en: "Our Services", fil: "Aming Serbisyo" },
  servicesTitle: { en: "Services for the Community", fil: "Serbisyong Handog sa Komunidad" },
  servicesSubtitle: { en: "Fast, clean, and caring — here are the services available at your barangay hall.", fil: "Mabilis, malinis, at may malasakit — narito ang mga serbisyong makukuha ninyo sa ating barangay hall." },
  servicesLearnHow: { en: "Learn how", fil: "Alamin paano" },

  officialsLabel: { en: "Barangay Council", fil: "Barangay Council" },
  officialsTitle: { en: "Your Officials", fil: "Ang Inyong mga Opisyal" },
  officialsSubtitle: { en: "Your public servants, ready to serve anytime.", fil: "Ang inyong lingkod-bayan, handang maglingkod anumang oras." },

  locationLabel: { en: "Location", fil: "Lokasyon" },
  locationTitle: { en: "Find the Barangay Hall", fil: "Hanapin ang Barangay Hall" },
  locationOfficeHours: { en: "Office Hours", fil: "Oras ng Opisina" },
  locationPhone: { en: "Telephone", fil: "Telepono" },
  locationMapPlaceholder: { en: "Interactive map will be embedded here", fil: "Interactive map will be embedded here" },

  emergencyLabel: { en: "EMERGENCY HOTLINES", fil: "EMERGENCY HOTLINES" },
  emergencyTitle: { en: "Need Help?", fil: "Nangangailangan ng Tulong?" },
  emergencySubtitle: { en: "Call the following numbers in case of emergency.", fil: "Tumawag sa mga sumusunod na numero sa oras ng emergency." },

  contactLabel: { en: "Get in Touch", fil: "Makipag-ugnayan" },
  contactTitle: { en: "Questions or Suggestions?", fil: "May Katanungan o Mungkahi?" },
  contactSubtitle: { en: "Leave a message and we'll get back to you as soon as possible.", fil: "Mag-iwan ng mensahe at babalikan ka namin sa lalong madaling panahon." },
  contactName: { en: "Name", fil: "Pangalan" },
  contactEmail: { en: "Email or Phone", fil: "Email o Telepono" },
  contactSubject: { en: "Subject", fil: "Paksa ng Mensahe" },
  contactSubjectPlaceholder: { en: "Choose a subject...", fil: "Pumili ng paksa..." },
  contactSubjectDoc: { en: "Document Request", fil: "Request ng Dokumento" },
  contactSubjectReport: { en: "Report an Incident", fil: "Mag-report ng Insidente" },
  contactSubjectFeedback: { en: "Suggestion or Feedback", fil: "Mungkahi o Feedback" },
  contactSubjectOther: { en: "Other", fil: "Iba pa" },
  contactMessage: { en: "Message", fil: "Mensahe" },
  contactMessagePlaceholder: { en: "Write your message...", fil: "Isulat ang inyong mensahe..." },
  contactSubmit: { en: "Send Message", fil: "Ipasa ang Mensahe" },
  contactVisit: { en: "Visit Us", fil: "Bisitahin Kami" },
  contactCall: { en: "Call Us", fil: "Tawagan Kami" },
  contactFacebook: { en: "Facebook Page", fil: "Facebook Page" },

  footerTagline: { en: "Honest Service, Progressive Barangay. Serving every Filipino family with all our heart.", fil: "Serbisyong Tapat, Barangay na Maunlad. Naglilingkod nang buong puso sa bawat pamilyang Pilipino." },
  footerQuickLinks: { en: "Quick Links", fil: "Mabilis na Link" },
  footerOffice: { en: "Office", fil: "Opisina" },
  footerFollow: { en: "Follow Us", fil: "Sumubaybay" },
  footerDataPrivacy: { en: "In compliance with the Data Privacy Act (RA 10173)", fil: "Bilang pagtalima sa Data Privacy Act (RA 10173)" },

  galleryLabel: { en: "GALLERY", fil: "GALLERY" },
  galleryTitle: { en: "Our Barangay", fil: "Ang Aming Barangay" },
  gallerySubtitle: { en: "A glimpse of the places and facilities in Barangay Maanahao.", fil: "Sulyap sa mga lugar at pasilidad ng Barangay Maanahao." },

  aboutTitle: { en: "About Barangay Maanahao", fil: "Tungkol sa Barangay Maanahao" },
  aboutHistory: { en: "Our History", fil: "Ang Aming Kasaysayan" },
  aboutMission: { en: "Our Mission", fil: "Ang Aming Misyon" },
  aboutVision: { en: "Our Vision", fil: "Ang Aming Bisyon" },
  aboutBack: { en: "Back to Home", fil: "Bumalik sa Home" },

  requestTitle: { en: "Document Request", fil: "Request ng Dokumento" },
  requestSubtitle: { en: "Fill out the form below to request a document from Barangay Maanahao.", fil: "Punan ang form sa ibaba para humingi ng dokumento mula sa Barangay Maanahao." },
  requestService: { en: "Document Type", fil: "Uri ng Dokumento" },
  requestServicePlaceholder: { en: "Select document type...", fil: "Pumili ng uri ng dokumento..." },
  requestFullName: { en: "Full Name", fil: "Buong Pangalan" },
  requestAddress: { en: "Address", fil: "Address" },
  requestPurpose: { en: "Purpose", fil: "Layunin" },
  requestPurposePlaceholder: { en: "State the purpose of your request...", fil: "Sabihin ang layunin ng iyong request..." },
  requestSubmit: { en: "Submit Request", fil: "Ipasa ang Request" },
  requestSuccess: { en: "Request Submitted Successfully! We will process your document and contact you within 1-2 business days.", fil: "Matagumpay na naipasa ang iyong request! Poproseso namin ang iyong dokumento at kokontakin ka sa loob ng 1-2 araw." },
  requestNew: { en: "Submit Another Request", fil: "Mag-request Muli" },

  reportTitle: { en: "Report an Incident", fil: "Mag-report ng Insidente" },
  reportSubtitle: { en: "Use this form to report an incident, concern, or emergency in Barangay Maanahao.", fil: "Gamitin ang form na ito para mag-ulat ng insidente, alalahanin, o emergency sa Barangay Maanahao." },
  reportType: { en: "Incident Type", fil: "Uri ng Insidente" },
  reportTypePlaceholder: { en: "Select incident type...", fil: "Pumili ng uri ng insidente..." },
  reportTypeEmergency: { en: "Emergency", fil: "Emergency" },
  reportTypeComplaint: { en: "Complaint", fil: "Reklamo" },
  reportTypeSuspicious: { en: "Suspicious Activity", fil: "Kahina-hinalang Aktibidad" },
  reportTypeAccident: { en: "Accident", fil: "Aksidente" },
  reportTypeOther: { en: "Other", fil: "Iba pa" },
  reportDescription: { en: "Description", fil: "Paglalarawan" },
  reportDescriptionPlaceholder: { en: "Describe the incident in detail...", fil: "Ilarawan nang detalyado ang insidente..." },
  reportLocation: { en: "Location of Incident", fil: "Lokasyon ng Insidente" },
  reportLocationPlaceholder: { en: "Purok / Street / Landmark", fil: "Purok / Kalye / Landmark" },
  reportDate: { en: "Date of Incident", fil: "Petsa ng Insidente" },
  reportContact: { en: "Your Contact Info", fil: "Iyong Contact Info" },
  reportSubmit: { en: "Submit Report", fil: "Ipasa ang Ulat" },
  reportSuccess: { en: "Report Submitted Successfully! The barangay will review your report and take appropriate action.", fil: "Matagumpay na naipasa ang iyong ulat! Susuriin ng barangay ang iyong report at gagawa ng naaangkop na aksyon." },
  reportNew: { en: "Submit Another Report", fil: "Mag-report Muli" },

  servicesRequest: { en: "Request this Service", fil: "Humingi ng Serbisyong Ito" },
  servicesRequirements: { en: "Requirements", fil: "Mga Requirement" },
  servicesProcedure: { en: "Procedure", fil: "Proseso" },
  servicesFee: { en: "Fee", fil: "Halaga" },
};

export function useLang(lang: Lang) {
  return (key: keyof typeof t): string => t[key][lang];
}
