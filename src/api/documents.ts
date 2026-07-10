import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import type { DocumentRequest } from "./types";

export async function getDocumentRequests(page = 1, perPage = 50, filter = "", sort = "-created") {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("documents").getList(page, perPage, { filter, sort })
  );
}

export async function getDocumentRequest(id: string) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("documents").getOne(id));
}

export async function createDocumentRequest(data: Partial<DocumentRequest>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("documents").create(data));
}

export async function updateDocumentRequest(id: string, data: Partial<DocumentRequest>) {
  const pb = getPocketBase();
  return handleApiCall(pb.collection("documents").update(id, data));
}

export async function updateDocumentStatus(
  id: string,
  status: DocumentRequest["status"],
  notes?: string
) {
  const pb = getPocketBase();
  const updateData: Partial<DocumentRequest> = { status };
  if (notes) updateData.notes = notes;
  if (status === "released") {
    updateData.released_date = new Date().toISOString();
  }
  return handleApiCall(pb.collection("documents").update(id, updateData));
}

export async function getDocumentsByStatus(status: string) {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("documents").getList(1, 100, {
      filter: `status = "${status}"`,
      sort: "-created",
    })
  );
}
