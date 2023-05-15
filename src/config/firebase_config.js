import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA0LqJEUapt00E2isPWL--qoKoqAH3of7E",
  authDomain: "fir-tuto-3600a.firebaseapp.com",
  projectId: "fir-tuto-3600a",
  storageBucket: "fir-tuto-3600a.appspot.com",
  messagingSenderId: "741591590684",
  appId: "1:741591590684:web:c41f84621db4a1c3e73cd9",
  measurementId: "G-YDEY5VDS29"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 

export const db = getFirestore(app);
export const storage = getStorage(app);