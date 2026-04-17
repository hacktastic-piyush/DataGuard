import { auth } from './auth-config.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const loginBtn = document.getElementById('loginBtn');

if (loginBtn) {
    loginBtn.addEventListener('click', async () => {
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPassword').value;

        try {
            const userCred = await signInWithEmailAndPassword(auth, email, pass);
            // Store UID for the session
            localStorage.setItem('dg_token', userCred.user.uid);
            window.location.href = 'index.html';
        } catch (e) {
            alert("AUTH_FAILED: " + e.message);
        }
    });
}