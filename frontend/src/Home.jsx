import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Editor from './components/Editor'
import ProblemsPage from "./components/Problems/problems";// Import the Problems component
import { useLocation, useNavigate } from 'react-router-dom';


function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };

  // Redirect to a random room number
  useEffect(() => {
    if (location.pathname === '/') {
      const roomNumber = Math.floor(Math.random() * 1000); 
      navigate(`/room?room=${roomNumber}`);
    }
  }, [location, navigate]);

  return (
    <div>
        <Header toggleSidebar={toggleSidebar}/>
        <ProblemsPage  isOpen={isSideDrawerOpen} setIsSideDrawerOpen={setIsSideDrawerOpen}/>
        <Editor />
    </div>
  )
}

export default Home