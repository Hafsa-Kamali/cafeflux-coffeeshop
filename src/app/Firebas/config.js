// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBg0zROjkhjhrPyXpSYd1OIp2T0UcdUXVs",
  authDomain: "cafeflux-coffeeshop.firebaseapp.com",
  projectId: "cafeflux-coffeeshop",
  storageBucket: "cafeflux-coffeeshop.firebasestorage.app",
  messagingSenderId: "472759312059",
  appId: "1:472759312059:web:29c10b221abb945476139e",
  measurementId: "G-DL2WY69GZY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };