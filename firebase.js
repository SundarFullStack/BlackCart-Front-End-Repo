// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy_KSJ8tLRncC7_JPRLc0yhTXfjlVeZ-E",
  authDomain: "blackcart-3dbe9.firebaseapp.com",
  projectId: "blackcart-3dbe9",
  storageBucket: "blackcart-3dbe9.appspot.com",
  messagingSenderId: "753391156156",
  appId: "1:753391156156:web:02190363de8cc717b2c9b9",
  measurementId: "G-FDMFGFX4WT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);