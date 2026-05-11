"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./footer";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const hideLayout =
    pathname.startsWith("/profile") ||
    pathname.startsWith("/login");

  return (
    <>
      {!hideLayout && <Navbar />}

      <main className="flex-1">
        {children}
      </main>

      {!hideLayout && <Footer />}
    </>
  );
}