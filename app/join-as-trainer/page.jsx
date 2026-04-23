"use client";
import Image from "next/image";
import { useState } from "react";
import {
  UserPlus, Sparkles, Target, TrendingUp, Users,
  Mail, Phone, Globe, Linkedin, Youtube, Instagram,
  Facebook, MapPin, Briefcase, Award, BookOpen,
  DollarSign, Plane, Languages, Star,
  Upload, FileText, CheckCircle, Building2, Camera, ChevronDown
} from "lucide-react";
const LOCATION_DATA = {
  India: {
    Maharashtra: ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Thane"],
    Delhi: ["New Delhi", "Dwarka", "Rohini", "Saket", "Vasant Kunj", "Karol Bagh"],
    Karnataka: ["Bengaluru", "Mysuru", "Mangaluru", "Hubli", "Belagavi", "Tumkur"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar"],
    Rajasthan: ["Jaipur", "Jodhpur", "Udaipur", "Kota", "Bikaner", "Ajmer"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Prayagraj", "Meerut", "Noida", "Ghaziabad"],
    "West Bengal": ["Kolkata", "Howrah", "Asansol", "Siliguri", "Durgapur"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad", "Karimnagar"],
    Punjab: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar", "Patiala"],
    Haryana: ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal"],
    Kerala: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam"],
    "Madhya Pradesh": ["Bhopal", "Indore", "Jabalpur", "Gwalior", "Ujjain"],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur"],
    Odisha: ["Bhubaneswar", "Cuttack", "Rourkela", "Brahmapur"],
    Goa: ["Panaji", "Margao", "Vasco da Gama", "Mapusa"],
  },
  "United States": {
    California: ["Los Angeles", "San Francisco", "San Diego", "San Jose", "Sacramento", "Fresno"],
    "New York": ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse"],
    Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth", "El Paso"],
    Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg"],
    Illinois: ["Chicago", "Aurora", "Naperville", "Rockford", "Springfield"],
    Washington: ["Seattle", "Spokane", "Tacoma", "Bellevue", "Olympia"],
    Georgia: ["Atlanta", "Columbus", "Savannah", "Augusta", "Macon"],
    Massachusetts: ["Boston", "Worcester", "Springfield", "Cambridge", "Lowell"],
    "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
    Arizona: ["Phoenix", "Tucson", "Mesa", "Chandler", "Scottsdale"],
  },
  "United Kingdom": {
    England: ["London", "Manchester", "Birmingham", "Leeds", "Liverpool", "Bristol", "Sheffield", "Newcastle"],
    Scotland: ["Edinburgh", "Glasgow", "Aberdeen", "Dundee", "Inverness"],
    Wales: ["Cardiff", "Swansea", "Newport", "Bangor", "St Davids"],
    "Northern Ireland": ["Belfast", "Derry", "Armagh", "Lisburn", "Newry"],
  },
  Australia: {
    "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Albury"],
    Victoria: ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton"],
    Queensland: ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville", "Cairns"],
    "Western Australia": ["Perth", "Bunbury", "Geraldton", "Albany", "Kalgoorlie"],
    "South Australia": ["Adelaide", "Mount Gambier", "Whyalla", "Port Augusta"],
  },
  Canada: {
    Ontario: ["Toronto", "Ottawa", "Mississauga", "Brampton", "Hamilton", "London"],
    "British Columbia": ["Vancouver", "Surrey", "Burnaby", "Richmond", "Kelowna"],
    Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau", "Longueuil"],
    Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "Medicine Hat"],
    Manitoba: ["Winnipeg", "Brandon", "Steinbach", "Thompson"],
  },
  "United Arab Emirates": {
    Dubai: ["Dubai City", "Deira", "Bur Dubai", "Jumeirah", "Business Bay"],
    "Abu Dhabi": ["Abu Dhabi City", "Al Ain", "Khalifa City", "Mohammed Bin Zayed City"],
    Sharjah: ["Sharjah City", "Khor Fakkan", "Dibba Al Hisn"],
    Ajman: ["Ajman City"],
    Ras: ["Ras Al Khaimah City", "Al Jazeera Al Hamra"],
  },
  Singapore: {
    "Central Region": ["Downtown Core", "Marina Bay", "Orchard", "Buona Vista", "Clementi"],
    "East Region": ["Tampines", "Pasir Ris", "Bedok", "Changi"],
    "North Region": ["Woodlands", "Yishun", "Sembawang"],
    "West Region": ["Jurong", "Bukit Batok", "Choa Chu Kang", "Tuas"],
    "North-East Region": ["Ang Mo Kio", "Hougang", "Punggol", "Sengkang"],
  },
};

const COUNTRIES = Object.keys(LOCATION_DATA).sort();

/* ─── STYLES ─────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .tt-wrap { display:flex; height:100vh; width:100%; font-family:'Inter',sans-serif; background:#eef2ff; }

  /* ══ SIDEBAR ══ */
  .tt-sidebar {
    width:290px; min-width:290px; height:100vh; position:fixed; top:0; left:0;
    background:linear-gradient(160deg,#1d4ed8 0%,#1e3a8a 55%,#312e81 100%);
    display:flex; flex-direction:column; padding:26px 22px; overflow:hidden; z-index:50;
  }
  .tt-sidebar::before { content:''; position:absolute; top:-70px; right:-60px; width:210px; height:210px; border-radius:50%; background:rgba(255,255,255,0.06); animation:orbFloat 7s ease-in-out infinite; }
  .tt-sidebar::after  { content:''; position:absolute; bottom:30px; left:-55px; width:170px; height:170px; border-radius:50%; background:rgba(99,102,241,0.16); animation:orbFloat 9s ease-in-out infinite reverse; }
  @keyframes orbFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-16px) scale(1.05)} }

  .sb-logo { display:flex; align-items:center; gap:9px; margin-bottom:20px; position:relative; z-index:2; }
  .sb-logo-icon { background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.2); border-radius:10px; padding:6px; display:flex; }
  .sb-logo-text { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:1.22rem; color:#fff; letter-spacing:-0.3px; }
  .sb-logo-text span { color:#93c5fd; }
  .sb-badge { display:inline-flex; align-items:center; gap:5px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18); padding:4px 11px; border-radius:999px; font-size:0.62rem; font-weight:700; letter-spacing:1.3px; color:#bfdbfe; margin-bottom:14px; position:relative; z-index:2; animation:fadeUp .5s ease both; }
  .sb-heading { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:1.48rem; line-height:1.27; letter-spacing:-0.3px; color:#fff; margin-bottom:9px; position:relative; z-index:2; animation:fadeUp .55s ease .1s both; }
  .sb-heading span { color:#bfdbfe; }
  .sb-desc { font-size:0.76rem; color:rgba(191,219,254,0.8); line-height:1.65; margin-bottom:20px; position:relative; z-index:2; animation:fadeUp .55s ease .2s both; }
  .sb-features { display:flex; flex-direction:column; gap:13px; position:relative; z-index:2; flex:1; }
  .sb-feat { display:flex; gap:10px; align-items:flex-start; transition:transform .2s; animation:fadeUp .55s ease both; }
  .sb-feat:hover { transform:translateX(5px); }
  .sb-feat-icon { min-width:33px; height:33px; border-radius:9px; background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.13); display:flex; align-items:center; justify-content:center; }
  .sb-feat-title { font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:0.8rem; color:#fff; margin-bottom:2px; }
  .sb-feat-desc { font-size:0.7rem; color:rgba(191,219,254,0.78); line-height:1.44; }
  .sb-bottom { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.13); border-radius:12px; padding:12px 13px; display:flex; align-items:center; gap:10px; position:relative; z-index:2; margin-top:14px; animation:fadeUp .55s ease .5s both; }
  .sb-bottom-icon { background:rgba(255,255,255,0.12); border-radius:9px; padding:6px; display:flex; }
  .sb-bottom-title { font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:0.8rem; color:#fff; }
  .sb-bottom-sub { font-size:0.68rem; color:rgba(191,219,254,0.74); margin-top:1px; }

  @keyframes fadeUp { from{opacity:0;transform:translateY(13px)} to{opacity:1;transform:translateY(0)} }

  /* ══ MAIN ══ */
  .tt-main { margin-left:290px; width:calc(100% - 290px); height:100vh; overflow-y:auto; background:#eef2ff; padding:32px 38px 60px; }
  .tt-main::-webkit-scrollbar { width:5px; }
  .tt-main::-webkit-scrollbar-thumb { background:#c7d2fe; border-radius:99px; }

  /* ══ HEADER ══ */
  .form-header-inner { display:flex; align-items:center; gap:14px; background:linear-gradient(135deg,#1d4ed8,#4338ca); padding:18px 22px; border-radius:16px; box-shadow:0 6px 26px rgba(29,78,216,0.28); margin-bottom:20px; }
  .form-header-icon { background:rgba(255,255,255,0.14); border-radius:11px; padding:9px; display:flex; }
  .form-header-title { font-family:'Plus Jakarta Sans',sans-serif; font-weight:800; font-size:1.42rem; color:#fff; letter-spacing:-0.3px; }
  .form-header-sub { font-size:0.76rem; color:rgba(191,219,254,0.85); margin-top:2px; }

  /* ══ PIC CARD ══ */
  .pic-card { background:linear-gradient(135deg,#eff6ff,#eef2ff); border:1.5px dashed #93c5fd; border-radius:15px; padding:18px; display:flex; align-items:center; gap:16px; margin-bottom:16px; transition:border-color .2s; }
  .pic-card:hover { border-color:#3b82f6; }
  .pic-preview { width:76px; height:76px; min-width:76px; border-radius:13px; border:2.5px solid #bfdbfe; background:#dbeafe; display:flex; align-items:center; justify-content:center; overflow:hidden; box-shadow:0 4px 13px rgba(29,78,216,0.16); transition:transform .2s; }
  .pic-preview:hover { transform:scale(1.04); }
  .pic-info-title { font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:0.86rem; color:#1e3a8a; }
  .pic-info-sub { font-size:0.7rem; color:#94a3b8; margin-top:3px; }
  .choose-btn { display:inline-flex; align-items:center; gap:5px; margin-top:7px; padding:6px 13px; background:#fff; color:#1d4ed8; border:1.5px solid #1d4ed8; border-radius:8px; font-size:0.72rem; font-weight:700; font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; transition:all .2s; }
  .choose-btn:hover { background:#1d4ed8; color:#fff; transform:translateY(-1px); box-shadow:0 4px 13px rgba(29,78,216,0.26); }
  .pic-name-fields { flex:1; min-width:0; display:grid; grid-template-columns:1fr 1fr; gap:13px 16px; }

  /* ══ SECTION CARD ══ */
  .sec-card {
    background:#fff; border-radius:15px; border:1px solid #e8eeff;
    position:relative;  overflow:visible;
    box-shadow:0 2px 10px rgba(29,78,216,0.055); padding:20px 22px; margin-bottom:15px; animation:cardIn .4s ease both;
  }
  @keyframes cardIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  .sec-header { display:flex; align-items:center; gap:10px; margin-bottom:18px; padding-bottom:13px; border-bottom:1.5px solid #eef2ff; }
  .sec-icon-wrap { width:34px; height:34px; border-radius:9px; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#dbeafe,#e0e7ff); color:#1d4ed8; }
  .sec-title { font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:0.89rem; color:#1e3a8a; letter-spacing:-0.1px; }
  .sec-sub { font-size:0.7rem; color:#94a3b8; margin-top:1px; }

  /* ══ GRIDS ══ */
  .field-grid { display:grid; grid-template-columns:1fr 1fr; gap:13px 16px; }
  .col-2 { grid-column:1/-1; }
  .col-3 { display:grid; grid-template-columns:1fr 1fr 1fr; gap:13px 16px; grid-column:1/-1; }

  /* ══ FIELD ══ */
  .tt-field { display:flex; flex-direction:column; gap:4px; }
  .tt-label { font-family:'Plus Jakarta Sans',sans-serif; font-weight:600; font-size:0.7rem; color:#374151; letter-spacing:0.25px; display:flex; align-items:center; gap:4px; }
  .tt-label-icon { color:#6366f1; display:flex; }
  .tt-input-wrap { position:relative; }
  .tt-input-icon { position:absolute; left:10px; top:50%; transform:translateY(-50%); color:#94a3b8; pointer-events:none; display:flex; }
  .tt-input { width:100%; background:#f8faff; border:1.5px solid #e2e8f0; border-radius:9px; padding:9px 11px 9px 34px; font-size:0.81rem; color:#1e293b; font-family:'Inter',sans-serif; transition:border-color .2s,box-shadow .2s,background .2s; outline:none; appearance:none; }
  .tt-input.no-icon { padding-left:11px; }
  .tt-input:focus { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.13); background:#fff; }
  .tt-input:hover:not(:focus) { border-color:#a5b4fc; background:#fff; }
  textarea.tt-input { height:92px; resize:none; }
  select.tt-input { background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 10px center; cursor:pointer; padding-right:26px; }

  /* ══ MULTI-SELECT ══ */
  .ms-wrapper { position:relative; }
  .ms-trigger { width:100%; background:#f8faff; border:1.5px solid #e2e8f0; border-radius:9px; padding:9px 36px 9px 34px; font-size:0.81rem; color:#1e293b; font-family:'Inter',sans-serif; cursor:pointer; display:flex; align-items:center; justify-content:space-between; transition:border-color .2s,box-shadow .2s,background .2s; user-select:none; }
  .ms-trigger:hover { border-color:#a5b4fc; background:#fff; }
  .ms-trigger.open { border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.13); background:#fff; }
  .ms-trigger-text { flex:1; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
  .ms-trigger-placeholder { color:#94a3b8; }
  .ms-trigger-arrow { color:#94a3b8; transition:transform .2s; flex-shrink:0; }
  .ms-trigger-arrow.open { transform:rotate(180deg); }
  .ms-dropdown {
    position:absolute; top:calc(100% + 5px); left:0; right:0;
    z-index:9999;
    background:#fff; border:1.5px solid #e2e8f0; border-radius:10px;
    box-shadow:0 8px 28px rgba(29,78,216,0.18); max-height:220px; overflow-y:auto; animation:dropIn .15s ease;
  }
  @keyframes dropIn { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
  .ms-dropdown::-webkit-scrollbar { width:4px; }
  .ms-dropdown::-webkit-scrollbar-thumb { background:#c7d2fe; border-radius:99px; }
  .ms-option { display:flex; align-items:center; gap:9px; padding:8px 13px; cursor:pointer; font-size:0.79rem; color:#374151; transition:background .15s; font-family:'Inter',sans-serif; }
  .ms-option:hover { background:#eff6ff; }
  .ms-option.selected { background:#eff6ff; color:#1d4ed8; }
  .ms-checkbox { width:15px; height:15px; min-width:15px; border-radius:4px; border:1.5px solid #c7d2fe; background:#fff; display:flex; align-items:center; justify-content:center; transition:all .15s; }
  .ms-checkbox.checked { background:#1d4ed8; border-color:#1d4ed8; }
  .ms-tags { display:flex; flex-wrap:wrap; gap:4px; margin-top:6px; }
  .ms-tag { display:inline-flex; align-items:center; gap:4px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:2px 8px; font-size:0.66rem; color:#1d4ed8; font-weight:600; font-family:'Plus Jakarta Sans',sans-serif; }
  .ms-tag-x { cursor:pointer; font-size:0.75rem; line-height:1; color:#93c5fd; transition:color .15s; }
  .ms-tag-x:hover { color:#1d4ed8; }

  /* ══ UPLOAD ══ */
  .upload-zone { border:1.5px dashed #93c5fd; border-radius:10px; background:#f8faff; padding:15px; text-align:center; cursor:pointer; transition:all .2s; position:relative; overflow:hidden; }
  .upload-zone:hover { border-color:#3b82f6; background:#eff6ff; }
  .upload-zone input[type=file] { position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%; }
  .upload-zone-icon { width:36px; height:36px; border-radius:9px; background:linear-gradient(135deg,#dbeafe,#e0e7ff); display:flex; align-items:center; justify-content:center; margin:0 auto 7px; color:#1d4ed8; }
  .upload-zone-title { font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:0.76rem; color:#1e3a8a; margin-bottom:2px; }
  .upload-zone-sub { font-size:0.65rem; color:#94a3b8; }
  .file-chip { display:inline-flex; align-items:center; gap:4px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px; padding:3px 8px; font-size:0.68rem; color:#1d4ed8; font-weight:500; margin-top:5px; margin-right:4px; }

  /* ══ WORKSHOP PHOTO THUMBS ══ */
  .photo-previews { display:flex; flex-wrap:wrap; gap:8px; margin-top:8px; }
  .photo-thumb { width:64px; height:64px; border-radius:8px; object-fit:cover; border:2px solid #bfdbfe; box-shadow:0 2px 8px rgba(29,78,216,0.12); }

  /* ══ SUBMIT ══ */
  .submit-wrap { display:flex; justify-content:center; padding-top:6px; }
  .submit-btn { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#1d4ed8,#4f46e5); color:#fff; padding:13px 34px; border-radius:12px; font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:0.92rem; letter-spacing:0.2px; border:none; cursor:pointer; position:relative; overflow:hidden; box-shadow:0 6px 22px rgba(29,78,216,0.35); transition:all .25s ease; }
  .submit-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,#2563eb,#6366f1); opacity:0; transition:opacity .25s; }
  .submit-btn:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(29,78,216,0.42); }
  .submit-btn:hover::before { opacity:1; }
  .submit-btn span { position:relative; z-index:1; display:flex; align-items:center; gap:7px; }

  /* ══ RESPONSIVE ══ */
  @media(max-width:900px){
    .tt-sidebar { position:relative; width:100%; min-width:unset; height:auto; }
    .tt-main { margin-left:0; width:100%; height:auto; overflow-y:unset; padding:22px 16px 52px; }
    .tt-wrap { flex-direction:column; height:auto; overflow:unset; }
    .field-grid { grid-template-columns:1fr; }
    .col-2 { grid-column:1/-1; }
    .col-3 { grid-template-columns:1fr; }
    .pic-name-fields { grid-template-columns:1fr; }
  }
  @media(max-width:600px){
    .pic-card { flex-direction:column; align-items:flex-start; }
    .form-header-title { font-size:1.15rem; }
  }
`;

/* ─── MULTI-SELECT CHECKBOX COMPONENT ───────────────── */
function MultiSelect({ label, icon, options }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);

  const toggle = (opt) =>
    setSelected(prev => prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]);

  const remove = (opt, e) => {
    e.stopPropagation();
    setSelected(prev => prev.filter(o => o !== opt));
  };

  const displayText = selected.length === 0 ? null
    : selected.length <= 2 ? selected.join(", ")
    : `${selected.slice(0, 2).join(", ")} +${selected.length - 2} more`;

  return (
    <div className="tt-field" style={{ position: "relative", zIndex: open ? 100 : "auto" }}>
      <label className="tt-label">
        {icon && <span className="tt-label-icon">{icon}</span>}
        {label}
      </label>
      <div className="ms-wrapper">
        <div className="tt-input-icon" style={{ zIndex: 1 }}>{icon}</div>
        <div className={`ms-trigger ${open ? "open" : ""}`} onClick={() => setOpen(o => !o)}>
          <span className={`ms-trigger-text ${!displayText ? "ms-trigger-placeholder" : ""}`}>
            {displayText || "Select options"}
          </span>
          <ChevronDown size={13} className={`ms-trigger-arrow ${open ? "open" : ""}`} />
        </div>
        {open && (
          <>
            <div style={{ position: "fixed", inset: 0, zIndex: 9998 }} onClick={() => setOpen(false)} />
            <div className="ms-dropdown">
              {options.map((opt, i) => (
                <div key={i} className={`ms-option ${selected.includes(opt) ? "selected" : ""}`} onClick={() => toggle(opt)}>
                  <div className={`ms-checkbox ${selected.includes(opt) ? "checked" : ""}`}>
                    {selected.includes(opt) && (
                      <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                        <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  {opt}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      {selected.length > 0 && (
        <div className="ms-tags">
          {selected.map((opt, i) => (
            <span className="ms-tag" key={i}>
              {opt}
              <span className="ms-tag-x" onClick={(e) => remove(opt, e)}>✕</span>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── MAIN COMPONENT ─────────────────────────────────── */
export default function JoinTrainee() {
  const [profilePic, setProfilePic]           = useState(null);
  const [cvFiles, setCvFiles]                 = useState([]);
  const [certFiles, setCertFiles]             = useState([]);
  const [workshopPhotos, setWorkshopPhotos]   = useState([]);
  const [workshopPhotoURLs, setWorkshopPhotoURLs] = useState([]);

  const handleProfilePic = (e) => {
    const f = e.target.files[0];
    if (f) setProfilePic(URL.createObjectURL(f));
  };

  const handleWorkshopPhotos = (e) => {
    const files = Array.from(e.target.files || []);
    setWorkshopPhotos(files);
    setWorkshopPhotoURLs(files.map(f => URL.createObjectURL(f)));
  };

  function LocationSelects() {
    const [country, setCountry] = useState("");
    const [state, setState] = useState("");
    const [city, setCity] = useState("");

    const states = country ? Object.keys(LOCATION_DATA[country] || {}).sort() : [];
    const cities = (country && state) ? (LOCATION_DATA[country]?.[state] || []).sort() : [];

    const handleCountry = (e) => {
      setCountry(e.target.value);
      setState("");
      setCity("");
    };

    const handleState = (e) => {
      setState(e.target.value);
      setCity("");
    };

    return (
      <div className="col-3">
        <div className="tt-field">
          <label className="tt-label">
            <span className="tt-label-icon"><MapPin size={11} /></span>Country
          </label>
          <div className="tt-input-wrap">
            <div className="tt-input-icon"><MapPin size={13} /></div>
            <select className="tt-input" value={country} onChange={handleCountry}>
              <option value="">Select Country</option>
              {COUNTRIES.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="tt-field">
          <label className="tt-label">
            <span className="tt-label-icon"><MapPin size={11} /></span>State / Province
          </label>
          <div className="tt-input-wrap">
            <div className="tt-input-icon"><MapPin size={13} /></div>
            <select className="tt-input" value={state} onChange={handleState} disabled={!country}>
              <option value="">{country ? "Select State" : "Select Country first"}</option>
              {states.map((s, i) => <option key={i} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        <div className="tt-field">
          <label className="tt-label">
            <span className="tt-label-icon"><MapPin size={11} /></span>City
          </label>
          <div className="tt-input-wrap">
            <div className="tt-input-icon"><MapPin size={13} /></div>
            <select className="tt-input" value={city} onChange={(e) => setCity(e.target.value)} disabled={!state}>
              <option value="">{state ? "Select City" : "Select State first"}</option>
              {cities.map((c, i) => <option key={i} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="tt-wrap">

        {/* ══ SIDEBAR ══ */}
        <aside className="tt-sidebar">
          <div className="sb-logo">
            <div className="sb-logo-icon"><Sparkles size={17} /></div>
            <span className="sb-logo-text">Top<span>Trainer</span></span>
          </div>
          <div className="sb-badge"><UserPlus size={11} /> JOIN AS A TRAINER</div>
          <h2 className="sb-heading">
            Build Your Profile.<br />Share Your Expertise.<br />
            <span>Grow Your Impact.</span>
          </h2>
          <p className="sb-desc">
            TopTrainer connects you with organizations and individuals looking for professional guidance and training.
          </p>
          <div className="sb-features">
            {[
              { icon: <Sparkles size={14} />, title: "Showcase Your Expertise", desc: "Highlight your skills, experience and areas of training.", d: "0.3s" },
              { icon: <Target size={14} />,   title: "Reach The Right People",  desc: "Get discovered by clients searching for the right trainer.", d: "0.38s" },
              { icon: <TrendingUp size={14} />, title: "Grow Your Business",    desc: "Build your brand, expand your network and opportunities.", d: "0.46s" },
            ].map((f, i) => (
              <div className="sb-feat" key={i} style={{ animationDelay: f.d }}>
                <div className="sb-feat-icon">{f.icon}</div>
                <div>
                  <div className="sb-feat-title">{f.title}</div>
                  <div className="sb-feat-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="sb-bottom">
            <div className="sb-bottom-icon"><Users size={16} /></div>
            <div>
              <div className="sb-bottom-title">Empowering Trainers</div>
              <div className="sb-bottom-sub">To inspire growth everywhere</div>
            </div>
          </div>
        </aside>

        {/* ══ MAIN ══ */}
        <main className="tt-main">

          {/* Header */}
          <div className="form-header-inner">
            <div className="form-header-icon"><BookOpen size={21} /></div>
            <div>
              <div className="form-header-title">Trainer Profile</div>
              <div className="form-header-sub">Complete all sections to get discovered by top organizations</div>
            </div>
          </div>

          {/* Profile Pic + Name + Company */}
          <div className="pic-card">
            <div className="pic-preview">
              {profilePic
                ? <Image src={profilePic} alt="Profile" width={76} height={76} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                : <Users size={26} color="#93c5fd" />
              }
            </div>
            <div style={{ flexShrink: 0 }}>
              <div className="pic-info-title">Profile Photo</div>
              <div className="pic-info-sub">JPG, PNG or WEBP · Max 5MB</div>
              <input type="file" id="picUpload" accept="image/png,image/jpeg,image/webp" onChange={handleProfilePic} style={{ display: "none" }} />
              <label htmlFor="picUpload" className="choose-btn"><Upload size={12} /> Choose Photo</label>
            </div>
            <div className="pic-name-fields">
              <Field label="Full Name"    icon={<UserPlus size={13} />}  placeholder="Enter your full name" />
              <Field label="Company Name" icon={<Building2 size={13} />} placeholder="Enter your company / org name" />
            </div>
          </div>

          {/* 1 · Contact */}
          <Sec icon={<Mail size={16} />} title="Contact Details" sub="How clients will reach you">
            <div className="field-grid col-3">
              <Field label="Email Address"   icon={<Mail size={13} />}  placeholder="you@example.com" />
              <Field label="Mobile Number"   icon={<Phone size={13} />} placeholder="+91 9034565817" />
              <Field label="WhatsApp Number" icon={<Phone size={13} />} placeholder="+91 9034565817" />
              <LocationSelects />
            </div>
          </Sec>

          {/* 2 · Online Presence */}
          <Sec icon={<Globe size={16} />} title="Online Presence" sub="Your digital footprint across platforms">
            <div className="field-grid">
              <Field label="Website / Portfolio" icon={<Globe size={13} />}      placeholder="https://yourwebsite.com" />
              <Field label="LinkedIn Profile"    icon={<Linkedin size={13} />}   placeholder="https://linkedin.com/in/..." />
              <Field label="YouTube Channel"     icon={<Youtube size={13} />}    placeholder="https://youtube.com/@..." />
              <Field label="Instagram Handle"    icon={<Instagram size={13} />}  placeholder="https://instagram.com/..." />
              <Field label="Facebook Page"       icon={<Facebook size={13} />}   placeholder="https://facebook.com/..." />
            </div>
          </Sec>

          {/* 3 · Expertise & Domain */}
          <Sec icon={<Briefcase size={16} />} title="Expertise & Domain" sub="Select all that apply — multiple choices allowed">
            <div className="field-grid">
              <MultiSelect
                label="Industry & Sector Expertise"
                icon={<Briefcase size={13} />}
                options={["Real Estate","IT & Digital","Media & Entertainment","Banking & Finance","Telecommunications","Hospitality & Aviation","Healthcare & Pharma","Education Sector","Retail Industry","Automobile","Jewellery","FMCG","Other"]}
              />
              <MultiSelect
                label="Domain & Departmental Expertise"
                icon={<Target size={13} />}
                options={["Logistics & Operations","Soft Skills Development","Sales & Business Development","Leadership Transformation","International Market Expansion","Customer Service Excellence","Branding & Communications","Other"]}
              />
              <MultiSelect
                label="Competency Expertise"
                icon={<Star size={13} />}
                options={["AI Tools & Generative AI","Strategic Thinking","Communication & Narrative Building","Multitasking Ability","Team Building & Management","Innovation","Big Picture Thinking","Time Management","Other"]}
              />
              <Sel
                label="Trainer Type"
                icon={<UserPlus size={13} />}
                options={["Faculty / Professor","Business Consultant","Motivational Speaker","Life Coach","Industry Trainers","Technical / Digital Trainer","Personality Coach","Behavioral Trainer","Executive Coach","Other"]}
              />
            </div>
          </Sec>

          {/* 4 · Profile Summary & Documents */}
          <Sec icon={<FileText size={16} />} title="Profile Summary & Documents" sub="Your story and supporting materials">
            <div className="field-grid">

              <div className="col-2">
                <div className="tt-field">
                  <label className="tt-label"><span className="tt-label-icon"><FileText size={11} /></span>CV or Profile Summary</label>
                  <textarea className="tt-input no-icon" placeholder="Briefly describe your training background, achievements, and what makes you unique..." />
                </div>
              </div>

              <div className="col-3">

                <div>
                  <div className="tt-label" style={{ marginBottom: 5 }}><span className="tt-label-icon"><Upload size={11} /></span>Upload CV (PDF)</div>
                  <div className="upload-zone">
                    <input type="file" accept="application/pdf" onChange={e => setCvFiles(Array.from(e.target.files || []))} />
                    <div className="upload-zone-icon"><FileText size={17} /></div>
                    <div className="upload-zone-title">Click or drag to upload CV</div>
                    <div className="upload-zone-sub">PDF only · Max 5MB</div>
                  </div>
                  <div>{cvFiles.map((f, i) => <span className="file-chip" key={i}><CheckCircle size={10} />{f.name}</span>)}</div>
                </div>

                <div>
                  <div className="tt-label" style={{ marginBottom: 5 }}><span className="tt-label-icon"><Award size={11} /></span>Upload Certificates</div>
                  <div className="upload-zone">
                    <input type="file" multiple accept="image/*,application/pdf" onChange={e => setCertFiles(Array.from(e.target.files || []))} />
                    <div className="upload-zone-icon"><Award size={17} /></div>
                    <div className="upload-zone-title">Click or drag to upload</div>
                    <div className="upload-zone-sub">PDF, JPG, PNG · Multiple allowed</div>
                  </div>
                  <div>{certFiles.map((f, i) => <span className="file-chip" key={i}><CheckCircle size={10} />{f.name}</span>)}</div>
                </div>

                <div>
                  <div className="tt-label" style={{ marginBottom: 5 }}><span className="tt-label-icon"><Camera size={11} /></span>Upload Workshop Photos</div>
                  <div className="upload-zone">
                    <input type="file" multiple accept="image/*" onChange={handleWorkshopPhotos} />
                    <div className="upload-zone-icon"><Camera size={17} /></div>
                    <div className="upload-zone-title">Click or drag photos</div>
                    <div className="upload-zone-sub">JPG, PNG, WEBP · Multiple allowed</div>
                  </div>
                  {workshopPhotoURLs.length > 0 && (
                    <div className="photo-previews">
                      {workshopPhotoURLs.map((url, i) => (
                        <img key={i} src={url} alt={`Workshop ${i + 1}`} className="photo-thumb" />
                      ))}
                    </div>
                  )}
                </div>

              </div>
            </div>
          </Sec>

          {/* 5 · Workshop Details */}
          <Sec icon={<MapPin size={16} />} title="Workshop Details" sub="Where you've trained and what you've delivered">
            <div className="field-grid">
              <div className="col-2">
                <div className="tt-field">
                  <label className="tt-label"><span className="tt-label-icon"><BookOpen size={11} /></span>Details of Recent Workshop Done</label>
                  <textarea className="tt-input no-icon" placeholder="Mention workshop name, duration (days), number of attendees, client name, topics covered..." />
                </div>
              </div>
            </div>
          </Sec>

          {/* 6 · Additional Details */}
          <Sec icon={<Award size={16} />} title="Additional Details" sub="Your credentials, style and reach">
            <div className="field-grid">
              <Sel label="Open to Travel for Workshop"    icon={<Plane size={13} />}      options={["Within City","Within State","Upto 50kms","Zonal Travel Only","PAN India","Global Trainer"]} />
              <Sel label="Languages Fluent"               icon={<Languages size={13} />}  options={["Hindi","English","Other"]} />
              <Sel label="Trainer Certifications"         icon={<Award size={13} />}      options={["ICF Certified Coach","POSH Trainer","Technical Skills Certified","Other"]} />
              <Sel label="Training & Workshop Experience" icon={<TrendingUp size={13} />} options={["15 years and above","10 - 15 years","5 - 10 years","2 - 5 years","Emerging Trainer"]} />
              <Sel label="Audience & Seniority Level"     icon={<Users size={13} />}      options={["Freshers & Students","New Joinees","Entry Level","Mid-level Management","CXOs & Leadership","Entrepreneurs & Founders","Staff Level","Other"]} />
              <Sel label="International Market Knowledge" icon={<Globe size={13} />}      options={["Asian Market","South East Asia","Middle East","Australia & New Zealand","US & Canada","UK & Europe"]} />
              <Sel label="Commercials / Fees per Day"     icon={<DollarSign size={13} />} options={["Upto ₹15,000","₹15,000 - ₹30,000","₹30,000 - ₹50,000","₹50,000 - ₹1,00,000","₹1,00,000 and above"]} />
            </div>
          </Sec>

          {/* Submit */}
          <div className="submit-wrap">
            <button type="button" className="submit-btn">
              <span><Sparkles size={15} /> Create My Trainer Profile</span>
            </button>
          </div>

        </main>
      </div>
    </>
  );
}

/* ─── HELPER COMPONENTS ──────────────────────────────── */
function Sec({ icon, title, sub, children }) {
  return (
    <div className="sec-card">
      <div className="sec-header">
        <div className="sec-icon-wrap">{icon}</div>
        <div>
          <div className="sec-title">{title}</div>
          {sub && <div className="sec-sub">{sub}</div>}
        </div>
      </div>
      {children}
    </div>
  );
}

function Field({ label, icon, placeholder }) {
  return (
    <div className="tt-field">
      <label className="tt-label">
        {icon && <span className="tt-label-icon">{icon}</span>}
        {label}
      </label>
      <div className="tt-input-wrap">
        {icon && <div className="tt-input-icon">{icon}</div>}
        <input type="text" placeholder={placeholder} className="tt-input" />
      </div>
    </div>
  );
}

function Sel({ label, icon, options }) {
  return (
    <div className="tt-field">
      <label className="tt-label">
        {icon && <span className="tt-label-icon">{icon}</span>}
        {label}
      </label>
      <div className="tt-input-wrap">
        {icon && <div className="tt-input-icon">{icon}</div>}
        <select className="tt-input">
          <option value="">Select an option</option>
          {options.map((o, i) => <option key={i}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}