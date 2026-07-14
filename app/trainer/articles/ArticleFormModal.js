"use client";
// PLACE AT: app/trainer/articles/ArticleFormModal.js

import { useState, useRef, useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  X,
  Loader2,
  ImageIcon,
  Trash2,
  Heading2,
  AlignLeft,
  Lightbulb,
  Quote as QuoteIcon,
} from "lucide-react";
import { articlesAPI } from "../../lib/api"; // apne actual path ke hisaab se adjust karo

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap');
:root{
  --ink:#0f1117;--ink2:#374151;--muted:#6b7280;--light:#9ca3af;
  --border:#e5e7eb;--surf:#f9fafb;--white:#fff;
  --blue:#2563eb;--violet:#7c3aed;--red:#dc2626;--green:#16a34a;
  --ffd:'DM Serif Display',serif;--ffb:'DM Sans',sans-serif;
}
*,*::before,*::after{box-sizing:border-box;}
@keyframes scaleIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
@keyframes spin{to{transform:rotate(360deg)}}

.moverlay{
  position:fixed;inset:0;z-index:500;
  background:rgba(15,17,23,.6);backdrop-filter:blur(5px);
  display:flex;align-items:flex-start;justify-content:center;
  overflow-y:auto;padding:24px 16px;
}
.mbox{
  width:100%;max-width:760px;
  background:white;border-radius:26px;
  box-shadow:0 32px 90px rgba(0,0,0,.22);
  display:flex;flex-direction:column;overflow:hidden;
  animation:scaleIn .28s cubic-bezier(.22,1,.36,1) both;
  font-family:var(--ffb);color:var(--ink);
}
.mhdr{
  background:linear-gradient(135deg,#eff6ff 0%,#f5f3ff 50%,#fdf4ff 100%);
  padding:22px 26px 20px;
  border-bottom:1px solid rgba(37,99,235,.12);
  display:flex;align-items:center;justify-content:space-between;
  position:sticky;top:0;z-index:10;
}
.mhdr-title{font-family:var(--ffd);font-size:1.3rem;color:var(--ink);}
.mhdr-sub{font-size:.78rem;color:var(--muted);margin-top:3px;}
.mclose{
  width:36px;height:36px;border-radius:10px;
  background:rgba(0,0,0,.06);border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;color:var(--muted);
  transition:all .15s;flex-shrink:0;
}
.mclose:hover{background:rgba(220,38,38,.1);color:var(--red);}
.mbody{flex:1;overflow-y:auto;padding:24px 26px;display:flex;flex-direction:column;gap:24px;}
.msec{
  font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.1em;
  color:var(--muted);padding-bottom:8px;
  border-bottom:1px solid rgba(37,99,235,.1);
  display:flex;align-items:center;gap:8px;
}
.msec::before{
  content:'';display:inline-block;width:3px;height:14px;
  border-radius:2px;background:linear-gradient(180deg,var(--blue),var(--violet));
  flex-shrink:0;
}
.msec .opt{font-weight:400;text-transform:none;letter-spacing:0;font-size:.69rem;color:var(--light);}
.fgroup{display:flex;flex-direction:column;gap:5px;}
.flabel{font-size:.73rem;font-weight:700;color:var(--ink2);letter-spacing:.04em;text-transform:uppercase;}
.flabel .req{color:var(--red);margin-left:2px;}
.fhint{font-size:.7rem;color:var(--light);font-weight:400;text-transform:none;letter-spacing:0;margin-top:-2px;}
.finp,.fsel,.fta{
  width:100%;padding:10px 14px;
  background:var(--surf);border:1.5px solid var(--border);
  border-radius:11px;font-family:var(--ffb);font-size:.88rem;color:var(--ink);
  outline:none;transition:border-color .18s,box-shadow .18s;
}
.finp:focus,.fsel:focus,.fta:focus{
  border-color:var(--blue);
  box-shadow:0 0 0 3px rgba(37,99,235,.1);
  background:white;
}
.fta{resize:vertical;min-height:90px;line-height:1.7;}
.fsel{cursor:pointer;}
.fcols{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
@media(max-width:560px){.fcols{grid-template-columns:1fr;}}
.merr{
  background:rgba(254,242,242,.9);border:1px solid rgba(220,38,38,.2);
  border-radius:11px;padding:11px 15px;font-size:.82rem;color:var(--red);
  display:flex;align-items:center;gap:8px;
}
.char-row{display:flex;justify-content:space-between;align-items:center;}
.ch{font-size:.7rem;color:var(--light);font-weight:600;}
.ch.w{color:#f59e0b;}.ch.o{color:var(--red);}

.cov-wrap{display:flex;gap:16px;align-items:flex-start;flex-wrap:wrap;}
.cov-zone{
  width:180px;height:108px;border-radius:14px;border:2px dashed;
  border-color:var(--border);display:flex;align-items:center;
  justify-content:center;cursor:pointer;overflow:hidden;flex-shrink:0;
  position:relative;transition:border-color .18s;background:var(--surf);
}
.cov-zone:hover{border-color:var(--blue);background:rgba(37,99,235,.03);}
.cov-zone.has-img{border-style:solid;border-color:rgba(37,99,235,.3);}
.cov-img{width:100%;height:100%;object-fit:cover;display:block;}
.cov-overlay{
  position:absolute;inset:0;background:rgba(0,0,0,.45);
  opacity:0;transition:opacity .18s;
  display:flex;align-items:center;justify-content:center;
  color:white;font-size:.75rem;font-weight:700;
}
.cov-zone:hover .cov-overlay{opacity:1;}
.cov-ph{display:flex;flex-direction:column;align-items:center;gap:5px;color:var(--light);}
.cov-ph span{font-size:.72rem;}
.cov-info p{font-size:.8rem;color:var(--muted);line-height:1.6;margin-bottom:2px;}
.cov-info .cov-title{font-weight:700;color:var(--ink2);font-size:.84rem;margin-bottom:5px;}
.cov-rm{
  margin-top:8px;display:inline-flex;align-items:center;gap:6px;
  background:rgba(220,38,38,.08);color:var(--red);border:1px solid rgba(220,38,38,.18);
  border-radius:9px;padding:6px 12px;font-size:.76rem;font-weight:700;
  cursor:pointer;font-family:var(--ffb);transition:all .15s;
}
.cov-rm:hover{background:rgba(220,38,38,.15);}

.tags-wrap{display:flex;flex-wrap:wrap;gap:6px;align-items:center;padding:8px 12px;background:var(--surf);border:1.5px solid var(--border);border-radius:11px;min-height:44px;cursor:text;}
.tags-wrap:focus-within{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1);background:white;}
.tpill{background:rgba(37,99,235,.1);color:var(--blue);font-size:11.5px;font-weight:600;padding:3px 10px;border-radius:99px;display:flex;align-items:center;gap:5px;}
.tpill-rm{background:none;border:none;cursor:pointer;color:rgba(37,99,235,.6);font-size:14px;line-height:1;padding:0 0 0 2px;}
.tpill-rm:hover{color:var(--blue);}
.tag-inp{border:none;outline:none;background:none;font-family:var(--ffb);font-size:.86rem;color:var(--ink);min-width:80px;flex:1;}

.ab-list{display:flex;flex-direction:column;gap:12px;}
.ab-card{background:white;border:1.5px solid var(--border);border-radius:14px;padding:14px 16px;display:flex;flex-direction:column;gap:10px;transition:border-color .18s;}
.ab-card:hover{border-color:rgba(37,99,235,.25);}
.ab-card-hdr{display:flex;align-items:center;justify-content:space-between;gap:10px;}
.ab-type{display:inline-flex;align-items:center;gap:8px;}
.ab-type-ico{width:30px;height:30px;border-radius:9px;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.ab-type-sel{border:1.5px solid var(--border);background:var(--surf);border-radius:9px;font-family:var(--ffb);font-size:.78rem;font-weight:700;color:var(--ink2);padding:6px 10px;outline:none;cursor:pointer;transition:border-color .18s;}
.ab-type-sel:focus{border-color:var(--blue);}
.ab-rm{background:none;border:none;cursor:pointer;color:var(--light);padding:5px;border-radius:7px;display:flex;align-items:center;justify-content:center;transition:all .15s;}
.ab-rm:hover{color:var(--red);background:rgba(220,38,38,.08);}
.ab-field-lbl{font-size:.7rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--light);margin-bottom:5px;}
.ab-ta{width:100%;border:1.5px solid var(--border);background:var(--surf);border-radius:10px;padding:10px 12px;font-family:var(--ffb);font-size:.86rem;color:var(--ink);line-height:1.7;resize:vertical;outline:none;transition:border-color .18s,box-shadow .18s;}
.ab-ta:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1);background:white;}
.ab-author-inp{width:100%;border:1.5px solid var(--border);background:var(--surf);border-radius:10px;padding:8px 12px;font-family:var(--ffb);font-size:.8rem;color:var(--ink);outline:none;transition:border-color .18s,box-shadow .18s;}
.ab-author-inp:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(37,99,235,.1);background:white;}
.ab-add-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:10px;}
@media(max-width:560px){.ab-add-grid{grid-template-columns:repeat(2,1fr);}}
.ab-add-item{border:2px dashed var(--border);background:var(--surf);border-radius:12px;padding:12px 8px;display:flex;flex-direction:column;align-items:center;gap:5px;cursor:pointer;transition:all .18s;text-align:center;}
.ab-add-item:hover{border-color:var(--blue);background:rgba(37,99,235,.05);transform:translateY(-1px);}
.ab-add-lbl{font-size:.74rem;font-weight:700;color:var(--ink2);}
.ab-empty{text-align:center;padding:26px 10px;color:var(--light);font-size:.84rem;font-weight:500;border:2px dashed var(--border);border-radius:14px;background:var(--surf);}

.mftr{
  padding:16px 26px;border-top:1px solid var(--border);
  background:var(--surf);border-radius:0 0 26px 26px;
  display:flex;align-items:center;justify-content:space-between;gap:10px;
  position:sticky;bottom:0;
}
.btn-cancel{
  padding:10px 22px;border-radius:11px;border:1px solid var(--border);
  font-family:var(--ffb);font-size:.84rem;font-weight:600;color:var(--muted);
  background:white;cursor:pointer;transition:all .15s;
}
.btn-cancel:hover{background:var(--surf);}
.ftr-right{display:flex;gap:8px;}
.btn-draft{
  padding:10px 20px;border-radius:11px;border:1px solid var(--border);
  font-family:var(--ffb);font-size:.84rem;font-weight:700;color:var(--ink2);
  background:white;cursor:pointer;transition:all .15s;
  display:inline-flex;align-items:center;gap:6px;
}
.btn-draft:hover{background:var(--surf);}
.btn-draft:disabled,.btn-publish:disabled{opacity:.55;cursor:not-allowed;}
.btn-publish{
  padding:10px 24px;border-radius:11px;
  background:linear-gradient(135deg,var(--blue),#1d4ed8);color:white;
  font-family:var(--ffb);font-size:.88rem;font-weight:700;border:none;
  cursor:pointer;box-shadow:0 4px 16px rgba(37,99,235,.3);
  transition:all .18s;display:inline-flex;align-items:center;gap:6px;
}
.btn-publish:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 7px 22px rgba(37,99,235,.38);}
.spin{animation:spin .8s linear infinite;}
`;

const CATEGORIES = ["AI", "Fitness", "Nutrition", "Sleep", "Mindset", "Strength", "Cardio"];

const BLOCK_DEFS = {
  h2: { label: "Heading", Icon: Heading2, bg: "rgba(124,58,237,.1)", color: "#7c3aed", fieldLbl: "Heading Text", placeholder: "e.g. Why Prompting Is Harder Than It Looks" },
  p: { label: "Paragraph", Icon: AlignLeft, bg: "rgba(37,99,235,.1)", color: "#2563eb", fieldLbl: "Paragraph Text", placeholder: "Write the paragraph content here…" },
  callout: { label: "Callout", Icon: Lightbulb, bg: "rgba(217,119,6,.1)", color: "#d97706", fieldLbl: "Callout Text", placeholder: "💡 Key insight, tip, or quick takeaway…" },
  quote: { label: "Quote", Icon: QuoteIcon, bg: "rgba(219,39,119,.1)", color: "#db2777", fieldLbl: "Quote Text", placeholder: "Enter the quotation…" },
};

const BTYPES = Object.keys(BLOCK_DEFS);

const fmtFull = (d) => new Date(d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
const fmtShort = (d) => new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
const calcRead = (blocks) => `${Math.max(1, Math.round((blocks || []).reduce((a, x) => a + (x.text || "").split(/\s+/).filter(Boolean).length, 0) / 200))} min`;
const mkInit = (name) => (name || "").split(" ").filter(Boolean).map((w) => w[0]).join("").slice(0, 2).toUpperCase();

// ── Backend <-> Form block-type mapping ──────────────────────────────────
// Backend sectionSchema enum is ["heading","paragraph","callout","quote"]
// and its text field is called `content` (not `text`). The editor UI here
// uses the shorter h2/p labels and a `text` field, so we translate both
// ways at the API boundary instead of touching the UI.
const SECTION_TYPE_TO_BLOCK = { heading: "h2", paragraph: "p", callout: "callout", quote: "quote" };
const BLOCK_TYPE_TO_SECTION = { h2: "heading", p: "paragraph", callout: "callout", quote: "quote" };

// Backend's sectionSchema only has {type, content} — no separate quote-author
// field — so a quote's attribution is appended into content as
// "text\n\n— Author" and split back out when reading it in articleToForm().
function splitQuoteContent(content) {
  const m = (content || "").match(/^([\s\S]*?)\n\n— (.+)$/);
  return m ? { text: m[1], author: m[2] } : { text: content || "", author: "" };
}

function emptyForm() {
  return {
    title: "",
    brief: "",
    author: "",
    authorRole: "",
    authorBio: "",
    initials: "",
    category: "Fitness",
    tags: [],
    image: null,
    trending: false,
    content: [],
    status: "draft",
    trainerId: "",
  };
}

function articleToForm(a) {
  const rawSections = a.sections || a.content || [];
  const content = rawSections.map((b) => {
    // Supports both a raw backend doc (b.content, b.type = heading/paragraph/…)
    // and an already-mapped local shape (b.text, b.type = h2/p/…).
    const type = SECTION_TYPE_TO_BLOCK[b.type] || b.type || "p";
    if (type === "quote") {
      const { text, author } = "content" in b
        ? splitQuoteContent(b.content)
        : { text: b.text || "", author: b.author || "" };
      return { type, text, author };
    }
    return { type, text: "content" in b ? (b.content || "") : (b.text || "") };
  });

  return {
    title: a.title || "",
    brief: a.brief || a.shortDescription || "",
    author: a.author || "",
    authorRole: a.authorRole || "",
    authorBio: a.authorBio || "",
    initials: a.initials || "",
    category: a.category || "Fitness",
    tags: a.tags || [],
    image: a.coverImage?.url ? { url: a.coverImage.url, ext: true } : null,
    trending: Boolean(a.trending ?? a.featured),
    content,
    status: a.status || "published",
    trainerId: a.trainerId || a.trainer?._id || a.trainer || "",
  };
}

function buildFormData(f, status, existing, user) {
  const content = (f.content || [])
    .filter((b) => (b.text || "").trim())
    .map((b) => {
      const type = BLOCK_TYPE_TO_SECTION[b.type] || "paragraph"; // h2/p -> heading/paragraph
      const text = b.text.trim();
      const content = type === "quote" && (b.author || "").trim()
        ? `${text}\n\n— ${b.author.trim()}`
        : text;
      return { type, content }; // backend expects `content`, not `text`
    });

  const authorName = (user?.fullName || user?.name || f.author || "").trim();
  const authorRole = (
    f.authorRole ||
    user?.subjectLine ||
    user?.title ||
    user?.roleName ||
    user?.industry ||
    "Trainer"
  ).trim();

  const fd = new FormData();
  fd.append("title", f.title.trim());
  fd.append("shortDescription", f.brief.trim());
  fd.append("author", authorName);
  fd.append("authorRole", authorRole);
  fd.append("authorBio", (f.authorBio || "").trim());
  fd.append("initials", (f.initials || mkInit(authorName)).trim());
  fd.append("category", f.category);
  fd.append("tags", JSON.stringify(f.tags || []));
  fd.append("sections", JSON.stringify(content)); // only field the backend actually reads for body copy
  fd.append("status", status);
  fd.append("featured", String(Boolean(f.trending))); // backend field is "featured", not "trending"

  if (existing?._id || existing?.id) fd.append("id", existing?._id || existing?.id);
  fd.append("date", existing?.date || fmtShort(new Date()));
  fd.append("fullDate", existing?.fullDate || fmtFull(new Date()));
  fd.append("readTime", calcRead(content.map((s) => ({ text: s.content }))));
  fd.append("views", String(existing?.views || "0"));

  if (f.image?.file) fd.append("coverImage", f.image.file);

  return fd;
}

function Field({ label, required, hint, children }) {
  return (
    <div className="fgroup">
      <label className="flabel">
        {label}{required && <span className="req">*</span>}
      </label>
      {hint && <p className="fhint">{hint}</p>}
      {children}
    </div>
  );
}

function BlockEditor({ blocks, onChange }) {
  function add(type) {
    onChange([...(blocks || []), { type, text: "", author: "" }]);
  }
  function upd(i, k, v) {
    onChange((blocks || []).map((b, j) => (j === i ? { ...b, [k]: v } : b)));
  }
  function rm(i) {
    onChange((blocks || []).filter((_, j) => j !== i));
  }
  function chtype(i, type) {
    onChange((blocks || []).map((b, j) => (j === i ? { ...b, type } : b)));
  }

  return (
    <div>
      {(!blocks || blocks.length === 0) && (
        <div className="ab-empty">
          No content sections yet — add a heading or paragraph below to start building your article.
        </div>
      )}

      <div className="ab-list">
        {(blocks || []).map((b, i) => {
          const def = BLOCK_DEFS[b.type] || BLOCK_DEFS.p;
          const { Icon } = def;

          return (
            <div key={i} className="ab-card">
              <div className="ab-card-hdr">
                <div className="ab-type">
                  <span className="ab-type-ico" style={{ background: def.bg, color: def.color }}>
                    <Icon size={15} />
                  </span>
                  <select className="ab-type-sel" value={b.type} onChange={(e) => chtype(i, e.target.value)}>
                    {BTYPES.map((t) => (
                      <option key={t} value={t}>{BLOCK_DEFS[t].label}</option>
                    ))}
                  </select>
                </div>
                <button type="button" className="ab-rm" onClick={() => rm(i)} title="Remove section">
                  <Trash2 size={14} />
                </button>
              </div>

              <div>
                <div className="ab-field-lbl">{def.fieldLbl}</div>
                <textarea
                  className="ab-ta"
                  rows={b.type === "h2" ? 1 : 3}
                  placeholder={def.placeholder}
                  value={b.text}
                  onChange={(e) => upd(i, "text", e.target.value)}
                />
              </div>

              {b.type === "quote" && (
                <div>
                  <div className="ab-field-lbl">
                    Author / Role <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optional)</span>
                  </div>
                  <input
                    type="text"
                    className="ab-author-inp"
                    placeholder="e.g. Arjun Mehta, DeepMind India"
                    value={b.author || ""}
                    onChange={(e) => upd(i, "author", e.target.value)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="ab-add-grid">
        {BTYPES.map((t) => {
          const def = BLOCK_DEFS[t];
          const { Icon } = def;
          return (
            <div key={t} className="ab-add-item" onClick={() => add(t)}>
              <span style={{ color: def.color }}><Icon size={18} /></span>
              <span className="ab-add-lbl">{def.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ArticleFormModal({ article, onClose, onSaved, trainers }) {
  const articleId = article?._id || article?.id || null;
  const isEdit = Boolean(articleId);
  const user = useSelector((s) => s.auth?.user);

  const [form, setForm] = useState(() => (article ? articleToForm(article) : emptyForm()));
  const [tagIn, setTagIn] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef(null);

  const set = useCallback((k, v) => setForm((p) => ({ ...p, [k]: v })), []);

  useEffect(() => {
    if (!user || isEdit) return;
    setForm((prev) => ({
      ...prev,
      trainerId: prev.trainerId || user?._id || user?.id || "",
      author: prev.author || user?.fullName || user?.name || "",
      authorRole: prev.authorRole || user?.subjectLine || user?.title || user?.roleName || user?.industry || "Trainer",
      initials: prev.initials || mkInit(user?.fullName || user?.name || ""),
    }));
  }, [user, isEdit]);

  function handleImg(e) {
    const f = e.target.files?.[0];
    if (!f) return;
    if (!f.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }
    setForm((p) => ({ ...p, image: { url: URL.createObjectURL(f), file: f } }));
    setError("");
  }

  function rmImg() {
    if (form.image?.url && !form.image.ext) URL.revokeObjectURL(form.image.url);
    set("image", null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function tagKey(e) {
    if ((e.key === "Enter" || e.key === ",") && tagIn.trim()) {
      e.preventDefault();
      const t = tagIn.trim().replace(/,$/, "");
      if (t && !form.tags.includes(t)) set("tags", [...form.tags, t]);
      setTagIn("");
    }
    if (e.key === "Backspace" && !tagIn && form.tags.length) {
      set("tags", form.tags.slice(0, -1));
    }
  }

  function removeTag(t) {
    set("tags", form.tags.filter((x) => x !== t));
  }

  async function handleSubmit(status) {
    setError("");

    const authorName = (user?.fullName || user?.name || form.author || "").trim();

    if (!form.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!form.brief.trim()) {
      setError("Short description is required.");
      return;
    }
    if (!isEdit && !form.image?.file) {
      setError("Cover image is required.");
      return;
    }

    setSaving(true);
    try {
      const payload = buildFormData(
        {
          ...form,
          author: authorName,
          trainerId: form.trainerId || user?._id || user?.id || "",
          authorRole: form.authorRole || user?.subjectLine || user?.title || user?.roleName || user?.industry || "Trainer",
          initials: form.initials || mkInit(authorName),
        },
        status,
        article,
        user
      );

      const res = isEdit
        ? await articlesAPI.update(articleId, payload)
        : await articlesAPI.create(payload);

      if (onSaved) onSaved(res?.data || res);
      onClose?.();
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Save failed.");
    } finally {
      setSaving(false);
    }
  }

  const briefLen = form.brief.length;
  const briefCls = briefLen > 280 ? "ch o" : briefLen > 220 ? "ch w" : "ch";
  const authorName = form.author || user?.fullName || user?.name || "";

  return (
    <>
      <style>{CSS}</style>
      <div className="moverlay" onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }}>
        <div className="mbox">
          <div className="mhdr">
            <div>
              <div className="mhdr-title">{isEdit ? "Edit Article" : "Create New Article"}</div>
              <div className="mhdr-sub">Fill in the details and publish to your blog</div>
            </div>
            <button type="button" className="mclose" onClick={onClose}>
              <X size={18} />
            </button>
          </div>

          <div className="mbody">
            {error && <div className="merr"><span>⚠</span> {error}</div>}

            <div className="msec">Cover Image <span className="opt">(required for create)</span></div>
            <div className="cov-wrap">
              <div className={`cov-zone${form.image ? " has-img" : ""}`} onClick={() => fileRef.current?.click()}>
                {form.image ? (
                  <>
                    <img src={form.image.url} alt="cover" className="cov-img" />
                    <div className="cov-overlay">Change</div>
                  </>
                ) : (
                  <div className="cov-ph"><ImageIcon size={24} /><span>Upload Cover</span></div>
                )}
              </div>

              <div className="cov-info">
                <p className="cov-title">Article cover image</p>
                <p>Recommended: 1280×720 px (16:9)</p>
                <p style={{ fontSize: ".72rem", marginTop: 4 }}>Shown on the article card and detail hero.</p>
                {form.image && (
                  <button type="button" className="cov-rm" onClick={rmImg}>
                    <Trash2 size={12} /> Remove image
                  </button>
                )}
              </div>

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImg}
              />
            </div>

            <div className="msec">Basic Information</div>
            <div className="fcols">
              <Field label="Title" required>
                <input
                  className="finp"
                  type="text"
                  maxLength={140}
                  placeholder="e.g. How Prompt Engineering Is Changing…"
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                />
              </Field>

              <Field label="Category">
                <select className="fsel" value={form.category} onChange={(e) => set("category", e.target.value)}>
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
            </div>

            {trainers && trainers.length > 0 && false && (
              <Field label="Assigned Author">
                <select
                  className="fsel"
                  value={form.trainerId}
                  onChange={(e) => {
                    const tId = e.target.value;
                    const t = trainers.find((x) => x._id === tId);
                    setForm((p) => ({
                      ...p,
                      trainerId: tId,
                      author: t ? t.name : p.author,
                      authorRole: t ? (t.title || t.industry || "") : p.authorRole,
                      initials: t ? mkInit(t.name) : p.initials,
                    }));
                  }}
                >
                  <option value="">— Select Author (optional) —</option>
                  {trainers.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name} {t.email ? `(${t.email})` : ""}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            <Field label="Author Name" hint="Auto-filled from your logged-in profile.">
              <input className="finp" type="text" value={authorName} readOnly />
            </Field>

            <Field label="Short Description" required hint="Shown on the card and as the hero subtitle.">
              <div className="char-row">
                <span />
                <span className={briefCls}>{briefLen}/280</span>
              </div>
              <textarea
                className="fta"
                rows={2}
                maxLength={300}
                placeholder="A concise hook shown on the article card and hero subtitle."
                value={form.brief}
                onChange={(e) => set("brief", e.target.value)}
                style={{ minHeight: 70 }}
              />
            </Field>

            <div className="msec">Tags & Visibility</div>
            <Field label="Tags" hint="Press Enter or comma to add a tag.">
              <div className="tags-wrap">
                {form.tags.map((t) => (
                  <span key={t} className="tpill">
                    {t}
                    <button type="button" className="tpill-rm" onClick={() => removeTag(t)}>×</button>
                  </span>
                ))}
                <input
                  type="text"
                  className="tag-inp"
                  placeholder={form.tags.length ? "" : "e.g. AI, Fitness…"}
                  value={tagIn}
                  onChange={(e) => setTagIn(e.target.value)}
                  onKeyDown={tagKey}
                />
              </div>
            </Field>

            <div className="msec">Article Content</div>
            <Field label="Sections" hint="Add headings, paragraphs, callouts, and quotes that make up the article body.">
              <BlockEditor blocks={form.content} onChange={(c) => set("content", c)} />
            </Field>
          </div>

          <div className="mftr">
            <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
            <div className="ftr-right">
              <button type="button" className="btn-draft" onClick={() => handleSubmit("draft")} disabled={saving}>
                {saving && <Loader2 size={13} className="spin" />} Save as Draft
              </button>
              <button type="button" className="btn-publish" onClick={() => handleSubmit("published")} disabled={saving}>
                {saving && <Loader2 size={13} className="spin" />}
                {isEdit ? "Update & Publish" : "Publish Article"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}