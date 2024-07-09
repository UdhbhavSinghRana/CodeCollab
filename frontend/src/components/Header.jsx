import React from 'react';
import Logo from '../assets/logo.png';
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { CiMenuBurger } from "react-icons/ci";

function Header({ toggleSidebar, toggleWhiteboard, setIsLoggedOut }) {
    const navigate = useNavigate();

    const copyRoomURLToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        showNotification("Copied");
    };

    const showNotification = (message) => {
        toast.success(message);
    };

    const scrollDownn = () => {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    };

    const handleLogout = () => {
        localStorage.clear();
        setIsLoggedOut(true);
        navigate('/SignIn');
    };

    return (
        <div className='flex justify-items-center bg-gray-800'>
            <div className='flex'>
                <div className='text-white flex items-center justify-center w-20'>
                    <button>
                        <CiMenuBurger size={30} />
                    </button>
                </div>
                <div className='w-fit text'>
                    <img src={Logo} width={300} alt="Logo" />
                </div>
            </div>
            <div className='text-slate-200 flex justify-end w-full gap-16 items-center pr-10'>
                <div className='hover:border-2 hover:bg-gray-700 p-2 rounded-md flex items-center' onClick={copyRoomURLToClipboard}>
                    <IoCopy className='mr-1' />
                    <span>Room URL</span>
                </div>
                <div className='hover:border-2 hover:bg-gray-700 p-2 rounded-md' onClick={scrollDownn}>
                    Code Editor
                </div>
                <div className='hover:border-2 hover:bg-gray-700 hover:transition-delay: 500ms p-2 rounded-md' onClick={toggleWhiteboard}>
                    WhiteBoard
                </div>
                <div className='hover:border-2 hover:bg-gray-700 hover:transition-delay: 500ms p-2 rounded-md' onClick={toggleSidebar}>
                    Problem Statements
                </div>
                <div className='hover:border-2 hover:bg-gray-700 hover:transition-delay: 500ms p-2 rounded-md' onClick={handleLogout}>
                    Log out
                </div>
            </div>
        </div>
    );
}

export default Header;
