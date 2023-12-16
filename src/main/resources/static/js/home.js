import { firebaseConfig } from "./config.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const mailContainer = document.querySelector(".mail-container");
const shownMailContainer = "container mail-container shown-container";
const hiddenMailContainer = "container mail-container hidden-container";
const socialMediaContainer = document.querySelector(".socialMedia-container");
const shownSocialMediaContainer =
  "container socialMedia-container shown-container";
const hiddenSocialMediaContainer =
  "container socialMedia-container hidden-container";
const phoneContainer = document.querySelector(".phone-container");
const shownPhoneContainer = "container phone-container shown-container";
const hiddenPhoneContainer = "container phone-container hidden-container";
const authenticationMethod1 = document.getElementById("method1");
const authenticationMethod2 = document.getElementById("method2");
const authenticationMethod3 = document.getElementById("method3");
const mailField = document.getElementById("mail");
const passwordField = document.getElementById("password");
const phoneNumberField = document.getElementById("phone");
const codeField = document.getElementById("code");
const labels = document.getElementsByTagName("label");
const signInWithMail = document.getElementById("signInWithMail");
const getCodeButton = document.getElementById("getCode");
const signInWithPhoneButton = document.getElementById("signInWithPhone");
const signInWithGoogleButton = document.getElementById("signInWithGoogle");
const signUp = document.getElementById("signUp");
let userId;

//Go to signup page
signUp.addEventListener("click", () => {
  window.location.assign("/signup");
});

//sign in with google account method
const signInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider(app);

  signInWithPopup(auth, googleProvider)
    .then((result) => {
      const user = result.user;
      let data = {
        email: user.reloadUserInfo.email,
        fbId: user.uid,
      };

      if (user) {
        user.getIdToken().then((token) => {
          setFirebaseTokenCookie(token);
          saveUser(data);
        });
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};

signInWithGoogleButton.addEventListener("click", signInWithGoogle);

//recaptcha Verifier
window.recaptchaVerifier = new RecaptchaVerifier(
  "recaptcha-container",
  {},
  auth
);

recaptchaVerifier.render().then((widgetId) => {
  window.recaptchaWidgetId = widgetId;
});

// send Verification Code
const sendVerificationCode = () => {
  const phoneNumber = phoneNumberField.value;
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, phoneNumber, appVerifier).then(
    (confirmationResult) => {
      window.confirmationResult = confirmationResult;
    }
  );
};

getCodeButton.addEventListener("click", sendVerificationCode);

// sign in with phone number method
const signInWithPhone = () => {
  const code = codeField.value;
  const phoneNumber = phoneNumberField.value;

  confirmationResult
    .confirm(code)
    .then((result) => {
      let data = {
        phoneNumber: phoneNumber,
        fbId: result.user.uid,
      };

      result.user.getIdToken().then((token) => {
        setFirebaseTokenCookie(token);
        saveUser(data);
      });
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(errorMessage);
    });
};
signInWithPhoneButton.addEventListener("click", signInWithPhone);

//sign in with email and password method
const signInWithEmailFunction = () => {
  const email = mailField.value;
  const password = passwordField.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user.emailVerified) {
        let data = {
          email: user.reloadUserInfo.email,
          fbId: user.uid,
        };

        if (user) {
          user.getIdToken().then((token) => {
            setFirebaseTokenCookie(token);
            saveUser(data);
          });
        }
      } else {
        alert(
          "Email not verified. Please check your inbox to verify your email."
        );
      }
    })
    .catch((error) => {
      alert(error.message);
    });
};

signInWithMail.addEventListener("click", signInWithEmailFunction);

//save user
function saveUser(data) {
  $.ajax({
    type: "POST",
    url: "/saveUser",
    contentType: "application/json",
    data: JSON.stringify(data),
    success: function (response) {
      window.location.href = "/profile?userID=" + encodeURIComponent(response);
    },
    error: function (xhr, textStatus, errorThrown) {
      window.location.href = "/login";
    },
  });
}

//store the token in httpOnly cookie
function setFirebaseTokenCookie(token) {
  const expirationDate = new Date();

  expirationDate.setDate(expirationDate.getDate() + 1);

  // Format the token as a cookie string
  const cookieValue = "token=" + encodeURIComponent(token);
  +`expires=${expirationDate.toUTCString()}; path=/; HttpOnly`;

  // Set the cookie in the browser
  document.cookie = cookieValue;
}

//Animations
const initializeInputAnimationState = (fieldName, labelNumber) => {
  if (fieldName.value)
    labels.item(labelNumber).className = "initial-focused-field";
  else labels.item(labelNumber).className = "initial-unfocused-field";
};

authenticationMethod1.addEventListener("change", () => {
  mailContainer.className = shownMailContainer;
  socialMediaContainer.className = hiddenPhoneContainer;
  phoneContainer.className = hiddenSocialMediaContainer;
  initializeInputAnimationState(mailField, 0);
  initializeInputAnimationState(passwordField, 1);
});

authenticationMethod2.addEventListener("change", () => {
  mailContainer.className = hiddenMailContainer;
  socialMediaContainer.className = shownSocialMediaContainer;
  phoneContainer.className = hiddenSocialMediaContainer;
});

authenticationMethod3.addEventListener("change", () => {
  mailContainer.className = hiddenMailContainer;
  socialMediaContainer.className = hiddenPhoneContainer;
  phoneContainer.className = shownPhoneContainer;
  initializeInputAnimationState(phoneNumberField, 2);
  initializeInputAnimationState(codeField, 3);
});

mailField.addEventListener("focus", () => {
  if (!mailField.value) labels.item(0).className = "focused-field";
});

passwordField.addEventListener("focus", () => {
  if (!passwordField.value) labels.item(1).className = "focused-field";
});

mailField.addEventListener("blur", () => {
  if (!mailField.value) labels.item(0).className = "unfocused-field";
});

passwordField.addEventListener("blur", () => {
  if (!passwordField.value) labels.item(1).className = "unfocused-field";
});

phoneNumberField.addEventListener("focus", () => {
  if (!phoneNumberField.value) labels.item(2).className = "focused-field";
});

codeField.addEventListener("focus", () => {
  if (!codeField.value) labels.item(3).className = "focused-field";
});

phoneNumberField.addEventListener("blur", () => {
  if (!phoneNumberField.value) labels.item(2).className = "unfocused-field";
});

codeField.addEventListener("blur", () => {
  if (!codeField.value) labels.item(3).className = "unfocused-field";
});
