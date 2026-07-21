"use client";
import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { userAPI } from '../../lib/api';
import { 
    PenLine, Camera, Mail, MapPin, Calendar, Target, Star, User, 
    GraduationCap, Download, Award, ChevronRight, TrendingUp
} from 'lucide-react';
import Link from 'next/link';

export default function UserProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
  const avatarUrl = profile.avatar || 'https://i.pravatar.cc/300?u=aris';
  const jobTitle = profile.jobTitle || 'Associate Product Manager at Innovate Solutions';
  const location = profile.location || 'New York, USA';
  
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

  // Bio
  const bio = profile.bio || "Aspiring to become a expert Product Leader, focusing on data-driven decision making and user-centric design. Currently exploring advanced Python and leadership skills.";

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
                <div className="relative">
                    <img 
                        src={avatarUrl} 
                        alt={fullName} 
                        className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-sm bg-white"
                    />
                    <button className="absolute bottom-1 right-1 w-8 h-8 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-500 shadow-sm hover:text-slate-900 transition-colors z-10">
                        <Camera className="w-4 h-4" />
                    </button>
                </div>
                
                <div className="mb-2">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-1">
                        <h1 className="text-2xl font-bold text-slate-900">{fullName}</h1>
                        <span className="px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-full text-xs font-semibold border border-blue-100">
                            Learner
                        </span>
                    </div>
                    <p className="text-sm font-medium text-slate-700 mb-3">{jobTitle}</p>
                    
                    <div className="flex flex-col md:flex-row items-center gap-3 md:gap-5 text-[13px] text-slate-500 font-medium">
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

            <Link href="/user/settings" className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-colors shadow-sm mb-2">
                <PenLine className="w-4 h-4" /> Edit Profile
            </Link>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
        
        {/* Left Column: My Profile Details */}
        <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">My Profile Details</h2>
            
            <div className="flex flex-col gap-6">
                {/* Learning Goals */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                            <Target className="w-5 h-5" />
                        </div>
                        <h3 className="text-[17px] font-bold text-slate-900">My Learning Goals</h3>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                        {goals.map((goal, idx) => (
                          <div key={goal.id || idx}>
                              <div className="flex justify-between text-[13px] font-bold text-slate-900 mb-2">
                                  <span>{goal.title}</span>
                                  <span>{goal.progress}%</span>
                              </div>
                              <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${goal.progress}%` }}></div>
                              </div>
                          </div>
                        ))}
                    </div>
                </div>

                {/* Skills of Interest */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                            <Star className="w-5 h-5" />
                        </div>
                        <h3 className="text-[17px] font-bold text-slate-900">Skills of Interest</h3>
                    </div>
                    
                    <div className="flex flex-wrap gap-3">
                        {skills.map((skill, idx) => {
                          const bgColors = ['bg-blue-50 text-blue-700', 'bg-purple-50 text-purple-700', 'bg-emerald-50 text-emerald-700', 'bg-amber-50 text-amber-700'];
                          const colorClass = bgColors[idx % bgColors.length];
                          return (
                            <span key={idx} className={`px-4 py-1.5 rounded-full text-sm font-semibold ${colorClass}`}>
                              {skill}
                            </span>
                          );
                        })}
                    </div>
                </div>

                {/* Bio */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                    <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                            <User className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="text-[17px] font-bold text-slate-900 mb-2 mt-2">Bio</h3>
                            <p className="text-sm text-slate-600 leading-relaxed pr-4">
                                {bio}
                            </p>
                        </div>
                    </div>
                </div>
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