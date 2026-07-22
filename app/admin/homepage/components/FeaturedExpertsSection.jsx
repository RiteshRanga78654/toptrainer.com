import React from "react";
import { Users, Search, Check } from "lucide-react";
import { Card, Button, Badge } from "../../../components/ui";
import { cn } from "../../../lib/api";

export default function FeaturedExpertsSection({
  setExpertSaved,
  expertCategories,
  selected,
  allExperts,
  handleTabChange,
  activeTab,
  searchQuery,
  setSearchQuery,
  selectedSet,
  activeCat,
  filtered,
  toggleExpert,
}) {
  return (
    <Card>
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
            <Users size={14} className="text-violet-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Featured Experts
            </p>
            <p className="text-xs text-slate-500">
              Select up to 6 per category
            </p>
          </div>
        </div>
        <Button
          onClick={() => {
            setExpertSaved(true);
            setTimeout(() => setExpertSaved(false), 3000);
          }}
          size="sm"
        >
          Save
        </Button>
      </div>

      <div className="p-5 space-y-4">
        {/* Category pills */}
        <div className="grid sm:grid-cols-3 gap-3">
          {expertCategories.map((cat) => {
            const count = selected[cat.key].size;
            const experts = allExperts.filter(
              (e) => e.category === cat.key && selected[cat.key].has(e.id),
            );
            return (
              <button
                key={cat.key}
                onClick={() => handleTabChange(cat.key)}
                className={cn(
                  "text-left bg-white border rounded-xl p-3.5 transition-all hover:shadow-sm",
                  activeTab === cat.key
                    ? `ring-2 ${cat.ring} border-transparent`
                    : "border-slate-200",
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5">
                    <span className={cn("w-2 h-2 rounded-full", cat.dot)} />
                    <p className={cn("text-xs font-semibold", cat.color)}>
                      {cat.label}
                    </p>
                  </div>
                  <Badge variant={count === 6 ? "success" : "warning"}>
                    {count}/6
                  </Badge>
                </div>
                <div className="flex items-center">
                  {experts.slice(0, 5).map((e) => (
                    <img
                      key={e.id}
                      src={e.avatar}
                      alt={e.name}
                      className="w-6 h-6 rounded-full object-cover border-2 border-white -ml-1 first:ml-0"
                    />
                  ))}
                  {count > 5 && (
                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-semibold text-slate-600 -ml-1 border-2 border-white">
                      +{count - 5}
                    </div>
                  )}
                  {count === 0 && (
                    <span className="text-xs text-slate-400 italic">
                      None selected
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Expert grid */}
        <div className="border border-slate-100 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50 border-b border-slate-100">
            <div className="flex items-center gap-1.5">
              <span className={cn("w-2 h-2 rounded-full", activeCat?.dot)} />
              <p className="text-xs font-semibold text-slate-700 capitalize">
                {activeTab} Experts
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search all experts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 text-xs pl-8 pr-3 py-1.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white"
                />
              </div>
              <span className="text-xs text-slate-500">
                {selectedSet.size}/6 selected
              </span>
            </div>
          </div>
          <div className="p-3 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {filtered.map((expert) => {
              const isSel = selectedSet.has(expert.id);
              return (
                <button
                  key={expert.id}
                  onClick={() => toggleExpert(expert.id)}
                  className={cn(
                    "relative flex items-center gap-2.5 p-2.5 rounded-lg border text-left transition-all",
                    isSel
                      ? "border-blue-400 bg-blue-50"
                      : "border-slate-200 bg-white hover:bg-slate-50",
                  )}
                >
                  {isSel && (
                    <div className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check size={9} className="text-white" />
                    </div>
                  )}
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-8 h-8 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-900 truncate">
                      {expert.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {expert.title}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Card>
  );
}
