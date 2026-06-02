export type InsightType = "ALERT" | "WARNING" | "TIP" | "PATTERN" | "POSITIVE";

export type InsightSeverity = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";

export interface InsightInterface {
  type: InsightType;
  title: string;
  description: string;
  severity: InsightSeverity;
  category: string;
}
