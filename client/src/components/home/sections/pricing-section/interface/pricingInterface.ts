import { Dispatch, SetStateAction } from "react";

export interface PlanInterface {
  name: string;
  price: {
    monthly: string;
    yearly: string;
  };
  desc: string;
  color: string;
  bg: string;
  border: string;
  features: string[];
  cta: string;
  href: string;
  highlight: boolean;
  badge?: string;
}

export interface PricingMainInterface {
  yearly: boolean;
  setYearly: Dispatch<SetStateAction<boolean>>;
}

export interface ToggleInterface extends PricingMainInterface {}

export interface PricingGridInterface {
  yearly: boolean;
}

export interface PricingCardInterface {
  plan: PlanInterface;
  yearly: boolean;
}

export interface PricingHeaderInterface extends PricingCardInterface {}
