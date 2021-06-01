import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBOC7fZD-5bDQMIG9j4SsRcv2EPIVG99wc",
  authDomain: "hulu-918b3.firebaseapp.com",
  databaseURL: "https://hulu-918b3.firebaseio.com",
  projectId: "hulu-918b3",
  storageBucket: "hulu-918b3.appspot.com",
  messagingSenderId: "1091760403412",
  appId: "1:1091760403412:web:5af66115ed716649649c41",
  measurementId: "G-VSDHSNP6S4",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
