import {
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

// Icons are cycled through for each derived heading section since the
// backend does not store an icon per section.
const SECTION_ICONS = [
  Target,
  UserCheck,
  MonitorPlay,
  MessageSquare,
  Users,
  Brain,
  Zap,
  BarChart2,
  Shield,
  Lightbulb,
  Cpu,
  Globe,
  TrendingUp,
];

export function formatBlogDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function wordsOf(str = "") {
  return str && str.trim() ? str.trim().split(/\s+/).length : 0;
}

export function estimateReadTime(article) {
  const bodyWords = (article.sections || []).reduce(
    (sum, s) => sum + wordsOf(s.content),
    0
  );
  const total = bodyWords + wordsOf(article.shortDescription);
  const minutes = Math.max(1, Math.round(total / 200));
  return `${minutes} min read`;
}

export function getAuthorName(article) {
  if (article.author) return article.author;
  const creator = article.createdBy;
  if (creator?.fullName) return creator.fullName;
  if (creator?.firstName || creator?.lastName) {
    return `${creator.firstName || ""} ${creator.lastName || ""}`.trim();
  }
  return "Admin";
}

export function getAuthorImage(name) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name || "Admin"
  )}&background=2563eb&color=fff`;
}

// Maps a backend Article doc into the shape the /blogs feed card expects.
export function mapArticleToCard(article) {
  const authorName = getAuthorName(article);
  return {
    slug: article._id,
    tag: article.category || "General",
    title: article.title,
    image: article.coverImage?.url || "/blogs/hero.jpg",
    subtext: article.shortDescription || "",
    authorImage: getAuthorImage(authorName),
    authorName,
    date: formatBlogDate(article.publishedAt || article.createdAt),
    time: estimateReadTime(article),
  };
}

// Maps a backend Article doc into the shape the /blogs/[slug] detail page
// expects (post.sections is normally { icon, heading, body }[], while the
// backend stores a flat { type, content }[] list — so consecutive
// paragraph/quote/callout entries are folded into the heading above them).
export function mapArticleToPost(article) {
  const authorName = getAuthorName(article);
  const rawSections = article.sections || [];

  const introParts = [];
  const headingSections = [];

  rawSections.forEach((s) => {
    if (s.type === "heading") {
      headingSections.push({ heading: s.content, body: "" });
    } else if (headingSections.length === 0) {
      introParts.push(s.content);
    } else {
      const last = headingSections[headingSections.length - 1];
      last.body = last.body ? `${last.body} ${s.content}` : s.content;
    }
  });

  const sections = headingSections
    .filter((s) => s.body)
    .map((s, i) => ({
      icon: SECTION_ICONS[i % SECTION_ICONS.length],
      heading: s.heading,
      body: s.body,
    }));

  return {
    slug: article._id,
    tag: article.category || "General",
    authorRole: article.creatorType === "Admin" ? "TopTrainer Team" : "Trainer",
    authorBio: `${authorName} writes about ${
      article.category || "corporate training"
    } for TopTrainer.`,
    tags: article.tags?.length
      ? article.tags
      : [article.category].filter(Boolean),
    title: article.title,
    image: article.coverImage?.url || "/blogs/hero.jpg",
    subtext: article.shortDescription || "",
    authorImage: getAuthorImage(authorName),
    authorName,
    date: formatBlogDate(article.publishedAt || article.createdAt),
    time: estimateReadTime(article),
    intro: introParts.join("\n\n") || article.shortDescription || "",
    sections,
    conclusion: article.shortDescription || "",
  };
}