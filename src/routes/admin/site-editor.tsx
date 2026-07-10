import { createFileRoute } from "@tanstack/react-router";
import SiteEditorPage from "../../features/site-editor/SiteEditorPage";

export const Route = createFileRoute("/admin/site-editor")({
  component: SiteEditorPage,
});
