"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import error from "@/public/404.json";
import { ArrowLeft } from "lucide-react"; // Added for better UX

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white dark:bg-background text-slate-900 dark:text-white p-4 transition-colors duration-500">
      {/* Lottie Animation */}
      <div className="w-72 h-72 md:w-96 md:h-96 mb-2 opacity-90">
        <Lottie animationData={error} loop={true} />
      </div>

      {/* Text Content */}
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-7xl font-black tracking-tighter text-slate-900 dark:text-white">
          4<span className="text-purple-600">0</span>4
        </h1>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">
          Lost in Space?
        </h2>
        <p className="text-slate-500 dark:text-zinc-500 font-medium max-w-sm mx-auto">
          The page you are looking for has been moved to another dimension or
          never existed in our workspace.
        </p>
      </div>

      {/* Premium Button */}
      <Link
        href="/dashboard"
        className="group relative flex items-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-purple-200 dark:shadow-none hover:translate-y-0.5 active:scale-95"
      >
        <ArrowLeft
          size={16}
          className="group-hover:-translate-x-1 transition-transform"
        />
        Go Back to Dashboard
      </Link>
    </div>
  );
}
