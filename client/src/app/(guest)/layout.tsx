import { GuestProvider } from "@/src/providers/GuestProvider";

export default function guestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GuestProvider>{children}</GuestProvider>;
}
