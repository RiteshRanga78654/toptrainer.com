// "use client";
// import Image from "next/image";
// import { useState } from "react";

// import {
//   UserPlus,
//   Sparkles,
//   Target,
//   TrendingUp,
//   CloudUpload,
//   Users,
// } from "lucide-react";


// export default function JoinTrainee() {
//   const [files, setFiles] = useState([]);
//   const [profilePic, setProfilePic] = useState(null);

//  const [cvFiles, setCvFiles] = useState([]);
// const [certificateFiles, setCertificateFiles] = useState([]);

// const handleCVUpload = (e) => {
//   const files = Array.from(e.target.files || []);
//   setCvFiles(files);
// };

// const handleCertificateUpload = (e) => {
//   const files = Array.from(e.target.files || []);
//   setCertificateFiles(files);
// };

//   const handleProfilePic = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfilePic(URL.createObjectURL(file));
//     }
//   };


//   return (
//     <div className="h-screen w-full flex">
     
//       {/* LEFT SECTION */}
//         <div className="w-1/4 h-screen  sticky top-0 bg-gradient-to-b from-blue-900 to-blue-600 to-blue-800 text-white p-8 flex flex-col ">
      
//       {/* Top Section */}
//       <div>
//         {/* Logo */}
//         <div className="flex items-center gap-2 mb-12">
//           <Sparkles size={28} />
//           <h1 className="text-xl font-semibold">Top<span className="text-blue-300">Trainer</span></h1>
//         </div>

//         {/* Button */}
//         <div className="flex items-center gap-1 bg-blue-900  px-2 py-1 rounded-full text-sm  mb-3">
//           <UserPlus size={16} />
//           JOIN AS A TRAINER
//         </div>

//         {/* Heading */}
//         <h2 className="text-3xl font-bold  leading-snug mb-3">
//           Build Your Profile.
//           <br />
//           Share Your Expertise.
//           <br />
//           <span className="text-blue-200">Grow Your Impact.</span>
//         </h2>

//         {/* Description */}
//         <p className="text-sm text-white mb-8">
//           TopTrainer helps you connect with organizations and individuals
//           looking for professional guidance and training.
//         </p>

//         {/* Features */}
//         <div className="space-y-4">
//           <div className="flex gap-2">
//             <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
//               <Sparkles size={18} />
//             </div>
//             <div>
//               <h4 className="font-semibold">Showcase Your Expertise</h4>
//               <p className="text-sm text-blue-100">
//                 Highlight your skills, experience and <br/>areas of training.
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <div className="w-14 h-10 flex items-center justify-center rounded-full bg-white/10">
//               <Target size={18} />
//             </div>
//             <div>
//               <h4 className="font-semibold">Reach The Right People</h4>
//               <p className="text-sm text-blue-100">
//                 Get discovered by clients and organizations searching for the
//                 right trainer.
//               </p>
//             </div>
//           </div>

//           <div className="flex gap-2">
//             <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
//               <TrendingUp size={18} />
//             </div>
//             <div>
//               <h4 className="font-semibold">Grow Your Business</h4>
//               <p className="text-sm text-blue-100">
//                 Build your brand, expand your network <br/>and grow your
//                 opportunities.
//               </p>
//             </div>
//           </div>

         
//         </div>
//       </div>

//       {/* Bottom Card */}
//       <div className="bg-white/10 p-3 rounded-xl mt-5">
//         <div className="flex items-center gap-3 mb-2">
//           <div className="bg-white/20 p-2 rounded-full">
//             <Users size={18} />
//           </div>
//           <h4 className="font-semibold">
//             Empowering Trainers To <br/>Inspire Growth
//           </h4>
//         </div>
       
//       </div>
//     </div>

//       {/* RIGHT SECTION */}
//       <div className="w-3/4 h-screen overflow-y-auto bg-white text-black p-10">
//         <h2 className="text-2xl font-bold mb-2">Trainee Profile Information</h2>
//         <p className="mb-10">Please fill in all the details carefully.</p>

//         {/* PROFILE PIC */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-6">

//   {/* LEFT - Profile Pic */}
//   <div className="flex items-center gap-6">
//     <div className="w-24 h-24 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
//       {profilePic ? (
//         <Image src={profilePic} alt="Profile" width={96} height={96} className="object-cover" />
//       ) : (
//         <span className="text-gray-400 text-sm">Preview</span>
//       )}
//     </div>

//     <div>
//       <p className="font-semibold text-gray-700">Upload Profile Picture</p>
//       <p className="text-sm text-gray-500">Max size 5MB</p>

//       <input
//         type="file"
//         id="profileUpload"
//         accept="image/png, image/jpeg, image/webp"
//         onChange={handleProfilePic}
//         className="hidden"
//       />

//       <label
//         htmlFor="profileUpload"
//         className="inline-block mt-2 px-4 py-2 bg-white text-blue-600 border border-blue-600 rounded-md cursor-pointer hover:bg-blue-700 hover:text-white transition"
//       >
//         Choose File
//       </label>
//     </div>
//   </div>

//   {/* RIGHT - Name Input */}
//   <Input label="Name " placeholder="Enter your full name" />

// </div>

//         <form className="grid grid-cols-1 md:grid-cols-2 gap-6">

//           <Input label="E-mail" placeholder="Enter your E-mail" />
//           <Input label="WhatsApp Phone Number " placeholder="Enter phone number" />

//           <Input 
//             label="Website Link" 
//             placeholder="Paste your portfolio link"
//           />
//           <Input 
//             label="LinkedIn Link" 
//             placeholder="Paste your LinkedIn link"
//           />
//            <Input 
//             label="YouTube Link" 
//             placeholder="Paste your youtube link"
//           />
//           <Input 
//             label="Instagram Link" 
//             placeholder="Paste your Social instagram link"
//           />
//           <Input 
//             label="Facebook Link" 
//             placeholder="Paste your facebook link"
//           />
           

//           <Select label="Industry & Sector Expertise" options={[
//             "Real Estate","IT & Digital","Media & Entertainment","Banking & Finance",
//             "Telecommunications","Hospitality & Aviation","Healthcare & Pharma",
//             "Education Sector","Retail Industry","Automobile","Jewellery","FMCG","Other"
//           ]} />

//           <Select label="Domain & Departmental Expertise" options={[
//             "Logistics & Operations","Soft Skills Development","Sales & Business Development",
//             "Leadership Transformation","International Market Expansion",
//             "Customer Service Excellence","Branding & Communications","Other"
//           ]} />

//           <Select label="Competency Expertise" options={[
//             "AI Tools & Generative AI","Strategic Thinking","Communication & Narrative Building",
//             "Multitasking Ability","Team Building & Management","Innovation",
//             "Big Picture Thinking","Time Management","Other"
//           ]} />

//           <Textarea label="CV or Profile Summary" placeholder="Write or upload your summary..." />

//           {/* FILE UPLOAD */}
//      {/* Upload CV */}
// <div>
//   <label className="font-semibold text-gray-700">Upload CV</label>
//   <input 
//     type="file"
//     id="CV upload"
//     accept="application/pdf"
//     onChange={handleCVUpload}
//     className="mt-2 w-full border border-gray-300 bg-gray-50 p-3 rounded-md "
//   />
   

//   {cvFiles.length > 0 && (
//     <ul className="mt-3 text-sm text-gray-700 list-disc ml-5">
//       {cvFiles.map((file, i) => (
//         <li key={i}>{file.name}</li>
//       ))}
//     </ul>
//   )}
// </div>


// {/* Upload Certificates */}
// <div>
//   <label className="font-semibold text-gray-700">Upload Certificates</label>
//   <input 
//     type="file"
//     multiple
//     accept="image/*,application/pdf"
//     onChange={handleCertificateUpload}
//     className="mt-2 w-full border border-gray-300 bg-gray-50 p-3 rounded-md"
//   />

//   {certificateFiles.length > 0 && (
//     <ul className="mt-3 text-sm text-gray-700 list-disc ml-5">
//       {certificateFiles.map((file, i) => (
//         <li key={i}>{file.name}</li>
//       ))}
//     </ul>
//   )}
// </div>
            

           
//           <Input label="City " placeholder="Enter your city" />
// <Input label="State" placeholder="Enter your state" />
//           <Textarea 
//             label="Details of recent workshop done" 
//             placeholder="Mention number of days, attendees, etc."
//           />

//           <Select label="Open to Travel for Workshop" options={[
//             "Within City","Within State","Upto 50kms","Zonal Travel Only","PAN India","Global Trainer"
//           ]} />

//           <Select label="Languages Fluent" options={["Hindi","English","Other"]} 
//           /> 

//           <Select label="Trainer Certifications" options={[
//             "ICF Certified Coach","POSH Trainer","Technical Skills Certified","Other"
//           ]} />

//           <Select label="Training & Workshop Experience" options={[
//             "15 years and above","10 - 15 years","5 - 10 years","2 - 5 years","Emerging Trainer"
//           ]} />

//           <Select label="Trainer Type" options={[
//             "Faculty / Professor","Business Consultant","Motivational Speaker",
//             "Life Coach","Industry Trainers","Technical / Digital Trainer",
//             "Personality Coach","Behavioral Trainer","Executive Coach","Other"
//           ]} />

//           <Select label="Audience & Seniority Level" options={[
//             "Freshers & Students","New Joinees","Entry Level","Mid-level Management",
//             "CXOs & Leadership","Entrepreneurs & Founders","Staff Level","Other"
//           ]} />

//           <Select label="International Market Knowledge" options={[
//             "Asian Market","South East Asia","Middle East","Australia & New Zealand",
//             "US & Canada","UK & Europe"
//           ]} />

//           <Select label="Commercials / Fees per day *" options={[
//             "Upto ₹15,000","₹15,000 - ₹30,000","₹30,000 - ₹50,000",
//             "₹50,000 - ₹1,00,000","₹1,00,000 and above"
//           ]} />

//          <div className="md:col-span-2 flex justify-center">
//   <button
//     type="submit"
//     className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:text-white transition"
//   >
//     Create Profile
//   </button>
// </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// /* COMPONENTS */

// function Input({ label, placeholder }) {
//   return (
//     <div>
//       <label className="font-semibold text-gray-700">{label}</label>
//       <input 
//         type="text" 
//         placeholder={placeholder}
//         className="w-full mt-1 border border-gray-300 bg-gray-50 p-3 rounded-md 
//         focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

// function Textarea({ label, placeholder }) {
//   return (
//     <div className="md:col-span-2">
//       <label className="font-semibold text-gray-700">{label}</label>
//       <textarea 
//         placeholder={placeholder}
//         className="w-full mt-1 border border-gray-300 bg-gray-50 p-3 rounded-md h-28
//         focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

// function Select({ label, options }) {
//   return (
//     <div>
//       <label className="font-semibold text-gray-700">{label}</label>
//       <select className="w-full mt-1 border border-gray-300 bg-gray-50 p-3 rounded-md
//       focus:outline-none focus:ring-2 focus:ring-blue-500">
//         <option>Select an option</option>
//         {options.map((op, i) => (
//           <option key={i}>{op}</option>
//         ))}
//       </select>
//     </div>
//   );
// }

// function Feature({ text }) {
//   return (
//     <div className="flex items-center space-x-2">
//       <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
//       <p>{text}</p>
//     </div>
//   );
// }



"use client";
import Image from "next/image";
import { useState } from "react";
import {
  UserPlus, Sparkles, Target, TrendingUp, Users,
  Mail, Phone, Globe, Linkedin, Youtube, Instagram,
  Facebook, MapPin, Briefcase, Award, BookOpen,
  DollarSign, Plane, Languages, Star,
  Upload, FileText, CheckCircle
} from "lucide-react";

/* ─── STYLES ─────────────────────────────────────────── */
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .tt-wrap {
    display: flex;
    height: 100vh;
    width: 100%;
    font-family: 'Inter', sans-serif;
    background: #eef2ff;
  }

  /* ══ SIDEBAR FIXED ══ */
  .tt-sidebar {
    width: 290px;
    min-width: 290px;
    height: 100vh;
    position: fixed;
    top: 0; left: 0;
    background: linear-gradient(160deg, #1d4ed8 0%, #1e3a8a 55%, #312e81 100%);
    display: flex;
    flex-direction: column;
    padding: 26px 22px;
    overflow: hidden;
    z-index: 50;
  }
  .tt-sidebar::before {
    content:''; position:absolute; top:-70px; right:-60px;
    width:210px; height:210px; border-radius:50%;
    background:rgba(255,255,255,0.06);
    animation: orbFloat 7s ease-in-out infinite;
  }
  .tt-sidebar::after {
    content:''; position:absolute; bottom:30px; left:-55px;
    width:170px; height:170px; border-radius:50%;
    background:rgba(99,102,241,0.16);
    animation: orbFloat 9s ease-in-out infinite reverse;
  }
  @keyframes orbFloat {
    0%,100%{ transform:translateY(0) scale(1); }
    50%{ transform:translateY(-16px) scale(1.05); }
  }

  .sb-logo {
    display:flex; align-items:center; gap:9px;
    margin-bottom:20px; position:relative; z-index:2;
  }
  .sb-logo-icon {
    background:rgba(255,255,255,0.15); border:1px solid rgba(255,255,255,0.2);
    border-radius:10px; padding:6px; display:flex;
  }
  .sb-logo-text {
    font-family:'Plus Jakarta Sans',sans-serif;
    font-weight:800; font-size:1.22rem; color:#fff; letter-spacing:-0.3px;
  }
  .sb-logo-text span{ color:#93c5fd; }

  .sb-badge {
    display:inline-flex; align-items:center; gap:5px;
    background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.18);
    padding:4px 11px; border-radius:999px;
    font-size:0.62rem; font-weight:700; letter-spacing:1.3px; color:#bfdbfe;
    margin-bottom:14px; position:relative; z-index:2;
    animation:fadeUp .5s ease both;
  }
  .sb-heading {
    font-family:'Plus Jakarta Sans',sans-serif;
    font-weight:800; font-size:1.48rem; line-height:1.27;
    letter-spacing:-0.3px; color:#fff; margin-bottom:9px;
    position:relative; z-index:2;
    animation:fadeUp .55s ease .1s both;
  }
  .sb-heading span{ color:#bfdbfe; }
  .sb-desc {
    font-size:0.76rem; color:rgba(191,219,254,0.8); line-height:1.65;
    margin-bottom:20px; position:relative; z-index:2;
    animation:fadeUp .55s ease .2s both;
  }
  .sb-features { display:flex; flex-direction:column; gap:13px; position:relative; z-index:2; flex:1; }
  .sb-feat {
    display:flex; gap:10px; align-items:flex-start;
    transition:transform .2s; animation:fadeUp .55s ease both;
  }
  .sb-feat:hover{ transform:translateX(5px); }
  .sb-feat-icon {
    min-width:33px; height:33px; border-radius:9px;
    background:rgba(255,255,255,0.1); border:1px solid rgba(255,255,255,0.13);
    display:flex; align-items:center; justify-content:center;
  }
  .sb-feat-title {
    font-family:'Plus Jakarta Sans',sans-serif;
    font-weight:700; font-size:0.8rem; color:#fff; margin-bottom:2px;
  }
  .sb-feat-desc { font-size:0.7rem; color:rgba(191,219,254,0.78); line-height:1.44; }
  .sb-bottom {
    background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.13);
    border-radius:12px; padding:12px 13px;
    display:flex; align-items:center; gap:10px;
    position:relative; z-index:2; margin-top:14px;
    animation:fadeUp .55s ease .5s both;
  }
  .sb-bottom-icon{ background:rgba(255,255,255,0.12); border-radius:9px; padding:6px; display:flex; }
  .sb-bottom-title{ font-family:'Plus Jakarta Sans',sans-serif; font-weight:700; font-size:0.8rem; color:#fff; }
  .sb-bottom-sub{ font-size:0.68rem; color:rgba(191,219,254,0.74); margin-top:1px; }

  @keyframes fadeUp {
    from{ opacity:0; transform:translateY(13px); }
    to{ opacity:1; transform:translateY(0); }
  }

  /* ══ MAIN SCROLL AREA ══ */
  .tt-main {
    margin-left: 290px;
    width: calc(100% - 290px);
    height: 100vh;
    overflow-y: auto;
    background: #eef2ff;
    padding: 32px 38px 60px;
  }
  .tt-main::-webkit-scrollbar{ width:5px; }
  .tt-main::-webkit-scrollbar-track{ background:transparent; }
  .tt-main::-webkit-scrollbar-thumb{ background:#c7d2fe; border-radius:99px; }

  /* ══ FORM HEADER ══ */
  .form-header-inner {
    display:flex; align-items:center; gap:14px;
    background:linear-gradient(135deg,#1d4ed8,#4338ca);
    padding:18px 22px; border-radius:16px;
    box-shadow:0 6px 26px rgba(29,78,216,0.28);
    margin-bottom:20px;
  }
  .form-header-icon {
    background:rgba(255,255,255,0.14); border-radius:11px;
    padding:9px; display:flex;
  }
  .form-header-title {
    font-family:'Plus Jakarta Sans',sans-serif;
    font-weight:800; font-size:1.42rem; color:#fff; letter-spacing:-0.3px;
  }
  .form-header-sub{ font-size:0.76rem; color:rgba(191,219,254,0.85); margin-top:2px; }

  /* ══ PROFILE PIC CARD ══ */
  .pic-card {
    background:linear-gradient(135deg,#eff6ff,#eef2ff);
    border:1.5px dashed #93c5fd; border-radius:15px;
    padding:18px; display:flex; align-items:center; gap:16px;
    margin-bottom:16px; transition:border-color .2s;
  }
  .pic-card:hover{ border-color:#3b82f6; }
  .pic-preview {
    width:76px; height:76px; min-width:76px; border-radius:13px;
    border:2.5px solid #bfdbfe; background:#dbeafe;
    display:flex; align-items:center; justify-content:center;
    overflow:hidden; box-shadow:0 4px 13px rgba(29,78,216,0.16);
    transition:transform .2s;
  }
  .pic-preview:hover{ transform:scale(1.04); }
  .pic-info-title {
    font-family:'Plus Jakarta Sans',sans-serif;
    font-weight:700; font-size:0.86rem; color:#1e3a8a;
  }
  .pic-info-sub{ font-size:0.7rem; color:#94a3b8; margin-top:3px; }
  .choose-btn {
    display:inline-flex; align-items:center; gap:5px; margin-top:7px;
    padding:6px 13px; background:#fff; color:#1d4ed8;
    border:1.5px solid #1d4ed8; border-radius:8px;
    font-size:0.72rem; font-weight:700;
    font-family:'Plus Jakarta Sans',sans-serif; cursor:pointer; transition:all .2s;
  }
  .choose-btn:hover{
    background:#1d4ed8; color:#fff;
    transform:translateY(-1px); box-shadow:0 4px 13px rgba(29,78,216,0.26);
  }

  /* ══ SECTION CARD ══ */
  .sec-card {
    background:#fff; border-radius:15px;
    border:1px solid #e8eeff;
    box-shadow:0 2px 10px rgba(29,78,216,0.055);
    padding:20px 22px; margin-bottom:15px;
    animation:cardIn .4s ease both;
  }
  @keyframes cardIn {
    from{ opacity:0; transform:translateY(8px); }
    to{ opacity:1; transform:translateY(0); }
  }
  .sec-header {
    display:flex; align-items:center; gap:10px;
    margin-bottom:18px; padding-bottom:13px;
    border-bottom:1.5px solid #eef2ff;
  }
  .sec-icon-wrap {
    width:34px; height:34px; border-radius:9px;
    display:flex; align-items:center; justify-content:center;
    background:linear-gradient(135deg,#dbeafe,#e0e7ff); color:#1d4ed8;
  }
  .sec-title {
    font-family:'Plus Jakarta Sans',sans-serif;
    font-weight:700; font-size:0.89rem; color:#1e3a8a; letter-spacing:-0.1px;
  }
  .sec-sub{ font-size:0.7rem; color:#94a3b8; margin-top:1px; }

  /* ══ FIELD GRID ══ */
  .field-grid{ display:grid; grid-template-columns:1fr 1fr; gap:13px 16px; }
  .col-2{ grid-column:1/-1; }

  /* ══ FIELD ══ */
  .tt-field{ display:flex; flex-direction:column; gap:4px; }
  .tt-label {
    font-family:'Plus Jakarta Sans',sans-serif;
    font-weight:600; font-size:0.7rem; color:#374151;
    letter-spacing:0.25px; display:flex; align-items:center; gap:4px;
  }
  .tt-label-icon{ color:#6366f1; display:flex; }
  .tt-input-wrap{ position:relative; }
  .tt-input-icon {
    position:absolute; left:10px; top:50%; transform:translateY(-50%);
    color:#94a3b8; pointer-events:none; display:flex;
  }
  .tt-input {
    width:100%; background:#f8faff;
    border:1.5px solid #e2e8f0; border-radius:9px;
    padding:9px 11px 9px 34px;
    font-size:0.81rem; color:#1e293b; font-family:'Inter',sans-serif;
    transition:border-color .2s, box-shadow .2s, background .2s;
    outline:none; appearance:none;
  }
  .tt-input.no-icon{ padding-left:11px; }
  .tt-input:focus{
    border-color:#3b82f6; box-shadow:0 0 0 3px rgba(59,130,246,0.13); background:#fff;
  }
  .tt-input:hover:not(:focus){ border-color:#a5b4fc; background:#fff; }
  textarea.tt-input{ height:92px; resize:none; }
  select.tt-input{
    background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat:no-repeat; background-position:right 10px center;
    cursor:pointer; padding-right:26px;
  }

  /* ══ UPLOAD ZONE ══ */
  .upload-zone {
    border:1.5px dashed #93c5fd; border-radius:10px; background:#f8faff;
    padding:15px; text-align:center; cursor:pointer;
    transition:all .2s; position:relative; overflow:hidden;
  }
  .upload-zone:hover{ border-color:#3b82f6; background:#eff6ff; }
  .upload-zone input[type=file]{
    position:absolute; inset:0; opacity:0; cursor:pointer; width:100%; height:100%;
  }
  .upload-zone-icon{
    width:36px; height:36px; border-radius:9px;
    background:linear-gradient(135deg,#dbeafe,#e0e7ff);
    display:flex; align-items:center; justify-content:center;
    margin:0 auto 7px; color:#1d4ed8;
  }
  .upload-zone-title{
    font-family:'Plus Jakarta Sans',sans-serif;
    font-weight:700; font-size:0.76rem; color:#1e3a8a; margin-bottom:2px;
  }
  .upload-zone-sub{ font-size:0.65rem; color:#94a3b8; }
  .file-chip {
    display:inline-flex; align-items:center; gap:4px;
    background:#eff6ff; border:1px solid #bfdbfe; border-radius:6px;
    padding:3px 8px; font-size:0.68rem; color:#1d4ed8; font-weight:500;
    margin-top:5px; margin-right:4px;
  }

  /* ══ SUBMIT ══ */
  .submit-wrap{ display:flex; justify-content:center; padding-top:6px; }
  .submit-btn {
    display:inline-flex; align-items:center; gap:8px;
    background:linear-gradient(135deg,#1d4ed8,#4f46e5);
    color:#fff; padding:13px 34px; border-radius:12px;
    font-family:'Plus Jakarta Sans',sans-serif;
    font-weight:700; font-size:0.92rem; letter-spacing:0.2px;
    border:none; cursor:pointer; position:relative; overflow:hidden;
    box-shadow:0 6px 22px rgba(29,78,216,0.35);
    transition:all .25s ease;
  }
  .submit-btn::before{
    content:''; position:absolute; inset:0;
    background:linear-gradient(135deg,#2563eb,#6366f1);
    opacity:0; transition:opacity .25s;
  }
  .submit-btn:hover{ transform:translateY(-2px); box-shadow:0 10px 28px rgba(29,78,216,0.42); }
  .submit-btn:hover::before{ opacity:1; }
  .submit-btn:active{ transform:translateY(0); }
  .submit-btn span{ position:relative; z-index:1; display:flex; align-items:center; gap:7px; }

  /* ══ RESPONSIVE ══ */
  @media(max-width:900px){
    .tt-sidebar{ position:relative; width:100%; min-width:unset; height:auto; }
    .tt-main{ margin-left:0; width:100%; height:auto; overflow-y:unset; padding:22px 16px 52px; }
    .tt-wrap{ flex-direction:column; height:auto; overflow:unset; }
    .field-grid{ grid-template-columns:1fr; }
    .col-2{ grid-column:1/-1; }
  }
  @media(max-width:600px){
    .pic-card{ flex-direction:column; align-items:flex-start; }
    .form-header-title{ font-size:1.15rem; }
  }
`;

/* ─── MAIN COMPONENT ─────────────────────────────────── */
export default function JoinTrainee() {
  const [profilePic, setProfilePic] = useState(null);
  const [cvFiles, setCvFiles] = useState([]);
  const [certFiles, setCertFiles] = useState([]);

  const handleProfilePic = (e) => {
    const f = e.target.files[0];
    if (f) setProfilePic(URL.createObjectURL(f));
  };

  return (
    <>
      <style>{styles}</style>
      <div className="tt-wrap">

        {/* ══ FIXED SIDEBAR ══ */}
        <aside className="tt-sidebar">
          <div className="sb-logo">
            <div className="sb-logo-icon"><Sparkles size={17}/></div>
            <span className="sb-logo-text">Top<span>Trainer</span></span>
          </div>

          <div className="sb-badge"><UserPlus size={11}/> JOIN AS A TRAINER</div>

          <h2 className="sb-heading">
            Build Your Profile.<br/>Share Your Expertise.<br/>
            <span>Grow Your Impact.</span>
          </h2>

          <p className="sb-desc">
            TopTrainer connects you with organizations and individuals looking for professional guidance and training.
          </p>

          <div className="sb-features">
            {[
              { icon:<Sparkles size={14}/>, title:"Showcase Your Expertise", desc:"Highlight your skills, experience and areas of training.", d:"0.3s" },
              { icon:<Target size={14}/>,   title:"Reach The Right People",  desc:"Get discovered by clients searching for the right trainer.", d:"0.38s" },
              { icon:<TrendingUp size={14}/>,title:"Grow Your Business",     desc:"Build your brand, expand your network and opportunities.", d:"0.46s" },
            ].map((f,i) => (
              <div className="sb-feat" key={i} style={{animationDelay:f.d}}>
                <div className="sb-feat-icon">{f.icon}</div>
                <div>
                  <div className="sb-feat-title">{f.title}</div>
                  <div className="sb-feat-desc">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="sb-bottom">
            <div className="sb-bottom-icon"><Users size={16}/></div>
            <div>
              <div className="sb-bottom-title">Empowering Trainers</div>
              <div className="sb-bottom-sub">To inspire growth everywhere</div>
            </div>
          </div>
        </aside>

        {/* ══ SCROLLABLE MAIN ══ */}
        <main className="tt-main">

          {/* Header */}
          <div className="form-header-inner">
            <div className="form-header-icon"><BookOpen size={21}/></div>
            <div>
              <div className="form-header-title">Trainer Profile </div>
              <div className="form-header-sub">Complete all sections to get discovered by top organizations</div>
            </div>
          </div>

          {/* Profile Picture + Name */}
          <div className="pic-card ">
            <div className="pic-preview">
              {profilePic
                ? <Image src={profilePic} alt="Profile" width={76} height={76} style={{objectFit:"cover",width:"100%",height:"100%"}}/>
                : <Users size={26} color="#93c5fd"/>
              }
            </div>
            <div>
              <div className="pic-info-title">Profile Photo</div>
              <div className="pic-info-sub">JPG, PNG or WEBP · Max 5MB</div>
              <input type="file" id="picUpload" accept="image/png,image/jpeg,image/webp" onChange={handleProfilePic} style={{display:"none"}}/>
              <label htmlFor="picUpload" className="choose-btn"><Upload size={12}/> Choose Photo</label>
            </div>
            <div style={{flex:1, minWidth:180}}>
              <Field label="Full Name" icon={<UserPlus size={13}/>} placeholder="Enter your full name"/>
            </div>
          </div>

          {/* 1 · Contact */}
          <Sec icon={<Mail size={16}/>} title="Contact Details" sub="How clients will reach you">
            <div className="field-grid">
              <Field label="Email Address" icon={<Mail size={13}/>} placeholder="you@example.com"/>
              <Field label="WhatsApp Number" icon={<Phone size={13}/>} placeholder="+91 9034565817"/>
            </div>
          </Sec>

          {/* 2 · Online Presence */}
          <Sec icon={<Globe size={16}/>} title="Online Presence" sub="Your digital footprint across platforms">
            <div className="field-grid">
              <Field label="Website / Portfolio" icon={<Globe size={13}/>} placeholder="https://yourwebsite.com"/>
              <Field label="LinkedIn Profile"    icon={<Linkedin size={13}/>} placeholder="https://linkedin.com/in/..."/>
              <Field label="YouTube Channel"     icon={<Youtube size={13}/>} placeholder="https://youtube.com/@..."/>
              <Field label="Instagram Handle"    icon={<Instagram size={13}/>} placeholder="https://instagram.com/..."/>
              <Field label="Facebook Page"       icon={<Facebook size={13}/>} placeholder="https://facebook.com/..."/>
            </div>
          </Sec>

          {/* 3 · Expertise */}
          <Sec icon={<Briefcase size={16}/>} title="Expertise & Domain" sub="Define your areas of professional mastery">
            <div className="field-grid">
              <Sel label="Industry & Sector Expertise"    icon={<Briefcase size={13}/>} options={["Real Estate","IT & Digital","Media & Entertainment","Banking & Finance","Telecommunications","Hospitality & Aviation","Healthcare & Pharma","Education Sector","Retail Industry","Automobile","Jewellery","FMCG","Other"]}/>
              <Sel label="Domain & Departmental Expertise" icon={<Target size={13}/>}    options={["Logistics & Operations","Soft Skills Development","Sales & Business Development","Leadership Transformation","International Market Expansion","Customer Service Excellence","Branding & Communications","Other"]}/>
              <Sel label="Competency Expertise"            icon={<Star size={13}/>}       options={["AI Tools & Generative AI","Strategic Thinking","Communication & Narrative Building","Multitasking Ability","Team Building & Management","Innovation","Big Picture Thinking","Time Management","Other"]}/>
            </div>
          </Sec>

          {/* 4 · Summary & Docs */}
          <Sec icon={<FileText size={16}/>} title="Profile Summary & Documents" sub="Your story and supporting materials">
            <div className="field-grid">
              <div className="col-2">
                <div className="tt-field">
                  <label className="tt-label"><span className="tt-label-icon"><FileText size={11}/></span>CV or Profile Summary</label>
                  <textarea className="tt-input no-icon" placeholder="Briefly describe your training background, achievements, and what makes you unique..."/>
                </div>
              </div>
              <div>
                <div className="tt-label" style={{marginBottom:5}}><span className="tt-label-icon"><Upload size={11}/></span>Upload CV (PDF)</div>
                <div className="upload-zone">
                  <input type="file" accept="application/pdf" onChange={e=>setCvFiles(Array.from(e.target.files||[]))}/>
                  <div className="upload-zone-icon"><FileText size={17}/></div>
                  <div className="upload-zone-title">Click or drag to upload CV</div>
                  <div className="upload-zone-sub">PDF only · Max 5MB</div>
                </div>
                <div>{cvFiles.map((f,i)=><span className="file-chip" key={i}><CheckCircle size={10}/>{f.name}</span>)}</div>
              </div>
              <div>
                <div className="tt-label" style={{marginBottom:5}}><span className="tt-label-icon"><Award size={11}/></span>Upload Certificates</div>
                <div className="upload-zone">
                  <input type="file" multiple accept="image/*,application/pdf" onChange={e=>setCertFiles(Array.from(e.target.files||[]))}/>
                  <div className="upload-zone-icon"><Award size={17}/></div>
                  <div className="upload-zone-title">Click or drag to upload</div>
                  <div className="upload-zone-sub">PDF, JPG, PNG · Multiple allowed</div>
                </div>
                <div>{certFiles.map((f,i)=><span className="file-chip" key={i}><CheckCircle size={10}/>{f.name}</span>)}</div>
              </div>
            </div>
          </Sec>

          {/* 5 · Location */}
          <Sec icon={<MapPin size={16}/>} title="Location & Workshop Details" sub="Where you are and what you've delivered">
            <div className="field-grid">
              <Field label="City"  icon={<MapPin size={13}/>} placeholder="e.g. Mumbai"/>
              <Field label="State" icon={<MapPin size={13}/>} placeholder="e.g. Maharashtra"/>
              <div className="col-2">
                <div className="tt-field">
                  <label className="tt-label"><span className="tt-label-icon"><BookOpen size={11}/></span>Details of Recent Workshop Done</label>
                  <textarea className="tt-input no-icon" placeholder="Mention workshop name, duration (days), number of attendees, client name, topics covered..."/>
                </div>
              </div>
            </div>
          </Sec>

          {/* 6 · Trainer Profile */}
          <Sec icon={<Award size={16}/>} title="Additional Details" sub="Your credentials, style and reach">
            <div className="field-grid">
              <Sel label="Open to Travel for Workshop"   icon={<Plane size={13}/>}      options={["Within City","Within State","Upto 50kms","Zonal Travel Only","PAN India","Global Trainer"]}/>
              <Sel label="Languages Fluent"              icon={<Languages size={13}/>}   options={["Hindi","English","Other"]}/>
              <Sel label="Trainer Certifications"        icon={<Award size={13}/>}       options={["ICF Certified Coach","POSH Trainer","Technical Skills Certified","Other"]}/>
              <Sel label="Training & Workshop Experience" icon={<TrendingUp size={13}/>} options={["15 years and above","10 - 15 years","5 - 10 years","2 - 5 years","Emerging Trainer"]}/>
              <Sel label="Trainer Type"                  icon={<UserPlus size={13}/>}    options={["Faculty / Professor","Business Consultant","Motivational Speaker","Life Coach","Industry Trainers","Technical / Digital Trainer","Personality Coach","Behavioral Trainer","Executive Coach","Other"]}/>
              <Sel label="Audience & Seniority Level"    icon={<Users size={13}/>}       options={["Freshers & Students","New Joinees","Entry Level","Mid-level Management","CXOs & Leadership","Entrepreneurs & Founders","Staff Level","Other"]}/>
              <Sel label="International Market Knowledge" icon={<Globe size={13}/>}      options={["Asian Market","South East Asia","Middle East","Australia & New Zealand","US & Canada","UK & Europe"]}/>
              <Sel label="Commercials / Fees per Day"    icon={<DollarSign size={13}/>}  options={["Upto ₹15,000","₹15,000 - ₹30,000","₹30,000 - ₹50,000","₹50,000 - ₹1,00,000","₹1,00,000 and above"]}/>
            </div>
          </Sec>

          {/* Submit */}
          <div className="submit-wrap">
            <button type="button" className="submit-btn">
              <span><Sparkles size={15}/> Create My Trainer Profile</span>
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
        <input type="text" placeholder={placeholder} className="tt-input"/>
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
          {options.map((o,i) => <option key={i}>{o}</option>)}
        </select>
      </div>
    </div>
  );
}