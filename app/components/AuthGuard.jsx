"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe } from "../store/slices/authSlice";

export const ROLE_ROUTES = {
  admin: "/admin/homepage",
  trainer: "/trainer/dashboard",
  user: "/user/dashboard",
};

export const ROLE_PATH_PREFIXES = {
  admin: "/admin",
  trainer: "/trainer",
  user: "/user",
};

export function getRoleFromPath(pathname) {
  if (pathname.startsWith("/admin")) return "admin";
  if (pathname.startsWith("/trainer")) return "trainer";
  if (pathname.startsWith("/user")) return "user";
  return null;
}

export function getExpectedPathForRole(role) {
  return ROLE_ROUTES[role] || "/user/dashboard";
}

export function isPathAllowedForRole(pathname, role) {
  if (!role) return false;
  const prefix = ROLE_PATH_PREFIXES[role];
  return pathname.startsWith(prefix);
}

export default function AuthGuard({ children, allowedRoles = [] }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user, token, initialized, loading } = useSelector((state) => state.auth);

  const currentRole = user?.role;
  const requiredRole = allowedRoles[0] || getRoleFromPath(pathname);

  useEffect(() => {
    if (!initialized) return;

    if (!token) {
      const callbackUrl = encodeURIComponent(pathname);
      router.replace(`/auth/login?callbackUrl=${callbackUrl}`);
      return;
    }

    if (!user && !loading) {
      dispatch(fetchMe());
      return;
    }

    if (user && requiredRole && currentRole !== requiredRole) {
      const correctPath = getExpectedPathForRole(currentRole);
      if (pathname !== correctPath) {
        router.replace(correctPath);
      }
      return;
    }

    if (user && requiredRole && currentRole === requiredRole) {
      return;
    }
  }, [initialized, token, user, loading, pathname, router, dispatch, currentRole, requiredRole]);

  if (!initialized || loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", border: "3px solid #e2e8f0", borderTopColor: "#2563eb", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!token || !user) {
    return null;
  }

  if (requiredRole && currentRole !== requiredRole) {
    return null;
  }

  return children;
}