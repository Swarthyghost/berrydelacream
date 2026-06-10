import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPVkZjI4fGBjSjfyCm9CA7N3dtXriWAVg",
  authDomain: "berrydelacream.firebaseapp.com",
  projectId: "berrydelacream",
  storageBucket: "berrydelacream.firebasestorage.app",
  messagingSenderId: "308552564895",
  appId: "1:308552564895:web:58477fcaff5fa55c2aa2aa",
  measurementId: "G-NHSHX76E5K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = initializeFirestore(app, { ignoreUndefinedProperties: true });
export const storage = getStorage(app);
