export const BARANGAY = {
  name: "Barangay San Juan",
  municipality: "Lungsod ng Maynila",
  tagline: "Serbisyong Tapat, Barangay na Maunlad",
  established: 1954,
  population: 12450,
  landArea: "1.8 km²",
  puroks: 12,
  address: "123 Barangay Hall St., Brgy. San Juan, Maynila",
  officeHours: "Lunes–Biyernes, 8:00 AM – 5:00 PM",
  facebook: "https://facebook.com/BarangaySanJuan",
  email: "barangay@sanjuan.gov.ph",
  phone: "(02) 8123-4567",
} as const;

export interface Announcement {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export const announcements: Announcement[] = [
  {
    id: 1,
    title: "LIBRENG VACCINATION DRIVE para sa mga Bata at Senior",
    date: "Hulyo 10, 2026",
    category: "Kalusugan",
    excerpt:
      "Magsasagawa ang Barangay San Juan ng libreng vaccination drive sa pakikipagtulungan ng City Health Office. Unahin ang inyong mga anak at nakatatanda.",
  },
  {
    id: 2,
    title: "PAGWAWAGAS ng DENGUE: Schedule para sa Hulyo",
    date: "Hulyo 5, 2026",
    category: "Pampubliko",
    excerpt:
      "Ang monthly fogging operation ay isasagawa sa lahat ng purok. Pakisiguraduhing sarado ang mga bintana at nasa loob ng bahay ang mga bata.",
  },
  {
    id: 3,
    title: "FIRST-TIME JOB SEEKER CERTIFICATE — Dali Lang!",
    date: "Hunyo 28, 2026",
    category: "Serbisyo",
    excerpt:
      "Alamin ang requirements at proseso para sa First-Time Job Seeker Certificate. Libre ito sa ilalim ng Batas Republika 11261.",
  },
  {
    id: 4,
    title: "BAWAL ANG JUETENG at ILEGAL NA SUGAL",
    date: "Hunyo 20, 2026",
    category: "Ordinansa",
    excerpt:
      "Mahigpit na ipinapatupad ng barangay ang ordinansa kontra ilegal na sugal. Mangyaring i-report ang anumang kahina-hinalang aktibidad sa barangay hall.",
  },
];

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export const services: Service[] = [
  {
    title: "Barangay Clearance",
    description: "Kinakailangan para sa trabaho, negosyo, at iba pang transaksyon.",
    icon: "📋",
  },
  {
    title: "Certificate of Indigency",
    description: "Para sa medical assistance, scholarship, at iba pang benepisyo.",
    icon: "🪪",
  },
  {
    title: "Business Permit",
    description: "Rehistro at renewal ng permit para sa maliit at malaking negosyo.",
    icon: "🏪",
  },
  {
    title: "Blotter / Report",
    description: "Mag-report ng insidente, reklamo, o emergency sa barangay hall.",
    icon: "📝",
  },
  {
    title: "Health Center",
    description: "Konsulta, check-up, at gamutan sa ating Barangay Health Center.",
    icon: "🏥",
  },
  {
    title: "Cedula (Community Tax)",
    description: "Pagkuha ng community tax certificate para sa mga legal na dokumento.",
    icon: "📄",
  },
];

export interface Official {
  name: string;
  position: string;
  image: string;
}

export const officials: Official[] = [
  { name: "Juan M. Dela Cruz", position: "Punong Barangay", image: "" },
  { name: "Maria L. Santos", position: "Kagawad", image: "" },
  { name: "Pedro R. Reyes", position: "Kagawad", image: "" },
  { name: "Ana C. Gonzales", position: "Kagawad", image: "" },
  { name: "Josefina B. Lopez", position: "Kagawad", image: "" },
  { name: "Carlos T. Rivera", position: "Kagawad", image: "" },
  { name: "Luzviminda D. Cruz", position: "Kagawad", image: "" },
  { name: "Ramon G. Flores", position: "Kagawad", image: "" },
  { name: "Mark Anthony B. Tan", position: "SK Chairman", image: "" },
  { name: "Diana M. Ramos", position: "Barangay Secretary", image: "" },
  { name: "Jose R. Mercado", position: "Barangay Treasurer", image: "" },
];

export interface EmergencyContact {
  name: string;
  number: string;
  icon: string;
}

export const emergencyContacts: EmergencyContact[] = [
  { name: "Barangay Tanod", number: "0917-123-4567", icon: "🛡️" },
  { name: "Pulisya (MPS)", number: "0928-765-4321", icon: "🚔" },
  { name: "Bumbero (BFP)", number: "0939-555-1111", icon: "🚒" },
  { name: "Barangay Health Center", number: "0948-333-2222", icon: "🏥" },
  { name: "Disaster Response (DRRM)", number: "0956-777-8888", icon: "🚨" },
];
