"use client";

import {
  Card,
  Badge,
  Button,
  Modal,
  Input,
  Select,
  Toggle,
  Toast,
} from "../../components/ui";
import { Plus, Edit2, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  competenciesAPI,
  competencyAPI,
  trainersAPI,
  adminWorkshopsAPI,
  youtubeVideosAPI,
  articlesAPI,
} from "../../lib/api";
import YoutubeSection from "../homepage/components/YoutubeSection";
import FeaturedArticles from "../homepage/components/FeaturedArticles";

export default function CompetencyPage() {
  const [competencies, setCompetencies] = useState([]);
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
    icon: "🎯",
  });

  const [selectedCompetencyId, setSelectedCompetencyId] = useState("");

  const [youtubeVideosByCompetency, setYoutubeVideosByCompetency] = useState({});
  const [youtubeInputs, setYoutubeInputs] = useState({});
  const [isAddingYoutubeFor, setIsAddingYoutubeFor] = useState(null);
  const [isLoadingYoutubeFor, setIsLoadingYoutubeFor] = useState(null);

  const [articleTabs] = useState([]);
  const [activeArticleTabByCompetency, setActiveArticleTabByCompetency] = useState({});
  const [articleSearchQueryByCompetency, setArticleSearchQueryByCompetency] = useState({});
  const [articleSearchResultsByCompetency, setArticleSearchResultsByCompetency] = useState({});
  const [featuredArticlesByCompetency, setFeaturedArticlesByCompetency] = useState({});
  const [isSearchingArticleFor, setIsSearchingArticleFor] = useState(null);
  const [articleSearchCurrentPageByCompetency, setArticleSearchCurrentPageByCompetency] = useState({});
  const [articleSearchTotalPagesByCompetency, setArticleSearchTotalPagesByCompetency] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const selectedCompetency =
    competencies.find((item) => item._id === selectedCompetencyId) || null;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [competencyRes, trainerRes, workshopRes] = await Promise.all([
        competenciesAPI.getAll(),
        trainersAPI.getAll(),
        adminWorkshopsAPI.getAll(),
      ]);

      const competenciesData =
        competencyRes?.data?.competencies || competencyRes?.data?.data || [];

      setCompetencies(competenciesData);
      setTrainers(trainerRes?.data?.trainers || trainerRes?.data?.data || []);
      setWorkshops(workshopRes?.data?.workshops || workshopRes?.data?.data || []);

      if (competenciesData.length > 0) {
        setSelectedCompetencyId((prev) => {
          const stillExists = competenciesData.some((item) => item._id === prev);
          return stillExists ? prev : competenciesData[0]._id;
        });
      } else {
        setSelectedCompetencyId("");
      }

      for (const competency of competenciesData) {
        if (!competency?._id) continue;

        fetchCompetencyVideos(competency._id);
        fetchCompetencyArticles(competency._id);

        setActiveArticleTabByCompetency((prev) => ({
          ...prev,
          [competency._id]: prev[competency._id] || "all",
        }));

        setArticleSearchQueryByCompetency((prev) => ({
          ...prev,
          [competency._id]: prev[competency._id] || "",
        }));

        setArticleSearchResultsByCompetency((prev) => ({
          ...prev,
          [competency._id]: prev[competency._id] || [],
        }));

        setArticleSearchCurrentPageByCompetency((prev) => ({
          ...prev,
          [competency._id]: prev[competency._id] || 1,
        }));

        setArticleSearchTotalPagesByCompetency((prev) => ({
          ...prev,
          [competency._id]: prev[competency._id] || 0,
        }));
      }
    } catch (err) {
      console.log("Fetch error:", err?.response?.data || err.message);
      showToast("Failed to load competencies");
    } finally {
      setLoading(false);
    }
  };

  const fetchCompetencyVideos = async (competencyId) => {
    if (!competencyId) return;

    try {
      setIsLoadingYoutubeFor(competencyId);

      const res = await youtubeVideosAPI.getAll({
        scope: "entity",
        entityType: "Competency",
        entityId: competencyId,
      });

      setYoutubeVideosByCompetency((prev) => ({
        ...prev,
        [competencyId]: res?.data?.data || [],
      }));
    } catch (err) {
      console.log("Video fetch error:", err?.response?.data || err.message);
      setYoutubeVideosByCompetency((prev) => ({
        ...prev,
        [competencyId]: [],
      }));
    } finally {
      setIsLoadingYoutubeFor(null);
    }
  };

  const fetchCompetencyArticles = async (competencyId) => {
    if (!competencyId) return;

    try {
      const res = await articlesAPI.searchPublic({
        competency: competencyId,
        limit: 50,
      });

      setFeaturedArticlesByCompetency((prev) => ({
        ...prev,
        [competencyId]: res?.data?.data || [],
      }));
    } catch (err) {
      console.log("Article fetch error:", err?.response?.data || err.message);
      setFeaturedArticlesByCompetency((prev) => ({
        ...prev,
        [competencyId]: [],
      }));
    }
  };

  const handleArticleSearch = async (competencyId, page = 1) => {
    if (!competencyId) return;

    try {
      setIsSearchingArticleFor(competencyId);

      const query = articleSearchQueryByCompetency[competencyId] || "";

      const res = await articlesAPI.searchPublic({
        keyword: query.trim() || undefined,
        page,
        limit: 10,
      });

      setArticleSearchResultsByCompetency((prev) => ({
        ...prev,
        [competencyId]: res?.data?.data || [],
      }));

      setArticleSearchCurrentPageByCompetency((prev) => ({
        ...prev,
        [competencyId]: res?.data?.currentPage || page,
      }));

      setArticleSearchTotalPagesByCompetency((prev) => ({
        ...prev,
        [competencyId]: res?.data?.totalPages || 0,
      }));
    } catch (err) {
      console.log("Article search error:", err?.response?.data || err.message);

      setArticleSearchResultsByCompetency((prev) => ({
        ...prev,
        [competencyId]: [],
      }));

      setArticleSearchCurrentPageByCompetency((prev) => ({
        ...prev,
        [competencyId]: 1,
      }));

      setArticleSearchTotalPagesByCompetency((prev) => ({
        ...prev,
        [competencyId]: 0,
      }));
    } finally {
      setIsSearchingArticleFor(null);
    }
  };

  const toggleFeaturedArticle = async (competencyId, articleId) => {
    if (!competencyId) return;

    const featuredArticles = featuredArticlesByCompetency[competencyId] || [];
    const isCurrentlyTagged = featuredArticles.some(
      (item) => (item._id || item.id) === articleId
    );

    try {
      await articlesAPI.updateTaxonomy(articleId, {
        competency: isCurrentlyTagged ? null : competencyId,
      });

      showToast(
        isCurrentlyTagged
          ? "Article removed from this competency"
          : "Article added to this competency"
      );

      await fetchCompetencyArticles(competencyId);
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
      icon: "🎯",
    });
    setModal(true);
  };

  const openEdit = (competency) => {
    setEditing(competency);
    setForm({
      name: competency.name || "",
      icon: competency.icon || "🎯",
    });
    setSelectedTrainers(competency.trainers?.map((t) => t._id) || []);
    setSelectedWorkshops(competency.workshops?.map((w) => w._id) || []);
    setModal(true);
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        trainers: selectedTrainers,
        workshops: selectedWorkshops,
      };

      let savedId = editing?._id;

      if (editing) {
        await competenciesAPI.update(editing._id, payload);
        showToast("Competency updated successfully");
      } else {
        const res = await competenciesAPI.create(payload);
        savedId = res?.data?.competency?._id || res?.data?.data?._id;
        showToast("Competency added successfully");
      }

      await fetchData();
      setModal(false);

      if (savedId) setSelectedCompetencyId(savedId);
    } catch (err) {
      console.log("Save error:", err?.response?.data || err.message);
      showToast("Failed to save competency");
    }
  };

  const handleDelete = async (id) => {
    try {
      await competenciesAPI.delete(id);
      setCompetencies((prev) => prev.filter((item) => item._id !== id));

      setYoutubeVideosByCompetency((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setFeaturedArticlesByCompetency((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setSelectedCompetencyId((prev) => {
        if (prev !== id) return prev;
        const remaining = competencies.filter((item) => item._id !== id);
        return remaining[0]?._id || "";
      });

      showToast("Competency deleted successfully");
    } catch (err) {
      console.log("Delete error:", err?.response?.data || err.message);
      showToast("Failed to delete competency");
    }
  };

  const handleToggle = async (competency) => {
    const id = competency._id;
    const previousValue = !!competency.isActive;
    const nextValue = !previousValue;

    setCompetencies((prev) =>
      prev.map((item) => (item._id === id ? { ...item, isActive: nextValue } : item))
    );

    try {
      const res = await competencyAPI.toggleStatus(id);
      const updatedCompetency = res?.data?.data;

      setCompetencies((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isActive: updatedCompetency?.isActive ?? nextValue }
            : item
        )
      );

      showToast(
        `Competency ${(updatedCompetency?.isActive ?? nextValue) ? "activated" : "deactivated"}`
      );
    } catch (err) {
      setCompetencies((prev) =>
        prev.map((item) => (item._id === id ? { ...item, isActive: previousValue } : item))
      );
      console.log("Toggle error:", err?.response?.data || err.message);
      showToast("Status update failed");
    }
  };

  const addYoutubeVideo = async (competencyId) => {
    const youtubeUrl = youtubeInputs[competencyId] || "";

    if (!competencyId) {
      showToast("Competency not found");
      return;
    }

    if (!youtubeUrl.trim()) {
      showToast("Please enter a YouTube URL");
      return;
    }

    try {
      setIsAddingYoutubeFor(competencyId);

      const payload = {
        url: youtubeUrl,
        scope: "entity",
        entityType: "Competency",
        entityId: competencyId,
      };

      const res = await youtubeVideosAPI.create(payload);
      const newVideo = res?.data?.data;

      if (newVideo) {
        setYoutubeVideosByCompetency((prev) => ({
          ...prev,
          [competencyId]: [newVideo, ...(prev[competencyId] || [])],
        }));
      }

      setYoutubeInputs((prev) => ({
        ...prev,
        [competencyId]: "",
      }));

      showToast("YouTube video added successfully");
    } catch (err) {
      console.log("Add video error:", err?.response?.data || err.message);
      showToast(err?.response?.data?.message || "Failed to add video");
    } finally {
      setIsAddingYoutubeFor(null);
    }
  };

  const deleteYoutubeVideo = async (competencyId, videoId) => {
    try {
      await youtubeVideosAPI.delete(videoId);

      setYoutubeVideosByCompetency((prev) => ({
        ...prev,
        [competencyId]: (prev[competencyId] || []).filter(
          (video) => video._id !== videoId
        ),
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
          Add Competency
        </Button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Loading competencies...</div>
      ) : competencies.length === 0 ? (
        <Card className="p-6 text-center text-sm text-slate-500">
          No competencies found.
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {competencies.map((item) => {
              const isSelected = selectedCompetencyId === item._id;

              return (
                <Card
                  key={item._id}
                  className={`p-4 border rounded-xl cursor-pointer transition ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setSelectedCompetencyId(item._id)}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="h-14 w-14 rounded-xl bg-slate-100 flex items-center justify-center text-2xl shrink-0">
                        {item.icon}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-slate-900 truncate">
                            {item.name}
                          </h3>
                          {isSelected && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200">
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 mt-1 text-sm text-slate-500 flex-wrap">
                          <span>{item.trainers?.length || 0} experts</span>
                          <span className="text-slate-300">•</span>
                          <span>{item.workshops?.length || 0} workshops</span>
                        </div>
                      </div>
                    </div>

                    <div
                      className="hidden sm:flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Badge variant={item.isActive ? "success" : "danger"}>
                        {item.isActive ? "Active" : "Inactive"}
                      </Badge>
                      <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                        <Edit2 size={12} />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>

                    <div
                      className="flex items-center justify-end shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Toggle checked={!!item.isActive} onChange={() => handleToggle(item)} />
                    </div>
                  </div>

                  <div
                    className="sm:hidden flex items-center gap-2 mt-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Badge variant={item.isActive ? "success" : "danger"}>
                      {item.isActive ? "Active" : "Inactive"}
                    </Badge>
                    <div className="ml-auto flex gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                        <Edit2 size={12} />
                      </Button>
                      <Button variant="danger" size="sm" onClick={() => handleDelete(item._id)}>
                        <Trash2 size={12} />
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {selectedCompetency && (
            <div className="space-y-4">
              <Card className="p-4 border border-slate-200 rounded-xl">
                <div className="text-sm text-slate-500">Managing content for</div>
                <div className="mt-1 font-semibold text-slate-900">
                  {selectedCompetency.icon} {selectedCompetency.name}
                </div>
              </Card>

              {isLoadingYoutubeFor === selectedCompetency._id ? (
                <Card className="p-4 text-sm text-slate-500">Loading videos...</Card>
              ) : (
                <YoutubeSection
                  youtubeUrl={youtubeInputs[selectedCompetency._id] || ""}
                  setYoutubeUrl={(value) =>
                    setYoutubeInputs((prev) => ({
                      ...prev,
                      [selectedCompetency._id]: value,
                    }))
                  }
                  youtubeVideos={youtubeVideosByCompetency[selectedCompetency._id] || []}
                  isAddingYoutube={isAddingYoutubeFor === selectedCompetency._id}
                  addYoutubeVideo={() => addYoutubeVideo(selectedCompetency._id)}
                  deleteYoutubeVideo={(videoId) =>
                    deleteYoutubeVideo(selectedCompetency._id, videoId)
                  }
                  title={`${selectedCompetency.name} YouTube Videos`}
                  subtitle={`Videos shown for "${selectedCompetency.name}"`}
                />
              )}

              <FeaturedArticles
                articleTabs={articleTabs}
                featuredArticles={featuredArticlesByCompetency[selectedCompetency._id] || []}
                articleSearchQuery={articleSearchQueryByCompetency[selectedCompetency._id] || ""}
                articleSearchResults={articleSearchResultsByCompetency[selectedCompetency._id] || []}
                activeArticleTab={activeArticleTabByCompetency[selectedCompetency._id] || "all"}
                isSearchingArticle={isSearchingArticleFor === selectedCompetency._id}
                articleSearchCurrentPage={
                  articleSearchCurrentPageByCompetency[selectedCompetency._id] || 1
                }
                articleSearchTotalPages={
                  articleSearchTotalPagesByCompetency[selectedCompetency._id] || 0
                }
                setActiveArticleTab={(tabKey) =>
                  setActiveArticleTabByCompetency((prev) => ({
                    ...prev,
                    [selectedCompetency._id]: tabKey,
                  }))
                }
                setArticleSearchQuery={(value) =>
                  setArticleSearchQueryByCompetency((prev) => ({
                    ...prev,
                    [selectedCompetency._id]: value,
                  }))
                }
                handleArticleSearch={(page) => handleArticleSearch(selectedCompetency._id, page)}
                toggleFeaturedArticle={(articleId) =>
                  toggleFeaturedArticle(selectedCompetency._id, articleId)
                }
              />
            </div>
          )}
        </>
      )}

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editing ? "Edit Competency" : "Add Competency"}
      >
        <div className="space-y-4">
          <Input
            label="Competency Name"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            placeholder="e.g. Leadership"
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