// Import the functions you need from the SDKs you need
import { firebaze } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { eduData } from "firebase/database"




// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9JgZu7oeVmoa2b3UABIbNhMT5gT8WoKA",
  authDomain: "edume-acf6c.firebaseapp.com",
  databaseURL: "https://edume-acf6c-default-rtdb.firebaseio.com",
  projectId: "edume-acf6c",
  storageBucket: "edume-acf6c.appspot.com",
  messagingSenderId: "136425491822",
  appId: "1:136425491822:web:b88a54cd878c699cb0c57f",
  measurementId: "G-D0EKH7VNJX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = eduData(); 