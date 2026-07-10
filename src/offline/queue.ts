import { openDB, type IDBPDatabase } from "idb";

const DB_NAME = "barangay-maanahao-offline";
const DB_VERSION = 1;
const STORE_NAME = "pending-writes";

interface PendingWrite {
  id?: number;
  collection: string;
  action: "create" | "update" | "delete";
  recordId?: string;
  data?: unknown;
  timestamp: number;
}

let dbPromise: Promise<IDBPDatabase> | null = null;

function getDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
        }
      },
    });
  }
  return dbPromise;
}

export async function queueWrite(
  collection: string,
  action: "create" | "update" | "delete",
  data?: unknown,
  recordId?: string
) {
  const db = await getDB();
  const write: PendingWrite = {
    collection,
    action,
    data,
    recordId,
    timestamp: Date.now(),
  };
  return db.add(STORE_NAME, write);
}

export async function getPendingWrites(): Promise<PendingWrite[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function clearPendingWrite(id: number) {
  const db = await getDB();
  return db.delete(STORE_NAME, id);
}

export async function clearAllPendingWrites() {
  const db = await getDB();
  return db.clear(STORE_NAME);
}

export async function getPendingWriteCount(): Promise<number> {
  const db = await getDB();
  return db.count(STORE_NAME);
}

export type { PendingWrite };
