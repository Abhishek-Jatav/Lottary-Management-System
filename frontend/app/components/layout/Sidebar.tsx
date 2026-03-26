"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

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

      // ✅ Protect admin route
      if (pathname === "/admin" && decoded.role !== "ADMIN") {
        router.push("/dashboard");
      }
    } catch (error) {
      // invalid token
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [pathname, router]);

  const logout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="w-64 h-screen bg-gray-900 text-white p-4">
      <h2 className="text-xl font-bold mb-6">Lottery Dashboard</h2>

      <nav className="flex flex-col gap-3">
        <Link href="/dashboard">Dashboard</Link>

        <Link href="/scores">Add Scores</Link>

        <Link href="/draw">Latest Draw</Link>

        <Link href="/payment">Payments</Link>

        <Link href="/winner">Winners</Link>

        {/* ✅ Only visible to ADMIN */}
        {role === "ADMIN" && <Link href="/admin">Admin Panel</Link>}

        <button
          onClick={logout}
          className="mt-6 bg-red-500 hover:bg-red-600 p-2 rounded">
          Logout
        </button>
      </nav>
    </div>
  );
}
