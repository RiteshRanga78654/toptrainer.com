"use client";
import { useState, useEffect } from "react";
import {
  heroImages as initialHero,
  allExperts,
  generalSettings as gs,
} from "../data/mockData";
import { Card, Button, Toggle, Toast, Badge, Input } from "../../components/ui";
import {
  Trash2,
  Upload,
  Plus,
  ChevronRight,
  ExternalLink,
  Check,
  Image,
  Users,
  LayoutGrid,
  Settings,
  Search,
  Youtube,
} from "lucide-react";
import { cn, wordCount } from "../../lib/api";
import { workshops as allWorkshops } from "../data/mockData";

export default function HomepagePage() {
  // ── Youtube Videos state ──────────────────────────────────────────────────
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isAddingYoutube, setIsAddingYoutube] = useState(false);
  const [youtubeSaved, setYoutubeSaved] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5001/api/youtube-videos")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setYoutubeVideos(data.data);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  const addYoutubeVideo = async () => {
    if (!youtubeUrl) return;
    setIsAddingYoutube(true);
    try {
      const res = await fetch("http://localhost:5001/api/youtube-videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: youtubeUrl })
      });
      const data = await res.json();
      if (data.success) {
        setYoutubeVideos([data.data, ...youtubeVideos]);
        setYoutubeUrl("");
        setYoutubeSaved(true);
        setTimeout(() => setYoutubeSaved(false), 3000);
      } else {
        alert(data.message || "Failed to add video");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding video");
    } finally {
      setIsAddingYoutube(false);
    }
  };

  const deleteYoutubeVideo = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/api/youtube-videos/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setYoutubeVideos(youtubeVideos.filter((v) => v._id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };
  // ── Hero state ──────────────────────────────────────────────────────────────
  const [images, setImages] = useState(initialHero);
  const [heroSaved, setHeroSaved] = useState(false);

  const updateCaption = (id, caption) =>
    setImages((prev) =>
      prev.map((img) => (img.id === id ? { ...img, caption } : img)),
    );
  const toggleActive = (id) =>
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, active: !img.active } : img,
      ),
    );
  const removeImage = (id) =>
    setImages((prev) => prev.filter((img) => img.id !== id));
  const saveHero = () => {
    setHeroSaved(true);
    setTimeout(() => setHeroSaved(false), 3000);
  };

  // ── Expert state ────────────────────────────────────────────────────────────
  const [activeTab, setActiveTab] = useState("industry");
  const [searchQuery, setSearchQuery] = useState("");
  const [selected, setSelected] = useState({
    industry: new Set(
      allExperts
        .filter((e) => e.category === "industry" && e.featured)
        .map((e) => e.id),
    ),
    department: new Set(
      allExperts
        .filter((e) => e.category === "department" && e.featured)
        .map((e) => e.id),
    ),
    competency: new Set(
      allExperts
        .filter((e) => e.category === "competency" && e.featured)
        .map((e) => e.id),
    ),
  });
  const [expertSaved, setExpertSaved] = useState(false);

  const toggleExpert = (id) => {
    setSelected((prev) => {
      const next = new Set(prev[activeTab]);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 6) return prev;
        next.add(id);
      }
      return { ...prev, [activeTab]: next };
    });
  };

  // workshops previewer
  const [selectedWorkshops, setSelectedWorkshops] = useState(new Set());
  const [isWorkshopLoaded, setIsWorkshopLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("toptrainer_featured_workshops");
    if (saved) {
      setSelectedWorkshops(new Set(JSON.parse(saved)));
    } else {
      setSelectedWorkshops(new Set(allWorkshops.filter((w) => w.featured).map((w) => w.id)));
    }
    setIsWorkshopLoaded(true);
  }, []);

  const [workshopSaved, setWorkshopSaved] = useState(false)
  const [activeWorkshopTab, setActiveWorkshopTab] = useState("All");

  const workshopCategories = [
    { key: "All", label: "All Workshops" },
    { key: "Tech", label: "Tech" },
    { key: "Business", label: "Business" },
    { key: "Health", label: "Health" },
    { key: "Finance", label: "Finance" },
    { key: "Marketing", label: "Marketing" },
    { key: "Creative", label: "Creative" },
    { key: "Personal Development", label: "Growth" },
  ];

  const toggleWorkshop = (id) => {
    setSelectedWorkshops((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (next.size >= 8) return prev; // Limit to 8 featured workshops
        next.add(id);
      }
      return next;
    });
  };
  
  const saveWorkshops = () => {
    localStorage.setItem("toptrainer_featured_workshops", JSON.stringify(Array.from(selectedWorkshops)));
    setWorkshopSaved(true);
    setTimeout(() => setWorkshopSaved(false), 3000);
  };
  
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery(""); // Clear search when switching tabs
  };

  // ── Settings state ──────────────────────────────────────────────────────────
  const [settings, setSettings] = useState(gs);
  const [settingsSaved, setSettingsSaved] = useState(false);
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
      <Card>
        {/* Card header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Hero Slider Images
            </p>
            <p className="text-xs text-slate-400 mt-0.5">
              Up to 4 images. These rotate at the top of the homepage.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
            {images.filter((i) => i.active).length} / 4 Used
          </span>
        </div>

        {/* Slide rows */}
        <div className="p-4 space-y-3">
          {images.map((img) => {
            const wc = wordCount(img.caption);
            const over = wc > 20;
            return (
              <div
                key={img.id}
                className="flex items-start gap-3 bg-white border border-slate-200 rounded-xl p-3"
              >
                {/* Drag handle */}
                <div
                  className="mt-3 text-slate-300 cursor-grab select-none flex-shrink-0"
                  title="Drag to reorder"
                >
                  <svg
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="currentColor"
                  >
                    <circle cx="2" cy="2" r="1.5" />
                    <circle cx="8" cy="2" r="1.5" />
                    <circle cx="2" cy="8" r="1.5" />
                    <circle cx="8" cy="8" r="1.5" />
                    <circle cx="2" cy="14" r="1.5" />
                    <circle cx="8" cy="14" r="1.5" />
                  </svg>
                </div>

                {/* Thumbnail + change image */}
                <div className="flex-shrink-0">
                  <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-slate-100 group cursor-pointer upload-zone">
                    <img
                      src={img.url}
                      alt={img.caption}
                      className="w-full h-full object-cover"
                    />
                    <div className="upload-overlay absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Upload size={14} className="text-white" />
                      <span className="text-white text-[10px] font-medium">
                        Upload
                      </span>
                    </div>
                  </div>
                  <button className="mt-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium w-full text-left">
                    Change Image
                  </button>
                </div>

                {/* Caption */}
                <div className="flex-1 min-w-0">
                  <label className="text-xs font-medium text-slate-600 mb-1 block">
                    Caption Text
                  </label>
                  <input
                    type="text"
                    value={img.caption}
                    onChange={(e) => updateCaption(img.id, e.target.value)}
                    placeholder="Enter caption..."
                    className={cn(
                      "w-full text-sm text-slate-700 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400",
                      over ? "border-red-300 bg-red-50" : "border-slate-200",
                    )}
                  />
                  {over && (
                    <p className="text-[11px] text-red-500 mt-1">
                      {wc}/20 words — too long
                    </p>
                  )}
                </div>

                {/* Active toggle + delete */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0 pt-1">
                  <div className="flex items-center gap-2">
                    <Toggle
                      checked={img.active}
                      onChange={() => toggleActive(img.id)}
                    />
                    <span className="text-xs font-medium text-slate-600">
                      Active
                    </span>
                  </div>
                  <button
                    onClick={() => removeImage(img.id)}
                    className="w-7 h-7 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all"
                    title="Remove slide"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Add Another Slide */}
          {images.length < 4 && (
            <button className="w-full border-2 border-dashed border-slate-200 rounded-xl py-3.5 flex items-center justify-center gap-2 text-sm font-medium text-slate-500 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/40 transition-all">
              <Plus size={16} />
              Add Another Slide
            </button>
          )}
        </div>

        {/* Footer save */}
        <div className="px-4 pb-4 flex items-center justify-between">
          {images.length < 4 && (
            <p className="text-xs text-slate-400">
              Slides loop every{" "}
              <b className="text-slate-600">{settings.heroSliderInterval}s</b>
            </p>
          )}
          <div className="ml-auto">
            <Button onClick={saveHero} size="sm">
              Save Changes
            </Button>
          </div>
        </div>
      </Card>

      {/* ── 2. Featured Experts ────────────────────────────────────────────── */}
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

      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div>
            <p className="text-sm font-semibold">Featured Workshops</p>
            <p className="text-xs text-slate-500">
              Select up to 8 to display on the homepage
            </p>
          </div>
          <Button onClick={saveWorkshops}>Save</Button>
        </div>

        <div className="p-5">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-4 border-b border-slate-100 pb-4">
            {workshopCategories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveWorkshopTab(cat.key)}
                className={cn(
                  "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all border",
                  activeWorkshopTab === cat.key
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-slate-700">{activeWorkshopTab} Workshops</p>
            <span className="text-xs text-slate-500">
              {selectedWorkshops.size}/8 selected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {isWorkshopLoaded && allWorkshops
              .filter((w) => activeWorkshopTab === "All" || w.category === activeWorkshopTab)
              .map((workshop) => {
              const isSelected = selectedWorkshops.has(workshop.id);
              return (
                <button
                  key={workshop.id}
                  onClick={() => toggleWorkshop(workshop.id)}
                  className={cn(
                    "relative flex flex-col gap-2 p-3 rounded-xl border text-left transition-all",
                    isSelected ? "border-blue-400 bg-blue-50" : "border-slate-200 bg-white hover:bg-slate-50"
                  )}
                >
                  {isSelected && (
                    <div className="absolute top-3 right-3 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center z-10">
                      <Check size={9} className="text-white" />
                    </div>
                  )}
                  <div className="relative h-24 w-full rounded-lg overflow-hidden bg-slate-100">
                    <img src={workshop.img} alt={workshop.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0 mt-1">
                    <p className="text-xs font-semibold text-slate-900 line-clamp-1" title={workshop.title}>{workshop.title}</p>
                    <p className="text-[11px] text-slate-500 truncate">{workshop.author}</p>
                  </div>
                </button>
              );
            })}
            
            {allWorkshops.filter((w) => activeWorkshopTab === "All" || w.category === activeWorkshopTab).length === 0 && (
              <p className="text-xs text-slate-400 col-span-full py-4 text-center">No workshops found.</p>
            )}
          </div>
        </div>
      </Card>

      {/* ── YouTube Videos Section ──────────────────────────────────────────────── */}
      <Card>
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center">
              <Youtube size={14} className="text-red-600" />
            </div>
            <div>
              <p className="text-sm font-semibold">YouTube Videos</p>
              <p className="text-xs text-slate-500">
                Manage the latest 8 videos displayed on the homepage carousel
              </p>
            </div>
          </div>
        </div>

        <div className="p-5">
          <div className="flex gap-2 mb-6">
            <Input 
              placeholder="Paste YouTube URL here..." 
              value={youtubeUrl}
              onChange={(val) => setYoutubeUrl(val)}
              className="flex-1"
            />
            <Button onClick={addYoutubeVideo} disabled={isAddingYoutube || !youtubeUrl}>
              {isAddingYoutube ? "Adding..." : "Add Video"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {youtubeVideos.map((video) => (
              <div key={video._id} className="relative group rounded-xl border border-slate-200 overflow-hidden bg-white">
                <button 
                  onClick={() => deleteYoutubeVideo(video._id)}
                  className="absolute top-2 right-2 w-7 h-7 bg-white/90 text-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-50"
                  title="Delete Video"
                >
                  <Trash2 size={14} />
                </button>
                <div className="relative aspect-video bg-slate-100">
                  <img 
                    src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold text-slate-900 line-clamp-2" title={video.title}>
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
            {youtubeVideos.length === 0 && (
              <p className="text-sm text-slate-500 col-span-full py-4 text-center border border-dashed rounded-xl">
                No YouTube videos added yet.
              </p>
            )}
          </div>
        </div>
      </Card>

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
