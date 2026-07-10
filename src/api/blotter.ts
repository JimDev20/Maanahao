import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
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
  const pb = getPocketBase();
  return handleApiCall(pb.collection("blotter").create(data));
}

export async function updateBlotterRecord(id: string, data: Partial<Blotter>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("blotter").update(id, data));
}

export async function updateBlotterStatus(
  id: string,
  status: Blotter["status"],
  resolution?: string
) {
  const pb = getPocketBase();
  const updateData: Partial<Blotter> = { status };
  if (resolution) updateData.resolution = resolution;
  return handleApiCall(pb.collection("blotter").update(id, updateData));
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
