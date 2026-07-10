import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { useAuth } from "../lib/auth/AuthContext";
import { useLang } from "../lib/LanguageContext";
import OfflineIndicator from "../components/OfflineIndicator";

const adminLinks = [
  { key: "dashboard", href: "/admin", icon: "📊", labelEn: "Dashboard", labelFil: "Dashboard" },
  { key: "residents", href: "/admin/residents", icon: "👥", labelEn: "Residents", labelFil: "Mga Residente" },
  { key: "documents", href: "/admin/documents", icon: "📄", labelEn: "Documents", labelFil: "Mga Dokumento" },
  { key: "blotter", href: "/admin/blotter", icon: "📋", labelEn: "Blotter", labelFil: "Blotter" },
  { key: "finance", href: "/admin/finance", icon: "💰", labelEn: "Finance", labelFil: "Pinansyal" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const { lang } = useLang();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <OfflineIndicator />

      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-neutral-200 z-50 transform transition-transform duration-200 lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b border-neutral-200">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs leading-none">
              <span className="text-center">BRGY<br />MN</span>
            </div>
            <div>
              <span className="block font-bold text-sm text-neutral-900">Barangay Maanahao</span>
              <span className="block text-xs text-neutral-500">Admin Panel</span>
            </div>
          </Link>
        </div>

        <nav className="p-3 flex-1">
          {adminLinks.map((link) => (
            <Link
              key={link.key}
              to={link.href}
              onClick={() => setSidebarOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary transition-colors mb-1"
              activeProps={{ className: "bg-primary-light text-primary" }}
              activeOptions={{ exact: link.key === "dashboard" }}
            >
              <span className="text-lg">{link.icon}</span>
              {lang === "en" ? link.labelEn : link.labelFil}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-neutral-200">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium text-neutral-500 hover:bg-neutral-100 transition-colors mb-2">
            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {lang === "en" ? "View Website" : "Tignan ang Website"}
          </Link>
          <div className="flex items-center gap-2 px-3 py-2 text-sm">
            <div className="size-7 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              {user?.name?.[0] || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-neutral-900 truncate">{user?.name}</p>
              <p className="text-xs text-neutral-400 capitalize">{user?.role}</p>
            </div>
            <button onClick={logout} className="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-red-500 transition-colors" title="Sign out">
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-neutral-200 px-4 py-3 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-neutral-100">
            <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          <div className="flex-1" />
          <span className="text-sm text-neutral-500">
            {new Date().toLocaleDateString(lang === "en" ? "en-US" : "fil-PH", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
          </span>
        </header>

        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
