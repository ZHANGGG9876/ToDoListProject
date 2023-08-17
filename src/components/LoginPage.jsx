import React, { useState } from 'react';
import { loginWithGoogle } from '../utils/firebase-auth';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faTableList } from '@fortawesome/free-solid-svg-icons';
import Typical from 'react-typical';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc,getDoc, setDoc } from "firebase/firestore"; 
import { firestore } from '../firebase';

import './LoginPage.css';

const LoginPage = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(() => {
        history('/todolist');
      });
    } catch (error) {
      setErrorMessage("Invalid email or password.");
      setShowError(true);
    }
   
  };

  const handleSignUp = () => {
    history('/signup');
  };
  const handleCloseError = () => {
    setShowError(false);
  };
  const handleGoogleLogin = () => {
    loginWithGoogle()
      .then(async user => {
        const userRef = doc(firestore, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
          await setDoc(doc(firestore, "users", user.uid), {
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            tasks: []
          });
        }
        setUser({
          uid: user.uid,
          name: user.displayName,
          photoURL: user.photoURL,
        });
        history('/todolist');
      })
      .catch(error => {
        console.log(error);
      });
  };


  return (
    <div className='popup'>
      <div className="popup-title-container">
        <h1 className="popup-title">
          <FontAwesomeIcon icon={faTableList} className="list-icon" />
          <Typical steps={['To Do List ...']} wrapper="p" />
        </h1>
      </div>
      <div className='popup-content'>
        <h1 className='popup-login-title'>Login</h1>
        <input
          className='popup-input'
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="popup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {showError && (
            <div>
             <div className="overlay" onClick={handleCloseError} />
               <div className="error-popup">
                 <span className="error-message">{errorMessage}</span>
                 <button className="close-button" onClick={handleCloseError}>
                   &#10005;
                 </button>
               </div>
          </div>
        )}
        <div  className="popup-button-container">
          <button className='popup-login-button' onClick={handleLogin}>Login</button>
          <button className='popup-signup-button' onClick={handleSignUp} >Sign Up</button>
        </div>
        <a className="popup-forgot-password" href="#">
            Forgot Password
        </a>
        <button className='popup-login-with-google-button' onClick={handleGoogleLogin}>Login With Google<FontAwesomeIcon className='icon' icon={faGoogle} /></button>
      </div>
    </div>
  );
};

export default LoginPage;
