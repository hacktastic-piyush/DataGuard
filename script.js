import { db } from './auth-config.js';
import { collection, addDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// Page Guard: Redirect if not logged in
if (!localStorage.getItem('dg_token')) {
    window.location.href = 'login.html';
}

// Logout Logic
document.getElementById('logoutBtn')?.addEventListener('click', () => {
    localStorage.removeItem('dg_token');
    window.location.href = 'login.html';
});

// Simple Encryption/Decryption (Replacing server-side crypto)
const encrypt = (text) => btoa(text); 
const decrypt = (encoded) => atob(encoded);

// --- SAVE DATA ---
document.getElementById('submitBtn')?.addEventListener('click', async () => {
    const input = document.getElementById('userInput').value;
    if (!input) return;

    // Sandbox Check (Moved from server.js)
    const threats = ['<script>', 'DROP', 'DELETE', 'rm -rf'];
    let isMalicious = threats.some(t => input.toUpperCase().includes(t));

    if (isMalicious) {
        alert("THREAT_DETECTED: Malicious patterns found.");
        return;
    }

    try {
        const encryptedPayload = encrypt(input);
        // Save to Firestore 'vault' collection
        const docRef = await addDoc(collection(db, "vault"), {
            content: encryptedPayload,
            owner: localStorage.getItem('dg_token'),
            timestamp: new Date()
        });
        
        const output = document.getElementById('responseOutput');
        output.innerHTML = `SUCCESS: Stored in Vault. ID: ${docRef.id}`;
        output.classList.remove('hidden');
    } catch (e) { 
        console.error(e);
        alert("Vault Write Error: " + e.message); 
    }
});

// --- RETRIEVE DATA ---
document.getElementById('decryptBtn')?.addEventListener('click', async () => {
    const id = document.getElementById('fetchId').value;
    if (!id) return;

    try {
        const snap = await getDoc(doc(db, "vault", id));
        if (snap.exists()) {
            const data = snap.data();
            document.getElementById('decryptionWindow').classList.remove('hidden');
            // Decrypt the payload retrieved from Firestore
            document.getElementById('decryptedContent').innerText = decrypt(data.content);
        } else { 
            alert("Record not found."); 
        }
    } catch (e) { 
        alert("Fetch error: " + e.message); 
    }
});