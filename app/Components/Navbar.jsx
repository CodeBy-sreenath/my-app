"use client";

import {
  UserButton,
  SignInButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold text-black">
        ✨ ProjectGenie
      </h1>

      <div>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="bg-black text-white px-4 py-2 rounded">
              Login
            </button>
          </SignInButton>
        </SignedOut>

        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}
