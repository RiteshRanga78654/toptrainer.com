"use client";
import { useState } from "react";
import {
  generalSettings as gs,
  allExperts
} from "../data/mockData";
import { Card, Toast, Input, Button } from "../../components/ui";
import { LayoutGrid, ChevronRight, ExternalLink, Search } from "lucide-react";
import { cn } from "../../lib/api";
import FeaturedWorkshopsTable from "./components/FeaturedWorkshopsTable";
import HeroSliderSection from "./components/HeroSliderSection";
import FeaturedExpertsSection from "./components/FeaturedExpertsSection";
import YoutubeSection from "./components/YoutubeSection";
import useHomepageState from "./hooks/useHomepageState";


export default function HomepagePage() {
  const { youtubeState, heroState, expertState, workshopState } = useHomepageState();

  const {
    youtubeVideos,
    youtubeUrl,
    setYoutubeUrl,
    isAddingYoutube,
    youtubeSaved,
    setYoutubeSaved,
    addYoutubeVideo,
    deleteYoutubeVideo,
  } = youtubeState;

  const {
    images,
    heroSaved,
    setHeroSaved,
    updateCaption,
    toggleActive,
    removeImage,
    saveHero,
  } = heroState;

  const {
    activeTab,
    searchQuery,
    setSearchQuery,
    selected,
    expertSaved,
    setExpertSaved,
    toggleExpert,
    handleTabChange,
  } = expertState;

  const {
    featuredWorkshops,
    searchWorkshopQuery,
    setSearchWorkshopQuery,
    searchResults,
    setSearchResults,
    isSearching,
    activeWorkshopTab,
    setActiveWorkshopTab,
    topWorkshopsByIndustry,
    workshopTabs,
    handleWorkshopSearch,
    toggleFeaturedWorkshop,
  } = workshopState;

  const [settings, setSettings] = useState(gs);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const expertCategories = [
    {
      key: "industry",
      label: "Industry",
      color: "text-emerald-600",
      ring: "ring-emerald-400",
      dot: "bg-emerald-500",
    },
    {
      key: "department",
      label: "Department",
      color: "text-violet-600",
      ring: "ring-violet-400",
      dot: "bg-violet-500",
    },
    {
      key: "competency",
      label: "Competency",
      color: "text-amber-600",
      ring: "ring-amber-400",
      dot: "bg-amber-500",
    },
  ];

  const updateSetting = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

  // ── Other sections data ─────────────────────────────────────────────────────
  const otherSections = [
    {
      label: "Workshops",
      icon: "📚",
      desc: "Manage workshop listings",
      href: "/admin/workshops",
      color: "bg-blue-50",
    },
    {
      label: "Articles",
      icon: "📰",
      desc: "Manage blog articles",
      href: "/admin/articles",
      color: "bg-amber-50",
    },
    {
      label: "Industry",
      icon: "🏢",
      desc: "Manage industry categories",
      href: "/admin/industry",
      color: "bg-emerald-50",
    },
    {
      label: "Competency",
      icon: "🎯",
      desc: "Manage competencies",
      href: "/admin/competency",
      color: "bg-violet-50",
    },
  ];

  const filtered =
    searchQuery.trim() !== ""
      ? allExperts.filter(
          (e) =>
            e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            e.title.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : allExperts.filter((e) => e.category === activeTab).slice(0, 10);

  const selectedSet = selected[activeTab];
  const activeCat = expertCategories.find((c) => c.key === activeTab);

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Homepage</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage content displayed on the public homepage.
          </p>
        </div>
        <a
          href="https://toptrainer.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-blue-600 font-medium border border-slate-200 rounded-lg px-3 py-2 hover:border-blue-200 hover:bg-blue-50 transition-all"
        >
          <ExternalLink size={12} />
          Preview Live Site
        </a>
      </div>

      {/* ── 1. Hero Slider Images ───────────────────────────────────────────── */}
      <HeroSliderSection
        images={images}
        updateCaption={updateCaption}
        toggleActive={toggleActive}
        removeImage={removeImage}
        saveHero={saveHero}
        settings={settings}
      />

      {/* ── 2. Featured Experts ────────────────────────────────────────────── */}
      <FeaturedExpertsSection
        setExpertSaved={setExpertSaved}
        expertCategories={expertCategories}
        selected={selected}
        allExperts={allExperts}
        handleTabChange={handleTabChange}
        activeTab={activeTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedSet={selectedSet}
        activeCat={activeCat}
        filtered={filtered}
        toggleExpert={toggleExpert}
      />

      {/* Featured Workshops Section ------------------------*/}

      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <p className="text-sm font-semibold">Featured Workshops</p>
            <p className="text-xs text-slate-500">
              Select workshops to feature under each category tab
            </p>
          </div>
          <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full font-medium">
            {featuredWorkshops.length} total featured
          </span>
        </div>

        <div className="p-5">
          {/* Industry Tabs */}
          <div className="flex flex-wrap gap-2 mb-5 border-b border-slate-100 pb-4">
            {workshopTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveWorkshopTab(tab.key);
                  setSearchResults([]);
                  setSearchWorkshopQuery("");
                }}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border",
                  activeWorkshopTab === tab.key
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
                )}
              >
                {tab.label}
                {tab.key !== "All" && (
                  <span className="ml-1.5 text-[10px] opacity-60">
                    ({topWorkshopsByIndustry[tab.key]?.length})
                  </span>
                )}
              </button>
            ))}
          </div>

          <FeaturedWorkshopsTable
            activeWorkshopTab={activeWorkshopTab}
            workshopTabs={workshopTabs}
            toggleFeaturedWorkshop={toggleFeaturedWorkshop}
            featuredWorkshops={featuredWorkshops}
          />

          {/* Search Bar */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-600 mb-2">
              Search Workshops {activeWorkshopTab !== "All" ? `(${workshopTabs.find(t => t.key === activeWorkshopTab)?.label} only)` : ""}
            </p>
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={activeWorkshopTab === "All" ? "Search by title, industry, competency, tag..." : `Search ${workshopTabs.find(t => t.key === activeWorkshopTab)?.label} workshops by title...`}
                  value={searchWorkshopQuery}
                  onChange={(e) => setSearchWorkshopQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleWorkshopSearch()}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white"
                />
              </div>
              <button
                onClick={handleWorkshopSearch}
                disabled={isSearching || !searchWorkshopQuery.trim()}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                  isSearching || !searchWorkshopQuery.trim()
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                )}
              >
                <Search size={14} className="inline-block mr-1.5 -mt-0.5" />
                {isSearching ? "Searching..." : "Search"}
              </button>
            </div>

            {/* Search Results Table */}
            {searchResults.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">
                  Search Results ({searchResults.length})
                </p>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Trainer</th>
                        <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Industry</th>
                        <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center w-24">Featured</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchResults.map((workshop) => {
                        const isFeatured = featuredWorkshops.some(fw => fw._id === workshop._id);
                        return (
                          <tr key={workshop._id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3">
                              <p className="text-xs font-semibold text-slate-900 line-clamp-1">{workshop.basicInformation?.title}</p>
                              <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{workshop.basicInformation?.shortDescription}</p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-xs text-slate-700">{workshop.assignedTrainer?.fullName || "—"}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{workshop.classification?.industry || "—"}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={isFeatured}
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
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* ── YouTube Videos Section ──────────────────────────────────────────────── */}
      <YoutubeSection
        youtubeUrl={youtubeUrl}
        setYoutubeUrl={setYoutubeUrl}
        youtubeVideos={youtubeVideos}
        isAddingYoutube={isAddingYoutube}
        addYoutubeVideo={addYoutubeVideo}
        deleteYoutubeVideo={deleteYoutubeVideo}
      />

      {/* ── 3. Other Sections ──────────────────────────────────────────────── */}
      <Card>
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-slate-100">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center">
            <LayoutGrid size={14} className="text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Other Sections
            </p>
            <p className="text-xs text-slate-500">
              Jump to manage other homepage content areas
            </p>
          </div>
        </div>
        <div className="p-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {otherSections.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="group flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3.5 hover:shadow-sm hover:border-slate-300 transition-all"
            >
              <div
                className={cn(
                  "w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0",
                  s.color,
                )}
              >
                {s.icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-slate-800">
                  {s.label}
                </p>
                <p className="text-xs text-slate-500 truncate">{s.desc}</p>
              </div>
              <ChevronRight
                size={13}
                className="text-slate-300 group-hover:text-slate-500 transition-colors shrink-0"
              />
            </a>
          ))}
        </div>
      </Card>

      {/* Toasts */}
      {heroSaved && (
        <Toast
          message="Hero section saved!"
          type="success"
          onClose={() => setHeroSaved(false)}
        />
      )}
      {expertSaved && (
        <Toast
          message="Expert selections saved!"
          type="success"
          onClose={() => setExpertSaved(false)}
        />
      )}
      {youtubeSaved && (
        <Toast
          message="YouTube video added!"
          type="success"
          onClose={() => setYoutubeSaved(false)}
        />
      )}
      {settingsSaved && (
        <Toast
          message="Settings saved!"
          type="success"
          onClose={() => setSettingsSaved(false)}
        />
      )}
    </div>
  );
}
