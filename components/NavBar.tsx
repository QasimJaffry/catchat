"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import ProfileModal from "@/app/profile/ProfileModal";
import AuthModal from "./auth/AuthModal";
import SearchBar from "./SearchBar";
import { CiLight, CiDark, CiSearch } from "react-icons/ci";
import { FaPaw } from "react-icons/fa"; // Importing the paw icon
import useGlobalContext from "@/app/hooks/useGlobalContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isHovering, setIsHovering] = useState(false); // State to track hover

  const { theme, setTheme } = useGlobalContext();
  const router = useRouter(); // Get the router instance

  // Function to handle window resize events
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      setIsMenuOpen(false); // Close the drawer when resizing to a large screen
    }
  };

  // Effect to set up the resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const openAuthModal = (mode: "signin" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <nav className="bg-gradient-to-br from-pink-300 via-purple-300 to-pink-400 text-white p-4 shadow-lg relative">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <FaPaw
              className="text-3xl hover:text-yellow-300 transition duration-300 cursor-pointer animate-float"
              onMouseEnter={() => setIsHovering(true)} // Set hover state to true
              onMouseLeave={() => setIsHovering(false)} // Set hover state to false
            />
          </Link>
          {isHovering && (
            <span className="text-1xl font-extrabold text-yellow-300 transition duration-300">
              Cat Chat
            </span>
          )}
        </div>

        <button
          className="lg:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Main Navbar Content (Visible on large screens, aligned to the right) */}
        <div
          className={`hidden lg:flex flex-1 items-center justify-end gap-3 ${
            isMenuOpen ? "hidden" : "flex"
          }`}
        >
          {/* Conditionally render SearchBar based on current route */}
          {/* {router.pathname !== "/chat" && ( // Check if the current route is not chat
            <SearchBar
              cats={[]}
              isSearchOpen={isSearchOpen}
              setIsSearchOpen={setIsSearchOpen}
            />
          )} */}
          <div className="flex items-center space-x-4">
            {/* <button
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-200 hover:text-gray-400 transition duration-300"
            >
              <CiSearch className="h-6 w-6" />
            </button> */}
            {/* {theme === "dark" ? (
              <CiDark
                onClick={() => setTheme("light")}
                className="cursor-pointer text-gray-200 text-2xl hover:text-gray-400 transition duration-300"
              />
            ) : (
              <CiLight
                onClick={() => setTheme("dark")}
                className="cursor-pointer text-gray-200 text-2xl hover:text-gray-400 transition duration-300"
              />
            )} */}
            {user ? (
              <>
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="text-white hover:text-gray-300 transition duration-300"
                >
                  {user.displayName || "Profile"}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal("signin")}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-300"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg transition duration-300"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Drawer Menu */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-gray-800 z-50 shadow-lg transition-transform transform translate-x-0">
          <div className="flex justify-between p-4">
            <h2 className="text-xl font-bold text-white">Menu</h2>
            <button className="text-white" onClick={() => setIsMenuOpen(false)}>
              X
            </button>
          </div>
          <div className="flex flex-col items-center mt-4 space-y-4">
            {user ? (
              <>
                <button
                  onClick={() => setIsProfileOpen(true)}
                  className="text-white hover:text-gray-300"
                >
                  Profile
                </button>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => openAuthModal("signin")}
                  className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal("signup")}
                  className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
                >
                  Sign Up
                </button>
              </>
            )}

            {theme === "dark" ? (
              <CiDark
                onClick={() => setTheme("light")}
                className="cursor-pointer text-gray-200 text-2xl hover:text-gray-400 transition duration-300"
              />
            ) : (
              <CiLight
                onClick={() => setTheme("dark")}
                className="cursor-pointer text-gray-200 text-2xl hover:text-gray-400 transition duration-300"
              />
            )}
          </div>
        </div>
      )}

      {isProfileOpen && <ProfileModal close={() => setIsProfileOpen(false)} />}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Overlay to prevent interaction with background content */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </nav>
  );
}
