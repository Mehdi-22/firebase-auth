import { firebaseConfig } from "./config.js";
import {
  signOut,
  getAuth,
  browserSessionPersistence,
  setPersistence,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";

// Script to retrieve the Firebase token from the cookie
// Split the cookie string into individual cookies
fetch("/profile?userID=" + getUserId(), {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Cookie: "token=" + document.cookie.split(";"),
  },
})
  .then(function (response) {})
  .catch(function (error) {});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

logOut.addEventListener("click", (e) => {
  setPersistence(auth, browserSessionPersistence).then(() => {
    return signOut(auth);
  });
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.assign("/logout");
});

function getUserId() {
  let params = new URL(document.location).searchParams;
  return params.get("userID");
}
