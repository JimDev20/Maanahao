import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import type { Disbursement } from "./types";

export async function getDisbursements(fiscalYear?: number, page = 1, perPage = 50) {
  const pb = getPocketBase();
  const filter = fiscalYear ? `fiscal_year = ${fiscalYear}` : "";
  return handleApiCall(
    pb.collection("disbursements").getList(page, perPage, { filter, sort: "-date_disbursed" })
  );
}

export async function createDisbursement(data: Partial<Disbursement>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("disbursements").create(data));
}

export async function updateDisbursement(id: string, data: Partial<Disbursement>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("disbursements").update(id, data));
}

export async function deleteDisbursement(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("disbursements").delete(id));
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
