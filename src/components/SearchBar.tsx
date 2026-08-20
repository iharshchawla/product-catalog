interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
            className="flex-1 px-4 py-2 border border-slate-300 rounded-md text-sm
                 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
        />
    );
}