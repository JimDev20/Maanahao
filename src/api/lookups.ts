import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import type { Lookup } from "./types";

export async function getLookups(group?: string) {
  const pb = getPocketBase();
  const filter = group ? `group = "${group}"` : "";
  return handleApiCall(
    pb.collection("lookups").getList(1, 100, { filter })
  );
}

export async function getLookupValues(group: string): Promise<string[]> {
  const pb = getPocketBase();
  const result = await handleApiCall(
    pb.collection("lookups").getList(1, 1, { filter: `group = "${group}"` })
  );
  if (result.items.length > 0) {
    try {
      return JSON.parse(result.items[0].values);
    } catch {
      return [];
    }
  }
  return [];
}
