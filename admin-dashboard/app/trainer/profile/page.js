'use client'
import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import {
  User, Mail, Phone, Globe, MapPin, Linkedin, Youtube, Instagram,
  Facebook, Briefcase, Target, Star, Award, FileText, Camera,
  Edit3, Save, X, CheckCircle, AlertCircle, Lock, Eye, EyeOff,
  Shield, BadgeCheck, Calendar, Sparkles, AlertTriangle, Upload,
  DollarSign, Plane, Languages, TrendingUp, Users, Building2,
  ChevronDown, BookOpen, UserPlus, Plus, Trash2, Image as ImageIcon,
  Video, GraduationCap, Link, Trophy, Image as Img, Zap
} from 'lucide-react'

// ─────────────────────────────────────────────────────────
// LOCATION DATA
// ─────────────────────────────────────────────────────────
const LOCATION_DATA = {
  India: {
    Maharashtra: ['Mumbai','Pune','Nagpur','Nashik','Aurangabad','Solapur','Thane'],
    Delhi: ['New Delhi','Dwarka','Rohini','Saket','Vasant Kunj','Karol Bagh'],
    Karnataka: ['Bengaluru','Mysuru','Mangaluru','Hubli','Belagavi','Tumkur'],
    'Tamil Nadu': ['Chennai','Coimbatore','Madurai','Tiruchirappalli','Salem','Tirunelveli'],
    Gujarat: ['Ahmedabad','Surat','Vadodara','Rajkot','Bhavnagar','Jamnagar'],
    Rajasthan: ['Jaipur','Jodhpur','Udaipur','Kota','Bikaner','Ajmer'],
    'Uttar Pradesh': ['Lucknow','Kanpur','Agra','Varanasi','Prayagraj','Meerut','Noida','Ghaziabad'],
    'West Bengal': ['Kolkata','Howrah','Asansol','Siliguri','Durgapur'],
    Telangana: ['Hyderabad','Warangal','Nizamabad','Karimnagar'],
    Punjab: ['Chandigarh','Ludhiana','Amritsar','Jalandhar','Patiala'],
    Haryana: ['Gurugram','Faridabad','Panipat','Ambala','Karnal'],
    Kerala: ['Thiruvananthapuram','Kochi','Kozhikode','Thrissur','Kollam'],
    'Madhya Pradesh': ['Bhopal','Indore','Jabalpur','Gwalior','Ujjain'],
    Bihar: ['Patna','Gaya','Bhagalpur','Muzaffarpur'],
    Odisha: ['Bhubaneswar','Cuttack','Rourkela','Brahmapur'],
    Goa: ['Panaji','Margao','Vasco da Gama','Mapusa'],
  },
  'United States': {
    California: ['Los Angeles','San Francisco','San Diego','San Jose','Sacramento','Fresno'],
    'New York': ['New York City','Buffalo','Rochester','Albany','Syracuse'],
    Texas: ['Houston','Dallas','Austin','San Antonio','Fort Worth','El Paso'],
    Florida: ['Miami','Orlando','Tampa','Jacksonville','St. Petersburg'],
    Illinois: ['Chicago','Aurora','Naperville','Rockford','Springfield'],
    Washington: ['Seattle','Spokane','Tacoma','Bellevue','Olympia'],
    Georgia: ['Atlanta','Columbus','Savannah','Augusta','Macon'],
    Massachusetts: ['Boston','Worcester','Springfield','Cambridge','Lowell'],
  },
  'United Kingdom': {
    England: ['London','Manchester','Birmingham','Leeds','Liverpool','Bristol','Sheffield','Newcastle'],
    Scotland: ['Edinburgh','Glasgow','Aberdeen','Dundee','Inverness'],
    Wales: ['Cardiff','Swansea','Newport','Bangor'],
    'Northern Ireland': ['Belfast','Derry','Armagh','Lisburn'],
  },
  Australia: {
    'New South Wales': ['Sydney','Newcastle','Wollongong','Central Coast'],
    Victoria: ['Melbourne','Geelong','Ballarat','Bendigo'],
    Queensland: ['Brisbane','Gold Coast','Sunshine Coast','Townsville'],
    'Western Australia': ['Perth','Bunbury','Geraldton','Albany'],
  },
  Canada: {
    Ontario: ['Toronto','Ottawa','Mississauga','Brampton','Hamilton'],
    'British Columbia': ['Vancouver','Surrey','Burnaby','Richmond'],
    Quebec: ['Montreal','Quebec City','Laval','Gatineau'],
    Alberta: ['Calgary','Edmonton','Red Deer','Lethbridge'],
  },
  'United Arab Emirates': {
    Dubai: ['Dubai City','Deira','Bur Dubai','Jumeirah','Business Bay'],
    'Abu Dhabi': ['Abu Dhabi City','Al Ain','Khalifa City'],
    Sharjah: ['Sharjah City','Khor Fakkan'],
  },
  Singapore: {
    'Central Region': ['Downtown Core','Marina Bay','Orchard','Buona Vista'],
    'East Region': ['Tampines','Pasir Ris','Bedok','Changi'],
    'North Region': ['Woodlands','Yishun','Sembawang'],
    'West Region': ['Jurong','Bukit Batok','Choa Chu Kang'],
  },
}
const COUNTRIES = Object.keys(LOCATION_DATA).sort()

const GLOBAL_MARKETS = [
  { label: 'Asian Market', countries: 'Japan, South Korea, Hong Kong, Sri Lanka, Bangladesh, Nepal, Bhutan' },
  { label: 'South East Asia', countries: 'Singapore, Malaysia, Thailand, Indonesia, Vietnam, Philippines' },
  { label: 'Middle East', countries: 'UAE, Saudi Arabia, Qatar, Oman, Kuwait, Bahrain' },
  { label: 'Australia & New Zealand', countries: 'Australia, New Zealand' },
  { label: 'US & Canada Market', countries: 'United States, Canada' },
  { label: 'UK & Europe', countries: 'United Kingdom, Germany, France, Netherlands, Spain, Italy, Sweden' },
]

// ─────────────────────────────────────────────────────────
// OPTIONS
// ─────────────────────────────────────────────────────────
const OPTS = {
  industry: ['Real Estate','IT & Digital','Media & Entertainment','Banking & Finance','Telecommunications','Hospitality & Aviation','Healthcare & Pharma','Education Sector','Retail Industry','Automobile','Jewellery','FMCG','Other'],
  domain: ['Logistics & Operations','Soft Skills Development','Sales & Business Development','Leadership Transformation','International Market Expansion','Customer Service Excellence','Branding & Communications','Other'],
  competency: ['AI Tools & Generative AI','Strategic Thinking','Communication & Narrative Building','Multitasking Ability','Team Building & Management','Innovation','Big Picture Thinking','Time Management','Other'],
  trainerType: ['Faculty / Professor','Business Consultant','Motivational Speaker','Life Coach','Industry Trainers','Technical / Digital Trainer','Personality Coach','Behavioral Trainer','Executive Coach','Other'],
  travel: ['Within City','Within State','Upto 50kms','Zonal Travel Only','PAN India','Global Trainer'],
  languages: ['Hindi','English','Other'],
  trainerCerts: ['ICF Certified Coach','POSH Trainer','Technical Skills Certified','Other'],
  experience: ['15 years and above','10 - 15 years','5 - 10 years','2 - 5 years','Emerging Trainer'],
  audience: ['Freshers & Students','New Joinees','Entry Level','Mid-level Management','CXOs & Leadership','Entrepreneurs & Founders','Staff Level','Other'],
  fees: ['Upto ₹15,000','₹15,000 - ₹30,000','₹30,000 - ₹50,000','₹50,000 - ₹1,00,000','₹1,00,000 and above'],
  awardCategory: ['Training Excellence','Leadership','Innovation','Industry Recognition','Community Impact','Academic Achievement','Other'],
  workshopIndustry: ['Real Estate','IT & Digital','Media & Entertainment','Banking & Finance','Telecommunications','Hospitality & Aviation','Healthcare & Pharma','Education Sector','Retail Industry','Automobile','Jewellery','FMCG','Other'],
  workshopDomain: ['Logistics & Operations','Soft Skills Development','Sales & Business Development','Leadership Transformation','International Market Expansion','Customer Service Excellence','Branding & Communications','Other'],
  workshopCompetency: ['AI Tools & Generative AI','Strategic Thinking','Communication & Narrative Building','Multitasking Ability','Team Building & Management','Innovation','Big Picture Thinking','Time Management','Other'],
  employmentType: ['Full-Time','Part-Time','Freelance / Consulting','Contract','Self-Employed','Other'],
}

// ─────────────────────────────────────────────────────────
// CSS
// ─────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');
*,*::before,*::after{box-sizing:border-box;}
:root{
  --blue:#1d4ed8;--indigo:#4f46e5;--green:#16a34a;--amber:#d97706;--red:#dc2626;
  --ink:#0f1117;--ink2:#1e293b;--muted:#6b7280;--light:#94a3b8;
  --border:#e2e8f0;--surf:#f8faff;
  --ff:'Plus Jakarta Sans',sans-serif;--ffb:'Inter',sans-serif;
}
.tpd-page{min-height:100vh;background:#eef2ff;font-family:var(--ffb);color:var(--ink);}

/* TOPBAR */
.tpd-topbar{background:rgba(255,255,255,.96);backdrop-filter:blur(12px);border-bottom:1px solid var(--border);padding:0 28px;height:60px;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:200;box-shadow:0 1px 8px rgba(29,78,216,.07);}
.tpd-brand{font-family:var(--ff);font-size:1.1rem;font-weight:800;color:var(--ink);display:flex;align-items:center;gap:9px;}
.tpd-brand-dot{width:9px;height:9px;border-radius:50%;background:linear-gradient(135deg,var(--blue),var(--indigo));}
.tpd-bc{font-size:.78rem;color:var(--light);}

/* HERO */
.tpd-hero{background:linear-gradient(135deg,#eff6ff 0%,#eef2ff 40%,#f5f3ff 100%);border-bottom:1px solid rgba(29,78,216,.08);position:relative;overflow:hidden;}
.tpd-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 10% 20%,rgba(124,58,237,.07) 0%,transparent 50%),radial-gradient(circle at 90% 80%,rgba(29,78,216,.06) 0%,transparent 50%);pointer-events:none;}
.tpd-inner{max-width:1120px;margin:0 auto;padding:0 24px;}
.tpd-hero-inner{position:relative;z-index:2;padding:32px 0 0;}

/* BANNER */
.tpd-banner-wrap{position:relative;width:100%;height:160px;border-radius:16px;overflow:hidden;background:linear-gradient(135deg,#1d4ed8,#4f46e5);margin-bottom:-50px;}
.tpd-banner-img{width:100%;height:100%;object-fit:cover;}
.tpd-banner-overlay{position:absolute;inset:0;background:rgba(29,78,216,.42);display:flex;align-items:center;justify-content:center;gap:8px;opacity:0;transition:opacity .2s;cursor:pointer;}
.tpd-banner-wrap:hover .tpd-banner-overlay{opacity:1;}
.tpd-banner-overlay span{font-family:var(--ff);font-weight:700;font-size:.78rem;color:#fff;}

/* HEAD ROW */
.tpd-head{display:flex;align-items:flex-end;gap:18px;flex-wrap:wrap;padding:60px 0 22px;}
.tpd-av-wrap{position:relative;flex-shrink:0;}
.tpd-av{width:94px;height:94px;border-radius:22px;background:linear-gradient(135deg,var(--blue),var(--indigo));display:flex;align-items:center;justify-content:center;font-family:var(--ff);font-weight:800;font-size:1.8rem;color:#fff;box-shadow:0 10px 30px rgba(29,78,216,.28),0 0 0 4px rgba(255,255,255,.9);overflow:hidden;}
.tpd-av img{width:100%;height:100%;object-fit:cover;}
.tpd-av-edit{position:absolute;bottom:-4px;right:-4px;width:30px;height:30px;border-radius:10px;background:var(--blue);display:flex;align-items:center;justify-content:center;border:3px solid #eef2ff;cursor:pointer;box-shadow:0 4px 12px rgba(29,78,216,.35);transition:all .18s;}
.tpd-av-edit:hover{background:var(--indigo);transform:scale(1.08);}
.tpd-headinfo{flex:1;min-width:180px;}
.tpd-name{font-family:var(--ff);font-weight:800;font-size:1.5rem;color:var(--ink);margin-bottom:3px;}
.tpd-email{font-size:.83rem;color:var(--muted);margin-bottom:9px;}
.tpd-badges{display:flex;gap:6px;flex-wrap:wrap;}
.tpd-badge{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;padding:4px 10px;border-radius:99px;border:1px solid;}
.tpd-badge-role{background:rgba(29,78,216,.09);border-color:rgba(29,78,216,.18);color:var(--blue);}
.tpd-badge-ok{background:rgba(22,163,74,.1);border-color:rgba(22,163,74,.2);color:var(--green);}
.tpd-badge-warn{background:rgba(217,119,6,.1);border-color:rgba(217,119,6,.2);color:var(--amber);}
.tpd-badge-loc{background:rgba(255,255,255,.8);border-color:rgba(255,255,255,.95);color:var(--ink2);}
.tpd-actions{display:flex;gap:8px;align-items:flex-end;flex-shrink:0;}

/* BUTTONS */
.tpd-btn{display:inline-flex;align-items:center;gap:7px;padding:10px 20px;border-radius:11px;font-family:var(--ff);font-size:.84rem;font-weight:700;cursor:pointer;border:none;transition:all .2s;white-space:nowrap;}
.tpd-btn-pri{background:linear-gradient(135deg,var(--blue),#1e40af);color:#fff;box-shadow:0 5px 18px rgba(29,78,216,.3);}
.tpd-btn-pri:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(29,78,216,.4);}
.tpd-btn-pri:disabled{opacity:.6;cursor:not-allowed;transform:none;}
.tpd-btn-ghost{background:rgba(255,255,255,.85);color:var(--muted);border:1px solid var(--border);}
.tpd-btn-ghost:hover{background:white;color:var(--ink);}

/* TABS */
.tpd-tabs{display:flex;gap:2px;border-bottom:1px solid rgba(29,78,216,.1);overflow-x:auto;}
.tpd-tab{display:inline-flex;align-items:center;gap:7px;padding:12px 16px;font-family:var(--ff);font-size:.82rem;font-weight:700;color:var(--muted);background:none;border:none;cursor:pointer;border-bottom:2.5px solid transparent;transition:all .18s;margin-bottom:-1px;white-space:nowrap;}
.tpd-tab:hover{color:var(--ink2);}
.tpd-tab.active{color:var(--blue);border-bottom-color:var(--blue);}

/* BODY */
.tpd-body{padding:24px 0 80px;}
.tpd-grid{display:grid;grid-template-columns:1fr 280px;gap:18px;align-items:start;}
@media(max-width:900px){.tpd-grid{grid-template-columns:1fr;}.tpd-sidebar-col{order:-1;}}

/* CARD */
.tpd-card{background:white;border:1px solid #e8eeff;border-radius:18px;padding:22px 24px;box-shadow:0 3px 16px rgba(29,78,216,.05);margin-bottom:16px;overflow:visible;}
.tpd-card-hd{display:flex;align-items:center;gap:10px;margin-bottom:18px;padding-bottom:13px;border-bottom:1.5px solid #eef2ff;}
.tpd-card-icon{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,#dbeafe,#e0e7ff);color:var(--blue);flex-shrink:0;}
.tpd-card-title{font-family:var(--ff);font-weight:700;font-size:.9rem;color:#1e3a8a;letter-spacing:-.1px;}
.tpd-card-sub{font-size:.7rem;color:var(--light);margin-top:1px;}

/* GRIDS */
.g1{display:grid;grid-template-columns:1fr;gap:13px;}
.g2{display:grid;grid-template-columns:1fr 1fr;gap:13px 16px;}
.g3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:13px 16px;}
.g2-3{display:grid;grid-template-columns:1fr 1fr;gap:13px 16px;}
.sp2{grid-column:1/-1;}
.sp3{grid-column:1/-1;}
@media(max-width:700px){.g2,.g3,.g2-3{grid-template-columns:1fr;}}

/* FIELD */
.tpd-field{display:flex;flex-direction:column;gap:4px;position:relative;}
.tpd-label{font-family:var(--ff);font-weight:600;font-size:.7rem;color:#374151;letter-spacing:.25px;display:flex;align-items:center;gap:4px;}
.tpd-label-ico{color:#6366f1;display:flex;}
.tpd-inp-wrap{position:relative;}
.tpd-inp-ico{position:absolute;left:10px;top:50%;transform:translateY(-50%);color:var(--light);pointer-events:none;display:flex;z-index:1;}
.tpd-inp{width:100%;background:var(--surf);border:1.5px solid var(--border);border-radius:9px;padding:9px 11px 9px 33px;font-size:.81rem;color:var(--ink2);font-family:var(--ffb);transition:border-color .18s,box-shadow .18s,background .18s;outline:none;appearance:none;}
.tpd-inp.no-ico{padding-left:11px;}
.tpd-inp:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(29,78,216,.12);background:#fff;}
.tpd-inp:hover:not(:focus):not(:disabled){border-color:#a5b4fc;background:#fff;}
.tpd-inp:disabled{opacity:.5;cursor:not-allowed;}
.tpd-inp.err{border-color:#fca5a5;}
select.tpd-inp{background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 10px center;cursor:pointer;padding-right:28px;}
textarea.tpd-inp{height:90px;resize:none;padding-top:10px;}
.tpd-view{font-size:.87rem;color:var(--ink2);font-weight:500;line-height:1.6;padding:8px 0;border-bottom:1.5px solid #eef2ff;min-height:20px;}
.tpd-view.empty{color:var(--light);font-weight:400;}
.tpd-ferr{margin:4px 0 0;font-size:.72rem;color:var(--red);font-weight:600;display:flex;align-items:center;gap:4px;}

/* MULTI-SELECT */
.ms-wrap{position:relative;width:100%;}
.ms-trigger{width:100%;background:var(--surf);border:1.5px solid var(--border);border-radius:9px;padding:9px 34px 9px 33px;font-size:.81rem;color:var(--ink2);font-family:var(--ffb);cursor:pointer;display:flex;align-items:center;justify-content:space-between;transition:border-color .18s,box-shadow .18s,background .18s;user-select:none;}
.ms-trigger:hover{border-color:#a5b4fc;background:#fff;}
.ms-trigger.open{border-color:var(--blue);box-shadow:0 0 0 3px rgba(29,78,216,.12);background:#fff;}
.ms-trigger:disabled{opacity:.5;cursor:not-allowed;}
.ms-txt{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;}
.ms-ph{color:var(--light);}
.ms-arrow{color:var(--light);transition:transform .2s;flex-shrink:0;}
.ms-arrow.open{transform:rotate(180deg);}
.ms-drop{position:fixed;z-index:99999;max-height:240px;overflow-y:auto;background:#fff;border:1.5px solid #dbeafe;border-radius:10px;box-shadow:0 12px 36px rgba(0,0,0,.13);}
.ms-drop::-webkit-scrollbar{width:4px;}
.ms-drop::-webkit-scrollbar-thumb{background:#c7d2fe;border-radius:99px;}
.ms-opt{display:flex;align-items:center;gap:9px;padding:8px 13px;cursor:pointer;font-size:.79rem;color:#374151;transition:background .14s;}
.ms-opt:hover{background:#eff6ff;}
.ms-opt.sel{background:#eff6ff;color:var(--blue);}
.ms-chk{width:15px;height:15px;min-width:15px;border-radius:4px;border:1.5px solid #c7d2fe;background:#fff;display:flex;align-items:center;justify-content:center;transition:all .14s;}
.ms-chk.on{background:var(--blue);border-color:var(--blue);}
.ms-tags{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px;}
.ms-tag{display:inline-flex;align-items:center;gap:4px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:2px 8px;font-size:.66rem;color:var(--blue);font-weight:600;font-family:var(--ff);}
.ms-tag-x{cursor:pointer;font-size:.75rem;color:#93c5fd;transition:color .14s;line-height:1;}
.ms-tag-x:hover{color:var(--blue);}
.ms-vtags{display:flex;flex-wrap:wrap;gap:5px;padding:8px 0;}
.ms-vtag{display:inline-flex;align-items:center;gap:4px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:3px 10px;font-size:.72rem;color:var(--blue);font-weight:600;font-family:var(--ff);}
.ms-vtag.empty{background:transparent;border-color:transparent;color:var(--light);font-weight:400;}

/* UPLOAD */
.up-zone{border:1.5px dashed #93c5fd;border-radius:9px;background:var(--surf);padding:13px;text-align:center;cursor:pointer;transition:all .2s;position:relative;overflow:hidden;}
.up-zone:hover{border-color:var(--blue);background:#eff6ff;}
.up-zone input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;}
.up-zone-ico{width:32px;height:32px;border-radius:9px;background:linear-gradient(135deg,#dbeafe,#e0e7ff);display:flex;align-items:center;justify-content:center;margin:0 auto 6px;color:var(--blue);}
.up-zone-t{font-family:var(--ff);font-weight:700;font-size:.73rem;color:#1e3a8a;}
.up-zone-s{font-size:.62rem;color:var(--light);margin-top:1px;}
.file-chip{display:inline-flex;align-items:center;gap:4px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:6px;padding:3px 8px;font-size:.67rem;color:var(--blue);font-weight:500;margin-top:4px;margin-right:4px;}
.ph-previews{display:flex;flex-wrap:wrap;gap:7px;margin-top:8px;}
.ph-thumb{width:60px;height:60px;border-radius:8px;object-fit:cover;border:2px solid #bfdbfe;}

/* ENTRY CARD */
.entry-card{border:1.5px solid #e0e7ff;border-radius:13px;padding:16px 18px;background:var(--surf);margin-bottom:13px;position:relative;}
.entry-hd{display:flex;align-items:center;justify-content:space-between;margin-bottom:13px;padding-bottom:9px;border-bottom:1px solid #e0e7ff;}
.entry-num{font-family:var(--ff);font-weight:700;font-size:.76rem;color:var(--blue);background:#dbeafe;border-radius:6px;padding:3px 10px;}
.entry-rm{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:#fee2e2;color:var(--red);border:none;border-radius:7px;font-size:.67rem;font-weight:600;font-family:var(--ff);cursor:pointer;transition:all .2s;}
.entry-rm:hover{background:#fecaca;}
.add-entry-btn{display:flex;align-items:center;justify-content:center;gap:7px;width:100%;padding:11px;background:#eff6ff;border:1.5px dashed #93c5fd;border-radius:11px;color:var(--blue);font-family:var(--ff);font-weight:700;font-size:.77rem;cursor:pointer;transition:all .2s;margin-top:4px;}
.add-entry-btn:hover{background:#dbeafe;border-color:var(--blue);}

/* WORKSHOP PHOTO */
.ws-photo-slot{border:1.5px dashed #93c5fd;border-radius:9px;background:#eff6ff;width:76px;height:76px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;position:relative;overflow:hidden;transition:border-color .2s;flex-shrink:0;}
.ws-photo-slot:hover{border-color:var(--blue);}
.ws-photo-slot input[type=file]{position:absolute;inset:0;opacity:0;cursor:pointer;width:100%;height:100%;}
.ws-photo-slot img{width:100%;height:100%;object-fit:cover;position:absolute;inset:0;}
.ws-photo-slot-lbl{font-size:.57rem;color:var(--light);margin-top:3px;font-family:var(--ff);font-weight:600;}

/* VIDEO URL ROW */
.vid-url-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
.vid-url-num{font-family:var(--ff);font-weight:700;font-size:.67rem;color:#6366f1;background:#e0e7ff;border-radius:5px;padding:2px 7px;flex-shrink:0;}

/* GLOBAL MARKET */
.gm-list{display:flex;flex-direction:column;}
.gm-item{display:flex;align-items:flex-start;gap:11px;padding:12px 0;border-bottom:1px solid #eef2ff;cursor:pointer;}
.gm-item:last-child{border-bottom:none;}
.gm-chk-wrap{width:19px;height:19px;border-radius:5px;border:1.5px solid #c7d2fe;background:#fff;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;transition:all .15s;}
.gm-chk-wrap.on{background:var(--blue);border-color:var(--blue);}
.gm-label{font-family:var(--ff);font-weight:700;font-size:.82rem;color:#1e3a8a;margin-bottom:2px;}
.gm-countries{font-size:.69rem;color:#6366f1;line-height:1.5;}

/* SIDEBAR */
.tpd-side-card{background:white;border:1px solid #e2e8f0;border-radius:16px;padding:16px 18px;box-shadow:0 4px 16px rgba(29,78,216,.05);margin-bottom:13px;}
.tpd-side-title{font-size:.67rem;font-weight:800;text-transform:uppercase;letter-spacing:.08em;color:var(--light);margin-bottom:11px;}
.tpd-ring-wrap{display:flex;align-items:center;gap:12px;}
.tpd-ring-pct{font-family:var(--ff);font-weight:800;font-size:1.4rem;color:var(--ink);}
.tpd-ring-sub{font-size:.72rem;color:var(--muted);margin-top:2px;line-height:1.5;}
.tpd-checklist{display:flex;flex-direction:column;gap:6px;margin-top:11px;}
.tpd-chk-item{display:flex;align-items:center;gap:7px;font-size:.76rem;color:var(--muted);font-weight:500;}
.tpd-chk-item.done{color:var(--ink2);}
.tpd-chk-ico{width:17px;height:17px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.tpd-chk-ico.done{background:rgba(22,163,74,.12);color:var(--green);}
.tpd-chk-ico.todo{background:var(--surf);color:var(--light);border:1.5px solid var(--border);}
.tpd-info-row{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:9px 0;border-bottom:1px solid var(--border);}
.tpd-info-row:last-child{border-bottom:none;padding-bottom:0;}
.tpd-info-row .lbl{font-size:.76rem;color:var(--muted);font-weight:600;display:flex;align-items:center;gap:6px;}
.tpd-info-row .val{font-size:.8rem;font-weight:700;color:var(--ink);text-align:right;}

/* TOAST */
.tpd-toast{position:fixed;top:20px;right:20px;z-index:999;display:flex;align-items:center;gap:10px;background:white;border-radius:12px;padding:12px 18px;box-shadow:0 8px 32px rgba(0,0,0,.13);}
.tpd-toast.success{border:1px solid #bbf7d0;}
.tpd-toast.error{border:1px solid #fecaca;}
.tpd-toast span{font-size:.83rem;font-weight:600;color:var(--ink);}
.tpd-toast button{background:none;border:none;cursor:pointer;color:var(--light);padding:0;display:flex;margin-left:4px;}

/* ERR BOX */
.tpd-errbox{display:flex;align-items:flex-start;gap:9px;background:#fff5f5;border:1px solid #fecaca;border-radius:11px;padding:12px 16px;margin-bottom:14px;}
.tpd-errbox p{margin:0;font-size:.78rem;color:var(--red);font-weight:600;line-height:1.6;}

/* PW */
.pw-toggle-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 18px;border-radius:11px;border:1px solid var(--border);background:white;color:var(--muted);font-size:.83rem;font-weight:700;cursor:pointer;font-family:var(--ff);transition:all .18s;}
.pw-toggle-btn:hover{border-color:var(--blue);color:var(--blue);background:rgba(29,78,216,.05);}
.pw-form{margin-top:14px;padding:16px 18px;background:var(--surf);border-radius:13px;border:1px solid var(--border);}
.pw-field{margin-bottom:12px;}
.pw-label{display:block;font-size:.74rem;font-weight:700;color:var(--ink2);margin-bottom:5px;}
.pw-inp-wrap{position:relative;}
.pw-inp{width:100%;padding:10px 40px 10px 12px;border-radius:10px;border:1.5px solid var(--border);font-size:.86rem;color:var(--ink);outline:none;font-family:var(--ffb);background:white;transition:border-color .18s,box-shadow .18s;}
.pw-inp:focus{border-color:var(--blue);box-shadow:0 0 0 3px rgba(29,78,216,.1);}
.pw-inp.err{border-color:#fca5a5;}
.pw-eye{position:absolute;right:11px;top:50%;transform:translateY(-50%);background:none;border:none;cursor:pointer;color:var(--light);display:flex;padding:0;}
.pw-eye:hover{color:var(--muted);}
.pw-err{margin:4px 0 0;font-size:.72rem;color:var(--red);font-weight:600;}
.pw-str-track{height:5px;border-radius:99px;background:var(--border);overflow:hidden;margin-top:6px;}
.pw-str-bar{height:100%;border-radius:99px;transition:width .25s,background .25s;}
.pw-str-lbl{font-size:.69rem;font-weight:700;margin-top:3px;}
@keyframes fadeUp{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
@keyframes spin{to{transform:rotate(360deg)}}
.spin{animation:spin .8s linear infinite;display:inline-flex;}
`

// ─────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────
function pwStrength(pw) {
  if (!pw) return { score: 0, label: '', color: '#e2e8f0' }
  let s = 0
  if (pw.length >= 8) s++; if (pw.length >= 12) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/\d/.test(pw)) s++; if (/[^A-Za-z0-9]/.test(pw)) s++
  const lvls = [
    { label:'Very weak', color:'#dc2626' }, { label:'Weak', color:'#f59e0b' },
    { label:'Fair', color:'#f59e0b' }, { label:'Good', color:'#2563eb' },
    { label:'Strong', color:'#16a34a' }, { label:'Excellent', color:'#16a34a' },
  ]
  return { score: s, ...lvls[Math.min(s, lvls.length - 1)] }
}

function calcCompletion(form, preview) {
  const fields = [
    'name','email','phone','whatsapp','bio','country','state','city',
    'website','linkedin','industry','domain','competency','trainerType',
    'travel','experience','fees','subjectLine','tagLine','companyName',
  ]
  const done = fields.filter(k => {
    const v = form[k]; return Array.isArray(v) ? v.length > 0 : (v || '').toString().trim().length > 0
  }).length + (preview ? 1 : 0)
  return { pct: Math.round((done / (fields.length + 1)) * 100), done, total: fields.length + 1 }
}

function Ring({ pct }) {
  const r = 26, c = 2 * Math.PI * r, offset = c - (pct / 100) * c
  const col = pct >= 100 ? '#16a34a' : pct >= 60 ? '#1d4ed8' : '#d97706'
  return (
    <svg width="62" height="62" viewBox="0 0 64 64">
      <circle cx="32" cy="32" r={r} fill="none" stroke="#e5e7eb" strokeWidth="6"/>
      <circle cx="32" cy="32" r={r} fill="none" stroke={col} strokeWidth="6"
        strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        transform="rotate(-90 32 32)" style={{ transition: 'stroke-dashoffset .5s ease, stroke .3s' }}/>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────
// MULTI-SELECT
// ─────────────────────────────────────────────────────────
function MultiSelect({ label, icon: Icon, options, value = [], onChange, disabled }) {
  const [open, setOpen] = useState(false)
  const [style, setStyle] = useState({})
  const wrapRef = useRef(null)
  const trigRef = useRef(null)

  useEffect(() => {
    function outside(e) {
      if (wrapRef.current?.contains(e.target)) return
      if (e.target.closest('.ms-drop')) return
      setOpen(false)
    }
    document.addEventListener('mousedown', outside)
    return () => document.removeEventListener('mousedown', outside)
  }, [])

  useEffect(() => {
    if (!open || !trigRef.current) return
    const r = trigRef.current.getBoundingClientRect()
    setStyle({ position: 'fixed', top: r.bottom + 5, left: r.left, width: r.width, zIndex: 99999 })
  }, [open])

  const toggle = opt => {
    const next = value.includes(opt) ? value.filter(v => v !== opt) : [...value, opt]
    onChange(next)
  }
  const remove = (opt, e) => { e.stopPropagation(); onChange(value.filter(v => v !== opt)) }
  const disp = value.length === 0 ? null : value.length <= 2 ? value.join(', ') : `${value.slice(0, 2).join(', ')} +${value.length - 2} more`

  return (
    <div className="tpd-field" ref={wrapRef}>
      <label className="tpd-label">{Icon && <span className="tpd-label-ico"><Icon size={11}/></span>}{label}</label>
      {disabled ? (
        <div className="ms-vtags">
          {value.length ? value.map((v, i) => <span key={i} className="ms-vtag">{v}</span>)
            : <span className="ms-vtag empty">Not specified</span>}
        </div>
      ) : (
        <div className="ms-wrap">
          {Icon && <div className="tpd-inp-ico" style={{ zIndex: 1 }}><Icon size={13}/></div>}
          <div ref={trigRef} className={`ms-trigger${open ? ' open' : ''}`} onClick={() => setOpen(o => !o)}>
            <span className={`ms-txt${!disp ? ' ms-ph' : ''}`}>{disp || 'Select options'}</span>
            <ChevronDown size={12} className={`ms-arrow${open ? ' open' : ''}`}/>
          </div>
          {open && typeof document !== 'undefined' && createPortal(
            <div className="ms-drop" style={style}>
              {options.map((opt, i) => (
                <div key={i} className={`ms-opt${value.includes(opt) ? ' sel' : ''}`} onClick={() => toggle(opt)}>
                  <div className={`ms-chk${value.includes(opt) ? ' on' : ''}`}>
                    {value.includes(opt) && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  {opt}
                </div>
              ))}
            </div>,
            document.body
          )}
          {value.length > 0 && (
            <div className="ms-tags">
              {value.map((opt, i) => (
                <span className="ms-tag" key={i}>{opt}
                  <span className="ms-tag-x" onClick={e => remove(opt, e)}>✕</span>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// FIELD COMPONENTS
// ─────────────────────────────────────────────────────────
function TField({ label, icon: Icon, name, value, onChange, placeholder, editing, error, type = 'text' }) {
  return (
    <div className="tpd-field">
      <label className="tpd-label">{Icon && <span className="tpd-label-ico"><Icon size={11}/></span>}{label}</label>
      {editing ? (
        <>
          <div className="tpd-inp-wrap">
            {Icon && <div className="tpd-inp-ico"><Icon size={13}/></div>}
            <input type={type} name={name} value={value || ''} onChange={onChange}
              placeholder={placeholder || label} className={`tpd-inp${error ? ' err' : ''}`}/>
          </div>
          {error && <p className="tpd-ferr"><AlertCircle size={11}/>{error}</p>}
        </>
      ) : (
        <p className={`tpd-view${value ? '' : ' empty'}`}>{value || `No ${label.toLowerCase()} added`}</p>
      )}
    </div>
  )
}

function SelField({ label, icon: Icon, name, value, onChange, options, editing }) {
  return (
    <div className="tpd-field">
      <label className="tpd-label">{Icon && <span className="tpd-label-ico"><Icon size={11}/></span>}{label}</label>
      {editing ? (
        <div className="tpd-inp-wrap">
          {Icon && <div className="tpd-inp-ico"><Icon size={13}/></div>}
          <select name={name} value={value || ''} onChange={onChange} className="tpd-inp">
            <option value="">Select an option</option>
            {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
          </select>
        </div>
      ) : (
        <p className={`tpd-view${value ? '' : ' empty'}`}>{value || 'Not specified'}</p>
      )}
    </div>
  )
}

function TAField({ label, icon: Icon, name, value, onChange, placeholder, editing }) {
  return (
    <div className="tpd-field">
      <label className="tpd-label">{Icon && <span className="tpd-label-ico"><Icon size={11}/></span>}{label}</label>
      {editing ? (
        <div className="tpd-inp-wrap">
          <textarea name={name} value={value || ''} onChange={onChange}
            placeholder={placeholder || label} className="tpd-inp no-ico"/>
        </div>
      ) : (
        <p className={`tpd-view${value ? '' : ' empty'}`} style={{ whiteSpace: 'pre-wrap' }}>{value || 'Not specified'}</p>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// LOCATION
// ─────────────────────────────────────────────────────────
function LocationFields({ form, setForm, editing }) {
  const country = form.country || ''
  const state = form.state || ''
  const city = form.city || ''
  const states = country ? Object.keys(LOCATION_DATA[country] || {}).sort() : []
  const cities = (country && state) ? (LOCATION_DATA[country]?.[state] || []).sort() : []

  if (!editing) return (
    <>
      <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><MapPin size={11}/></span>Country</label><p className={`tpd-view${country ? '' : ' empty'}`}>{country || 'Not specified'}</p></div>
      <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><MapPin size={11}/></span>State / Province</label><p className={`tpd-view${state ? '' : ' empty'}`}>{state || 'Not specified'}</p></div>
      <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><MapPin size={11}/></span>City</label><p className={`tpd-view${city ? '' : ' empty'}`}>{city || 'Not specified'}</p></div>
    </>
  )

  return (
    <>
      <div className="tpd-field">
        <label className="tpd-label"><span className="tpd-label-ico"><MapPin size={11}/></span>Country</label>
        <div className="tpd-inp-wrap"><div className="tpd-inp-ico"><MapPin size={13}/></div>
          <select className="tpd-inp" value={country} onChange={e => setForm(f => ({ ...f, country: e.target.value, state: '', city: '' }))}>
            <option value="">Select Country</option>
            {COUNTRIES.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="tpd-field">
        <label className="tpd-label"><span className="tpd-label-ico"><MapPin size={11}/></span>State / Province</label>
        <div className="tpd-inp-wrap"><div className="tpd-inp-ico"><MapPin size={13}/></div>
          <select className="tpd-inp" value={state} onChange={e => setForm(f => ({ ...f, state: e.target.value, city: '' }))} disabled={!country}>
            <option value="">{country ? 'Select State' : 'Select Country first'}</option>
            {states.map((s, i) => <option key={i} value={s}>{s}</option>)}
          </select>
        </div>
      </div>
      <div className="tpd-field">
        <label className="tpd-label"><span className="tpd-label-ico"><MapPin size={11}/></span>City</label>
        <div className="tpd-inp-wrap"><div className="tpd-inp-ico"><MapPin size={13}/></div>
          <select className="tpd-inp" value={city} onChange={e => setForm(f => ({ ...f, city: e.target.value }))} disabled={!state}>
            <option value="">{state ? 'Select City' : 'Select State first'}</option>
            {cities.map((c, i) => <option key={i} value={c}>{c}</option>)}
          </select>
        </div>
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────
// WORKSHOP ENTRY
// ─────────────────────────────────────────────────────────
function WorkshopPhotoSlot({ index, photo, onUpload, editing }) {
  return (
    <div className="ws-photo-slot">
      {editing && <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if (f) onUpload(index, URL.createObjectURL(f)) }}/>}
      {photo
        ? <img src={photo} alt={`Workshop photo ${index + 1}`}/>
        : <><Camera size={15} color="#93c5fd"/><span className="ws-photo-slot-lbl">Photo {index + 1}</span></>
      }
    </div>
  )
}

function WorkshopEntry({ num, data, onChange, onRemove, editing }) {
  const [photos, setPhotos] = useState(data.photos || [null, null, null])
  const handlePhoto = (idx, url) => {
    const next = [...photos]; next[idx] = url; setPhotos(next)
    onChange({ ...data, photos: next })
  }
  const upd = (key, val) => onChange({ ...data, [key]: val })

  if (!editing) return (
    <div className="entry-card">
      <div className="entry-hd"><span className="entry-num">Workshop #{num}</span></div>
      <div className="g2" style={{ marginBottom: 10 }}>
        {[['Company Name', data.company], ['Title', data.title], ['Duration', data.duration], ['Location', data.location], ['Participants', data.participants]].map(([lbl, val]) => (
          <div key={lbl} className="tpd-field"><label className="tpd-label">{lbl}</label><p className={`tpd-view${val ? '' : ' empty'}`}>{val || 'Not specified'}</p></div>
        ))}
      </div>
      {[data.industry, data.domain, data.competency].some(Boolean) && (
        <div className="g3" style={{ marginBottom: 10 }}>
          {[['Industry', data.industry], ['Domain', data.domain], ['Competency', data.competency]].map(([lbl, val]) => (
            <div key={lbl} className="tpd-field"><label className="tpd-label">{lbl}</label><p className={`tpd-view${val ? '' : ' empty'}`}>{val || '—'}</p></div>
          ))}
        </div>
      )}
      {data.summary && <div className="tpd-field" style={{ marginBottom: 10 }}><label className="tpd-label">Summary</label><p className="tpd-view" style={{ whiteSpace: 'pre-wrap' }}>{data.summary}</p></div>}
      {photos.some(Boolean) && <div style={{ display: 'flex', gap: 8 }}>{photos.map((p, i) => p && <img key={i} src={p} alt="" className="ph-thumb"/>)}</div>}
    </div>
  )

  return (
    <div className="entry-card">
      <div className="entry-hd">
        <span className="entry-num">Workshop #{num}</span>
        {num > 1 && <button type="button" className="entry-rm" onClick={onRemove}><Trash2 size={11}/> Remove</button>}
      </div>
      <div className="g2" style={{ marginBottom: 11 }}>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Building2 size={11}/></span>Company Name</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Building2 size={13}/></div><input type="text" className="tpd-inp" value={data.company || ''} onChange={e => upd('company', e.target.value)} placeholder="Client / Company name"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><BookOpen size={11}/></span>Title of Workshop</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><BookOpen size={13}/></div><input type="text" className="tpd-inp" value={data.title || ''} onChange={e => upd('title', e.target.value)} placeholder="Workshop title"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Star size={11}/></span>Duration</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Star size={13}/></div><input type="text" className="tpd-inp" value={data.duration || ''} onChange={e => upd('duration', e.target.value)} placeholder="e.g. 2 Days / 16 Hours"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><MapPin size={11}/></span>Location</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><MapPin size={13}/></div><input type="text" className="tpd-inp" value={data.location || ''} onChange={e => upd('location', e.target.value)} placeholder="City, Country"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Users size={11}/></span>Total Participants</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Users size={13}/></div><input type="text" className="tpd-inp" value={data.participants || ''} onChange={e => upd('participants', e.target.value)} placeholder="e.g. 45"/></div></div>
      </div>
      <div className="g3" style={{ marginBottom: 11 }}>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Briefcase size={11}/></span>Industry</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Briefcase size={13}/></div><select className="tpd-inp" value={data.industry || ''} onChange={e => upd('industry', e.target.value)}><option value="">Select</option>{OPTS.workshopIndustry.map((o, i) => <option key={i}>{o}</option>)}</select></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Target size={11}/></span>Domain</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Target size={13}/></div><select className="tpd-inp" value={data.domain || ''} onChange={e => upd('domain', e.target.value)}><option value="">Select</option>{OPTS.workshopDomain.map((o, i) => <option key={i}>{o}</option>)}</select></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Star size={11}/></span>Competency</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Star size={13}/></div><select className="tpd-inp" value={data.competency || ''} onChange={e => upd('competency', e.target.value)}><option value="">Select</option>{OPTS.workshopCompetency.map((o, i) => <option key={i}>{o}</option>)}</select></div></div>
      </div>
      <div className="tpd-field" style={{ marginBottom: 11 }}>
        <label className="tpd-label"><span className="tpd-label-ico"><FileText size={11}/></span>Summary <span style={{ color: '#94a3b8', fontWeight: 400 }}>(max 100 words)</span></label>
        <textarea className="tpd-inp no-ico" style={{ height: 75 }} value={data.summary || ''} onChange={e => upd('summary', e.target.value)} placeholder="Brief summary — objectives, key topics, outcomes…"/>
      </div>
      <div>
        <div className="tpd-label" style={{ marginBottom: 7 }}><span className="tpd-label-ico"><Camera size={11}/></span>Workshop Photos (up to 3)</div>
        <div style={{ display: 'flex', gap: 9 }}>
          {photos.map((p, i) => <WorkshopPhotoSlot key={i} index={i} photo={p} onUpload={handlePhoto} editing={editing}/>)}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// AWARD ENTRY
// ─────────────────────────────────────────────────────────
function AwardEntry({ num, data, onChange, onRemove, editing }) {
  const upd = (key, val) => onChange({ ...data, [key]: val })

  if (!editing) return (
    <div className="entry-card">
      <div className="entry-hd"><span className="entry-num">Award #{num}</span></div>
      <div className="g2">
        {[['Award Title', data.title], ['Awarded By', data.org], ['Year', data.year], ['Category', data.category]].map(([lbl, val]) => (
          <div key={lbl} className="tpd-field"><label className="tpd-label">{lbl}</label><p className={`tpd-view${val ? '' : ' empty'}`}>{val || 'Not specified'}</p></div>
        ))}
        {data.desc && <div className="tpd-field sp2"><label className="tpd-label">Description</label><p className="tpd-view" style={{ whiteSpace: 'pre-wrap' }}>{data.desc}</p></div>}
      </div>
    </div>
  )

  return (
    <div className="entry-card">
      <div className="entry-hd">
        <span className="entry-num">Award #{num}</span>
        {num > 1 && <button type="button" className="entry-rm" onClick={onRemove}><Trash2 size={11}/> Remove</button>}
      </div>
      <div className="g2">
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Trophy size={11}/></span>Award / Recognition Title</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Trophy size={13}/></div><input type="text" className="tpd-inp" value={data.title || ''} onChange={e => upd('title', e.target.value)} placeholder="e.g. Leadership Excellence Award"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Building2 size={11}/></span>Awarded By (Organisation)</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Building2 size={13}/></div><input type="text" className="tpd-inp" value={data.org || ''} onChange={e => upd('org', e.target.value)} placeholder="e.g. Elevate Learning, NASSCOM"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Star size={11}/></span>Year</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Star size={13}/></div><input type="text" className="tpd-inp" value={data.year || ''} onChange={e => upd('year', e.target.value)} placeholder="e.g. 2023"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Award size={11}/></span>Award Category</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Award size={13}/></div><select className="tpd-inp" value={data.category || ''} onChange={e => upd('category', e.target.value)}><option value="">Select</option>{OPTS.awardCategory.map((o, i) => <option key={i}>{o}</option>)}</select></div></div>
        <div className="tpd-field sp2"><label className="tpd-label"><span className="tpd-label-ico"><FileText size={11}/></span>Brief Description <span style={{ color: '#94a3b8', fontWeight: 400 }}>(optional)</span></label><textarea className="tpd-inp no-ico" style={{ height: 68 }} value={data.desc || ''} onChange={e => upd('desc', e.target.value)} placeholder="Short note about this award…"/></div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// EXPERIENCE ENTRY
// ─────────────────────────────────────────────────────────
function ExperienceEntry({ num, data, onChange, onRemove, editing }) {
  const upd = (key, val) => onChange({ ...data, [key]: val })

  if (!editing) return (
    <div className="entry-card">
      <div className="entry-hd"><span className="entry-num">Experience #{num}</span></div>
      <div className="g2">
        {[['Job Title / Role', data.title], ['Organisation', data.org], ['Start Year', data.startYear], ['End Year', data.endYear || 'Present'], ['Employment Type', data.empType], ['Industry', data.industry]].map(([lbl, val]) => (
          <div key={lbl} className="tpd-field"><label className="tpd-label">{lbl}</label><p className={`tpd-view${val ? '' : ' empty'}`}>{val || 'Not specified'}</p></div>
        ))}
        {data.desc && <div className="tpd-field sp2"><label className="tpd-label">Responsibilities / Achievements</label><p className="tpd-view" style={{ whiteSpace: 'pre-wrap' }}>{data.desc}</p></div>}
      </div>
    </div>
  )

  return (
    <div className="entry-card">
      <div className="entry-hd">
        <span className="entry-num">Experience #{num}</span>
        {num > 1 && <button type="button" className="entry-rm" onClick={onRemove}><Trash2 size={11}/> Remove</button>}
      </div>
      <div className="g2">
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Briefcase size={11}/></span>Job Title / Role</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Briefcase size={13}/></div><input type="text" className="tpd-inp" value={data.title || ''} onChange={e => upd('title', e.target.value)} placeholder="e.g. Head of L&D Practice"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Building2 size={11}/></span>Organisation / Company</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Building2 size={13}/></div><input type="text" className="tpd-inp" value={data.org || ''} onChange={e => upd('org', e.target.value)} placeholder="e.g. Elevate Learning"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Star size={11}/></span>Start Year</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Star size={13}/></div><input type="text" className="tpd-inp" value={data.startYear || ''} onChange={e => upd('startYear', e.target.value)} placeholder="e.g. 2019"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Star size={11}/></span>End Year</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Star size={13}/></div><input type="text" className="tpd-inp" value={data.endYear || ''} onChange={e => upd('endYear', e.target.value)} placeholder="e.g. 2023 (leave blank if current)"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Briefcase size={11}/></span>Employment Type</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Briefcase size={13}/></div><select className="tpd-inp" value={data.empType || ''} onChange={e => upd('empType', e.target.value)}><option value="">Select</option>{OPTS.employmentType.map((o, i) => <option key={i}>{o}</option>)}</select></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Target size={11}/></span>Industry</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Target size={13}/></div><select className="tpd-inp" value={data.industry || ''} onChange={e => upd('industry', e.target.value)}><option value="">Select</option>{OPTS.industry.map((o, i) => <option key={i}>{o}</option>)}</select></div></div>
        <div className="tpd-field sp2"><label className="tpd-label"><span className="tpd-label-ico"><FileText size={11}/></span>Key Responsibilities / Achievements</label><textarea className="tpd-inp no-ico" style={{ height: 74 }} value={data.desc || ''} onChange={e => upd('desc', e.target.value)} placeholder="Key contributions and achievements in this role…"/></div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// CERTIFICATE ENTRY
// ─────────────────────────────────────────────────────────
function CertEntry({ num, data, onChange, onRemove, editing }) {
  const upd = (key, val) => onChange({ ...data, [key]: val })

  if (!editing) return (
    <div className="entry-card">
      <div className="entry-hd"><span className="entry-num">Certificate #{num}</span></div>
      <div className="g3">
        {[['Certificate / Degree', data.name], ['Issuing Organisation', data.org], ['Year Obtained', data.year]].map(([lbl, val]) => (
          <div key={lbl} className="tpd-field"><label className="tpd-label">{lbl}</label><p className={`tpd-view${val ? '' : ' empty'}`}>{val || 'Not specified'}</p></div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="entry-card">
      <div className="entry-hd">
        <span className="entry-num">Certificate #{num}</span>
        {num > 1 && <button type="button" className="entry-rm" onClick={onRemove}><Trash2 size={11}/> Remove</button>}
      </div>
      <div className="g3">
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Award size={11}/></span>Certificate / Degree Name</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Award size={13}/></div><input type="text" className="tpd-inp" value={data.name || ''} onChange={e => upd('name', e.target.value)} placeholder="e.g. Certified Scrum Master"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Building2 size={11}/></span>Issuing Organisation</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Building2 size={13}/></div><input type="text" className="tpd-inp" value={data.org || ''} onChange={e => upd('org', e.target.value)} placeholder="e.g. Scrum Alliance"/></div></div>
        <div className="tpd-field"><label className="tpd-label"><span className="tpd-label-ico"><Star size={11}/></span>Year Obtained</label><div className="tpd-inp-wrap"><div className="tpd-inp-ico"><Star size={13}/></div><input type="text" className="tpd-inp" value={data.year || ''} onChange={e => upd('year', e.target.value)} placeholder="e.g. 2016"/></div></div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// SECTION WRAPPER
// ─────────────────────────────────────────────────────────
function Sec({ icon: Icon, title, sub, children }) {
  return (
    <div className="tpd-card">
      <div className="tpd-card-hd">
        <div className="tpd-card-icon"><Icon size={16}/></div>
        <div>
          <div className="tpd-card-title">{title}</div>
          {sub && <div className="tpd-card-sub">{sub}</div>}
        </div>
      </div>
      {children}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// PASSWORD SECTION
// ─────────────────────────────────────────────────────────
function PasswordSection() {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ cur: '', nxt: '', cfm: '' })
  const [show, setShow] = useState({ cur: false, nxt: false, cfm: false })
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState(null)
  const [errs, setErrs] = useState({})
  const flash = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3000) }
  const validate = () => {
    const e = {}
    if (!form.cur) e.cur = 'Current password required'
    if (!form.nxt || form.nxt.length < 8) e.nxt = 'At least 8 characters'
    if (form.nxt !== form.cfm) e.cfm = 'Passwords do not match'
    setErrs(e); return Object.keys(e).length === 0
  }
  const save = async () => {
    if (!validate()) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 1000))
    flash('Password updated!'); setForm({ cur: '', nxt: '', cfm: '' }); setOpen(false)
    setSaving(false)
  }
  const str = pwStrength(form.nxt)
  return (
    <div>
      {toast && <div className={`tpd-toast ${toast.type}`} style={{ position: 'static', marginBottom: 12, boxShadow: 'none' }}>
        {toast.type === 'success' ? <CheckCircle size={13} color="#16a34a"/> : <AlertCircle size={13} color="#dc2626"/>}
        <span>{toast.msg}</span>
      </div>}
      <button className="pw-toggle-btn" onClick={() => setOpen(!open)}><Shield size={13}/>{open ? 'Cancel' : 'Change Password'}</button>
      {open && (
        <div className="pw-form">
          {[['cur', 'Current Password', null], ['nxt', 'New Password', 'Mix uppercase, lowercase, numbers and symbols.'], ['cfm', 'Confirm New Password', null]].map(([name, label, hint]) => (
            <div className="pw-field" key={name}>
              <label className="pw-label">{label}</label>
              <div className="pw-inp-wrap">
                <input type={show[name] ? 'text' : 'password'} value={form[name]} onChange={e => { setForm(f => ({ ...f, [name]: e.target.value })); setErrs(r => ({ ...r, [name]: '' })) }} placeholder="••••••••" className={`pw-inp${errs[name] ? ' err' : ''}`}/>
                <button type="button" className="pw-eye" onClick={() => setShow(s => ({ ...s, [name]: !s[name] }))}>{show[name] ? <EyeOff size={14}/> : <Eye size={14}/>}</button>
              </div>
              {name === 'nxt' && form.nxt && (<><div className="pw-str-track"><div className="pw-str-bar" style={{ width: `${(str.score / 5) * 100}%`, background: str.color }}/></div><p className="pw-str-lbl" style={{ color: str.color }}>{str.label}</p></>)}
              {errs[name] && <p className="pw-err">{errs[name]}</p>}
              {hint && !errs[name] && <p style={{ margin: '3px 0 0', fontSize: '.7rem', color: 'var(--light)' }}>{hint}</p>}
            </div>
          ))}
          <button className="tpd-btn tpd-btn-pri" onClick={save} disabled={saving} style={{ marginTop: 4 }}>
            {saving ? <Lock size={12} className="spin"/> : <Lock size={12}/>}{saving ? 'Updating…' : 'Update Password'}
          </button>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────
export default function TrainerProfileDashboard() {
  const picFileRef    = useRef(null)
  const bannerFileRef = useRef(null)

  const [tab,     setTab]     = useState('personal')
  const [editing, setEditing] = useState(false)
  const [saving,  setSaving]  = useState(false)
  const [toast,   setToast]   = useState(null)
  const [errors,  setErrors]  = useState({})

  // Profile images
  const [profilePic,   setProfilePic]   = useState(null)
  const [bannerImg,    setBannerImg]     = useState(null)
  const [tempPic,      setTempPic]       = useState(null)
  const [tempBanner,   setTempBanner]    = useState(null)

  // File uploads
  const [profileFiles, setProfileFiles] = useState([])
  const [certFiles,    setCertFiles]    = useState([])
  const [galleryURLs,  setGalleryURLs]  = useState([])

  // Dynamic entries
  const [workshops,   setWorkshops]   = useState([{ company: '', title: '', duration: '', location: '', participants: '', industry: '', domain: '', competency: '', summary: '', photos: [null, null, null] }])
  const [awards,      setAwards]      = useState([{ title: '', org: '', year: '', category: '', desc: '' }])
  const [experiences, setExperiences] = useState([{ title: '', org: '', startYear: '', endYear: '', empType: '', industry: '', desc: '' }])
  const [certEntries, setCertEntries] = useState([{ name: '', org: '', year: '' }])
  const [videoURLs,   setVideoURLs]   = useState([''])
  const [globalMarkets, setGlobalMarkets] = useState([])

  // Form data — all fields from the join form
  const [form, setForm] = useState({
    name: '', companyName: '', subjectLine: '', tagLine: '',
    email: '', phone: '', whatsapp: '',
    country: '', state: '', city: '',
    website: '', linkedin: '', youtube: '', instagram: '', facebook: '',
    industry: [], domain: [], competency: [], trainerType: '',
    bio: '',
    highestQualification: '', institution: '', graduationYear: '',
    travel: '', languages: '', trainerCerts: '', experience: '',
    audience: '', fees: '',
  })

  const flash = (msg, type = 'success') => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500) }

  const handleChange = e => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    setErrors(er => ({ ...er, [name]: '' }))
  }
  const handleMulti = key => vals => setForm(f => ({ ...f, [key]: vals }))

  const validate = () => {
    const e = {}
    if (!form.name?.trim()) e.name = 'Name is required'
    if (!form.email?.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email'
    if (form.website && !/^https?:\/\//.test(form.website)) e.website = 'Must start with http:// or https://'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 900)) // replace with actual API call
    if (tempPic) setProfilePic(tempPic)
    if (tempBanner) setBannerImg(tempBanner)
    flash('Profile updated successfully!')
    setEditing(false)
    setSaving(false)
  }

  const handleCancel = () => {
    setEditing(false); setErrors({})
    setTempPic(null); setTempBanner(null)
  }

  const handlePicChange = e => {
    const f = e.target.files?.[0]; if (!f) return
    if (f.size > 5 * 1024 * 1024) { flash('Image must be under 5MB', 'error'); return }
    const reader = new FileReader()
    reader.onload = ev => setTempPic(ev.target.result)
    reader.readAsDataURL(f)
  }

  const handleBannerChange = e => {
    const f = e.target.files?.[0]; if (!f) return
    const reader = new FileReader()
    reader.onload = ev => setTempBanner(ev.target.result)
    reader.readAsDataURL(f)
  }

  const activePic    = tempPic    || profilePic
  const activeBanner = tempBanner || bannerImg
  const initials     = (form.name || 'T').split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
  const locDisplay   = [form.city, form.state, form.country].filter(Boolean).join(', ')
  const completion   = calcCompletion(form, activePic)

  const CHECKLIST = [
    { label: 'Profile photo',       done: !!activePic },
    { label: 'Phone number',        done: !!form.phone?.trim() },
    { label: 'Location set',        done: !!form.country?.trim() },
    { label: 'Subject line',        done: !!form.subjectLine?.trim() },
    { label: 'LinkedIn profile',    done: !!form.linkedin?.trim() },
    { label: 'Profile bio',         done: !!form.bio?.trim() },
    { label: 'Industry expertise',  done: form.industry?.length > 0 },
    { label: 'Experience level',    done: !!form.experience?.trim() },
    { label: 'Fees per day',        done: !!form.fees?.trim() },
  ]

  const TABS = [
    { id: 'personal',   label: 'Personal',   icon: User },
    { id: 'expertise',  label: 'Expertise',  icon: Briefcase },
    { id: 'experience', label: 'Experience', icon: TrendingUp },
    { id: 'workshops',  label: 'Workshops',  icon: BookOpen },
    { id: 'education',  label: 'Education',  icon: GraduationCap },
    { id: 'additional', label: 'Additional', icon: Award },
    { id: 'security',   label: 'Security',   icon: Shield },
  ]

  // Workshop / Award / Experience / Cert helpers
  const updEntry = (setter, idx, val) => setter(prev => { const n = [...prev]; n[idx] = val; return n })
  const addEntry = (setter, def, max = 10) => setter(prev => prev.length < max ? [...prev, { ...def }] : prev)
  const removeEntry = (setter, idx) => setter(prev => prev.filter((_, i) => i !== idx))

  return (
    <div className="tpd-page">
      <style>{CSS}</style>

      {/* TOPBAR */}
      <header className="tpd-topbar">
        <div className="tpd-brand"><span className="tpd-brand-dot"/>TopTrainer</div>
        <span className="tpd-bc">My Profile</span>
      </header>

      {/* TOAST */}
      {toast && (
        <div className={`tpd-toast ${toast.type}`}>
          {toast.type === 'success' ? <CheckCircle size={15} color="#16a34a"/> : <AlertCircle size={15} color="#dc2626"/>}
          <span>{toast.msg}</span>
          <button onClick={() => setToast(null)}><X size={12}/></button>
        </div>
      )}

      {/* HERO */}
      <div className="tpd-hero">
        <div className="tpd-inner tpd-hero-inner">

          {/* BANNER */}
          <div className="tpd-banner-wrap">
            {activeBanner ? <img src={activeBanner} alt="Banner" className="tpd-banner-img"/> : null}
            {editing && (
              <>
                <input ref={bannerFileRef} type="file" accept="image/*" onChange={handleBannerChange} style={{ display: 'none' }}/>
                <div className="tpd-banner-overlay" onClick={() => bannerFileRef.current?.click()}>
                  <Img size={16} color="#fff"/><span>Change Banner · Recommended 1200×300px</span>
                </div>
              </>
            )}
            {!editing && !activeBanner && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: 'var(--ff)', fontWeight: 700, fontSize: '.8rem', color: 'rgba(255,255,255,.6)' }}>No banner image</span>
              </div>
            )}
          </div>

          {/* HEAD ROW */}
          <div className="tpd-head">
            <div className="tpd-av-wrap">
              <div className="tpd-av">
                {activePic ? <img src={activePic} alt="Profile" onError={() => { setProfilePic(null); setTempPic(null) }}/> : initials}
              </div>
              {editing && (
                <>
                  <input ref={picFileRef} type="file" accept="image/*" onChange={handlePicChange} style={{ display: 'none' }}/>
                  <button className="tpd-av-edit" onClick={() => picFileRef.current?.click()} title="Change photo">
                    <Camera size={12} color="white"/>
                  </button>
                </>
              )}
            </div>

            <div className="tpd-headinfo">
              <h1 className="tpd-name">{form.name || 'Your Name'}</h1>
              <p className="tpd-email">{form.email || 'your@email.com'}</p>
              {form.subjectLine && <p style={{ fontSize: '.82rem', color: 'var(--ink2)', fontWeight: 600, marginBottom: 7 }}>{form.subjectLine}</p>}
              <div className="tpd-badges">
                <span className="tpd-badge tpd-badge-role"><BadgeCheck size={11}/>Trainer</span>
                <span className="tpd-badge tpd-badge-ok"><CheckCircle size={11}/>Active</span>
                {locDisplay && <span className="tpd-badge tpd-badge-loc"><MapPin size={11}/>{locDisplay}</span>}
              </div>
            </div>

            <div className="tpd-actions">
              {editing ? (
                <>
                  <button className="tpd-btn tpd-btn-ghost" onClick={handleCancel}><X size={13}/>Cancel</button>
                  <button className="tpd-btn tpd-btn-pri" onClick={handleSave} disabled={saving}>
                    {saving ? <Save size={13} className="spin"/> : <Save size={13}/>}
                    {saving ? 'Saving…' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button className="tpd-btn tpd-btn-pri" onClick={() => setEditing(true)}><Edit3 size={13}/>Edit Profile</button>
              )}
            </div>
          </div>

          {/* TAG LINE */}
          {form.tagLine && !editing && (
            <p style={{ fontSize: '.8rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: 16, paddingLeft: 4 }}>{form.tagLine}</p>
          )}

          {/* TABS */}
          <div className="tpd-tabs">
            {TABS.map(t => (
              <button key={t.id} className={`tpd-tab${tab === t.id ? ' active' : ''}`} onClick={() => setTab(t.id)}>
                <t.icon size={13}/>{t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="tpd-inner tpd-body">
        <div className="tpd-grid">

          {/* MAIN COLUMN */}
          <div>
            {Object.keys(errors).length > 0 && (
              <div className="tpd-errbox">
                <AlertCircle size={14} color="#dc2626" style={{ marginTop: 1, flexShrink: 0 }}/>
                <div>{Object.values(errors).map((err, i) => <p key={i}>{err}</p>)}</div>
              </div>
            )}

            {/* ── PERSONAL TAB ── */}
            {tab === 'personal' && (
              <>
                {/* Identity */}
                <Sec icon={User} title="Identity & Branding" sub="Your name, title and professional headline">
                  <div className="g2">
                    <TField label="Full Name"    icon={User}      name="name"        value={form.name}        onChange={handleChange} editing={editing} error={errors.name} placeholder="Your full name"/>
                    <TField label="Company Name" icon={Building2} name="companyName" value={form.companyName} onChange={handleChange} editing={editing} placeholder="Your company / org name"/>
                    <div className="sp2">
                      <TField label="Subject Line" icon={Star} name="subjectLine" value={form.subjectLine} onChange={handleChange} editing={editing} placeholder="e.g. Senior Corporate Trainer | Leadership & Sales Expert"/>
                    </div>
                    <div className="sp2">
                      <TField label="Tag Line" icon={Sparkles} name="tagLine" value={form.tagLine} onChange={handleChange} editing={editing} placeholder="e.g. Helping leaders unlock their true potential through experiential learning."/>
                    </div>
                  </div>
                </Sec>

                {/* Contact */}
                <Sec icon={Mail} title="Contact Details" sub="How clients will reach you">
                  <div className="g3">
                    <TField label="Email Address"   icon={Mail}  name="email"    value={form.email}    onChange={handleChange} editing={editing} error={errors.email} type="email" placeholder="you@example.com"/>
                    <TField label="Mobile Number"   icon={Phone} name="phone"    value={form.phone}    onChange={handleChange} editing={editing} placeholder="+91 9034565817"/>
                    <TField label="WhatsApp Number" icon={Phone} name="whatsapp" value={form.whatsapp} onChange={handleChange} editing={editing} placeholder="+91 9034565817"/>
                    <LocationFields form={form} setForm={setForm} editing={editing}/>
                  </div>
                </Sec>

                {/* Online Presence */}
                <Sec icon={Globe} title="Online Presence" sub="Your digital footprint across platforms">
                  <div className="g2">
                    <TField label="Website / Portfolio" icon={Globe}      name="website"   value={form.website}   onChange={handleChange} editing={editing} error={errors.website} placeholder="https://yourwebsite.com"/>
                    <TField label="LinkedIn Profile"    icon={Linkedin}   name="linkedin"  value={form.linkedin}  onChange={handleChange} editing={editing} placeholder="https://linkedin.com/in/..."/>
                    <TField label="YouTube Channel"     icon={Youtube}    name="youtube"   value={form.youtube}   onChange={handleChange} editing={editing} placeholder="https://youtube.com/@..."/>
                    <TField label="Instagram Handle"    icon={Instagram}  name="instagram" value={form.instagram} onChange={handleChange} editing={editing} placeholder="https://instagram.com/..."/>
                    <TField label="Facebook Page"       icon={Facebook}   name="facebook"  value={form.facebook}  onChange={handleChange} editing={editing} placeholder="https://facebook.com/..."/>
                  </div>
                </Sec>

                {/* Profile Summary & Documents */}
                <Sec icon={FileText} title="Profile Summary & Documents" sub="Your story and supporting materials">
                  <div className="g1">
                    <TAField label="Profile Summary" icon={FileText} name="bio" value={form.bio} onChange={handleChange} editing={editing} placeholder="Briefly describe your training background, achievements, and what makes you unique…"/>
                  </div>
                  {editing && (
                    <div className="g3" style={{ marginTop: 16 }}>
                      <div>
                        <div className="tpd-label" style={{ marginBottom: 5 }}><span className="tpd-label-ico"><Upload size={11}/></span>Upload Profile (PDF)</div>
                        <div className="up-zone">
                          <input type="file" accept="application/pdf" onChange={e => setProfileFiles(Array.from(e.target.files || []))}/>
                          <div className="up-zone-ico"><FileText size={16}/></div>
                          <div className="up-zone-t">Click or drag</div>
                          <div className="up-zone-s">PDF only · Max 5MB</div>
                        </div>
                        <div>{profileFiles.map((f, i) => <span className="file-chip" key={i}><CheckCircle size={10}/>{f.name}</span>)}</div>
                      </div>
                      <div>
                        <div className="tpd-label" style={{ marginBottom: 5 }}><span className="tpd-label-ico"><Award size={11}/></span>Upload Certificates</div>
                        <div className="up-zone">
                          <input type="file" multiple accept="image/*,application/pdf" onChange={e => setCertFiles(Array.from(e.target.files || []))}/>
                          <div className="up-zone-ico"><Award size={16}/></div>
                          <div className="up-zone-t">Click or drag</div>
                          <div className="up-zone-s">PDF, JPG, PNG · Multiple</div>
                        </div>
                        <div>{certFiles.map((f, i) => <span className="file-chip" key={i}><CheckCircle size={10}/>{f.name}</span>)}</div>
                      </div>
                      <div>
                        <div className="tpd-label" style={{ marginBottom: 5 }}><span className="tpd-label-ico"><Camera size={11}/></span>Gallery Photos</div>
                        <div className="up-zone">
                          <input type="file" multiple accept="image/*" onChange={e => {
                            const files = Array.from(e.target.files || [])
                            setGalleryURLs(files.map(f => URL.createObjectURL(f)))
                          }}/>
                          <div className="up-zone-ico"><ImageIcon size={16}/></div>
                          <div className="up-zone-t">Click or drag photos</div>
                          <div className="up-zone-s">JPG, PNG, WEBP · Multiple</div>
                        </div>
                        {galleryURLs.length > 0 && (
                          <div className="ph-previews">{galleryURLs.map((url, i) => <img key={i} src={url} alt="" className="ph-thumb"/>)}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Video URLs */}
                  <div style={{ marginTop: 18, borderTop: '1.5px solid #eef2ff', paddingTop: 15 }}>
                    <div className="tpd-label" style={{ marginBottom: 9 }}>
                      <span className="tpd-label-ico"><Video size={11}/></span>Video URLs
                      <span style={{ color: '#94a3b8', fontWeight: 400, marginLeft: 4 }}>· Add up to 10 video links</span>
                    </div>
                    {videoURLs.map((url, i) => (
                      <div className="vid-url-row" key={i}>
                        <span className="vid-url-num">{i + 1}</span>
                        {editing ? (
                          <>
                            <div className="tpd-inp-wrap" style={{ flex: 1 }}>
                              <div className="tpd-inp-ico"><Link size={13}/></div>
                              <input type="url" className="tpd-inp" placeholder="https://youtube.com/watch?v=…" value={url} onChange={e => setVideoURLs(prev => { const n = [...prev]; n[i] = e.target.value; return n })}/>
                            </div>
                            {i > 0 && (
                              <button type="button" onClick={() => setVideoURLs(prev => prev.filter((_, idx) => idx !== i))}
                                className="entry-rm"><Trash2 size={11}/> Remove</button>
                            )}
                          </>
                        ) : (
                          <p className={`tpd-view${url ? '' : ' empty'}`} style={{ flex: 1 }}>{url || 'No URL added'}</p>
                        )}
                      </div>
                    ))}
                    {editing && videoURLs.length < 10 && (
                      <button type="button" className="add-entry-btn" onClick={() => setVideoURLs(prev => [...prev, ''])}>
                        <Plus size={13}/> Add Another Video URL ({videoURLs.length}/10)
                      </button>
                    )}
                  </div>
                </Sec>
              </>
            )}

            {/* ── EXPERTISE TAB ── */}
            {tab === 'expertise' && (
              <Sec icon={Briefcase} title="Expertise & Domain" sub="Select all that apply — multiple choices allowed">
                <div className="g2">
                  <MultiSelect label="Industry & Sector Expertise"      icon={Briefcase} options={OPTS.industry}    value={form.industry}    onChange={handleMulti('industry')}    disabled={!editing}/>
                  <MultiSelect label="Domain & Departmental Expertise"  icon={Target}    options={OPTS.domain}      value={form.domain}      onChange={handleMulti('domain')}      disabled={!editing}/>
                  <MultiSelect label="Competency Expertise"             icon={Star}      options={OPTS.competency}  value={form.competency}  onChange={handleMulti('competency')}  disabled={!editing}/>
                  <SelField    label="Trainer Type"                     icon={UserPlus}  name="trainerType" options={OPTS.trainerType} value={form.trainerType} onChange={handleChange} editing={editing}/>
                </div>
              </Sec>
            )}

            {/* ── EXPERIENCE TAB ── */}
            {tab === 'experience' && (
              <>
                <Sec icon={Trophy} title="Awards & Recognition" sub={`Showcase your achievements · ${awards.length} added`}>
                  {awards.map((data, idx) => (
                    <AwardEntry key={idx} num={idx + 1} data={data} onChange={val => updEntry(setAwards, idx, val)} onRemove={() => removeEntry(setAwards, idx)} editing={editing}/>
                  ))}
                  {editing && awards.length < 10 && (
                    <button type="button" className="add-entry-btn" onClick={() => addEntry(setAwards, { title: '', org: '', year: '', category: '', desc: '' })}>
                      <Plus size={14}/> Add Another Award ({awards.length}/10)
                    </button>
                  )}
                </Sec>

                <Sec icon={Briefcase} title="Professional Experience" sub={`Your career journey · ${experiences.length} added`}>
                  {experiences.map((data, idx) => (
                    <ExperienceEntry key={idx} num={idx + 1} data={data} onChange={val => updEntry(setExperiences, idx, val)} onRemove={() => removeEntry(setExperiences, idx)} editing={editing}/>
                  ))}
                  {editing && experiences.length < 10 && (
                    <button type="button" className="add-entry-btn" onClick={() => addEntry(setExperiences, { title: '', org: '', startYear: '', endYear: '', empType: '', industry: '', desc: '' })}>
                      <Plus size={14}/> Add Another Experience ({experiences.length}/10)
                    </button>
                  )}
                </Sec>
              </>
            )}

            {/* ── WORKSHOPS TAB ── */}
            {tab === 'workshops' && (
              <Sec icon={BookOpen} title="Workshop Details" sub={`Add up to 15 workshops · ${workshops.length} added`}>
                {workshops.map((data, idx) => (
                  <WorkshopEntry key={idx} num={idx + 1} data={data} onChange={val => updEntry(setWorkshops, idx, val)} onRemove={() => removeEntry(setWorkshops, idx)} editing={editing}/>
                ))}
                {editing && workshops.length < 15 && (
                  <button type="button" className="add-entry-btn" onClick={() => addEntry(setWorkshops, { company: '', title: '', duration: '', location: '', participants: '', industry: '', domain: '', competency: '', summary: '', photos: [null, null, null] }, 15)}>
                    <Plus size={14}/> Add Another Workshop ({workshops.length}/15)
                  </button>
                )}
              </Sec>
            )}

            {/* ── EDUCATION TAB ── */}
            {tab === 'education' && (
              <Sec icon={GraduationCap} title="Educational Milestones" sub="Your academic qualifications and certifications">
                <div className="g3" style={{ marginBottom: 18 }}>
                  <TField label="Highest Qualification" icon={GraduationCap} name="highestQualification" value={form.highestQualification} onChange={handleChange} editing={editing} placeholder="e.g. MBA, B.Tech, PhD…"/>
                  <TField label="Institution / University" icon={Building2} name="institution" value={form.institution} onChange={handleChange} editing={editing} placeholder="e.g. IIM Ahmedabad…"/>
                  <TField label="Year of Completion" icon={Star} name="graduationYear" value={form.graduationYear} onChange={handleChange} editing={editing} placeholder="e.g. 2012"/>
                </div>

                <div style={{ borderTop: '1.5px solid #eef2ff', paddingTop: 16 }}>
                  <div className="tpd-label" style={{ marginBottom: 13, fontSize: '.78rem' }}>
                    <span className="tpd-label-ico"><Award size={13}/></span>
                    Certifications & Additional Qualifications
                    <span style={{ color: '#94a3b8', fontWeight: 400, marginLeft: 4 }}>· Add up to 10</span>
                  </div>
                  {certEntries.map((data, idx) => (
                    <CertEntry key={idx} num={idx + 1} data={data} onChange={val => updEntry(setCertEntries, idx, val)} onRemove={() => removeEntry(setCertEntries, idx)} editing={editing}/>
                  ))}
                  {editing && certEntries.length < 10 && (
                    <button type="button" className="add-entry-btn" onClick={() => addEntry(setCertEntries, { name: '', org: '', year: '' })}>
                      <Plus size={14}/> Add Another Certificate ({certEntries.length}/10)
                    </button>
                  )}
                </div>
              </Sec>
            )}

            {/* ── ADDITIONAL TAB ── */}
            {tab === 'additional' && (
              <>
                <Sec icon={Award} title="Additional Details" sub="Your credentials, reach and fees">
                  <div className="g2">
                    <SelField label="Open to Travel for Workshop"    icon={Plane}       name="travel"       options={OPTS.travel}       value={form.travel}       onChange={handleChange} editing={editing}/>
                    <SelField label="Languages Fluent"               icon={Languages}   name="languages"    options={OPTS.languages}    value={form.languages}    onChange={handleChange} editing={editing}/>
                    <SelField label="Trainer Certifications"         icon={Award}       name="trainerCerts" options={OPTS.trainerCerts} value={form.trainerCerts} onChange={handleChange} editing={editing}/>
                    <SelField label="Training & Workshop Experience" icon={TrendingUp}  name="experience"   options={OPTS.experience}   value={form.experience}   onChange={handleChange} editing={editing}/>
                    <SelField label="Audience & Seniority Level"     icon={Users}       name="audience"     options={OPTS.audience}     value={form.audience}     onChange={handleChange} editing={editing}/>
                    <SelField label="Commercials / Fees per Day"     icon={DollarSign}  name="fees"         options={OPTS.fees}         value={form.fees}         onChange={handleChange} editing={editing}/>
                  </div>
                </Sec>

                {/* Global Markets */}
                <Sec icon={Globe} title="Global Market Interest" sub="Select all international markets you serve or target">
                  {editing ? (
                    <div className="gm-list">
                      {GLOBAL_MARKETS.map((m, i) => {
                        const checked = globalMarkets.includes(m.label)
                        return (
                          <div key={i} className="gm-item" onClick={() => setGlobalMarkets(prev => checked ? prev.filter(x => x !== m.label) : [...prev, m.label])}>
                            <div className={`gm-chk-wrap${checked ? ' on' : ''}`}>
                              {checked && <svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                            </div>
                            <div style={{ flex: 1 }}>
                              <div className="gm-label">{m.label}</div>
                              <div className="gm-countries">{m.countries}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  ) : (
                    <div className="ms-vtags">
                      {globalMarkets.length ? globalMarkets.map((m, i) => <span key={i} className="ms-vtag">{m}</span>)
                        : <span className="ms-vtag empty">No markets selected</span>}
                    </div>
                  )}
                </Sec>
              </>
            )}

            {/* ── SECURITY TAB ── */}
            {tab === 'security' && (
              <div className="tpd-card">
                <div className="tpd-card-hd">
                  <div className="tpd-card-icon"><Shield size={16}/></div>
                  <div>
                    <div className="tpd-card-title">Password & Security</div>
                    <div className="tpd-card-sub">Keep your account safe with a strong password</div>
                  </div>
                </div>
                <p style={{ fontSize: '.82rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 14 }}>
                  We recommend updating your password periodically and using a mix of uppercase, lowercase, numbers and symbols.
                </p>
                <PasswordSection/>
              </div>
            )}
          </div>

          {/* ── SIDEBAR ── */}
          <div className="tpd-sidebar-col">

            {/* Completion */}
            <div className="tpd-side-card">
              <p className="tpd-side-title">Profile Completeness</p>
              <div className="tpd-ring-wrap">
                <Ring pct={completion.pct}/>
                <div>
                  <div className="tpd-ring-pct">{completion.pct}%</div>
                  <div className="tpd-ring-sub">
                    {completion.pct >= 100 ? 'Profile complete!' : `${completion.total - completion.done} items left`}
                  </div>
                </div>
              </div>
              <div className="tpd-checklist">
                {CHECKLIST.map(({ label, done }, i) => (
                  <div key={i} className={`tpd-chk-item${done ? ' done' : ''}`}>
                    <span className={`tpd-chk-ico ${done ? 'done' : 'todo'}`}><CheckCircle size={10}/></span>
                    {label}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick jump */}
            <div className="tpd-side-card">
              <p className="tpd-side-title">Sections</p>
              {TABS.map(t => (
                <div key={t.id} className="tpd-info-row" style={{ cursor: 'pointer' }} onClick={() => setTab(t.id)}>
                  <span className="lbl"><t.icon size={12}/>{t.label}</span>
                  <ChevronDown size={11} style={{ transform: 'rotate(-90deg)', color: 'var(--light)' }}/>
                </div>
              ))}
            </div>

            {/* Pro Tip */}
            <div className="tpd-side-card" style={{ background: 'linear-gradient(135deg,#f0f9ff,#eff6ff,#f5f3ff)', border: '1px solid rgba(29,78,216,.14)' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <Sparkles size={16} color="var(--blue)" style={{ flexShrink: 0, marginTop: 2 }}/>
                <div>
                  <p style={{ fontFamily: 'var(--ff)', fontWeight: 700, fontSize: '.88rem', color: 'var(--ink)', marginBottom: 4 }}>Pro Tip</p>
                  <p style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.65 }}>
                    Trainers with filled expertise tags, experience level and fees per day get 3× more discovery requests.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}