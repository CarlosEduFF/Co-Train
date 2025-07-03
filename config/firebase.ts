// config/firebase.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDjGBX2IKO9bTBP4NgvXhkLXp_coQzDCp4",
  authDomain: "co-train-84be9.firebaseapp.com",
  projectId: "co-train-84be9",
  storageBucket: "co-train-84be9.appspot.com",
  messagingSenderId: "620962951335",
  appId: "1:620962951335:web:d2c72d9b6e2e451058eb82"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
