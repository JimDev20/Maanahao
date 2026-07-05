import { createServerFn } from "@tanstack/react-start";

interface ContactData {
  name: string;
  contact: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface RequestData {
  name: string;
  contact: string;
  address: string;
  documentType: string;
  purpose: string;
  createdAt: string;
}

interface ReportData {
  name: string;
  contact: string;
  type: string;
  description: string;
  location: string;
  date: string;
  createdAt: string;
}

const contacts: ContactData[] = [];
const requests: RequestData[] = [];
const reports: ReportData[] = [];

export const submitContact = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as Omit<ContactData, "createdAt">)
  .handler(async ({ data }) => {
    const entry: ContactData = { ...data, createdAt: new Date().toISOString() };
    contacts.push(entry);
    console.log("[Contact]", entry);
    return { success: true, id: contacts.length };
  });

export const submitRequest = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as Omit<RequestData, "createdAt">)
  .handler(async ({ data }) => {
    const entry: RequestData = { ...data, createdAt: new Date().toISOString() };
    requests.push(entry);
    console.log("[Request]", entry);
    return { success: true, id: requests.length };
  });

export const submitReport = createServerFn({ method: "POST" })
  .validator((data: unknown) => data as Omit<ReportData, "createdAt">)
  .handler(async ({ data }) => {
    const entry: ReportData = { ...data, createdAt: new Date().toISOString() };
    reports.push(entry);
    console.log("[Report]", entry);
    return { success: true, id: reports.length };
  });
