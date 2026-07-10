import { createFileRoute } from "@tanstack/react-router";
import BlotterPage from "../../features/blotter/BlotterPage";

export const Route = createFileRoute("/admin/blotter")({
  component: BlotterPage,
});
