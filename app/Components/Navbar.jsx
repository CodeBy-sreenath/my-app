"use client";

import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 shadow-lg">
      <div className="backdrop-blur-sm bg-white/10 border-b border-white/20">
        <div className="flex justify-between items-center p-5 max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 backdrop-blur-md rounded-lg p-2 shadow-lg">
              <h1 className="text-2xl font-bold text-white drop-shadow-lg flex items-center">
                ✨ ProjectGenie
              </h1>
            </div>
            <span className="hidden sm:inline-block text-white/90 text-sm font-medium">
              AI-Powered Project Ideas
            </span>
          </div>

          <div>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-white text-purple-600 px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Login
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <div className="bg-white/20 backdrop-blur-md rounded-full p-1">
                <UserButton />
              </div>
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
}