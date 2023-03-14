import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyACqF9_5ao-wU4sEldJX4Noi2IIQ0Yp3_A",
    authDomain: "curso-ca91b.firebaseapp.com",
    projectId: "curso-ca91b",
    storageBucket: "curso-ca91b.appspot.com",
    messagingSenderId: "617950469462",
    appId: "1:617950469462:web:7f55fe2cba225478d2caf7",
    measurementId: "G-7T7LJVSLCS"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp)

export { db, auth };