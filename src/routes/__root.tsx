import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
  useMatches,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { LangProvider } from "../lib/LanguageContext";
import { AuthProvider } from "../lib/auth/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/BackToTop";
import { startAutoSync } from "../offline/syncManager";
import { logSystemError } from "../api/health";
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Barangay Maanahao — Serbisyong Tapat, Barangay na Maunlad" },
      { name: "description", content: "Official website of Barangay Maanahao, Palanas, Masbate. Serbisyong Tapat, Barangay na Maunlad." },
      { name: "keywords", content: "Barangay Maanahao, Palanas, Masbate, barangay, local government" },
      { property: "og:title", content: "Barangay Maanahao — Serbisyong Tapat, Barangay na Maunlad" },
      { property: "og:description", content: "Official website of Barangay Maanahao, Palanas, Masbate." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap",
      },
    ],
  }),
});

function RootLayout() {
  const matches = useMatches();
  const isAdmin = matches.some((m) => m.pathname.startsWith("/admin") || m.pathname.startsWith("/site-admin"));

  useEffect(() => {
    const stop = startAutoSync();
    return stop;
  }, []);

  useEffect(() => {
    function handleError(event: ErrorEvent) {
      logSystemError("js_error", event.message, event.error?.stack, window.location.href);
    }
    function handleRejection(event: PromiseRejectionEvent) {
      logSystemError("api_error", String(event.reason), "", window.location.href);
    }
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);
    return () => {
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);

  return (
    <html lang="fil">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans text-neutral-900 bg-neutral-50 antialiased">
        <AuthProvider>
          <LangProvider>
            {!isAdmin && <Header />}
            <main>
              <Outlet />
            </main>
            {!isAdmin && <Footer />}
            <BackToTop />
          </LangProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
