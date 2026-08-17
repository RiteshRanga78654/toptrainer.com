export const ALL_MODULES = [
  "trainers",
  "users",
  "homepage",
  "workshops",
  "industry",
  "competency",
  "department",
  "articles",
  "reports",
  "about_us",
  "reviews",
  "requirements",
  "communications",
  "team",
];

export const MODULE_LABELS = {
  trainers: "Trainers",
  users: "Users",
  homepage: "Homepage",
  workshops: "Workshops",
  industry: "Industry",
  competency: "Competency",
  department: "Department",
  articles: "Articles",
  reports: "Reports",
  about_us: "About Us",
  reviews: "Reviews",
  requirements: "Requirements",
  communications: "Communications",
  team: "Team & Access",
};

export const ROLES = [
  {
    value: "administrator",
    label: "Administrator",
    description: "Full Access",
  },
  {
    value: "content_writer",
    label: "Content Writer",
    description: "Articles only",
  },
  {
    value: "standard_member",
    label: "Standard Member",
    description: "Custom selected access",
  },
];

export const DEFAULT_PERMISSIONS = {
  administrator: [...ALL_MODULES],
  content_writer: ["articles"],
  standard_member: [],
};

const teamPermission = "team";

export function hasFullAccess(user) {
  const perms = user?.permissions;
  if (!Array.isArray(perms)) return true;
  if (perms.length === 0) return true;
  if (perms.includes(teamPermission)) return true;
  return ALL_MODULES.filter((m) => m !== teamPermission).every((m) =>
    perms.includes(m)
  );
}

export function canManageTeam(user) {
  return hasFullAccess(user);
}

export { teamPermission };