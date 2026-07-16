import { useState, useEffect, useRef } from "react";
import { useLang } from "../../lib/LanguageContext";
import {
  getAllSiteSections,
  upsertSiteSection,
  seedDefaultContent,
  type SiteContent,
} from "../../api/siteContent";
import {
  uploadSiteImage,
  getSiteImages,
  deleteSiteImage,
  type UploadedImage,
} from "../../api/uploads";

const SECTIONS = [
  { key: "hero", icon: "🏠", labelEn: "Hero / Cover", labelFil: "Hero / Cover" },
  { key: "footer", icon: "📎", labelEn: "Footer", labelFil: "Footer" },
  { key: "about", icon: "ℹ️", labelEn: "About", labelFil: "Tungkol" },
  { key: "services", icon: "⚙️", labelEn: "Services", labelFil: "Serbisyo" },
  { key: "announcements", icon: "📢", labelEn: "Announcements", labelFil: "Annunsyo" },
];

export default function SiteEditorPage() {
  const { lang } = useLang();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [sections, setSections] = useState<SiteContent[]>([]);
  const [activeSection, setActiveSection] = useState("hero");
  const [formData, setFormData] = useState<Partial<SiteContent>>({});
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        await seedDefaultContent();
        const data = await getAllSiteSections();
        setSections(data);
        const hero = data.find((s) => s.section === "hero");
        if (hero) setFormData(hero);
      } catch (err) {
        console.error("Failed to load site content:", err);
      } finally {
        setLoading(false);
      }
      try {
        const images = await getSiteImages();
        setUploadedImages(images);
      } catch {
        setLoadError(lang === "en" ? "Failed to load images" : "Nabigo ang pag-load ng mga larawan");
      }
    }
    load();
  }, [lang]);

  function handleSectionChange(key: string) {
    setActiveSection(key);
    const section = sections.find((s) => s.section === key);
    if (section) {
      setFormData(section);
    } else {
      setFormData({ section: key, title: "", subtitle: "", body: "", image_url: "", button_text: "", button_link: "", meta: {} });
    }
    setSaved(false);
  }

  function updateField(field: string, value: string) {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setSaved(false);
  }

  function updateMeta(key: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      meta: { ...(prev.meta || {}), [key]: value },
    }));
    setSaved(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const uploaded = await uploadSiteImage(file, file.name);
      setUploadedImages((prev) => [uploaded, ...prev]);
      setFormData((prev) => ({ ...prev, image_url: uploaded.url }));
      setSaved(false);
    } catch (err) {
      console.error("Failed to upload image:", err);
      setError(lang === "en" ? "Failed to upload image." : "Nabigo ang pag-upload ng larawan.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function handleSelectImage(url: string) {
    setFormData((prev) => ({ ...prev, image_url: url }));
    setSaved(false);
  }

  async function handleDeleteImage(id: string) {
    try {
      await deleteSiteImage(id);
      setUploadedImages((prev) => prev.filter((img) => img.id !== id));
      if (formData.image_url?.includes(id)) {
        setFormData((prev) => ({ ...prev, image_url: "" }));
      }
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError("");
    try {
      await upsertSiteSection(activeSection, formData);
      const updated = await getAllSiteSections();
      setSections(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error("Failed to save:", err);
      setError(lang === "en" ? "Failed to save. The server may be unreachable." : "Nabigo ang pag-save. Maaaring hindi maabot ang server.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-neutral-100 rounded w-48" />
          <div className="h-64 bg-neutral-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900">
            {lang === "en" ? "Site Editor" : "Site Editor"}
          </h1>
          <p className="text-neutral-500 text-sm mt-1">
            {lang === "en"
              ? "Edit your landing page content, images, and messages"
              : "I-edit ang nilalaman, larawan, at mensahe ng iyong landing page"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Section Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-neutral-200 p-3 sticky top-20">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider px-2 mb-2">
              {lang === "en" ? "Sections" : "Mga Seksyon"}
            </p>
            {SECTIONS.map((sec) => (
              <button
                key={sec.key}
                onClick={() => handleSectionChange(sec.key)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-1 ${
                  activeSection === sec.key
                    ? "bg-primary-light text-primary"
                    : "text-neutral-600 hover:bg-neutral-50"
                }`}
              >
                <span className="text-lg">{sec.icon}</span>
                {lang === "en" ? sec.labelEn : sec.labelFil}
              </button>
            ))}
          </div>
        </div>

        {/* Editor */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-2xl border border-neutral-200 p-6">
            <h2 className="text-lg font-bold text-neutral-900 mb-5">
              {SECTIONS.find((s) => s.key === activeSection)?.icon}{" "}
              {SECTIONS.find((s) => s.key === activeSection)?.labelEn}
            </h2>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Title</label>
                <input
                  type="text"
                  value={formData.title || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Section title"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle || ""}
                  onChange={(e) => updateField("subtitle", e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Section subtitle"
                />
              </div>

              {/* Body */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Body Text</label>
                <textarea
                  value={formData.body || ""}
                  onChange={(e) => updateField("body", e.target.value)}
                  rows={5}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-y"
                  placeholder="Main content text..."
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Cover / Background Image
                </label>

                {/* URL Input */}
                <input
                  type="url"
                  value={formData.image_url || ""}
                  onChange={(e) => updateField("image_url", e.target.value)}
                  className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="https://example.com/image.jpg or paste a URL"
                />

                {/* Upload Button */}
                <div className="mt-3 flex items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className="inline-flex items-center gap-2 rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 transition-colors disabled:opacity-50"
                  >
                    {uploading ? (
                      <>
                        <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        {lang === "en" ? "Uploading..." : "Nag-upload..."}
                      </>
                    ) : (
                      <>
                        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {lang === "en" ? "Upload Image" : "Mag-upload ng Larawan"}
                      </>
                    )}
                  </button>
                </div>

                {/* Current Image Preview */}
                {formData.image_url && (
                  <div className="mt-3 relative rounded-xl overflow-hidden border border-neutral-200 max-h-48">
                    <img
                      src={formData.image_url}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* Uploaded Images Gallery */}
                {uploadedImages.length > 0 && (
                  <div className="mt-4 border-t border-neutral-200 pt-4">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                      {lang === "en" ? "Uploaded Images" : "Mga Na-upload na Larawan"}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {uploadedImages.map((img) => (
                        <div
                          key={img.id}
                          className={`relative group rounded-lg overflow-hidden border-2 cursor-pointer aspect-square ${
                            formData.image_url === img.url
                              ? "border-primary ring-2 ring-primary/20"
                              : "border-neutral-200 hover:border-primary/50"
                          }`}
                          onClick={() => handleSelectImage(img.url)}
                        >
                          <img
                            src={img.url}
                            alt={img.label}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteImage(img.id);
                            }}
                            className="absolute top-1 right-1 size-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg className="size-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          {formData.image_url === img.url && (
                            <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                              <svg className="size-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Button Text + Link */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Button Text</label>
                  <input
                    type="text"
                    value={formData.button_text || ""}
                    onChange={(e) => updateField("button_text", e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="e.g. Request Documents"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Button Link</label>
                  <input
                    type="text"
                    value={formData.button_link || ""}
                    onChange={(e) => updateField("button_link", e.target.value)}
                    className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="e.g. /services"
                  />
                </div>
              </div>

              {/* Meta Fields */}
              {activeSection === "hero" && (
                <div className="border-t border-neutral-200 pt-5 mt-5">
                  <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-3">
                    Hero Extra Fields
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Tagline</label>
                      <input
                        type="text"
                        value={(formData.meta as Record<string, string>)?.tagline || ""}
                        onChange={(e) => updateMeta("tagline", e.target.value)}
                        className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Office Hours</label>
                      <input
                        type="text"
                        value={(formData.meta as Record<string, string>)?.officeHours || ""}
                        onChange={(e) => updateMeta("officeHours", e.target.value)}
                        className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Secondary CTA Text</label>
                      <input
                        type="text"
                        value={(formData.meta as Record<string, string>)?.ctaSecondary || ""}
                        onChange={(e) => updateMeta("ctaSecondary", e.target.value)}
                        className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Secondary CTA Link</label>
                      <input
                        type="text"
                        value={(formData.meta as Record<string, string>)?.ctaSecondaryLink || ""}
                        onChange={(e) => updateMeta("ctaSecondaryLink", e.target.value)}
                        className="w-full rounded-xl border border-neutral-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Save */}
              <div className="flex items-center gap-3 pt-3">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-dark transition-colors disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                {error && (
                  <span className="text-sm text-red-600 font-medium">{error}</span>
                )}
                {saved && (
                  <span className="text-sm text-green-600 font-medium">Saved!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
