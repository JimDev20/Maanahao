export const BARANGAY = {
  name: "Barangay Maanahao",
  municipality: "Palanas, Masbate",
  tagline: "Serbisyong Tapat, Barangay na Maunlad",
  established: 1965,
  population: 3420,
  landArea: "2.4 km²",
  puroks: 7,
  address: "Brgy. Maanahao, Palanas, Masbate",
  officeHours: "Lunes–Biyernes, 8:00 AM – 5:00 PM",
  facebook: "https://facebook.com/BarangayMaanahao",
  email: "barangaymaanahao@gmail.com",
  phone: "0917-123-4567",
} as const;

export interface Announcement {
  id: number;
  titleBcl: string;
  titleEn: string;
  titleFil: string;
  date: string;
  category: string;
  excerptBcl: string;
  excerptEn: string;
  excerptFil: string;
}

export const announcements: Announcement[] = [
  {
    id: 1,
    titleBcl: "LIBRENG BAKUNA para sa mga Aki asin Senior",
    titleEn: "FREE VACCINATION DRIVE for Children & Seniors",
    titleFil: "LIBRENG VACCINATION DRIVE para sa mga Bata at Senior",
    date: "Hulyo 10, 2026",
    category: "Kalusugan",
    excerptBcl: "Maggibo an Barangay Maanahao nin libreng vaccination drive kaiba an City Health Office. Prioridad an mga aki asin gurang.",
    excerptEn: "Barangay Maanahao will conduct a free vaccination drive in partnership with the City Health Office. Prioritize your children and elderly.",
    excerptFil: "Magsasagawa ang Barangay Maanahao ng libreng vaccination drive sa pakikipagtulungan ng City Health Office. Unahin ang inyong mga anak at nakatatanda.",
  },
  {
    id: 2,
    titleBcl: "PAGFOGGING kontra DENGUE: Iskedyul para sa Hulyo",
    titleEn: "DENGUE FOGGING: Schedule for July",
    titleFil: "PAGWAWAGAS ng DENGUE: Schedule para sa Hulyo",
    date: "Hulyo 5, 2026",
    category: "Pampubliko",
    excerptBcl: "An monthly fogging gigibuhon sa gabos na purok. Pakisiguradong nakasara an mga bintana asin yaon sa laog kan harong an mga aki.",
    excerptEn: "The monthly fogging operation will be conducted in all puroks. Please ensure windows are closed and children stay indoors.",
    excerptFil: "Ang monthly fogging operation ay isasagawa sa lahat ng purok. Pakisiguraduhing sarado ang mga bintana at nasa loob ng bahay ang mga bata.",
  },
  {
    id: 3,
    titleBcl: "CERTIFICATE para sa FIRST-TIME JOB SEEKER — Madali Lang!",
    titleEn: "FIRST-TIME JOB SEEKER CERTIFICATE — Easy!",
    titleFil: "FIRST-TIME JOB SEEKER CERTIFICATE — Dali Lang!",
    date: "Hunyo 28, 2026",
    category: "Serbisyo",
    excerptBcl: "Aramon an mga requirements asin proseso para sa First-Time Job Seeker Certificate. Libre ini sa irarom kan Batas Republika 11261.",
    excerptEn: "Learn the requirements and process for the First-Time Job Seeker Certificate. It's free under Republic Act 11261.",
    excerptFil: "Alamin ang requirements at proseso para sa First-Time Job Seeker Certificate. Libre ito sa ilalim ng Batas Republika 11261.",
  },
  {
    id: 4,
    titleBcl: "BAWAL AN JUETENG ASIN ILEGAL NA SUGAL",
    titleEn: "JUETENG AND ILLEGAL GAMBLING ARE PROHIBITED",
    titleFil: "BAWAL ANG JUETENG AT ILEGAL NA SUGAL",
    date: "Hunyo 20, 2026",
    category: "Ordinansa",
    excerptBcl: "Mahigpit na ipinapatupad kan barangay an ordinansa kontra ilegal na sugal. Pakireport an ano man na kahina-hinalang aktibidad sa barangay hall.",
    excerptEn: "The barangay strictly enforces the ordinance against illegal gambling. Please report any suspicious activity to the barangay hall.",
    excerptFil: "Mahigpit na ipinapatupad ng barangay ang ordinansa kontra ilegal na sugal. Mangyaring i-report ang anumang kahina-hinalang aktibidad sa barangay hall.",
  },
];

export interface Service {
  titleBcl: string;
  titleEn: string;
  titleFil: string;
  descBcl: string;
  descEn: string;
  descFil: string;
  icon: string;
}

export const services: Service[] = [
  {
    titleBcl: "Barangay Clearance",
    titleEn: "Barangay Clearance",
    titleFil: "Barangay Clearance",
    descBcl: "Kinakaipuhan para sa trabaho, negosyo, asin iba pang transaksyon.",
    descEn: "Required for employment, business, and other transactions.",
    descFil: "Kinakailangan para sa trabaho, negosyo, at iba pang transaksyon.",
    icon: "📋",
  },
  {
    titleBcl: "Certificate of Indigency",
    titleEn: "Certificate of Indigency",
    titleFil: "Certificate of Indigency",
    descBcl: "Para sa medical assistance, scholarship, asin iba pang benepisyo.",
    descEn: "For medical assistance, scholarship, and other benefits.",
    descFil: "Para sa medical assistance, scholarship, at iba pang benepisyo.",
    icon: "🪪",
  },
  {
    titleBcl: "Business Permit",
    titleEn: "Business Permit",
    titleFil: "Business Permit",
    descBcl: "Rehistro asin renewal kan permit para sa sadit asin dakulang negosyo.",
    descEn: "Registration and renewal of permits for small and large businesses.",
    descFil: "Rehistro at renewal ng permit para sa maliit at malaking negosyo.",
    icon: "🏪",
  },
  {
    titleBcl: "Blotter / Report",
    titleEn: "Blotter / Report",
    titleFil: "Blotter / Report",
    descBcl: "Mag-report kan insidente, reklamo, o emergency sa barangay hall.",
    descEn: "Report an incident, complaint, or emergency to the barangay hall.",
    descFil: "Mag-report ng insidente, reklamo, o emergency sa barangay hall.",
    icon: "📝",
  },
  {
    titleBcl: "Health Center",
    titleEn: "Health Center",
    titleFil: "Health Center",
    descBcl: "Konsulta, check-up, asin bulong sa satuyang Barangay Health Center.",
    descEn: "Consultation, check-up, and treatment at our Barangay Health Center.",
    descFil: "Konsulta, check-up, at gamutan sa ating Barangay Health Center.",
    icon: "🏥",
  },
  {
    titleBcl: "Cedula (Community Tax)",
    titleEn: "Cedula (Community Tax)",
    titleFil: "Cedula (Community Tax)",
    descBcl: "Pagkuha kan community tax certificate para sa mga legal na dokumento.",
    descEn: "Get your community tax certificate for legal documents.",
    descFil: "Pagkuha ng community tax certificate para sa mga legal na dokumento.",
    icon: "📄",
  },
];

export interface Official {
  name: string;
  positionBcl: string;
  positionEn: string;
  positionFil: string;
  image: string;
}

export const officials: Official[] = [
  { name: "Juan M. Dela Cruz", positionBcl: "Punong Barangay", positionEn: "Barangay Captain", positionFil: "Punong Barangay", image: "" },
  { name: "Maria L. Santos", positionBcl: "Kagawad", positionEn: "Councilor", positionFil: "Kagawad", image: "" },
  { name: "Pedro R. Reyes", positionBcl: "Kagawad", positionEn: "Councilor", positionFil: "Kagawad", image: "" },
  { name: "Ana C. Gonzales", positionBcl: "Kagawad", positionEn: "Councilor", positionFil: "Kagawad", image: "" },
  { name: "Josefina B. Lopez", positionBcl: "Kagawad", positionEn: "Councilor", positionFil: "Kagawad", image: "" },
  { name: "Carlos T. Rivera", positionBcl: "Kagawad", positionEn: "Councilor", positionFil: "Kagawad", image: "" },
  { name: "Luzviminda D. Cruz", positionBcl: "Kagawad", positionEn: "Councilor", positionFil: "Kagawad", image: "" },
  { name: "Ramon G. Flores", positionBcl: "Kagawad", positionEn: "Councilor", positionFil: "Kagawad", image: "" },
  { name: "Mark Anthony B. Tan", positionBcl: "SK Chairman", positionEn: "SK Chairman", positionFil: "SK Chairman", image: "" },
  { name: "Diana M. Ramos", positionBcl: "Sekretarya", positionEn: "Secretary", positionFil: "Kalihim", image: "" },
  { name: "Jose R. Mercado", positionBcl: "Tesorero", positionEn: "Treasurer", positionFil: "Tesorero", image: "" },
];

export interface EmergencyContact {
  nameBcl: string;
  nameEn: string;
  nameFil: string;
  number: string;
  icon: string;
}

export const emergencyContacts: EmergencyContact[] = [
  { nameBcl: "Barangay Tanod", nameEn: "Barangay Tanod", nameFil: "Barangay Tanod", number: "0917-123-4567", icon: "🛡️" },
  { nameBcl: "Pulisya (MPS)", nameEn: "Police (MPS)", nameFil: "Pulisya (MPS)", number: "0928-765-4321", icon: "🚔" },
  { nameBcl: "Bumbero (BFP)", nameEn: "Fire (BFP)", nameFil: "Bumbero (BFP)", number: "0939-555-1111", icon: "🚒" },
  { nameBcl: "Barangay Health Center", nameEn: "Barangay Health Center", nameFil: "Barangay Health Center", number: "0948-333-2222", icon: "🏥" },
  { nameBcl: "Disaster Response (DRRM)", nameEn: "Disaster Response (DRRM)", nameFil: "Disaster Response (DRRM)", number: "0956-777-8888", icon: "🚨" },
];
