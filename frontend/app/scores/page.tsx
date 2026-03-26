"use client";

import { useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";
import { addScore } from "@/services/score.service";

export default function ScoresPage() {
  useAuth();

  const [number, setNumber] = useState("");

  const handleAddScore = async () => {
    try {
      if (!number) {
        toast.error("Enter a number");
        return;
      }

      await addScore(Number(number));

      toast.success("Score added successfully");

      setNumber("");
    } catch (err) {
      toast.error("Failed to add score");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-4">Add Score 🎯</h1>

      <div className="bg-white p-6 rounded shadow w-96">
        <input
          type="number"
          placeholder="Enter number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleAddScore}
          className="bg-green-500 text-white p-2 w-full rounded">
          Add Score
        </button>
      </div>
    </DashboardLayout>
  );
}
