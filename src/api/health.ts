import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import { executeWrite } from "./offline";

export interface SystemHealthRecord {
  id: string;
  status: "healthy" | "degraded" | "down";
  pocketbase_latency_ms: number;
  message: string;
  created: string;
}

export interface SystemErrorRecord {
  id: string;
  error_type: "api_error" | "js_error" | "network_error";
  message: string;
  stack: string;
  url: string;
  created: string;
}

export async function checkPocketBaseHealth(): Promise<{
  status: "healthy" | "degraded" | "down";
  latencyMs: number;
}> {
  const start = performance.now();
  try {
    const pb = getPocketBase();
    await pb.health.check();
    const latencyMs = Math.round(performance.now() - start);
    const status = latencyMs < 1000 ? "healthy" : "degraded";
    return { status, latencyMs };
  } catch {
    return { status: "down", latencyMs: Math.round(performance.now() - start) };
  }
}

export async function logHealthCheck(
  status: "healthy" | "degraded" | "down",
  latencyMs: number,
  message?: string
) {
  try {
    await executeWrite("create", "system_health", {
      status,
      pocketbase_latency_ms: latencyMs,
      message: message || `Health check: ${status}`,
    } as Record<string, unknown>);
  } catch {
    // silently fail
  }
}

export async function logSystemError(
  errorType: SystemErrorRecord["error_type"],
  message: string,
  stack?: string,
  url?: string
) {
  try {
    await executeWrite("create", "system_errors", {
      error_type: errorType,
      message: message.substring(0, 500),
      stack: stack || "",
      url: url || window.location.href,
    } as Record<string, unknown>);
  } catch {
    // silently fail
  }
}

export async function getRecentErrors(limit = 50): Promise<SystemErrorRecord[]> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(
      pb.collection("system_errors").getList(1, limit, { sort: "-created" })
    );
    return result.items as unknown as SystemErrorRecord[];
  } catch {
    return [];
  }
}

export async function getRecentHealthChecks(limit = 20): Promise<SystemHealthRecord[]> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(
      pb.collection("system_health").getList(1, limit, { sort: "-created" })
    );
    return result.items as unknown as SystemHealthRecord[];
  } catch {
    return [];
  }
}

export async function getErrorCountByType(): Promise<Record<string, number>> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(
      pb.collection("system_errors").getList(1, 1000, { sort: "-created" })
    );
    const counts: Record<string, number> = { api_error: 0, js_error: 0, network_error: 0 };
    for (const item of result.items) {
      counts[item.error_type] = (counts[item.error_type] || 0) + 1;
    }
    return counts;
  } catch {
    return { api_error: 0, js_error: 0, network_error: 0 };
  }
}
