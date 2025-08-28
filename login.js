// login.js
import { db } from './firebase-config.js';
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const q = query(
      collection(db, "users"),
      where("username", "==", username),
      where("password", "==", password)
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      if (!userData.approved) {
        loginMsg.textContent = "Your account is pending approval.";
        return;
      }

      // ✅ Store login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userId", userDoc.id); // <--- added this line

      alert("Login successful!");
      window.location.href = "index.html"; // Redirect to dashboard
    } else {
      loginMsg.textContent = "Invalid input If you have forgotten the password contact admin";
    }

  } catch (error) {
    console.error("Error logging in:", error);
    loginMsg.textContent = "Login error!";
  }
});
