import { BriefcaseMedical, Car, Utensils } from "lucide-react";
import { RecentActivityInterface } from "../../interface/loginInterface";


export const recentActivity: RecentActivityInterface[] = [
  {
    icon: Utensils,
    label: "Food & Dining",
    amount: "- Rs.340",
    time: "2h ago",
    color: "#00C950",
  },
  {
    icon: Car,
    label: "Transport",
    amount: "- Rs.120",
    time: "5h ago",
    color: "#00C950",
  },
  {
    icon: BriefcaseMedical,
    label: "Healthcare",
    amount: "- Rs.850",
    time: "Yesterday",
    color: "#00C950",
  },
];
