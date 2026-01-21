"use client";

import React from "react";
import {
  BarChart3,
  PieChart,
  Activity,
  ArrowLeft,
  RefreshCw,
  Layers,
} from "lucide-react";
import Link from "next/link";

export default function PerformanceUnderConstruction() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      {/* Animated Icon Container */}
      <div className="relative mb-8">
        {/* Purple Glow effect matching Calendar page */}
        <div className="absolute inset-0 bg-purple-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>

        <div className="relative bg-white p-8 rounded-3xl border border-slate-100 shadow-xl">
          <BarChart3 size={64} className="text-purple-600 animate-pulse" />
          {/* Floating accent icons in Amber/Purple */}
          <div className="absolute -top-2 -right-2 bg-amber-100 p-2 rounded-lg border border-amber-200 text-amber-600 shadow-sm animate-pulse">
            <Activity size={20} />
          </div>
          <div
            className="absolute -bottom-2 -left-2 bg-purple-50 p-2 rounded-lg border border-purple-100 text-purple-500 shadow-sm animate-bounce"
            style={{ animationDuration: "3s" }}
          >
            <PieChart size={20} />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="max-w-md space-y-4">
        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
          Analytics are <span className="text-purple-600">Syncing...</span>
        </h1>
        <p className="text-slate-500 font-medium leading-relaxed">
          We are currently fine-tuning the performance engine to help you
          visualize team efficiency. This feature will be live very soon!
        </p>
      </div>

      {/* Progress Bar Placeholder - Purple */}
      <div className="w-full max-w-xs bg-slate-100 h-2 rounded-full mt-8 overflow-hidden border border-slate-200">
        <div
          className="bg-purple-600 h-full rounded-full animate-infinite-scroll"
          style={{ width: "45%", transition: "width 2s ease-in-out" }}
        ></div>
      </div>
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-3">
        Data Integration: 45% Complete
      </span>

      {/* Navigation Actions */}
      <div className="flex gap-4 mt-10">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all shadow-sm group text-sm"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-bold rounded-2xl hover:bg-purple-700 transition-all shadow-lg shadow-slate-200 text-sm cursor-pointer"
        >
          <RefreshCw size={16} />
          Check for Updates
        </button>
      </div>

      {/* Background Subtle Elements */}
      <div className="fixed bottom-10 left-10 text-slate-100 -z-10 rotate-12">
        <Layers size={120} />
      </div>
    </div>
  );
}
