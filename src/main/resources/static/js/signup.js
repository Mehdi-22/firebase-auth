import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const mailField = document.getElementById("mail");
const passwordField = document.getElementById("password");
const signUp = document.getElementById("signUp");

auth.useDeviceLanguage();

const signUpFunction = () => {
  const email = mailField.value;
  const password = passwordField.value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
      sendVerificationEmail();
    })
    .catch((error) => {
      alert(error.message);
    });
};

signUp.addEventListener("click", signUpFunction);

const sendVerificationEmail = () => {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      alert("Verification Email Sent Successfully!");
      window.location.assign("/login");
    })
    .catch((error) => {
      alert(error.message);
    });
};

//Animations

mailField.addEventListener("blur", () => {
  if (!mailField.value) labels.item(0).className = "unfocused-field";
});

passwordField.addEventListener("blur", () => {
  if (!passwordField.value) labels.item(1).className = "unfocused-field";
});
