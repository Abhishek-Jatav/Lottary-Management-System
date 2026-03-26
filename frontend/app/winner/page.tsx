"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "../components/layout/DashboardLayout";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

import { uploadProof, getMyWinners } from "@/services/winner.service";

export default function WinnerPage() {
  useAuth();

  const [drawId, setDrawId] = useState("");
  const [proof, setProof] = useState("");
  const [winners, setWinners] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch winners
  const fetchWinners = async () => {
    const t = toast.loading("Loading winners...");
    try {
      const res = await getMyWinners();
      setWinners(res.data);
      toast.success("Winners loaded 🏆", { id: t });
    } catch {
      toast.error("Failed to load winners", { id: t });
    }
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  // Upload proof
  const handleUpload = async () => {
    if (!drawId || !proof) {
      return toast.error("Fill all fields");
    }

    const t = toast.loading("Uploading proof...");
    try {
      setLoading(true);

      await uploadProof(drawId, proof);

      toast.success("Proof uploaded 📤", { id: t });

      setDrawId("");
      setProof("");

      fetchWinners();
    } catch {
      toast.error("Upload failed", { id: t });
    } finally {
      setLoading(false);
    }
  };

  const statusStyle = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-500/20 text-green-400";
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400";
      case "REJECTED":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Heading */}
        <h1 className="text-3xl font-semibold text-white">Winners 🏆</h1>

        {/* Upload Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl max-w-md">
          <input
            type="text"
            placeholder="Draw ID"
            value={drawId}
            onChange={(e) => setDrawId(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Proof (URL or text)"
            value={proof}
            onChange={(e) => setProof(e.target.value)}
            className="w-full px-4 py-2 mb-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:opacity-90 transition-all disabled:opacity-50 shadow-lg">
            {loading ? "Uploading..." : "Upload Proof"}
          </button>
        </div>

        {/* Winners List */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-4">My Winners</h2>

          {winners.length === 0 ? (
            <p className="text-gray-400">No winner records</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th className="p-3 text-left">Draw ID</th>
                    <th className="p-3 text-left">Proof</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {winners.map((w, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5 transition">
                      <td className="p-3 text-white font-medium">{w.drawId}</td>

                      <td className="p-3 text-blue-400 truncate max-w-[200px]">
                        {w.proof}
                      </td>

                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${statusStyle(
                            w.status,
                          )}`}>
                          {w.status}
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
