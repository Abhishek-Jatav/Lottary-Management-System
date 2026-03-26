"use client";

import { useState } from "react";
import { loginUser } from "../../services/auth.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      return toast.error("Please fill all fields");
    }

    const t = toast.loading("Logging in...");

    try {
      setLoading(true);

      const res = await loginUser(email, password);

      localStorage.setItem("token", res.data.access_token);

      toast.success("Welcome back 🚀", { id: t });

      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Login failed", {
        id: t,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#020617]" />
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        {/* Title */}
        <h2 className="text-3xl font-semibold text-white text-center mb-6">
          Welcome Back 👋
        </h2>

        {/* Email */}
        <input
          className="w-full px-4 py-2 mb-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          className="w-full px-4 py-2 mb-6 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Button */}
        <button
          className="w-full py-2.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition-all duration-200 disabled:opacity-50 shadow-lg"
          onClick={handleLogin}
          disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Footer */}
        <p className="text-gray-400 text-sm text-center mt-4">
          Don’t have an account?{" "}
          <span
            onClick={() => router.push("/register")}
            className="text-blue-400 hover:underline cursor-pointer">
            Register
          </span>
        </p>
      </div>
    </div>
  );
}
