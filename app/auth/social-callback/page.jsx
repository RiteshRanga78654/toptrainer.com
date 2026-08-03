"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SocialCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const role = searchParams.get("role");
    const userParam = searchParams.get("user");

   
    try {
      const user = JSON.parse(decodeURIComponent(userParam));
      const normalizedUser = { ...user, role };

      localStorage.setItem("tt_token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(normalizedUser));
      document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 3600}`;

      if (role === "trainer") {
        router.replace("/trainer/dashboard");
      } else {
        router.replace("/user/dashboard");
      }
    } catch {
      router.replace("/auth/login");
    }
  }, [router, searchParams]);

  return null;
}
