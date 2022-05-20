import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBulChy_XgTgdieQ2Vf3slC4zjygT-1CkA",
  authDomain: "react-chess-c3301.firebaseapp.com",
  projectId: "react-chess-c3301",
  storageBucket: "react-chess-c3301.appspot.com",
  messagingSenderId: "1008902569744",
  appId: "1:1008902569744:web:25e47a87af480081d12f95",
  measurementId: "G-2X82E94MP9",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const dataBase = firebase.firestore();
export const auth = firebase.auth();
export default firebase;
