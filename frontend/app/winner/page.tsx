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

  // Fetch winners
  const fetchWinners = async () => {
    try {
      const res = await getMyWinners();

      setWinners(res.data);
    } catch {
      toast.error("Failed to load winners");
    }
  };

  useEffect(() => {
    fetchWinners();
  }, []);

  // Upload proof
  const handleUpload = async () => {
    try {
      if (!drawId || !proof) {
        toast.error("Fill all fields");
        return;
      }

      await uploadProof(drawId, proof);

      toast.success("Proof uploaded");

      setDrawId("");
      setProof("");

      fetchWinners();
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold mb-6">Winners 🏆</h1>

      {/* Upload Form */}

      <div className="bg-white p-6 rounded shadow w-96 mb-6">
        <input
          type="text"
          placeholder="Draw ID"
          value={drawId}
          onChange={(e) => setDrawId(e.target.value)}
          className="border p-2 w-full mb-3"
        />

        <input
          type="text"
          placeholder="Proof (URL/Text)"
          value={proof}
          onChange={(e) => setProof(e.target.value)}
          className="border p-2 w-full mb-4"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white p-2 w-full rounded">
          Upload Proof
        </button>
      </div>

      {/* Winners List */}

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">My Winners</h2>

        {winners.length === 0 ? (
          <p>No winner records</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2">Draw ID</th>
                <th className="p-2">Proof</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {winners.map((w, i) => (
                <tr key={i} className="text-center border-t">
                  <td className="p-2">{w.drawId}</td>

                  <td className="p-2">{w.proof}</td>

                  <td className="p-2 font-bold">{w.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </DashboardLayout>
  );
}
