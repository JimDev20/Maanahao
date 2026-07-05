import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { LangProvider } from "../lib/LanguageContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import appCss from "../styles/app.css?url";

export const Route = createRootRoute({
  component: RootLayout,
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Barangay Maanahao — Serbisyong Tapat, Barangay na Maunlad" },
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
  return (
    <html lang="fil">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans text-neutral-900 bg-neutral-50 antialiased">
        <LangProvider>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </LangProvider>
        <Scripts />
      </body>
    </html>
  );
}
