export const normalizeAdminRole = (role?: string) => {
  const normalized = String(role || "").toLowerCase();
  if (normalized === "admin") return "admin_0";
  if (normalized === "editor") return "admin_2";
  if (normalized === "viewer") return "admin_4";
  return normalized || "admin_5";
};

export const getAdminRoleColor = (role?: string) => {
  switch (normalizeAdminRole(role)) {
    case "super_admin":
      return { backgroundColor: "#0f172a", color: "#ffffff", borderColor: "#0f172a" };
    case "admin_0":
      return { backgroundColor: "#7c4a24", color: "#ffffff", borderColor: "#7c4a24" };
    case "admin_1":
      return { backgroundColor: "#2563eb", color: "#ffffff", borderColor: "#2563eb" };
    case "admin_2":
      return { backgroundColor: "#16a34a", color: "#ffffff", borderColor: "#16a34a" };
    case "admin_3":
      return { backgroundColor: "#f97316", color: "#111827", borderColor: "#f97316" };
    case "admin_4":
      return { backgroundColor: "#facc15", color: "#111827", borderColor: "#facc15" };
    case "admin_5":
    default:
      return { backgroundColor: "#ffffff", color: "#111827", borderColor: "#cbd5e1" };
  }
};
