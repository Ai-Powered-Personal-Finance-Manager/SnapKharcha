# Analytics Feature - Complete Architecture

## 📁 Folder Structure

```
client/
└── src/
    ├── features/
    │   └── analytics/                    # Feature directory
    │       ├── pages/
    │       │   └── page.tsx              # Main analytics page (used by app router)
    │       │
    │       ├── components/               # 8 reusable components
    │       │   ├── PeriodSelector.tsx    # Period filter (today/yesterday/lastweek/lastmonth)
    │       │   ├── SummaryCards.tsx      # 4 KPI cards
    │       │   ├── ExpensesByCategory.tsx # Pie chart (Recharts)
    │       │   ├── IncomeByType.tsx      # Bar chart (Recharts)
    │       │   ├── BudgetComparison.tsx  # Progress bars
    │       │   ├── ExpensesByPaymentMethod.tsx # Bar chart (Recharts)
    │       │   ├── TopMerchants.tsx      # Ranked list
    │       │   ├── LoanSummary.tsx       # Loan tracking
    │       │   └── index.ts              # Barrel export
    │       │
    │       ├── hooks/
    │       │   ├── useAnalytics.ts       # React Query hooks
    │       │   │   ├── useAnalytics()    # Core query hook
    │       │   │   └── useAnalyticsData()# Wrapper hook
    │       │   └── index.ts              # Barrel export
    │       │
    │       ├── api/
    │       │   ├── analyticsApi.ts       # API client + types
    │       │   │   ├── AnalyticsData     # TypeScript interface
    │       │   │   └── getAnalytics()    # API call
    │       │   └── index.ts              # Barrel export
    │       │
    │       └── README.md                 # Documentation
    │
    └── app/
        └── (auth)/
            └── analytics/
                └── page.tsx              # Route page (imports feature page)
```

## 🔄 Data Flow

```
User selects period
        ↓
[PeriodSelector] updates state
        ↓
[page.tsx] - period state changes
        ↓
[useAnalyticsData(period)] - hook dependency
        ↓
[useAnalytics(period)] - React Query hook
        ↓
[analyticsApi.getAnalytics(period)] - API call
        ↓
Backend: GET /api/analytics?period=lastmonth
        ↓
[analyticsController.js] - processes request
        ↓
Returns JSON with 8 data points
        ↓
Components render with data
    ├── SummaryCards
    ├── ExpensesByCategory
    ├── IncomeByType
    ├── BudgetComparison
    ├── ExpensesByPaymentMethod
    ├── TopMerchants
    └── LoanSummary
```

## 📊 Components Overview

### 1. **PeriodSelector** 
- 4 period buttons: Today, Yesterday, Last Week, Last Month
- Updates parent state on selection
- Visual active indicator

### 2. **SummaryCards** (4 KPI Cards)
```
Total Spent        Total Income
   Rs.23,750         Rs.50,000
   
Saved              Avg Daily Spend
   Rs.26,250         Rs.614
```

### 3. **ExpensesByCategory**
- Pie chart visualization using Recharts
- Shows spending by category with percentages
- Legend with amounts and transaction counts

### 4. **IncomeByType**
- Bar chart: Fixed vs Variable income
- Shows breakdown with transaction counts
- Supports multiple income types

### 5. **BudgetComparison**
- Progress bars for each active budget
- Shows: Budget Amount → Spent → Remaining
- Alerts for over-budget items
- Overall budget summary

### 6. **ExpensesByPaymentMethod**
- Bar chart: CASH, BANK, WALLET distribution
- Shows transaction counts per method
- Summary breakdown

### 7. **TopMerchants**
- Top 5 merchants ranked by spending
- Horizontal progress bars
- Percentage of total merchant spending
- Transaction counts

### 8. **LoanSummary**
- Total loan amount and monthly EMI
- Individual loan progress tracking
- Paid vs remaining amounts
- Overall loan progress bar

## 🔌 API Response

```json
{
  "success": true,
  "data": {
    "summary": {
      "totalIncome": 50000,
      "totalIncomeCount": 1,
      "totalExpenses": 23750,
      "totalExpensesCount": 10,
      "netBalance": 26250,
      "savingsRate": 53
    },
    "expensesByCategory": [
      {
        "categoryId": "...",
        "categoryName": "Education",
        "categoryColor": "#6366f1",
        "totalAmount": 10000,
        "transactionCount": 3
      }
    ],
    "expensesByPaymentMethod": [...],
    "incomeByType": [...],
    "budgetComparison": [...],
    "topMerchants": [...],
    "loanSummary": {...}
  }
}
```

## 🚀 Usage Examples

### Basic Usage in Component
```tsx
import { useAnalyticsData } from "@/features/analytics/hooks";

export function Dashboard() {
  const { analyticsData, isLoading, error } = useAnalyticsData("lastmonth");
  
  if (isLoading) return <Loading />;
  if (error) return <ErrorFallback error={error} />;
  
  return (
    <div>
      <h1>Net Balance: Rs.{analyticsData.summary.netBalance}</h1>
    </div>
  );
}
```

### Use Individual Components
```tsx
import { 
  SummaryCards, 
  ExpensesByCategory 
} from "@/features/analytics/components";

export function Page() {
  const { analyticsData } = useAnalyticsData();
  
  return (
    <>
      <SummaryCards {...analyticsData.summary} />
      <ExpensesByCategory 
        data={analyticsData.expensesByCategory}
        totalExpenses={analyticsData.summary.totalExpenses}
      />
    </>
  );
}
```

## 📦 Dependencies

- **React Query** - Data fetching & caching
- **Recharts** - Chart library (Pie, Bar)
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons (already in project)

## 🎯 Key Features

✅ Period-based filtering (today/yesterday/lastweek/lastmonth)
✅ Real-time data from database
✅ 8 different chart/visualization types
✅ Type-safe API with TypeScript
✅ React Query caching (5 min default)
✅ Error handling & loading states
✅ Responsive design (mobile & desktop)
✅ Clean, modular component architecture
✅ Easy to extend with new metrics
✅ Professional UI with Recharts

## 🔮 Future Enhancements

- [ ] AI insights generation
- [ ] Export to PDF/CSV
- [ ] Custom date range picker
- [ ] Real-time WebSocket updates
- [ ] Comparison analytics (month-to-month)
- [ ] Budget alerts notification
- [ ] Spending trends prediction
- [ ] Category deep-dive views
- [ ] Merchant spending analysis
- [ ] Year-over-year comparisons

## ✨ Notes

- All data is fetched fresh from backend
- Client-side caching via React Query (5 minutes)
- All components are fully responsive
- Charts automatically scale on container resize
- Color coding matches category colors from database
- Currency displayed in Rs. (Indian Rupees)
- Dates stored in UTC format
- Timezone-aware calculations on backend
