import {
    Baby,
    BookOpen,
    Bus,
    Car,
    Clapperboard,
    Coffee,
    CreditCard,
    Dumbbell,
    Gamepad2,
    Gift,
    GraduationCap,
    Heart,
    Home,
    LayoutGrid,
    Leaf,
    Music,
    PawPrint,
    Pencil,
    Plane,
    PlayCircle,
    PlusCircle,
    Scissors,
    Shirt,
    ShoppingBag,
    ShoppingCart,
    Sparkles,
    Stethoscope,
    Tv,
    Utensils,
    UtensilsCrossed,
    Wrench,
    Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const categoryThemes = [
    {
        match: ["education", "courses", "books", "tuition", "school", "college", "learning", "study", "university", "class"],
        icon: GraduationCap,
    },
    {
        match: ["food", "dining", "restaurants", "cafés", "café", "delivery", "eating", "lunch", "dinner", "swiggy", "zomato", "restaurant"],
        icon: UtensilsCrossed,
    },
    {
        match: ["groceries", "supermarket", "vegetables", "dairy", "market", "food supply", "kirana", "blinkit", "zepto"],
        icon: ShoppingCart,
    },
    {
        match: ["gym", "fitness", "membership", "equipment", "classes", "workout", "health club", "yoga", "exercise"],
        icon: Dumbbell,
    },
    {
        match: ["health", "medical", "doctor", "pharmacy", "labs", "hospital", "medicine", "checkup", "clinic"],
        icon: Stethoscope,
    },
    {
        match: ["netflix", "spotify", "amazon prime", "disney", "hulu", "streaming", "entertainment", "tv", "clapperboard", "youtube", "adsense"],
        icon: PlayCircle,
    },
    {
        match: ["shopping", "clothing", "electronics", "online", "store", "fashion", "amazon", "flipkart", "myntra", "shop"],
        icon: ShoppingBag,
    },
    {
        match: ["transport", "cabs", "fuel", "auto", "metro", "bus", "taxi", "commute", "petrol", "diesel", "uber", "ola", "car"],
        icon: Car,
    },
    {
        match: ["travel", "trips", "flights", "hotels", "sightseeing", "vacation", "tour", "holiday", "plane", "globe"],
        icon: Plane,
    },
    {
        match: ["utilities", "electricity", "water", "gas", "bills", "power", "internet", "wifi", "recharge", "mobile"],
        icon: Zap,
    },
    {
        match: ["subscriptions", "monthly bills", "recurring", "subscription"],
        icon: CreditCard,
    },
    {
        match: ["rent", "rental", "house", "apartment"],
        icon: Home,
    },
    {
        match: ["overall", "default", "misc", "other", "general"],
        icon: LayoutGrid,
    },
    {
        match: ["coffee", "tea", "beverages", "cafe"],
        icon: Coffee,
    },
    {
        match: ["gaming", "games", "playstation", "xbox", "game"],
        icon: Gamepad2,
    },
    {
        match: ["gifts", "gift", "present", "birthday", "anniversary"],
        icon: Gift,
    },
    {
        match: ["music", "concert", "audio"],
        icon: Music,
    },
    {
        match: ["clothing", "shirt", "apparel", "wear"],
        icon: Shirt,
    },
    {
        match: ["kids", "baby", "children"],
        icon: Baby,
    },
    {
        match: ["pets", "dog", "cat", "animal"],
        icon: PawPrint,
    },
    {
        match: ["salon", "barber", "haircut", "beauty", "spa", "scissors"],
        icon: Scissors,
    },
    {
        match: ["stationery", "pencil", "pen", "office supply"],
        icon: Pencil,
    },
    {
        match: ["repairs", "maintenance", "wrench", "tools"],
        icon: Wrench,
    },
] as const;

/**
 * Maps a category name and its tags to a suitable Lucide icon.
 * Falls back to Sparkles if no match is found.
 */
export const getCategoryIcon = (name: string, tags: string[] = []): LucideIcon => {
    const searchString = `${name} ${tags.join(" ")}`.toLowerCase();
    
    const theme = categoryThemes.find((t) =>
        t.match.some((keyword) => searchString.includes(keyword.toLowerCase()))
    );

    return theme?.icon || Sparkles;
};
