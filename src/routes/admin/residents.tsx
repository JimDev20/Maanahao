import { createFileRoute } from "@tanstack/react-router";
import ResidentsPage from "../../features/residents/ResidentsPage";

export const Route = createFileRoute("/admin/residents")({
  component: ResidentsPage,
});
