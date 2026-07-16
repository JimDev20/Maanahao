import { createFileRoute } from "@tanstack/react-router";
import MonitoringPage from "../../features/monitoring/MonitoringPage";

export const Route = createFileRoute("/site-admin/monitoring")({
  component: MonitoringPage,
});
