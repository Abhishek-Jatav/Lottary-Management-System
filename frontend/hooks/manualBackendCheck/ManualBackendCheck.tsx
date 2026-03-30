"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL as string;

export default function ManualBackendCheck() {
  const router = useRouter();

  const [isHealthy, setIsHealthy] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [statusText, setStatusText] = useState("Backend Sleeping");

  const wakeBackend = async () => {
    if (cooldown > 0 || !BACKEND_URL) return;

    setLoading(true);
    setStatusText("Waking server... ⚡");

    try {
      // 🔥 Step 1: FAST ping (wake backend)
      await fetch(`${BACKEND_URL}/ping`);

      // 🔄 Step 2: wait a bit before full health check
      setStatusText("Checking database... ⏳");

      await new Promise((res) => setTimeout(res, 2000));

      // 🧠 Step 3: Full health check
      const res = await fetch(`${BACKEND_URL}/health`);

      if (res.ok) {
        setIsHealthy(true);
        setStatusText("Backend Ready ✅");
      } else {
        startCooldown();
        setStatusText("Server not ready ❌");
      }
    } catch (err) {
      startCooldown();
      setStatusText("Connection failed ❌");
    }

    setLoading(false);
  };

  const startCooldown = () => {
    setCooldown(60);
  };

  useEffect(() => {
    if (cooldown <= 0) return;

    const interval = setInterval(() => {
      setCooldown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [cooldown]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-[360px] p-6 rounded-2xl bg-[#0f172a] border border-[#1e293b] shadow-xl flex flex-col gap-5">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-white">Start Backend</h2>
          <p className="text-sm text-gray-400 mt-1">
            Initialize server before entering app
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2">
          <div
            className={`w-2.5 h-2.5 rounded-full ${
              isHealthy ? "bg-green-500" : "bg-red-500"
            } animate-pulse`}
          />
          <span className="text-sm text-gray-400">{statusText}</span>
        </div>

        {/* Wake Button */}
        {!isHealthy && (
          <button
            onClick={wakeBackend}
            disabled={loading || cooldown > 0}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium 
            hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50">
            {loading
              ? "Processing..."
              : cooldown > 0
                ? `Retry in ${cooldown}s`
                : "Wake Backend"}
          </button>
        )}

        {/* Redirect */}
        {isHealthy && (
          <button
            onClick={() => router.push("/home")}
            className="w-full py-3 rounded-xl bg-green-600 text-white font-medium 
            hover:scale-[1.02] active:scale-[0.98] transition-all">
            Go to Dashboard →
          </button>
        )}
      </div>
    </div>
  );
}



// page 


// import ReactionTestGame from "@/hooks/backendCheck/game/reactionTest/reactionTestGame";
// import ManualBackendCheck from "../hooks/manualBackendCheck/ManualBackendCheck";

// export default function BackendCheckPage() {
//   return (
//     <div className="relative w-full min-h-screen bg-[#020617] overflow-hidden">
//       {/* Floating Top-Left Panel */}
//       <div className="absolute top-4 left-4 z-10 w-[90%] sm:w-[350px] md:w-[400px] bg-[#0f172a] rounded-2xl p-4 shadow-xl">
//         <ManualBackendCheck />
//       </div>

//       {/* Full Screen Background Component */}
//       <div className="w-full h-screen flex items-center justify-center">
//         <ReactionTestGame />
//       </div>
//     </div>
//   );
// }

