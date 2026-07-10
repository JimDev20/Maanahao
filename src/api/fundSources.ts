import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import type { FundSource } from "./types";

export async function getFundSources(fiscalYear?: number) {
  const pb = getPocketBase();
  const filter = fiscalYear ? `fiscal_year = ${fiscalYear}` : "";
  return handleApiCall(
    pb.collection("fund_sources").getList(1, 100, { filter })
  );
}

export async function createFundSource(data: Partial<FundSource>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("fund_sources").create(data));
}

export async function updateFundSource(id: string, data: Partial<FundSource>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("fund_sources").update(id, data));
}

export async function deleteFundSource(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("fund_sources").delete(id));
}
