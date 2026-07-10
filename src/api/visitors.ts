import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import type { Visitor } from "./types";

export async function getVisitors(page = 1, perPage = 50) {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("visitors").getList(page, perPage, { sort: "-check_in" })
  );
}

export async function checkInVisitor(data: { visitor_name: string; purpose: string }) {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("visitors").create({
      ...data,
      check_in: new Date().toISOString(),
    })
  );
}

export async function checkOutVisitor(id: string) {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("visitors").update(id, {
      check_out: new Date().toISOString(),
    })
  );
}
