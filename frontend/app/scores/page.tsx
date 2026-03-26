"use client";

import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { addScore } from "@/services/score.service";

export default function ScoresPage() {
  useAuth();

  const [number, setNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddScore = async () => {
    if (!number) {
      return toast.error("Enter a number");
    }

    const t = toast.loading("Adding score...");

    try {
      setLoading(true);

      await addScore(Number(number));

      toast.success("Score added 🎯", { id: t });

      setNumber("");
    } catch (err) {
      toast.error("Failed to add score", { id: t });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-white">Add Score 🎯</h1>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl max-w-md">
          {/* Input */}
          <input
            type="number"
            placeholder="Enter number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {/* Button */}
          <button
            onClick={handleAddScore}
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 transition-all disabled:opacity-50 shadow-lg">
            {loading ? "Adding..." : "Add Score"}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
