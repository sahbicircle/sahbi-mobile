import { getAnalytics, isSupported } from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLVScybUNxbdBPKXTj-x10zBo_VC_Z6qg",
  authDomain: "sahbi-mobile.firebaseapp.com",
  projectId: "sahbi-mobile",
  storageBucket: "sahbi-mobile.firebasestorage.app",
  messagingSenderId: "365281848321",
  appId: "1:365281848321:web:a46f047224c0b660902400",
  measurementId: "G-WHRZR5YQP6",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);

let analytics;

if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { analytics };
