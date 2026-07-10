import { getPocketBase } from "../api/client";
import {
  getPendingWrites,
  clearPendingWrite,
  type PendingWrite,
} from "./queue";

export type SyncStatus = "idle" | "syncing" | "error" | "complete";

let currentStatus: SyncStatus = "idle";
let statusListeners: ((status: SyncStatus) => void)[] = [];

export function onSyncStatusChange(listener: (status: SyncStatus) => void) {
  statusListeners.push(listener);
  return () => {
    statusListeners = statusListeners.filter((l) => l !== listener);
  };
}

function setStatus(status: SyncStatus) {
  currentStatus = status;
  statusListeners.forEach((l) => l(status));
}

export function getCurrentSyncStatus(): SyncStatus {
  return currentStatus;
}

async function processWrite(write: PendingWrite): Promise<boolean> {
  const pb = getPocketBase();
  try {
    switch (write.action) {
      case "create":
        await pb.collection(write.collection).create(write.data as Record<string, unknown>);
        break;
      case "update":
        if (write.recordId) {
          await pb.collection(write.collection).update(write.recordId, write.data as Record<string, unknown>);
        }
        break;
      case "delete":
        if (write.recordId) {
          await pb.collection(write.collection).delete(write.recordId);
        }
        break;
    }
    return true;
  } catch {
    return false;
  }
}

export async function syncPendingWrites(): Promise<{ synced: number; failed: number }> {
  if (currentStatus === "syncing") return { synced: 0, failed: 0 };

  setStatus("syncing");
  const pending = await getPendingWrites();

  if (pending.length === 0) {
    setStatus("complete");
    return { synced: 0, failed: 0 };
  }

  let synced = 0;
  let failed = 0;

  for (const write of pending) {
    const success = await processWrite(write);
    if (success && write.id) {
      await clearPendingWrite(write.id);
      synced++;
    } else {
      failed++;
    }
  }

  setStatus(failed > 0 ? "error" : "complete");
  return { synced, failed };
}

export function startAutoSync(intervalMs = 30000) {
  const interval = setInterval(() => {
    if (navigator.onLine && currentStatus !== "syncing") {
      syncPendingWrites();
    }
  }, intervalMs);

  window.addEventListener("online", () => {
    syncPendingWrites();
  });

  return () => {
    clearInterval(interval);
    window.removeEventListener("online", syncPendingWrites);
  };
}
