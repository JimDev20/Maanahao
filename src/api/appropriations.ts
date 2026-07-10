import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import type { Appropriation } from "./types";

export async function getAppropriations(fiscalYear?: number) {
  const pb = getPocketBase();
  const filter = fiscalYear ? `fiscal_year = ${fiscalYear}` : "";
  return handleApiCall(
    pb.collection("appropriations").getList(1, 100, { filter, sort: "-created" })
  );
}

export async function createAppropriation(data: Partial<Appropriation>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("appropriations").create(data));
}

export async function updateAppropriation(id: string, data: Partial<Appropriation>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("appropriations").update(id, data));
}

export async function deleteAppropriation(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("appropriations").delete(id));
}

export async function getAppropriationSummary(fiscalYear: number) {
  const pb = getPocketBase();
  const result = await handleApiCall(
    pb.collection("appropriations").getList(1, 100, {
      filter: `fiscal_year = ${fiscalYear}`,
    })
  );
  const summary = { PS: 0, MOOE: 0, CO: 0, total: 0 };
  for (const item of result.items) {
    summary[item.expense_class as keyof typeof summary] += item.amount;
    summary.total += item.amount;
  }
  return summary;
}
