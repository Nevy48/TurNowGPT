import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCmyZcpLEOXQdES1A9HIb9ckutSeQHjre8",
  authDomain: "loginturnow.firebaseapp.com",
  projectId: "loginturnow",
  storageBucket: "loginturnow.appspot.com",
  messagingSenderId: "224268217235",
  appId: "1:224268217235:web:3341978544052a522e9666",
  measurementId: "G-LTXJ07JCNM"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase