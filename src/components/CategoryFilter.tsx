interface CategoryFilterProps {
    value: string;
    onChange: (value: string) => void;
    categories: string[];
}

export function CategoryFilter({ value, onChange, categories }: CategoryFilterProps) {
    return (
        <select value={value} onChange={(e) => onChange(e.target.value)} aria-label="Filter by category">
            <option value="">All Categories</option>
            {categories.map((c) => (
                <option key={c} value={c}>
                    {c}
                </option>
            ))}
        </select>
    );
}