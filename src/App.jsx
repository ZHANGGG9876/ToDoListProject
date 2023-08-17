import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import TodoList from './components/TodoList';
import SignUpPage from './components/SignUpPage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage/>}></Route>
        <Route path="/todolist" element={<TodoList setIsLoggedIn={isLoggedIn}/>} />
      </Routes>
    </Router>
  );
};

export default App;
