"use client";

import { useRouter } from "next/navigation";
import PortfolioButton from "../app/components/PortfolioButton"; // adjust path if needed

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black gap-8 px-6 text-center">
      {/* Heading */}
      <h1 className="text-4xl font-bold text-black dark:text-white">
        🎯 Lottery Management System
      </h1>

      {/* Description */}
      <p className="max-w-xl text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
        A full-stack Lottery Management System built using{" "}
        <span className="font-semibold">Next.js</span>,{" "}
        <span className="font-semibold">NestJS</span>, and{" "}
        <span className="font-semibold">PostgreSQL</span>.
        <br />
        <br />
        Users can participate in lottery draws, submit scores, and claim
        winnings, while admins manage draws, payments, and winners efficiently.
      </p>

      {/* Buttons */}
      <div className="flex gap-4 flex-wrap justify-center">
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="px-6 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition">
          Register
        </button>
      </div>

      {/* Portfolio Button */}
      <div className="mt-4">
        <PortfolioButton /> {/* ✅ ADDED */}
      </div>
    </div>
  );
}
