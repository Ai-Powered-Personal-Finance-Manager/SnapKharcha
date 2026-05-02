import { CheckCircle2, Plus, Sparkles, X } from "lucide-react";
import { BudgetCreateStepShell } from "./BudgetCreateStepShell";
import type { BudgetCategoryOption, CategoryMap, CustomCategoryFormState } from "./types";
import type { Dispatch, KeyboardEvent, SetStateAction } from "react";

type BudgetCategoryStepProps = {
    selectedCategory: BudgetCategoryOption | null;
    searchCat: string;
    setSearchCat: (value: string) => void;
    availableCats: BudgetCategoryOption[];
    existingCats: BudgetCategoryOption[];
    showCustomCategoryForm: boolean;
    setShowCustomCategoryForm: Dispatch<SetStateAction<boolean>>;
    customCategory: CustomCategoryFormState;
    setCustomCategoryName: (value: string) => void;
    setCustomCategoryTagInput: (value: string) => void;
    setCustomCategoryTags: Dispatch<SetStateAction<string[]>>;
    setCustomCategoryColor: (value: string) => void;
    onSelectCategory: (categoryId: string | null) => void;
    onAddCustomCategoryTag: (tagValue: string) => void;
    onRemoveCustomCategoryTag: (tagValue: string) => void;
    onCustomCategoryTagKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    onCreateCustomCategory: () => void;
    isCreatingCategory: boolean;
};

export const BudgetCategoryStep = ({
    selectedCategory,
    searchCat,
    setSearchCat,
    availableCats,
    existingCats,
    showCustomCategoryForm,
    setShowCustomCategoryForm,
    customCategory,
    setCustomCategoryName,
    setCustomCategoryTagInput,
    setCustomCategoryTags,
    setCustomCategoryColor,
    onSelectCategory,
    onAddCustomCategoryTag,
    onRemoveCustomCategoryTag,
    onCustomCategoryTagKeyDown,
    onCreateCustomCategory,
    isCreatingCategory,
}: BudgetCategoryStepProps) => {
    const canCreateCustomCategory =
        customCategory.name.trim().length > 0 &&
        customCategory.color.trim().length > 0 &&
        !isCreatingCategory;

    return (
        <BudgetCreateStepShell step="1" title="Choose Category">
            <div className="space-y-4">
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 focus-within:border-[#00C950] focus-within:ring-2 focus-within:ring-[#00C950]/10 transition-all">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 shrink-0">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search categories…"
                        value={searchCat}
                        onChange={(event) => setSearchCat(event.target.value)}
                        className="flex-1 bg-transparent text-sm text-gray-700 placeholder:text-gray-400 outline-none"
                    />
                </div>

                {availableCats.length > 0 && (
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-3">Available</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {availableCats.map((category) => {
                                const Icon = category.icon;
                                const isSelected = selectedCategory?.id === category.id;

                                return (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => onSelectCategory(isSelected ? null : category.id)}
                                        className={`group flex items-start gap-3 p-3.5 rounded-xl border-2 text-left transition-all duration-150 ${
                                            isSelected
                                                ? "border-[#00C950] bg-[#00C950]/5 shadow-sm"
                                                : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                                        }`}
                                    >
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${category.hex}18` }}>
                                            <Icon size={16} style={{ color: category.hex }} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className={`text-xs font-semibold leading-tight ${isSelected ? "text-[#00C950]" : "text-gray-700"}`}>{category.label}</p>
                                            <p className="text-gray-400 text-[10px] mt-0.5 leading-snug">{category.desc}</p>
                                        </div>
                                        {isSelected && <CheckCircle2 size={14} className="text-[#00C950] shrink-0 ml-auto mt-0.5" />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {existingCats.length > 0 && (
                    <div>
                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-300 mb-3">Already budgeted</p>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {existingCats.map((category) => {
                                const Icon = category.icon;

                                return (
                                    <div key={category.id} className="flex items-start gap-3 p-3.5 rounded-xl border-2 border-gray-100 opacity-40 cursor-not-allowed">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${category.hex}18` }}>
                                            <Icon size={16} style={{ color: category.hex }} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-semibold text-gray-500 leading-tight">{category.label}</p>
                                            <p className="text-gray-300 text-[10px] mt-0.5">Budget exists</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {availableCats.length === 0 && existingCats.length === 0 && (
                    <div className="text-center py-8 text-gray-400 text-sm">
                        No categories match <span className="font-medium">{searchCat}</span>
                    </div>
                )}

                <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 p-4">
                    <div className="flex items-center justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-gray-900">Create your own category</p>
                            <p className="text-[11px] text-gray-400">Add a custom category with tags and a hex color.</p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setShowCustomCategoryForm((current) => !current)}
                            className="inline-flex items-center gap-1.5 rounded-xl bg-[#00C950] px-3 py-2 text-xs font-semibold text-white shadow-sm shadow-[#00C950]/20 transition-colors hover:bg-[#00b347]"
                        >
                            <Plus size={13} />
                            {showCustomCategoryForm ? "Close" : "Add"}
                        </button>
                    </div>

                    {showCustomCategoryForm && (
                        <div className="mt-4 space-y-4 rounded-2xl border border-gray-100 bg-white p-4">
                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Category name</label>
                                <input
                                    type="text"
                                    value={customCategory.name}
                                    onChange={(event) => setCustomCategoryName(event.target.value)}
                                    placeholder="e.g. Gaming"
                                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition-colors placeholder:text-gray-300 focus:border-[#00C950] focus:ring-2 focus:ring-[#00C950]/10"
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Tags</label>
                                <div className="flex min-h-12 flex-wrap gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5">
                                    {customCategory.tags.map((tagValue) => (
                                        <span key={tagValue} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 shadow-sm border border-gray-200">
                                            {tagValue}
                                            <button type="button" onClick={() => onRemoveCustomCategoryTag(tagValue)} className="rounded-full text-gray-400 transition-colors hover:text-gray-700" aria-label={`Remove tag ${tagValue}`}>
                                                <X size={12} />
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={customCategory.tagInput}
                                        onChange={(event) => setCustomCategoryTagInput(event.target.value)}
                                        onKeyDown={onCustomCategoryTagKeyDown}
                                        placeholder="Type a tag and press Enter"
                                        className="min-w-40 flex-1 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-300"
                                    />
                                </div>
                                <p className="text-[11px] text-gray-400">Press Enter to add tags like gaming or play.</p>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Color</label>
                                <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3">
                                    <input
                                        type="color"
                                        value={customCategory.color}
                                        onChange={(event) => setCustomCategoryColor(event.target.value)}
                                        className="h-11 w-14 rounded-lg border border-gray-200 bg-white p-1"
                                        aria-label="Category color"
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">Selected hex</p>
                                        <p className="font-mono text-sm text-gray-700">{customCategory.color.toUpperCase()}</p>
                                    </div>
                                    <div className="h-10 w-10 rounded-xl border border-gray-200" style={{ backgroundColor: customCategory.color }} />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowCustomCategoryForm(false);
                                        setCustomCategoryName("");
                                        setCustomCategoryTagInput("");
                                        setCustomCategoryTags([]);
                                        setCustomCategoryColor("#00C950");
                                    }}
                                    className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-500 transition-colors hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={onCreateCustomCategory}
                                    disabled={!canCreateCustomCategory}
                                    className="rounded-xl bg-[#00C950] px-4 py-2 text-xs font-semibold text-white shadow-sm shadow-[#00C950]/20 transition-colors hover:bg-[#00b347] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {isCreatingCategory ? "Saving..." : "Save category"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </BudgetCreateStepShell>
    );
};