import { useState, useEffect, useCallback } from "react";
import { useLang } from "../../lib/LanguageContext";
import {
  checkPocketBaseHealth,
  logHealthCheck,
  getRecentErrors,
  getRecentHealthChecks,
  getErrorCountByType,
  type SystemErrorRecord,
  type SystemHealthRecord,
} from "../../api/health";
import { getPendingWriteCount } from "../../offline/queue";
import { getCurrentSyncStatus } from "../../offline/syncManager";

export default function MonitoringPage() {
  const { lang } = useLang();
  const [health, setHealth] = useState<{ status: string; latencyMs: number } | null>(null);
  const [errors, setErrors] = useState<SystemErrorRecord[]>([]);
  const [healthHistory, setHealthHistory] = useState<SystemHealthRecord[]>([]);
  const [errorCounts, setErrorCounts] = useState<Record<string, number>>({});
  const [pendingWrites, setPendingWrites] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const [healthResult, errorsData, healthData, counts, pending] = await Promise.allSettled([
        checkPocketBaseHealth(),
        getRecentErrors(20),
        getRecentHealthChecks(20),
        getErrorCountByType(),
        getPendingWriteCount(),
      ]);

      if (healthResult.status === "fulfilled") {
        setHealth(healthResult.value);
        await logHealthCheck(healthResult.value.status, healthResult.value.latencyMs);
      }
      if (errorsData.status === "fulfilled") setErrors(errorsData.value);
      if (healthData.status === "fulfilled") setHealthHistory(healthData.value);
      if (counts.status === "fulfilled") setErrorCounts(counts.value);
      if (pending.status === "fulfilled") setPendingWrites(pending.value);
    } catch (err) {
      console.error("Monitoring refresh error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    const interval = setInterval(refresh, 30000);
    return () => clearInterval(interval);
  }, [refresh]);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => setUptime(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(interval);
  }, []);

  function formatUptime(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-500";
      case "degraded": return "bg-amber-500";
      case "down": return "bg-red-500";
      default: return "bg-neutral-400";
    }
  };

  const statusBg = (status: string) => {
    switch (status) {
      case "healthy": return "bg-green-50 border-green-200 text-green-700";
      case "degraded": return "bg-amber-50 border-amber-200 text-amber-700";
      case "down": return "bg-red-50 border-red-200 text-red-700";
      default: return "bg-neutral-50 border-neutral-200 text-neutral-700";
    }
  };

  const syncStatus = getCurrentSyncStatus();

  if (loading) {
    return (
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-100 rounded w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-28 bg-neutral-100 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            {lang === "en" ? "System Monitor" : "System Monitor"}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {lang === "en"
              ? "API health, error tracking, and offline queue status"
              : "Kalusugan ng API, pagsubaybay sa error, at status ng offline queue"}
          </p>
        </div>
        <button
          onClick={refresh}
          className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors self-start"
        >
          Refresh
        </button>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* API Status */}
        <div className={`rounded-2xl border p-5 ${statusBg(health?.status || "unknown")}`}>
          <div className="flex items-center gap-2 mb-2">
            <div className={`size-3 rounded-full ${statusColor(health?.status || "unknown")}`} />
            <span className="text-sm font-semibold">
              {lang === "en" ? "API Status" : "Status ng API"}
            </span>
          </div>
          <p className="text-2xl font-bold capitalize">{health?.status || "Unknown"}</p>
          <p className="text-xs mt-1 opacity-75">{health?.latencyMs || 0}ms latency</p>
        </div>

        {/* Uptime */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <p className="text-sm font-semibold text-neutral-500 mb-2">
            {lang === "en" ? "Session Uptime" : "Oras ng Session"}
          </p>
          <p className="text-2xl font-bold text-neutral-900">{formatUptime(uptime)}</p>
        </div>

        {/* Offline Queue */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <p className="text-sm font-semibold text-neutral-500 mb-2">
            {lang === "en" ? "Offline Queue" : "Offline Queue"}
          </p>
          <p className="text-2xl font-bold text-neutral-900">{pendingWrites}</p>
          <p className="text-xs text-neutral-400 mt-1 capitalize">Sync: {syncStatus}</p>
        </div>

        {/* Total Errors */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-5">
          <p className="text-sm font-semibold text-neutral-500 mb-2">
            {lang === "en" ? "Total Errors" : "Kabuuang Error"}
          </p>
          <p className="text-2xl font-bold text-neutral-900">
            {Object.values(errorCounts).reduce((a, b) => a + b, 0)}
          </p>
          <div className="flex gap-2 mt-1 text-xs">
            <span className="text-red-500">API: {errorCounts.api_error || 0}</span>
            <span className="text-amber-500">JS: {errorCounts.js_error || 0}</span>
            <span className="text-blue-500">Net: {errorCounts.network_error || 0}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health History */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-lg font-bold text-neutral-900 mb-4">
            {lang === "en" ? "Health Check History" : "Kasaysayan ng Health Check"}
          </h2>
          {healthHistory.length === 0 ? (
            <p className="text-sm text-neutral-400 text-center py-8">
              {lang === "en" ? "No health checks recorded yet" : "Walang health check na naitala"}
            </p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {healthHistory.map((check) => (
                <div key={check.id} className="flex items-center gap-3 text-sm py-2 border-b border-neutral-100 last:border-0">
                  <div className={`size-2.5 rounded-full shrink-0 ${statusColor(check.status)}`} />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-neutral-700 capitalize">{check.status}</p>
                    <p className="text-xs text-neutral-400">{check.message}</p>
                  </div>
                  <span className="text-xs text-neutral-400 shrink-0">{check.pocketbase_latency_ms}ms</span>
                  <span className="text-xs text-neutral-400 shrink-0">
                    {new Date(check.created).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Error Log */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h2 className="text-lg font-bold text-neutral-900 mb-4">
            {lang === "en" ? "Recent Errors" : "Kamakailang Error"}
          </h2>
          {errors.length === 0 ? (
            <p className="text-sm text-neutral-400 text-center py-8">
              {lang === "en" ? "No errors recorded" : "Walang error na naitala"}
            </p>
          ) : (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {errors.map((err) => (
                <div key={err.id} className="text-sm py-2 border-b border-neutral-100 last:border-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      err.error_type === "api_error"
                        ? "bg-red-100 text-red-700"
                        : err.error_type === "js_error"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}>
                      {err.error_type}
                    </span>
                    <span className="text-xs text-neutral-400">
                      {new Date(err.created).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-neutral-700 font-medium">{err.message}</p>
                  {err.url && (
                    <p className="text-xs text-neutral-400 mt-0.5 truncate">{err.url}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
