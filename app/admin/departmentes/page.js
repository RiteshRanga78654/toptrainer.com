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
  departmentsAPI,
  trainersAPI,
  workshopsAPI,
  youtubeVideosAPI,
  articlesAPI,
} from "../../lib/api";
import YoutubeSection from "../homepage/components/YoutubeSection";
import FeaturedArticles from "../homepage/components/FeaturedArticles";

export default function DepartmentPage() {
  const [departments, setDepartments] = useState([]);
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
    icon: "🏛️",
  });

  const [selectedDepartmentId, setSelectedDepartmentId] = useState("");

  const [youtubeVideosByDepartment, setYoutubeVideosByDepartment] = useState({});
  const [youtubeInputs, setYoutubeInputs] = useState({});
  const [isAddingYoutubeFor, setIsAddingYoutubeFor] = useState(null);
  const [isLoadingYoutubeFor, setIsLoadingYoutubeFor] = useState(null);

  const [articleTabs] = useState([]);
  const [activeArticleTabByDepartment, setActiveArticleTabByDepartment] = useState({});
  const [articleSearchQueryByDepartment, setArticleSearchQueryByDepartment] = useState({});
  const [articleSearchResultsByDepartment, setArticleSearchResultsByDepartment] = useState({});
  const [featuredArticlesByDepartment, setFeaturedArticlesByDepartment] = useState({});
  const [isSearchingArticleFor, setIsSearchingArticleFor] = useState(null);
  const [articleSearchCurrentPageByDepartment, setArticleSearchCurrentPageByDepartment] = useState({});
  const [articleSearchTotalPagesByDepartment, setArticleSearchTotalPagesByDepartment] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const selectedDepartment =
    departments.find((item) => item._id === selectedDepartmentId) || null;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  const fetchData = async () => {
    try {
      setLoading(true);

      const [departmentRes, trainerRes, workshopRes] = await Promise.all([
        departmentsAPI.getAll(),
        trainersAPI.getAll(),
        workshopsAPI.getAll(),
      ]);

      const departmentsData =
        departmentRes?.data?.departments || departmentRes?.data?.data || [];

      setDepartments(departmentsData);
      setTrainers(trainerRes?.data?.trainers || trainerRes?.data?.data || []);
      setWorkshops(workshopRes?.data?.workshops || workshopRes?.data?.data || []);

      if (departmentsData.length > 0) {
        setSelectedDepartmentId((prev) => {
          const stillExists = departmentsData.some((item) => item._id === prev);
          return stillExists ? prev : departmentsData[0]._id;
        });
      } else {
        setSelectedDepartmentId("");
      }

      for (const department of departmentsData) {
        if (!department?._id) continue;

        fetchDepartmentVideos(department._id);
        fetchDepartmentArticles(department._id);

        setActiveArticleTabByDepartment((prev) => ({
          ...prev,
          [department._id]: prev[department._id] || "all",
        }));

        setArticleSearchQueryByDepartment((prev) => ({
          ...prev,
          [department._id]: prev[department._id] || "",
        }));

        setArticleSearchResultsByDepartment((prev) => ({
          ...prev,
          [department._id]: prev[department._id] || [],
        }));

        setArticleSearchCurrentPageByDepartment((prev) => ({
          ...prev,
          [department._id]: prev[department._id] || 1,
        }));

        setArticleSearchTotalPagesByDepartment((prev) => ({
          ...prev,
          [department._id]: prev[department._id] || 0,
        }));
      }
    } catch (err) {
      console.log("Fetch error:", err?.response?.data || err.message);
      showToast("Failed to load departments");
    } finally {
      setLoading(false);
    }
  };

  const fetchDepartmentVideos = async (departmentId) => {
    if (!departmentId) return;

    try {
      setIsLoadingYoutubeFor(departmentId);

      const res = await youtubeVideosAPI.getAll({
        scope: "entity",
        entityType: "Department",
        entityId: departmentId,
      });

      setYoutubeVideosByDepartment((prev) => ({
        ...prev,
        [departmentId]: res?.data?.data || [],
      }));
    } catch (err) {
      console.log("Video fetch error:", err?.response?.data || err.message);
      setYoutubeVideosByDepartment((prev) => ({
        ...prev,
        [departmentId]: [],
      }));
    } finally {
      setIsLoadingYoutubeFor(null);
    }
  };

  const fetchDepartmentArticles = async (departmentId) => {
    if (!departmentId) return;

    try {
      const res = await articlesAPI.searchPublic({
        department: departmentId,
        limit: 50,
      });

      setFeaturedArticlesByDepartment((prev) => ({
        ...prev,
        [departmentId]: res?.data?.data || [],
      }));
    } catch (err) {
      console.log("Article fetch error:", err?.response?.data || err.message);
      setFeaturedArticlesByDepartment((prev) => ({
        ...prev,
        [departmentId]: [],
      }));
    }
  };

  const handleArticleSearch = async (departmentId, page = 1) => {
    if (!departmentId) return;

    try {
      setIsSearchingArticleFor(departmentId);

      const query = articleSearchQueryByDepartment[departmentId] || "";

      const res = await articlesAPI.searchPublic({
        keyword: query.trim() || undefined,
        page,
        limit: 10,
      });

      setArticleSearchResultsByDepartment((prev) => ({
        ...prev,
        [departmentId]: res?.data?.data || [],
      }));

      setArticleSearchCurrentPageByDepartment((prev) => ({
        ...prev,
        [departmentId]: res?.data?.currentPage || page,
      }));

      setArticleSearchTotalPagesByDepartment((prev) => ({
        ...prev,
        [departmentId]: res?.data?.totalPages || 0,
      }));
    } catch (err) {
      console.log("Article search error:", err?.response?.data || err.message);

      setArticleSearchResultsByDepartment((prev) => ({
        ...prev,
        [departmentId]: [],
      }));

      setArticleSearchCurrentPageByDepartment((prev) => ({
        ...prev,
        [departmentId]: 1,
      }));

      setArticleSearchTotalPagesByDepartment((prev) => ({
        ...prev,
        [departmentId]: 0,
      }));
    } finally {
      setIsSearchingArticleFor(null);
    }
  };

  const toggleFeaturedArticle = async (departmentId, articleId) => {
    if (!departmentId) return;

    const featuredArticles = featuredArticlesByDepartment[departmentId] || [];
    const isCurrentlyTagged = featuredArticles.some(
      (item) => (item._id || item.id) === articleId
    );

    try {
      await articlesAPI.updateTaxonomy(articleId, {
        department: isCurrentlyTagged ? null : departmentId,
      });

      showToast(
        isCurrentlyTagged
          ? "Article removed from this department"
          : "Article added to this department"
      );

      await fetchDepartmentArticles(departmentId);
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
      icon: "🏛️",
    });
    setModal(true);
  };

  const openEdit = (department) => {
    setEditing(department);
    setForm({
      name: department.name || "",
      icon: department.icon || "🏛️",
    });
    setSelectedTrainers(department.trainers?.map((t) => t._id) || []);
    setSelectedWorkshops(department.workshops?.map((w) => w._id) || []);
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
        await departmentsAPI.update(editing._id, payload);
        showToast("Department updated successfully");
      } else {
        const res = await departmentsAPI.create(payload);
        savedId = res?.data?.department?._id || res?.data?.data?._id;
        showToast("Department added successfully");
      }

      await fetchData();
      setModal(false);

      if (savedId) setSelectedDepartmentId(savedId);
    } catch (err) {
      console.log("Save error:", err?.response?.data || err.message);
      showToast("Failed to save department");
    }
  };

  const handleDelete = async (id) => {
    try {
      await departmentsAPI.delete(id);
      setDepartments((prev) => prev.filter((item) => item._id !== id));

      setYoutubeVideosByDepartment((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setFeaturedArticlesByDepartment((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });

      setSelectedDepartmentId((prev) => {
        if (prev !== id) return prev;
        const remaining = departments.filter((item) => item._id !== id);
        return remaining[0]?._id || "";
      });

      showToast("Department deleted successfully");
    } catch (err) {
      console.log("Delete error:", err?.response?.data || err.message);
      showToast("Failed to delete department");
    }
  };

  const handleToggle = async (department) => {
    const id = department._id;
    const previousValue = !!department.isActive;
    const nextValue = !previousValue;

    setDepartments((prev) =>
      prev.map((item) => (item._id === id ? { ...item, isActive: nextValue } : item))
    );

    try {
      const res = await departmentsAPI.updateStatus(id, nextValue);
      const updatedDepartment = res?.data?.data;

      setDepartments((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, isActive: updatedDepartment?.isActive ?? nextValue }
            : item
        )
      );

      showToast(
        `Department ${(updatedDepartment?.isActive ?? nextValue) ? "activated" : "deactivated"}`
      );
    } catch (err) {
      setDepartments((prev) =>
        prev.map((item) => (item._id === id ? { ...item, isActive: previousValue } : item))
      );
      console.log("Toggle error:", err?.response?.data || err.message);
      showToast("Status update failed");
    }
  };

  const addYoutubeVideo = async (departmentId) => {
    const youtubeUrl = youtubeInputs[departmentId] || "";

    if (!departmentId) {
      showToast("Department not found");
      return;
    }

    if (!youtubeUrl.trim()) {
      showToast("Please enter a YouTube URL");
      return;
    }

    try {
      setIsAddingYoutubeFor(departmentId);

      const payload = {
        url: youtubeUrl,
        scope: "entity",
        entityType: "Department",
        entityId: departmentId,
      };

      const res = await youtubeVideosAPI.create(payload);
      const newVideo = res?.data?.data;

      if (newVideo) {
        setYoutubeVideosByDepartment((prev) => ({
          ...prev,
          [departmentId]: [newVideo, ...(prev[departmentId] || [])],
        }));
      }

      setYoutubeInputs((prev) => ({
        ...prev,
        [departmentId]: "",
      }));

      showToast("YouTube video added successfully");
    } catch (err) {
      console.log("Add video error:", err?.response?.data || err.message);
      showToast(err?.response?.data?.message || "Failed to add video");
    } finally {
      setIsAddingYoutubeFor(null);
    }
  };

  const deleteYoutubeVideo = async (departmentId, videoId) => {
    try {
      await youtubeVideosAPI.delete(videoId);

      setYoutubeVideosByDepartment((prev) => ({
        ...prev,
        [departmentId]: (prev[departmentId] || []).filter(
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
          Add Department
        </Button>
      </div>

      {loading ? (
        <div className="text-sm text-slate-500">Loading departments...</div>
      ) : departments.length === 0 ? (
        <Card className="p-6 text-center text-sm text-slate-500">
          No departments found.
        </Card>
      ) : (
        <>
          <div className="space-y-3">
            {departments.map((item) => {
              const isSelected = selectedDepartmentId === item._id;

              return (
                <Card
                  key={item._id}
                  className={`p-4 border rounded-xl cursor-pointer transition ${
                    isSelected
                      ? "border-blue-500 ring-2 ring-blue-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                  onClick={() => setSelectedDepartmentId(item._id)}
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

          {selectedDepartment && (
            <div className="space-y-4">
              <Card className="p-4 border border-slate-200 rounded-xl">
                <div className="text-sm text-slate-500">Managing content for</div>
                <div className="mt-1 font-semibold text-slate-900">
                  {selectedDepartment.icon} {selectedDepartment.name}
                </div>
              </Card>

              {isLoadingYoutubeFor === selectedDepartment._id ? (
                <Card className="p-4 text-sm text-slate-500">Loading videos...</Card>
              ) : (
                <YoutubeSection
                  youtubeUrl={youtubeInputs[selectedDepartment._id] || ""}
                  setYoutubeUrl={(value) =>
                    setYoutubeInputs((prev) => ({
                      ...prev,
                      [selectedDepartment._id]: value,
                    }))
                  }
                  youtubeVideos={youtubeVideosByDepartment[selectedDepartment._id] || []}
                  isAddingYoutube={isAddingYoutubeFor === selectedDepartment._id}
                  addYoutubeVideo={() => addYoutubeVideo(selectedDepartment._id)}
                  deleteYoutubeVideo={(videoId) =>
                    deleteYoutubeVideo(selectedDepartment._id, videoId)
                  }
                  title={`${selectedDepartment.name} YouTube Videos`}
                  subtitle={`Videos shown for "${selectedDepartment.name}"`}
                />
              )}

              <FeaturedArticles
                articleTabs={articleTabs}
                featuredArticles={featuredArticlesByDepartment[selectedDepartment._id] || []}
                articleSearchQuery={articleSearchQueryByDepartment[selectedDepartment._id] || ""}
                articleSearchResults={articleSearchResultsByDepartment[selectedDepartment._id] || []}
                activeArticleTab={activeArticleTabByDepartment[selectedDepartment._id] || "all"}
                isSearchingArticle={isSearchingArticleFor === selectedDepartment._id}
                articleSearchCurrentPage={
                  articleSearchCurrentPageByDepartment[selectedDepartment._id] || 1
                }
                articleSearchTotalPages={
                  articleSearchTotalPagesByDepartment[selectedDepartment._id] || 0
                }
                setActiveArticleTab={(tabKey) =>
                  setActiveArticleTabByDepartment((prev) => ({
                    ...prev,
                    [selectedDepartment._id]: tabKey,
                  }))
                }
                setArticleSearchQuery={(value) =>
                  setArticleSearchQueryByDepartment((prev) => ({
                    ...prev,
                    [selectedDepartment._id]: value,
                  }))
                }
                handleArticleSearch={(page) => handleArticleSearch(selectedDepartment._id, page)}
                toggleFeaturedArticle={(articleId) =>
                  toggleFeaturedArticle(selectedDepartment._id, articleId)
                }
              />
            </div>
          )}
        </>
      )}

      <Modal
        open={modal}
        onClose={() => setModal(false)}
        title={editing ? "Edit Department" : "Add Department"}
      >
        <div className="space-y-4">
          <Input
            label="Department Name"
            value={form.name}
            onChange={(v) => setForm((p) => ({ ...p, name: v }))}
            placeholder="e.g. Human Resources"
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