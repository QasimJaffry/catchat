"use client";

import { useAuth } from "@/context/AuthContext";

interface ProfileModalProps {
  close: () => void;
}

export default function ProfileModal({ close }: ProfileModalProps) {
  const { user, logout } = useAuth();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-gradient-to-br from-purple-300 to-pink-300 rounded-lg shadow-xl max-w-md w-full p-8 transform transition-all ease-in-out duration-300 z-60" // Updated gradient
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Profile
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white">
              Email
            </label>
            <p className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md text-gray-900 focus:border-pink-300 focus:ring focus:ring-pink-200">
              {user?.email}
            </p>
          </div>
          {user?.displayName && (
            <div>
              <label className="block text-sm font-medium text-white">
                Display Name
              </label>
              <p className="mt-1 p-2 w-full bg-white border border-gray-300 rounded-md text-gray-900 focus:border-pink-300 focus:ring focus:ring-pink-200">
                {user.displayName}
              </p>
            </div>
          )}
        </div>
        <div className="mt-8 space-y-3">
          <button
            onClick={() => {
              logout();
              close();
            }}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Log Out
          </button>
          <button
            onClick={close}
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
