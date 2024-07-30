import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase obtenida desde la consola de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCmyZcpLEOXQdES1A9HIb9ckutSeQHjre8",
  authDomain: "loginturnow.firebaseapp.com",
  databaseURL: "https://loginturnow-default-rtdb.firebaseio.com/",
  projectId: "loginturnow",
  storageBucket: "loginturnow.appspot.com",
  messagingSenderId: "224268217235",
  appId: "1:224268217235:web:3341978544052a522e9666"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, app };
