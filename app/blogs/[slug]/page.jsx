import Link from "next/link";
import {
  Calendar,
  Clock,
  Facebook,
  Linkedin,
  Twitter,
  Link2,
  Star,
  MailOpen,
  Target,
  Users,
  MonitorPlay,
  MessageSquare,
  UserCheck,
  Brain,
  Zap,
  BarChart2,
  Shield,
  Lightbulb,
  Cpu,
  Globe,
  TrendingUp,
} from "lucide-react";

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────

const FEED_DATA = [
  {
    slug: "how-to-choose-the-right-corporate-trainer",
    tag: "Corporate Training",
    authorRole: "Learning & Development Specialist",
    authorBio:
      "Priya writes about corporate training, leadership development, and building high-performance teams.",
    tags: ["Corporate Training", "L&D", "Trainer Selection", "Workplace Learning", "Skills Development"],
    title: "How to Choose the Right Corporate Trainer for Your Organization",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&auto=format&fit=crop",
    subtext: "Key factors to consider when selecting a trainer who can deliver real impact.",
    authorImage: "https://ui-avatars.com/api/?name=Priya+Mehta&background=2563eb&color=fff",
    authorName: "Priya Mehta",
    date: "May 20, 2024",
    time: "6 min read",
    intro:
      "The right corporate trainer can transform your team's skills, mindset, and performance. But with so many options available, how do you choose the one who's truly the right fit for your organization?\n\nHere's a practical guide to help you make an informed decision.",
    sections: [
      {
        icon: Target,
        heading: "1. Understand Your Training Needs",
        body: "Start by identifying the specific skills, behaviors, or business outcomes you want to address. Clear goals will help you find a trainer with the right expertise and experience.",
      },
      {
        icon: UserCheck,
        heading: "2. Evaluate Their Expertise and Experience",
        body: "Look for trainers who have deep subject-matter knowledge and relevant industry experience. Check their track record, client portfolio, and the types of programs they've delivered.",
      },
      {
        icon: MonitorPlay,
        heading: "3. Assess Their Training Approach",
        body: "Every trainer has a unique style. Make sure their approach aligns with your learning objectives and resonates with your team. Do they use interactive methods? Do they customize content?",
      },
      {
        icon: MessageSquare,
        heading: "4. Check Reviews and Testimonials",
        body: "Feedback from past clients can give you valuable insights into a trainer's reliability, professionalism, and impact.",
      },
      {
        icon: Users,
        heading: "5. Consider Engagement and Compatibility",
        body: "A great trainer connects with the audience and creates a safe space for learning. A quick conversation or demo session can help you gauge their communication and engagement skills.",
      },
    ],
    conclusion:
      "Choosing the right corporate trainer is an investment in your people and your business outcomes. Take the time to evaluate, ask the right questions, and partner with someone who can truly make a difference.",
  },
  {
    slug: "7-ld-strategies-to-build-a-future-ready-workforce",
    tag: "L&D Strategies",
    authorRole: "L&D Consultant",
    authorBio:
      "Rahul focuses on aligning learning strategy with business outcomes for enterprise organisations.",
    tags: ["L&D", "Workforce", "Strategy", "Future of Work", "Corporate"],
    title: "7 L&D Strategies to Build a Future-Ready Workforce",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=900&auto=format&fit=crop",
    subtext: "Practical strategies to align learning initiatives with business goals.",
    authorImage: "https://ui-avatars.com/api/?name=Rahul+Desai&background=0e4b8c&color=fff",
    authorName: "Rahul Desai",
    date: "May 18, 2024",
    time: "5 min read",
    intro:
      "The pace of change in business has never been faster. L&D leaders must evolve beyond traditional training calendars and embrace strategies that create continuously learning organisations.",
    sections: [
      { icon: Target,      heading: "1. Align Learning with Business Strategy",  body: "Every L&D initiative should map directly to a business outcome. Partner with department heads quarterly to identify the skills gaps that most impact growth." },
      { icon: Zap,         heading: "2. Embrace Microlearning",                  body: "Short, focused modules (5–10 minutes) fit into the flow of work. They are easier to update, easier to complete, and statistically more likely to be retained." },
      { icon: Users,       heading: "3. Build a Coaching Culture",               body: "Pair formal training with peer-to-peer coaching. Employees learn more from each other than from any external program alone." },
      { icon: UserCheck,   heading: "4. Invest in Manager Capability",           body: "Managers are the single biggest lever in workforce development. Equip them to hold developmental conversations and give feedback consistently." },
      { icon: Brain,       heading: "5. Use Data to Personalise Learning",       body: "Learning platforms with AI can surface the right content at the right time. Use engagement data to iterate and retire content that isn't working." },
      { icon: BarChart2,   heading: "6. Measure Learning Transfer, Not Completion", body: "Completion rates measure compliance. Behaviour change measures impact. Design assessments that capture application on the job." },
      { icon: Shield,      heading: "7. Create Psychological Safety",            body: "People learn best when they feel safe to fail. Normalise experimentation and position mistakes as learning opportunities." },
    ],
    conclusion:
      "Future-proofing your workforce is not a one-time project. It requires embedding continuous learning into the culture, systems, and leadership behaviours of your organisation.",
  },
  {
    slug: "the-most-in-demand-soft-skills-in-2024",
    tag: "Soft Skills",
    authorRole: "Career Development Coach",
    authorBio:
      "Anjali helps professionals unlock their potential through soft-skills coaching and career strategy.",
    tags: ["Soft Skills", "Career", "2024", "Communication", "Leadership"],
    title: "The Most In-Demand Soft Skills in 2024",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900&auto=format&fit=crop",
    subtext: "Skills that professionals need to thrive in the modern workplace.",
    authorImage: "https://ui-avatars.com/api/?name=Anjali+Shah&background=2563eb&color=fff",
    authorName: "Anjali Shah",
    date: "May 15, 2024",
    time: "4 min read",
    intro:
      "As automation handles more routine tasks, human skills are becoming the primary differentiator between good and exceptional professionals.",
    sections: [
      { icon: Brain,       heading: "1. Adaptive Thinking",                      body: "The ability to pivot quickly and reframe problems is essential in an era of constant disruption. Employers actively seek candidates who demonstrate flexibility." },
      { icon: UserCheck,   heading: "2. Emotional Intelligence (EQ)",            body: "Self-awareness, empathy, and the ability to manage relationships under pressure are consistently ranked among the top hiring criteria across industries." },
      { icon: MessageSquare, heading: "3. Communication Across Formats",         body: "From async Slack messages to executive presentations, clarity across formats has never mattered more." },
      { icon: Lightbulb,   heading: "4. Critical Thinking",                      body: "With information overload the norm, the ability to evaluate sources, identify bias, and synthesise information into sound decisions is invaluable." },
      { icon: Users,       heading: "5. Collaboration in Hybrid Environments",   body: "Professionals who can build rapport and maintain trust across geographies and time zones stand out in today's distributed workplaces." },
    ],
    conclusion:
      "Investing in soft skills is no longer optional. Organisations that prioritise human capability alongside technical training will be far better positioned to adapt and grow.",
  },
  {
    slug: "how-technology-is-transforming-corporate-training",
    tag: "Technology in Training",
    authorRole: "EdTech Strategist",
    authorBio:
      "Karan explores how emerging technology is reshaping the future of learning and development.",
    tags: ["Technology", "EdTech", "AI", "Corporate Training", "Future of Learning"],
    title: "How Technology is Transforming Corporate Training",
    image: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=900&auto=format&fit=crop",
    subtext: "Explore the latest tools and trends shaping the future of learning.",
    authorImage: "https://ui-avatars.com/api/?name=Karan+Malhotra&background=0e4b8c&color=fff",
    authorName: "Karan Malhotra",
    date: "May 12, 2024",
    time: "6 min read",
    intro:
      "Technology is no longer a nice-to-have in corporate training — it is the backbone of scalable, personalised, and measurable workforce development.",
    sections: [
      { icon: Brain,       heading: "1. AI-Powered Learning Paths",              body: "Modern LMS platforms use machine learning to recommend content based on role, past engagement, and skill gaps, reducing irrelevant content and accelerating competency." },
      { icon: Cpu,         heading: "2. Immersive Learning with VR/AR",          body: "Companies like Walmart and UPS have deployed VR for safety and service training. Immersive environments improve retention by up to 75% vs traditional e-learning." },
      { icon: Globe,       heading: "3. Social and Collaborative Platforms",     body: "Tools like Notion and Loom have transformed knowledge-sharing from top-down exercise into a peer-driven ecosystem." },
      { icon: BarChart2,   heading: "4. Real-Time Analytics",                   body: "Modern L&D teams can now track not just completion but engagement, quiz scores, and post-training behaviours — enabling rapid iteration." },
      { icon: TrendingUp,  heading: "5. Generative AI as a Training Partner",   body: "AI tutors that provide instant feedback and simulate role-play conversations are already being piloted by enterprises and will become standard within two years." },
    ],
    conclusion:
      "The organisations that embrace technology not as a replacement for human trainers, but as a complement, will unlock learning experiences that are faster, smarter, and more impactful.",
  },
];

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────

const TAG_COLORS = {
  "Corporate Training":    "bg-blue-50 text-blue-700",
  "L&D Strategies":        "bg-indigo-50 text-indigo-700",
  "Soft Skills":           "bg-emerald-50 text-emerald-700",
  "Technology in Training":"bg-cyan-50 text-cyan-700",
};

// ─────────────────────────────────────────────
//  PAGE
// ─────────────────────────────────────────────

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = FEED_DATA.find((p) => p.slug === slug);
  const related = FEED_DATA.filter((p) => p.slug !== slug).slice(0, 3);

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <p className="text-gray-400 text-lg mb-4">Post not found.</p>
        <Link href="/blogs" className="text-blue-600 hover:underline text-sm">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const tagClass = TAG_COLORS[post.tag] || "bg-gray-100 text-gray-600";

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/blogs" className="hover:text-blue-600 transition-colors">Blog</Link>
          <span>›</span>
          <span className="text-gray-500">{post.tag}</span>
          <span>›</span>
          <span className="text-gray-700 truncate max-w-xs">{post.title}</span>
        </nav>

        {/* ── Two-column layout ── */}
        <div className="flex gap-10 items-start">

          {/* ══════════ LEFT: Main Content ══════════ */}
          <main className="flex-1 min-w-0">

            {/* Tag */}
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-4 ${tagClass}`}>
              {post.tag}
            </span>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>

            {/* Subtext */}
            <p className="text-gray-500 text-base leading-relaxed mb-5">
              {post.subtext}
            </p>

            {/* Author + meta + share row */}
            <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-5 mb-6 flex-wrap">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorImage}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800 leading-tight">{post.authorName}</p>
                  <p className="text-xs text-gray-400">{post.authorRole}</p>
                </div>
                <div className="flex items-center gap-3 ml-4 text-xs text-gray-400">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.time}</span>
                </div>
              </div>
              {/* Share icons */}
              <div className="flex items-center gap-2">
                {[Facebook, Linkedin, Twitter, Link2].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <Icon size={14} className="text-gray-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Intro paragraphs */}
            {post.intro.split("\n\n").map((para, i) => (
              <p key={i} className="text-gray-600 text-sm leading-relaxed mb-4">
                {para}
              </p>
            ))}

            {/* Numbered sections */}
            <div className="mt-6 flex flex-col gap-6">
              {post.sections.map((section, i) => {
                const Icon = section.icon;
                return (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mt-0.5">
                      <Icon size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-sm font-bold text-gray-900 mb-1">{section.heading}</h2>
                      <p className="text-gray-500 text-sm leading-relaxed">{section.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Conclusion box */}
            <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-5 flex gap-4 items-start">
              <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
                <Star size={16} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800 mb-1">Conclusion</p>
                <p className="text-sm text-gray-600 leading-relaxed">{post.conclusion}</p>
              </div>
            </div>

            {/* Tags row */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <span className="text-sm text-gray-500 font-medium">Tags:</span>
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Author bio card */}
            <div className="mt-8 bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex gap-4 items-start">
              <img
                src={post.authorImage}
                alt={post.authorName}
                className="w-14 h-14 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="font-bold text-gray-900 text-sm">{post.authorName}</p>
                <p className="text-xs text-gray-400 mb-1">{post.authorRole}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{post.authorBio}</p>
                <button className="mt-2 w-7 h-7 flex items-center justify-center rounded-md bg-blue-600 hover:bg-blue-700 transition-colors">
                  <Linkedin size={14} className="text-white" />
                </button>
              </div>
            </div>
          </main>

          {/* ══════════ RIGHT: Sidebar ══════════ */}
          <aside className="w-72 flex-shrink-0 flex flex-col gap-5 sticky top-8">

            {/* Table of Contents */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="font-bold text-gray-800 text-sm mb-3">Table of Contents</p>
              <ol className="flex flex-col gap-1">
                {post.sections.map((section, i) => {
                  const label = section.heading.replace(/^\d+\.\s/, "");
                  return (
                    <li key={i}>
                      <span
                        className={`block text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                          i === 0
                            ? "bg-blue-50 text-blue-700 font-semibold"
                            : "text-gray-500 hover:text-blue-600 hover:bg-gray-50"
                        }`}
                      >
                        {i + 1}. {label}
                      </span>
                    </li>
                  );
                })}
                <li>
                  <span className="block text-xs px-3 py-1.5 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-gray-50 cursor-pointer transition-colors">
                    Conclusion
                  </span>
                </li>
              </ol>
            </div>

            {/* Share this article */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="font-bold text-gray-800 text-sm mb-3">Share this article</p>
              <div className="flex items-center gap-2">
                {[Facebook, Linkedin, Twitter, Link2].map((Icon, i) => (
                  <button
                    key={i}
                    className="w-9 h-9 flex items-center justify-center rounded-full border border-gray-200 bg-white hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  >
                    <Icon size={15} className="text-gray-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="font-bold text-gray-800 text-sm mb-4">Related Articles</p>
              <div className="flex flex-col gap-4">
                {related.map((r) => {
                  const relTagClass = TAG_COLORS[r.tag] || "bg-gray-100 text-gray-600";
                  return (
                    <Link key={r.slug} href={`/blogs/${r.slug}`} className="flex gap-3 group">
                      <div className="flex-shrink-0 w-16 h-14 rounded-xl overflow-hidden">
                        <img
                          src={r.image}
                          alt={r.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mb-1 ${relTagClass}`}>
                          {r.tag}
                        </span>
                        <p className="text-xs font-semibold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors line-clamp-2">
                          {r.title}
                        </p>
                        <p className="text-[11px] text-gray-400 mt-1">
                          {r.date} · {r.time}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <Link
                href="/blogs"
                className="inline-block mt-4 text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
              >
                View all articles →
              </Link>
            </div>

            {/* Newsletter CTA */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <div className="flex justify-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <MailOpen size={18} className="text-blue-600" />
                </div>
              </div>
              <p className="font-bold text-gray-800 text-sm mb-1">Stay ahead in L&D</p>
              <p className="text-xs text-gray-400 leading-relaxed mb-4">
                Subscribe to get the latest insights delivered to your inbox.
              </p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 mb-3 transition-all"
              />
              <button className="w-full bg-[#0e4b8c] hover:bg-blue-700 text-white font-semibold text-sm py-2.5 rounded-xl transition-colors">
                Subscribe
              </button>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
