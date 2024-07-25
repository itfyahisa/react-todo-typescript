// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDAHy5-bDbF9TOLimN52kCBQ8D9m33xUQ8",
    authDomain: "react-todo-68113.firebaseapp.com",
    projectId: "react-todo-68113",
    storageBucket: "react-todo-68113.appspot.com",
    messagingSenderId: "821440083141",
    appId: "1:821440083141:web:6fb6b080cd07623e01acac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export default db