"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { getLatestDraw } from "@/services/draw.service";

export default function DrawPage() {
  useAuth();

  const [numbers, setNumbers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDraw = async () => {
    const t = toast.loading("Fetching latest draw...");
    try {
      const res = await getLatestDraw();
      setNumbers(res.data.numbers);
      toast.success("Draw loaded 🎲", { id: t });
    } catch (err) {
      toast.error("Failed to load draw", { id: t });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDraw();
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-white">Latest Draw 🎲</h1>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-xl text-center">
          {loading ? (
            <p className="text-gray-400">Loading draw...</p>
          ) : numbers.length === 0 ? (
            <p className="text-gray-400">No draw available</p>
          ) : (
            <div className="flex flex-wrap justify-center gap-4">
              {numbers.map((num, index) => (
                <div
                  key={index}
                  className="w-14 h-14 flex items-center justify-center rounded-full text-lg font-bold text-white 
                  bg-gradient-to-br from-blue-600 to-indigo-600 
                  shadow-lg shadow-blue-500/20 
                  hover:scale-110 transition-transform duration-200">
                  {num}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
