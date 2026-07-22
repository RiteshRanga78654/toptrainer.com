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
import FeaturedTrainersTable from "./components/FeaturedTrainersTable";
import HeroSliderSection from "./components/HeroSliderSection";
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
    addHeroImage,
    reorderHeroImages,
    toggleActive,
    removeImage,
    saveHero,
  } = heroState;

  const {
    featuredTrainers,
    searchTrainerQuery,
    setSearchTrainerQuery,
    searchTrainerResults,
    setSearchTrainerResults,
    searchTrainerCurrentPage,
    searchTrainerTotalPages,
    isSearchingTrainer,
    activeTrainerTab,
    setActiveTrainerTab,
    trainerTabs,
    handleTrainerSearch,
    toggleFeaturedTrainer,
  } = expertState;

  const {
    featuredWorkshops,
    searchWorkshopQuery,
    setSearchWorkshopQuery,
    searchResults,
    setSearchResults,
    searchCurrentPage,
    searchTotalPages,
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

  const updateSetting = (key, value) =>
    setSettings((prev) => ({ ...prev, [key]: value }));

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
        toggleActive={toggleActive}
        removeImage={removeImage}
        saveHero={saveHero}
        settings={settings}
        addHeroImage={addHeroImage}
      />

      {/* ── 2. Featured Trainers (Experts) ─────────────────────────────────── */}
      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <p className="text-sm font-semibold">Featured Trainers</p>
            <p className="text-xs text-slate-500">
              Select trainers to feature under each category tab
            </p>
          </div>
          <span className="text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-full font-medium">
            {featuredTrainers.length} total featured
          </span>
        </div>

        <div className="p-5">
          {/* Trainer Tabs */}
          <div className="flex flex-wrap gap-2 mb-5 border-b border-slate-100 pb-4">
            {trainerTabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => {
                  setActiveTrainerTab(tab.key);
                  setSearchTrainerResults([]);
                  setSearchTrainerQuery("");
                }}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border",
                  activeTrainerTab === tab.key
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <FeaturedTrainersTable
            activeTrainerTab={activeTrainerTab}
            trainerTabs={trainerTabs}
            toggleFeaturedTrainer={toggleFeaturedTrainer}
            featuredTrainers={featuredTrainers}
          />

          {/* Search Bar */}
          <div className="pt-4 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-600 mb-2">
              Search Trainers {activeTrainerTab !== "All" ? `(${trainerTabs.find(t => t.key === activeTrainerTab)?.label} only)` : ""}
            </p>
            <div className="flex gap-2 mb-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder={`Search ${trainerTabs.find(t => t.key === activeTrainerTab)?.label} trainers by name...`}
                  value={searchTrainerQuery}
                  onChange={(e) => setSearchTrainerQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrainerSearch()}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-white"
                />
              </div>
              <button
                onClick={() => handleTrainerSearch(1)}
                disabled={isSearchingTrainer || !searchTrainerQuery.trim()}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-semibold transition-colors",
                  isSearchingTrainer || !searchTrainerQuery.trim()
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                )}
              >
                <Search size={14} className="inline-block mr-1.5 -mt-0.5" />
                {isSearchingTrainer ? "Searching..." : "Search"}
              </button>
            </div>

            {/* Search Results Table */}
            {searchTrainerResults.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-slate-600 mb-2">
                  Search Results ({searchTrainerResults.length})
                </p>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Title</th>
                        <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Company</th>
                        <th className="px-4 py-2.5 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center w-24">Featured</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchTrainerResults.map((trainer) => {
                        const isFeatured = featuredTrainers.some(fw => fw._id === trainer._id);
                        return (
                          <tr key={trainer._id} className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50 transition-colors">
                            <td className="px-4 py-3">
                              <p className="text-xs font-semibold text-slate-900 line-clamp-1">{trainer.fullName}</p>
                            </td>
                            <td className="px-4 py-3">
                              <p className="text-xs text-slate-700">{trainer.expertiseDomain.industry || "—"}</p>
                            </td>
                            <td className="px-4 py-3">
                              <span className="text-[11px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">{trainer.companyName || "—"}</span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <input
                                type="checkbox"
                                checked={isFeatured}
                                onChange={() => toggleFeaturedTrainer(trainer._id)}
                                className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer accent-blue-600"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                {/* Pagination Controls */}
                {searchTrainerTotalPages > 1 && (
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => handleTrainerSearch(searchTrainerCurrentPage - 1)}
                      disabled={searchTrainerCurrentPage === 1 || isSearchingTrainer}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-xs font-medium text-slate-500">
                      Page {searchTrainerCurrentPage} of {searchTrainerTotalPages}
                    </span>
                    <button
                      onClick={() => handleTrainerSearch(searchTrainerCurrentPage + 1)}
                      disabled={searchTrainerCurrentPage === searchTrainerTotalPages || isSearchingTrainer}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>

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
                
                {/* Pagination Controls */}
                {searchTotalPages > 0 && (
                  <div className="flex items-center justify-between mt-4">
                    <button
                      onClick={() => handleWorkshopSearch(searchCurrentPage - 1)}
                      disabled={searchCurrentPage === 1 || isSearching}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-xs font-medium text-slate-500">
                      Page {searchCurrentPage} of {searchTotalPages}
                    </span>
                    <button
                      onClick={() => handleWorkshopSearch(searchCurrentPage + 1)}
                      disabled={searchCurrentPage === searchTotalPages || isSearching}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
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

      {/* Toasts */}
      {heroSaved && (
        <Toast
          message="Hero section saved!"
          type="success"
          onClose={() => setHeroSaved(false)}
        />
      )}
      {heroSaved && (
        <Toast
          type="success"
          message="Hero section updated successfully"
          onClose={() => setHeroSaved(false)}
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
