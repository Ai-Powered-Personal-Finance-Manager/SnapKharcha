import ProfilePage from "@/src/features/profile/pages/ProfilePage";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Profile | SnapKharcha",
  description: "View and edit your profile information, manage account settings, and customize your preferences in the AI-Powered Personal Finance Manager.",
}

export default function Page() {
  return <ProfilePage />;
}