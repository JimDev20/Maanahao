import { useState, useEffect, useCallback } from "react";
import { useLang } from "../../lib/LanguageContext";
import { getAppropriations, createAppropriation, deleteAppropriation, getAppropriationSummary } from "../../api/appropriations";
import { getFundSources, createFundSource, deleteFundSource } from "../../api/fundSources";
import { getRevenues, createRevenue, deleteRevenue } from "../../api/revenues";
import { getDisbursements, createDisbursement, deleteDisbursement } from "../../api/disbursements";
import type { Appropriation, FundSource, Revenue, Disbursement } from "../../api/types";
import ScrollReveal from "../../components/ScrollReveal";

type Tab = "overview" | "appropriations" | "fund_sources" | "revenues" | "disbursements";

const EXPENSE_CLASS_LABELS: Record<string, { en: string; fil: string }> = {
  PS: { en: "Personnel Services", fil: "Serbisyo ng Tao" },
  MOOE: { en: "Maintenance & Other Operating Expenses", fil: "Pagpapanatili at Iba pang Gastos" },
  CO: { en: "Capital Outlay", fil: "Gastos sa Kabisera" },
};

export default function FinancePage() {
  const { lang } = useLang();
  const currentYear = new Date().getFullYear();
  const [tab, setTab] = useState<Tab>("overview");
  const [fiscalYear, setFiscalYear] = useState(currentYear);
  const [appropriations, setAppropriations] = useState<Appropriation[]>([]);
  const [fundSources, setFundSources] = useState<FundSource[]>([]);
  const [revenues, setRevenues] = useState<Revenue[]>([]);
  const [disbursements, setDisbursements] = useState<Disbursement[]>([]);
  const [summary, setSummary] = useState({ PS: 0, MOOE: 0, CO: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [appForm, setAppForm] = useState({ expense_class: "PS", description: "", amount: 0, fund_source_id: "" });
  const [revForm, setRevForm] = useState({ description: "", amount: 0, date_collected: "", collector: "" });
  const [disbForm, setDisbForm] = useState({ payee: "", description: "", amount: 0, date_disbursed: "", payment_method: "" });
  const [fsForm, setFsForm] = useState({ name: "", code: "", statutory_rule: "", total_amount: 0 });

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [appResult, fsResult, revResult, disbResult, summResult] = await Promise.allSettled([
        getAppropriations(fiscalYear),
        getFundSources(fiscalYear),
        getRevenues(fiscalYear),
        getDisbursements(fiscalYear),
        getAppropriationSummary(fiscalYear),
      ]);
      if (appResult.status === "fulfilled") setAppropriations(appResult.value.items as unknown as Appropriation[]);
      if (fsResult.status === "fulfilled") setFundSources(fsResult.value.items as unknown as FundSource[]);
      if (revResult.status === "fulfilled") setRevenues(revResult.value.items as unknown as Revenue[]);
      if (disbResult.status === "fulfilled") setDisbursements(disbResult.value.items as unknown as Disbursement[]);
      if (summResult.status === "fulfilled") setSummary(summResult.value);
    } catch (err) {
      console.error("Failed to load finance data:", err);
    } finally {
      setLoading(false);
    }
  }, [fiscalYear]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const totalRevenue = revenues.reduce((s, r) => s + r.amount, 0);
  const totalDisbursements = disbursements.reduce((s, d) => s + d.amount, 0);
  const balance = totalRevenue - totalDisbursements;

  const [error, setError] = useState("");

  const handleCreateAppropriation = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createAppropriation({ ...appForm, expense_class: appForm.expense_class as "PS" | "MOOE" | "CO", fiscal_year: fiscalYear });
      setShowForm(false);
      loadAll();
    } catch (err) {
      console.error("Failed to create appropriation:", err);
      setError(lang === "en" ? "Failed to save. The server may be unreachable." : "Nabigo ang pag-save. Maaaring hindi maabot ang server.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateRevenue = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createRevenue({ ...revForm, fiscal_year: fiscalYear });
      setShowForm(false);
      loadAll();
    } catch (err) {
      console.error("Failed to create revenue:", err);
      setError(lang === "en" ? "Failed to save. The server may be unreachable." : "Nabigo ang pag-save. Maaaring hindi maabot ang server.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateDisbursement = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createDisbursement({ ...disbForm, fiscal_year: fiscalYear });
      setShowForm(false);
      loadAll();
    } catch (err) {
      console.error("Failed to create disbursement:", err);
      setError(lang === "en" ? "Failed to save. The server may be unreachable." : "Nabigo ang pag-save. Maaaring hindi maabot ang server.");
    } finally {
      setSaving(false);
    }
  };

  const handleCreateFundSource = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await createFundSource({ ...fsForm, fiscal_year: fiscalYear });
      setShowForm(false);
      loadAll();
    } catch (err) {
      console.error("Failed to create fund source:", err);
      setError(lang === "en" ? "Failed to save. The server may be unreachable." : "Nabigo ang pag-save. Maaaring hindi maabot ang server.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm(lang === "en" ? "Delete this item?" : "I-delete ang item na ito?")) return;
    setError("");
    try {
      if (type === "appropriation") await deleteAppropriation(id);
      if (type === "revenue") await deleteRevenue(id);
      if (type === "disbursement") await deleteDisbursement(id);
      if (type === "fund_source") await deleteFundSource(id);
      loadAll();
    } catch (err) {
      console.error("Delete failed:", err);
      setError(lang === "en" ? "Failed to delete. The server may be unreachable." : "Nabigo ang pag-delete. Maaaring hindi maabot ang server.");
    }
  };

  const inputClass = "w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white";
  const labelClass = "block text-sm font-medium text-neutral-700 mb-1";
  const fmt = (n: number) => `₱${n.toLocaleString("en-PH", { minimumFractionDigits: 2 })}`;

  const tabs: { key: Tab; label: string }[] = [
    { key: "overview", label: lang === "en" ? "Overview" : "Pangkalahatang-tanaw" },
    { key: "appropriations", label: lang === "en" ? "Appropriations" : "Appropriations" },
    { key: "fund_sources", label: lang === "en" ? "Fund Sources" : "Pinagmulan ng Pondo" },
    { key: "revenues", label: lang === "en" ? "Revenues" : "Mga Kita" },
    { key: "disbursements", label: lang === "en" ? "Disbursements" : "Mga Gastos" },
  ];

  return (
    <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            {lang === "en" ? "Finance Management" : "Pamamahala ng Pinansyal"}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {lang === "en" ? `Fiscal Year ${fiscalYear}` : `Taon Piskal ${fiscalYear}`}
          </p>
        </div>
        <select value={fiscalYear} onChange={(e) => setFiscalYear(Number(e.target.value))} className="rounded-xl border border-neutral-300 px-4 py-2 text-sm bg-white self-start">
          {[currentYear, currentYear - 1, currentYear - 2].map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map((t) => (
          <button key={t.key} onClick={() => { setTab(t.key); setShowForm(false); }} className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t.key ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>
            {t.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 ml-2">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-neutral-200 p-6 animate-pulse">
              <div className="h-4 bg-neutral-100 rounded w-32 mb-3" />
              <div className="h-8 bg-neutral-100 rounded w-24" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {tab === "overview" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(EXPENSE_CLASS_LABELS).map(([key, label]) => (
                <ScrollReveal key={key}>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                    <p className="text-sm text-neutral-500 mb-1">{label[lang]}</p>
                    <p className="text-2xl font-bold text-neutral-900">{fmt(summary[key as keyof typeof summary] || 0)}</p>
                  </div>
                </ScrollReveal>
              ))}
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                  <p className="text-sm text-neutral-500 mb-1">{lang === "en" ? "Total Appropriations" : "Kabuuang Appropriations"}</p>
                  <p className="text-2xl font-bold text-primary">{fmt(summary.total)}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                  <p className="text-sm text-neutral-500 mb-1">{lang === "en" ? "Total Revenue" : "Kabuuang Kita"}</p>
                  <p className="text-2xl font-bold text-green-600">{fmt(totalRevenue)}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className="bg-white rounded-2xl border border-neutral-200 p-6">
                  <p className="text-sm text-neutral-500 mb-1">{lang === "en" ? "Total Disbursements" : "Kabuuang Gastos"}</p>
                  <p className="text-2xl font-bold text-red-600">{fmt(totalDisbursements)}</p>
                </div>
              </ScrollReveal>
              <ScrollReveal>
                <div className={`rounded-2xl border p-6 ${balance >= 0 ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                  <p className="text-sm text-neutral-500 mb-1">{lang === "en" ? "Balance" : "Balanse"}</p>
                  <p className={`text-2xl font-bold ${balance >= 0 ? "text-green-700" : "text-red-700"}`}>{fmt(balance)}</p>
                </div>
              </ScrollReveal>
            </div>
          )}

          {(tab === "appropriations" || tab === "fund_sources" || tab === "revenues" || tab === "disbursements") && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-neutral-900">
                  {tabs.find((t) => t.key === tab)?.label}
                </h2>
                <button onClick={() => setShowForm(!showForm)} className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-white hover:bg-primary-dark transition-all">
                  + {lang === "en" ? "Add" : "Dagdag"}
                </button>
              </div>

              {showForm && (
                <ScrollReveal>
                  <div className="bg-white rounded-2xl border border-neutral-200 p-6 mb-4">
                    {tab === "appropriations" && (
                      <form onSubmit={handleCreateAppropriation} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Expense Class" : "Klase ng Gastos"}</label>
                          <select value={appForm.expense_class} onChange={(e) => setAppForm({ ...appForm, expense_class: e.target.value })} className={inputClass}>
                            <option value="PS">PS - Personnel Services</option>
                            <option value="MOOE">MOOE - Maintenance & Other Operating Expenses</option>
                            <option value="CO">CO - Capital Outlay</option>
                          </select>
                        </div>
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Description" : "Paglalarawan"}</label>
                          <input type="text" required value={appForm.description} onChange={(e) => setAppForm({ ...appForm, description: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Amount" : "Halaga"}</label>
                          <input type="number" required min="0" step="0.01" value={appForm.amount || ""} onChange={(e) => setAppForm({ ...appForm, amount: Number(e.target.value) })} className={inputClass} />
                        </div>
                        <div className="sm:col-span-3">
                          <button type="submit" disabled={saving} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-all disabled:opacity-60">
                            {saving ? "..." : (lang === "en" ? "Save" : "I-save")}
                          </button>
                        </div>
                      </form>
                    )}

                    {tab === "revenues" && (
                      <form onSubmit={handleCreateRevenue} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Description" : "Paglalarawan"}</label>
                          <input type="text" required value={revForm.description} onChange={(e) => setRevForm({ ...revForm, description: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Amount" : "Halaga"}</label>
                          <input type="number" required min="0" step="0.01" value={revForm.amount || ""} onChange={(e) => setRevForm({ ...revForm, amount: Number(e.target.value) })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Date Collected" : "Petsa ng Pagkolekta"}</label>
                          <input type="date" required value={revForm.date_collected} onChange={(e) => setRevForm({ ...revForm, date_collected: e.target.value })} className={inputClass} />
                        </div>
                        <div className="sm:col-span-3">
                          <button type="submit" disabled={saving} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-all disabled:opacity-60">
                            {saving ? "..." : (lang === "en" ? "Save" : "I-save")}
                          </button>
                        </div>
                      </form>
                    )}

                    {tab === "disbursements" && (
                      <form onSubmit={handleCreateDisbursement} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Payee" : "May-suweldo"}</label>
                          <input type="text" required value={disbForm.payee} onChange={(e) => setDisbForm({ ...disbForm, payee: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Description" : "Paglalarawan"}</label>
                          <input type="text" required value={disbForm.description} onChange={(e) => setDisbForm({ ...disbForm, description: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Amount" : "Halaga"}</label>
                          <input type="number" required min="0" step="0.01" value={disbForm.amount || ""} onChange={(e) => setDisbForm({ ...disbForm, amount: Number(e.target.value) })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Date" : "Petsa"}</label>
                          <input type="date" required value={disbForm.date_disbursed} onChange={(e) => setDisbForm({ ...disbForm, date_disbursed: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Payment Method" : "Paraan ng Bayad"}</label>
                          <select value={disbForm.payment_method} onChange={(e) => setDisbForm({ ...disbForm, payment_method: e.target.value })} className={inputClass}>
                            <option value="cash">Cash</option>
                            <option value="check">Check</option>
                            <option value="gcash">GCash</option>
                            <option value="bank_transfer">Bank Transfer</option>
                          </select>
                        </div>
                        <div className="sm:col-span-3">
                          <button type="submit" disabled={saving} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-all disabled:opacity-60">
                            {saving ? "..." : (lang === "en" ? "Save" : "I-save")}
                          </button>
                        </div>
                      </form>
                    )}

                    {tab === "fund_sources" && (
                      <form onSubmit={handleCreateFundSource} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Name" : "Pangalan"}</label>
                          <input type="text" required value={fsForm.name} onChange={(e) => setFsForm({ ...fsForm, name: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Code" : "Code"}</label>
                          <input type="text" required value={fsForm.code} onChange={(e) => setFsForm({ ...fsForm, code: e.target.value })} className={inputClass} />
                        </div>
                        <div>
                          <label className={labelClass}>{lang === "en" ? "Amount" : "Halaga"}</label>
                          <input type="number" required min="0" step="0.01" value={fsForm.total_amount || ""} onChange={(e) => setFsForm({ ...fsForm, total_amount: Number(e.target.value) })} className={inputClass} />
                        </div>
                        <div className="sm:col-span-3">
                          <button type="submit" disabled={saving} className="rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-all disabled:opacity-60">
                            {saving ? "..." : (lang === "en" ? "Save" : "I-save")}
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </ScrollReveal>
              )}

              <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[500px]">
                    <thead>
                      <tr className="border-b border-neutral-200 bg-neutral-50">
                        {tab === "appropriations" && (
                          <>
                            <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Class" : "Klase"}</th>
                            <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Description" : "Paglalarawan"}</th>
                            <th className="text-right px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Amount" : "Halaga"}</th>
                          </>
                        )}
                        {tab === "revenues" && (
                          <>
                            <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Description" : "Paglalarawan"}</th>
                            <th className="text-right px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Amount" : "Halaga"}</th>
                            <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Date" : "Petsa"}</th>
                          </>
                        )}
                        {tab === "disbursements" && (
                          <>
                            <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Payee" : "May-suweldo"}</th>
                            <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Description" : "Paglalarawan"}</th>
                            <th className="text-right px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Amount" : "Halaga"}</th>
                            <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Date" : "Petsa"}</th>
                          </>
                        )}
                        {tab === "fund_sources" && (
                          <>
                            <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Name" : "Pangalan"}</th>
                            <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Code" : "Code"}</th>
                            <th className="text-right px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Amount" : "Halaga"}</th>
                          </>
                        )}
                        <th className="text-right px-4 py-3 font-medium text-neutral-600"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {tab === "appropriations" && appropriations.map((a) => (
                        <tr key={a.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="px-4 py-3"><span className="px-2 py-0.5 rounded-full bg-neutral-100 text-neutral-700 text-xs font-medium">{a.expense_class}</span></td>
                          <td className="px-4 py-3 text-neutral-900">{a.description}</td>
                          <td className="px-4 py-3 text-right font-medium text-neutral-900">{fmt(a.amount)}</td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => handleDelete("appropriation", a.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors">
                              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {tab === "revenues" && revenues.map((r) => (
                        <tr key={r.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="px-4 py-3 text-neutral-900">{r.description}</td>
                          <td className="px-4 py-3 text-right font-medium text-green-600">{fmt(r.amount)}</td>
                          <td className="px-4 py-3 text-neutral-500 text-xs">{new Date(r.date_collected).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => handleDelete("revenue", r.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors">
                              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {tab === "disbursements" && disbursements.map((d) => (
                        <tr key={d.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="px-4 py-3 font-medium text-neutral-900">{d.payee}</td>
                          <td className="px-4 py-3 text-neutral-600">{d.description}</td>
                          <td className="px-4 py-3 text-right font-medium text-red-600">{fmt(d.amount)}</td>
                          <td className="px-4 py-3 text-neutral-500 text-xs">{new Date(d.date_disbursed).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => handleDelete("disbursement", d.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors">
                              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                      {tab === "fund_sources" && fundSources.map((f) => (
                        <tr key={f.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="px-4 py-3 font-medium text-neutral-900">{f.name}</td>
                          <td className="px-4 py-3 text-neutral-500 font-mono text-xs">{f.code}</td>
                          <td className="px-4 py-3 text-right font-medium text-neutral-900">{fmt(f.total_amount)}</td>
                          <td className="px-4 py-3 text-right">
                            <button onClick={() => handleDelete("fund_source", f.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors">
                              <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {((tab === "appropriations" && appropriations.length === 0) ||
                  (tab === "revenues" && revenues.length === 0) ||
                  (tab === "disbursements" && disbursements.length === 0) ||
                  (tab === "fund_sources" && fundSources.length === 0)) && (
                  <div className="text-center py-12 text-neutral-400 text-sm">
                    {lang === "en" ? "No records yet" : "Walang rekord pa"}
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
