import React from "react";

export default function FeaturedWorkshopsTable({
  activeWorkshopTab,
  workshopTabs,
  toggleFeaturedWorkshop,
  featuredWorkshops,
}) {
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-slate-600 mb-2">
        Featured in "
        {activeWorkshopTab === "All"
          ? "All Categories"
          : workshopTabs.find((t) => t.key === activeWorkshopTab)?.label}
        " ({featuredWorkshops.length})
      </p>
      {featuredWorkshops.length > 0 ? (
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-blue-50/60 border-b border-blue-100">
                <th className="px-4 py-2.5 text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-4 py-2.5 text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                  Trainer
                </th>
                <th className="px-4 py-2.5 text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
                  Industry
                </th>
                <th className="px-4 py-2.5 text-[11px] font-semibold text-blue-600 uppercase tracking-wider text-center w-24">
                  Featured
                </th>
              </tr>
            </thead>
            <tbody>
              {featuredWorkshops.map((workshop) => {
                return (
                  <tr
                    key={workshop._id}
                    className="border-b border-slate-100 last:border-b-0 hover:bg-blue-50/30 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="text-xs font-semibold text-slate-900 line-clamp-1">
                        {workshop.basicInformation?.title}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-xs text-slate-700">
                        {workshop.assignedTrainer || "—"}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-[11px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">
                        {workshop.classification?.industry || "—"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <input
                        type="checkbox"
                        checked={true}
                        onChange={() => toggleFeaturedWorkshop(workshop._id)}
                        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-xs text-slate-400 py-6 text-center border border-dashed border-slate-200 rounded-xl">
          No workshops featured
          {activeWorkshopTab !== "All"
            ? ` in ${workshopTabs.find((t) => t.key === activeWorkshopTab)?.label}`
            : ""}
          . Search below to add some.
        </p>
      )}
    </div>
  );
}
