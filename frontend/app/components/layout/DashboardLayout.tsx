"use client";

import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#020617] text-[#E6EDF3]">
      {/* Sidebar */}
      <div className="border-r border-white/5 bg-[#020617]/80 backdrop-blur-xl">
        <Sidebar />
      </div>

      {/* Main Content */}
      <main className="flex-1 relative p-6 md:p-8">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#020617] to-[#0F172A]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full" />

        {/* Content Wrapper */}
        <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl backdrop-blur-md">
          {children}
        </div>
      </main>
    </div>
  );
}
