import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import { executeWrite } from "./offline";
import type { FundSource } from "./types";

export async function getFundSources(fiscalYear?: number) {
  const pb = getPocketBase();
  const filter = fiscalYear ? `fiscal_year = ${fiscalYear}` : "";
  return handleApiCall(
    pb.collection("fund_sources").getList(1, 100, { filter })
  );
}

export async function createFundSource(data: Partial<FundSource>) {
  return executeWrite("create", "fund_sources", data as Record<string, unknown>);
}

export async function updateFundSource(id: string, data: Partial<FundSource>) {
  return executeWrite("update", "fund_sources", data as Record<string, unknown>, id);
}

export async function deleteFundSource(id: string) {
  return executeWrite("delete", "fund_sources", undefined, id);
}
