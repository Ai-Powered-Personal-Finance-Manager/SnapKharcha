import { BudgetCreateStepShell } from "./BudgetCreateStepShell";

type BudgetNameStepProps = {
    name: string;
    setName: (value: string) => void;
};

export const BudgetNameStep = ({ name, setName }: BudgetNameStepProps) => {
    return (
        <BudgetCreateStepShell step="2" title="Set Budget Name">
            <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">Budget Name *</label>
                <div className={`flex items-center gap-3 px-5 py-4 rounded-2xl border-2 transition-all ${name ? "border-[#00C950] bg-[#00C950]/3" : "border-gray-200 focus-within:border-[#00C950] focus-within:bg-[#00C950]/2"}`}>
                    <input
                        type="text"
                        placeholder="Enter budget name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="flex-1 bg-transparent text-gray-900 text-3xl font-black font-mono outline-none placeholder:text-gray-200"
                    />
                </div>
            </div>
        </BudgetCreateStepShell>
    );
};