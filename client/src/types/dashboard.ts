export type UserType = "personal" | "business";

export type User = {
    name: string;
    email: string;
    avatar?: string;
    type: UserType;
    plan: "free" | "pro" | "business";
};