import { TrendingUp, TrendingDown } from "lucide-react";

interface MerchantItem {
  merchant: string;
  totalAmount: number;
  transactionCount: number;
}

interface TopMerchantsProps {
  data: MerchantItem[];
}

export function TopMerchants({ data }: TopMerchantsProps) {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-5">
        <h3 className="text-gray-900 font-semibold text-sm">Top Merchants</h3>
        <p className="text-gray-400 text-xs mt-2">No merchants found</p>
      </div>
    );
  }

  const maxAmount = Math.max(...data.map((m) => m.totalAmount));
  const totalMerchantSpend = data.reduce((sum, m) => sum + m.totalAmount, 0);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <div className="mb-5">
        <h3 className="text-gray-900 font-semibold text-sm">Top Merchants</h3>
        <p className="text-gray-400 text-[11px] mt-0.5">Top {Math.min(data.length, 5)} merchants by spending</p>
      </div>

      <div className="space-y-3">
        {data.map((merchant, index) => {
          const percentage = Math.round((merchant.totalAmount / totalMerchantSpend) * 100);
          const barPercentage = (merchant.totalAmount / maxAmount) * 100;

          return (
            <div key={merchant.merchant}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-gray-400 text-xs font-semibold w-5">{index + 1}.</span>
                  <span className="text-gray-700 text-xs font-medium truncate">{merchant.merchant}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-gray-600 text-xs font-semibold">Rs.{merchant.totalAmount.toLocaleString()}</span>
                  <span className="text-gray-400 text-[10px]">({percentage}%)</span>
                </div>
              </div>

              {/* Bar */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-1">
                <div className="h-full bg-[#00C950] rounded-full transition-all duration-700" style={{ width: `${barPercentage}%` }} />
              </div>

              {/* Transaction count */}
              <p className="text-gray-400 text-[10px]">{merchant.transactionCount} transactions</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
