import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTCuciFQssWf4cQd8-8v6Cbg2vUNLbpiQ",
  authDomain: "web205-4e4df.firebaseapp.com",
  databaseURL: "https://www.googleapis.com/auth/drive",
  projectId: "web205-4e4df",
  storageBucket: "web205-4e4df.firebaseapp.com",
  messagingSenderId: "883573221121",
  appId: "1:883573221121:web:b3a8badd8a1e83ef06dd00",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = document.getElementById("email");
const password = document.getElementById("password");
const signInButton = document.getElementsByClassName("login-btn")[0]; 

signInButton.addEventListener("click", function (event) {
  event.preventDefault(); 
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then(function () {
              window.location.href = "index.html";
    })
    .catch(function (error) {
      alert("Invalid Candidates");
    });
});
