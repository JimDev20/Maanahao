import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import type { Asset } from "./types";

export async function getAssets(page = 1, perPage = 50, filter = "") {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("assets").getList(page, perPage, { filter })
  );
}

export async function createAsset(data: Partial<Asset>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("assets").create(data));
}

export async function updateAsset(id: string, data: Partial<Asset>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("assets").update(id, data));
}

export async function deleteAsset(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("assets").delete(id));
}
