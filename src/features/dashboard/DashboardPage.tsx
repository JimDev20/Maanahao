import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../../lib/auth/AuthContext";
import { useLang } from "../../lib/LanguageContext";
import { getDashboardStats } from "../../api/reports";
import { getRecentActivity } from "../../api/activity";
import type { ActivityLog } from "../../api/types";
import ScrollReveal from "../../components/ScrollReveal";
import DashboardCharts from "./DashboardCharts";

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const { lang } = useLang();
  const [stats, setStats] = useState<Record<string, number> | null>(null);
  const [activity, setActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    async function load() {
      try {
        const [statsData, activityData] = await Promise.allSettled([
          getDashboardStats(currentYear),
          getRecentActivity(10),
        ]);
        if (statsData.status === "fulfilled") setStats(statsData.value);
        if (activityData.status === "fulfilled") setActivity(activityData.value.items as unknown as ActivityLog[]);
      } catch (err) {
        console.error("Dashboard load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [currentYear]);

  const kpis = stats
    ? [
        { label: lang === "en" ? "Total Residents" : "Kabuuang Residente", value: stats.totalResidents, icon: "👥", color: "bg-blue-500" },
        { label: lang === "en" ? "Documents This Year" : "Dokumento Ngayong Taon", value: stats.totalDocuments, icon: "📄", color: "bg-emerald-500" },
        { label: lang === "en" ? "Pending Documents" : "Nakabinbing Dokumento", value: stats.pendingDocuments, icon: "⏳", color: "bg-amber-500" },
        { label: lang === "en" ? "Active Cases" : "Aktibong Kaso", value: stats.activeBlotter, icon: "📋", color: "bg-red-500" },
        { label: lang === "en" ? "Total Revenue" : "Kabuuang Kita", value: stats.totalRevenue, icon: "💰", color: "bg-green-500", isCurrency: true },
        { label: lang === "en" ? "Total Disbursements" : "Kabuuang Gastos", value: stats.totalDisbursements, icon: "💸", color: "bg-purple-500", isCurrency: true },
      ]
    : [];

  return (
    <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            {lang === "en" ? "Dashboard" : "Dashboard"}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {lang === "en"
              ? `Welcome back, ${user?.name || "Admin"}`
              : `Maligayang pagbalik, ${user?.name || "Admin"}`}
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors self-start"
        >
          {lang === "en" ? "Sign Out" : "Mag-sign Out"}
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 animate-pulse">
              <div className="h-4 bg-neutral-100 rounded w-24 mb-3" />
              <div className="h-8 bg-neutral-100 rounded w-16" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {kpis.map((kpi, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div className="bg-white rounded-2xl border border-neutral-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{kpi.icon}</span>
                    <span className={`size-8 rounded-lg ${kpi.color} opacity-20`} />
                  </div>
                  <p className="text-sm text-neutral-500 mb-1">{kpi.label}</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {kpi.isCurrency
                      ? `₱${kpi.value.toLocaleString()}`
                      : kpi.value.toLocaleString()}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-lg font-bold text-neutral-900 mb-4">
                  {lang === "en" ? "Quick Actions" : "Mabilis na Aksyon"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Link
                    to="/admin/residents"
                    className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 hover:bg-primary-light hover:border-primary/30 transition-all"
                  >
                    <span className="text-xl">👥</span>
                    <span className="text-sm font-medium text-neutral-700">
                      {lang === "en" ? "Residents" : "Mga Residente"}
                    </span>
                  </Link>
                  <Link
                    to="/admin/documents"
                    className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 hover:bg-primary-light hover:border-primary/30 transition-all"
                  >
                    <span className="text-xl">📄</span>
                    <span className="text-sm font-medium text-neutral-700">
                      {lang === "en" ? "Documents" : "Mga Dokumento"}
                    </span>
                  </Link>
                  <Link
                    to="/admin/blotter"
                    className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 hover:bg-primary-light hover:border-primary/30 transition-all"
                  >
                    <span className="text-xl">📋</span>
                    <span className="text-sm font-medium text-neutral-700">
                      {lang === "en" ? "Blotter" : "Blotter"}
                    </span>
                  </Link>
                  <Link
                    to="/admin/finance"
                    className="flex items-center gap-3 rounded-xl border border-neutral-200 p-4 hover:bg-primary-light hover:border-primary/30 transition-all"
                  >
                    <span className="text-xl">💰</span>
                    <span className="text-sm font-medium text-neutral-700">
                      {lang === "en" ? "Finance" : "Pinansyal"}
                    </span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                <h2 className="text-lg font-bold text-neutral-900 mb-4">
                  {lang === "en" ? "Recent Activity" : "Kamakailang Aktibidad"}
                </h2>
                {activity.length === 0 ? (
                  <p className="text-sm text-neutral-400 text-center py-8">
                    {lang === "en" ? "No recent activity" : "Walang kamakailang aktibidad"}
                  </p>
                ) : (
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {activity.map((log) => (
                      <div key={log.id} className="flex items-start gap-3 text-sm">
                        <div className="size-2 rounded-full bg-primary mt-1.5 shrink-0" />
                        <div>
                          <p className="text-neutral-700">
                            <span className="font-medium">{log.user || "System"}</span>{" "}
                            {log.action} in {log.collection}
                          </p>
                          <p className="text-xs text-neutral-400 mt-0.5">
                            {new Date(log.created).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-neutral-900 mb-4">
              {lang === "en" ? "Analytics" : "Analytics"}
            </h2>
            <DashboardCharts />
          </div>
        </>
      )}
    </div>
  );
}
