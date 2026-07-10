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

export async function getGenderBreakdown(): Promise<{ name: string; value: number }[]> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(pb.collection("residents").getList(1, 1000));
    const counts: Record<string, number> = {};
    for (const r of result.items) {
      const g = r.gender || "Unknown";
      counts[g] = (counts[g] || 0) + 1;
    }
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  } catch {
    return [];
  }
}

export async function getDocumentStatusBreakdown(fiscalYear: number): Promise<{ name: string; value: number }[]> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(
      pb.collection("documents").getList(1, 1000, { filter: `created >= "${fiscalYear}-01-01"` })
    );
    const counts: Record<string, number> = {};
    for (const d of result.items) {
      const s = d.status || "unknown";
      counts[s] = (counts[s] || 0) + 1;
    }
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  } catch {
    return [];
  }
}

export async function getMonthlyBlotter(fiscalYear: number): Promise<{ month: string; count: number }[]> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(
      pb.collection("blotter").getList(1, 1000, { filter: `created >= "${fiscalYear}-01-01"` })
    );
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const counts: Record<number, number> = {};
    for (const b of result.items) {
      const month = new Date(b.created).getMonth();
      counts[month] = (counts[month] || 0) + 1;
    }
    return monthNames.map((month, i) => ({ month, count: counts[i] || 0 }));
  } catch {
    return [];
  }
}

export async function getRevenueVsDisbursements(
  fiscalYear: number
): Promise<{ month: string; revenue: number; disbursements: number }[]> {
  const pb = getPocketBase();
  try {
    const [revResult, disResult] = await Promise.allSettled([
      handleApiCall(pb.collection("revenues").getList(1, 1000, { filter: `fiscal_year = ${fiscalYear}` })),
      handleApiCall(pb.collection("disbursements").getList(1, 1000, { filter: `fiscal_year = ${fiscalYear}` })),
    ]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const revByMonth: Record<number, number> = {};
    const disByMonth: Record<number, number> = {};

    if (revResult.status === "fulfilled") {
      for (const r of revResult.value.items) {
        const m = new Date(r.date_collected || r.created).getMonth();
        revByMonth[m] = (revByMonth[m] || 0) + r.amount;
      }
    }
    if (disResult.status === "fulfilled") {
      for (const d of disResult.value.items) {
        const m = new Date(d.date_disbursed || d.created).getMonth();
        disByMonth[m] = (disByMonth[m] || 0) + d.amount;
      }
    }

    return monthNames.map((month, i) => ({
      month,
      revenue: revByMonth[i] || 0,
      disbursements: disByMonth[i] || 0,
    }));
  } catch {
    return [];
  }
}

export async function getFundSourceBreakdown(fiscalYear: number): Promise<{ name: string; value: number }[]> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(
      pb.collection("fund_sources").getList(1, 100, { filter: `fiscal_year = ${fiscalYear}` })
    );
    return result.items.map((f: Record<string, unknown>) => ({
      name: f.source_name as string || "Unknown",
      value: f.amount as number || 0,
    }));
  } catch {
    return [];
  }
}
