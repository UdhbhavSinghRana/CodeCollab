import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import Editor from './components/Editor'
import ProblemsPage from "./components/Problems/problems";// Import the Problems component
import { useLocation, useNavigate } from 'react-router-dom';
import io from "socket.io-client";
import socket from './socket';
import Whiteboard from './components/Whiteboard';
import ChatBox from './components/ChatBox';
import SignIn from './components/SignIn';


function Home() {
  const urlParams = new URLSearchParams(window.location.search);
  const room = urlParams.get('room');
  const navigate = useNavigate();
  const location = useLocation();
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };

  const toggleWhiteboard = () => {
    setIsWhiteboardOpen(!isWhiteboardOpen);
    socket.emit('toggled-whiteboard', { room, isWhiteboardOpen: !isWhiteboardOpen });
  };

  // Redirect to a random room number
  
  useEffect(() => {
    if (location.pathname === '/') {
      const roomNumber = Math.floor(Math.random() * 1000); 
      navigate(`/room?room=${roomNumber}`);
    }
  }, [location, navigate]);

  useEffect(() => {
    socket.on('toggled-whiteboard', (data) => {
      setIsWhiteboardOpen(data.isWhiteboardOpen);
    }
  ),[]});

  return (
    <div>
        <Header toggleSidebar={toggleSidebar} toggleWhiteboard={toggleWhiteboard}/>
        <ProblemsPage  isOpen={isSideDrawerOpen} setIsSideDrawerOpen={setIsSideDrawerOpen}/>
        <Whiteboard isOpen={isWhiteboardOpen} setIsWhiteboardOpen={setIsWhiteboardOpen}/>
        <Editor />
        <ChatBox/>
        {/* <SignIn /> */}
    </div>
  )
}

export default Home;