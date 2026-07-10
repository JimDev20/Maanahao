import { createFileRoute, Outlet } from "@tanstack/react-router";
import ProtectedRoute from "../lib/auth/ProtectedRoute";
import AdminLayout from "../features/AdminLayout";

export const Route = createFileRoute("/admin")({
  component: AdminLayoutRoute,
});

function AdminLayoutRoute() {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Outlet />
      </AdminLayout>
    </ProtectedRoute>
  );
}
