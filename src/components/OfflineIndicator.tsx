import { useState, useEffect } from "react";
import {
  getCurrentSyncStatus,
  onSyncStatusChange,
  type SyncStatus,
} from "../offline/syncManager";
import { getPendingWriteCount } from "../offline/queue";

export default function OfflineIndicator() {
  const [status, setStatus] = useState<SyncStatus>(getCurrentSyncStatus());
  const [pendingCount, setPendingCount] = useState(0);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const unsub = onSyncStatusChange(setStatus);
    return unsub;
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const count = await getPendingWriteCount();
      setPendingCount(count);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (isOnline && status !== "syncing" && pendingCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div
        className={`rounded-xl px-4 py-3 shadow-lg border text-sm font-medium flex items-center gap-2 ${
          !isOnline
            ? "bg-amber-50 border-amber-200 text-amber-700"
            : status === "syncing"
            ? "bg-blue-50 border-blue-200 text-blue-700"
            : status === "error"
            ? "bg-red-50 border-red-200 text-red-700"
            : "bg-green-50 border-green-200 text-green-700"
        }`}
      >
        {!isOnline ? (
          <>
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.242 2.829a5 5 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3" />
            </svg>
            Offline
            {pendingCount > 0 && (
              <span className="bg-amber-200 text-amber-800 rounded-full px-2 py-0.5 text-xs">
                {pendingCount} pending
              </span>
            )}
          </>
        ) : status === "syncing" ? (
          <>
            <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Syncing...
          </>
        ) : status === "error" ? (
          <>
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Sync failed
            {pendingCount > 0 && (
              <span className="bg-red-200 text-red-800 rounded-full px-2 py-0.5 text-xs">
                {pendingCount} pending
              </span>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
