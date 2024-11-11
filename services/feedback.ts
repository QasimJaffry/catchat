import { db } from "@/lib/firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";

// Function to check if feedback exists and either create or update
export const createOrUpdateFeedback = async (
  userId: string,
  feedbackMessage: any
) => {
  const feedbackCollectionRef = collection(db, "feedbacks");

  try {
    // Query Firestore to find feedback from this user
    const feedbackQuery = query(
      feedbackCollectionRef,
      where("userId", "==", userId)
    );
    const feedbackQuerySnapshot = await getDocs(feedbackQuery);

    if (feedbackQuerySnapshot.empty) {
      // If no feedback exists from this user, create a new feedback entry
      const newFeedback = {
        userId: userId,
        feedback: feedbackMessage,
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf(),
      };

      // Create new document in Firestore
      await addDoc(feedbackCollectionRef, newFeedback);
      console.log("Feedback created for user:", userId);
    } else {
      // If feedback exists, update the existing feedback
      const existingFeedbackDoc = feedbackQuerySnapshot.docs[0];
      const existingFeedbackRef = doc(db, "feedbacks", existingFeedbackDoc.id);

      await updateDoc(existingFeedbackRef, {
        feedback: feedbackMessage, // Update feedback message
        updatedAt: moment().valueOf(), // Update timestamp
      });

      console.log("Feedback updated for user:", userId);
    }
  } catch (error) {
    console.error("Error creating/updating feedback:", error);
    throw error;
  }
};
