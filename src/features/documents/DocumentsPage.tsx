import { useState, useEffect, useCallback } from "react";
import { useLang } from "../../lib/LanguageContext";
import { getDocumentRequests, updateDocumentStatus, createDocumentRequest } from "../../api/documents";
import type { DocumentRequest } from "../../api/types";
import ScrollReveal from "../../components/ScrollReveal";

type ViewMode = "list" | "add" | "detail";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  under_review: "bg-blue-100 text-blue-700",
  processing: "bg-purple-100 text-purple-700",
  for_release: "bg-orange-100 text-orange-700",
  released: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const STATUS_LABELS: Record<string, { en: string; fil: string }> = {
  pending: { en: "Pending", fil: "Nakabinbin" },
  under_review: { en: "Under Review", fil: "Sinusuri" },
  processing: { en: "Processing", fil: "Pinoproseso" },
  for_release: { en: "For Release", fil: "Para I-release" },
  released: { en: "Released", fil: "Na-release" },
  cancelled: { en: "Cancelled", fil: "Kinansela" },
};

export default function DocumentsPage() {
  const { lang } = useLang();
  const [documents, setDocuments] = useState<DocumentRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewMode>("list");
  const [selectedDoc, setSelectedDoc] = useState<DocumentRequest | null>(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    requestor_name: "",
    contact_info: "",
    address: "",
    document_type: "",
    purpose: "",
  });

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    try {
      const filter = statusFilter ? `status = "${statusFilter}"` : "";
      const result = await getDocumentRequests(page, 20, filter);
      setDocuments(result.items as unknown as DocumentRequest[]);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error("Failed to load documents:", err);
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter]);

  useEffect(() => {
    loadDocuments();
  }, [loadDocuments]);

  const handleStatusUpdate = async (id: string, status: DocumentRequest["status"]) => {
    setSaving(true);
    try {
      await updateDocumentStatus(id, status);
      loadDocuments();
      if (selectedDoc?.id === id) {
        setSelectedDoc({ ...selectedDoc!, status });
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const requestNumber = `DOC-${Date.now().toString(36).toUpperCase()}`;
      await createDocumentRequest({
        ...formData,
        request_number: requestNumber,
        status: "pending",
        fee: 0,
      });
      setFormData({ requestor_name: "", contact_info: "", address: "", document_type: "", purpose: "" });
      setView("list");
      loadDocuments();
    } catch (err) {
      console.error("Failed to create document request:", err);
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white";
  const labelClass = "block text-sm font-medium text-neutral-700 mb-1";

  return (
    <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            {lang === "en" ? "Document Requests" : "Mga Request ng Dokumento"}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {documents.length} {lang === "en" ? "requests" : "mga request"}
          </p>
        </div>
        {view === "list" && (
          <button onClick={() => setView("add")} className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-all self-start">
            + {lang === "en" ? "New Request" : "Bagong Request"}
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
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-neutral-100 rounded-lg" />
                    <div className="flex-1">
                      <div className="h-4 bg-neutral-100 rounded w-40 mb-2" />
                      <div className="h-3 bg-neutral-100 rounded w-64" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-400">{lang === "en" ? "No document requests" : "Walang request ng dokumento"}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[580px]">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Request #" : "Request #"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Requestor" : "Nag-request"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Document Type" : "Uri ng Dokumento"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Status" : "Status"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Date" : "Petsa"}</th>
                      <th className="text-right px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Actions" : "Aksyon"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-neutral-500">{doc.request_number}</td>
                        <td className="px-4 py-3 font-medium text-neutral-900">{doc.requestor_name}</td>
                        <td className="px-4 py-3 text-neutral-600">{doc.document_type}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${STATUS_COLORS[doc.status] || ""}`}>
                            {STATUS_LABELS[doc.status]?.[lang] || doc.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-neutral-500 text-xs">{new Date(doc.created).toLocaleDateString()}</td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => { setSelectedDoc(doc); setView("detail"); }} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary transition-colors">
                              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="text-sm text-primary font-medium disabled:opacity-40">← {lang === "en" ? "Prev" : "Nauna"}</button>
                  <span className="text-sm text-neutral-500">{page} / {totalPages}</span>
                  <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="text-sm text-primary font-medium disabled:opacity-40">{lang === "en" ? "Next" : "Susunod"} →</button>
                </div>
              )}
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
            <h2 className="text-xl font-bold text-neutral-900 mb-6">{lang === "en" ? "New Document Request" : "Bagong Request ng Dokumento"}</h2>
            <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{lang === "en" ? "Requestor Name" : "Pangalan"}</label>
                  <input type="text" required value={formData.requestor_name} onChange={(e) => setFormData({ ...formData, requestor_name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Contact" : "Contact"}</label>
                  <input type="text" required value={formData.contact_info} onChange={(e) => setFormData({ ...formData, contact_info: e.target.value })} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>{lang === "en" ? "Address" : "Address"}</label>
                  <input type="text" required value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Document Type" : "Uri ng Dokumento"}</label>
                  <select required value={formData.document_type} onChange={(e) => setFormData({ ...formData, document_type: e.target.value })} className={inputClass}>
                    <option value="">{lang === "en" ? "Select..." : "Pumili..."}</option>
                    <option value="Barangay Clearance">Barangay Clearance</option>
                    <option value="Certificate of Indigency">Certificate of Indigency</option>
                    <option value="Business Permit">Business Permit</option>
                    <option value="Certificate of Residency">Certificate of Residency</option>
                    <option value="First-Time Job Seeker Certificate">First-Time Job Seeker Certificate</option>
                    <option value="Cedula">Cedula</option>
                  </select>
                </div>
              </div>
              <div>
                <label className={labelClass}>{lang === "en" ? "Purpose" : "Layunin"}</label>
                <textarea rows={3} required value={formData.purpose} onChange={(e) => setFormData({ ...formData, purpose: e.target.value })} className={inputClass} />
              </div>
              <div className="flex gap-3">
                <button type="submit" disabled={saving} className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark transition-all disabled:opacity-60 flex items-center gap-2">
                  {saving && <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                  {lang === "en" ? "Create Request" : "Lumikha ng Request"}
                </button>
                <button type="button" onClick={() => setView("list")} className="rounded-xl border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all">
                  {lang === "en" ? "Cancel" : "Kanselahin"}
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      )}

      {view === "detail" && selectedDoc && (
        <ScrollReveal>
          <div className="max-w-2xl">
            <button onClick={() => { setView("list"); setSelectedDoc(null); }} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark mb-6">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {lang === "en" ? "Back" : "Bumalik"}
            </button>
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">{selectedDoc.request_number}</h2>
                  <p className="text-sm text-neutral-500">{selectedDoc.document_type}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${STATUS_COLORS[selectedDoc.status]}`}>
                  {STATUS_LABELS[selectedDoc.status]?.[lang]}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 text-sm">
                <div>
                  <span className="text-neutral-500">{lang === "en" ? "Requestor" : "Nag-request"}:</span>
                  <p className="font-medium text-neutral-900">{selectedDoc.requestor_name}</p>
                </div>
                <div>
                  <span className="text-neutral-500">{lang === "en" ? "Contact" : "Contact"}:</span>
                  <p className="font-medium text-neutral-900">{selectedDoc.contact_info}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-neutral-500">{lang === "en" ? "Purpose" : "Layunin"}:</span>
                  <p className="font-medium text-neutral-900">{selectedDoc.purpose}</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-neutral-700 mb-3">{lang === "en" ? "Update Status" : "I-update ang Status"}</h3>
                <div className="flex flex-wrap gap-2">
                  {(["pending", "under_review", "processing", "for_release", "released", "cancelled"] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusUpdate(selectedDoc.id, status)}
                      disabled={saving || selectedDoc.status === status}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors disabled:opacity-40 ${
                        selectedDoc.status === status ? "bg-primary text-white" : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
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
