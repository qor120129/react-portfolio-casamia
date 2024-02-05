import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// const storage = getStorage()
// Initialize Firebase

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_API_ID,
  measurementId: import.meta.env.VITE_REACT_APP_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_REACT_APP_DATABASE_URL
  // databaseURL: `https://react-casamia-default-rtdb.asia-southeast1.firebasedatabase.app/`
}
export const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
export const storage = getStorage(app)
export const cloudStore = getFirestore(app);

