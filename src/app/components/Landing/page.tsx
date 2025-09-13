"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function LandingPage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/signup"); 
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-100 to-blue-200 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-lg py-4 sm:py-6 px-4 sm:px-8 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 m-4 sm:m-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="inline-block w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full"></span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-poppins">
            TodoX
          </h1>
        </div>
        <div className="flex gap-2 sm:gap-3">
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors px-4 sm:px-6 py-2 rounded-lg shadow-sm font-medium cursor-pointer text-sm sm:text-base"
            onClick={() => router.push("/signin")}
          >
            Sign In
          </Button>
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700 transition-colors px-4 sm:px-6 py-2 rounded-lg shadow-sm font-medium cursor-pointer text-sm sm:text-base"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-1 flex-col items-center justify-center text-center px-4 sm:px-6 md:px-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-snug">
          Organize Your <span className="text-blue-600">Tasks</span> Easily
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 max-w-md sm:max-w-xl">
          Stay productive, plan your day, and achieve your goals with our simple
          and effective TodoList app. Manage your tasks in one place.
        </p>

        <button
          onClick={handleGetStarted}
          className="px-5 sm:px-6 py-2.5 sm:py-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer text-sm sm:text-base md:text-lg"
        >
          Get Started
        </button>
      </main>

      {/* Footer */}
      <footer className="text-xs sm:text-sm text-gray-500 text-center py-4 sm:py-6">
        © {new Date().getFullYear()} TodoX. All rights reserved.
      </footer>
    </div>
  );
}
