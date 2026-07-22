import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Article from "./models/article.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });

const seedArticles = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    const dummyArticles = [
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_1",
        },
        author: "Sarah Jenkins",
        title: "The Future of AI in Team Management",
        category: "Leadership",
        shortDescription: "Explore how artificial intelligence is transforming the way leaders manage remote teams and track performance metrics.",
        tags: ["AI", "Management", "Future of Work"],
        sections: [
          { type: "heading", content: "AI is Here to Stay" },
          { type: "paragraph", content: "Artificial intelligence is no longer a buzzword. It is actively shaping the way modern managers approach team productivity and wellness." },
          { type: "callout", content: "Did you know? Teams using AI tools report a 30% increase in communication efficiency." },
          { type: "quote", content: "The best leaders adapt, and AI is the greatest adaptation tool of our generation." }
        ],
        status: "published",
        views: 1245,
        likes: 342,
        featured: true,
        publishedAt: new Date(Date.now() - 100000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_2",
        },
        author: "Michael Chen",
        title: "Mastering React 18 Concurrent Mode",
        category: "Technical",
        shortDescription: "A deep dive into React 18's new concurrent rendering features and how to leverage them for faster web applications.",
        tags: ["React", "JavaScript", "Frontend"],
        sections: [
          { type: "heading", content: "Understanding Concurrent Mode" },
          { type: "paragraph", content: "React 18 introduces concurrent rendering, a massive under-the-hood rewrite that allows React to interrupt long-running render tasks." },
          { type: "paragraph", content: "This means your app remains responsive even during complex data visualizations or heavy DOM updates." }
        ],
        status: "published",
        views: 890,
        likes: 210,
        featured: false,
        publishedAt: new Date(Date.now() - 200000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_3",
        },
        author: "Dr. Emily Roberts",
        title: "Data Science for Non-Engineers",
        category: "Data Science",
        shortDescription: "Breaking down complex data science concepts into actionable insights for marketing and product managers.",
        tags: ["Data", "Analytics", "Business"],
        sections: [
          { type: "heading", content: "Data is the New Oil" },
          { type: "paragraph", content: "You don't need a PhD in statistics to understand how data impacts your business." },
          { type: "callout", content: "Start tracking the right metrics, not just all the metrics." }
        ],
        status: "published",
        views: 2300,
        likes: 540,
        featured: true,
        publishedAt: new Date(Date.now() - 300000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_4",
        },
        author: "James Wilson",
        title: "The Art of Active Listening",
        category: "Soft Skills",
        shortDescription: "Improve your interpersonal communication by mastering the subtle art of truly listening to your peers.",
        tags: ["Communication", "Empathy", "Career Growth"],
        sections: [
          { type: "heading", content: "Hearing vs. Listening" },
          { type: "paragraph", content: "Many of us hear what others say, but few of us actually listen to understand. We often listen just to reply." },
          { type: "quote", content: "Most people do not listen with the intent to understand; they listen with the intent to reply." }
        ],
        status: "published",
        views: 450,
        likes: 120,
        featured: false,
        publishedAt: new Date(Date.now() - 400000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_5",
        },
        author: "Anita Patel",
        title: "Building Resilient Distributed Systems",
        category: "Technical",
        shortDescription: "Learn the architectural patterns required to build highly available backend systems that can withstand regional outages.",
        tags: ["Architecture", "Backend", "Cloud"],
        sections: [
          { type: "heading", content: "Designing for Failure" },
          { type: "paragraph", content: "In distributed systems, failure isn't an 'if', it's a 'when'. Designing for failure means building graceful degradation into your core architecture." }
        ],
        status: "published",
        views: 3200,
        likes: 890,
        featured: true,
        publishedAt: new Date(Date.now() - 500000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_6",
        },
        author: "David Lee",
        title: "Corporate Wellness: Beyond the Ping Pong Table",
        category: "Wellness",
        shortDescription: "True employee wellness requires more than just superficial office perks. Discover what actually moves the needle on burnout.",
        tags: ["Mental Health", "HR", "Culture"],
        sections: [
          { type: "heading", content: "The Burnout Epidemic" },
          { type: "paragraph", content: "Ping pong tables and free snacks do not cure burnout. Autonomy, clear expectations, and psychological safety do." },
          { type: "callout", content: "Companies investing in genuine mental health support see a 40% reduction in turnover." }
        ],
        status: "published",
        views: 1850,
        likes: 410,
        featured: false,
        publishedAt: new Date(Date.now() - 600000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_7",
        },
        author: "Elena Rodriguez",
        title: "Negotiation Tactics for Project Managers",
        category: "Management",
        shortDescription: "How to negotiate resources, timelines, and budgets effectively without damaging stakeholder relationships.",
        tags: ["Negotiation", "Project Management"],
        sections: [
          { type: "heading", content: "Win-Win Scenarios" },
          { type: "paragraph", content: "The best negotiations don't end with a winner and a loser. They end with two parties who feel their core needs were respected." }
        ],
        status: "published",
        views: 950,
        likes: 275,
        featured: false,
        publishedAt: new Date(Date.now() - 700000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_8",
        },
        author: "Thomas Wright",
        title: "Intro to Machine Learning Models",
        category: "AI Goal-Based",
        shortDescription: "A beginner-friendly overview of supervised vs. unsupervised learning models and when to use them.",
        tags: ["Machine Learning", "AI", "Data"],
        sections: [
          { type: "heading", content: "Supervised Learning" },
          { type: "paragraph", content: "Think of supervised learning as a teacher guiding a student. You provide the model with labeled data and the correct answers." },
          { type: "heading", content: "Unsupervised Learning" },
          { type: "paragraph", content: "Here, the model is left to find patterns on its own in unlabeled data, like grouping similar customers together." }
        ],
        status: "published",
        views: 4100,
        likes: 1100,
        featured: true,
        publishedAt: new Date(Date.now() - 800000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_9",
        },
        author: "Marcus Johnson",
        title: "Conflict Resolution in Remote Teams",
        category: "Leadership",
        shortDescription: "When you can't read body language, conflicts can escalate quickly. Here is how to de-escalate tension over Slack and Zoom.",
        tags: ["Remote Work", "Conflict Resolution", "Leadership"],
        sections: [
          { type: "heading", content: "The Empathy Gap" },
          { type: "paragraph", content: "Text-based communication strips away tone. Always assume positive intent until proven otherwise." },
          { type: "callout", content: "Rule of thumb: If a text debate goes back and forth more than 3 times, jump on a quick call." }
        ],
        status: "published",
        views: 1120,
        likes: 380,
        featured: false,
        publishedAt: new Date(Date.now() - 900000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_10",
        },
        author: "Sophie Clark",
        title: "CSS Grid vs Flexbox: When to use which?",
        category: "Technical",
        shortDescription: "Stop guessing your CSS layouts. A definitive guide on choosing between Grid and Flexbox for modern web design.",
        tags: ["CSS", "Frontend", "Design"],
        sections: [
          { type: "heading", content: "1D vs 2D Layouts" },
          { type: "paragraph", content: "Use Flexbox when you care about alignment in one direction (a row or a column). Use CSS Grid when you care about both rows and columns simultaneously." }
        ],
        status: "published",
        views: 5600,
        likes: 1450,
        featured: true,
        publishedAt: new Date(Date.now() - 1000000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_11",
        },
        author: "Alex Morgan",
        title: "Public Speaking for Introverts",
        category: "Communication",
        shortDescription: "Public speaking doesn't require an extroverted personality. Learn how to leverage introverted traits for compelling presentations.",
        tags: ["Public Speaking", "Introvert", "Growth"],
        sections: [
          { type: "heading", content: "Preparation is Your Superpower" },
          { type: "paragraph", content: "Introverts often excel at deep preparation. Use this to your advantage by structuring your talk meticulously." },
          { type: "quote", content: "Quiet people have the loudest minds." }
        ],
        status: "published",
        views: 2900,
        likes: 850,
        featured: false,
        publishedAt: new Date(Date.now() - 1100000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_12",
        },
        author: "Brian Taylor",
        title: "SEO Best Practices in 2026",
        category: "Marketing",
        shortDescription: "How search engines are evolving with AI and what you need to do to keep your content ranking high.",
        tags: ["SEO", "Marketing", "Content"],
        sections: [
          { type: "heading", content: "AI Search Generative Experience" },
          { type: "paragraph", content: "With Google's SGE, answering the user's intent directly and concisely is more important than ever." }
        ],
        status: "published",
        views: 3400,
        likes: 920,
        featured: true,
        publishedAt: new Date(Date.now() - 1200000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_13",
        },
        author: "Nina Dobrev",
        title: "Agile Estimation Techniques",
        category: "Management",
        shortDescription: "Move beyond standard story points. Explore alternative estimation techniques for software engineering teams.",
        tags: ["Agile", "Scrum", "Engineering"],
        sections: [
          { type: "heading", content: "Why We Estimate" },
          { type: "paragraph", content: "Estimation isn't about setting deadlines; it's about aligning the team's understanding of the complexity of a task." },
          { type: "callout", content: "Try T-shirt sizing for high-level roadmap planning to avoid false precision." }
        ],
        status: "published",
        views: 1250,
        likes: 310,
        featured: false,
        publishedAt: new Date(Date.now() - 1300000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_14",
        },
        author: "Rachel Kim",
        title: "Building a Culture of Continuous Feedback",
        category: "HR",
        shortDescription: "Annual performance reviews are dead. Learn how to build a system of continuous, constructive feedback.",
        tags: ["Feedback", "Culture", "HR"],
        sections: [
          { type: "heading", content: "Feedback is a Gift" },
          { type: "paragraph", content: "When delivered with radical candor, frequent feedback prevents small issues from becoming unmanageable problems." }
        ],
        status: "published",
        views: 2100,
        likes: 670,
        featured: false,
        publishedAt: new Date(Date.now() - 1400000000)
      },
      {
        trainer: new mongoose.Types.ObjectId().toString(),
        coverImage: {
          url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
          publicId: "dummy_15",
        },
        author: "Kevin Chang",
        title: "Introduction to Web Accessibility (a11y)",
        category: "Technical",
        shortDescription: "Why accessibility matters and the top 5 easy wins you can implement today to make your app more inclusive.",
        tags: ["Accessibility", "Web", "Frontend"],
        sections: [
          { type: "heading", content: "Accessibility is Not Optional" },
          { type: "paragraph", content: "Building accessible apps isn't just a legal requirement; it's the right thing to do to ensure the web is usable by everyone." },
          { type: "callout", content: "Start by navigating your entire application using only your keyboard." }
        ],
        status: "published",
        views: 4800,
        likes: 1600,
        featured: true,
        publishedAt: new Date(Date.now() - 1500000000)
      }
    ];

    await Article.deleteMany({ author: { $in: dummyArticles.map(a => a.author) } }); // prevent dupes if run multiple times
    const inserted = await Article.insertMany(dummyArticles);
    console.log(`Successfully inserted ${inserted.length} dummy articles.`);

    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding articles:", error);
    mongoose.connection.close();
  }
};

seedArticles();
