import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'; // Importa o módulo de Auth
import 'firebase/compat/firestore';
import 'firebase/compat/storage'; // Importa o módulo de Storage


// config firebase
const firebaseConfig = {
  apiKey: "AIzaSyDjGBX2IKO9bTBP4NgvXhkLXp_coQzDCp4",
  authDomain: "co-train-84be9.firebaseapp.com",
  projectId: "co-train-84be9",
  storageBucket: "co-train-84be9.firebasestorage.app",
  messagingSenderId: "620962951335",
  appId: "1:620962951335:web:d2c72d9b6e2e451058eb82"
};

if (!firebase.apps.length) {
  console.log(`Conectando... Status:${firebase.apps.length}`);
  firebase.initializeApp(firebaseConfig);
  console.log(`Conectado. Status:${firebase.apps.length}`);
}

// Exporta Firestore, Auth e Storage
export const firestore = firebase.firestore();
export const auth = firebase.auth();       
export const storage = firebase.storage(); 

export default firebase;
