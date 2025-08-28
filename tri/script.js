// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ✅ Your Firebase Config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123xyz456"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ✅ Handle Event Form Submission
const eventForm = document.getElementById("eventForm");
const imagePreview = document.getElementById("imagePreview");
let imageBase64 = "";

// Image Preview & Convert to Base64
document.getElementById("eventImage").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imageBase64 = e.target.result;
      imagePreview.src = imageBase64;
      imagePreview.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});

// ✅ Add Event to Firestore
eventForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("eventTitle").value.trim();
  const date = document.getElementById("eventDate").value.trim();
  const location = document.getElementById("eventLocation").value.trim();
  const type = document.getElementById("eventType").value.trim();
  const description = document.getElementById("eventDescription").value.trim();

  const newEvent = {
    title,
    date,
    location,
    type,
    description,
    image: imageBase64 || ""
  };

  try {
    await addDoc(collection(db, "events"), newEvent);
    alert("Event added successfully!");
    eventForm.reset();
    imagePreview.style.display = "none";
  } catch (error) {
    console.error("Error adding event:", error);
  }
});
