import { useState, useEffect, use } from "react";
import axios from "axios";
import {
  allExperts,
} from "../../data/mockData";

export default function useHomepageState() {
  // ── Youtube Videos state ──────────────────────────────────────────────────
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isAddingYoutube, setIsAddingYoutube] = useState(false);
  const [youtubeSaved, setYoutubeSaved] = useState(false);

  useEffect(() => {
    fetch("https://toptrainer-backend-production.up.railway.app//api/youtube-videos")
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
      const res = await fetch("https://toptrainer-backend-production.up.railway.app//api/youtube-videos", {
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
        `https://toptrainer-backend-production.up.railway.app//api/youtube-videos/${id}`,
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
  const [images, setImages] = useState([]);
  const [heroSaved, setHeroSaved] = useState(false);

  useEffect(() => {
    fetch("https://toptrainer-backend-production.up.railway.app//api/hero-images")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setImages(data.data);
        }
      })
      .catch((err) => console.error("Failed to fetch hero images", err));
  }, []);

  const toggleActive = async (id) => {
    const imgToUpdate = images.find((img) => img._id === id);
    if (!imgToUpdate) return;
    
    // Optimistic UI update
    setImages((prev) =>
      prev.map((img) =>
        img._id === id ? { ...img, active: !img.active } : img,
      ),
    );

    try {
      await axios.put(`https://toptrainer-backend-production.up.railway.app//api/hero-images/${id}`, {
        active: !imgToUpdate.active,
      }, { withCredentials: true });
    } catch (err) {
      console.error("Failed to toggle active", err);
      // Revert on failure
      setImages((prev) =>
        prev.map((img) =>
          img._id === id ? { ...img, active: imgToUpdate.active } : img,
        ),
      );
    }
  };

  const updateCaption = async (id, newCaption) => {
    // Optimistic UI update
    const originalImage = images.find(img => img._id === id);
    if (!originalImage) return;

    setImages(prev => prev.map(img => img._id === id ? { ...img, caption: newCaption } : img));
    
    try {
      await axios.put(`https://toptrainer-backend-production.up.railway.app//api/hero-images/${id}`, {
        caption: newCaption,
      }, { withCredentials: true });
    } catch (err) {
      console.error("Failed to update caption", err);
      // Revert on failure
      setImages(prev => prev.map(img => img._id === id ? { ...img, caption: originalImage.caption } : img));
    }
  };

  const removeImage = async (id) => {
    try {
      const res = await axios.delete(`https://toptrainer-backend-production.up.railway.app//api/hero-images/${id}`, { withCredentials: true });
      if (res.data.success) {
        setImages((prev) => prev.filter((img) => img._id !== id));
      }
    } catch (err) {
      console.error("Failed to delete image", err);
    }
  };

  const addHeroImage = async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post("https://toptrainer-backend-production.up.railway.app//api/hero-images", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        setImages((prev) => [...prev, res.data.data]);
        setHeroSaved(true);
        setTimeout(() => setHeroSaved(false), 3000);
      }
    } catch (err) {
      console.error("Failed to upload hero image", err);
    }
  };

  // Reordering logic
  const reorderHeroImages = async (newImages) => {
    setImages(newImages); // Optimistic UI update
    const orderMap = {};
    newImages.forEach((img, index) => {
      orderMap[img._id] = index;
    });

    try {
      await axios.put("https://toptrainer-backend-production.up.railway.app//api/hero-images/reorder", { orderMap }, { withCredentials: true });
    } catch (err) {
      console.error("Failed to reorder images", err);
    }
  };

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
        `https://toptrainer-backend-production.up.railway.app//api/featured-lists?itemType=TrainerProfile&category=${activeTrainerTab}`,
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
      let url = `https://toptrainer-backend-production.up.railway.app//api/search/trainers?keyword=${encodeURIComponent(
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
    let url = "https://toptrainer-backend-production.up.railway.app//api/featured-lists/toggle";
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
        `https://toptrainer-backend-production.up.railway.app//api/featured-lists?itemType=Workshop&category=${activeWorkshopTab}`,
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
      let url = `https://toptrainer-backend-production.up.railway.app//api/search/workshops?keyword=${encodeURIComponent(
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
    let url ="https://toptrainer-backend-production.up.railway.app//api/featured-lists/toggle";

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

  // Article Section
  const articleTabs = [
    { key: "TrainerProfile", label: "Trainer" },
    { key: "Admin", label: "Admin" },
  ];

  const [activeArticleTab, setActiveArticleTab] = useState("TrainerProfile");
  const [articleSearchQuery, setArticleSearchQuery] = useState("");
  const [articleSearchResults, setArticleSearchResults] = useState([]);
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [isSearchingArticle, setIsSearchingArticle] = useState(false);
  const [articleSearchCurrentPage, setArticleSearchCurrentPage] = useState(1);
  const [articleSearchTotalPages, setArticleSearchTotalPages] = useState(1);

  const fetchFeaturedArticles = async () => {
    try {
      const res = await axios.get(
        `https://toptrainer-backend-production.up.railway.app//api/featured-lists?itemType=Article&category=${activeArticleTab}`
      );
      if (res.data.success) {
        const articlesOnly = res.data.data.map((item) => item.itemRef);
        setFeaturedArticles(articlesOnly);
      }
    } catch (err) {
      console.error("Failed to fetch featured articles", err);
    }
  };

  useEffect(() => {
    fetchFeaturedArticles();
  }, [activeArticleTab]);

  const toggleFeaturedArticle = async (id) => {
    let url = "https://toptrainer-backend-production.up.railway.app//api/featured-lists/toggle";
    let body = {
      itemRef: id,
      itemType: "Article",
      category: activeArticleTab,
    };
    try {
      const res = await axios.post(url, body);
      if (res.data.success) {
        fetchFeaturedArticles();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to toggle article");
    }
  };

  const handleArticleSearch = async (page = 1) => {
    setIsSearchingArticle(true);
    try {
      let url = `https://toptrainer-backend-production.up.railway.app//api/articles?page=${page}&limit=10`;

      if (articleSearchQuery.trim() !== "") {
        url += `&keyword=${encodeURIComponent(articleSearchQuery)}`;
      }
      if (activeArticleTab) {
        url += `&creatorType=${encodeURIComponent(activeArticleTab)}`;
      }

      const res = await axios.get(url);
      if (res.data.success) {
        setArticleSearchResults(res.data.data || []);
        setArticleSearchCurrentPage(res.data.currentPage || 1);
        setArticleSearchTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      console.error("Failed to search articles", err);
    } finally {
      setIsSearchingArticle(false);
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
      addHeroImage,
      reorderHeroImages,
      toggleActive,
      updateCaption,
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
      workshopTabs,
      featuredWorkshops,
      searchWorkshopQuery,
      searchResults,
      searchCurrentPage,
      searchTotalPages,
      isSearching,
      activeWorkshopTab,
      setSearchWorkshopQuery,
      setActiveWorkshopTab,
      setSearchResults,
      handleWorkshopSearch,
      toggleFeaturedWorkshop,
    },
    articleState: {
      articleTabs,
      featuredArticles,
      articleSearchQuery,
      articleSearchResults,
      activeArticleTab,
      isSearchingArticle,
      articleSearchCurrentPage,
      articleSearchTotalPages,
      setActiveArticleTab,
      setArticleSearchQuery,
      setArticleSearchResults,
      handleArticleSearch,
      toggleFeaturedArticle,
    },
  };
}