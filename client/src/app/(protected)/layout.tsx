import DashboardShell from "@/src/components/dashboard/DashboardShell";
import { AuthProvider } from "@/src/components/provider/AuthProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <DashboardShell>{children}</DashboardShell>;
    </AuthProvider>
  );
}
