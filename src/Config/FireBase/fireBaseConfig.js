import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCLdnWqtoTenKFrHZeWg0S1wrXqzIROlQc",
    authDomain: "agrocolombia-54580.firebaseapp.com",
    projectId: "agrocolombia-54580",
    storageBucket: "agrocolombia-54580.appspot.com",
    messagingSenderId: "49645316555",
    appId: "1:49645316555:web:91ed1f4f02e7d28a12ee4e",
    measurementId: "G-VK0HZ8NQWK"
};

export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const google = new GoogleAuthProvider();
export const dataBase = getFirestore(app);