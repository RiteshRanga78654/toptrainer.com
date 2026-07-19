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

  // ── Expert state (Trainers) ────────────────────────────────────────────────
  const [featuredTrainers, setFeaturedTrainers] = useState([]);
  const [searchTrainerQuery, setSearchTrainerQuery] = useState("");
  const [searchTrainerResults, setSearchTrainerResults] = useState([]);
  const [searchTrainerCurrentPage, setSearchTrainerCurrentPage] = useState(1);
  const [searchTrainerTotalPages, setSearchTrainerTotalPages] = useState(1);
  const [isSearchingTrainer, setIsSearchingTrainer] = useState(false);
  const [activeTrainerTab, setActiveTrainerTab] = useState("Sales");

  const trainerTabs = [
    { key: "Marketing", label: "Sales" },
    { key: "Technology", label: "Tech" },
    { key: "Business", label: "Business" },
  ];

  const fetchFeaturedTrainers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5001/api/featured-lists?itemType=TrainerProfile&category=${activeTrainerTab}`,
      );
      if (res.data.success) {
        const trainersOnly = res.data.data.map(item => item.itemRef);
        setFeaturedTrainers(trainersOnly);
      }
    } catch (err) {
      console.error("Failed to fetch featured trainers", err);
    }
  };

  useEffect(() => {
    fetchFeaturedTrainers();
  }, [activeTrainerTab]);

  const handleTrainerSearch = async (page = 1) => {
    setIsSearchingTrainer(true);
    try {
      let url = `http://localhost:5001/api/search/trainers?keyword=${encodeURIComponent(
        searchTrainerQuery,
      )}&page=${page}`;
      
      if (activeTrainerTab !== "All") {
        url += `&industry=${encodeURIComponent(activeTrainerTab)}`;
      }
      const res = await axios.get(url);
      if (res.data.success) {
        setSearchTrainerResults(res.data.trainers || []);
        setSearchTrainerCurrentPage(res.data.currentPage || 1);
        setSearchTrainerTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to search trainers", err);
    } finally {
      setIsSearchingTrainer(false);
    }
  };

  const toggleFeaturedTrainer = async (id) => {
    let url = "http://localhost:5001/api/featured-lists/toggle";
    let body = {
      itemRef: id,
      itemType: "TrainerProfile",
      category: activeTrainerTab
    }
    try {
      const res = await axios.post(url, body);
      if (res.data.success) {
        fetchFeaturedTrainers();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to toggle trainer");
    }
  };



  // ── Workshops previewer state ────────────────────────────────────────────────
  const [featuredWorkshops, setFeaturedWorkshops] = useState([]);
  const [searchWorkshopQuery, setSearchWorkshopQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [searchTotalPages, setSearchTotalPages] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [activeWorkshopTab, setActiveWorkshopTab] = useState("All");
  const [topWorkshopsByIndustry, setTopWorkshopsByIndustry] = useState([]);

  const workshopTabs = [
    { key: "All", label: "All" },
    { key: "Technology", label: "Tech" },
    { key: "Business", label: "Business" },
    { key: "Health", label: "Health" },
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
        const workshopOnly = res.data.data.map(item => item.itemRef);
        setFeaturedWorkshops(workshopOnly);
      }
    } catch (err) {
      console.error("Failed to fetch featured workshops", err);
    }
  };

 
  useEffect(() => {
    fetchFeaturedWorkshops();
  }, [activeWorkshopTab]);

  const handleWorkshopSearch = async (page = 1) => {

    setIsSearching(true);
    try {
      let url = `http://localhost:5001/api/search/workshops?keyword=${encodeURIComponent(
        searchWorkshopQuery,
      )}&page=${page}`;
      if (activeWorkshopTab !== "All") {
        url += `&industry=${encodeURIComponent(activeWorkshopTab)}`;
      }
      const res = await axios.get(url);
      if (res.data.success) {
        setSearchResults(res.data.workshops || []);
        setSearchCurrentPage(res.data.currentPage || 1);
        setSearchTotalPages(res.data.totalPages || 1);
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
      itemRef: id,
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
    },
    workshopState: {
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
    },
  };
}
