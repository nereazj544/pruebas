// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcdCBxiN0MVaQg41cFedhRRT8Xt-yyn4o",
  authDomain: "prueba-a6351.firebaseapp.com",
  projectId: "prueba-a6351",
  storageBucket: "prueba-a6351.firebasestorage.app",
  messagingSenderId: "4625796276",
  appId: "1:4625796276:web:b608a800de194b7a861be1",
  measurementId: "G-R35KTM0V94"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);