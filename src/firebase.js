// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDIMc7HhEcVbbzn5tJI-PJEtEWec7mLSgk",
  authDomain: "thiruthodangi-f6103.firebaseapp.com",
  projectId: "thiruthodangi-f6103",
  storageBucket: "thiruthodangi-f6103.appspot.com",
  messagingSenderId: "239240285406",
  appId: "1:239240285406:web:c05ca52b382ea130c8864f",
  measurementId: "G-KHJ0H69K6M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
