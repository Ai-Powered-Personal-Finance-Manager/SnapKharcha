import { BudgetCreateStepShell } from "./BudgetCreateStepShell";

type BudgetNotesStepProps = {
    note: string;
    setNote: (value: string) => void;
};

export const BudgetNotesStep = ({ note, setNote }: BudgetNotesStepProps) => {
    return (
        <BudgetCreateStepShell step="5" title="Notes">
            <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block mb-2">
                    Notes <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                    placeholder="e.g. Includes weekend dining out, office lunches, and coffee. Exclude groceries."
                    value={note}
                    onChange={(event) => setNote(event.target.value)}
                    rows={3}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 placeholder:text-gray-300 outline-none resize-none focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10 transition-all"
                />
            </div>
        </BudgetCreateStepShell>
    );
};