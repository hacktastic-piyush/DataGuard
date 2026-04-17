import { auth } from './auth-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

const regBtn = document.getElementById('regBtn');

if (regBtn) {
    regBtn.addEventListener('click', async () => {
        const email = document.getElementById('regEmail').value;
        const pass = document.getElementById('regPassword').value;

        if (!email || !pass) return alert("Credentials required.");

        try {
            await createUserWithEmailAndPassword(auth, email, pass);
            alert("IDENTITY_CREATED: Please login now.");
            window.location.href = 'login.html';
        } catch (e) {
            alert("REGISTRATION_ERROR: " + e.message);
        }
    });
}