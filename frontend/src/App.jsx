import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home';
import SignIn from './components/SignIn';
import Activation from './components/Activation';

function App() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const userInfo = localStorage.getItem('userInfo');

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={userInfo && !isLoggedOut ? <Home setIsLoggedOut={setIsLoggedOut} /> : <Navigate to="/SignIn" />} />
          <Route path="/room*" element={userInfo && !isLoggedOut ? <Home setIsLoggedOut={setIsLoggedOut} /> : <Navigate to="/SignIn" />} />
          <Route path="/SignIn" element={!userInfo || isLoggedOut ? <SignIn setIsLoggedOut={setIsLoggedOut} /> : <Navigate to="/" />} />
          <Route path="/activation" element={<Activation setIsLoggedOut={setIsLoggedOut} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
