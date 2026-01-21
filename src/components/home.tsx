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

  // Destructure reset, isError, and error from the hook
  const { mutate: login, isPending, isError, error, reset } = useLogin();

  // Reset the mutation state if the user starts typing again
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
    <div className="min-h-screen bg-[#FBFBFE] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-200/40 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-100/40 rounded-full blur-[100px]" />

      <div className="w-full max-w-110 z-10">
        <div className="bg-white/80 backdrop-blur-2xl border border-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative">
          {/* Top Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white border border-slate-100 px-4 py-1.5 rounded-full shadow-sm flex items-center gap-2">
            <Sparkles size={14} className="text-purple-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
              Secure Access
            </span>
          </div>

          {/* Header Section */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-linear-to-br from-purple-600 to-indigo-600 mb-6 shadow-xl shadow-purple-200 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <span className="text-3xl font-black text-white italic">W</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Work<span className="text-purple-600">board</span>
            </h1>
            <p className="text-slate-400 mt-2 font-medium">
              Enterprise task management simplified.
            </p>
          </div>

          {/* Error Message Alert */}
          {isError && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
              <div className="p-1.5 bg-rose-500 rounded-lg text-white shrink-0">
                <AlertCircle size={16} />
              </div>
              <p className="text-sm font-medium text-rose-600 tracking-tight">
                {(error as LoginError)?.response?.data?.message ||
                  "Invalid email or password. Please try again."}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-purple-500 transition-colors">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isPending}
                  className={`block w-full pl-12 pr-4 py-4 bg-slate-50/50 border rounded-2xl placeholder-slate-300 text-slate-700 focus:outline-none focus:ring-4 transition-all disabled:opacity-50 font-medium ${
                    isError
                      ? "border-rose-200 focus:ring-rose-500/10 focus:border-rose-400"
                      : "border-slate-100 focus:ring-purple-500/10 focus:border-purple-500"
                  }`}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                  Password
                </label>
                <button
                  type="button"
                  className="text-[11px] font-black uppercase text-purple-600 hover:text-purple-700 tracking-widest transition-colors"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-purple-500 transition-colors">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isPending}
                  className={`block w-full pl-12 pr-12 py-4 bg-slate-50/50 border rounded-2xl placeholder-slate-300 text-slate-700 focus:outline-none focus:ring-4 transition-all disabled:opacity-50 font-medium ${
                    isError
                      ? "border-rose-200 focus:ring-rose-500/10 focus:border-rose-400"
                      : "border-slate-100 focus:ring-purple-500/10 focus:border-purple-500"
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-300 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center space-x-2 py-4 px-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-xl shadow-purple-100 transform transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-4 cursor-pointer"
            >
              {isPending && !isError ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  <span className="uppercase tracking-widest text-[10px]">
                    Authenticating...
                  </span>
                </>
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
          <div className="mt-10 text-center border-t border-slate-50 pt-8">
            <p className="text-slate-400 text-xs font-medium">
              New to Workboard?{" "}
              <button className="text-purple-600 font-black hover:text-purple-700 transition-colors hover:underline underline-offset-4">
                Request Access
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Decoration */}
        <p className="text-center mt-8 text-slate-300 text-[10px] font-bold uppercase tracking-[0.2em]">
          &copy; 2026 Workboard Systems Inc.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
