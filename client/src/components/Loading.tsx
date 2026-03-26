import { CreditCard, PiggyBank, ShoppingCart, Wallet } from "lucide-react";

const icons = [Wallet, CreditCard, ShoppingCart, PiggyBank];

export const Loading = () => {
  return (
    <div className="relative h-screen bg-[#00271E] flex flex-col justify-center items-center overflow-hidden">
      <h1 className="text-4xl font-bold text-white mb-10">
        Snap
        <span className="text-green-500">Kharcha</span>
      </h1>

      {/* Floating Icons */}
      <div className=" flex space-x-6">
        {icons.map((Icon, idx) => (
          <Icon
            key={idx}
            className="text-green-400 w-8 h-8"
            style={{
              animation: `float ${1 + idx * 0.1}s ease-in-out infinite`,
              animationDelay: `${idx * 0.05}s`,
            }}
          />
        ))}
      </div>

      {/* Inline Keyframes */}
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
        `}
      </style>
    </div>
  );
};
