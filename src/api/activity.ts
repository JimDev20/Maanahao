import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import type { ActivityLog } from "./types";

export async function getActivityLogs(page = 1, perPage = 50, filter = "") {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("activity_log").getList(page, perPage, { filter, sort: "-created" })
  );
}

export async function logActivity(data: {
  user?: string;
  action: string;
  collection: string;
  record_id?: string;
  details?: string;
}) {
  const pb = getPocketBase();
  try {
    return await handleApiCall(pb.collection("activity_log").create(data));
  } catch {
    console.warn("Failed to log activity");
    return null;
  }
}

export async function getRecentActivity(limit = 20) {
  const pb = getPocketBase();
  return handleApiCall(
    pb.collection("activity_log").getList(1, limit, { sort: "-created" })
  );
}
