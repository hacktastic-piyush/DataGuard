import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC6N8hSlY2tAnnBpWLnp8L9qIzBpNmWTWo",
    authDomain: "dataguard-3280a.firebaseapp.com",
    projectId: "dataguard-3280a",
    storageBucket: "dataguard-3280a.firebasestorage.app",
    messagingSenderId: "190294538856",
    appId: "1:190294538856:web:a008137e852500eaf359dd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);