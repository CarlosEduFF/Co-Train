import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjGBX2IKO9bTBP4NgvXhkLXp_coQzDCp4",
  authDomain: "co-train-84be9.firebaseapp.com",
  projectId: "co-train-84be9",
  storageBucket: "co-train-84be9.firebasestorage.app",
  messagingSenderId: "620962951335",
  appId: "1:620962951335:web:d2c72d9b6e2e451058eb82"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);