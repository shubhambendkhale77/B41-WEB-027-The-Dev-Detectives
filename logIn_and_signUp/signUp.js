import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTCuciFQssWf4cQd8-8v6Cbg2vUNLbpiQ",
  authDomain: "web205-4e4df.firebaseapp.com",
  databaseURL: "https://web205-4e4df-default-rtdb.firebaseio.com",
  projectId: "web205-4e4df",
  storageBucket: "web205-4e4df.firebasestorage.app",
  messagingSenderId: "883573221121",
  appId: "1:883573221121:web:b3a8badd8a1e83ef06dd00",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const email = document.getElementById("email");
const password = document.getElementById("password");
const name = document.getElementById("name");
const signUpButton = document.getElementsByClassName("login-btn")[0];

signUpButton.addEventListener("click", function (event) {
  event.preventDefault();
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then(function () {
      alert("Signed in successfully");

      window.location.href = "../FrontUIDesign/logIn.html";
    })
    .catch(function (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("User already exists");
        window.location.href = "../FrontUIDesign/logIn.html";
      } else if (error.code === "auth/invalid-email") {
        alert("Invalid email address");
      } else if (error.code === "auth/weak-password") {
        alert("Password is too weak");
      } else {
        alert(error.message);
      }
    });
});


// sign up animation

function showModel() {
  document.querySelector('.overlay').classList.add('showoverlay')

  document.querySelector(".loginform").classList.add('showloginform')

  document.querySelector("#contain").classList.add('blur')
console.log("click")

}

function closeModel(){
  document.querySelector('.overlay').classList.remove('showoverlay')
  document.querySelector(".loginform").classList.remove('showloginform')
  document.querySelector("#contain").classList.remove('blur')
}

let btn2 =document.querySelector("#lf-btn")
var btn = document.querySelector(".join-btn");
btn.addEventListener("click",showModel)
btn2.addEventListener("click",showModel)

var c = document.querySelector("#myspan")
c.addEventListener("click",closeModel)
