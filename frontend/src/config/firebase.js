import { initializeApp } from "firebase/app";

import {
  getFirestore,
  query,
  where,
  collection,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAK8K1LKxNuezT-JaaKfA_GFwiSUG00RiE",

  authDomain: "sample-311412.firebaseapp.com",

  databaseURL: "https://sample-311412-default-rtdb.firebaseio.com",

  projectId: "sample-311412",

  storageBucket: "sample-311412.appspot.com",

  messagingSenderId: "433189868184",

  appId: "1:433189868184:web:64519a66f44854e51ab6ed",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
console.log(firestore);
export { firestore, collection, query, where, onSnapshot };
