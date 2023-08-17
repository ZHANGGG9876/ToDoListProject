import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Typical from 'react-typical';
import { auth, firestore  } from '../firebase';
import { doc, setDoc } from "firebase/firestore"; 
import './SignUpPage.css';

import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';

const SignUpPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('Todos los campos son obligatorios. Por favor, asegúrate de llenarlos todos.');
  const [showEmailError, setShowEmailError] = useState(false);
  const history = useNavigate();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSignUp = async () => {
    try {
      const signInMethods = await fetchSignInMethodsForEmail(auth, email, password);
      if(signInMethods.length > 0){
        setErrorMessage('The email entered already exists.');
        setShowEmailError(true);
        return;
      } else if (password.length < 8) {
        setErrorMessage('Password must be at least 8 characters.');
        setShowEmailError(true);
        return;
      } else if (password !== repeatPassword) {
        setErrorMessage('Passwords do not match.');
        setShowEmailError(true);
        return;
      } else if (username=='') {
        setErrorMessage('Username is invalid.');
        setShowEmailError(true);
        return;
      } else if (!isChecked) {
        setErrorMessage('You must accept terms of service.');
        setShowEmailError(true);
        return;
      }
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (userCredential.user) {
        const user = {
          username,
          email,
          password,
          tasks: [] 
        };
        await createUserProfileDocument(userCredential.user.uid, user); // Función para guardar en Firebase
      }
    } catch (error) {
      console.log('error', error);
      setShowEmailError(true);
    }
  };

  const createUserProfileDocument = async (uid, user) => {
    if (!user) return;
    await setDoc(doc(firestore, "users", uid), {
      uid:uid,
      username: username,
      email:email,
      tasks: [] 
    });
    handleGoToLoginPage();
  };
 
  const handleGoToLoginPage = () => {
    history("/login")
  };
  
  const handleCloseError = () => {
    setShowEmailError(false);
  };

  return (
    <div className='popup'>
      <div className="popup-title-container">
        <h1 className="popup-title">
          <Typical steps={['Welcome  to To Do List ...']} wrapper="p" />
        </h1>
      </div>
      <div className='popup-content'>
        <h1 className='popup-login-title'>Sign Up</h1>
      <input 
        required
        className='popup-input'
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} />
      <input
        required
        className="popup-input"
        type="password"
        placeholder="Create a password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
       />
      <input
        required
        className="popup-input"
        type="password"
        placeholder="Repeat your password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
      />
      <input
        required
        className='popup-input'
        type="text"
        placeholder="Enter a username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
        <label className='agree-terms-container'>
          <input type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
            I agree all statement in <a className="popup-agree-terms" href="#">
            Terms of service
        </a>
        </label>
        <div className="button-container">
          <button className='popup-signup-button' onClick={handleSignUp}>Sign Up</button>
        </div>
        <p>Have already an account?<a className="popup-have-account" href="#" onClick={handleGoToLoginPage}>
            Login here
        </a></p>
      </div>
      {showEmailError && (
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
    </div>
  );
};

export default SignUpPage;
