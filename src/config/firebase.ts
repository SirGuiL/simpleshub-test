import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, onValue, get, update } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAfTc4HbdmwvRNjVR2TZV5heCIOLQCfD-M",
  authDomain: "simpleshub-a3a37.firebaseapp.com",
  projectId: "simpleshub-a3a37",
  storageBucket: "simpleshub-a3a37.appspot.com",
  messagingSenderId: "1037594325540",
  appId: "1:1037594325540:web:2f6d142138bb20b9725eb1",
  measurementId: "G-J3Q8Y1L4EV",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { analytics, database, ref, set, onValue, get, update };
