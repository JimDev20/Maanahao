import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  Legend,
} from "recharts";
import { useLang } from "../../lib/LanguageContext";
import {
  getDocumentStatusBreakdown,
  getGenderBreakdown,
  getMonthlyBlotter,
  getRevenueVsDisbursements,
  getFundSourceBreakdown,
} from "../../api/reports";

const COLORS = ["#2563eb", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899", "#06b6d4"];

export default function DashboardCharts() {
  const { lang } = useLang();
  const [genderData, setGenderData] = useState<{ name: string; value: number }[]>([]);
  const [docStatusData, setDocStatusData] = useState<{ name: string; value: number }[]>([]);
  const [monthlyBlotter, setMonthlyBlotter] = useState<{ month: string; count: number }[]>([]);
  const [revVsDis, setRevVsDis] = useState<{ month: string; revenue: number; disbursements: number }[]>([]);
  const [fundData, setFundData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    async function load() {
      try {
        const [gender, docs, blotter, revDis, funds] = await Promise.allSettled([
          getGenderBreakdown(),
          getDocumentStatusBreakdown(currentYear),
          getMonthlyBlotter(currentYear),
          getRevenueVsDisbursements(currentYear),
          getFundSourceBreakdown(currentYear),
        ]);
        if (gender.status === "fulfilled") setGenderData(gender.value);
        if (docs.status === "fulfilled") setDocStatusData(docs.value);
        if (blotter.status === "fulfilled") setMonthlyBlotter(blotter.value);
        if (revDis.status === "fulfilled") setRevVsDis(revDis.value);
        if (funds.status === "fulfilled") setFundData(funds.value);
      } catch (err) {
        console.error("Chart data load error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 animate-pulse">
            <div className="h-4 bg-neutral-100 rounded w-32 mb-4" />
            <div className="h-48 bg-neutral-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Gender Breakdown - Pie */}
      {genderData.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-sm font-bold text-neutral-900 mb-4">
            {lang === "en" ? "Residents by Gender" : "Mga Residente ayon sa Kasarian"}
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {genderData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Document Status - Bar */}
      {docStatusData.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-sm font-bold text-neutral-900 mb-4">
            {lang === "en" ? "Documents by Status" : "Mga Dokumento ayon sa Status"}
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={docStatusData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                {docStatusData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Monthly Blotter - Line */}
      {monthlyBlotter.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-sm font-bold text-neutral-900 mb-4">
            {lang === "en" ? "Blotter Cases by Month" : "Mga Kaso ng Blotter ayon sa Buwan"}
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlyBlotter}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Revenue vs Disbursements - Area */}
      {revVsDis.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-sm font-bold text-neutral-900 mb-4">
            {lang === "en" ? "Revenue vs Disbursements" : "Kita laban sa Gastos"}
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revVsDis}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
              <Legend />
              <Area type="monotone" dataKey="revenue" stroke="#10b981" fill="#10b98133" name="Revenue" />
              <Area type="monotone" dataKey="disbursements" stroke="#ef4444" fill="#ef444433" name="Disbursements" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Fund Sources - Pie */}
      {fundData.length > 0 && (
        <div className="bg-white rounded-2xl border border-neutral-200 p-6">
          <h3 className="text-sm font-bold text-neutral-900 mb-4">
            {lang === "en" ? "Fund Sources Breakdown" : "Paghahati ng Pinagmulan ng Pondo"}
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={fundData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              >
                {fundData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₱${Number(value).toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
