import PocketBase from "pocketbase";

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8090";

let pb: PocketBase | null = null;

export function getPocketBase(): PocketBase {
  if (!pb) {
    pb = new PocketBase(API_URL);
    pb.autoCancellation(false);
  }
  return pb;
}

export function getApiUrl(): string {
  return API_URL;
}
