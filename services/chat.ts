import { db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  updateDoc,
  arrayUnion,
  orderBy,
  getDoc,
} from "firebase/firestore";
import moment from "moment";

// Create a chat if it does not exist
export const createChatIfNotExists = async (user: any, secondUser: any) => {
  const chatID = user?.uid + secondUser?.id;
  const chatRef = doc(db, "chats", chatID);

  try {
    const chatSnap = await getDoc(chatRef);
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        uid: chatID,
        createdAt: moment().valueOf(),
        participants: [{ user }, { secondUser }],
        userIDs: [user?.uid, secondUser?.id],
        thread: [],
      });
    } else {
      await updateDoc(chatRef, { updatedAt: moment().valueOf() });
    }
  } catch (error) {
    console.error("Error creating/updating chat:", error);
    throw error;
  }
};

// Fetch the list of chats for a user
export const fetchChatsList = async (userID: string, callback: any) => {
  try {
    const q = query(
      collection(db, "chats"),
      where("userIDs", "array-contains", userID),
      orderBy("createdAt", "desc")
    );
    return onSnapshot(q, (snapshot) => {
      const chats: Record<string, any> = {};
      snapshot.forEach((doc) => {
        chats[doc.id] = doc.data();
      });
      callback(chats);
    });
  } catch (error) {
    console.error("Error fetching chats list:", error);
    throw error;
  }
};

// Fetch a specific chat record
export const fetchChatRecord = (chatID: string, callback: any) => {
  try {
    const chatRef = doc(db, "chats", chatID);
    return onSnapshot(chatRef, (doc) => {
      if (doc.exists()) {
        const chatData = doc.data();
        if (chatData.thread && chatData.thread.length > 0) {
          chatData.thread.sort((a: any, b: any) => b.timestamp - a.timestamp);
        }
        callback(chatData);
      } else {
        callback(null);
      }
    });
  } catch (error) {
    console.error("Error fetching chat record:", error);
    throw error;
  }
};

// Send a message
export const sendMessage = async (chatID: string, message: any) => {
  try {
    const chatRef = doc(db, "chats", chatID);
    await updateDoc(chatRef, {
      thread: arrayUnion(message),
      lastMessage: message.message,
      lastMessageAt: moment().valueOf(),
    });
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
