const PRICE_OPTIONS = ["$", "$$", "$$$"];
const CATEGORY_OPTIONS = [
  "Thai",
  "Seafood",
  "Japanese",
  "Italian",
  "American",
  "Mexican",
  "Steak House",
  "Western",
];

function FilterBar({ filters, onChange, onClearAll, searchKeyword, onSearchChange }) {
  const { openNow, price, category } = filters;

  return (
    <div className="flex items-center gap-4 py-3.5 border-b border-gray-200 mb-6 flex-wrap max-[768px]:flex-col max-[768px]:items-stretch max-[768px]:gap-2.5">
      <input
        type="text"
        className="px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 min-w-[220px] grow max-w-[320px] max-[768px]:min-w-0 max-[768px]:max-w-none"
        placeholder="Search restaurant..."
        value={searchKeyword}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <span className="text-sm font-semibold text-gray-600 max-[768px]:mt-1">
        Filter By:
      </span>

      <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={openNow}
          onChange={(e) => onChange({ ...filters, openNow: e.target.checked })}
        />
        Open Now
      </label>

      <select
        className="px-2.5 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 bg-white cursor-pointer"
        value={price}
        onChange={(e) => onChange({ ...filters, price: e.target.value })}
      >
        <option value="">Price</option>
        {PRICE_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <select
        className="px-2.5 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 bg-white cursor-pointer"
        value={category}
        onChange={(e) => onChange({ ...filters, category: e.target.value })}
      >
        <option value="">Categories</option>
        {CATEGORY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>

      <button
        className="ml-auto px-3.5 py-1.5 border border-gray-300 rounded-md bg-white text-xs font-semibold text-gray-500 cursor-pointer transition-colors hover:bg-gray-100 max-[768px]:ml-0"
        onClick={onClearAll}
      >
        CLEAR ALL
      </button>
    </div>
  );
}

export default FilterBar;