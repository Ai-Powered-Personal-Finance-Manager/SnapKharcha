import { ShoppingCart, Store, Utensils } from "lucide-react";
import { businessTypeCardInterface } from "../interface";

export const businessTypeCardData: businessTypeCardInterface[] = [
  {
    emoji: Utensils,
    label: "Restaurants & Cafés",
    desc: "Bill customers, track food costs",
  },
  {
    emoji: ShoppingCart,
    label: "Grocery & Retail Shops",
    desc: "Inventory + sales in one place",
  },
  {
    emoji: Store,
    label: "Small Marts & Stores",
    desc: "Daily revenue & expense tracking",
  },
];
