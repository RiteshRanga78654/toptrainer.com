"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Plus, Trash2, Upload, Save } from "lucide-react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const STAT_ICONS = ["Users", "User", "ClipboardList", "Briefcase", "Award", "Star"];
const TEAM_CATEGORIES = [
  "Leadership",
  "Operations",
  "Technology",
  "Marketing",
  "Content",
  "Business Development",
  "Customer Success",
];

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function toInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function emptyLeadership() {
  return {
    _id: uid(),
    name: "",
    role: "",
    desc: "",
    initials: "",
    image: null,
    linkedin: "",
    email: "",
  };
}

function emptyTeam() {
  return {
    _id: uid(),
    name: "",
    role: "",
    category: "Marketing",
    joined: "Joined Jan 2024",
    initials: "",
    image: null,
    linkedin: "",
    email: "",
  };
}

function emptyCulture() {
  return {
    _id: uid(),
    label: "",
    image: null,
  };
}

function normalizeAbout(a) {
  return {
    heroTitle: a?.heroTitle || "Building India's Largest Community of Professional Trainers",
    heroSubtitle:
      a?.heroSubtitle ||
      "Connecting organizations, learners and experienced trainers through one trusted platform.",
    heroBadgeLine1: a?.heroBadgeLine1 || "Empowering Trainers.",
    heroBadgeLine2: a?.heroBadgeLine2 || "Transforming Learning.",
    heroImage:
      typeof a?.heroImage === "string"
        ? a.heroImage
        : a?.heroImage?.url || null,
    stats: a?.stats?.length
      ? a.stats
      : [
        { icon: "Users", num: "15,000+", lbl: "Learning Community" },
        { icon: "User", num: "5,000+", lbl: "Trainers" },
        { icon: "ClipboardList", num: "300+", lbl: "Training Categories" },
        { icon: "Briefcase", num: "100+", lbl: "Corporate Workshops" },
        { icon: "Award", num: "25+", lbl: "Industries Covered" },
        { icon: "Star", num: "4.8/5", lbl: "Learner Rating" },
      ],
    mission: a?.mission || "",
    vision: a?.vision || "",
    leadership: a?.leadership?.length
      ? a.leadership.map((x) => ({ _id: x._id || uid(), ...x }))
      : [emptyLeadership()],
    team: a?.team?.length ? a.team.map((x) => ({ _id: x._id || uid(), ...x })) : [emptyTeam()],
    culture: a?.culture?.length
      ? a.culture.map((x) => ({ _id: x._id || uid(), ...x }))
      : [emptyCulture()],
  };
}

export default function AboutAdminPage() {
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const heroRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/admin/about`, {
          credentials: "include",
        });
        const data = await res.json();
        setForm(normalizeAbout(data.about));
      } catch {
        setForm(normalizeAbout(null));
      }
    })();
  }, []);

  useEffect(() => {
    return () => {
      if (form?.heroImage?.preview) URL.revokeObjectURL(form.heroImage.preview);
      ["leadership", "team", "culture"].forEach((key) => {
        (form?.[key] || []).forEach((item) => {
          if (item?.image?.preview) URL.revokeObjectURL(item.image.preview);
        });
      });
    };
  }, [form]);

  const setField = (key, value) => setForm((p) => ({ ...p, [key]: value }));

  const updateItem = (listKey, id, patch) => {
    setForm((p) => ({
      ...p,
      [listKey]: p[listKey].map((item) => (item._id === id ? { ...item, ...patch } : item)),
    }));
  };

  const addItem = (listKey) => {
    setForm((p) => ({
      ...p,
      [listKey]: [
        ...p[listKey],
        listKey === "team"
          ? emptyTeam()
          : listKey === "leadership"
            ? emptyLeadership()
            : emptyCulture(),
      ],
    }));
  };

  const removeItem = (listKey, id) => {
    setForm((p) => {
      const item = p[listKey].find((x) => x._id === id);
      if (item?.image?.preview) URL.revokeObjectURL(item.image.preview);
      return {
        ...p,
        [listKey]: p[listKey].filter((x) => x._id !== id),
      };
    });
  };

  const onFile = (file, target, id = null) => {
    const preview = URL.createObjectURL(file);

    if (target === "heroImage") {
      setForm((p) => {
        if (p.heroImage?.preview) URL.revokeObjectURL(p.heroImage.preview);
        return { ...p, heroImage: { file, preview } };
      });
      return;
    }

    updateItem(target, id, { image: { file, preview } });
  };

  const clearHeroImage = () => {
    setForm((p) => {
      if (p.heroImage?.preview) URL.revokeObjectURL(p.heroImage.preview);
      return { ...p, heroImage: null };
    });
  };

  const clearItemImage = (listKey, id) => {
    setForm((p) => ({
      ...p,
      [listKey]: p[listKey].map((item) => {
        if (item._id !== id) return item;
        if (item.image?.preview) URL.revokeObjectURL(item.image.preview);
        return { ...item, image: null };
      }),
    }));
  };

  const uploadData = async () => {
    setSaving(true);
    setMessage("");

    try {
      const fd = new FormData();
      fd.append("heroTitle", form.heroTitle);
      fd.append("heroSubtitle", form.heroSubtitle);
      fd.append("heroBadgeLine1", form.heroBadgeLine1);
      fd.append("heroBadgeLine2", form.heroBadgeLine2);
      fd.append("mission", form.mission);
      fd.append("vision", form.vision);
      fd.append("stats", JSON.stringify(form.stats));
      fd.append("leadership", JSON.stringify(form.leadership.map(({ image, ...x }) => x)));
      fd.append("team", JSON.stringify(form.team.map(({ image, ...x }) => x)));
      fd.append("culture", JSON.stringify(form.culture.map(({ image, ...x }) => x)));

      if (form.heroImage?.file) fd.append("heroImage", form.heroImage.file);

      form.leadership.forEach((m) => {
        if (m.image?.file) fd.append("leadershipImages", m.image.file);
      });

      form.team.forEach((m) => {
        if (m.image?.file) fd.append("teamImages", m.image.file);
      });

      form.culture.forEach((c) => {
        if (c.image?.file) fd.append("cultureImages", c.image.file);
      });

      const res = await fetch(`${API_BASE}/api/admin/about`, {
        method: "PUT",
        credentials: "include",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Save failed");

      setMessage("Saved successfully");
      setForm(normalizeAbout(data.about));
    } catch (err) {
      setMessage(err.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  if (!form) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 24, maxWidth: 1200, margin: "0 auto", fontFamily: "sans-serif" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>About Page Admin</h1>
      <p style={{ color: "#64748b", marginBottom: 24 }}>Edit homepage image, team, leadership, and culture.</p>

      {message && (
        <div
          style={{
            marginBottom: 16,
            padding: 12,
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            borderRadius: 10,
          }}
        >
          {message}
        </div>
      )}

      <div style={{ display: "grid", gap: 24 }}>
        <section style={card}>
          <h2 style={title}>Hero</h2>
          <div style={grid2}>
            <div>
              <label style={label}>Title</label>
              <input
                style={input}
                value={form.heroTitle}
                onChange={(e) => setField("heroTitle", e.target.value)}
              />
            </div>
            <div>
              <label style={label}>Subtitle</label>
              <input
                style={input}
                value={form.heroSubtitle}
                onChange={(e) => setField("heroSubtitle", e.target.value)}
              />
            </div>
            <div>
              <label style={label}>Badge Line 1</label>
              <input
                style={input}
                value={form.heroBadgeLine1}
                onChange={(e) => setField("heroBadgeLine1", e.target.value)}
              />
            </div>
            <div>
              <label style={label}>Badge Line 2</label>
              <input
                style={input}
                value={form.heroBadgeLine2}
                onChange={(e) => setField("heroBadgeLine2", e.target.value)}
              />
            </div>
          </div>

          <div style={{ marginTop: 16 }}>
            <label style={label}>Hero Image</label>
            <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
              <div style={previewBox}>
                {form.heroImage?.preview || form.heroImage?.url ? (
                  <Image
                    src={form.heroImage.preview || form.heroImage.url}
                    alt="hero"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ color: "#94a3b8" }}>No image selected</span>
                )}
              </div>

              <label style={btnSecondary}>
                <Upload size={16} /> Upload Hero
                <input
                  ref={heroRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onFile(file, "heroImage");
                  }}
                />
              </label>

              <button type="button" style={btnDanger} onClick={clearHeroImage}>
                <Trash2 size={16} /> Remove
              </button>
            </div>
          </div>
        </section>

        <section style={card}>
          <h2 style={title}>Stats</h2>
          <div style={stack}>
            {form.stats.map((s, idx) => (
              <div key={idx} style={rowCard}>
                <select
                  style={{ ...input, width: 160 }}
                  value={s.icon}
                  onChange={(e) => {
                    const next = [...form.stats];
                    next[idx].icon = e.target.value;
                    setField("stats", next);
                  }}
                >
                  {STAT_ICONS.map((x) => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>

                <input
                  style={{ ...input, flex: 1 }}
                  value={s.num}
                  onChange={(e) => {
                    const next = [...form.stats];
                    next[idx].num = e.target.value;
                    setField("stats", next);
                  }}
                />

                <input
                  style={{ ...input, flex: 2 }}
                  value={s.lbl}
                  onChange={(e) => {
                    const next = [...form.stats];
                    next[idx].lbl = e.target.value;
                    setField("stats", next);
                  }}
                />
              </div>
            ))}
          </div>
        </section>

        <section style={card}>
          <h2 style={title}>Mission & Vision</h2>
          <div style={grid2}>
            <div>
              <label style={label}>Mission</label>
              <textarea
                style={textarea}
                value={form.mission}
                onChange={(e) => setField("mission", e.target.value)}
              />
            </div>
            <div>
              <label style={label}>Vision</label>
              <textarea
                style={textarea}
                value={form.vision}
                onChange={(e) => setField("vision", e.target.value)}
              />
            </div>
          </div>
        </section>

        <section style={card}>
          <div style={sectionHead}>
            <h2 style={title}>Leadership</h2>
            <button type="button" style={btnSecondary} onClick={() => addItem("leadership")}>
              <Plus size={16} /> Add Leader
            </button>
          </div>

          <div style={stack}>
            {form.leadership.map((m) => (
              <div key={m._id} style={memberCard}>
                <div style={grid3}>
                  <input
                    style={input}
                    placeholder="Name"
                    value={m.name}
                    onChange={(e) =>
                      updateItem("leadership", m._id, {
                        name: e.target.value,
                        initials: m.initials || toInitials(e.target.value),
                      })
                    }
                  />
                  <input
                    style={input}
                    placeholder="Role"
                    value={m.role}
                    onChange={(e) => updateItem("leadership", m._id, { role: e.target.value })}
                  />
                  <input
                    style={input}
                    placeholder="Initials"
                    value={m.initials}
                    onChange={(e) => updateItem("leadership", m._id, { initials: e.target.value })}
                  />
                </div>

                <textarea
                  style={textarea}
                  placeholder="Description"
                  value={m.desc}
                  onChange={(e) => updateItem("leadership", m._id, { desc: e.target.value })}
                />

                <div style={grid2}>
                  <input
                    style={input}
                    placeholder="LinkedIn"
                    value={m.linkedin}
                    onChange={(e) => updateItem("leadership", m._id, { linkedin: e.target.value })}
                  />
                  <input
                    style={input}
                    placeholder="Email"
                    value={m.email}
                    onChange={(e) => updateItem("leadership", m._id, { email: e.target.value })}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                  <div style={previewBoxSmall}>
                    {m.image?.preview || m.image?.url ? (
                      <Image
                        src={m.image.preview || m.image.url}
                        alt={m.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span style={{ color: "#94a3b8", fontSize: 12 }}>No image</span>
                    )}
                  </div>

                  <label style={btnSecondary}>
                    <Upload size={16} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onFile(file, "leadership", m._id);
                      }}
                    />
                  </label>

                  <button type="button" style={btnDanger} onClick={() => clearItemImage("leadership", m._id)}>
                    <Trash2 size={16} /> Clear Image
                  </button>

                  <button type="button" style={btnDanger} onClick={() => removeItem("leadership", m._id)}>
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={card}>
          <div style={sectionHead}>
            <h2 style={title}>Team Members</h2>
            <button type="button" style={btnSecondary} onClick={() => addItem("team")}>
              <Plus size={16} /> Add Member
            </button>
          </div>

          <div style={stack}>
            {form.team.map((m) => (
              <div key={m._id} style={memberCard}>
                <div style={grid3}>
                  <input
                    style={input}
                    placeholder="Name"
                    value={m.name}
                    onChange={(e) =>
                      updateItem("team", m._id, {
                        name: e.target.value,
                        initials: m.initials || toInitials(e.target.value),
                      })
                    }
                  />
                  <input
                    style={input}
                    placeholder="Role"
                    value={m.role}
                    onChange={(e) => updateItem("team", m._id, { role: e.target.value })}
                  />
                  <select
                    style={input}
                    value={m.category}
                    onChange={(e) => updateItem("team", m._id, { category: e.target.value })}
                  >
                    {TEAM_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={grid2}>
                  <input
                    style={input}
                    placeholder="Joined text"
                    value={m.joined}
                    onChange={(e) => updateItem("team", m._id, { joined: e.target.value })}
                  />
                  <input
                    style={input}
                    placeholder="Initials"
                    value={m.initials}
                    onChange={(e) => updateItem("team", m._id, { initials: e.target.value })}
                  />
                </div>

                <div style={grid2}>
                  <input
                    style={input}
                    placeholder="LinkedIn"
                    value={m.linkedin}
                    onChange={(e) => updateItem("team", m._id, { linkedin: e.target.value })}
                  />
                  <input
                    style={input}
                    placeholder="Email"
                    value={m.email}
                    onChange={(e) => updateItem("team", m._id, { email: e.target.value })}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 12, flexWrap: "wrap" }}>
                  <div style={previewBoxSmall}>
                    {m.image?.preview || m.image?.url ? (
                      <Image
                        src={m.image.preview || m.image.url}
                        alt={m.name}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                    ) : (
                      <span style={{ color: "#94a3b8", fontSize: 12 }}>No image</span>
                    )}
                  </div>

                  <label style={btnSecondary}>
                    <Upload size={16} /> Upload
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) onFile(file, "team", m._id);
                      }}
                    />
                  </label>

                  <button type="button" style={btnDanger} onClick={() => clearItemImage("team", m._id)}>
                    <Trash2 size={16} /> Clear Image
                  </button>

                  <button type="button" style={btnDanger} onClick={() => removeItem("team", m._id)}>
                    <Trash2 size={16} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={card}>
          <div style={sectionHead}>
            <h2 style={title}>Culture</h2>
            <button type="button" style={btnSecondary} onClick={() => addItem("culture")}>
              <Plus size={16} /> Add Culture
            </button>
          </div>

          <div style={stack}>
            {form.culture.map((c) => (
              <div key={c._id} style={memberCard}>
                <div style={grid2}>
                  <input
                    style={input}
                    placeholder="Label"
                    value={c.label}
                    onChange={(e) => updateItem("culture", c._id, { label: e.target.value })}
                  />
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={previewBoxSmall}>
                      {c.image?.preview || c.image?.url ? (
                        <Image
                          src={c.image.preview || c.image.url}
                          alt={c.label}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      ) : (
                        <span style={{ color: "#94a3b8", fontSize: 12 }}>No image</span>
                      )}
                    </div>

                    <label style={btnSecondary}>
                      <Upload size={16} /> Upload
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) onFile(file, "culture", c._id);
                        }}
                      />
                    </label>

                    <button type="button" style={btnDanger} onClick={() => clearItemImage("culture", c._id)}>
                      <Trash2 size={16} /> Clear Image
                    </button>
                  </div>
                </div>

                <button type="button" style={btnDanger} onClick={() => removeItem("culture", c._id)}>
                  <Trash2 size={16} /> Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <div style={{ display: "flex", justifyContent: "flex-end", gap: 12, paddingBottom: 40 }}>
          <button type="button" style={btnPrimary} onClick={uploadData} disabled={saving}>
            <Save size={16} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

const card = {
  background: "#fff",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 20,
  boxShadow: "0 8px 30px rgba(15, 23, 42, 0.04)",
};

const title = {
  fontSize: 18,
  fontWeight: 800,
  marginBottom: 16,
  color: "#0f172a",
};

const sectionHead = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: 12,
  marginBottom: 16,
  flexWrap: "wrap",
};

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  gap: 12,
};

const stack = {
  display: "grid",
  gap: 14,
};

const memberCard = {
  padding: 16,
  borderRadius: 14,
  border: "1px solid #e2e8f0",
  background: "#f8fafc",
};

const rowCard = {
  display: "flex",
  gap: 12,
  alignItems: "center",
  flexWrap: "wrap",
  padding: 12,
  borderRadius: 12,
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
};

const label = {
  display: "block",
  fontSize: 13,
  fontWeight: 700,
  marginBottom: 8,
  color: "#334155",
};

const input = {
  width: "100%",
  border: "1px solid #dbe4f0",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 14,
  outline: "none",
  background: "#fff",
};

const textarea = {
  width: "100%",
  minHeight: 100,
  border: "1px solid #dbe4f0",
  borderRadius: 10,
  padding: "12px 14px",
  fontSize: 14,
  outline: "none",
  background: "#fff",
  resize: "vertical",
};

const btnPrimary = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 10,
  padding: "12px 18px",
  fontWeight: 700,
  cursor: "pointer",
};

const btnSecondary = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "#fff",
  color: "#2563eb",
  border: "1px solid #bfdbfe",
  borderRadius: 10,
  padding: "12px 14px",
  fontWeight: 700,
  cursor: "pointer",
};

const btnDanger = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "#fff1f2",
  color: "#dc2626",
  border: "1px solid #fecdd3",
  borderRadius: 10,
  padding: "12px 14px",
  fontWeight: 700,
  cursor: "pointer",
};

const previewBox = {
  position: "relative",
  width: 220,
  height: 130,
  borderRadius: 12,
  overflow: "hidden",
  background: "#f1f5f9",
  border: "1px dashed #cbd5e1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const previewBoxSmall = {
  position: "relative",
  width: 70,
  height: 70,
  borderRadius: 12,
  overflow: "hidden",
  background: "#f1f5f9",
  border: "1px dashed #cbd5e1",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};