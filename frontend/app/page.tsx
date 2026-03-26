"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-black gap-6">
      <h1 className="text-3xl font-semibold text-black dark:text-white">
        App is running 🚀
      </h1>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => router.push("/login")}
          className="px-6 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
          Login
        </button>

        <button
          onClick={() => router.push("/register")}
          className="px-6 py-2 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 transition">
          Register
        </button>
      </div>
    </div>
  );
}
