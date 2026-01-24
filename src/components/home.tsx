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
  Info,
  Check,
  ChevronRight,
  X,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

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
  const [showDemoMenu, setShowDemoMenu] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null); // Ref for outside click detection
  const { mutate: login, isPending, isError, error, reset } = useLogin();

  const demoAccounts = [
    { role: "Admin", email: "admin@gmail.com" },
    { role: "Leader", email: "leader@gmail.com" },
    { role: "Member", email: "member@gmail.com" },
  ];

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowDemoMenu(false);
      }
    };
    if (showDemoMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDemoMenu]);

  const handleSelectDemo = (selectedEmail: string) => {
    setEmail(selectedEmail);
    setPassword("123456");
    setIsCopied(true);
    setShowDemoMenu(false);
    if (isError) reset();
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      <div className="absolute top-[-10%] left-[-5%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-indigo-600/20 rounded-full blur-[120px]" />

      <div className="w-full max-w-110 z-10">
        <div className="bg-slate-900/60 backdrop-blur-3xl border border-white/10 p-10 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)] relative">
          {/* --- Demo Credentials UI --- */}
          <div className="absolute top-8 right-8" ref={menuRef}>
            <button
              onClick={() => setShowDemoMenu(!showDemoMenu)}
              className="group flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 transition-all cursor-pointer"
            >
              {isCopied ? (
                <Check size={18} className="text-green-400" />
              ) : (
                <Info size={18} />
              )}
            </button>

            {showDemoMenu && (
              <div className="absolute right-0 mt-3 w-64 bg-slate-800/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-100">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.15em] text-purple-400">
                      Demo Access
                    </p>
                    <p className="text-[9px] text-zinc-500 font-medium">
                      Auto-fill credentials
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDemoMenu(false)}
                    className="p-1 hover:bg-white/10 rounded-lg text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="space-y-1.5">
                  {demoAccounts.map((account) => (
                    <button
                      key={account.role}
                      onClick={() => handleSelectDemo(account.email)}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl hover:bg-white/5 group/item transition-all text-left border border-transparent hover:border-white/5 cursor-pointer"
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-zinc-200 group-hover/item:text-white">
                          {account.role}
                        </span>
                        <span className="text-[10px] text-zinc-500 group-hover/item:text-purple-400">
                          {account.email}
                        </span>
                      </div>
                      <ChevronRight
                        size={14}
                        className="text-zinc-700 group-hover/item:text-purple-400 group-hover/item:translate-x-1 transition-all"
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-3 pt-3 border-t border-white/5 text-center">
                  <p className="text-[10px] text-zinc-400">
                    Password for all:{" "}
                    <span className="text-white font-mono bg-white/5 px-1.5 py-0.5 rounded">
                      123456
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Top Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-800 border border-white/10 px-4 py-1.5 rounded-full shadow-lg flex items-center gap-2">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
              Secure Access
            </span>
          </div>

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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (isError) reset();
                  }}
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (isError) reset();
                  }}
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

          <div className="mt-10 text-center border-t border-white/5 pt-8">
            <p className="text-zinc-500 text-xs font-medium">
              New to Workboard?{" "}
              <button
                onClick={() => setShowDemoMenu(!showDemoMenu)}
                className="text-purple-400 font-black hover:text-purple-300 transition-colors hover:underline underline-offset-4 cursor-pointer"
              >
                Request Access
              </button>
            </p>
          </div>
        </div>
        <p className="text-center mt-8 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em]">
          &copy; 2026 Workboard Systems Inc.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
