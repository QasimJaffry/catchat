"use client";

import { useAuth } from "@/context/AuthContext";
import { createOrUpdateFeedback } from "@/services/feedback";
import { useState } from "react";

interface FeedbackModalProps {
  close: () => void;
}

export default function FeedbackModal({ close }: FeedbackModalProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [feedback, setFeedback] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (user?.uid) {
      await createOrUpdateFeedback(user.uid, {
        name,
        email,
        message: feedback,
      });
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setResponseMessage("Thanks for your feedback!");
      setName("");
      setEmail("");
      setFeedback("");
      close();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-8 transform transition-all ease-in-out duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Feedback Form
        </h2>

        {responseMessage && (
          <div className="mb-4 text-green-600 font-semibold text-center">
            {responseMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 text-gray-900"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Your Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 text-gray-900"
              required
            />
          </div>

          <div>
            <label
              htmlFor="feedback"
              className="block text-sm font-medium text-gray-700"
            >
              Your Feedback
            </label>
            <textarea
              id="feedback"
              value={feedback}
              rows={4}
              onChange={(e) => setFeedback(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 text-gray-900"
              required
            ></textarea>
          </div>

          <div className="mt-8 space-y-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-success hover:bg-success focus:outline-none disabled:bg-blue-300"
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </button>
            <button
              type="button"
              onClick={close}
              className="w-full py-3 px-4 border border-gray-300 rounded-md shadow-md text-sm font-medium text-gray-700 bg-white focus:outline-none"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
