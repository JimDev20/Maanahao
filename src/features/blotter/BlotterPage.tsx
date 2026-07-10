import { useState, useEffect, useCallback } from "react";
import { useLang } from "../../lib/LanguageContext";
import { getBlotterRecords, createBlotterRecord, updateBlotterStatus } from "../../api/blotter";
import type { Blotter } from "../../api/types";
import ScrollReveal from "../../components/ScrollReveal";

type ViewMode = "list" | "add" | "detail";

const STATUS_COLORS: Record<string, string> = {
  filed: "bg-yellow-100 text-yellow-700",
  under_investigation: "bg-blue-100 text-blue-700",
  for_hearing: "bg-purple-100 text-purple-700",
  settled: "bg-green-100 text-green-700",
  escalated: "bg-red-100 text-red-700",
  closed: "bg-neutral-100 text-neutral-600",
};

const STATUS_LABELS: Record<string, { en: string; fil: string }> = {
  filed: { en: "Filed", fil: "Naisampa" },
  under_investigation: { en: "Under Investigation", fil: "Sinisiyasat" },
  for_hearing: { en: "For Hearing", fil: "Para sa Hearing" },
  settled: { en: "Settled", fil: "Nalutas" },
  escalated: { en: "Escalated", fil: "Ipinasa" },
  closed: { en: "Closed", fil: "Sarado" },
};

export default function BlotterPage() {
  const { lang } = useLang();
  const [records, setRecords] = useState<Blotter[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewMode>("list");
  const [selectedRecord, setSelectedRecord] = useState<Blotter | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    complainant_name: "",
    complainant_contact: "",
    respondent_name: "",
    incident_type: "complaint",
    description: "",
    location: "",
    incident_date: "",
  });

  const loadRecords = useCallback(async () => {
    setLoading(true);
    try {
      const filter = statusFilter ? `status = "${statusFilter}"` : "";
      const result = await getBlotterRecords(page, 20, filter);
      setRecords(result.items as unknown as Blotter[]);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error("Failed to load blotter records:", err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const blotterNumber = `BLT-${Date.now().toString(36).toUpperCase()}`;
      await createBlotterRecord({
        ...formData,
        blotter_number: blotterNumber,
        status: "filed",
      });
      setFormData({ complainant_name: "", complainant_contact: "", respondent_name: "", incident_type: "complaint", description: "", location: "", incident_date: "" });
      setView("list");
      loadRecords();
    } catch (err) {
      console.error("Failed to create blotter record:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: Blotter["status"]) => {
    setSaving(true);
    try {
      await updateBlotterStatus(id, status);
      loadRecords();
      if (selectedRecord?.id === id) {
        setSelectedRecord({ ...selectedRecord!, status });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white";
  const labelClass = "block text-sm font-medium text-neutral-700 mb-1";

  return (
    <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            {lang === "en" ? "Blotter / Incident Records" : "Mga Rekord ng Blotter / Insidente"}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {records.length} {lang === "en" ? "records" : "mga rekord"}
          </p>
        </div>
        {view === "list" && (
          <button onClick={() => setView("add")} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-all">
            + {lang === "en" ? "New Record" : "Bagong Rekord"}
          </button>
        )}
      </div>

      {view === "list" && (
        <>
          <div className="flex flex-wrap gap-2 mb-4">
            <button onClick={() => { setStatusFilter(""); setPage(1); }} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!statusFilter ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>
              {lang === "en" ? "All" : "Lahat"}
            </button>
            {Object.entries(STATUS_LABELS).map(([key, label]) => (
              <button key={key} onClick={() => { setStatusFilter(key); setPage(1); }} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${statusFilter === key ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"}`}>
                {label[lang]}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-neutral-200 p-4 animate-pulse">
                  <div className="h-4 bg-neutral-100 rounded w-48 mb-2" />
                  <div className="h-3 bg-neutral-100 rounded w-64" />
                </div>
              ))}
            </div>
          ) : records.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-400">{lang === "en" ? "No blotter records" : "Walang rekord ng blotter"}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Case #" : "Kaso #"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Complainant" : "Nagrereklamo"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Type" : "Uri"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Status" : "Status"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Date" : "Petsa"}</th>
                      <th className="text-right px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Actions" : "Aksyon"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {records.map((rec) => (
                      <tr key={rec.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-neutral-500">{rec.blotter_number}</td>
                        <td className="px-4 py-3 font-medium text-neutral-900">{rec.complainant_name}</td>
                        <td className="px-4 py-3 text-neutral-600 capitalize">{rec.incident_type.replace("_", " ")}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[rec.status] || ""}`}>
                            {STATUS_LABELS[rec.status]?.[lang] || rec.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-neutral-500 text-xs">{new Date(rec.incident_date).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-right">
                          <button onClick={() => { setSelectedRecord(rec); setView("detail"); }} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary transition-colors">
                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {view === "add" && (
        <ScrollReveal>
          <div className="max-w-2xl">
            <button onClick={() => setView("list")} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark mb-6">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {lang === "en" ? "Back" : "Bumalik"}
            </button>
            <h2 className="text-xl font-bold text-neutral-900 mb-6">{lang === "en" ? "New Blotter Record" : "Bagong Rekord ng Blotter"}</h2>
            <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{lang === "en" ? "Complainant Name" : "Pangalan ng Nagrereklamo"}</label>
                  <input type="text" required value={formData.complainant_name} onChange={(e) => setFormData({ ...formData, complainant_name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Contact" : "Contact"}</label>
                  <input type="text" value={formData.complainant_contact} onChange={(e) => setFormData({ ...formData, complainant_contact: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Respondent Name" : "Pangalan ng Respondent"}</label>
                  <input type="text" value={formData.respondent_name} onChange={(e) => setFormData({ ...formData, respondent_name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Incident Type" : "Uri ng Insidente"}</label>
                  <select value={formData.incident_type} onChange={(e) => setFormData({ ...formData, incident_type: e.target.value })} className={inputClass}>
                    <option value="complaint">{lang === "en" ? "Complaint" : "Reklamo"}</option>
                    <option value="emergency">{lang === "en" ? "Emergency" : "Emergency"}</option>
                    <option value="accident">{lang === "en" ? "Accident" : "Aksidente"}</option>
                    <option value="suspicious">{lang === "en" ? "Suspicious Activity" : "Kahina-hinalang Aktibidad"}</option>
                    <option value="other">{lang === "en" ? "Other" : "Iba pa"}</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Location" : "Lokasyon"}</label>
                  <input type="text" required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Incident Date" : "Petsa ng Insidente"}</label>
                  <input type="date" required value={formData.incident_date} onChange={(e) => setFormData({ ...formData, incident_date: e.target.value })} className={inputClass} />
                </div>
              </div>
              <div>
                <label className={labelClass}>{lang === "en" ? "Description" : "Paglalarawan"}</label>
                <textarea rows={4} required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className={inputClass} />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark transition-all disabled:opacity-60 flex items-center gap-2">
                  {saving && <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                  {lang === "en" ? "File Record" : "I-file ang Rekord"}
                </button>
                <button type="button" onClick={() => setView("list")} className="rounded-xl border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all">
                  {lang === "en" ? "Cancel" : "Kanselahin"}
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      )}

      {view === "detail" && selectedRecord && (
        <ScrollReveal>
          <div className="max-w-2xl">
            <button onClick={() => { setView("list"); setSelectedRecord(null); }} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark mb-6">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {lang === "en" ? "Back" : "Bumalik"}
            </button>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">{selectedRecord.blotter_number}</h2>
                  <p className="text-sm text-neutral-500 capitalize">{selectedRecord.incident_type.replace("_", " ")}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[selectedRecord.status]}`}>
                  {STATUS_LABELS[selectedRecord.status]?.[lang]}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-neutral-500">{lang === "en" ? "Complainant" : "Nagrereklamo"}:</span>
                  <p className="font-medium text-neutral-900">{selectedRecord.complainant_name}</p>
                </div>
                {selectedRecord.respondent_name && (
                  <div>
                    <span className="text-neutral-500">{lang === "en" ? "Respondent" : "Respondent"}:</span>
                    <p className="font-medium text-neutral-900">{selectedRecord.respondent_name}</p>
                  </div>
                )}
                <div>
                  <span className="text-neutral-500">{lang === "en" ? "Location" : "Lokasyon"}:</span>
                  <p className="font-medium text-neutral-900">{selectedRecord.location}</p>
                </div>
                <div>
                  <span className="text-neutral-500">{lang === "en" ? "Date" : "Petsa"}:</span>
                  <p className="font-medium text-neutral-900">{new Date(selectedRecord.incident_date).toLocaleDateString()}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-neutral-500">{lang === "en" ? "Description" : "Paglalarawan"}:</span>
                  <p className="font-medium text-neutral-900">{selectedRecord.description}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">{lang === "en" ? "Update Status" : "I-update ang Status"}</h3>
                <div className="flex flex-wrap gap-2">
                  {(["filed", "under_investigation", "for_hearing", "settled", "escalated", "closed"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(selectedRecord.id, status)}
                      disabled={saving || selectedRecord.status === status}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${
                        selectedRecord.status === status ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                      }`}
                    >
                      {STATUS_LABELS[status][lang]}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
