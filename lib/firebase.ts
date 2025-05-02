// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRrGoQIGZXhxL-x5jaUa1MQq7eRDTOy88",
  authDomain: "the-book-shelf-f16b6.firebaseapp.com",
  projectId: "the-book-shelf-f16b6",
  storageBucket: "the-book-shelf-f16b6.firebasestorage.app",
  messagingSenderId: "722959677095",
  appId: "1:722959677095:web:3f53254bdb0470602f0d82",
  measurementId: "G-CBM6F2MN8J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);