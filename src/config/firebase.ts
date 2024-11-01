// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyA_-eFin93Va0erTW98a5NXjI1sdN8vWk0",
  authDomain: "olxclone-24f2a.firebaseapp.com",
  projectId: "olxclone-24f2a",
  storageBucket: "olxclone-24f2a.appspot.com",
  messagingSenderId: "495482724692",
  appId: "1:495482724692:web:f715cefa3dc754fb4168c1",
  measurementId: "G-71BQNY13B0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export {app,auth,firestore,storage}