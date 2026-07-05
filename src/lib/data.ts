export const BARANGAY = {
  name: "Barangay Maanahao",
  municipality: "Palanas, Masbate",
  province: "Masbate",
  region: "Region V (Bicol)",
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
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.4222663615233!2d123.4312!3d12.1456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBrgy.%20Maanahao%2C%20Palanas%2C%20Masbate!5e0!3m2!1sen!2sph!4v1",
  history: "Ang Barangay Maanahao ay itinatag noong 1965. Ang pangalan nito ay nagmula sa salitang \"maanahao\" na nangangahulugang \"maaliwalas\" o \"mapayapa\" sa lokal na diyalekto. Sa simula, ang barangay ay isang maliit na pamayanan na may ilang dosenang pamilya na ang kabuhayan ay pagsasaka at pangingisda. Sa paglipas ng mga taon, lumago ang komunidad at naging isa sa mga progresibong barangay ng Palanas, Masbate.",
  historyEn: "Barangay Maanahao was established in 1965. Its name comes from the word \"maanahao\" which means \"bright\" or \"peaceful\" in the local dialect. In the beginning, the barangay was a small settlement with a few dozen families whose livelihood was farming and fishing. Over the years, the community grew and became one of the progressive barangays of Palanas, Masbate.",
  mission: "Magsilbi nang tapat, mahusay, at may malasakit sa bawat pamilya ng Barangay Maanahao sa pamamagitan ng maayos na serbisyo publiko, tamang pamamahala, at aktibong pakikilahok ng komunidad.",
  missionEn: "To serve with honesty, efficiency, and compassion every family of Barangay Maanahao through proper public service, good governance, and active community participation.",
  vision: "Isang tahimik, maunlad, at organisadong barangay kung saan ang bawat mamamayan ay may pantay na oportunidad, ligtas na kapaligiran, at masaganang kabuhayan.",
  visionEn: "A peaceful, progressive, and organized barangay where every citizen has equal opportunity, a safe environment, and prosperous livelihood.",
} as const;

export interface Announcement {
  id: number;
  titleEn: string;
  titleFil: string;
  date: string;
  category: string;
  excerptEn: string;
  excerptFil: string;
  contentEn: string;
  contentFil: string;
  image?: string;
}

export const announcements: Announcement[] = [
  {
    id: 1,
    titleEn: "FREE VACCINATION DRIVE for Children & Seniors",
    titleFil: "LIBRENG VACCINATION DRIVE para sa mga Bata at Senior",
    date: "July 10, 2026",
    category: "Health",
    excerptEn: "Barangay Maanahao will conduct a free vaccination drive in partnership with the City Health Office.",
    excerptFil: "Magsasagawa ang Barangay Maanahao ng libreng vaccination drive sa pakikipagtulungan ng City Health Office.",
    contentEn: "Barangay Maanahao, in partnership with the Palanas Municipal Health Office, will hold a FREE Vaccination Drive on July 10, 2026 at the Barangay Health Center. Vaccines available include childhood immunizations (BCG, DPT, OPV, Measles) and adult vaccines (Influenza, Pneumonia, COVID-19). Priority will be given to children under 5 years old, senior citizens aged 60 and above, and pregnant women. Please bring your vaccination card and valid ID. For inquiries, contact the Barangay Health Center at 0948-333-2222.",
    contentFil: "Ang Barangay Maanahao, sa pakikipagtulungan ng Palanas Municipal Health Office, ay magsasagawa ng LIBRENG Vaccination Drive sa Hulyo 10, 2026 sa Barangay Health Center. Kasama sa mga bakunang available ang childhood immunizations (BCG, DPT, OPV, Measles) at adult vaccines (Influenza, Pneumonia, COVID-19). Unahin ang mga batang 5 taong gulang pababa, senior citizen na 60 taong gulang pataas, at mga buntis. Pakidala ang inyong vaccination card at valid ID. Para sa mga katanungan, tumawag sa Barangay Health Center sa 0948-333-2222.",
  },
  {
    id: 2,
    titleEn: "DENGUE FOGGING: Schedule for July",
    titleFil: "PAGWAWAGAS ng DENGUE: Schedule para sa Hulyo",
    date: "July 5, 2026",
    category: "Public Safety",
    excerptEn: "The monthly fogging operation will be conducted in all puroks.",
    excerptFil: "Ang monthly fogging operation ay isasagawa sa lahat ng purok.",
    contentEn: "The Barangay Environment and Sanitation Committee announces the monthly Dengue Fogging Schedule for July 2026. Fogging will be conducted in all 7 puroks from July 5 to July 11, 2026, starting at 6:00 AM daily. Residents are advised to keep windows closed during fogging hours and ensure children and pets stay indoors. The fogging solution used is EPA-approved and safe for humans and animals when applied properly. Let's work together to prevent dengue in our community!",
    contentFil: "Ang Barangay Environment and Sanitation Committee ay nag-aanunsyo ng monthly Dengue Fogging Schedule para sa Hulyo 2026. Isasagawa ang fogging sa lahat ng 7 purok mula Hulyo 5 hanggang Hulyo 11, 2026, simula 6:00 AM araw-araw. Pinapayuhan ang mga residente na isara ang mga bintana habang isinasagawa ang fogging at tiyaking nasa loob ng bahay ang mga bata at alaga. Ang fogging solution na ginagamit ay EPA-approved at ligtas sa tao at hayop kung tama ang paggamit. Sama-sama nating pigilan ang dengue sa ating komunidad!",
  },
  {
    id: 3,
    titleEn: "FIRST-TIME JOB SEEKER CERTIFICATE — Easy!",
    titleFil: "FIRST-TIME JOB SEEKER CERTIFICATE — Dali Lang!",
    date: "June 28, 2026",
    category: "Service",
    excerptEn: "Learn the requirements and process for the First-Time Job Seeker Certificate. It's free!",
    excerptFil: "Alamin ang requirements at proseso para sa First-Time Job Seeker Certificate. Libre ito!",
    contentEn: "Good news to all first-time job seekers in Barangay Maanahao! You can now avail of the First-Time Job Seeker Certificate (FTJSC) absolutely FREE at the Barangay Hall, as mandated by Republic Act 11261. Requirements: 1) Valid government-issued ID, 2) Barangay Clearance, 3) Certificate of Residency. The certificate exempts you from government fees when applying for your first job, including NBI clearance, police clearance, and other documentary stamps. Visit the Barangay Hall during office hours (Mon-Fri, 8AM-5PM) to process your application.",
    contentFil: "Mabuting balita sa lahat ng first-time job seekers sa Barangay Maanahao! Maaari na kayong kumuha ng First-Time Job Seeker Certificate (FTJSC) nang LIBRE sa Barangay Hall, ayon sa Batas Republika 11261. Requirements: 1) Valid government-issued ID, 2) Barangay Clearance, 3) Certificate of Residency. Ang certificate na ito ay nag-exempt sa inyo sa mga government fees kapag nag-a-apply ng unang trabaho, kabilang ang NBI clearance, police clearance, at iba pang documentary stamps. Bumisita sa Barangay Hall sa oras ng opisina (Lunes-Biyernes, 8AM-5PM) para sa inyong aplikasyon.",
  },
  {
    id: 4,
    titleEn: "JUETENG AND ILLEGAL GAMBLING ARE PROHIBITED",
    titleFil: "BAWAL ANG JUETENG AT ILEGAL NA SUGAL",
    date: "June 20, 2026",
    category: "Ordinance",
    excerptEn: "The barangay strictly enforces the ordinance against illegal gambling.",
    excerptFil: "Mahigpit na ipinapatupad ng barangay ang ordinansa kontra ilegal na sugal.",
    contentEn: "In accordance with Barangay Ordinance No. 2024-03, all forms of illegal gambling including jueteng, card games, and other prohibited betting activities are strictly forbidden within the jurisdiction of Barangay Maanahao. The Barangay Peace and Order Committee, together with the Philippine National Police, will conduct regular monitoring and operations. Residents are encouraged to report any suspicious gambling activities to the Barangay Hall at 0917-123-4567 or directly to the Barangay Tanod. Let us maintain peace and order in our community!",
    contentFil: "Alinsunod sa Barangay Ordinance No. 2024-03, mahigpit na ipinagbabawal ang lahat ng uri ng illegal na sugal kabilang ang jueteng, card games, at iba pang ipinagbabawal na pagsusugal sa loob ng nasasakupan ng Barangay Maanahao. Ang Barangay Peace and Order Committee, kasama ang Philippine National Police, ay magsasagawa ng regular na monitoring at operations. Hinihikayat ang mga residente na mag-ulat ng anumang kahina-hinalang aktibidad sa sugal sa Barangay Hall sa 0917-123-4567 o direkta sa Barangay Tanod. Panatilihin natin ang kapayapaan at kaayusan sa ating komunidad!",
  },
];

export interface Service {
  id: number;
  titleEn: string;
  titleFil: string;
  descEn: string;
  descFil: string;
  requirementsEn: string[];
  requirementsFil: string[];
  procedureEn: string[];
  procedureFil: string[];
  icon: string;
  feeEn: string;
  feeFil: string;
}

export const services: Service[] = [
  {
    id: 1,
    titleEn: "Barangay Clearance",
    titleFil: "Barangay Clearance",
    descEn: "Official document certifying your residency and good moral character within the barangay.",
    descFil: "Opisyal na dokumento na nagpapatunay ng iyong paninirahan at mabuting asal sa barangay.",
    requirementsEn: ["Valid Government ID", "Certificate of Residency (if first time)", "1×1 ID picture (2 pcs)"],
    requirementsFil: ["Valid Government ID", "Certificate of Residency (kung first time)", "1×1 ID picture (2 pcs)"],
    procedureEn: ["Proceed to Barangay Hall and go to the Secretary's office", "Fill out the Barangay Clearance application form", "Pay the corresponding fee", "Wait for processing (usually 15-30 minutes)", "Claim your Barangay Clearance"],
    procedureFil: ["Pumunta sa Barangay Hall at magtungo sa opisina ng Kalihim", "Punan ang application form para sa Barangay Clearance", "Magbayad ng kaukulang halaga", "Maghintay sa processing (karaniwang 15-30 minuto)", "Kunin ang inyong Barangay Clearance"],
    icon: "📋",
    feeEn: "PHP 50.00",
    feeFil: "PHP 50.00",
  },
  {
    id: 2,
    titleEn: "Certificate of Indigency",
    titleFil: "Certificate of Indigency",
    descEn: "Document certifying that you belong to a low-income family for government assistance programs.",
    descFil: "Dokumento na nagpapatunay na ikaw ay kabilang sa mahirap na pamilya para sa mga programa ng gobyerno.",
    requirementsEn: ["Valid Government ID", "Barangay Clearance", "Proof of low income (if available)"],
    requirementsFil: ["Valid Government ID", "Barangay Clearance", "Patunay ng mababang kita (kung mayroon)"],
    procedureEn: ["Visit the Barangay Hall and request a Certificate of Indigency", "Present your valid ID and explain your purpose", "The Secretary will assess your application", "The Barangay Captain will sign the certificate", "Claim your certificate (free of charge)"],
    procedureFil: ["Bisitahin ang Barangay Hall at humingi ng Certificate of Indigency", "Ipakita ang iyong valid ID at ipaliwanag ang iyong layunin", "Susuriin ng Kalihim ang iyong aplikasyon", "Pipirmahan ng Punong Barangay ang sertipiko", "Kunin ang iyong sertipiko (libre)"],
    icon: "🪪",
    feeEn: "Free",
    feeFil: "Libre",
  },
  {
    id: 3,
    titleEn: "Business Permit",
    titleFil: "Business Permit",
    descEn: "Registration and renewal of business permits for small and large enterprises in the barangay.",
    descFil: "Rehistro at renewal ng permit para sa maliit at malaking negosyo sa barangay.",
    requirementsEn: ["DTI/SEC Registration", "Barangay Clearance", "Community Tax Certificate (Cedula)", "Sanitary Permit", "Occupational Permit"],
    requirementsFil: ["DTI/SEC Registration", "Barangay Clearance", "Community Tax Certificate (Cedula)", "Sanitary Permit", "Occupational Permit"],
    procedureEn: ["Secure all required documents", "Visit the Barangay Hall and submit requirements to the Secretary", "Pay the business permit fee", "Wait for Mayor's permit processing (usually 1-2 days)", "Claim your Business Permit"],
    procedureFil: ["Kunin ang lahat ng kinakailangang dokumento", "Pumunta sa Barangay Hall at isumite ang requirements sa Kalihim", "Magbayad ng business permit fee", "Maghintay sa pagproseso ng Mayor's permit (karaniwang 1-2 araw)", "Kunin ang iyong Business Permit"],
    icon: "🏪",
    feeEn: "PHP 200.00 - PHP 1,000.00 (depends on business type)",
    feeFil: "PHP 200.00 - PHP 1,000.00 (depende sa uri ng negosyo)",
  },
  {
    id: 4,
    titleEn: "Blotter / Incident Report",
    titleFil: "Blotter / Ulat ng Insidente",
    descEn: "Official reporting of incidents, complaints, or disputes within the barangay.",
    descFil: "Opisyal na pag-uulat ng mga insidente, reklamo, o hindi pagkakaunawaan sa barangay.",
    requirementsEn: ["Valid ID", "Details of the incident (date, time, place)", "Witnesses (if any)"],
    requirementsFil: ["Valid ID", "Detalye ng insidente (petsa, oras, lugar)", "Mga saksi (kung mayroon)"],
    procedureEn: ["Go to the Barangay Hall and proceed to the Lupong Tagapamayapa office", "State your complaint or report the incident", "The Lupon Secretary will document your report in the blotter", "Both parties may be called for mediation", "The blotter will be signed and a copy given to you"],
    procedureFil: ["Pumunta sa Barangay Hall at magtungo sa opisina ng Lupong Tagapamayapa", "Sabihin ang iyong reklamo o i-report ang insidente", "Dodokumento ng Kalihim ng Lupon ang iyong ulat sa blotter", "Maaaring tawagin ang magkabilang panig para sa mediation", "Pipirmahan ang blotter at bibigyan ka ng kopya"],
    icon: "📝",
    feeEn: "Free",
    feeFil: "Libre",
  },
  {
    id: 5,
    titleEn: "Health Center Services",
    titleFil: "Serbisyo ng Health Center",
    descEn: "Medical consultation, check-ups, and treatment at the Barangay Health Center.",
    descFil: "Medical consultation, check-up, at gamutan sa Barangay Health Center.",
    requirementsEn: ["Barangay Health Center Record Card", "Valid ID", "Vaccination Card (for immunizations)"],
    requirementsFil: ["Barangay Health Center Record Card", "Valid ID", "Vaccination Card (para sa immunization)"],
    procedureEn: ["Visit the Barangay Health Center during office hours", "Register at the nurse's station", "Wait for your turn for consultation", "Receive your prescription or treatment", "Follow-up as needed"],
    procedureFil: ["Bisitahin ang Barangay Health Center sa oras ng opisina", "Magrehistro sa nurse's station", "Maghintay ng iyong turn para sa konsulta", "Tanggapin ang iyong reseta o gamutan", "Mag-follow-up kung kinakailangan"],
    icon: "🏥",
    feeEn: "Free (with minimal fee for certain medicines)",
    feeFil: "Libre (may maliit na halaga para sa ilang gamot)",
  },
  {
    id: 6,
    titleEn: "Community Tax Certificate (Cedula)",
    titleFil: "Community Tax Certificate (Cedula)",
    descEn: "Official tax certificate required for legal documents and transactions.",
    descFil: "Opisyal na sertipiko ng buwis na kinakailangan para sa mga legal na dokumento at transaksyon.",
    requirementsEn: ["Valid ID", "Proof of income (for employed individuals)", "Previous Cedula (for renewal)"],
    requirementsFil: ["Valid ID", "Patunay ng kita (para sa may trabaho)", "Nakaraang Cedula (para sa renewal)"],
    procedureEn: ["Go to the Barangay Hall Treasurer's office", "Fill out the Cedula application form", "Pay the corresponding community tax", "Receive your Community Tax Certificate"],
    procedureFil: ["Pumunta sa opisina ng Treasurer sa Barangay Hall", "Punan ang Cedula application form", "Magbayad ng kaukulang community tax", "Tanggapin ang inyong Community Tax Certificate"],
    icon: "📄",
    feeEn: "PHP 5.00 - PHP 100.00 (depends on income)",
    feeFil: "PHP 5.00 - PHP 100.00 (depende sa kita)",
  },
];

export interface Official {
  name: string;
  positionEn: string;
  positionFil: string;
  image: string;
  committee?: string;
}

export const officials: Official[] = [
  { name: "Juan M. Dela Cruz", positionEn: "Barangay Captain", positionFil: "Punong Barangay", image: "", committee: "Peace and Order" },
  { name: "Maria L. Santos", positionEn: "Councilor", positionFil: "Kagawad", image: "", committee: "Health and Sanitation" },
  { name: "Pedro R. Reyes", positionEn: "Councilor", positionFil: "Kagawad", image: "", committee: "Infrastructure" },
  { name: "Ana C. Gonzales", positionEn: "Councilor", positionFil: "Kagawad", image: "", committee: "Education and Culture" },
  { name: "Josefina B. Lopez", positionEn: "Councilor", positionFil: "Kagawad", image: "", committee: "Women and Family" },
  { name: "Carlos T. Rivera", positionEn: "Councilor", positionFil: "Kagawad", image: "", committee: "Agriculture" },
  { name: "Luzviminda D. Cruz", positionEn: "Councilor", positionFil: "Kagawad", image: "", committee: "Youth and Sports" },
  { name: "Ramon G. Flores", positionEn: "Councilor", positionFil: "Kagawad", image: "", committee: "Budget and Finance" },
  { name: "Mark Anthony B. Tan", positionEn: "SK Chairman", positionFil: "SK Chairman", image: "" },
  { name: "Diana M. Ramos", positionEn: "Secretary", positionFil: "Kalihim", image: "" },
  { name: "Jose R. Mercado", positionEn: "Treasurer", positionFil: "Tesorero", image: "" },
];

export interface EmergencyContact {
  nameEn: string;
  nameFil: string;
  number: string;
  icon: string;
}

export const emergencyContacts: EmergencyContact[] = [
  { nameEn: "Barangay Tanod", nameFil: "Barangay Tanod", number: "0917-123-4567", icon: "🛡️" },
  { nameEn: "Police (MPS)", nameFil: "Pulisya (MPS)", number: "0928-765-4321", icon: "🚔" },
  { nameEn: "Fire (BFP)", nameFil: "Bumbero (BFP)", number: "0939-555-1111", icon: "🚒" },
  { nameEn: "Barangay Health Center", nameFil: "Barangay Health Center", number: "0948-333-2222", icon: "🏥" },
  { nameEn: "Disaster Response (DRRM)", nameFil: "Disaster Response (DRRM)", number: "0956-777-8888", icon: "🚨" },
];

export interface GalleryItem {
  id: number;
  titleEn: string;
  titleFil: string;
  descriptionEn: string;
  descriptionFil: string;
  icon: string;
  color: string;
}

export const gallery: GalleryItem[] = [
  { id: 1, titleEn: "Barangay Hall", titleFil: "Barangay Hall", descriptionEn: "The seat of local governance serving the community.", descriptionFil: "Ang sentro ng lokal na pamahalaan na naglilingkod sa komunidad.", icon: "🏛️", color: "from-blue-500 to-blue-700" },
  { id: 2, titleEn: "Health Center", titleFil: "Health Center", descriptionEn: "Providing accessible healthcare services to all residents.", descriptionFil: "Nagbibigay ng abot-kayang serbisyo pangkalusugan sa lahat ng residente.", icon: "🏥", color: "from-green-500 to-green-700" },
  { id: 3, titleEn: "Barangay Plaza", titleFil: "Barangay Plaza", descriptionEn: "A public space for community gatherings and events.", descriptionFil: "Isang pampublikong lugar para sa mga pagtitipon at kaganapan ng komunidad.", icon: "🌳", color: "from-emerald-500 to-emerald-700" },
  { id: 4, titleEn: "Daycare Center", titleFil: "Daycare Center", descriptionEn: "Nurturing young minds with quality early education.", descriptionFil: "Nag-aalaga ng mga batang isipan na may kalidad na maagang edukasyon.", icon: "🧸", color: "from-pink-500 to-pink-700" },
  { id: 5, titleEn: "Covered Court", titleFil: "Covered Court", descriptionEn: "A multi-purpose venue for sports and community events.", descriptionFil: "Isang multi-purpose na lugar para sa palakasan at mga kaganapan ng komunidad.", icon: "🏀", color: "from-purple-500 to-purple-700" },
  { id: 6, titleEn: "Farmlands", titleFil: "Mga Sakahan", descriptionEn: "The agricultural heart of Barangay Maanahao.", descriptionFil: "Ang sentro ng agrikultura ng Barangay Maanahao.", icon: "🌾", color: "from-amber-500 to-amber-700" },
];
