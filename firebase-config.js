// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtmve3OxrfD-vJni56hQB3_JK5P-ERy1c",
  authDomain: "event-planner-app-40e1e.firebaseapp.com",
  projectId: "event-planner-app-40e1e",
  storageBucket: "event-planner-app-40e1e.firebasestorage.app",
  messagingSenderId: "338506082139",
  appId: "1:338506082139:web:7694080b6da2c58b341c7e",
  measurementId: "G-VQFMK5Y8VN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
