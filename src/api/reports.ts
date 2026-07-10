import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";

export async function getDashboardStats(fiscalYear: number) {
  const pb = getPocketBase();

  const [residents, documents, blotter, revenues, disbursements] = await Promise.allSettled([
    pb.collection("residents").getList(1, 1),
    pb.collection("documents").getList(1, 100, { filter: `created >= "${fiscalYear}-01-01"` }),
    pb.collection("blotter").getList(1, 100, { filter: `created >= "${fiscalYear}-01-01"` }),
    pb.collection("revenues").getList(1, 1000, { filter: `fiscal_year = ${fiscalYear}` }),
    pb.collection("disbursements").getList(1, 1000, { filter: `fiscal_year = ${fiscalYear}` }),
  ]);

  const totalRevenue = revenues.status === "fulfilled"
    ? revenues.value.items.reduce((sum, r) => sum + r.amount, 0)
    : 0;

  const totalDisbursements = disbursements.status === "fulfilled"
    ? disbursements.value.items.reduce((sum, d) => sum + d.amount, 0)
    : 0;

  return {
    totalResidents: residents.status === "fulfilled" ? residents.value.totalItems : 0,
    totalDocuments: documents.status === "fulfilled" ? documents.value.totalItems : 0,
    pendingDocuments: documents.status === "fulfilled"
      ? documents.value.items.filter((d) => d.status === "pending").length
      : 0,
    totalBlotter: blotter.status === "fulfilled" ? blotter.value.totalItems : 0,
    activeBlotter: blotter.status === "fulfilled"
      ? blotter.value.items.filter((b) => !["settled", "closed"].includes(b.status)).length
      : 0,
    totalRevenue,
    totalDisbursements,
    balance: totalRevenue - totalDisbursements,
  };
}
