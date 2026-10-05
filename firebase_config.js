import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-analytics.js";
import { getDatabase, ref, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyD6H5Shrl4pMsO9C5n6Z-sRP2LwICSdYhI",
    authDomain: "peminjaman-41318.firebaseapp.com",
    databaseURL: "https://peminjaman-41318-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "peminjaman-41318",
    storageBucket: "peminjaman-41318.firebasestorage.app",
    messagingSenderId: "180342341465",
    appId: "1:180342341465:web:fc51e0dff862de0ef59648",
    measurementId: "G-TCFT4NM9QQ"
  };

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Export db dan fungsi-fungsi Firebase agar bisa dipakai di file JS lain
export { auth, db, ref, push, onValue, update, remove ,signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, sendEmailVerification, onAuthStateChanged};