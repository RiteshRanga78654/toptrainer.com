"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideNavbar =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/trainer") ||
    pathname.startsWith("/user");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      {!hideNavbar && <Footer />}
    </>
  );
}