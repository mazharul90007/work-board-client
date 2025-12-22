"use client";

import Link from "next/link";
import Lottie from "lottie-react";
import error from "@/public/404.json"; // path to your Lottie file

export default function NotFound() {
  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col items-center justify-center text-white p-4">
      {/* Lottie Animation */}
      <div className="w-80 h-80 mb-6">
        <Lottie animationData={error} loop={true} />
      </div>

      {/* Text Content */}
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Oops! Page Not Found</h2>
      <p className="text-lg mb-6 text-gray-400 text-center max-w-md">
        The page you are looking for does not exist or has been moved. Don’t
        worry, you can go back home.
      </p>

      {/* Button */}
      <Link
        href="/"
        className="px-6 py-3 bg-linear-to-r from-purple-700  to-cyan-400 hover:scale-105 transition-transform rounded-lg font-semibold text-white shadow-lg"
      >
        Go Back Home
      </Link>
    </div>
  );
}
