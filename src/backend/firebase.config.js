// import firebase from "firebase"
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const REACT_APP_FIREBASE_KEY = process.env.REACT_APP_FIREBASE_KEY;
const REACT_APP_FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID
const REACT_APP_FIREBASE_MESSAGINGSENDER_ID = process.env.REACT_APP_FIREBASE_MESSAGINGSENDER_ID
// import {firebase} from 'firebase/app';
const firebaseConfig = {
  apiKey: REACT_APP_FIREBASE_KEY,
  authDomain: "gdsc-gcgc.firebaseapp.com",
  projectId: "gdsc-gcgc",
  storageBucket: "gdsc-gcgc.appspot.com",
  messagingSenderId: REACT_APP_FIREBASE_MESSAGINGSENDER_ID,
  appId: REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-ESB0TWR9RZ"
};
firebase.initializeApp(firebaseConfig)
export const firestore = firebase.firestore()
export {firebase}