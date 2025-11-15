// Import Firebase functions

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your Firebase config (from console)

const firebaseConfig = {

  apiKey: "AIzaSyAMe47lxCXKGy_rq05D8jpc3ucYEKT9HfM",

  authDomain: "EcommerceWebsite",

  projectId: "ecommercewebsit-8df15",

  storageBucket: "EcommerceWebsite.com",

  messagingSenderId: "145278",

  appId: "",

};
 
// Initialize Firebase

export const app = initializeApp(firebaseConfig);
 
// Export auth

export const auth = getAuth(app);


 export const db = getFirestore(app);   