import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Editor from './components/Editor'
import ProblemsPage from "./components/Problems/problems";// Import the Problems component
import { useLocation, useNavigate } from 'react-router-dom';
import Whiteboard from './components/Whiteboard';


function Home() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };

  const toggleWhiteboard = () => {
    setIsWhiteboardOpen(!isWhiteboardOpen);
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
        <Header toggleSidebar={toggleSidebar} toggleWhiteboard={toggleWhiteboard}/>
        <ProblemsPage  isOpen={isSideDrawerOpen} setIsSideDrawerOpen={setIsSideDrawerOpen}/>
          <Whiteboard isOpen={isWhiteboardOpen} setIsWhiteboardOpen={setIsWhiteboardOpen}/>
        <div className='mt-20'>
          <Editor />
        </div>
        
    </div>
  )
}

export default Home