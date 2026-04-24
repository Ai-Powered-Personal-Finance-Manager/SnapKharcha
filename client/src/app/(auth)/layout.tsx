import DashboardShell from "@/src/components/dashboard-layout/DashboardShell";
import { AuthProvider } from "@/src/providers/AuthProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardShell>{children}</DashboardShell>
    </AuthProvider>
  );
}
