# Barangay Maanahao — Official Website

Modern barangay website built with **TanStack Start**, **React 19**, and **Tailwind CSS v4**.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start (React 19) |
| Routing | TanStack Router |
| Styling | Tailwind CSS v4 |
| Server | Nitro (Vercel-ready) |
| Build | Vite 8 |
| Language | TypeScript |
| Hosting | Vercel |

## Features

- **Home** — Hero, QuickStats, Announcements, Services, Gallery, Projects, Officials, Map, FAQ, Emergency Hotlines, Contact
- **About** — Barangay history, mission, vision
- **Services** — 6 services with requirements, procedures, and fees
- **Announcements** — Full list with expandable detail view
- **Document Request** — Online form with server-side submission
- **Report Incident** — Incident report form with server-side submission
- **Downloads** — Sample downloadable forms
- **Language Toggle** — English / Tagalog
- **SEO** — Meta tags, semantic HTML
- **Animations** — Scroll-reveal, fade-in, scale-in transitions
- **Mobile-first** — Responsive design, mobile drawer navigation

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Install
```bash
npm install
```

### Dev
```bash
npm run dev
```
Opens at `http://localhost:3000`

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm start
```

## Project Structure

```
src/
├── components/       # React components
│   ├── Announcements.tsx
│   ├── BackToTop.tsx
│   ├── Contact.tsx
│   ├── EmergencyHotlines.tsx
│   ├── FAQ.tsx
│   ├── Footer.tsx
│   ├── Gallery.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── MapLocation.tsx
│   ├── Officials.tsx
│   ├── Projects.tsx
│   ├── QuickStats.tsx
│   ├── ScrollReveal.tsx
│   └── Services.tsx
├── lib/              # Shared libraries
│   ├── LanguageContext.tsx
│   ├── data.ts       # All barangay data (edit this!)
│   ├── server/
│   │   └── actions.ts # Server functions (form handlers)
│   └── translations.ts
├── routes/           # Page routes
│   ├── __root.tsx
│   ├── 404.tsx
│   ├── about.tsx
│   ├── announcements.tsx
│   ├── downloads.tsx
│   ├── index.tsx
│   ├── report.tsx
│   ├── request.tsx
│   └── services.tsx
├── router.tsx
├── routeTree.gen.ts
├── server.ts
└── styles/
    └── app.css
```

## Customization

All content data lives in **`src/lib/data.ts`** — edit barangay name, officials, services, announcements, emergency contacts, gallery, and projects there.

Translations are in **`src/lib/translations.ts`** — add or edit English/Tagalog strings.

## Deployment

The project is pre-configured for **Vercel**. Push to GitHub and import the repo at [vercel.com/new](https://vercel.com/new) — Vercel auto-detects the framework. Form submissions use `createServerFn` which compile to serverless functions.

To deploy elsewhere, change the Nitro preset in `vite.config.ts`.

## License

MIT
