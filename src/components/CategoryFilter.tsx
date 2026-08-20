interface CategoryFilterProps {
    value: string;
    onChange: (value: string) => void;
    categories: string[];
}

export function CategoryFilter({ value, onChange, categories }: CategoryFilterProps) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)} aria-label="Filter by category"
            className="px-4 py-2 border border-slate-300 rounded-md text-sm bg-white
                 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent
                 sm:w-56">
            <option value="">All Categories</option>
            {categories.map((c) => (
                <option key={c} value={c}>
                    {c}
                </option>
            ))}
        </select>
    );
}