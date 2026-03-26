"use client";

import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";

export default function DashboardPage() {
  useAuth();

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
          Lottery Dashboard 🎯
        </h1>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <h2 className="font-semibold text-lg text-white">Add Scores</h2>
            <p className="text-gray-400 mt-2 text-sm">
              Enter your lottery numbers and participate in draws.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <h2 className="font-semibold text-lg text-white">Latest Draw</h2>
            <p className="text-gray-400 mt-2 text-sm">
              View the latest winning numbers and results instantly.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <h2 className="font-semibold text-lg text-white">Winners</h2>
            <p className="text-gray-400 mt-2 text-sm">
              Upload proof and verify your winning claims securely.
            </p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
