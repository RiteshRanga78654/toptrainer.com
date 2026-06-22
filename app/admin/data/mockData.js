export const heroImages = [
  { id: "h1", url: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80", caption: "Empowering professionals with knowledge and skills for a better future.", active: true, order: 1 },
  { id: "h2", url: "https://images.unsplash.com/photo-1560439514-4e9645039924?w=600&q=80", caption: "Learn from industry experts and achieve excellence in your career.", active: true, order: 2 },
  { id: "h3", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", caption: "Stay ahead with cutting-edge training and real-world industry insights.", active: true, order: 3 },
  { id: "h4", url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80", caption: "Flexible learning solutions designed for your professional growth.", active: true, order: 4 },
]

export const allExperts = [
  { id: "e1", name: "Sarah Johnson", title: "Senior Industry Analyst", category: "industry", avatar: "https://i.pravatar.cc/80?img=1", featured: true },
  { id: "e2", name: "Mark Chen", title: "Financial Strategy Expert", category: "industry", avatar: "https://i.pravatar.cc/80?img=3", featured: true },
  { id: "e3", name: "Priya Patel", title: "Supply Chain Consultant", category: "industry", avatar: "https://i.pravatar.cc/80?img=5", featured: true },
  { id: "e4", name: "James Wright", title: "Retail Industry Lead", category: "industry", avatar: "https://i.pravatar.cc/80?img=8", featured: true },
  { id: "e5", name: "Aisha Mohammed", title: "Tech Sector Advisor", category: "industry", avatar: "https://i.pravatar.cc/80?img=9", featured: false },
  { id: "e6", name: "Carlos Rivera", title: "Healthcare Industry Expert", category: "industry", avatar: "https://i.pravatar.cc/80?img=12", featured: false },
  { id: "e7", name: "Emma Clarke", title: "HR Department Head", category: "department", avatar: "https://i.pravatar.cc/80?img=16", featured: true },
  { id: "e8", name: "David Kim", title: "Marketing Director", category: "department", avatar: "https://i.pravatar.cc/80?img=18", featured: true },
  { id: "e9", name: "Fatima Al-Hassan", title: "Operations Manager", category: "department", avatar: "https://i.pravatar.cc/80?img=20", featured: true },
  { id: "e10", name: "Tom Baker", title: "Finance Department Lead", category: "department", avatar: "https://i.pravatar.cc/80?img=22", featured: true },
  { id: "e11", name: "Nina Fernandez", title: "Legal Department Head", category: "department", avatar: "https://i.pravatar.cc/80?img=25", featured: false },
  { id: "e12", name: "Ahmed Siddiqui", title: "IT Department Manager", category: "department", avatar: "https://i.pravatar.cc/80?img=27", featured: false },
  { id: "e13", name: "Rachel Green", title: "Leadership Coach", category: "competency", avatar: "https://i.pravatar.cc/80?img=30", featured: true },
  { id: "e14", name: "Kevin Park", title: "Communication Specialist", category: "competency", avatar: "https://i.pravatar.cc/80?img=33", featured: true },
  { id: "e15", name: "Sophia Turner", title: "Problem-Solving Expert", category: "competency", avatar: "https://i.pravatar.cc/80?img=35", featured: true },
  { id: "e16", name: "Omar Hassan", title: "Critical Thinking Coach", category: "competency", avatar: "https://i.pravatar.cc/80?img=38", featured: true },
  { id: "e17", name: "Lisa Wang", title: "Emotional Intelligence Expert", category: "competency", avatar: "https://i.pravatar.cc/80?img=40", featured: false },
  { id: "e18", name: "Daniel Scott", title: "Negotiation Skills Trainer", category: "competency", avatar: "https://i.pravatar.cc/80?img=42", featured: false },
]

export const workshops = [
  { id: "w1", title: "Leadership Excellence", date: "2025-07-15", instructor: "Rachel Green", category: "Competency", seats: 30, enrolled: 22, status: "active", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=80" },
  { id: "w2", title: "Financial Analysis Mastery", date: "2025-07-20", instructor: "David Kim", category: "Department", seats: 25, enrolled: 25, status: "full", image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&q=80" },
  { id: "w3", title: "Supply Chain Optimization", date: "2025-08-05", instructor: "Priya Patel", category: "Industry", seats: 40, enrolled: 18, status: "active", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80" },
  { id: "w4", title: "Digital Marketing Trends", date: "2025-08-12", instructor: "Emma Clarke", category: "Department", seats: 35, enrolled: 10, status: "active", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
]

export const articles = [
  { id: "a1", title: "The Future of Remote Leadership", author: "Rachel Green", category: "Leadership", publishedAt: "2025-06-01", status: "published", views: 3420, image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80" },
  { id: "a2", title: "AI in Financial Services: 2025 Outlook", author: "David Kim", category: "Finance", publishedAt: "2025-06-10", status: "published", views: 2890, image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80" },
  { id: "a3", title: "Building High-Performance Teams", author: "Sarah Johnson", category: "HR", publishedAt: null, status: "draft", views: 0, image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80" },
  { id: "a4", title: "Sustainable Supply Chain Practices", author: "Priya Patel", category: "Operations", publishedAt: "2025-06-18", status: "published", views: 1560, image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80" },
]

export const industries = [
  { id: "i1", name: "Finance & Banking", icon: "💰", expertCount: 8, workshopCount: 5, status: "active" },
  { id: "i2", name: "Healthcare", icon: "🏥", expertCount: 6, workshopCount: 4, status: "active" },
  { id: "i3", name: "Technology", icon: "💻", expertCount: 12, workshopCount: 8, status: "active" },
  { id: "i4", name: "Retail & E-commerce", icon: "🛍️", expertCount: 5, workshopCount: 3, status: "active" },
  { id: "i5", name: "Manufacturing", icon: "🏭", expertCount: 4, workshopCount: 2, status: "inactive" },
]

export const competencies = [
  { id: "c1", name: "Leadership", icon: "🎯", expertCount: 5, workshopCount: 4, status: "active" },
  { id: "c2", name: "Communication", icon: "🗣️", expertCount: 4, workshopCount: 3, status: "active" },
  { id: "c3", name: "Critical Thinking", icon: "🧠", expertCount: 3, workshopCount: 2, status: "active" },
  { id: "c4", name: "Emotional Intelligence", icon: "❤️", expertCount: 2, workshopCount: 1, status: "active" },
  { id: "c5", name: "Negotiation", icon: "🤝", expertCount: 3, workshopCount: 2, status: "inactive" },
]

export const users = [
  { id: "u1", name: "Alice Thompson", email: "alice@example.com", role: "Learner", joined: "2025-01-15", status: "active", workshopsCompleted: 4 },
  { id: "u2", name: "Bob Martinez", email: "bob@example.com", role: "Trainer", joined: "2025-02-20", status: "active", workshopsCompleted: 0 },
  { id: "u3", name: "Carol White", email: "carol@example.com", role: "Learner", joined: "2025-03-10", status: "inactive", workshopsCompleted: 2 },
  { id: "u4", name: "Daniel Brown", email: "daniel@example.com", role: "Admin", joined: "2024-12-01", status: "active", workshopsCompleted: 0 },
  { id: "u5", name: "Eva Garcia", email: "eva@example.com", role: "Learner", joined: "2025-04-05", status: "active", workshopsCompleted: 7 },
]

export const generalSettings = {
  siteName: "TopTrainer",
  tagline: "Empowering Professionals Worldwide",
  primaryColor: "#2563eb",
  contactEmail: "hello@toptrainer.com",
  supportPhone: "+1 (800) 555-0199",
  socialLinks: {
    linkedin: "https://linkedin.com/company/toptrainer",
    twitter: "https://twitter.com/toptrainer",
    instagram: "https://instagram.com/toptrainer",
    youtube: "https://youtube.com/@toptrainer",
  },
  heroSliderInterval: 20,
  maintenanceMode: false,
  allowRegistrations: true,
}

export const dashboardStats = {
  totalTrainers: 18,
  totalLearners: 1240,
  totalWorkshops: 4,
  totalArticles: 4,
  monthlyRevenue: 84200,
  activeEnrollments: 75,
}