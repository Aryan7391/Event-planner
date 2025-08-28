import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const signupForm = document.getElementById('signupForm');

signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    await addDoc(collection(db, "users"), {
      username,
      email,
      password,
      approved: false,  // Initially set approval to false
      role: "user"      // Default role
    });

    alert("Signup successful! Waiting for admin approval.");
    signupForm.reset();
    window.location.href = "login.html";

  } catch (error) {
    console.error("Error adding user:", error);
    alert("Error signing up.");
  }
});
