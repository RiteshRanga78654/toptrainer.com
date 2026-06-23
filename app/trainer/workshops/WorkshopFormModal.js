"use client";
// PLACE AT: app/trainer/workshops/WorkshopFormModal.js

import { useState, useRef, useCallback } from "react";
import {
  X, Upload, Loader2, ImageIcon, Wifi,
  MapPin, Play, Calendar as CalIcon,
} from "lucide-react";

// ─── CSS ──────────────────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&display=swap');
:root{
  --ink:#0f1117;--ink2:#374151;--muted:#6b7280;--light:#9ca3af;
  --border:#e5e7eb;--surf:#f9fafb;--white:#fff;
  --blue:#2563eb;--violet:#7c3aed;--red:#dc2626;--green:#16a34a;
  --ffd:'DM Serif Display',serif;--ffb:'DM Sans',sans-serif;
}
@keyframes scaleIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}
@keyframes spin{to{transform:rotate(360deg)}}

.moverlay{
  position:fixed;inset:0;z-index:500;
  background:rgba(15,17,23,.6);backdrop-filter:blur(5px);
  display:flex;align-items:flex-start;justify-content:center;
  overflow-y:auto;padding:24px 16px;
}
.mbox{
  width:100%;max-width:720px;
  background:white;border-radius:26px;
  box-shadow:0 32px 90px rgba(0,0,0,.22);
  display:flex;flex-direction:column;overflow:hidden;
  animation:scaleIn .28s cubic-bezier(.22,1,.36,1) both;
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
.fcols3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;}
@media(max-width:560px){.fcols,.fcols3{grid-template-columns:1fr;}}
.merr{
  background:rgba(254,242,242,.9);border:1px solid rgba(220,38,38,.2);
  border-radius:11px;padding:11px 15px;font-size:.82rem;color:var(--red);
  display:flex;align-items:center;gap:8px;
}
.cov-wrap{display:flex;gap:16px;align-items:flex-start;}
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
.ctype-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
@media(max-width:400px){.ctype-grid{grid-template-columns:1fr;}}
.ctype-item{
  border-radius:13px;border:2px solid var(--border);padding:12px;
  cursor:pointer;transition:all .18s;background:var(--surf);
}
.ctype-item.sel{border-color:var(--blue);background:rgba(37,99,235,.05);}
.ctype-item:not(.sel):hover{border-color:rgba(37,99,235,.3);}
.ctype-hd{display:flex;align-items:center;gap:8px;}
.ctype-lbl{font-size:.84rem;font-weight:600;color:var(--muted);transition:color .15s;}
.ctype-item.sel .ctype-lbl{color:var(--blue);}
.ctype-inp{
  margin-top:9px;width:100%;padding:7px 10px;border-radius:8px;
  border:1px solid rgba(37,99,235,.2);font-family:var(--ffb);font-size:.8rem;
  background:white;outline:none;
}
.ctype-inp:focus{box-shadow:0 0 0 2px rgba(37,99,235,.15);}
.gallery-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
.gal-item{border-radius:13px;border:1px solid var(--border);overflow:hidden;background:var(--surf);}
.gal-img-wrap{position:relative;height:106px;}
.gal-img{width:100%;height:100%;object-fit:cover;display:block;}
.gal-rm{
  position:absolute;top:7px;right:7px;width:22px;height:22px;border-radius:50%;
  background:rgba(220,38,38,.85);color:white;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;transition:background .15s;
}
.gal-rm:hover{background:var(--red);}
.gal-cap{
  width:100%;padding:8px 10px;border:none;border-top:1px solid var(--border);
  font-family:var(--ffb);font-size:.75rem;color:var(--ink);
  background:white;outline:none;
}
.gal-add{
  height:106px;border-radius:13px;border:2px dashed var(--border);
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  gap:5px;cursor:pointer;color:var(--light);
  transition:all .18s;background:var(--surf);
}
.gal-add:hover{border-color:var(--blue);color:var(--blue);background:rgba(37,99,235,.04);}
.gal-add span{font-size:.72rem;font-weight:600;}
.chk-row{display:flex;gap:24px;flex-wrap:wrap;}
.chk-label{
  display:flex;align-items:center;gap:8px;cursor:pointer;
  font-size:.85rem;font-weight:600;color:var(--ink2);user-select:none;
}
.chk-label input[type=checkbox]{width:16px;height:16px;accent-color:var(--blue);cursor:pointer;}
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

// ─── Constants ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  "Leadership","Communication","Technology","Finance",
  "Marketing","HR & People","Operations","Design","Sales","Wellness",
];
const MODES = [
  { value: "online",  label: "Online"  },
  { value: "offline", label: "Offline" },
  { value: "hybrid",  label: "Hybrid"  },
];
const DURATION_UNITS = ["hours","days","weeks","months"];
const CLASS_TYPES = [
  { key: "live",     label: "Live Online", Icon: Wifi    },
  { key: "offline",  label: "Offline",     Icon: MapPin  },
  { key: "recorded", label: "Recorded",    Icon: Play    },
  { key: "workshop", label: "Workshop",    Icon: CalIcon },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
const csv = str => (str || "").split(",").map(s => s.trim()).filter(Boolean);

function emptyForm() {
  return {
    title:"", category:"", mode:"online",
    shortDesc:"", fullDesc:"", targetAudience:"",
    coverImg:"",
    photos: [],                   // [{ src, label }]  — matches schema photoSchema
    dateRange:"", timeSlot:"", location:"",
    duration:{ value:"", unit:"hours" },
    seats:"", maxParticipants:"",
    price:{ original:"", discounted:"", emi:"", currency:"INR", includes:"" },
    learningOutcomes:"",   // comma-separated → array on save
    prerequisites:"",
    topics:"",             // comma-separated → stored as tags or topics
    competency:"", industry:"", tags:"",
    certifications:"",
    classTypes:[],
    isLive:false, isFeatured:false, status:"draft",
  };
}

function workshopToForm(w) {
  const dur = w.duration
    ? (typeof w.duration === "object"
        ? { value: String(w.duration.value ?? ""), unit: w.duration.unit || "hours" }
        : (() => { const [v,...r] = String(w.duration).split(" "); return { value:v, unit:r.join(" ")||"hours" }; })())
    : { value:"", unit:"hours" };

  return {
    title:          w.title          || "",
    category:       w.category       || "",
    mode:           w.mode           || "online",
    shortDesc:      w.shortDesc      || "",
    fullDesc:       w.fullDesc       || "",
    targetAudience: w.targetAudience || "",
    coverImg:       w.coverImg       || "",
    // schema stores photos as [{ src, label }]; gallery/photos are the same thing
    photos:         (w.photos || w.gallery || []).map(p => ({ src: p.src || p.url || "", label: p.label || "" })),
    dateRange:      w.dateRange      || "",
    timeSlot:       w.timeSlot       || "",
    location:       w.location       || "",
    duration:       dur,
    seats:          w.seats          ?? "",
    maxParticipants:w.maxParticipants?? "",
    price: {
      original:   w.price?.original   ?? "",
      discounted: w.price?.discounted ?? "",
      emi:        w.price?.emi        ?? "",
      currency:   w.price?.currency   || "INR",
      includes:   (w.price?.includes  || []).join(", "),
    },
    learningOutcomes: (w.learningOutcomes || []).join(", "),
    prerequisites:    (w.prerequisites    || []).join(", "),
    topics:           (w.topics           || w.tags || []).join(", "),
    competency:       w.competency        || "",
    industry:         w.industry          || "",
    tags:             (w.tags             || []).join(", "),
    certifications:   (w.certifications   || []).join(", "),
    classTypes:       w.classTypes        || [],
    isLive:           w.isLive            || false,
    isFeatured:       w.isFeatured        || false,
    status:           w.status            || "draft",
  };
}

/**
 * formToPayload — converts form state to the exact shape the Mongoose schema expects.
 *
 * Key fixes:
 *  - duration sent as { value: Number, unit: String }  (schema uses an object, not a string)
 *  - photos mapped to [{ src, label }]  (schema's photoSchema)
 *  - price.includes, learningOutcomes, prerequisites, certifications, tags all sent as arrays
 *  - topics stored in tags array (add a separate `topics` field if your schema has one)
 */
function formToPayload(f, status) {
  return {
    title:          f.title.trim(),
    category:       f.category,
    mode:           f.mode,
    shortDesc:      f.shortDesc.trim(),
    fullDesc:       f.fullDesc.trim(),
    targetAudience: f.targetAudience.trim(),
    coverImg:       f.coverImg,

    // photos → [{ src, label }]  matches photoSchema
    photos: f.photos.map(p => ({ src: p.src, label: p.label || "" })),

    dateRange: f.dateRange.trim(),
    timeSlot:  f.timeSlot.trim(),
    location:  f.location.trim(),

    // ✅ duration as object — matches schema { value: Number, unit: String }
    duration: {
      value: Number(f.duration.value) || 0,
      unit:  f.duration.unit || "hours",
    },

    seats:           f.seats           ? Number(f.seats)           : undefined,
    maxParticipants: f.maxParticipants ? Number(f.maxParticipants) : undefined,

    price: {
      original:   Number(f.price.original)   || 0,
      discounted: f.price.discounted ? Number(f.price.discounted) : 0,
      emi:        f.price.emi        ? Number(f.price.emi)        : 0,
      currency:   f.price.currency,
      includes:   csv(f.price.includes),
    },

    learningOutcomes: csv(f.learningOutcomes),
    prerequisites:    csv(f.prerequisites),
    // topics → stored as tags in schema; adjust if you add a dedicated topics field
    tags:             csv(f.topics || f.tags),
    certifications:   csv(f.certifications),

    competency: f.competency.trim(),
    industry:   f.industry.trim(),

    classTypes: f.classTypes.map(ct => ({ ...ct, count: Number(ct.count) || 0 })),
    isLive:     f.isLive,
    isFeatured: f.isFeatured,
    status,
  };
}

// ─── Image upload helper (tries server, falls back to base64) ─────────────────
async function uploadFile(file) {
  // Try the server upload endpoint first
  try {
    const fd = new FormData();
    fd.append("image", file);
    const res = await fetch("/api/v1/uploads/workshop", { method: "POST", body: fd });
    if (res.ok) {
      const data = await res.json();
      const url = data?.url || data?.data?.url;
      if (url) return url;
    }
  } catch { /* fall through */ }

  // Fallback: base64 data URL (works even if /api/v1/uploads is not wired yet)
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Small helpers ────────────────────────────────────────────────────────────
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

// ─── Main Modal ───────────────────────────────────────────────────────────────
export default function WorkshopFormModal({ workshop, onSave, onClose }) {
  const isEdit = Boolean(workshop?._id);

  const [form,           setForm]           = useState(() => workshop ? workshopToForm(workshop) : emptyForm());
  const [saving,         setSaving]         = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error,          setError]          = useState("");

  const coverRef = useRef();
  const photoRef = useRef();

  const set      = useCallback((k, v) => setForm(p => ({ ...p, [k]: v })), []);
  const setPrice = useCallback((k, v) => setForm(p => ({ ...p, price:    { ...p.price,    [k]: v } })), []);
  const setDur   = useCallback((k, v) => setForm(p => ({ ...p, duration: { ...p.duration, [k]: v } })), []);

  // ── cover upload ────────────────────────────────────────
  async function handleCoverUpload(e) {
    const file = e.target.files?.[0]; if (!file) return;
    setUploadingCover(true);
    try   { set("coverImg", await uploadFile(file)); }
    catch { setError("Cover image upload failed."); }
    finally { setUploadingCover(false); e.target.value = ""; }
  }

  // ── session snapshot upload ─────────────────────────────
  async function handlePhotoUpload(e) {
    const file = e.target.files?.[0]; if (!file || form.photos.length >= 4) return;
    setUploadingPhoto(true);
    try {
      const url = await uploadFile(file);
      setForm(p => ({ ...p, photos: [...p.photos, { src: url, label: "" }] }));
    } catch { setError("Photo upload failed."); }
    finally { setUploadingPhoto(false); e.target.value = ""; }
  }

  function updatePhotoLabel(idx, label) {
    setForm(p => { const ph = [...p.photos]; ph[idx] = { ...ph[idx], label }; return { ...p, photos: ph }; });
  }
  function removePhoto(idx) {
    setForm(p => ({ ...p, photos: p.photos.filter((_, i) => i !== idx) }));
  }

  // ── class types ─────────────────────────────────────────
  function toggleClassType(key) {
    setForm(p => {
      const exists = p.classTypes.find(ct => ct.type === key);
      return {
        ...p,
        classTypes: exists
          ? p.classTypes.filter(ct => ct.type !== key)
          : [...p.classTypes, { type: key, count: "" }],
      };
    });
  }
  function updateClassTypeCount(key, count) {
    setForm(p => ({
      ...p,
      classTypes: p.classTypes.map(ct => ct.type === key ? { ...ct, count } : ct),
    }));
  }

  // ── submit ──────────────────────────────────────────────
  async function handleSubmit(status) {
    setError("");
    if (!form.title.trim())     { setError("Title is required.");             return; }
    if (!form.category)         { setError("Category is required.");          return; }
    if (!form.shortDesc.trim()) { setError("Short description is required."); return; }
    if (!form.mode)             { setError("Mode is required.");              return; }
    if (!form.duration.value)   { setError("Duration is required.");          return; }
    if (!form.price.original)   { setError("Original price is required.");    return; }
    if (!form.coverImg)         { setError("Cover image is required.");       return; }
    setSaving(true);
    try   { await onSave(formToPayload(form, status), workshop?._id); }
    catch (err) { setError(err.response?.data?.message || err.message || "Save failed."); }
    finally { setSaving(false); }
  }

  return (
    <>
      <style>{CSS}</style>
      <div className="moverlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="mbox">

          {/* Header */}
          <div className="mhdr">
            <div>
              <div className="mhdr-title">{isEdit ? "Edit Workshop" : "Create Workshop"}</div>
              <div className="mhdr-sub">Fill in the details and publish to TopTrainer</div>
            </div>
            <button className="mclose" onClick={onClose}><X size={18} /></button>
          </div>

          {/* Body */}
          <div className="mbody">

            {error && <div className="merr"><span>⚠</span> {error}</div>}

            {/* ── Cover Image ── */}
            <div className="msec">Cover Image</div>
            <div className="cov-wrap">
              <div
                className={`cov-zone${form.coverImg ? " has-img" : ""}`}
                onClick={() => coverRef.current?.click()}
              >
                {form.coverImg ? (
                  <><img src={form.coverImg} alt="cover" className="cov-img" /><div className="cov-overlay">Change</div></>
                ) : uploadingCover ? (
                  <Loader2 size={22} className="spin" style={{ color:"var(--blue)" }} />
                ) : (
                  <div className="cov-ph"><ImageIcon size={24} /><span>Upload Cover</span></div>
                )}
              </div>
              <div className="cov-info">
                <p className="cov-title">Workshop cover photo</p>
                <p>Recommended: 1280×720 px (16:9)</p>
                <p style={{ fontSize:".72rem", marginTop:4 }}>Shown on your workshop card across TopTrainer.</p>
              </div>
              <input ref={coverRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handleCoverUpload} />
            </div>

            {/* ── Basic Info ── */}
            <div className="msec">Basic Information</div>
            <Field label="Workshop Title" required>
              <input className="finp" type="text" maxLength={120}
                placeholder="e.g. Advanced Leadership Bootcamp"
                value={form.title} onChange={e => set("title", e.target.value)} />
            </Field>

            <div className="fcols">
              <Field label="Category" required>
                <select className="fsel" value={form.category} onChange={e => set("category", e.target.value)}>
                  <option value="">Select category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </Field>
              <Field label="Mode" required>
                <select className="fsel" value={form.mode} onChange={e => set("mode", e.target.value)}>
                  {MODES.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
                </select>
              </Field>
            </div>

            <Field label="Short Description" required hint="Shown on the card — keep it under 150 chars.">
              <textarea className="fta" rows={2} maxLength={250}
                placeholder="A punchy one-liner about what participants will gain…"
                value={form.shortDesc} onChange={e => set("shortDesc", e.target.value)} style={{ minHeight:70 }} />
            </Field>

            <Field label="Full Description / About" hint="Shown on the workshop detail page as 'About This Workshop'.">
              <textarea className="fta" rows={4}
                placeholder="Describe the workshop in detail…"
                value={form.fullDesc} onChange={e => set("fullDesc", e.target.value)} />
            </Field>

            <Field label="Target Audience">
              <input className="finp" type="text"
                placeholder="e.g. Mid-level managers, aspiring entrepreneurs"
                value={form.targetAudience} onChange={e => set("targetAudience", e.target.value)} />
            </Field>

            {/* ── Schedule & Venue ── */}
            <div className="msec">Schedule &amp; Venue</div>
            <div className="fcols">
              <Field label="Date Range" hint="e.g. 15 Jul – 17 Jul 2025">
                <input className="finp" placeholder="15 Jul – 17 Jul 2025"
                  value={form.dateRange} onChange={e => set("dateRange", e.target.value)} />
              </Field>
              <Field label="Time Slot" hint="e.g. 10:00 AM – 1:00 PM">
                <input className="finp" placeholder="10:00 AM – 1:00 PM"
                  value={form.timeSlot} onChange={e => set("timeSlot", e.target.value)} />
              </Field>
            </div>

            <div className="fcols">
              <Field label="Duration" required>
                <div style={{ display:"flex", gap:8 }}>
                  <input className="finp" type="number" min="1" placeholder="3"
                    value={form.duration.value}
                    onChange={e => setDur("value", e.target.value)}
                    style={{ flex:1 }} />
                  <select className="fsel" value={form.duration.unit}
                    onChange={e => setDur("unit", e.target.value)} style={{ width:120 }}>
                    {DURATION_UNITS.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
              </Field>
              <Field label="Max Seats">
                <input className="finp" type="number" min="1" placeholder="30"
                  value={form.seats} onChange={e => set("seats", e.target.value)} />
              </Field>
            </div>

            <Field label="Location / Venue" hint="Write 'Online' or leave blank for virtual workshops.">
              <input className="finp" placeholder="e.g. Taj Hotel, Delhi  or  Online (Zoom)"
                value={form.location} onChange={e => set("location", e.target.value)} />
            </Field>

            {/* ── Pricing ── */}
            <div className="msec">Pricing</div>
            <div className="fcols3">
              <Field label="Original Price (₹)" required>
                <input className="finp" type="number" min="0" placeholder="5000"
                  value={form.price.original} onChange={e => setPrice("original", e.target.value)} />
              </Field>
              <Field label="Discounted Price (₹)" hint="Optional">
                <input className="finp" type="number" min="0" placeholder="3999"
                  value={form.price.discounted} onChange={e => setPrice("discounted", e.target.value)} />
              </Field>
              <Field label="EMI / Month (₹)" hint="Optional">
                <input className="finp" type="number" min="0" placeholder="999"
                  value={form.price.emi} onChange={e => setPrice("emi", e.target.value)} />
              </Field>
            </div>
            <Field label="What's Included" hint="Comma-separated — e.g. Certificate, Study Material, Lunch">
              <input className="finp"
                placeholder="Certificate, Study Material, Lunch, Recording Access"
                value={form.price.includes} onChange={e => setPrice("includes", e.target.value)} />
            </Field>

            {/* ── Learning Details ── */}
            <div className="msec">Learning Details</div>
            <Field label="Learning Outcomes / What You'll Learn" hint="Comma-separated — what participants can do after this workshop.">
              <textarea className="fta" rows={2}
                placeholder="Develop executive presence, Lead cross-functional teams…"
                value={form.learningOutcomes} onChange={e => set("learningOutcomes", e.target.value)} style={{ minHeight:70 }} />
            </Field>
            <Field label="Topics Covered" hint="Comma-separated — shown as topic pills on the detail page.">
              <input className="finp"
                placeholder="Leadership, Communication, Conflict Resolution, Negotiation"
                value={form.topics} onChange={e => set("topics", e.target.value)} />
            </Field>
            <Field label="Prerequisites" hint="Comma-separated.">
              <input className="finp"
                placeholder="Basic management experience, Laptop with internet"
                value={form.prerequisites} onChange={e => set("prerequisites", e.target.value)} />
            </Field>

            {/* ── Classification ── */}
            <div className="msec">Classification</div>
            <div className="fcols">
              <Field label="Competency">
                <input className="finp" placeholder="e.g. Strategic Thinking"
                  value={form.competency} onChange={e => set("competency", e.target.value)} />
              </Field>
              <Field label="Industry">
                <input className="finp" placeholder="e.g. BFSI, Healthcare, IT"
                  value={form.industry} onChange={e => set("industry", e.target.value)} />
              </Field>
            </div>
            <Field label="Tags" hint="Comma-separated keywords for discovery.">
              <input className="finp" placeholder="leadership, communication, soft-skills"
                value={form.tags} onChange={e => set("tags", e.target.value)} />
            </Field>
            {/* <Field label="Your Certifications" hint="Comma-separated — shown on the workshop detail page.">
              <input className="finp" placeholder="ICF Certified Coach, PMP, SHRM-SCP"
                value={form.certifications} onChange={e => set("certifications", e.target.value)} />
            </Field> */}

            {/* ── How It's Conducted ── */}
            <div className="msec">How It's Conducted</div>
            <div className="ctype-grid">
              {CLASS_TYPES.map(({ key, label, Icon }) => {
                const selected = form.classTypes.find(ct => ct.type === key);
                return (
                  <div key={key} className={`ctype-item${selected ? " sel" : ""}`}>
                    <div className="ctype-hd" onClick={() => toggleClassType(key)}>
                      <Icon size={15} color={selected ? "var(--blue)" : "var(--light)"} />
                      <span className="ctype-lbl">{label}</span>
                    </div>
                    {selected && (
                      <input type="number" min="1" placeholder="No. of sessions"
                        className="ctype-inp"
                        value={selected.count}
                        onChange={e => updateClassTypeCount(key, e.target.value)}
                        onClick={e => e.stopPropagation()} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* ── Session Snapshots ── */}
            <div className="msec">
              Session Snapshots
              <span style={{ fontWeight:400, textTransform:"none", letterSpacing:0, fontSize:".69rem" }}>(up to 4)</span>
            </div>
            <div className="gallery-grid">
              {form.photos.map((p, idx) => (
                <div key={idx} className="gal-item">
                  <div className="gal-img-wrap">
                    <img src={p.src} alt={p.label || `photo ${idx+1}`} className="gal-img" />
                    <button className="gal-rm" onClick={() => removePhoto(idx)}><X size={10} /></button>
                  </div>
                  <input type="text" placeholder="Caption (optional)" className="gal-cap"
                    value={p.label} onChange={e => updatePhotoLabel(idx, e.target.value)} />
                </div>
              ))}
              {form.photos.length < 4 && (
                <div className="gal-add" onClick={() => !uploadingPhoto && photoRef.current?.click()}>
                  {uploadingPhoto
                    ? <Loader2 size={20} className="spin" style={{ color:"var(--blue)" }} />
                    : <><Upload size={20} /><span>Add Photo</span></>
                  }
                </div>
              )}
            </div>
            <input ref={photoRef} type="file" accept="image/*" style={{ display:"none" }} onChange={handlePhotoUpload} />

            {/* ── Visibility ── */}
            <div className="msec">Visibility</div>
            <div className="chk-row">
              {[
                { key: "isLive",     label: "Mark as Live"             },
                { key: "isFeatured", label: "Request Featured Listing" },
              ].map(({ key, label }) => (
                <label key={key} className="chk-label">
                  <input type="checkbox" checked={form[key]} onChange={e => set(key, e.target.checked)} />
                  {label}
                </label>
              ))}
            </div>

          </div>{/* end mbody */}

          {/* Footer */}
          <div className="mftr">
            <button className="btn-cancel" onClick={onClose}>Cancel</button>
            <div className="ftr-right">
              <button className="btn-draft" onClick={() => handleSubmit("draft")} disabled={saving}>
                {saving && <Loader2 size={13} className="spin" />} Save as Draft
              </button>
              <button className="btn-publish" onClick={() => handleSubmit("published")} disabled={saving}>
                {saving && <Loader2 size={13} className="spin" />}
                {isEdit ? "Update & Publish" : "Publish Workshop"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}