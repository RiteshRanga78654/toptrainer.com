"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Loader2, Search, X } from "lucide-react";

/**
 * A self-contained, searchable combobox (no external dependency).
 * Used for backend-powered dropdowns like Industry / Competency /
 * Department so users can type to filter the option list.
 */
export default function SearchableDropdown({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  label,
  loading = false,
  error,
  disabled = false,
  emptyText = "No options available",
  getLabel = (opt) => opt?.name || "",
  getIcon = (opt) => opt?.icon || "",
  allowClear = true,
  compact = false,
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef(null);

  const selected = useMemo(
    () => options.find((o) => o._id === value) || null,
    [options, value]
  );

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((o) => getLabel(o).toLowerCase().includes(q));
  }, [options, query, getLabel]);

  const selectOption = (opt) => {
    onChange?.(opt._id);
    setOpen(false);
    setQuery("");
  };

  const clearValue = (e) => {
    e.stopPropagation();
    onChange?.("");
    setOpen(false);
    setQuery("");
  };

  return (
    <div className="relative" ref={containerRef}>
      {label && (
        <label className="block text-[13px] font-medium text-slate-600 mb-2">
          {label}
        </label>
      )}

      <div
        role="button"
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen((o) => !o)}
        onKeyDown={(e) => {
          if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            setOpen((o) => !o);
          }
        }}
        className={`w-full flex items-center justify-between gap-2 text-sm text-left transition-colors ${
          compact
            ? "px-3 py-2 rounded-md border border-gray-200"
            : "px-4 py-3 rounded-xl border"
        } ${
          disabled
            ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
            : error
            ? "border-red-300 focus:ring-2 focus:ring-red-100"
            : compact
            ? "hover:border-gray-300 focus:outline-none focus:border-gray-400 bg-white cursor-pointer"
            : "border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        } bg-white cursor-pointer`}
      >
        {selected ? (
          <span className="flex items-center gap-2 text-slate-900 min-w-0">
            {getIcon(selected) && (
              <span className="shrink-0">{getIcon(selected)}</span>
            )}
            <span className="truncate">{getLabel(selected)}</span>
          </span>
        ) : (
          <span className="text-slate-400 truncate">{placeholder}</span>
        )}

        <span className="flex items-center gap-1.5 shrink-0">
          {selected && allowClear && !disabled && (
            <button
              type="button"
              title="Clear selection"
              onClick={clearValue}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full hover:bg-slate-100"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {loading ? (
            <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />
          ) : (
            <ChevronDown
              className={`w-4 h-4 text-slate-400 transition-transform ${
                open ? "rotate-180" : ""
              }`}
            />
          )}
        </span>
      </div>

      {open && !disabled && (
        <div className={`absolute z-30 w-full bg-white border border-gray-200 shadow-lg p-2 ${
          compact ? "mt-1 rounded-lg" : "mt-2 rounded-2xl animate-in fade-in zoom-in-95 duration-150"
        }`}>
          <div className="relative mb-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <div className="max-h-52 overflow-y-auto">
            {loading ? (
              <p className="px-3 py-3 text-sm text-slate-400">Loading...</p>
            ) : filtered.length === 0 ? (
              <p className="px-3 py-3 text-sm text-slate-400">{emptyText}</p>
            ) : (
              filtered.map((opt) => {
                const isSelected = opt._id === value;
                return (
                  <button
                    key={opt._id}
                    type="button"
                    onClick={() => selectOption(opt)}
                    className={`w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg text-sm text-left transition-colors ${
                      isSelected
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    <span className="flex items-center gap-2 min-w-0">
                      {getIcon(opt) && (
                        <span className="shrink-0">{getIcon(opt)}</span>
                      )}
                      <span className="truncate">{getLabel(opt)}</span>
                    </span>
                    {isSelected && (
                      <Check className="w-4 h-4 shrink-0 text-blue-600" />
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}
