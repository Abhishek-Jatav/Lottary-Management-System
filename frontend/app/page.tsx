import ReactionTestGame from "@/hooks/backendCheck/game/reactionTest/reactionTestGame";
import ManualBackendCheck from "../hooks/manualBackendCheck/ManualBackendCheck";

export default function BackendCheckPage() {
  return (
    <div className="relative w-full min-h-screen bg-[#020617] overflow-hidden">
      {/* Floating Top-Left Panel */}
      <div className="absolute top-4 left-4 z-10 w-[90%] sm:w-[350px] md:w-[400px] bg-[#0f172a] rounded-2xl p-4 shadow-xl">
        <ManualBackendCheck />
      </div>

      {/* Full Screen Background Component */}
      <div className="w-full h-screen flex items-center justify-center">
        <ReactionTestGame />
      </div>
    </div>
  );
}
