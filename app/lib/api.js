import { clsx } from "clsx";
import axios from "axios";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const API = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("tt_token") ||
        localStorage.getItem("accessToken");

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("tt_token");
      localStorage.removeItem("accessToken");
    }
    return Promise.reject(error);
  }
);

function makeCRUD(basePath) {
  return {
    getAll: (params = {}) => API.get(`/${basePath}`, { params }),
    getOne: (id) => API.get(`/${basePath}/${id}`),
    create: (data) => API.post(`/${basePath}`, data),
    update: (id, data) => API.put(`/${basePath}/${id}`, data),
    delete: (id) => API.delete(`/${basePath}/${id}`),
    updateStatus: (id, status) =>
      API.patch(`/${basePath}/${id}/status`, { status }),
  };
}

export const authAPI = {
  login: (data) => API.post("/auth/login", data),
  logout: () => API.post("/auth/logout"),
  me: () => API.get("/auth/me"),
  register: (data) => API.post("/auth/register", data),
};

export const userAPI = {
  register: (data) => API.post("/users/register", data),
  login: (data) => API.post("/users/login", data),
  logout: () => API.get("/users/logout"),
  getProfile: () => API.get("/users/me"),
  updateProfile: (data) => API.put("/users/update-profile", data),
  changePassword: (data) => API.put("/users/update-password", data),
    getAll: (params = {}) => API.get("/admin/users", { params }),
  updateStatus: (id, data) => API.patch(`/admin/users/${id}/status`, data),
};
export const adminReviewsAPI = {
  getAll: (params = {}) => API.get("/reviews/admin/all", { params }),
  approve: (id) => API.put(`/reviews/admin/approve/${id}`),
  reject: (id) => API.put(`/reviews/admin/reject/${id}`),
  toggleFeatured: (id) => API.put(`/reviews/admin/featured/${id}`),
  delete: (id) => API.delete(`/reviews/admin/${id}`),
};

export const trainersAPI = {
  ...makeCRUD("trainers"),
  getAll: (params = {}) => API.get("/search/trainers", { params }),
    AgetAll: (params = {}) => API.get("/trainers", { params }),
  getById: (id) => API.get(`/trainers/${id}`),
  getProfile: () => API.get("/trainers/me"),
  updateProfile: (data) => API.put("/trainers/update-profile", data, { headers: { "Content-Type": "multipart/form-data" } }),
  changePassword: (data) => API.put("/trainers/change-password", data),
  getStats: (id) => API.get(`/trainers/stats/${id}`),
   register: (data) =>
    API.post("/trainers/register", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
      updateStatus: (id, data) => API.patch(`/admin/trainers/${id}/status`, data),
  updateFeatured: (id, data) => API.patch(`/admin/trainers/${id}/featured`, data),

};


const toArray = (payload, keys = []) => {
  if (Array.isArray(payload)) return payload;

  for (const key of keys) {
    if (Array.isArray(payload?.[key])) return payload[key];
  }

  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;

  return [];
};


// app/lib/api.js

const normalizeWorkshop = (w = {}) => ({
  ...w,
  id: w._id || w.id,
  title: w?.basicInformation?.title || w.title || "",
  shortDesc: w?.basicInformation?.shortDesc || w.shortDesc || "",
  fullDesc: w?.basicInformation?.fullDesc || w.fullDesc || "",
  category: w?.basicInformation?.category || w.category || "",
  coverImg: w?.basicInformation?.coverImage?.url || w.coverImg || "",
  thumbnail: w?.basicInformation?.thumbnail?.url || w.thumbnail || "",
  duration: w?.schedule?.duration || w.duration,
  seats: w?.schedule?.seats ?? w.seats ?? 0,
  location: w?.schedule?.location || w.location || "",
  dateRange: w?.schedule?.dateRange || w.dateRange || "",
  timeSlot: w?.schedule?.timeSlot || w.timeSlot || "",
  price: w?.pricing || w.price || {},
  learningOutcomes: w?.learningDetails?.learningOutcomes || w.learningOutcomes || [],
  certifications: w?.learningDetails?.certifications || w.certifications || [],
  tags: w?.classification?.tags || w.tags || [],
  isFeatured: w?.classification?.isFeatured ?? w.isFeatured ?? false,
  isLive: w?.classification?.isLive ?? w.isLive ?? false,
  mode: w?.conductedMode?.mode || w.mode || "",
  classTypes: w?.conductedMode?.classTypes || w.classTypes || [],
  photos: w?.mediaGallery?.snapshots || w.photos || [],
});

const mapWorkshopList = (items = []) => items.map(normalizeWorkshop);

export const workshopsAPI = {
  getAll: async () => {
    const [draftsRes, publishedRes] = await Promise.all([
      API.get("/workshops/trainer/drafts"),
      API.get("/workshops/trainer/published"),
    ]);

    const drafts = mapWorkshopList(draftsRes?.data?.drafts || []);
    const published = mapWorkshopList(publishedRes?.data?.workshops || []);

    return {
      data: {
        workshops: [...drafts, ...published],
      },
    };
  },

  getMine: async () => {
    const [draftsRes, publishedRes] = await Promise.all([
      API.get("/workshops/trainer/drafts"),
      API.get("/workshops/trainer/published"),
    ]);

    const drafts = mapWorkshopList(draftsRes?.data?.drafts || []);
    const published = mapWorkshopList(publishedRes?.data?.workshops || []);

    return {
      data: {
        workshops: [...drafts, ...published],
      },
    };
  },

  getDrafts: async () => {
    const res = await API.get("/workshops/trainer/drafts");
    return {
      ...res,
      data: {
        ...res.data,
        drafts: mapWorkshopList(res?.data?.drafts || []),
      },
    };
  },

  getPublished: async () => {
    const res = await API.get("/workshops/trainer/published");
    return {
      ...res,
      data: {
        ...res.data,
        workshops: mapWorkshopList(res?.data?.workshops || []),
      },
    };
  },

  getOne: async (id) => {
    const res = await API.get(`/workshops/trainer/One-workshop/${id}`);
    return {
      ...res,
      data: {
        ...res.data,
        workshop: normalizeWorkshop(res?.data?.workshop || {}),
      },
    };
  },

  create: async (data) => {
    const res = await API.post("/workshops/trainer/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      ...res,
      data: {
        ...res.data,
        workshop: normalizeWorkshop(res?.data?.workshop || {}),
      },
    };
  },

  update: async (id, data) => {
    const res = await API.put(`/workshops/trainer/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      ...res,
      data: {
        ...res.data,
        workshop: normalizeWorkshop(res?.data?.workshop || {}),
      },
    };
  },

  delete: (id) => API.delete(`/workshops/trainer/${id}`),

  publish: async (id) => {
    const res = await API.put(`/workshops/trainer/publish/${id}`);
    return {
      ...res,
      data: {
        ...res.data,
        workshop: normalizeWorkshop(res?.data?.workshop || {}),
      },
    };
  },

  updateStatus: async (id, status) => {
    if (status === "published") {
      return workshopsAPI.publish(id);
    }

    const form = new FormData();
    form.append("status", "draft");

    const res = await API.put(`/workshops/trainer/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      ...res,
      data: {
        ...res.data,
        workshop: normalizeWorkshop(res?.data?.workshop || {}),
      },
    };
  },
};

export const articlesAPI = {
  getAll: async () => {
    const [draftsRes, publishedRes] = await Promise.all([
      API.get("/articles/trainer/drafts"),
      API.get("/articles/trainer/published"),
    ]);

    const drafts = toArray(draftsRes?.data, ["drafts", "articles"]);
    const published = toArray(publishedRes?.data, ["articles", "drafts"]);

    return {
      data: {
        articles: [...drafts, ...published],
        drafts,
        published,
      },
    };
  },

  getOne: (id) => API.get(`/articles/${id}`),

  create: (data) =>
    API.post("/articles/trainer/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id, data) =>
    API.put(`/articles/trainer/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id) => API.delete(`/articles/trainer/${id}`),

  publish: (id) => API.put(`/articles/trainer/publish/${id}`),

  getMine: async () => {
    const [draftsRes, publishedRes] = await Promise.all([
      API.get("/articles/trainer/drafts"),
      API.get("/articles/trainer/published"),
    ]);

    const drafts = toArray(draftsRes?.data, ["drafts", "articles"]);
    const published = toArray(publishedRes?.data, ["articles", "drafts"]);

    return {
      data: {
        articles: [...drafts, ...published],
        drafts,
        published,
      },
    };
  },

  getDrafts: () => API.get("/articles/trainer/drafts"),
  getPublished: () => API.get("/articles/trainer/published"),
  getAllTrainer: ()=> API.get("/articles/trainer/articles"),
  getAllAdmin: ()=> API.get("/articles/admin/articles"),

  // Search across ALL published articles (any creator), optionally filtered
  // by keyword / industry / competency / department. Used by the admin
  // "assign article to industry/competency/department" pickers.
  searchPublic: (params = {}) => API.get("/articles", { params }),

  // Assign or clear an article's industry / competency / department tag.
  // Pass { industry: id | null } or { competency: id | null } or { department: id | null }.
  updateTaxonomy: (id, data) => API.put(`/articles/admin/${id}`, data),
};
export const industriesAPI = makeCRUD("industries");
export const competenciesAPI = makeCRUD("competencies");

export const rankingsAPI = makeCRUD("rankings");
export const cmsAPI = makeCRUD("cms");
export const mediaAPI = makeCRUD("media");

export const analyticsAPI = {
  getDashboard: () => API.get("/admin/dashboard"),
  getAnalytics: () => API.get("/admin/analytics"),
  getTrainerAnalytics: (params = {}) =>
    API.get("/analytics/trainers", { params }),
  getWorkshopAnalytics: (params = {}) =>
    API.get("/analytics/workshops", { params }),
  getArticleAnalytics: (params = {}) =>
    API.get("/analytics/articles", { params }),
};

export const uploadsAPI = {
  upload: (formData) =>
    API.post("/uploads", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }),
  delete: (filename) => API.delete(`/uploads/${filename}`),
};

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function truncate(str = "", n = 0) {
  if (!str) return "";
  return str.length > n ? str.substring(0, n - 1) + "…" : str;
}

export function wordCount(str = "") {
  if (!str.trim()) return 0;
  return str.trim().split(/\s+/).filter(Boolean).length;
}


// app/lib/api.js mein add karo — existing code ke baad

// ── Trainer Dashboard API ─────────────────────────────────
// ── Trainer Dashboard API ─────────────────────────────────
export const trainerDashboardAPI = {
  getDashboard: () => API.get("/trainer/dashboard"),
  getMyWorkshops: (params = {}) => API.get("/trainer/workshops", { params }),
  getMyArticles: (params = {}) => API.get("/trainer/articles", { params }),
  getAnalytics: () => API.get("/trainer/analytics"),
  getMyReviews:() => API.get("/reviews//trainer-dashboard/my-reviews")

};
export const adminAuthAPI = {
  getProfile: () => API.get("/admin/get-my-profile"),
  updateProfile: (data) => API.post("/admin/update-profile", data),
};
export const userDashboardAPI = {
  getDashboard: () => API.get("/user/dashboard"),
  getShortlistedProfiles: () => API.get("/user/shortlisted"),
  toggleShortlist: (trainerId) => API.post(`/user/shortlist/${trainerId}`),
  getWorkshops: (params = {}) => API.get("/user/workshops", { params }),
  toggleSaveWorkshop: (workshopId) => API.post(`/user/save-workshop/${workshopId}`),
  removeSavedWorkshop: (workshopId) => API.delete(`/user/save-workshop/${workshopId}`),
  getSavedWorkshopStatus: (workshopId) => API.get(`/user/save-workshop/${workshopId}/status`),
  getArticles: (params = {}) => API.get("/user/articles", { params }),
  toggleSaveArticle: (articleId) => API.post(`/user/save-article/${articleId}`),
  getArticleById: (articleId) => API.get(`/user/articles/${articleId}`),
 getMyReviews: () => API.get("reviews/my-review"),
 removeShortlistedProfile: (trainerId) => API.delete(`/user/shortlist/${trainerId}`),

};


// ── Reviews ──────────────────────────────────────────────────
export const reviewsAPI = {
  submit: (data) => API.post("/reviews/submit-review", data),
  getMine: () => API.get("/reviews/my-review"),
  getOne: (id) => API.get(`/reviews/${id}`),
  getByTrainer: (trainerId) => API.get(`/reviews/trainer/${trainerId}`),
  getByWorkshop: (workshopId) => API.get(`/reviews/workshop/${workshopId}`),
  getFeatured: () => API.get("/reviews/featured"),
  update: (id, data) => API.put(`/reviews/${id}`, data),
  delete: (id) => API.delete(`/reviews/${id}`),
};
export const adminWorkshopsAPI = {
  getAll: async () => {
    const res = await API.get("/workshops/admin/all");
    return {
      data: {
        workshops: mapWorkshopList(res?.data?.workshops || []),
      },
    };
  },

  getDrafts: async () => {
    const res = await API.get("/workshops/admin/drafts");
    return {
      ...res,
      data: {
        ...res.data,
        drafts: mapWorkshopList(res?.data?.drafts || []),
      },
    };
  },

  getPublished: async () => {
    const res = await API.get("/workshops/admin/published");
    return {
      ...res,
      data: {
        ...res.data,
        workshops: mapWorkshopList(res?.data?.workshops || []),
      },
    };
  },

  getOne: async (id) => {
    const res = await API.get(`/workshops/admin/One-workshop/${id}`);
    return {
      ...res,
      data: {
        ...res.data,
        workshop: normalizeWorkshop(res?.data?.workshop || {}),
      },
    };
  },

  create: async (data) => {
    const res = await API.post("/workshops/admin/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      ...res,
      data: {
        ...res.data,
        workshop: normalizeWorkshop(res?.data?.workshop || {}),
      },
    };
  },

  update: async (id, data) => {
    const res = await API.put(`/workshops/admin/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      ...res,
      data: {
        ...res.data,
        workshop: normalizeWorkshop(res?.data?.workshop || {}),
      },
    };
  },

  delete: (id) => API.delete(`/workshops/admin/${id}`),

  publish: async (id) => {
    const res = await API.put(`/workshops/admin/publish/${id}`);
    return {
      ...res,
      data: {
        ...res.data,
        workshop: normalizeWorkshop(res?.data?.workshop || {}),
      },
    };
  },

  updateStatus: async (id, status) => {
    if (status === "published") {
      return adminWorkshopsAPI.publish(id);
    }

    const form = new FormData();
    form.append("status", "draft");

    const res = await API.put(`/workshops/admin/${id}`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      ...res,
      data: {
        ...res.data,
        workshop: normalizeWorkshop(res?.data?.workshop || {}),
      },
    };
  },
};

export const industryAPI = {
  getAll: () => API.get("/industries"),
  getActive: () => API.get("/industries/active"),
  create: (data) => API.post("/industries", data),
  update: (id, data) => API.put(`/industries/${id}`, data),
  delete: (id) => API.delete(`/industries/${id}`),
  toggleStatus: (id) => API.patch(`/industries/${id}/toggle-status`),
};
export const competencyAPI = {
  getAll: () => API.get("/competencies"),
  getActive: () => API.get("/competencies/active"),
  create: (data) => API.post("/competencies", data),
  update: (id, data) => API.put(`/competencies/${id}`, data),
  delete: (id) => API.delete(`/competencies/${id}`),
  toggleStatus: (id) => API.patch(`/competencies/${id}/toggle-status`),
};
export const departmentsAPI = {
  getAll: () => API.get("/departments"),
  getActive: () => API.get("/departments/active"),
  create: (data) => API.post("/departments", data),
  update: (id, data) => API.put(`/departments/${id}`, data),
  delete: (id) => API.delete(`/departments/${id}`),
  toggleStatus: (id) => API.patch(`/departments/${id}/toggle-status`),
};
export const youtubeVideosAPI = {
  getAll: (params) => API.get("/youtube-videos", { params }),
  create: (data) => API.post("/youtube-videos", data),
  delete: (id) => API.delete(`/youtube-videos/${id}`),
};
export const articlesAdminAPI = {
  getAll: async () => {
    const [draftsRes, publishedRes] = await Promise.all([
      API.get("/articles/admin/drafts"),
      API.get("/articles/admin/published"),
    ]);

    const drafts = toArray(draftsRes?.data, ["drafts", "articles"]);
    const published = toArray(publishedRes?.data, ["articles", "drafts"]);

    return {
      data: {
        articles: [...drafts, ...published],
        drafts,
        published,
      },
    };
  },

  getOne: (id) => API.get(`/articles/${id}`),

  create: (data) =>
    API.post("/articles/admin/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  update: (id, data) =>
    API.put(`/articles/admin/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  delete: (id) => API.delete(`/articles/admin/${id}`),

  publish: (id) => API.put(`/articles/admin/publish/${id}`),

  getMine: async () => {
    const [draftsRes, publishedRes] = await Promise.all([
      API.get("/articles/admin/drafts"),
      API.get("/articles/admin/published"),
    ]);

    const drafts = toArray(draftsRes?.data, ["drafts", "articles"]);
    const published = toArray(publishedRes?.data, ["articles", "drafts"]);

    return {
      data: {
        articles: [...drafts, ...published],
        drafts,
        published,
      },
    };
  },

  getDrafts: () => API.get("/articles/admin/drafts"),
  getPublished: () => API.get("/articles/admin/published"),
};
export const blogsAPI = {
  getAll: (params = {}) =>
    API.get("/articles/admin/articles", {
      params: { status: "published", ...params },
    }),
  getOne: (id) => API.get(`/articles/${id}`),
};

// ── Communication Center ──────────────────────────────────────
export const communicationAPI = {
  getRecipients: (params = {}) =>
    API.get("/admin/communications/recipients", { params }),
  send: (data) => API.post("/admin/communications/send", data),
  getHistory: (params = {}) =>
    API.get("/admin/communications", { params }),
  getAnalytics: () => API.get("/admin/communications/analytics"),
  listTemplates: () => API.get("/admin/communications/templates"),
  createTemplate: (data) => API.post("/admin/communications/templates", data),
  updateTemplate: (id, data) =>
    API.put(`/admin/communications/templates/${id}`, data),
  deleteTemplate: (id) =>
    API.delete(`/admin/communications/templates/${id}`),
};
export default API;
