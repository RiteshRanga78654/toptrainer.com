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

let addedItems = "";

industries.forEach((industry) => {
  for (let i = 1; i <= 8; i++) {
    const title = `${industry} Masterclass ${i}`;
    const price = Math.floor(Math.random() * 500) + 99;
    const rating = (Math.random() * 1 + 4).toFixed(1);
    const enrolledCount = Math.floor(Math.random() * 5000) + 100;
    
    addedItems += `
  {
    createdBy: dummyAdminId,
    creatorType: "Admin",
    basicInformation: {
      title: "${title}",
      category: "${industry}",
      shortDescription: "A fantastic workshop about ${industry}.",
      fullDescription: "Join this comprehensive ${industry} workshop and learn amazing new skills.",
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
      startDate: new Date("2024-10-01"),
      endDate: new Date("2024-10-03"),
      dateRange: "Oct 1 - Oct 3",
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
  },`;
  }
});

const filePath = "backend/data/workshopData.js";
let content = fs.readFileSync(filePath, 'utf8');

// Find the last closing bracket of the array
const lastBracketIndex = content.lastIndexOf('];');
if (lastBracketIndex !== -1) {
  content = content.substring(0, lastBracketIndex) + addedItems + '\n];';
  fs.writeFileSync(filePath, content, 'utf8');
  console.log("Successfully appended 56 new workshops!");
} else {
  console.error("Could not find the end of the array.");
}
