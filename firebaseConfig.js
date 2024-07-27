// firebaseConfig.js
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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

// Inicializa Firebase solo si no ha sido inicializado antes
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Exporta las instancias necesarias para usarlas en tu aplicación
export const auth = getAuth(app);
export const firestore = getFirestore(app);
export default app;
