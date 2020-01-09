import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBJ-La9zVIGiD4HLjaZid70ialasPRT1BE",
  authDomain: "crwn-db-3ba92.firebaseapp.com",
  databaseURL: "https://crwn-db-3ba92.firebaseio.com",
  projectId: "crwn-db-3ba92",
  storageBucket: "crwn-db-3ba92.appspot.com",
  messagingSenderId: "317388681689",
  appId: "1:317388681689:web:d3d9961aca5c0b248f69c8"
};

firebase.initializeApp(firebaseConfig);

// Initialize
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// custom parameter
// provider.setCustomParameters({ propmpt: "select_account" });

// Google Authentication
export const signInWithGoogle = () => auth.signInWithPopup(provider);

// In Case You want whole the library
export default firebase;
