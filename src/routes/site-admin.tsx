import { createFileRoute, Outlet } from "@tanstack/react-router";
import ProtectedRoute from "../lib/auth/ProtectedRoute";
import SiteAdminLayout from "../features/SiteAdminLayout";

export const Route = createFileRoute("/site-admin")({
  component: SiteAdminLayoutRoute,
});

function SiteAdminLayoutRoute() {
  return (
    <ProtectedRoute>
      <SiteAdminLayout>
        <Outlet />
      </SiteAdminLayout>
    </ProtectedRoute>
  );
}
