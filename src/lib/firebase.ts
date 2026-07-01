import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDM2E_MJbuxKneoiiSO1zytWZ85KUTgwoE",
  authDomain: "client1-43b60.firebaseapp.com",
  projectId: "client1-43b60",
  storageBucket: "client1-43b60.firebasestorage.app",
  messagingSenderId: "967916051738",
  appId: "1:967916051738:web:ba19ad8342a06b171ca0a3",
  measurementId: "G-VWP78HW5RH",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
