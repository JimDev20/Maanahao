import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import type { Resident } from "./types";

export async function getResidents(page = 1, perPage = 50, filter = "", sort = "-created") {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("residents").getList(page, perPage, { filter, sort })
  );
}

export async function getResident(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("residents").getOne(id));
}

export async function createResident(data: Partial<Resident>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("residents").create(data));
}

export async function updateResident(id: string, data: Partial<Resident>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("residents").update(id, data));
}

export async function deleteResident(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("residents").delete(id));
}

export async function searchResidents(query: string) {
  const pb = getPocketBase();
  const filter = `first_name ~ "${query}" || last_name ~ "${query}" || phone ~ "${query}"`;
  return handleApiCall(
    pb.collection("residents").getList(1, 20, { filter })
  );
}
