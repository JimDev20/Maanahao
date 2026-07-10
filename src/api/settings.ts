import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";

export async function getSetting(key: string): Promise<string | null> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(
      pb.collection("system_settings").getList(1, 1, { filter: `key = "${key}"` })
    );
    return result.items.length > 0 ? result.items[0].value : null;
  } catch {
    return null;
  }
}

export async function setSetting(key: string, value: string) {
  const pb = getPocketBase();
  const existing = await getSetting(key);
  if (existing !== null) {
    const result = await handleApiCall(
      pb.collection("system_settings").getList(1, 1, { filter: `key = "${key}"` })
    );
    if (result.items.length > 0) {
      return handleApiCall(
        pb.collection("system_settings").update(result.items[0].id, { value })
      );
    }
  }
  return handleApiCall(
    pb.collection("system_settings").create({ key, value })
  );
}
