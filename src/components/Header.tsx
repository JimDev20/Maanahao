import { useState } from "react";
import { Link } from "@tanstack/react-router";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Announcements", href: "/#announcements" },
  { label: "Officials", href: "/#officials" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs leading-none">
            <span className="text-center">
              BRGY
              <br />
              SJ
            </span>
          </div>
          <div className="leading-tight">
            <span className="block font-bold text-sm sm:text-base text-neutral-900">
              Barangay San Juan
            </span>
            <span className="block text-xs text-neutral-500">
              Lungsod ng Maynila
            </span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="px-3 py-2 rounded-lg text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden size-10 flex items-center justify-center rounded-lg text-neutral-700 hover:bg-neutral-100"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <nav className="flex flex-col px-4 py-3 gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm font-medium text-neutral-700 hover:bg-primary-light hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
