"use client";

import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";

export default function DashboardPage() {
  useAuth();

  return (
    <DashboardLayout>
      <h1 className="text-3xl font-bold mb-6">Lottery Dashboard 🎯</h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold text-lg">Add Scores</h2>
          <p className="text-gray-500 mt-2">Enter your lottery numbers.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold text-lg">Latest Draw</h2>
          <p className="text-gray-500 mt-2">Check winning numbers.</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
          <h2 className="font-bold text-lg">Winners</h2>
          <p className="text-gray-500 mt-2">Upload winning proof.</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
