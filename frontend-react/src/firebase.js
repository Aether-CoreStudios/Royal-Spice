import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMUjysAZ81GprAjYntDqJWxhFgcAiSm-4",
  authDomain: "royal-spice-76aa7.firebaseapp.com",
  projectId: "royal-spice-76aa7",
  storageBucket: "royal-spice-76aa7.firebasestorage.app",
  messagingSenderId: "884352306658",
  appId: "1:884352306658:web:5fbb843d0a58ab71ccfdbb",
  measurementId: "G-E4X3T8SCT9",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
