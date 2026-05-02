import { ElementType } from "react";

export interface businessFeaturesDataInterface {
  icon: string | ElementType;
  title: string;
  desc: string;
}

export interface businessTypeCardInterface {
  emoji: string | ElementType;
  label: string;
  desc: string;
}

export interface businessTypeCardDataInterface {
  data: businessTypeCardInterface[];
}

export interface sdf{}
