export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

export async function handleApiCall<T>(promise: Promise<T>): Promise<T> {
  try {
    return await promise;
  } catch (err: unknown) {
    if (err && typeof err === "object" && "status" in err) {
      const e = err as { status: number; message: string; data?: unknown };
      throw new ApiError(e.message || "API request failed", e.status, e.data);
    }
    throw new ApiError(
      err instanceof Error ? err.message : "Unknown error",
      0
    );
  }
}

export function isRetryable(status: number): boolean {
  return status === 429 || status === 503;
}

export async function withRetry<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  let lastError: ApiError | null = null;
  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await fn();
    } catch (err) {
      if (err instanceof ApiError && isRetryable(err.status) && i < maxRetries) {
        lastError = err;
        const delay = Math.min(2000 * Math.pow(2, i), 30000);
        await new Promise((r) => setTimeout(r, delay));
        continue;
      }
      throw err;
    }
  }
  throw lastError;
}
