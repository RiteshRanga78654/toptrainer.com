import { useState, useEffect } from "react";
import axios from "axios";
import {
  heroImages as initialHero,
  allExperts,
} from "../../data/mockData";

export default function useHomepageState() {
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
        body: JSON.stringify({ url: youtubeUrl }),
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
      const res = await fetch(
        `http://localhost:5001/api/youtube-videos/${id}`,
        {
          method: "DELETE",
        },
      );
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

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  // ── Workshops previewer state ────────────────────────────────────────────────
  const [featuredWorkshops, setFeaturedWorkshops] = useState([]);
  const [searchWorkshopQuery, setSearchWorkshopQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeWorkshopTab, setActiveWorkshopTab] = useState("All");
  const [topWorkshopsByIndustry, setTopWorkshopsByIndustry] = useState([]);

  const workshopTabs = [
    { key: "All", label: "All" },
    { key: "Technology", label: "Tech" },
    { key: "Business", label: "Business" },
    { key: "Health & Wellness", label: "Health" },
    { key: "Finance", label: "Finance" },
    { key: "Marketing", label: "Marketing" },
    { key: "Creative Arts", label: "Creative" },
    { key: "Growth", label: "Growth" },
  ];

  const fetchFeaturedWorkshops = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/featured-lists?itemType=Workshop&category=${activeWorkshopTab}`,
      );
      if (res.data.success) {
        setFeaturedWorkshops(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch featured workshops", err);
    }
  };

 
  useEffect(() => {
    fetchFeaturedWorkshops();
  }, []);

  const handleWorkshopSearch = async () => {
    if (!searchWorkshopQuery.trim()) return;
    setIsSearching(true);
    try {
      let url = `http://localhost:5001/api/workshops/admin/homepage/search?keyword=${encodeURIComponent(
        searchWorkshopQuery,
      )}`;
      if (activeWorkshopTab !== "All") {
        url += `&industry=${encodeURIComponent(activeWorkshopTab)}`;
      }
      const res = await axios.get(url);
      if (res.data.success) {
        setSearchResults(res.data.workshops || []);
      }
    } catch (err) {
      console.error("Failed to search", err);
    } finally {
      setIsSearching(false);
    }
  };

  const toggleFeaturedWorkshop = async (id) => {
    let url ="http://localhost:5001/api/featured-lists/toggle";
    let body = {
      itemType:"Workshop",
      category:`${activeWorkshopTab}`
    }
    try {
      const res = await axios.post(url,body);
      if (res.data.success) {
        fetchFeaturedWorkshops();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to toggle workshop");
    }
  };

  return {
    youtubeState: {
      youtubeVideos,
      youtubeUrl,
      setYoutubeUrl,
      isAddingYoutube,
      youtubeSaved,
      setYoutubeSaved,
      addYoutubeVideo,
      deleteYoutubeVideo,
    },
    heroState: {
      images,
      heroSaved,
      setHeroSaved,
      updateCaption,
      toggleActive,
      removeImage,
      saveHero,
    },
    expertState: {
      activeTab,
      searchQuery,
      setSearchQuery,
      selected,
      expertSaved,
      setExpertSaved,
      toggleExpert,
      handleTabChange,
    },
    workshopState: {
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
    },
  };
}
