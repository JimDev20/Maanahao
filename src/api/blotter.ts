import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import { executeWrite } from "./offline";
import type { Blotter } from "./types";

export async function getBlotterRecords(page = 1, perPage = 50, filter = "", sort = "-created") {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("blotter").getList(page, perPage, { filter, sort })
  );
}

export async function getBlotterRecord(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("blotter").getOne(id));
}

export async function createBlotterRecord(data: Partial<Blotter>) {
  return executeWrite("create", "blotter", data as Record<string, unknown>);
}

export async function updateBlotterRecord(id: string, data: Partial<Blotter>) {
  return executeWrite("update", "blotter", data as Record<string, unknown>, id);
}

export async function updateBlotterStatus(
  id: string,
  status: Blotter["status"],
  resolution?: string
) {
  const updateData: Partial<Blotter> = { status };
  if (resolution) updateData.resolution = resolution;
  return executeWrite("update", "blotter", updateData as Record<string, unknown>, id);
}

export async function getBlotterByStatus(status: string) {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("blotter").getList(1, 100, {
      filter: `status = "${status}"`,
      sort: "-created",
    })
  );
}
