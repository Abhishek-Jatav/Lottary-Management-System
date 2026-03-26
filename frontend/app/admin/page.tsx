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

  // ✅ Role protection
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
    try {
      await runDraw();
      toast.success("Draw executed successfully 🎲");
    } catch {
      toast.error("Draw failed");
    }
  };

  // Verify payment
  const handleVerifyPayment = async () => {
    const paymentId = prompt("Enter Payment ID");

    if (!paymentId) return;

    try {
      await verifyPayment(paymentId, "SUCCESS");
      toast.success("Payment verified 💰");
    } catch {
      toast.error("Verification failed");
    }
  };

  // Verify winner
  const handleVerifyWinner = async () => {
    const winnerId = prompt("Enter Winner ID");

    if (!winnerId) return;

    try {
      await verifyWinner(winnerId, "APPROVED");
      toast.success("Winner approved 🏆");
    } catch {
      toast.error("Approval failed");
    }
  };

  // ✅ Prevent UI flash before auth check
  if (loading) {
    return <div className="p-6">Checking access...</div>;
  }

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Panel 🛠</h1>

      <div className="flex flex-col gap-4 w-96">
        <button
          onClick={handleRunDraw}
          className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded">
          Run Draw 🎲
        </button>

        <button
          onClick={handleVerifyPayment}
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded">
          Verify Payment 💰
        </button>

        <button
          onClick={handleVerifyWinner}
          className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded">
          Verify Winner 🏆
        </button>
      </div>
    </DashboardLayout>
  );
}
