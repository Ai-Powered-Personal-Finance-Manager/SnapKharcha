"use client";

import QueryProvider from "@/src/providers/QueryProvider";
import { Toaster } from "sonner";

export default function AppProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <Toaster richColors position="top-right" />
      {children}
    </QueryProvider>
  );
}
