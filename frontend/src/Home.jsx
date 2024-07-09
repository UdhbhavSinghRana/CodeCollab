import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import ProblemsPage from "./components/Problems/problems";
import { useLocation, useNavigate } from 'react-router-dom';
import socket from './socket';
import Whiteboard from './components/Whiteboard';
import ChatBox from './components/ChatBox';

function Home({ setIsLoggedOut }) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const navigate = useNavigate();

    const urlParams = new URLSearchParams(window.location.search);
    const room = urlParams.get('room');
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

    useEffect(() => {
        if (location.pathname === '/') {
            const roomNumber = Math.floor(Math.random() * 1000);
            navigate(`/room?room=${roomNumber}`);
        }
    }, [location, navigate]);

    useEffect(() => {
        socket.on('toggled-whiteboard', (data) => {
            setIsWhiteboardOpen(data.isWhiteboardOpen);
        });
    }, []);

    useEffect(() => {
        if (room) socket.emit('join-room', room);
        return () => {
            if (room) socket.emit('leave-room', room);
        }
    }, [room]);

    return (
        <div>
            <Header toggleSidebar={toggleSidebar} toggleWhiteboard={toggleWhiteboard} setIsLoggedOut={setIsLoggedOut} />
            <ProblemsPage isOpen={isSideDrawerOpen} setIsSideDrawerOpen={setIsSideDrawerOpen} />
            <Whiteboard isOpen={isWhiteboardOpen} setIsWhiteboardOpen={setIsWhiteboardOpen} />
            <Editor />
            <ChatBox />
        </div>
    );
}

export default Home;
