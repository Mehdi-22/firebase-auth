import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
    sendPasswordResetEmail,
    getAuth,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

const mailField = document.getElementById("mail");
const labels = document.getElementsByTagName("label");
const resetPassword = document.getElementById("resetPassword");
const successModal = document.querySelector(".success");
const failureModal = document.querySelector(".failure");

resetPassword.addEventListener("click", function() {
    sendPasswordResetEmail(auth, mailField.value)
        .then(() => {
            alert("Password reset email sent!");
            window.location.href = "/login";
        })
        .catch((error) => {
            alert(error.message);
        });
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

resetPassword.addEventListener("click", (e) => {});
//Animations
mailField.addEventListener("focus", () => {
    labels.item(0).className = "focused-field";
});

mailField.addEventListener("blur", () => {
    if (!mailField.value) labels.item(0).className = "unfocused-field";
});