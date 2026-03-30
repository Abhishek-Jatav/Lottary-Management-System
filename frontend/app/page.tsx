"use client";

import { useRouter } from "next/navigation";
import PortfolioButton from "../app/components/PortfolioButton";

export default function Home() {
  const router = useRouter();

  // ✅ Test Credentials
  const testData = {
    email: "testadmin@gmail.com",
    password: "123456",
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          🎯 Lottery Management System
        </h1>

        {/* Description */}
        <p className="text-gray-400 text-lg leading-relaxed">
          A modern full-stack system built using{" "}
          <span className="text-white font-semibold">Next.js</span>,{" "}
          <span className="text-white font-semibold">NestJS</span>, and{" "}
          <span className="text-white font-semibold">PostgreSQL</span>.
          <br />
          <br />
          Participate in lottery draws, track scores, and claim winnings — while
          admins manage everything seamlessly.
        </p>

        {/* Test Credentials Display */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-gray-300">
          <p className="font-semibold text-white mb-1">
            Test Credentials for Admin Only
          </p>
          <p>Email: {testData.email}</p>
          <p>Password: {testData.password}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent my-2" />

        {/* Portfolio Button */}
        <div className="mt-2">
          <PortfolioButton />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 flex-wrap justify-center mt-4">
          <button
            onClick={() => router.push("/login")}
            className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold hover:bg-gray-200 transition-all duration-200 shadow-lg hover:scale-105">
            Login
          </button>

          <button
            onClick={() => router.push("/register")}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:opacity-90 transition-all duration-200 shadow-lg hover:scale-105">
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
