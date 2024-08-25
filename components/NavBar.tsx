"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import ProfileModal from "@/app/profile/ProfileModal";
import AuthModal from "./auth/AuthModal";
import SearchBar from "./SearchBar";
import { cats } from "@/app/page"; // Import the cats array

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            Cat Chat
          </Link>
          <button
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <div
          className={`${isMenuOpen ? "block" : "hidden"} lg:block mt-4 lg:mt-0`}
        >
          <SearchBar cats={cats} />
        </div>
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:block mt-4 lg:mt-0 lg:flex lg:justify-end`}
        >
          {user ? (
            <>
              <button
                onClick={() => setIsProfileOpen(true)}
                className="block lg:inline-block text-white hover:text-gray-300 mr-4"
              >
                {user.displayName || "Profile"}
              </button>
              <button
                onClick={logout}
                className="block lg:inline-block bg-red-500 hover:bg-red-600 px-4 py-2 rounded mt-2 lg:mt-0"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthModal("signin")}
                className="block lg:inline-block bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded mr-2 mt-2 lg:mt-0"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className="block lg:inline-block bg-green-500 hover:bg-green-600 px-4 py-2 rounded mt-2 lg:mt-0"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
      {isProfileOpen && <ProfileModal close={() => setIsProfileOpen(false)} />}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </nav>
  );
}
