// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDQd2xOM3ePlXPnQ7U7KFv3QFZifwFu7Wg",
  authDomain: "listgrocery-6ae97.firebaseapp.com",
  projectId: "listgrocery-6ae97",
  storageBucket: "listgrocery-6ae97.appspot.com",
  messagingSenderId: "377991135473",
  appId: "1:377991135473:web:126c71d2123c3aa399a950",
  measurementId: "G-XMSZ7GK6RD",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});
const db = getFirestore(app);

export { db };
