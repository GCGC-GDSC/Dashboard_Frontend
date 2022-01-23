// import firebase from "firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// import {firebase} from 'firebase/app';
const firebaseConfig = {
  apiKey: "AIzaSyBh0PlG3w7riOID_UniIx2d9te0dSnoM0o",
  authDomain: "gdsc-gcgc.firebaseapp.com",
  projectId: "gdsc-gcgc",
  storageBucket: "gdsc-gcgc.appspot.com",
  messagingSenderId: "176297199695",
  appId: "1:176297199695:web:e06804b37489c63143023a",
  measurementId: "G-ESB0TWR9RZ"
};
firebase.initializeApp(firebaseConfig)

export {firebase}