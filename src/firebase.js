
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAoz934_yogjK3Kw0C4n3mrdhpQBtmSpHw",
  authDomain: "chat-eec81.firebaseapp.com",
  projectId: "chat-eec81",
  storageBucket: "chat-eec81.appspot.com",
  messagingSenderId: "393142117338",
  appId: "1:393142117338:web:cf658d627d64b0ae77d6e3"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();