"use client";

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { Card, Badge, Button, Modal, Input, Toggle, Toast } from "../../components/ui";
import {
  industryAPI,
  trainersAPI,
  adminWorkshopsAPI,
  youtubeVideosAPI,
  articlesAPI,
} from "../../lib/api";
import YoutubeSection from "../homepage/components/YoutubeSection";
import FeaturedArticles from "../homepage/components/FeaturedArticles";

export default function IndustryPage() {
  const [industries, setIndustries] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [selectedTrainers, setSelectedTrainers] = useState([]);
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toast, setToast] = useState(null);

  const [form, setForm] = useState({
    name: "",
    icon: "🏢",
  });

  const [selectedIndustryId, setSelectedIndustryId] = useState("");

  const [youtubeInputs, setYoutubeInputs] = useState({});
  const [youtubeVideosByIndustry, setYoutubeVideosByIndustry] = useState({});
  const [isAddingYoutubeFor, setIsAddingYoutubeFor] = useState(null);
  const [isLoadingYoutubeFor, setIsLoadingYoutubeFor] = useState(null);

  const [articleTabs] = useState([]);

  const [activeArticleTabByIndustry, setActiveArticleTabByIndustry] = useState({});
  const [articleSearchQueryByIndustry, setArticleSearchQueryByIndustry] = useState({});
  const [articleSearchResultsByIndustry, setArticleSearchResultsByIndustry] = useState({});
  const [featuredArticlesByIndustry, setFeaturedArticlesByIndustry] = useState({});
  const [isSearchingArticleFor, setIsSearchingArticleFor] = useState(null);
  const [articleSearchCurrentPageByIndustry, setArticleSearchCurrentPageByIndustry] = useState({});
  const [articleSearchTotalPagesByIndustry, setArticleSearchTotalPagesByIndustry] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const selectedIndustry =
    industries.find((item) => item._id === selectedIndustryId) || null;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [industryRes, trainerRes, workshopRes] = await Promise.all([
        industryAPI.getAll(),
        trainersAPI.getAll(),
        adminWorkshopsAPI.getAll(),
      ]);

      const industriesData = industryRes?.data?.industries || industryRes?.data?.data || [];
      setIndustries(industriesData);
      setTrainers(trainerRes?.data?.trainers || trainerRes?.data?.data || []);
      setWorkshops(workshopRes?.data?.workshops || workshopRes?.data?.data || []);

      if (industriesData.length > 0) {
        setSelectedIndustryId((prev) => {
          const stillExists = industriesData.some((item) => item._id === prev);
          return stillExists ? prev : industriesData[0]._id;
        });
      } else {
        setSelectedIndustryId("");
      }

      for (const industry of industriesData) {
        if (!industry?._id) continue;

        fetchIndustryVideos(industry._id);
        fetchIndustryArticles(industry._id);
        handleArticleSearch(industry._id, 1);

        setActiveArticleTabByIndustry((prev) => ({
          ...prev,
          [industry._id]: prev[industry._id] || "all",
        }));

        setArticleSearchQueryByIndustry((prev) => ({
          ...prev,
          [industry._id]: prev[industry._id] || "",
        }));

        setArticleSearchResultsByIndustry((prev) => ({
          ...prev,
          [industry._id]: prev[industry._id] || [],
        }));

        setArticleSearchCurrentPageByIndustry((prev) => ({
          ...prev,
          [industry._id]: prev[industry._id] || 1,
        }));

        setArticleSearchTotalPagesByIndustry((prev) => ({
          ...prev,
          [industry._id]: prev[industry._id] || 0,
        }));
      }
    } catch (err) {
      console.log("Fetch error:", err?.response?.data || err.message);
      showToast("Failed to load industries");
    } finally {
      setLoading(false);
    }
  };

  const fetchIndustryVideos = async (industryId) => {
    if (!industryId) return;

    try {
      setIsLoadingYoutubeFor(industryId);

      const res = await youtubeVideosAPI.getAll({
        scope: "entity",
        entityType: "Industry",
        entityId: industryId,
      });

      setYoutubeVideosByIndustry((prev) => ({
        ...prev,
        [industryId]: res?.data?.data || [],
      }));
    } catch (err) {
      console.log("Video fetch error:", err?.response?.data || err.message);
      setYoutubeVideosByIndustry((prev) => ({
        ...prev,
        [industryId]: [],
      }));
    } finally {
      setIsLoadingYoutubeFor(null);
    }
  };

  const fetchIndustryArticles = async (industryId) => {
    if (!industryId) return;

    try {
      const res = await articlesAPI.searchPublic({
        industry: industryId,
        limit: 50,
      });

      setFeaturedArticlesByIndustry((prev) => ({
        ...prev,
        [industryId]: res?.data?.data || [],
      }));
    } catch (err) {
      console.log("Article fetch error:", err?.response?.data || err.message);
      setFeaturedArticlesByIndustry((prev) => ({
        ...prev,
        [industryId]: [],
      }));
    }
  };

  const handleArticleSearch = async (industryId, page = 1) => {
    if (!industryId) return;

    try {
      setIsSearchingArticleFor(industryId);

      const query = articleSearchQueryByIndustry[industryId] || "";

      const res = await articlesAPI.searchPublic({
        keyword: query.trim() || undefined,
        page,
        limit: 10,
      });

      setArticleSearchResultsByIndustry((prev) => ({
        ...prev,
        [industryId]: res?.data?.data || [],
      }));

      setArticleSearchCurrentPageByIndustry((prev) => ({
        ...prev,
        [industryId]: res?.data?.currentPage || page,
      }));

      setArticleSearchTotalPagesByIndustry((prev) => ({
        ...prev,
        [industryId]: res?.data?.totalPages || 0,
      }));
    } catch (err) {
      console.log("Article search error:", err?.response?.data || err.message);

      setArticleSearchResultsByIndustry((prev) => ({
        ...prev,
        [industryId]: [],
      }));

      setArticleSearchCurrentPageByIndustry((prev) => ({
        ...prev,
        [industryId]: 1,
      }));

      setArticleSearchTotalPagesByIndustry((prev) => ({
        ...prev,
        [industryId]: 0,
      }));
    } finally {
      setIsSearchingArticleFor(null);
    }
  };

  const toggleFeaturedArticle = async (industryId, articleId) => {
    if (!industryId) return;

    const featuredArticles = featuredArticlesByIndustry[industryId] || [];
    const isCurrentlyTagged = featuredArticles.some(
      (item) => (item._id || item.id) === articleId
    );

    try {
      await articlesAPI.updateTaxonomy(articleId, {
        industry: isCurrentlyTagged ? null : industryId,
      });

      showToast(
        isCurrentlyTagged
          ? "Article removed from this industry"
          : "Article added to this industry"
      );

      await fetchIndustryArticles(industryId);
    } catch (err) {
      console.log("Featured articles save error:", err?.response?.data || err.message);
      showToast(err?.response?.data?.message || "Failed to update featured articles");
    }
  };

  const openAdd = () => {
    setEditing(null);
    setSelectedTrainers([]);
    setSelectedWorkshops([]);
    setForm({
      name: "",
      icon: "🏢",
    });
    setModal(true);
  };

  const openEdit = (industry) => {
    setEditing(industry);
    setForm({
      name: industry.name || "",
      icon: industry.icon || "🏢",
    });
    setSelectedTrainers(industry.trainers?.map((t) => t._id || t.id) || []);
    setSelectedWorkshops(industry.workshops?.map((w) => w._id || w.id) || []);
    setModal(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        trainers: selectedTrainers,
        workshops: selectedWorkshops,
      };

      if (editing) {
        await industryAPI.update(editing._id, payload);
        showToast("Industry updated successfully");
      } else {
        await industryAPI.create(payload);
        showToast("Industry added successfully");
      }

      await fetchData();
      setModal(false);
    } catch (err) {
      console.log("Save error:", err?.response?.data || err.message);
      showToast("Failed to save industry");
    }
  };

  const handleDelete = async (id) => {
    try {
      await industryAPI.delete(id);

      setIndustries((prev) => prev.filter((item) => item._id !== id));

      setYoutubeVideosByIndustry((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setYoutubeInputs((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setFeaturedArticlesByIndustry((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setArticleSearchQueryByIndustry((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setArticleSearchResultsByIndustry((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setActiveArticleTabByIndustry((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setArticleSearchCurrentPageByIndustry((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setArticleSearchTotalPagesByIndustry((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setSelectedIndustryId((prev) => {
        if (prev !== id) return prev;
        const remaining = industries.filter((item) => item._id !== id);
        return remaining[0]?._id || "";
      });

      showToast("Industry deleted successfully");
    } catch (err) {
      console.log("Delete error:", err?.response?.data || err.message);
      showToast("Failed to delete industry");
    }
  };

  const handleToggle = async (industry) => {
    const id = industry._id;
    const previousValue = !!industry.isActive;
    const nextValue = !previousValue;

    setIndustries((prev) =>
      prev.map((item) => (item._id === id ? { ...item, isActive: nextValue } : item))
    );

    try {
      const res = await industryAPI.toggleStatus(id);
      const updatedIndustry = res?.data?.data;

      setIndustries((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isActive: updatedIndustry?.isActive ?? nextValue }
            : item
        )
      );

      showToast(
        `Industry ${(updatedIndustry?.isActive ?? nextValue) ? "activated" : "deactivated"}`
      );
    } catch (err) {
      setIndustries((prev) =>
        prev.map((item) => (item._id === id ? { ...item, isActive: previousValue } : item))
      );
      console.log("toggle error:", err?.response?.data || err.message);
      showToast("Status update failed");
    }
  };

  const addYoutubeVideo = async (industryId) => {
    const youtubeUrl = youtubeInputs[industryId] || "";

    if (!industryId) {
      showToast("Industry not found");
      return;
    }

    if (!youtubeUrl.trim()) {
      showToast("Please enter a YouTube URL");
      return;
    }

    try {
      setIsAddingYoutubeFor(industryId);

      const payload = {
        url: youtubeUrl,
        scope: "entity",
        entityType: "Industry",
        entityId: industryId,
      };

      const res = await youtubeVideosAPI.create(payload);
      const newVideo = res?.data?.data;

      if (newVideo) {
        setYoutubeVideosByIndustry((prev) => ({
          ...prev,
          [industryId]: [newVideo, ...(prev[industryId] || [])],
        }));
      }

      setYoutubeInputs((prev) => ({
        ...prev,
        [industryId]: "",
      }));

      showToast("YouTube video added successfully");
    } catch (err) {
      console.log("Add video error:", err?.response?.data || err.message);
      showToast(err?.response?.data?.message || "Failed to add video");
    } finally {
      setIsAddingYoutubeFor(null);
    }
  };

  const deleteYoutubeVideo = async (industryId, videoId) => {
    try {
      await youtubeVideosAPI.delete(videoId);

      setYoutubeVideosByIndustry((prev) => ({
        ...prev,
        [industryId]: (prev[industryId] || []).filter((video) => video._id !== videoId),
      }));

      showToast("Video deleted successfully");
    } catch (err) {
      console.log("Delete video error:", err?.response?.data || err.message);
      showToast("Failed to delete video");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex justify-end">
        <Button onClick={openAdd}>
          <Plus size={14} />
          Add Industry
        </Button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Loading industries...</div>
      ) : industries.length === 0 ? (
        <Card className="p-6 text-center text-sm text-slate-500">
          No industries found.
        </Card>
      ) : (
        <>
          <div className="space-y-4">
            {industries.map((ind) => {
              const isSelected = selectedIndustryId === ind._id;

              return (
                <Card
                  key={ind._id}
                  className={`p-4 border rounded-xl cursor-pointer transition ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setSelectedIndustryId(ind._id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                        {ind.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-slate-900 truncate">{ind.name}</h3>
                          {isSelected && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                              Selected
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500 flex-wrap">
                          <span>{ind.trainers?.length || 0} experts</span>
                          <span className="text-slate-300">•</span>
                          <span>{ind.workshops?.length || 0} workshops</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="hidden sm:flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Badge variant={ind.isActive ? "success" : "danger"}>
                        {ind.isActive ? "Active" : "Inactive"}
                      </Badge>

                      <Button variant="ghost" size="sm" onClick={() => openEdit(ind)}>
                        <Edit2 size={12} />
                      </Button>

                      <Button variant="danger" size="sm" onClick={() => handleDelete(ind._id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>

                    <div
                      className="flex items-center justify-end shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Toggle checked={!!ind.isActive} onChange={() => handleToggle(ind)} />
                    </div>
                  </div>

                  <div
                    className="sm:hidden flex items-center gap-2 mt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Badge variant={ind.isActive ? "success" : "danger"}>
                      {ind.isActive ? "Active" : "Inactive"}
                    </Badge>

                    <div className="ml-auto flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(ind)}>
                        <Edit2 size={12} />
                      </Button>

                      <Button variant="danger" size="sm" onClick={() => handleDelete(ind._id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {selectedIndustry && (
            <div className="space-y-4">
              <Card className="p-4 border border-slate-200 rounded-xl">
                <div className="text-sm text-slate-500">Managing content for</div>
                <div className="mt-1 font-semibold text-slate-900">
                  {selectedIndustry.icon} {selectedIndustry.name}
                </div>
              </Card>

              {isLoadingYoutubeFor === selectedIndustry._id ? (
                <Card className="p-4 text-sm text-slate-500">Loading videos...</Card>
              ) : (
                <YoutubeSection
                  youtubeUrl={youtubeInputs[selectedIndustry._id] || ""}
                  setYoutubeUrl={(value) =>
                    setYoutubeInputs((prev) => ({
                      ...prev,
                      [selectedIndustry._id]: value,
                    }))
                  }
                  youtubeVideos={youtubeVideosByIndustry[selectedIndustry._id] || []}
                  isAddingYoutube={isAddingYoutubeFor === selectedIndustry._id}
                  addYoutubeVideo={() => addYoutubeVideo(selectedIndustry._id)}
                  deleteYoutubeVideo={(videoId) =>
                    deleteYoutubeVideo(selectedIndustry._id, videoId)
                  }
                  title={`${selectedIndustry.name} YouTube Videos`}
                  subtitle={`Videos shown for "${selectedIndustry.name}"`}
                />
              )}

              <FeaturedArticles
                articleTabs={articleTabs}
                featuredArticles={featuredArticlesByIndustry[selectedIndustry._id] || []}
                articleSearchQuery={articleSearchQueryByIndustry[selectedIndustry._id] || ""}
                articleSearchResults={articleSearchResultsByIndustry[selectedIndustry._id] || []}
                activeArticleTab={activeArticleTabByIndustry[selectedIndustry._id] || "all"}
                isSearchingArticle={isSearchingArticleFor === selectedIndustry._id}
                articleSearchCurrentPage={
                  articleSearchCurrentPageByIndustry[selectedIndustry._id] || 1
                }
                articleSearchTotalPages={
                  articleSearchTotalPagesByIndustry[selectedIndustry._id] || 0
                }
                setActiveArticleTab={(tabKey) =>
                  setActiveArticleTabByIndustry((prev) => ({
                    ...prev,
                    [selectedIndustry._id]: tabKey,
                  }))
                }
                setArticleSearchQuery={(value) =>
                  setArticleSearchQueryByIndustry((prev) => ({
                    ...prev,
                    [selectedIndustry._id]: value,
                  }))
                }
                handleArticleSearch={(page) => handleArticleSearch(selectedIndustry._id, page)}
                toggleFeaturedArticle={(articleId) =>
                  toggleFeaturedArticle(selectedIndustry._id, articleId)
                }
              />
            </div>
          )}
        </>
      )}

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editing ? "Edit Industry" : "Add Industry"}
      >
        <div className="space-y-4">
          <Input
            label="Industry Name"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            placeholder="e.g. Healthcare"
          />

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">Icon (emoji)</label>
            <input
              value={form.icon}
              onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
              maxLength={2}
              className="w-full px-3 py-2 rounded-lg border border-slate-200 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setModal(false)} className="flex-1">
              Cancel
            </Button>

            <Button onClick={handleSave} className="flex-1">
              {editing ? "Update" : "Add"}
            </Button>
          </div>
        </div>
      </Modal>

      {toast && <Toast message={toast} type="success" onClose={() => setToast(null)} />}
    </div>
  );
}