import { initializeApp } from 'firebase/app';
import { getAuth,
        GoogleAuthProvider,} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDt4yfS9-gcmDGWZMcTxR6UwNPtdBkzCX0",
  authDomain: "to-do-list-b7539.firebaseapp.com",
  projectId: "to-do-list-b7539",
  storageBucket: "to-do-list-b7539.appspot.com",
  messagingSenderId: "764265316315",
  appId: "1:764265316315:web:a37f7bc3f1dac04016f1fe",
  measurementId: "G-K6JVYTVVBT"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleAuthProvider = new GoogleAuthProvider();