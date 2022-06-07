import { initializeApp } from "firebase/app";
import "firebase/compat/auth";
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc} from 'firebase/firestore'
import {getAuth} from 'firebase/auth';

const config = {
    apiKey: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(config);
export const db = getFirestore(app);
export const auth = getAuth()
export default app
