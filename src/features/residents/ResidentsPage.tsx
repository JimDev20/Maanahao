import { useState, useEffect, useCallback } from "react";
import { useLang } from "../../lib/LanguageContext";
import { useAuth } from "../../lib/auth/AuthContext";
import { getResidents, createResident, updateResident, deleteResident } from "../../api/residents";
import type { Resident } from "../../api/types";
import ScrollReveal from "../../components/ScrollReveal";

type ViewMode = "list" | "add" | "edit";

export default function ResidentsPage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<ViewMode>("list");
  const [editingResident, setEditingResident] = useState<Resident | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [formData, setFormData] = useState<Partial<Resident>>({
    gender: "male",
    civil_status: "single",
    nationality: "Filipino",
    is_voter: false,
    is_senior: false,
    is_pwd: false,
    is_4ps: false,
    is_deceased: false,
    is_migrant: false,
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadResidents = useCallback(async () => {
    setLoading(true);
    try {
      const filter = search ? `first_name ~ "${search}" || last_name ~ "${search}"` : "";
      const result = await getResidents(page, 20, filter);
      setResidents(result.items as unknown as Resident[]);
      setTotalPages(result.totalPages);
    } catch (err) {
      console.error("Failed to load residents:", err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    loadResidents();
  }, [loadResidents]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editingResident) {
        await updateResident(editingResident.id, formData);
      } else {
        await createResident(formData);
      }
      setView("list");
      setEditingResident(null);
      loadResidents();
    } catch (err) {
      console.error("Failed to save resident:", err);
      setError(lang === "en" ? "Failed to save. The server may be unreachable." : "Nabigo ang pag-save. Maaaring hindi maabot ang server.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm(lang === "en" ? "Delete this resident?" : "I-delete ang residenteng ito?")) return;
    setError("");
    try {
      await deleteResident(id);
      loadResidents();
    } catch (err) {
      console.error("Failed to delete resident:", err);
      setError(lang === "en" ? "Failed to delete. The server may be unreachable." : "Nabigo ang pag-delete. Maaaring hindi maabot ang server.");
    }
  };

  const handleEdit = (resident: Resident) => {
    setEditingResident(resident);
    setFormData(resident);
    setView("edit");
  };

  const inputClass = "w-full rounded-xl border border-neutral-300 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all bg-white";
  const labelClass = "block text-sm font-medium text-neutral-700 mb-1";

  return (
    <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            {lang === "en" ? "Resident Management" : "Pamamahala ng Residente"}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {residents.length} {lang === "en" ? "residents registered" : "registered na residente"}
          </p>
        </div>
        {view === "list" && (
          <button
            onClick={() => { setFormData({ gender: "male", civil_status: "single", nationality: "Filipino", is_voter: false, is_senior: false, is_pwd: false, is_4ps: false, is_deceased: false, is_migrant: false }); setEditingResident(null); setView("add"); }}
            className="rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-white hover:bg-primary-dark transition-all self-start"
          >
            + {lang === "en" ? "Add Resident" : "Magdagdag"}
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700 flex items-center justify-between">
          <span>{error}</span>
          <button onClick={() => setError("")} className="text-red-400 hover:text-red-600 ml-2">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
      )}

      {view === "list" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder={lang === "en" ? "Search by name..." : "Maghanap ng pangalan..."}
              className="w-full sm:w-80 rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>

          {loading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-neutral-200 p-4 animate-pulse">
                  <div className="flex items-center gap-4">
                    <div className="size-10 bg-neutral-100 rounded-full" />
                    <div className="flex-1">
                      <div className="h-4 bg-neutral-100 rounded w-32 mb-2" />
                      <div className="h-3 bg-neutral-100 rounded w-48" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : residents.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-neutral-400">{lang === "en" ? "No residents found" : "Walang nahanap na residente"}</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[640px]">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Name" : "Pangalan"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Gender" : "Kasarian"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Age" : "Edad"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Purok" : "Purok"}</th>
                      <th className="text-left px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Tags" : "Mga Tag"}</th>
                      <th className="text-right px-4 py-3 font-medium text-neutral-600">{lang === "en" ? "Actions" : "Aksyon"}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {residents.map((r) => (
                      <tr key={r.id} className="border-b border-neutral-100 hover:bg-neutral-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                              {r.first_name[0]}{r.last_name[0]}
                            </div>
                            <div>
                              <p className="font-medium text-neutral-900">{r.last_name}, {r.first_name} {r.middle_name || ""} {r.suffix || ""}</p>
                              <p className="text-xs text-neutral-400">{r.phone || "—"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-neutral-600 capitalize">{r.gender}</td>
                        <td className="px-4 py-3 text-neutral-600">{r.age}</td>
                        <td className="px-4 py-3 text-neutral-600">{r.purok || "—"}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1">
                            {r.is_voter && <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-medium">Voter</span>}
                            {r.is_senior && <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">Senior</span>}
                            {r.is_pwd && <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-xs font-medium">PWD</span>}
                            {r.is_4ps && <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-medium">4Ps</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <button onClick={() => handleEdit(r)} className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-primary transition-colors">
                              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                            </button>
                            {user?.role === "admin" && (
                              <button onClick={() => handleDelete(r.id)} className="p-2 rounded-lg hover:bg-red-50 text-neutral-500 hover:text-red-600 transition-colors">
                                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200">
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="text-sm text-primary font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                    ← {lang === "en" ? "Previous" : "Nauna"}
                  </button>
                  <span className="text-sm text-neutral-500">{page} / {totalPages}</span>
                  <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="text-sm text-primary font-medium disabled:opacity-40 disabled:cursor-not-allowed">
                    {lang === "en" ? "Next" : "Susunod"} →
                  </button>
                </div>
              )}
            </div>
          )}
        </>
      )}

      {(view === "add" || view === "edit") && (
        <ScrollReveal>
          <div className="max-w-2xl">
            <button onClick={() => { setView("list"); setEditingResident(null); }} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark mb-6">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              {lang === "en" ? "Back to List" : "Bumalik sa Lista"}
            </button>
            <h2 className="text-xl font-bold text-neutral-900 mb-6">
              {view === "add" ? (lang === "en" ? "Add New Resident" : "Bagong Residente") : (lang === "en" ? "Edit Resident" : "I-edit ang Residente")}
            </h2>
            <form onSubmit={handleSave} className="bg-white rounded-2xl border border-neutral-200 p-6 sm:p-8 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>{lang === "en" ? "First Name" : "Unang Pangalan"}</label>
                  <input type="text" required value={formData.first_name || ""} onChange={(e) => setFormData({ ...formData, first_name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Last Name" : "Apelyido"}</label>
                  <input type="text" required value={formData.last_name || ""} onChange={(e) => setFormData({ ...formData, last_name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Middle Name" : "Gitnang Pangalan"}</label>
                  <input type="text" value={formData.middle_name || ""} onChange={(e) => setFormData({ ...formData, middle_name: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Suffix" : "Suffix"}</label>
                  <input type="text" value={formData.suffix || ""} onChange={(e) => setFormData({ ...formData, suffix: e.target.value })} className={inputClass} placeholder="Jr., Sr., III" />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Gender" : "Kasarian"}</label>
                  <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value as Resident["gender"] })} className={inputClass}>
                    <option value="male">{lang === "en" ? "Male" : "Lalaki"}</option>
                    <option value="female">{lang === "en" ? "Female" : "Babae"}</option>
                    <option value="other">{lang === "en" ? "Other" : "Iba pa"}</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Birth Date" : "Petsa ng Kapanganakan"}</label>
                  <input type="date" required value={formData.birth_date || ""} onChange={(e) => setFormData({ ...formData, birth_date: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Civil Status" : "Katayuang Sibil"}</label>
                  <select value={formData.civil_status} onChange={(e) => setFormData({ ...formData, civil_status: e.target.value })} className={inputClass}>
                    <option value="single">{lang === "en" ? "Single" : "Binata/Dalaga"}</option>
                    <option value="married">{lang === "en" ? "Married" : "Kasal"}</option>
                    <option value="widowed">{lang === "en" ? "Widowed" : "Biyuda"}</option>
                    <option value="separated">{lang === "en" ? "Separated" : "Hiwalay"}</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Nationality" : "Nasyonalidad"}</label>
                  <input type="text" value={formData.nationality || ""} onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Phone" : "Telepono"}</label>
                  <input type="text" value={formData.phone || ""} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Email" : "Email"}</label>
                  <input type="email" value={formData.email || ""} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>{lang === "en" ? "Address" : "Address"}</label>
                  <input type="text" required value={formData.address || ""} onChange={(e) => setFormData({ ...formData, address: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Purok" : "Purok"}</label>
                  <input type="text" value={formData.purok || ""} onChange={(e) => setFormData({ ...formData, purok: e.target.value })} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>{lang === "en" ? "Occupation" : "Trabaho"}</label>
                  <input type="text" value={formData.occupation || ""} onChange={(e) => setFormData({ ...formData, occupation: e.target.value })} className={inputClass} />
                </div>
              </div>

              <div>
                <label className={labelClass}>{lang === "en" ? "Tags" : "Mga Tag"}</label>
                <div className="flex flex-wrap gap-3 mt-2">
                  {(["is_voter", "is_senior", "is_pwd", "is_4ps", "is_deceased", "is_migrant"] as const).map((tag) => (
                    <label key={tag} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!formData[tag]} onChange={(e) => setFormData({ ...formData, [tag]: e.target.checked })} className="size-4 rounded border-neutral-300 text-primary focus:ring-primary/30" />
                      <span className="text-sm text-neutral-700">{tag.replace("is_", "").toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="rounded-xl bg-primary px-6 py-3 text-sm font-bold text-white hover:bg-primary-dark transition-all disabled:opacity-60 flex items-center gap-2">
                  {saving && <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>}
                  {view === "add" ? (lang === "en" ? "Add Resident" : "Idagdag") : (lang === "en" ? "Save Changes" : "I-save")}
                </button>
                <button type="button" onClick={() => { setView("list"); setEditingResident(null); }} className="rounded-xl border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-all">
                  {lang === "en" ? "Cancel" : "Kanselahin"}
                </button>
              </div>
            </form>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
