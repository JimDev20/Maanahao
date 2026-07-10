import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import { executeWrite } from "./offline";
import type { Revenue } from "./types";

export async function getRevenues(fiscalYear?: number, page = 1, perPage = 50) {
  const pb = getPocketBase();
  const filter = fiscalYear ? `fiscal_year = ${fiscalYear}` : "";
  return handleApiCall(
    pb.collection("revenues").getList(page, perPage, { filter, sort: "-date_collected" })
  );
}

export async function createRevenue(data: Partial<Revenue>) {
  return executeWrite("create", "revenues", data as Record<string, unknown>);
}

export async function updateRevenue(id: string, data: Partial<Revenue>) {
  return executeWrite("update", "revenues", data as Record<string, unknown>, id);
}

export async function deleteRevenue(id: string) {
  return executeWrite("delete", "revenues", undefined, id);
}

export async function getTotalRevenue(fiscalYear: number) {
  const pb = getPocketBase();
  const result = await handleApiCall(
    pb.collection("revenues").getList(1, 1000, {
      filter: `fiscal_year = ${fiscalYear}`,
    })
  );
  return result.items.reduce((sum, r) => sum + r.amount, 0);
}
