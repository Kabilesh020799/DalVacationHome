import { initializeApp } from "firebase/app";

import {
  getFirestore,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCJt5s3ha8Y1kyXH3g6zsk8i3sMEgWaeDc",
  authDomain: "serverless-426514.firebaseapp.com",
  projectId: "serverless-426514",
  storageBucket: "serverless-426514.appspot.com",
  messagingSenderId: "212029564174",
  appId: "1:212029564174:web:f34937198d832cdfa8235f",
  measurementId: "G-4W1YLYB1FM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app, "chat-messages");
console.log(firestore);
export { firestore, collection, query, where, onSnapshot };
