const fs = require('fs');

const industries = [
  "Technology",
  "Business",
  "Health & Wellness",
  "Finance",
  "Marketing",
  "Creative Arts",
  "Growth"
];

// --- GENERATE TRAINERS ---
let trainerEntries = [];
let phoneCounter = 1000000000;

industries.forEach((industry, indIdx) => {
  for (let i = 1; i <= 3; i++) {
    const firstName = `Trainer${indIdx}${i}`;
    const lastName = `${industry.replace(/[^a-zA-Z]/g, '')}`;
    
    trainerEntries.push(`
  {
    userData: {
      firstName: "${firstName}",
      lastName: "${lastName}",
      email: "${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com",
      phoneNumber: ${phoneCounter++},
      password: "Password@123",
    },
    profileData: {
      fullName: "${firstName} ${lastName}",
      companyName: "${industry} Experts LLC",
      subjectLine: "Expert ${industry} Professional",
      tagsLine: ["${industry}", "Expert", "Mentor"],
      contactInfo: {
        email: "${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com",
        phone: "${phoneCounter}",
        location: { city: "New York", state: "NY", country: "USA" },
      },
      expertiseDomain: {
        industry: ["${industry}"],
        competencies: ["${industry} Basics", "${industry} Advanced"],
      },
      isFeatured: ${i === 1 ? 'true' : 'false'},
    }
  }`);
  }
});

const trainerContent = `export const dummyTrainers = [\n${trainerEntries.join(',')}\n];\n`;
fs.writeFileSync("backend/data/trainerData.js", trainerContent, 'utf8');


// --- GENERATE WORKSHOPS ---
let workshopEntries = [];

industries.forEach((industry) => {
  for (let i = 1; i <= 10; i++) {
    const title = `${industry} Mastery Level ${i}`;
    const price = Math.floor(Math.random() * 500) + 99;
    const rating = (Math.random() * 1 + 4).toFixed(1);
    const enrolledCount = Math.floor(Math.random() * 5000) + 100;
    
    workshopEntries.push(`
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "${title}",
      category: "${industry}",
      shortDescription: "A fantastic workshop about ${industry}.",
      fullDescription: "Join this comprehensive ${industry} workshop and learn amazing new skills. This course covers everything from basics to advanced techniques.",
      targetAudience: "Everyone",
      coverImage: {
        url: "https://via.placeholder.com/800x600?text=${encodeURIComponent(industry)}",
        publicId: "dummy_cover_${industry.replace(/[^a-zA-Z]/g, '')}_${i}",
      },
      thumbnail: {
        url: "https://via.placeholder.com/300x200?text=${encodeURIComponent(industry)}",
        publicId: "dummy_thumb_${industry.replace(/[^a-zA-Z]/g, '')}_${i}",
      },
    },
    schedule: {
      startDate: new Date("2024-11-01"),
      endDate: new Date("2024-11-03"),
      dateRange: "Nov 1 - Nov 3",
      timeSlot: "10:00 AM - 1:00 PM",
      duration: 3,
      location: "Zoom",
      deliveryMode: "Online",
    },
    pricing: {
      price: ${price},
      originalPrice: ${price + 100},
    },
    classification: {
      industry: "${industry}",
      competency: "${industry} Basics",
      tags: ["${industry}", "Masterclass", "Online"],
    },
    analytics: {
      rating: ${rating},
      enrolledCount: ${enrolledCount},
      views: ${enrolledCount * 3},
    },
    status: "published",
    visibility: true,
    isFeatured: false,
  }`);
  }
});

const workshopContent = `import mongoose from "mongoose";\nconst dummyAdminId = new mongoose.Types.ObjectId();\n\nexport const dummyWorkshops = [\n${workshopEntries.join(',')}\n];\n`;
fs.writeFileSync("backend/data/workshopData.js", workshopContent, 'utf8');

console.log("Successfully generated all trainers and workshops!");
