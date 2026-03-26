"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import PortfolioButton from "../PortfolioButton";

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      setRole(decoded.role);

      if (pathname === "/admin" && decoded.role !== "ADMIN") {
        router.push("/dashboard");
      }
    } catch (error) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  const linkClass = (path: string) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
      pathname === path
        ? "bg-white/10 text-white"
        : "text-gray-400 hover:text-white hover:bg-white/5"
    }`;

  return (
    <div className="w-64 h-screen flex flex-col justify-between border-r border-white/5 bg-[#020617]/80 backdrop-blur-xl p-5">
      {/* TOP */}
      <div>
        {/* Logo / Title */}
        <h2 className="text-lg font-semibold text-white tracking-wide mb-6">
          🎯 Lottery
        </h2>

        {/* Nav */}
        <nav className="flex flex-col gap-2">
          <Link href="/dashboard" className={linkClass("/dashboard")}>
            Dashboard
          </Link>

          <Link href="/scores" className={linkClass("/scores")}>
            Add Scores
          </Link>

          <Link href="/draw" className={linkClass("/draw")}>
            Latest Draw
          </Link>

          <Link href="/payment" className={linkClass("/payment")}>
            Payments
          </Link>

          <Link href="/winner" className={linkClass("/winner")}>
            Winners
          </Link>

          {role === "ADMIN" && (
            <Link href="/admin" className={linkClass("/admin")}>
              Admin Panel
            </Link>
          )}
        </nav>
      </div>

      {/* BOTTOM */}
      <div className="flex flex-col gap-4">
        <PortfolioButton />

        <button
          onClick={logout}
          className="w-full py-2 rounded-lg text-sm font-medium bg-red-500/90 hover:bg-red-500 transition-all duration-200 shadow-md hover:shadow-red-500/20">
          Logout
        </button>
      </div>
    </div>
  );
}
