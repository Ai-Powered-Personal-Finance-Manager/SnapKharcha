import type { CSSProperties, ComponentType, ReactNode } from "react";
import type { CategoryItem } from "@/src/features/categories/api";

export type BudgetPeriod = "monthly" | "custom";

export type BudgetCategoryOption = {
    id: string;
    label: string;
    icon: ComponentType<{ size?: number; className?: string; style?: CSSProperties }>;
    hex: string;
    bg: string;
    text: string;
    desc: string;
};

export type CustomCategoryFormState = {
    name: string;
    tagInput: string;
    tags: string[];
    color: string;
};

export type StepContainerProps = {
    step: string;
    title: string;
    children: ReactNode;
};

export type CategoryMap = Record<string, CategoryItem>;