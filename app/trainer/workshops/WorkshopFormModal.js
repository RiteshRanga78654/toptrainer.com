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

// Backend conductedMode.conductedAs enum is ["Live Online","Offline","Recorded"].
// There's no backend equivalent for the "workshop" class-type option below —
// it's kept in the picker for UI completeness but simply isn't sent on save.
const CLASS_TYPE_TO_BACKEND = { live: "Live Online", offline: "Offline", recorded: "Recorded" };

// Backend schedule.deliveryMode enum is ["Online","Offline","Hybrid","In-Person"].
const MODE_TO_DELIVERY = { online: "Online", offline: "Offline", hybrid: "Hybrid" };
const DELIVERY_TO_MODE = { Online: "online", Offline: "offline", Hybrid: "hybrid", "In-Person": "offline" };

// ─── Helpers ──────────────────────────────────────────────────────────────────
const csv = str => (str || "").split(",").map(s => s.trim()).filter(Boolean);
const toDateInput = (d) => (d ? new Date(d).toISOString().slice(0, 10) : "");

function emptyForm() {
  return {
    title:"", category:"", mode:"online", trainer:"",
    shortDesc:"", fullDesc:"", targetAudience:"",
    coverImg:"", coverImgFile:null,          // coverImg = preview URL (blob or existing), coverImgFile = raw File to upload
    photos: [],                   // [{ src, file, label }]
    startDate:"", endDate:"",     // backend requires both — no UI field existed for these before
    dateRange:"", timeSlot:"", location:"",
    duration:{ value:"", unit:"hours" },
    seats:"", maxParticipants:"",
    price:{ original:"", discounted:"", emi:"", currency:"INR", includes:"" },
    learningOutcomes:"",
    prerequisites:"",
    topics:"",
    competency:"", industry:"", tags:"",
    certifications:"",
    classTypes:[],
    isLive:false, isFeatured:false, status:"draft",
  };
}

// `w` here is the FLATTENED shape produced by mapWorkshopFromBackend() in
// page.js (not the raw nested backend doc), so most fields line up directly.
function workshopToForm(w) {
  const dur = w.duration
    ? (typeof w.duration === "object"
        ? { value: String(w.duration.value ?? ""), unit: w.duration.unit || "hours" }
        : (() => { const [v,...r] = String(w.duration).split(" "); return { value:v, unit:r.join(" ")||"hours" }; })())
    : { value:"", unit:"hours" };

  return {
    title:          w.title          || "",
    category:       w.category       || "",
    mode:           DELIVERY_TO_MODE[w.mode] || w.mode || "online",
    trainer:        w.trainer?._id   || w.trainer || "",
    shortDesc:      w.shortDesc      || "",
    fullDesc:       w.fullDesc       || "",
    targetAudience: w.targetAudience || "",
    coverImg:       w.coverImg       || "",
    coverImgFile:   null, // no re-upload unless the trainer picks a new file
    photos:         (w.photos || w.gallery || []).map(p => ({ src: p.src || p.url || "", file: null, label: p.label || "" })),
    startDate:      toDateInput(w.startDate),
    endDate:        toDateInput(w.endDate),
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
    classTypes:       (w.classTypes || []).map(ct => ({
                        type: Object.keys(CLASS_TYPE_TO_BACKEND).find(k => CLASS_TYPE_TO_BACKEND[k] === ct.type) || ct.type,
                        count: ct.count ?? "",
                      })),
    isLive:           w.isLive            || false,
    isFeatured:       w.isFeatured        || false,
    status:           w.status            || "draft",
  };
}

/**
 * buildFormData — converts form state into the multipart/form-data body the
 * real backend expects: nested objects (basicInformation/schedule/pricing/
 * learningDetails/classification/conductedMode) as JSON strings, plus actual
 * File objects for coverImage/thumbnail/snapshots. The backend requires BOTH
 * a coverImage and a thumbnail on basicInformation — this form only collects
 * one image, so the same file is sent for both.
 */
function buildFormData(f, status) {
  const fd = new FormData();

  fd.append("basicInformation", JSON.stringify({
    title: f.title.trim(),
    category: f.category,
    shortDescription: f.shortDesc.trim(),
    fullDescription: f.fullDesc.trim(),
    targetAudience: f.targetAudience.trim(),
  }));

  fd.append("schedule", JSON.stringify({
    startDate: f.startDate,
    endDate: f.endDate,
    dateRange: f.dateRange.trim(),
    timeSlot: f.timeSlot.trim(),
    duration: Number(f.duration.value) || 1,
    location: f.location.trim(),
    deliveryMode: MODE_TO_DELIVERY[f.mode] || "Online",
    maxCapacity: Number(f.seats) || 30,
  }));

  fd.append("pricing", JSON.stringify({
    originalPrice: Number(f.price.original) || 0,
    discountedPrice: f.price.discounted ? Number(f.price.discounted) : 0,
    emiPerMonth: f.price.emi ? Number(f.price.emi) : 0,
    price: Number(f.price.original) || 0,
  }));

  fd.append("learningDetails", JSON.stringify({
    learningOutcomes: csv(f.learningOutcomes),
    topicsCovered: csv(f.topics),
    prerequisites: csv(f.prerequisites),
    includedItems: csv(f.price.includes),
  }));

  fd.append("classification", JSON.stringify({
    competency: f.competency.trim(),
    industry: f.industry.trim(),
    tags: csv(f.tags),
  }));

  const conductedAs = f.classTypes.map(ct => CLASS_TYPE_TO_BACKEND[ct.type]).filter(Boolean);
  fd.append("conductedMode", JSON.stringify({ conductedAs }));

  fd.append("status", status);
  if (f.trainer) fd.append("assignedTrainer", f.trainer);

  if (f.coverImgFile) {
    fd.append("coverImage", f.coverImgFile);
    fd.append("thumbnail", f.coverImgFile); // backend requires both — reuse the same image
  }
  f.photos.forEach(p => { if (p.file) fd.append("snapshots", p.file); });

  return fd;
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
export default function WorkshopFormModal({ workshop, onSave, onClose, trainers }) {
  const isEdit = Boolean(workshop?._id);

  const [form,   setForm]   = useState(() => workshop ? workshopToForm(workshop) : emptyForm());
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState("");

  const coverRef = useRef();
  const photoRef = useRef();

  const set      = useCallback((k, v) => setForm(p => ({ ...p, [k]: v })), []);
  const setPrice = useCallback((k, v) => setForm(p => ({ ...p, price:    { ...p.price,    [k]: v } })), []);
  const setDur   = useCallback((k, v) => setForm(p => ({ ...p, duration: { ...p.duration, [k]: v } })), []);

  // ── cover: just take the file, no upload until Save (backend uploads to Cloudinary itself) ──
  function handleCoverUpload(e) {
    const file = e.target.files?.[0]; if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Please select a valid image file."); return; }
    setForm(p => ({ ...p, coverImg: URL.createObjectURL(file), coverImgFile: file }));
    setError("");
    e.target.value = "";
  }

  // ── session snapshot: same — local preview only, real upload happens on Save ──
  function handlePhotoUpload(e) {
    const file = e.target.files?.[0]; if (!file || form.photos.length >= 4) return;
    if (!file.type.startsWith("image/")) { setError("Please select a valid image file."); return; }
    setForm(p => ({ ...p, photos: [...p.photos, { src: URL.createObjectURL(file), file, label: "" }] }));
    e.target.value = "";
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
    if (!form.startDate)        { setError("Start date is required.");        return; }
    if (!form.endDate)          { setError("End date is required.");          return; }
    if (!form.duration.value)   { setError("Duration is required.");          return; }
    if (!form.price.original)   { setError("Original price is required.");    return; }
    if (!form.coverImg)         { setError("Cover image is required.");       return; }
    setSaving(true);
    try   { await onSave(buildFormData(form, status), workshop?._id); }
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
                ) : (
                  <div className="cov-ph"><ImageIcon size={24} /><span>Upload Cover</span></div>
                )}
              </div>
              <div className="cov-info">
                <p className="cov-title">Workshop cover photo</p>
                <p>Recommended: 1280×720 px (16:9)</p>
                <p style={{ fontSize:".72rem", marginTop:4 }}>Shown on your workshop card across TopTrainer. Also used as the thumbnail.</p>
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
              <textarea className="fta" rows={2} maxLength={150}
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

            {trainers && trainers.length > 0 && (
              <Field label="Assigned Trainer">
                <select className="fsel" value={form.trainer} onChange={e => set("trainer", e.target.value)}>
                  <option value="">— Select Trainer (optional) —</option>
                  {trainers.map((t) => (
                    <option key={t._id} value={t._id}>
                      {t.name} {t.email ? `(${t.email})` : ''}
                    </option>
                  ))}
                </select>
              </Field>
            )}

            {/* ── Schedule & Venue ── */}
            <div className="msec">Schedule &amp; Venue</div>
            <div className="fcols">
              <Field label="Start Date" required>
                <input className="finp" type="date"
                  value={form.startDate} onChange={e => set("startDate", e.target.value)} />
              </Field>
              <Field label="End Date" required>
                <input className="finp" type="date"
                  value={form.endDate} onChange={e => set("endDate", e.target.value)} />
              </Field>
            </div>

            <div className="fcols">
              <Field label="Date Range" hint="Display text — e.g. 15 Jul – 17 Jul 2025">
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
                <div className="gal-add" onClick={() => photoRef.current?.click()}>
                  <Upload size={20} /><span>Add Photo</span>
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
