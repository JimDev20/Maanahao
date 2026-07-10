export interface Resident {
  id: string;
  first_name: string;
  last_name: string;
  middle_name?: string;
  suffix?: string;
  gender: "male" | "female" | "other";
  birth_date: string;
  age: number;
  civil_status: string;
  nationality: string;
  ethnicity?: string;
  address: string;
  purok?: string;
  phone?: string;
  email?: string;
  occupation?: string;
  monthly_income?: number;
  is_voter: boolean;
  is_senior: boolean;
  is_pwd: boolean;
  is_4ps: boolean;
  is_deceased: boolean;
  is_migrant: boolean;
  government_assistance?: string;
  religion?: string;
  education?: string;
  household_id?: string;
  created: string;
  updated: string;
}

export interface DocumentRequest {
  id: string;
  request_number: string;
  resident_id?: string;
  requestor_name: string;
  contact_info: string;
  address: string;
  document_type: string;
  purpose: string;
  status: "pending" | "under_review" | "processing" | "for_release" | "released" | "cancelled";
  fee: number;
  notes?: string;
  released_date?: string;
  released_by?: string;
  created: string;
  updated: string;
}

export interface Blotter {
  id: string;
  blotter_number: string;
  complainant_name: string;
  complainant_contact?: string;
  respondent_name?: string;
  incident_type: string;
  description: string;
  location: string;
  incident_date: string;
  status: "filed" | "under_investigation" | "for_hearing" | "settled" | "escalated" | "closed";
  hearing_date?: string;
  settlement_notes?: string;
  resolution?: string;
  created_by?: string;
  created: string;
  updated: string;
}

export interface Appropriation {
  id: string;
  fiscal_year: number;
  expense_class: "PS" | "MOOE" | "CO";
  description: string;
  amount: number;
  fund_source_id?: string;
  created: string;
  updated: string;
}

export interface FundSource {
  id: string;
  name: string;
  code: string;
  statutory_rule?: string;
  total_amount: number;
  fiscal_year: number;
  created: string;
  updated: string;
}

export interface Revenue {
  id: string;
  income_account_id?: string;
  description: string;
  amount: number;
  date_collected: string;
  collector?: string;
  reference_number?: string;
  fiscal_year: number;
  created: string;
  updated: string;
}

export interface Disbursement {
  id: string;
  obligation_id?: string;
  payee: string;
  description: string;
  amount: number;
  date_disbursed: string;
  payment_method?: string;
  reference_number?: string;
  approved_by?: string;
  fiscal_year: number;
  created: string;
  updated: string;
}

export interface ActivityLog {
  id: string;
  user?: string;
  action: string;
  collection: string;
  record_id?: string;
  details?: string;
  created: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "staff" | "viewer";
  created: string;
  updated: string;
}

export type UserRole = "admin" | "staff" | "viewer";
