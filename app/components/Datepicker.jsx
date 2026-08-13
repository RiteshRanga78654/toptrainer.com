"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
  isAfter,
  isValid,
  format,
  setMonth,
  setYear,
} from "date-fns";

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/**
 * A self-contained calendar date picker (no external date-picker
 * dependency). Built for things like Date of Birth: quick month/year
 * jumping, and a hard ceiling on `maxDate` so future dates can't be
 * selected at all.
 */
export default function DatePicker({
  value,
  onChange,
  maxDate = new Date(),
  minDate,
  placeholder = "Select date",
  disabled = false,
  error,
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const selectedDate = useMemo(() => {
    if (!value) return null;
    const d = value instanceof Date ? value : new Date(value);
    return isValid(d) ? d : null;
  }, [value]);

  const [viewDate, setViewDate] = useState(selectedDate || maxDate || new Date());

  useEffect(() => {
    if (selectedDate) setViewDate(selectedDate);
  }, [selectedDate]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const days = useMemo(() => {
    const start = startOfWeek(startOfMonth(viewDate));
    const end = endOfWeek(endOfMonth(viewDate));
    return eachDayOfInterval({ start, end });
  }, [viewDate]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const list = [];
    for (let y = currentYear; y >= currentYear - 100; y--) list.push(y);
    return list;
  }, []);

  const isDisabledDay = (day) => {
    if (maxDate && isAfter(day, maxDate)) return true;
    if (minDate && isAfter(minDate, day)) return true;
    return false;
  };

  const handleSelect = (day) => {
    if (isDisabledDay(day)) return;
    onChange?.(day);
    setOpen(false);
  };

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm text-left transition-colors ${
          disabled
            ? "bg-slate-50 border-slate-200 text-slate-400 cursor-not-allowed"
            : error
            ? "border-red-300 focus:ring-2 focus:ring-red-100"
            : "border-slate-200 hover:border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400"
        } bg-white`}
      >
        <span className={selectedDate ? "text-slate-900" : "text-slate-400"}>
          {selectedDate ? format(selectedDate, "dd MMM yyyy") : placeholder}
        </span>
        <CalendarIcon className="w-4 h-4 text-slate-400 shrink-0" />
      </button>

      {open && !disabled && (
        <div className="absolute z-30 mt-2 w-[300px] bg-white rounded-2xl border border-slate-200 shadow-lg p-4 animate-in fade-in zoom-in-95 duration-150">
          {/* Month / Year quick select */}
          <div className="flex items-center gap-2 mb-3">
            <select
              value={viewDate.getMonth()}
              onChange={(e) => setViewDate((d) => setMonth(d, Number(e.target.value)))}
              className="flex-1 text-sm font-semibold text-slate-800 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
            >
              {MONTH_NAMES.map((m, idx) => (
                <option key={m} value={idx}>{m}</option>
              ))}
            </select>
            <select
              value={viewDate.getFullYear()}
              onChange={(e) => setViewDate((d) => setYear(d, Number(e.target.value)))}
              className="text-sm font-semibold text-slate-800 border border-slate-200 rounded-lg px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-100 bg-white"
            >
              {years.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>
          </div>

          {/* Month navigation */}
          <div className="flex items-center justify-between mb-2">
            <button
              type="button"
              onClick={() => setViewDate((d) => subMonths(d, 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
              {format(viewDate, "MMMM yyyy")}
            </span>
            <button
              type="button"
              onClick={() => setViewDate((d) => addMonths(d, 1))}
              className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Weekday header */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
              <div key={d} className="text-center text-[11px] font-semibold text-slate-400 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day) => {
              const disabledDay = isDisabledDay(day);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const inMonth = isSameMonth(day, viewDate);

              return (
                <button
                  type="button"
                  key={day.toISOString()}
                  disabled={disabledDay}
                  onClick={() => handleSelect(day)}
                  className={`h-8 w-8 mx-auto flex items-center justify-center text-xs rounded-lg transition-colors ${
                    isSelected
                      ? "bg-blue-700 text-white font-semibold"
                      : disabledDay
                      ? "text-slate-300 cursor-not-allowed"
                      : inMonth
                      ? "text-slate-700 hover:bg-blue-50"
                      : "text-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {format(day, "d")}
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => { onChange?.(null); setOpen(false); }}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-xs font-semibold text-blue-600 hover:text-blue-800"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}