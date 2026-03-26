"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

import { runDraw, verifyPayment, verifyWinner } from "@/services/admin.service";

export default function AdminPage() {
  useAuth();

  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Inputs (instead of prompt)
  const [paymentId, setPaymentId] = useState("");
  const [winnerId, setWinnerId] = useState("");

  // Role protection
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const decoded: any = jwtDecode(token);

      if (decoded.role !== "ADMIN") {
        toast.error("Access denied");
        router.push("/dashboard");
      } else {
        setLoading(false);
      }
    } catch {
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  // Run draw
  const handleRunDraw = async () => {
    const t = toast.loading("Running draw...");
    try {
      await runDraw();
      toast.success("Draw executed 🎲", { id: t });
    } catch {
      toast.error("Draw failed", { id: t });
    }
  };

  // Verify payment
  const handleVerifyPayment = async () => {
    if (!paymentId) {
      toast.error("Enter Payment ID");
      return;
    }

    const t = toast.loading("Verifying payment...");
    try {
      await verifyPayment(paymentId, "SUCCESS");
      toast.success("Payment verified 💰", { id: t });
      setPaymentId("");
    } catch {
      toast.error("Verification failed", { id: t });
    }
  };

  // Verify winner
  const handleVerifyWinner = async () => {
    if (!winnerId) {
      toast.error("Enter Winner ID");
      return;
    }

    const t = toast.loading("Approving winner...");
    try {
      await verifyWinner(winnerId, "APPROVED");
      toast.success("Winner approved 🏆", { id: t });
      setWinnerId("");
    } catch {
      toast.error("Approval failed", { id: t });
    }
  };

  // Loading UI
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-gray-400">
        Checking access...
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-xl">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-white mb-6">
          Admin Panel 🛠
        </h1>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-5 backdrop-blur-md shadow-xl">
          {/* Run Draw */}
          <button
            onClick={handleRunDraw}
            className="w-full py-3 rounded-xl font-medium bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-all shadow-lg">
            Run Draw 🎲
          </button>

          {/* Payment Section */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter Payment ID"
              value={paymentId}
              onChange={(e) => setPaymentId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleVerifyPayment}
              className="w-full py-2.5 rounded-lg font-medium bg-green-600 hover:bg-green-700 transition-all">
              Verify Payment 💰
            </button>
          </div>

          {/* Winner Section */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Enter Winner ID"
              value={winnerId}
              onChange={(e) => setWinnerId(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              onClick={handleVerifyWinner}
              className="w-full py-2.5 rounded-lg font-medium bg-purple-600 hover:bg-purple-700 transition-all">
              Verify Winner 🏆
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
