export const dummyWorkshops = [
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "Mastering React & Next.js",
      category: "Web Development",
      shortDescription: "Learn to build modern, scalable web applications.",
      fullDescription:
        "A comprehensive deep dive into React and Next.js ecosystem. Learn SSR, SSG, routing, and state management.",
      targetAudience: "Intermediate developers",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=NextJS",
        publicId: "dummy_cover_1",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=NextJS",
        publicId: "dummy_thumb_1",
      },
    },
    schedule: {
      startDate: new Date("2024-09-01"),
      endDate: new Date("2024-09-03"),
      dateRange: "Sep 1 - Sep 3",
      timeSlot: "10:00 AM - 1:00 PM",
      duration: 9,
      location: "Zoom",
      deliveryMode: "Online",
    },
    pricing: {
      price: 299,
    },
    classification: {
      industry: "Technology",
      competency: "Frontend Development",
      tags: ["React", "Next.js", "JavaScript"],
    },
    status: "published",
    visibility: true,
    isFeatured: false,
  },
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "Advanced Data Science with Python",
      category: "Data Science",
      shortDescription: "Master pandas, scikit-learn, and neural networks.",
      fullDescription:
        "Step by step guide to building machine learning models from scratch using Python.",
      targetAudience: "Data analysts and developers",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=Data+Science",
        publicId: "dummy_cover_2",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=Data+Science",
        publicId: "dummy_thumb_2",
      },
    },
    schedule: {
      startDate: new Date("2024-10-15"),
      endDate: new Date("2024-10-18"),
      dateRange: "Oct 15 - Oct 18",
      timeSlot: "2:00 PM - 5:00 PM",
      duration: 12,
      location: "Google Meet",
      deliveryMode: "Online",
    },
    pricing: {
      price: 199,
    },
    classification: {
      industry: "Technology",
      competency: "Machine Learning",
      tags: ["Python", "AI", "Data Science"],
    },
    status: "published",
    visibility: true,
    isFeatured: true, // One featured by default
  },
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "Digital Marketing Masterclass",
      category: "Marketing",
      shortDescription: "SEO, SEM, and Social Media strategies.",
      fullDescription:
        "Grow your brand with modern digital marketing techniques.",
      targetAudience: "Marketers and business owners",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=Marketing",
        publicId: "dummy_cover_3",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=Marketing",
        publicId: "dummy_thumb_3",
      },
    },
    schedule: {
      startDate: new Date("2024-11-05"),
      endDate: new Date("2024-11-06"),
      dateRange: "Nov 5 - Nov 6",
      timeSlot: "9:00 AM - 12:00 PM",
      duration: 6,
      location: "New York Convention Center",
      deliveryMode: "In-Person",
    },
    pricing: {
      price: 499,
    },
    classification: {
      industry: "Marketing",
      competency: "Digital Strategy",
      tags: ["SEO", "Marketing", "Social Media"],
    },
    status: "published",
    visibility: true,
    isFeatured: false,
  },
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "UI/UX Design for Beginners",
      category: "Design",
      shortDescription: "Learn Figma, wireframing, and user research.",
      fullDescription:
        "A complete guide to designing beautiful and functional user interfaces.",
      targetAudience: "Beginner designers",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=UIUX",
        publicId: "dummy_cover_4",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=UIUX",
        publicId: "dummy_thumb_4",
      },
    },
    schedule: {
      startDate: new Date("2024-12-01"),
      endDate: new Date("2024-12-02"),
      dateRange: "Dec 1 - Dec 2",
      timeSlot: "11:00 AM - 2:00 PM",
      duration: 6,
      location: "Zoom",
      deliveryMode: "Online",
    },
    pricing: {
      price: 149,
    },
    classification: {
      industry: "Design",
      competency: "UI/UX",
      tags: ["Figma", "Design", "Wireframing"],
    },
    status: "published",
    visibility: true,
    isFeatured: false,
  },
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "Advanced Agile & Scrum Methodology",
      category: "Business",
      shortDescription:
        "Master Agile principles to lead high-performing teams.",
      fullDescription:
        "Learn advanced Scrum master techniques, sprint planning, and removing blockers for software teams.",
      targetAudience: "Project Managers and Developers",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=Agile",
        publicId: "dummy_cover_5",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=Agile",
        publicId: "dummy_thumb_5",
      },
    },
    schedule: {
      startDate: new Date("2024-09-20"),
      endDate: new Date("2024-09-22"),
      dateRange: "Sep 20 - Sep 22",
      timeSlot: "10:00 AM - 1:00 PM",
      duration: 9,
      location: "Zoom",
      deliveryMode: "Online",
    },
    pricing: { price: 249 },
    classification: {
      industry: "Technology",
      competency: "Agile",
      tags: ["Agile", "Scrum", "Management"],
    },
    status: "published",
    visibility: true,
    isFeatured: false,
  },
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "Cybersecurity Fundamentals",
      category: "Security",
      shortDescription: "Protect your organization from modern cyber threats.",
      fullDescription:
        "A comprehensive intro to network security, cryptography, and ethical hacking.",
      targetAudience: "IT Professionals",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=Security",
        publicId: "dummy_cover_6",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=Security",
        publicId: "dummy_thumb_6",
      },
    },
    schedule: {
      startDate: new Date("2024-10-05"),
      endDate: new Date("2024-10-07"),
      dateRange: "Oct 5 - Oct 7",
      timeSlot: "1:00 PM - 5:00 PM",
      duration: 12,
      location: "Google Meet",
      deliveryMode: "Online",
    },
    pricing: { price: 399 },
    classification: {
      industry: "Technology",
      competency: "Cybersecurity",
      tags: ["Security", "IT", "Network"],
    },
    status: "published",
    visibility: true,
    isFeatured: false,
  },
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "Public Speaking for Leaders",
      category: "Communication",
      shortDescription: "Deliver powerful and persuasive presentations.",
      fullDescription:
        "Conquer stage fright, craft compelling narratives, and command any room.",
      targetAudience: "Executives and Managers",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=Speaking",
        publicId: "dummy_cover_7",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=Speaking",
        publicId: "dummy_thumb_7",
      },
    },
    schedule: {
      startDate: new Date("2024-08-15"),
      endDate: new Date("2024-08-16"),
      dateRange: "Aug 15 - Aug 16",
      timeSlot: "9:00 AM - 4:00 PM",
      duration: 14,
      location: "London Conference Center",
      deliveryMode: "In-Person",
    },
    pricing: { price: 599 },
    classification: {
      industry: "Corporate",
      competency: "Communication",
      tags: ["Leadership", "Speaking", "Soft Skills"],
    },
    status: "published",
    visibility: true,
    isFeatured: false,
  },
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "Financial Modeling in Excel",
      category: "Finance",
      shortDescription: "Build dynamic financial models for valuation.",
      fullDescription:
        "Learn how to forecast revenues, model expenses, and perform DCF analysis.",
      targetAudience: "Analysts and Finance Professionals",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=Finance",
        publicId: "dummy_cover_8",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=Finance",
        publicId: "dummy_thumb_8",
      },
    },
    schedule: {
      startDate: new Date("2024-11-12"),
      endDate: new Date("2024-11-14"),
      dateRange: "Nov 12 - Nov 14",
      timeSlot: "6:00 PM - 9:00 PM",
      duration: 9,
      location: "Zoom",
      deliveryMode: "Online",
    },
    pricing: { price: 199 },
    classification: {
      industry: "Finance",
      competency: "Financial Modeling",
      tags: ["Excel", "Finance", "Valuation"],
    },
    status: "published",
    visibility: true,
    isFeatured: false,
  },
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "Blockchain & Web3 Deep Dive",
      category: "Technology",
      shortDescription: "Understand smart contracts and decentralized apps.",
      fullDescription:
        "A developer's guide to building on Ethereum and understanding the Web3 landscape.",
      targetAudience: "Software Engineers",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=Web3",
        publicId: "dummy_cover_9",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=Web3",
        publicId: "dummy_thumb_9",
      },
    },
    schedule: {
      startDate: new Date("2024-12-10"),
      endDate: new Date("2024-12-12"),
      dateRange: "Dec 10 - Dec 12",
      timeSlot: "10:00 AM - 1:00 PM",
      duration: 9,
      location: "Discord",
      deliveryMode: "Online",
    },
    pricing: { price: 349 },
    classification: {
      industry: "Technology",
      competency: "Blockchain",
      tags: ["Web3", "Crypto", "Ethereum"],
    },
    status: "published",
    visibility: true,
    isFeatured: false,
  },
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "Mindfulness and Stress Management",
      category: "Health & Wellness",
      shortDescription: "Practical techniques for maintaining focus and calm.",
      fullDescription:
        "Learn science-backed methods to reduce workplace stress and improve productivity.",
      targetAudience: "All professionals",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=Wellness",
        publicId: "dummy_cover_10",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=Wellness",
        publicId: "dummy_thumb_10",
      },
    },
    schedule: {
      startDate: new Date("2024-09-05"),
      endDate: new Date("2024-09-05"),
      dateRange: "Sep 5",
      timeSlot: "10:00 AM - 12:00 PM",
      duration: 2,
      location: "Microsoft Teams",
      deliveryMode: "Online",
    },
    pricing: { price: 49 },
    classification: {
      industry: "Corporate",
      competency: "Wellness",
      tags: ["Mental Health", "Productivity", "HR"],
    },
    status: "published",
    visibility: true,
    isFeatured: false,
  },
];
