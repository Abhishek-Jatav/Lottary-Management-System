"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

import { registerUser } from "@/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: any) => {
    e.preventDefault();

    if (!name || !email || !password) {
      return toast.error("All fields are required");
    }

    const t = toast.loading("Creating account...");

    try {
      setLoading(true);

      await registerUser(name, email, password);

      toast.success("Account created 🎉", { id: t });

      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed", {
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
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-100px] right-[-100px] w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full" />

      {/* Card */}
      <form
        onSubmit={handleRegister}
        className="relative z-10 w-full max-w-md bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl">
        {/* Title */}
        <h1 className="text-3xl font-semibold text-white text-center mb-6">
          Create Account 🚀
        </h1>

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full px-4 py-2 mb-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 mb-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition-all duration-200 disabled:opacity-50 shadow-lg">
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Login Link */}
        <p className="mt-4 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
