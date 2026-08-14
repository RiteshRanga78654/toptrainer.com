"use client";
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { userAPI, industryAPI, competencyAPI, departmentsAPI } from '../../lib/api';
import {
    PenLine, Camera, Mail, MapPin, Calendar, Target, Star, User,
    GraduationCap, Download, Award, ChevronRight, TrendingUp,
    Phone, Briefcase, Building2, Globe, Home as HomeIcon, Users,
    Save, X, Loader2, Trash2
} from 'lucide-react';
import Link from 'next/link'; 
import DatePicker from '../../components/Datepicker';
import SearchableDropdown from '../../components/SearchableDropdown';

const GENDER_OPTIONS = ["Male", "Female", "Other", "Prefer not to say"];
const USER_TYPE_OPTIONS = ["Student", "Professional", "Own Business"];
const ALLOWED_AVATAR_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
const MAX_AVATAR_SIZE = 5 * 1024 * 1024; // 5MB
const MONTHS_SHORT = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const formatCreatedDate = (dateStr) => {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  const day = String(d.getDate()).padStart(2, "0");
  return `${day} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
};

const emptyForm = {
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: null,
    gender: "",
    city: "",
    state: "",
    country: "",
    profession: "",
    company: "",
    bio: "",
    userType: "",
    industry: "",
    competency: "",
    department: "",
};

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [removeAvatarFlag, setRemoveAvatarFlag] = useState(false);
  const fileInputRef = useRef(null);

  const [industries, setIndustries] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loadingIndustries, setLoadingIndustries] = useState(true);
  const [loadingCompetencies, setLoadingCompetencies] = useState(true);
  const [loadingDepartments, setLoadingDepartments] = useState(true);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await userAPI.getProfile();
        if (res.data?.success && res.data.user) {
          setProfile(res.data.user);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        toast.error("Failed to load profile details.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  // Fetch Area of Interest option lists
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [industryRes, competencyRes, departmentRes] = await Promise.all([
          industryAPI.getActive(),
          competencyAPI.getActive(),
          departmentsAPI.getActive(),
        ]);

        setIndustries(industryRes?.data?.industries || industryRes?.data?.data || []);
        setCompetencies(competencyRes?.data?.competencies || competencyRes?.data?.data || []);
        setDepartments(departmentRes?.data?.departments || departmentRes?.data?.data || []);
      } catch (error) {
        console.error("Error fetching interest options:", error);
        toast.error("Failed to load interest options.");
      } finally {
        setLoadingIndustries(false);
        setLoadingCompetencies(false);
        setLoadingDepartments(false);
      }
    };
    fetchOptions();
  }, []);

  const refId = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value._id || value.id || "";
  };

  const refName = (value) => {
    if (!value) return "";
    if (typeof value === "string") return value;
    return value.name || "";
  };

  const populateForm = (p) => {
    setForm({
      fullName: `${p.firstName || ''} ${p.lastName || ''}`.trim(),
      email: p.email || "",
      phoneNumber: p.phoneNumber ? String(p.phoneNumber) : "",
      dateOfBirth: p.dateOfBirth ? new Date(p.dateOfBirth) : null,
      gender: p.gender || "",
      city: p.city || "",
      state: p.state || "",
      country: p.country || "",
      profession: p.profession || "",
      company: p.company || "",
      bio: p.bio || "",
      userType: p.userType || "",
      industry: refId(p.industry),
      competency: refId(p.competency),
      department: refId(p.department),
    });
  };

  const handleEditClick = () => {
    if (!profile) return;
    populateForm(profile);
    setAvatarFile(null);
    setAvatarPreview(null);
    setRemoveAvatarFlag(false);
    setErrors({});
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setAvatarFile(null);
    setAvatarPreview(null);
    setRemoveAvatarFlag(false);
    setErrors({});
  };

  const handleFieldChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleAvatarSelect = (file) => {
    if (!file) return;

    if (!ALLOWED_AVATAR_TYPES.includes(file.type)) {
      toast.error("Please upload a JPG, PNG, or WebP image.");
      return;
    }
    if (file.size > MAX_AVATAR_SIZE) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setRemoveAvatarFlag(false);
  };

  const handleRemoveAvatar = () => {
    setAvatarFile(null);
    setAvatarPreview(null);
    setRemoveAvatarFlag(true);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }

    if (!form.phoneNumber.trim()) {
      nextErrors.phoneNumber = "Mobile number is required";
    } else if (!/^\d{7,15}$/.test(form.phoneNumber.replace(/[\s+()-]/g, ""))) {
      nextErrors.phoneNumber = "Enter a valid mobile number";
    }

    if (!form.userType) {
      nextErrors.userType = "Please select a user type";
    }

    if (form.dateOfBirth) {
      const dob = new Date(form.dateOfBirth);
      if (dob > new Date()) {
        nextErrors.dateOfBirth = "Date of birth cannot be in the future";
      }
    }

    if (form.bio && form.bio.length > 1000) {
      nextErrors.bio = "Bio cannot exceed 1000 characters";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the highlighted fields before saving.");
      return;
    }

    setSaving(true);
    try {
      const [firstName, ...rest] = form.fullName.trim().split(/\s+/);
      const lastName = rest.join(" ");

      const payload = {
        firstName,
        lastName: lastName || "",
        email: form.email.trim(),
        phoneNumber: form.phoneNumber.trim(),
        dateOfBirth: form.dateOfBirth ? form.dateOfBirth.toISOString() : "",
        gender: form.gender,
        city: form.city,
        state: form.state,
        country: form.country,
      
        profession: form.profession,
        company: form.company,
        bio: form.bio,
        userType: form.userType,
        industry: form.industry,
        competency: form.competency,
        department: form.department,
      };

      let body;
      if (avatarFile || removeAvatarFlag) {
        const fd = new FormData();
        Object.entries(payload).forEach(([key, value]) => fd.append(key, value ?? ""));
        if (avatarFile) fd.append("avatar", avatarFile);
        if (removeAvatarFlag) fd.append("removeAvatar", "true");
        body = fd;
      } else {
        body = payload;
      }

      const res = await userAPI.updateProfile(body);

      if (res.data?.success && res.data.user) {
        setProfile(res.data.user);
        setIsEditing(false);
        setAvatarFile(null);
        setAvatarPreview(null);
        setRemoveAvatarFlag(false);
        toast.success("Profile updated successfully.");
      } else {
        toast.error(res.data?.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-white rounded-2xl border border-slate-100 shadow-sm">
        <User className="w-12 h-12 text-slate-300 mb-3" />
        <h3 className="text-lg font-bold text-slate-900">Profile Not Found</h3>
        <p className="text-sm text-slate-500 mt-1 max-w-md">We couldn't retrieve your profile data. Please make sure you are logged in.</p>
        <Link href="/auth/login" className="mt-5 bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm">
          Go to Login
        </Link>
      </div>
    );
  }

  // Fallbacks for data to keep the UI beautiful
  const fullName = `${profile.firstName || ''} ${profile.lastName || ''}`.trim() || 'Aris Lee';
  const avatarUrl = avatarPreview || (!removeAvatarFlag && profile.avatar?.url) || 'https://i.pravatar.cc/300?u=aris';
  const jobTitle = profile.profession
    ? `${profile.profession}${profile.company ? ` at ${profile.company}` : ''}`
    : (profile.jobTitle || 'Associate Product Manager at Innovate Solutions');
  const location = [profile.city, profile.state, profile.country].filter(Boolean).join(', ') || (profile.location || 'New York, USA');

  // Format Member Since date
  const memberSince = profile.createdAt
    ? `Member since ${new Date(profile.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`
    : 'Member since May 2023';

  // Learning Goals
  const defaultGoals = [
    { title: "Master Python for Data Science", progress: 70 },
    { title: "Learn Agile Methodologies", progress: 10 },
    { title: "Improve Presentation Skills", progress: 70 },
    { title: "Leadership Development", progress: 40 }
  ];
  const goals = (profile.learningGoals && profile.learningGoals.length > 0) ? profile.learningGoals : defaultGoals;

  // Skills of Interest
  const defaultSkills = ["Python", "Data Visualization", "Leadership", "Product Strategy", "User Research", "Data Thinking", "Product Skills"];
  const skills = (profile.skillsOfInterest && profile.skillsOfInterest.length > 0) ? profile.skillsOfInterest : defaultSkills;

  // Workshops Attended
  const workshopsAttended = profile.savedWorkshops ? profile.savedWorkshops.length : 15;

  // Certificates
  const defaultCertificates = [
    { title: "Python Fundamentals", date: "Jan 18, 2022" },
    { title: "Python for Data Analysis", date: "Jan 18, 2022" },
    { title: "Product Thinking 101", date: "Jan 10, 2023" }
  ];
  const certificates = (profile.certificates && profile.certificates.length > 0)
    ? profile.certificates.map(c => ({
        title: c.title,
        date: new Date(c.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
      }))
    : defaultCertificates;

  // Recent Activity mapping
  const activities = [];
  if (profile.savedWorkshops && profile.savedWorkshops.length > 0) {
    profile.savedWorkshops.slice(0, 2).forEach((w, idx) => {
      activities.push({
        id: `w-${idx}`,
        type: 'workshop',
        text: `Enrolled in "${w.title || w.basicInformation?.title || 'Workshop'}" workshop`,
        time: `${idx + 1}d ago`
      });
    });
  }
  if (profile.shortlistedTrainers && profile.shortlistedTrainers.length > 0) {
    profile.shortlistedTrainers.slice(0, 2).forEach((t, idx) => {
      activities.push({
        id: `t-${idx}`,
        type: 'trainer',
        text: `Shortlisted Trainer ${t.name || 'Trainer'}`,
        time: `${idx + 1}h ago`
      });
    });
  }
  if (activities.length === 0) {
    activities.push(
      { id: 'act-1', type: 'workshop', text: 'Enrolled in "Python Data Analysis" workshop', time: '2h ago' },
      { id: 'act-2', type: 'trainer', text: 'Shortlisted Trainer Chloe Dubois', time: '1d ago' },
      { id: 'act-3', type: 'download', text: 'Downloaded "Product Strategy Handbook"', time: '1d ago' }
    );
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'workshop': return <GraduationCap className="w-5 h-5" />;
      case 'trainer': return <User className="w-5 h-5" />;
      default: return <Download className="w-5 h-5" />;
    }
  };

  const getActivityBg = (type) => {
    switch (type) {
      case 'workshop': return 'bg-blue-50 text-blue-600';
      case 'trainer': return 'bg-purple-50 text-purple-600';
      default: return 'bg-emerald-50 text-emerald-600';
    }
  };

  return (
    <div className="pb-10">

      {/* Top Banner Profile Card */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden mb-8">
        {/* Blue Gradient Banner */}
        <div className="h-40 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 relative">
            <div className="absolute inset-0 bg-white/10" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 0%, transparent 40%)' }}></div>
            <div className="absolute inset-0 bg-white/5" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 30%)' }}></div>
        </div>

        {/* Profile Content */}
        <div className="px-4 md:px-8 pb-8 flex flex-col md:flex-row justify-between items-center md:items-end relative -mt-16 text-center md:text-left gap-4 md:gap-0">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-end">
                {/* Profile Photo */}
                <div className="relative shrink-0">
                    <img
                        src={avatarUrl}
                        alt={fullName}
                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-sm bg-white"
                    />
                    {isEditing && (
                      <>
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="absolute bottom-1 right-1 w-9 h-9 rounded-full bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center shadow-md border-2 border-white transition-colors"
                          title="Upload photo"
                        >
                          <Camera className="w-4 h-4" />
                        </button>
                        {(avatarPreview || (profile.avatar?.url && !removeAvatarFlag)) && (
                          <button
                            type="button"
                            onClick={handleRemoveAvatar}
                            className="absolute top-1 right-1 w-7 h-7 rounded-full bg-white hover:bg-red-50 text-red-500 flex items-center justify-center shadow-md border border-slate-200 transition-colors"
                            title="Remove photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/jpeg,image/jpg,image/png,image/webp"
                          className="hidden"
                          onChange={(e) => handleAvatarSelect(e.target.files?.[0])}
                        />
                      </>
                    )}
                </div>

                <div className="pb-1">
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">{fullName}</h1>
                    <p className="text-sm text-slate-500 mb-3">{jobTitle}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-x-5 gap-y-1.5 text-xs text-slate-500 font-medium">
                        <div className="flex items-center gap-1.5">
                            <Mail className="w-4 h-4" /> {profile.email}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" /> {location}
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" /> {memberSince}
                        </div>
                    </div>
                </div>
            </div>

            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm mb-2"
              >
                <PenLine className="w-4 h-4" /> Edit Profile
              </button>
            ) : (
              <div className="flex items-center gap-2 mb-2">
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-60"
                >
                  <X className="w-4 h-4" /> Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-70"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            )}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">

        {/* Left Column: My Profile Details */}
        <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">My Profile Details</h2>

            <div className="flex flex-col gap-6">

                {/* Profile Information (view or edit) */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-[17px] font-bold text-slate-900">Profile Information</h3>
                          <p className="text-xs text-slate-400 mt-0.5">Your personal and contact details.</p>
                        </div>
                    </div>

                    {!isEditing ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                        <InfoRow icon={<User className="w-4 h-4" />} label="Full Name" value={fullName} />
                        <InfoRow icon={<Mail className="w-4 h-4" />} label="Email Address" value={profile.email} />
                        <InfoRow icon={<Phone className="w-4 h-4" />} label="Mobile Number" value={profile.phoneNumber} />
                        <InfoRow
                          icon={<Calendar className="w-4 h-4" />}
                          label="Date of Birth"
                          value={profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : ''}
                        />
                        <InfoRow icon={<Users className="w-4 h-4" />} label="Gender" value={profile.gender} />
                        <InfoRow icon={<MapPin className="w-4 h-4" />} label="City" value={profile.city} />
                        <InfoRow icon={<MapPin className="w-4 h-4" />} label="State" value={profile.state} />
                        <InfoRow icon={<Globe className="w-4 h-4" />} label="Country" value={profile.country} />
                        <InfoRow icon={<Briefcase className="w-4 h-4" />} label="Profession / Designation" value={profile.profession} />
                        <InfoRow icon={<Building2 className="w-4 h-4" />} label="Company / Organization" value={profile.company} />
                        <InfoRow icon={<Target className="w-4 h-4" />} label="User Type" value={profile.userType} />
                        <InfoRow icon={<Calendar className="w-4 h-4" />} label="Profile Created On" value={formatCreatedDate(profile.createdAt)} />
                        <InfoRow icon={<User className="w-4 h-4" />} label="Bio / About Me" value={profile.bio} full multiline />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <FormField label="Full Name" required error={errors.fullName}>
                          <input
                            type="text"
                            value={form.fullName}
                            onChange={(e) => handleFieldChange('fullName', e.target.value)}
                            placeholder="Enter your full name"
                            className={inputClass(errors.fullName)}
                          />
                        </FormField>

                        <FormField label="Email Address" required error={errors.email}>
                          <input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleFieldChange('email', e.target.value)}
                            placeholder="you@example.com"
                            className={inputClass(errors.email)}
                          />
                        </FormField>

                        <FormField label="Mobile Number" required error={errors.phoneNumber}>
                          <input
                            type="tel"
                            value={form.phoneNumber}
                            onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
                            placeholder="e.g. 9876543210"
                            className={inputClass(errors.phoneNumber)}
                          />
                        </FormField>

                        <FormField label="Date of Birth" error={errors.dateOfBirth}>
                          <DatePicker
                            value={form.dateOfBirth}
                            onChange={(date) => handleFieldChange('dateOfBirth', date)}
                            maxDate={new Date()}
                            placeholder="Select your date of birth"
                            error={errors.dateOfBirth}
                          />
                        </FormField>

                        <FormField label="Gender">
                          <select
                            value={form.gender}
                            onChange={(e) => handleFieldChange('gender', e.target.value)}
                            className={inputClass()}
                          >
                            <option value="">Select gender</option>
                            {GENDER_OPTIONS.map((g) => (
                              <option key={g} value={g}>{g}</option>
                            ))}
                          </select>
                        </FormField>

                        <FormField label="City">
                          <input
                            type="text"
                            value={form.city}
                            onChange={(e) => handleFieldChange('city', e.target.value)}
                            placeholder="e.g. Mumbai"
                            className={inputClass()}
                          />
                        </FormField>

                        <FormField label="State">
                          <input
                            type="text"
                            value={form.state}
                            onChange={(e) => handleFieldChange('state', e.target.value)}
                            placeholder="e.g. Maharashtra"
                            className={inputClass()}
                          />
                        </FormField>

                        <FormField label="Country">
                          <input
                            type="text"
                            value={form.country}
                            onChange={(e) => handleFieldChange('country', e.target.value)}
                            placeholder="e.g. India"
                            className={inputClass()}
                          />
                        </FormField>

                        <FormField label="Address" full>
                          <input
                            type="text"
                            value={form.address}
                            onChange={(e) => handleFieldChange('address', e.target.value)}
                            placeholder="Street, area, landmark..."
                            className={inputClass()}
                          />
                        </FormField>

                        <FormField label="Profession / Designation">
                          <input
                            type="text"
                            value={form.profession}
                            onChange={(e) => handleFieldChange('profession', e.target.value)}
                            placeholder="e.g. Product Manager"
                            className={inputClass()}
                          />
                        </FormField>

                        <FormField label="Company / Organization">
                          <input
                            type="text"
                            value={form.company}
                            onChange={(e) => handleFieldChange('company', e.target.value)}
                            placeholder="e.g. Innovate Solutions"
                            className={inputClass()}
                          />
                        </FormField>

                        <FormField label="User Type" required error={errors.userType}>
                          <select
                            value={form.userType}
                            onChange={(e) => handleFieldChange('userType', e.target.value)}
                            className={inputClass(errors.userType)}
                          >
                            <option value="">Select user type</option>
                            {USER_TYPE_OPTIONS.map((t) => (
                              <option key={t} value={t}>{t}</option>
                            ))}
                          </select>
                        </FormField>

                        <FormField label="Profile Created On">
                          <input
                            type="text"
                            value={formatCreatedDate(profile.createdAt)}
                            readOnly
                            disabled
                            className={inputClass() + " bg-slate-50 text-slate-400 cursor-not-allowed"}
                          />
                        </FormField>

                        <FormField label="Bio / About Me" full error={errors.bio}>
                          <textarea
                            rows={4}
                            value={form.bio}
                            onChange={(e) => handleFieldChange('bio', e.target.value)}
                            placeholder="Tell us a little about yourself..."
                            className={inputClass(errors.bio) + " resize-none"}
                          />
                          <p className="text-xs text-slate-400 mt-1 text-right">{form.bio.length}/1000</p>
                        </FormField>

                        <div className="sm:col-span-2 pt-2 flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={handleCancel}
                            disabled={saving}
                            className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors disabled:opacity-60"
                          >
                            <X className="w-4 h-4" /> Cancel
                          </button>
                          <button
                            type="button"
                            onClick={handleSave}
                            disabled={saving}
                            className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm disabled:opacity-70"
                          >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            {saving ? 'Saving...' : 'Save Changes'}
                          </button>
                        </div>
                      </div>
                    )}
                </div>

                {/* Area of Interest */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0">
                            <Target className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="text-[17px] font-bold text-slate-900">Area of Interest</h3>
                          <p className="text-xs text-slate-400 mt-0.5">The industry, competency and department you are interested in.</p>
                        </div>
                    </div>

                    {!isEditing ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-5">
                        <InfoRow icon={<Building2 className="w-4 h-4" />} label="Industry" value={refName(profile.industry)} />
                        <InfoRow icon={<Target className="w-4 h-4" />} label="Competency" value={refName(profile.competency)} />
                        <InfoRow icon={<HomeIcon className="w-4 h-4" />} label="Department" value={refName(profile.department)} />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <FormField label="Industry">
                          <SearchableDropdown
                            options={industries}
                            value={form.industry}
                            onChange={(v) => handleFieldChange('industry', v)}
                            placeholder="Select industry"
                            loading={loadingIndustries}
                            emptyText="No industries available"
                          />
                        </FormField>

                        <FormField label="Competency">
                          <SearchableDropdown
                            options={competencies}
                            value={form.competency}
                            onChange={(v) => handleFieldChange('competency', v)}
                            placeholder="Select competency"
                            loading={loadingCompetencies}
                            emptyText="No competencies available"
                          />
                        </FormField>

                        <FormField label="Department">
                          <SearchableDropdown
                            options={departments}
                            value={form.department}
                            onChange={(v) => handleFieldChange('department', v)}
                            placeholder="Select department"
                            loading={loadingDepartments}
                            emptyText="No departments available"
                          />
                        </FormField>
                      </div>
                    )}
                </div>

                {/* Learning Goals */}
                

                {/* Skills of Interest */}
               
            </div>
        </div>

        {/* Right Column: Activity & Achievements */}
        <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Activity & Achievements</h2>

            <div className="flex flex-col gap-6">

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-[17px] font-bold text-slate-900">Recent Activity</h3>
                        <Link href="#" className="text-blue-600 text-sm font-semibold hover:underline">
                            View all
                        </Link>
                    </div>

                    <div className="flex flex-col gap-5">
                        {activities.map((act) => (
                          <div key={act.id} className="flex items-start gap-4">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${getActivityBg(act.type)}`}>
                                  {getActivityIcon(act.type)}
                              </div>
                              <div className="flex-1">
                                  <p className="text-[13px] text-slate-900 font-semibold leading-snug pr-4">{act.text}</p>
                              </div>
                              <span className="text-[11px] text-slate-400 whitespace-nowrap mt-0.5">{act.time}</span>
                          </div>
                        ))}
                    </div>
                </div>

                {/* Workshops Attended Counter */}
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-blue-100 shadow-sm p-6 flex justify-between items-center relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="text-4xl font-black text-slate-900 mb-1">{workshopsAttended}</div>
                        <div className="text-[13px] font-bold text-slate-700">Workshops Attended</div>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-blue-100/50 rounded-l-full opacity-60"></div>
                    <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-24 h-24 bg-blue-200/40 rounded-full blur-md"></div>
                    <TrendingUp className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 text-blue-200" strokeWidth={1.5} />
                </div>

                {/* Certificates Earned */}
                <div>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-[17px] font-bold text-slate-900">Certificates Earned</h3>
                        <Link href="#" className="text-blue-600 text-sm font-semibold hover:underline">
                            View all
                        </Link>
                    </div>

                    <div className="flex flex-col gap-3">
                        {certificates.map((cert, idx) => (
                          <div key={idx} className="bg-white rounded-xl border border-slate-100 shadow-sm p-4 flex items-center justify-between cursor-pointer hover:border-slate-200 transition-colors">
                              <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center border border-slate-100">
                                      <Award className="w-5 h-5 text-amber-500" />
                                  </div>
                                  <div>
                                      <h4 className="text-[13px] font-bold text-slate-900 leading-none mb-1.5">{cert.title}</h4>
                                      <p className="text-[11px] text-slate-500">{cert.date}</p>
                                  </div>
                              </div>
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                          </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

      </div>
    </div>
  );
}

// ── Small presentational helpers ─────────────────────────────────────────

function InfoRow({ icon, label, value, full, multiline }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wide mb-1">
        {icon} {label}
      </div>
      {value ? (
        <p className={`text-sm text-slate-800 font-medium ${multiline ? "leading-relaxed whitespace-pre-line" : ""}`}>
          {value}
        </p>
      ) : (
        <p className="text-sm text-slate-300 italic">Not added yet</p>
      )}
    </div>
  );
}

function FormField({ label, required, error, full, children }) {
  return (
    <div className={full ? "sm:col-span-2" : ""}>
      <label className="block text-[13px] font-medium text-slate-600 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1.5">{error}</p>}
    </div>
  );
}

function inputClass(error) {
  return `w-full px-4 py-3 rounded-xl border text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-colors ${
    error
      ? "border-red-300 focus:ring-red-100"
      : "border-slate-200 focus:ring-blue-100 focus:border-blue-400"
  }`;
}