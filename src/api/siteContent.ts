import { getPocketBase } from "./client";
import { handleApiCall } from "./errorHandler";
import { executeWrite } from "./offline";

export interface SiteContent {
  id: string;
  section: string;
  title: string;
  subtitle: string;
  body: string;
  image_url: string;
  button_text: string;
  button_link: string;
  meta: Record<string, unknown>;
  updated: string;
}

const DEFAULTS: Record<string, Partial<SiteContent>> = {
  hero: {
    title: "Barangay Maanahao",
    subtitle: "Serbisyong Tapat, Barangay na Maunlad",
    body: "Serving the community of Barangay Maanahao, Palanas, Masbate with dedication and integrity.",
    button_text: "Request Documents",
    button_link: "/services",
    meta: {
      tagline: "Serbisyong Tapat, Barangay na Maunlad",
      officeHours: "Mon-Fri 8:00 AM - 5:00 PM",
      ctaSecondary: "View Announcements",
      ctaSecondaryLink: "/announcements",
    },
  },
  footer: {
    title: "Barangay Maanahao",
    subtitle: "Palanas, Masbate",
    body: "Dedicated to serving our community with transparency, accountability, and excellence in public service.",
    meta: {
      quickLinks: true,
      officeInfo: true,
      facebook: true,
    },
  },
  about: {
    title: "About Barangay Maanahao",
    body: "Barangay Maanahao is a vibrant community in the municipality of Palanas, Masbate. Our barangay is committed to delivering quality public service and fostering community development.",
  },
  services: {
    title: "Our Services",
    subtitle: "Available Barangay Services",
    body: "We offer a wide range of government services to our residents, from document processing to community programs.",
  },
  announcements: {
    title: "Announcements",
    subtitle: "Latest News and Updates",
    body: "Stay informed with the latest news, events, and important updates from Barangay Maanahao.",
  },
};

export async function getSiteContentMap(): Promise<Record<string, SiteContent>> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(
      pb.collection("site_content").getList(1, 100, { sort: "section" })
    );
    const map: Record<string, SiteContent> = {};
    for (const item of result.items) {
      map[item.section] = item as unknown as SiteContent;
    }
    return map;
  } catch {
    return {};
  }
}

export async function getSiteSection(section: string): Promise<SiteContent> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(
      pb.collection("site_content").getList(1, 1, { filter: `section = "${section}"` })
    );
    if (result.items.length > 0) {
      return result.items[0] as unknown as SiteContent;
    }
  } catch {
    // fall through
  }
  const defaults = DEFAULTS[section] || {};
  return {
    ...defaults,
    id: "",
    section,
    updated: "",
  } as SiteContent;
}

export async function getAllSiteSections(): Promise<SiteContent[]> {
  const pb = getPocketBase();
  try {
    const result = await handleApiCall(
      pb.collection("site_content").getList(1, 100, { sort: "section" })
    );
    return result.items as unknown as SiteContent[];
  } catch {
    return Object.entries(DEFAULTS).map(([section, defaults]) => ({
      id: "",
      section,
      ...defaults,
    } as SiteContent));
  }
}

export async function upsertSiteSection(
  section: string,
  data: Partial<SiteContent>
): Promise<SiteContent> {
  const pb = getPocketBase();
  const saveData: Record<string, unknown> = {
    section,
    title: data.title || "",
    subtitle: data.subtitle || "",
    body: data.body || "",
    image_url: data.image_url || "",
    button_text: data.button_text || "",
    button_link: data.button_link || "",
    meta: data.meta || {},
  };
  try {
    const existing = await handleApiCall(
      pb.collection("site_content").getList(1, 1, { filter: `section = "${section}"` })
    );
    if (existing.items.length > 0) {
      return (await executeWrite(
        "update",
        "site_content",
        saveData,
        existing.items[0].id
      )) as unknown as SiteContent;
    }
  } catch {
    // fall through to create
  }
  return (await executeWrite("create", "site_content", saveData)) as unknown as SiteContent;
}

export async function seedDefaultContent(): Promise<void> {
  const existing = await getAllSiteSections();
  const existingSections = new Set(existing.map((s) => s.section));
  for (const [section, defaults] of Object.entries(DEFAULTS)) {
    if (!existingSections.has(section)) {
      await upsertSiteSection(section, defaults);
    }
  }
}
