import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import { executeWrite } from "./offline";
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
  return executeWrite("create", "documents", data as Record<string, unknown>);
}

export async function updateDocumentRequest(id: string, data: Partial<DocumentRequest>) {
  return executeWrite("update", "documents", data as Record<string, unknown>, id);
}

export async function updateDocumentStatus(
  id: string,
  status: DocumentRequest["status"],
  notes?: string
) {
  const updateData: Partial<DocumentRequest> = { status };
  if (notes) updateData.notes = notes;
  if (status === "released") {
    updateData.released_date = new Date().toISOString();
  }
  return executeWrite("update", "documents", updateData as Record<string, unknown>, id);
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
