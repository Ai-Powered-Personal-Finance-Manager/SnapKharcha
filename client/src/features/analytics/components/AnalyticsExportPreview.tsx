"use client";

import { forwardRef, type CSSProperties, type ReactNode } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { AnalyticsDataContent } from "../types";

interface AnalyticsExportPreviewProps {
  data: AnalyticsDataContent;
}

const palette = {
  green: "#00C950",
  blue: "#2563EB",
  red: "#EF4444",
  amber: "#F59E0B",
  violet: "#8B5CF6",
  teal: "#14B8A6",
  slate: "#64748B",
  pink: "#EC4899",
};

const pieColors = [
  palette.green,
  palette.blue,
  palette.amber,
  palette.red,
  palette.violet,
  palette.teal,
  palette.pink,
  palette.slate,
];

const pageStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 1240,
  padding: 40,
  boxSizing: "border-box",
  backgroundColor: "#ffffff",
  color: "#111827",
  fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
  pointerEvents: "none",
  zIndex: -1,
  transform: "translateX(-200vw)",
};

const headerStyle: CSSProperties = {
  marginBottom: 28,
  paddingBottom: 20,
  borderBottom: "2px solid #e5e7eb",
};

const eyebrowStyle: CSSProperties = {
  margin: 0,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: 1.6,
  textTransform: "uppercase",
  color: "#6b7280",
};

const titleStyle: CSSProperties = {
  margin: "8px 0 6px",
  fontSize: 30,
  lineHeight: 1.1,
  fontWeight: 800,
  color: "#111827",
};

const metaStyle: CSSProperties = {
  margin: 0,
  fontSize: 12,
  color: "#6b7280",
};

const sectionStyle: CSSProperties = {
  marginBottom: 28,
  padding: 24,
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  backgroundColor: "#f9fafb",
  breakInside: "avoid",
  pageBreakInside: "avoid",
};

const sectionTitleStyle: CSSProperties = {
  margin: 0,
  fontSize: 18,
  lineHeight: 1.2,
  fontWeight: 700,
  color: "#111827",
};

const sectionSubtitleStyle: CSSProperties = {
  margin: "6px 0 0",
  fontSize: 12,
  color: "#6b7280",
};

const summaryGridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
  gap: 16,
};

const metricCardStyle: CSSProperties = {
  padding: 16,
  borderRadius: 14,
  border: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
  boxSizing: "border-box",
};

const metricLabelStyle: CSSProperties = {
  margin: 0,
  fontSize: 12,
  color: "#6b7280",
};

const metricValueStyle: CSSProperties = {
  margin: "8px 0 0",
  fontSize: 22,
  lineHeight: 1.1,
  fontWeight: 800,
  color: "#111827",
};

const metricHintStyle: CSSProperties = {
  margin: "8px 0 0",
  fontSize: 11,
  color: "#6b7280",
};

const gridTwoColStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 20,
};

const chartCardStyle: CSSProperties = {
  padding: 18,
  borderRadius: 16,
  border: "1px solid #e5e7eb",
  backgroundColor: "#ffffff",
  boxSizing: "border-box",
  breakInside: "avoid",
  pageBreakInside: "avoid",
};

const chartHeadingStyle: CSSProperties = {
  margin: 0,
  fontSize: 16,
  fontWeight: 700,
  color: "#111827",
};

const chartSubheadingStyle: CSSProperties = {
  margin: "4px 0 0",
  fontSize: 12,
  color: "#6b7280",
};

const chartAreaStyle: CSSProperties = {
  width: "100%",
  height: 320,
  marginTop: 16,
};

const compactNumberFormatter = new Intl.NumberFormat("en-IN", {
  notation: "compact",
  maximumFractionDigits: 1,
});

const formatCurrency = (value: number) => `Rs.${value.toLocaleString("en-IN")}`;
const formatCount = (value: number) => value.toLocaleString("en-IN");
const formatPercent = (value: number) => `${value.toFixed(2)}%`;
const formatCompactNumber = (value: number) => compactNumberFormatter.format(value);

const toLabel = (value: string) =>
  value
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();

function Section({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section style={sectionStyle}>
      <div style={{ marginBottom: subtitle ? 16 : 12 }}>
        <h2 style={sectionTitleStyle}>{title}</h2>
        {subtitle ? <p style={sectionSubtitleStyle}>{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function MetricCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: string;
  hint: string;
  accent: string;
}) {
  return (
    <div style={metricCardStyle}>
      <div
        style={{
          width: 42,
          height: 4,
          borderRadius: 999,
          backgroundColor: accent,
        }}
      />
      <p style={metricLabelStyle}>{label}</p>
      <p style={metricValueStyle}>{value}</p>
      <p style={metricHintStyle}>{hint}</p>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div style={chartCardStyle}>
      <h3 style={chartHeadingStyle}>{title}</h3>
      <p style={chartSubheadingStyle}>{subtitle}</p>
      <div style={chartAreaStyle}>{children}</div>
    </div>
  );
}

export const AnalyticsExportPreview = forwardRef<
  HTMLDivElement,
  AnalyticsExportPreviewProps
>(function AnalyticsExportPreview({ data }, ref) {
  const generatedAt = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

  const netBalanceAccent = data.summary.netBalance >= 0 ? palette.green : palette.red;

  const expenseCategoryChartData = [...data.expensesByCategory]
    .sort((left, right) => right.totalAmount - left.totalAmount)
    .slice(0, 8)
    .map((item, index) => ({
      name: item.categoryName,
      value: item.totalAmount,
      color: pieColors[index % pieColors.length],
    }));

  const paymentMethodChartData = [...data.expensesByPaymentMethod]
    .sort((left, right) => right.totalAmount - left.totalAmount)
    .map((item, index) => ({
      name: item.paymentMethod,
      value: item.totalAmount,
      color: pieColors[index % pieColors.length],
    }));

  const incomeTypeChartData = [...data.incomeByType]
    .sort((left, right) => right.totalAmount - left.totalAmount)
    .map((item, index) => ({
      name: toLabel(item.type),
      value: item.totalAmount,
      color: [palette.blue, palette.green, palette.violet, palette.amber, palette.teal][index % 5],
    }));

  const topMerchantChartData = [...data.topMerchants]
    .sort((left, right) => right.totalAmount - left.totalAmount)
    .slice(0, 8)
    .map((item, index) => ({
      name: item.merchant,
      value: item.totalAmount,
      color: [palette.green, palette.blue, palette.amber, palette.red, palette.violet][index % 5],
    }));

  const budgetComparisonChartData = [...data.budgetComparison]
    .sort((left, right) => right.spentAmount - left.spentAmount)
    .slice(0, 8)
    .map((item) => ({
      name: item.budgetName,
      budgetAmount: item.budgetAmount,
      spentAmount: item.spentAmount,
      remainingAmount: item.remainingAmount,
    }));

  const loanChartData = data.loanSummary.loanDetails.map((loan) => ({
    name: loan.name,
    amount: loan.amount,
    paidAmount: loan.paidAmount,
    remainingAmount: loan.amount - loan.paidAmount,
  }));

  return (
    <div ref={ref} style={pageStyle} aria-hidden="true">
      <div style={headerStyle}>
        <p style={eyebrowStyle}>Personal Finance Manager</p>
        <h1 style={titleStyle}>Analytics Report</h1>
        <p style={metaStyle}>Generated on {generatedAt}</p>
      </div>

      <Section title="Summary" subtitle="Key metrics for the selected period">
        <div style={summaryGridStyle}>
          <MetricCard
            label="Total Income"
            value={formatCurrency(data.summary.totalIncome)}
            hint={`${formatCount(data.summary.totalIncomeCount)} transactions`}
            accent={palette.green}
          />
          <MetricCard
            label="Total Expenses"
            value={formatCurrency(data.summary.totalExpenses)}
            hint={`${formatCount(data.summary.totalExpensesCount)} transactions`}
            accent={palette.red}
          />
          <MetricCard
            label="Net Balance"
            value={formatCurrency(data.summary.netBalance)}
            hint={`${formatPercent(data.summary.savingsRate)} savings rate`}
            accent={netBalanceAccent}
          />
          <MetricCard
            label="Savings Rate"
            value={formatPercent(data.summary.savingsRate)}
            hint="share of income saved"
            accent={palette.blue}
          />
          <MetricCard
            label="Income Transactions"
            value={formatCount(data.summary.totalIncomeCount)}
            hint="incoming entries"
            accent={palette.teal}
          />
          <MetricCard
            label="Expense Transactions"
            value={formatCount(data.summary.totalExpensesCount)}
            hint="outgoing entries"
            accent={palette.amber}
          />
        </div>
      </Section>

      <Section title="Spend Breakdown" subtitle="Visual distribution of spending categories and payment methods">
        <div style={gridTwoColStyle}>
          <ChartCard title="Expenses by Category" subtitle="Largest spending categories">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={expenseCategoryChartData} layout="vertical" margin={{ top: 8, right: 18, bottom: 8, left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tickFormatter={formatCompactNumber} stroke="#6b7280" />
                <YAxis type="category" dataKey="name" width={120} stroke="#6b7280" />
                <Bar dataKey="value" fill={palette.green} radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Expenses by Payment Method" subtitle="How the spending was paid">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethodChartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="42%"
                  outerRadius={92}
                  innerRadius={48}
                  paddingAngle={2}
                >
                  {paymentMethodChartData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={32} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </Section>

      <Section title="Income and Merchants" subtitle="Where money came from and where it went">
        <div style={gridTwoColStyle}>
          <ChartCard title="Income by Type" subtitle="Income sources in the selected period">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={incomeTypeChartData} margin={{ top: 8, right: 18, bottom: 24, left: 8 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} interval={0} angle={-15} textAnchor="end" height={48} />
                <YAxis tickFormatter={formatCompactNumber} stroke="#6b7280" />
                <Bar dataKey="value" fill={palette.blue} radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Top Merchants" subtitle="Highest spending merchants by value">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topMerchantChartData} layout="vertical" margin={{ top: 8, right: 18, bottom: 8, left: 24 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis type="number" tickFormatter={formatCompactNumber} stroke="#6b7280" />
                <YAxis type="category" dataKey="name" width={120} stroke="#6b7280" />
                <Bar dataKey="value" fill={palette.violet} radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </Section>

      <Section title="Budget Comparison" subtitle="Budgeted amount versus actual spending">
        <ChartCard title="Budgets vs Spent" subtitle="Budget, spend, and remaining amount per budget">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={budgetComparisonChartData} layout="vertical" margin={{ top: 8, right: 18, bottom: 8, left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis type="number" tickFormatter={formatCompactNumber} stroke="#6b7280" />
              <YAxis type="category" dataKey="name" width={140} stroke="#6b7280" />
              <Legend />
              <Bar dataKey="budgetAmount" name="Budget" fill={palette.blue} radius={[0, 10, 10, 0]} />
              <Bar dataKey="spentAmount" name="Spent" fill={palette.red} radius={[0, 10, 10, 0]} />
              <Bar dataKey="remainingAmount" name="Remaining" fill={palette.green} radius={[0, 10, 10, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </Section>

      {data.loanSummary.totalLoans > 0 ? (
        <Section title="Loan Summary" subtitle="Outstanding loan position and repayment progress">
          <div style={{ marginBottom: 18 }}>
            <div style={summaryGridStyle}>
              <MetricCard
                label="Total Loans"
                value={formatCount(data.loanSummary.totalLoans)}
                hint="active loans"
                accent={palette.blue}
              />
              <MetricCard
                label="Total Loan Amount"
                value={formatCurrency(data.loanSummary.totalLoanAmount)}
                hint="principal value"
                accent={palette.amber}
              />
              <MetricCard
                label="Total Paid Amount"
                value={formatCurrency(data.loanSummary.totalPaidAmount)}
                hint="amount already paid"
                accent={palette.green}
              />
              <MetricCard
                label="Total Remaining Amount"
                value={formatCurrency(data.loanSummary.totalRemainingAmount)}
                hint="outstanding balance"
                accent={palette.red}
              />
              <MetricCard
                label="Total Monthly EMI"
                value={formatCurrency(data.loanSummary.totalMonthlyEMI)}
                hint="monthly obligation"
                accent={palette.violet}
              />
              <MetricCard
                label="Average EMI"
                value={formatCurrency(data.loanSummary.totalLoans > 0 ? data.loanSummary.totalMonthlyEMI / data.loanSummary.totalLoans : 0)}
                hint="per loan average"
                accent={palette.teal}
              />
            </div>
          </div>

          {loanChartData.length > 0 ? (
            <ChartCard title="Loan Breakdown" subtitle="Loan amount versus paid and remaining balance">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={loanChartData} layout="vertical" margin={{ top: 8, right: 18, bottom: 8, left: 24 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis type="number" tickFormatter={formatCompactNumber} stroke="#6b7280" />
                  <YAxis type="category" dataKey="name" width={140} stroke="#6b7280" />
                  <Legend />
                  <Bar dataKey="amount" name="Loan Amount" fill={palette.blue} radius={[0, 10, 10, 0]} />
                  <Bar dataKey="paidAmount" name="Paid Amount" fill={palette.green} radius={[0, 10, 10, 0]} />
                  <Bar dataKey="remainingAmount" name="Remaining" fill={palette.red} radius={[0, 10, 10, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          ) : null}
        </Section>
      ) : null}
    </div>
  );
});

AnalyticsExportPreview.displayName = "AnalyticsExportPreview";