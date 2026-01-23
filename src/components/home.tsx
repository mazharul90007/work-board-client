"use client";

import { useLogin } from "@/src/hooks/useAuth";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";

interface LoginError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const HomePage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: login, isPending, isError, error, reset } = useLogin();

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (isError) reset();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (isError) reset();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-110 z-10">
        {/* THE GLASS CARD: Changed bg-white to bg-slate-900/50 and text to white */}
        <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative">
          {/* Top Badge: Dark mode styled */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 border border-white/10 px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
              Secure Access
            </span>
          </div>

          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-purple-600 mb-6 shadow-2xl shadow-purple-500/20 transform -rotate-3 hover:rotate-0 transition-all duration-300">
              <span className="text-3xl font-black text-white italic">W</span>
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Work<span className="text-purple-500">board</span>
            </h1>
            <p className="text-zinc-500 mt-2 font-medium">
              Enterprise task management simplified.
            </p>
          </div>

          {/* Error Message Alert: Stylized for dark theme */}
          {isError && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <div className="p-1.5 bg-rose-500 rounded-lg text-white shrink-0">
                <AlertCircle size={16} />
              </div>
              <p className="text-sm font-medium text-rose-200 tracking-tight">
                {(error as LoginError)?.response?.data?.message ||
                  "Invalid email or password."}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-600 group-focus-within:text-purple-400 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isPending}
                  className={`block w-full pl-12 pr-4 py-4 bg-white/5 border rounded-2xl placeholder-zinc-600 text-white focus:outline-none focus:ring-4 transition-all disabled:opacity-50 font-medium ${
                    isError
                      ? "border-rose-500/50 focus:ring-rose-500/10"
                      : "border-white/10 focus:ring-purple-500/10 focus:border-purple-500/50"
                  }`}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-black text-zinc-500 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] font-black uppercase text-purple-400 hover:text-purple-300 tracking-widest transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-600 group-focus-within:text-purple-400 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isPending}
                  className={`block w-full pl-12 pr-12 py-4 bg-white/5 border rounded-2xl placeholder-zinc-600 text-white focus:outline-none focus:ring-4 transition-all disabled:opacity-50 font-medium ${
                    isError
                      ? "border-rose-500/50 focus:ring-rose-500/10"
                      : "border-white/10 focus:ring-purple-500/10 focus:border-purple-500/50"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-600 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center space-x-2 py-4 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-2xl shadow-2xl shadow-purple-500/20 transform transition-all active:scale-[0.98] disabled:opacity-70 mt-4 cursor-pointer"
            >
              {isPending && !isError ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <>
                  <span className="uppercase tracking-widest text-[10px]">
                    Sign In
                  </span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Section */}
          <div className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-zinc-500 text-xs font-medium">
              New to Workboard?{" "}
              <button className="text-purple-400 font-black hover:text-purple-300 transition-colors hover:underline underline-offset-4">
                Request Access
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Decoration */}
        <p className="text-center mt-8 text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          &copy; 2026 Workboard Systems Inc.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
