import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import { executeWrite } from "./offline";
import type { Disbursement } from "./types";

export async function getDisbursements(fiscalYear?: number, page = 1, perPage = 50) {
  const pb = getPocketBase();
  const filter = fiscalYear ? `fiscal_year = ${fiscalYear}` : "";
  return handleApiCall(
    pb.collection("disbursements").getList(page, perPage, { filter, sort: "-date_disbursed" })
  );
}

export async function createDisbursement(data: Partial<Disbursement>) {
  return executeWrite("create", "disbursements", data as Record<string, unknown>);
}

export async function updateDisbursement(id: string, data: Partial<Disbursement>) {
  return executeWrite("update", "disbursements", data as Record<string, unknown>, id);
}

export async function deleteDisbursement(id: string) {
  return executeWrite("delete", "disbursements", undefined, id);
}

export async function getTotalDisbursements(fiscalYear: number) {
  const pb = getPocketBase();
  const result = await handleApiCall(
    pb.collection("disbursements").getList(1, 1000, {
      filter: `fiscal_year = ${fiscalYear}`,
    })
  );
  return result.items.reduce((sum, d) => sum + d.amount, 0);
}
