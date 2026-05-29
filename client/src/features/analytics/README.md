# Analytics Feature

This folder contains all analytics-related components, hooks, and API calls for the Personal Finance Manager.

## Folder Structure

```
analytics/
├── pages/
│   └── page.tsx                 # Main analytics page
├── components/
│   ├── PeriodSelector.tsx       # Period filter buttons (today, yesterday, lastweek, lastmonth)
│   ├── SummaryCards.tsx         # KPI cards (Income, Expenses, Savings, Rate)
│   ├── ExpensesByCategory.tsx   # Pie chart - expenses by category
│   ├── IncomeByType.tsx         # Bar chart - income by type (Fixed/Variable)
│   ├── BudgetComparison.tsx     # Budget vs actual spending with progress bars
│   ├── ExpensesByPaymentMethod.tsx  # Bar chart - payment method breakdown
│   ├── TopMerchants.tsx         # Top 5 merchants by spending
│   ├── LoanSummary.tsx          # Loan EMI status and progress
│   └── index.ts                 # Component exports
├── hooks/
│   ├── useAnalytics.ts          # React Query hooks for fetching analytics data
│   └── index.ts                 # Hook exports
├── api/
│   ├── analyticsApi.ts          # API call functions
│   └── index.ts                 # API exports
└── README.md                    # This file
```

## Features

### Period Filtering
The analytics supports period-based filtering:
- `today` - Current day
- `yesterday` - Previous day
- `lastweek` - Last 7 days
- `lastmonth` - Last 30 days (default)

### Data Components

1. **Summary Cards** - High-level metrics
   - Total Income
   - Total Expenses
   - Net Savings
   - Savings Rate
   - Transaction counts

2. **Expenses by Category** - Pie chart visualization
   - Shows spending distribution across categories
   - Category color-coding from database
   - Transaction counts per category

3. **Income by Type** - Bar chart
   - Fixed vs Variable income comparison
   - Breakdown by income sources

4. **Budget Comparison** - Progress bars
   - Budget vs actual spending
   - Remaining budget amount
   - Over-budget alerts

5. **Payment Method Breakdown** - Bar chart
   - CASH, BANK, WALLET distribution
   - Transaction counts per method

6. **Top Merchants** - Ranked list
   - Top 5 merchants by spending
   - Spending percentage
   - Transaction counts

7. **Loan Summary** - EMI tracking
   - Total loan amount and paid amount
   - Monthly EMI obligations
   - Individual loan progress

## Usage

### Fetch Analytics Data

```tsx
import { useAnalyticsData } from "@/features/analytics/hooks";

export function MyComponent() {
  const { analyticsData, isLoading, error } = useAnalyticsData("lastmonth");

  if (isLoading) return <Loading />;
  if (error) return <ErrorFallback error={error} />;

  return (
    <div>
      <h1>Total Spent: Rs.{analyticsData?.summary.totalExpenses}</h1>
    </div>
  );
}
```

### Use Individual Components

```tsx
import { SummaryCards, ExpensesByCategory } from "@/features/analytics/components";

export function Dashboard() {
  const { analyticsData } = useAnalyticsData("lastweek");

  return (
    <>
      <SummaryCards {...analyticsData.summary} />
      <ExpensesByCategory data={analyticsData.expensesByCategory} />
    </>
  );
}
```

## API Response Structure

```json
{
  "success": true,
  "message": "Analytics data retrieved successfully",
  "data": {
    "period": "lastmonth",
    "dateRange": {
      "startDate": "2026-04-28T00:00:00.000Z",
      "endDate": "2026-05-28T23:59:59.999Z"
    },
    "summary": {
      "totalIncome": 50000,
      "totalIncomeCount": 1,
      "totalExpenses": 23750,
      "totalExpensesCount": 10,
      "netBalance": 26250,
      "savingsRate": 53
    },
    "expensesByCategory": [...],
    "expensesByPaymentMethod": [...],
    "incomeByType": [...],
    "budgetComparison": [...],
    "topMerchants": [...],
    "loanSummary": {...}
  }
}
```

## Technologies Used

- **React Query** - Data fetching and caching
- **Recharts** - Charts and graphs (Pie, Bar charts)
- **TypeScript** - Type-safe data structures
- **Tailwind CSS** - Styling

## Notes

- All times are stored in UTC format
- Currency displayed in Rs. (Indian Rupees)
- Charts are fully responsive and work on all screen sizes
- Data is cached for 5 minutes to reduce API calls
