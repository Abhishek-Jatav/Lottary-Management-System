"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { getLatestDraw } from "@/services/draw.service";

export default function DrawPage() {
  useAuth();

  const [numbers, setNumbers] = useState<number[]>([]);

  const fetchDraw = async () => {
    try {
      const res = await getLatestDraw();

      setNumbers(res.data.numbers);
    } catch (err) {
      toast.error("Failed to load draw");
    }
  };

  useEffect(() => {
    fetchDraw();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Latest Draw 🎲</h1>

      <div className="bg-white p-6 rounded shadow">
        {numbers.length === 0 ? (
          <p>No draw available</p>
        ) : (
          <div className="flex gap-4">
            {numbers.map((num, index) => (
              <div
                key={index}
                className="w-12 h-12 flex items-center justify-center bg-blue-500 text-white rounded-full text-lg font-bold">
                {num}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
