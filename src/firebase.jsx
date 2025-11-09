// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// --- Load config from environment variables ---
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};
// ----------------------------------------

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// --- EXPORT SERVICES ---
// Authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const doSignInWithGoogle = () => signInWithPopup(auth, googleProvider);
export const doSignOut = () => signOut(auth); // <-- THIS IS THE CORRECTED LINE

// Storage (for file uploads)
export const storage = getStorage(app);
export const storageRef = ref;
export const uploadFile = uploadBytesResumable;
export const getFileUrl = getDownloadURL;

// Firestore (Database to link user and resume)
export const db = getFirestore(app);
export const docRef = doc;
export const setDocument = setDoc;

// Export analytics just in case you want to use it later
export { analytics };