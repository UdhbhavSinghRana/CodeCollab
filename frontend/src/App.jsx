import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header'
import Editor from './components/Editor'
import Home from './Home'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
