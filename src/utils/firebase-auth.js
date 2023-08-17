import { signInWithPopup, signOut } from 'firebase/auth';
import {
    auth,
    googleAuthProvider,
} from '../firebase';

export const loginWithGoogle = async () => {
    try {
    const result = await signInWithPopup(auth, googleAuthProvider);
    return result.user;
  } catch (error) {
    return console.log(error);
  }
  };

  export const logout = async () => {
    try {
      await signOut(auth);
      return null;
    } catch (error) {
      return console.log(error);
    }
  };