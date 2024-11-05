import { getAnalytics, isSupported, logEvent } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// const db = getFirestore(app);
// const analytics = getAnalytics(app);

let app: any;
let analytics: any;
let db: any;
let auth: any;
if (typeof window != undefined) {
  app = initializeApp(firebaseConfig);
  analytics = isSupported().then((isSupported) =>
    isSupported ? getAnalytics(app) : null
  );
  db = getFirestore(app);
  auth = getAuth(app);
}

export const logCustomEvent = async (event: any | string, data: any) => {
  if (!analytics) return;

  logEvent(getAnalytics(app), event, data);
};

export { analytics, auth, db };
