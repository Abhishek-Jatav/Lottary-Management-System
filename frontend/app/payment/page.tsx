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

  // Fetch history
  const fetchHistory = async () => {
    try {
      const res = await getPaymentHistory();

      setPayments(res.data);
    } catch {
      toast.error("Failed to load history");
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  // Make payment
  const handlePayment = async () => {
    try {
      await makePayment(Number(amount), method);

      toast.success("Payment initiated");

      fetchHistory();
    } catch {
      toast.error("Payment failed");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Payment 💰</h1>

      {/* Payment Form */}
      <div className="bg-white p-6 rounded shadow w-96 mb-6">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="border p-2 w-full mb-4">
          <option value="UPI">UPI</option>

          <option value="CARD">Card</option>

          <option value="WALLET">Wallet</option>
        </select>

        <button
          onClick={handlePayment}
          className="bg-green-500 text-white p-2 w-full rounded">
          Pay Now
        </button>
      </div>

      {/* Payment History */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Payment History</h2>

        {payments.length === 0 ? (
          <p>No payments yet</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Amount</th>
                <th className="p-2">Method</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((p, i) => (
                <tr key={i} className="text-center border-t">
                  <td className="p-2">₹{p.amount}</td>

                  <td className="p-2">{p.method}</td>

                  <td className="p-2">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
