"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

import { makePayment, getPaymentHistory } from "@/services/payment.service";

export default function PaymentPage() {
  useAuth();

  const [amount, setAmount] = useState("499");
  const [method, setMethod] = useState("UPI");
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch history
  const fetchHistory = async () => {
    const t = toast.loading("Loading payments...");
    try {
      const res = await getPaymentHistory();
      setPayments(res.data);
      toast.success("History loaded", { id: t });
    } catch {
      toast.error("Failed to load history", { id: t });
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Make payment
  const handlePayment = async () => {
    if (!amount) return toast.error("Enter amount");

    const t = toast.loading("Processing payment...");
    try {
      setLoading(true);

      await makePayment(Number(amount), method);

      toast.success("Payment initiated 💰", { id: t });

      fetchHistory();
    } catch {
      toast.error("Payment failed", { id: t });
    } finally {
      setLoading(false);
    }
  };

  const statusStyle = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return "bg-green-500/20 text-green-400";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";
      case "FAILED":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-white">Payments 💰</h1>

        {/* Payment Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl max-w-md">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter amount"
          />

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="UPI">UPI</option>
            <option value="CARD">Card</option>
            <option value="WALLET">Wallet</option>
          </select>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:opacity-90 transition-all disabled:opacity-50 shadow-lg">
            {loading ? "Processing..." : "Pay Now"}
          </button>
        </div>

        {/* Payment History */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">
            Payment History
          </h2>

          {payments.length === 0 ? (
            <p className="text-gray-400">No payments yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="p-3">Amount</th>
                    <th className="p-3">Method</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((p, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="p-3 text-white font-medium">
                        ₹{p.amount}
                      </td>

                      <td className="p-3 text-gray-300">{p.method}</td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                            p.status,
                          )}`}>
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
