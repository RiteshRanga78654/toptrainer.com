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

export const ROLES = {
  administrator: "administrator",
  content_writer: "content_writer",
  standard_member: "standard_member",
};

export const ROLE_DEFAULTS = {
  administrator: [...ALL_MODULES],
  content_writer: ["articles"],
  standard_member: [],
};

export function resolvePermissions(role, permissions = []) {
  if (role === ROLES.administrator) return [...ALL_MODULES];
  if (role === ROLES.content_writer) return ["articles"];
  return permissions.filter((p) => ALL_MODULES.includes(p));
}
