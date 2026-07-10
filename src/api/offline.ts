import { getPocketBase } from "./client";
import { queueWrite } from "../offline/queue";

export interface OfflineResult {
  id: string;
  queued: boolean;
  [key: string]: unknown;
}

export async function executeWrite<T extends Record<string, unknown>>(
  action: "create" | "update" | "delete",
  collection: string,
  data?: T,
  recordId?: string
): Promise<OfflineResult> {
  if (navigator.onLine) {
    const pb = getPocketBase();
    let result: Record<string, unknown>;
    switch (action) {
      case "create":
        result = await pb.collection(collection).create(data as Record<string, unknown>);
        break;
      case "update":
        result = recordId
          ? await pb.collection(collection).update(recordId, data as Record<string, unknown>)
          : {};
        break;
      case "delete":
        result = recordId
          ? (await pb.collection(collection).delete(recordId) as unknown as Record<string, unknown>)
          : {};
        break;
    }
    return { ...result, queued: false } as OfflineResult;
  }

  await queueWrite(collection, action, data, recordId);
  return {
    id: recordId || `queued-${Date.now()}`,
    queued: true,
    ...data,
  } as OfflineResult;
}
