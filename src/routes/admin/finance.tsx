import { createFileRoute } from "@tanstack/react-router";
import FinancePage from "../../features/finance/FinancePage";

export const Route = createFileRoute("/admin/finance")({
  component: FinancePage,
});
