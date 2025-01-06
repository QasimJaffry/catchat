"use client";
import ProfileModal from "@/app/profile/ProfileModal";
import { useAuth } from "@/context/AuthContext";
import { logCustomEvent } from "@/lib/firebase";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPaw, FaRegCommentDots } from "react-icons/fa";
import AuthModal from "./auth/AuthModal";
import FeedbackModal from "./feedback/FeedbackModal";

export default function Navbar() {
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<string>("signin");
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      logCustomEvent("user_info", {
        user_id: user.uid,
        user_email: user.email,
      });
    }
  }, [user]);

  const openAuthModal = (mode: string) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <nav className="bg-white shadow-lg p-4 rounded-lg fixed w-full z-10">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <FaPaw className="text-4xl text-success hover:text-success transition duration-300 cursor-pointer animate-float" />
          </Link>
          <span className="text-2xl font-extrabold text-success transition duration-300">
            Cat Chat
          </span>
        </div>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <button
                onClick={() => setIsProfileOpen(true)}
                className="bg-success text-white hover:text-white transition duration-300 px-4 py-2 rounded-lg hover:bg-secondary"
              >
                {user.displayName || "Profile"}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthModal("signin")}
                className="bg-success hover:bg-secondary px-4 py-2 rounded-lg transition duration-300"
              >
                Sign In
              </button>
              <button
                onClick={() => openAuthModal("signup")}
                className="bg-success hover:bg-secondary px-4 py-2 rounded-lg transition duration-300"
              >
                Sign Up
              </button>
            </>
          )}

          {user && (
            <button
              onClick={() => setIsFeedbackModalOpen(true)}
              className="p-2 text-success hover:text-success cursor-pointer rounded-full transition duration-300"
              aria-label="Give Feedback"
            >
              <FaRegCommentDots size={20} />
            </button>
          )}
        </div>
      </div>

      {isProfileOpen && <ProfileModal close={() => setIsProfileOpen(false)} />}

      {isAuthModalOpen && (
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          initialMode={authMode}
        />
      )}

      {isFeedbackModalOpen && (
        <FeedbackModal close={() => setIsFeedbackModalOpen(false)} />
      )}
    </nav>
  );
}
