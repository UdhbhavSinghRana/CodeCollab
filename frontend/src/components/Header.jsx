import React from 'react';
import Logo from '../assets/logo.png';
import { IoCopy } from "react-icons/io5";
import { toast } from "react-toastify";

function Header() {
    // Function to copy the current URL to clipboard
    const copyRoomURLToClipboard = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl);
        showNotification("Copied");
    };

    // Function to show toast notification
    const showNotification = (message) => {
        toast.success(message);
    };

    return (
        <div className='flex justify-items-center bg-gray-800'>
            <div className='w-fit text'>
                <img src={Logo} width={300} alt="Logo" />
            </div>
            <div className='text-slate-200 flex justify-end w-full gap-16 items-center pr-10'>
                <div className='hover:border-2 hover:bg-gray-700 p-2 rounded-md'>
                    Record Session
                </div>
                <div className='hover:border-2 hover:bg-gray-700 p-2 rounded-md flex items-center'
                    onClick={copyRoomURLToClipboard}>
                    <IoCopy className='mr-1' />
                    <span>Room URL</span>
                </div>
                <div className='hover:border-2 hover:bg-gray-700 p-2 rounded-md'>
                    Code Editor
                </div>
                <div className='hover:border-2 hover:bg-gray-700 hover:transition-delay: 500ms p-2 rounded-md'>
                    WhiteBoard
                </div>
                <div className='hover:border-2 hover:bg-gray-700 hover:transition-delay: 500ms p-2 rounded-md'>
                    Problem Statements
                </div>
            </div>
        </div>
    );
}

export default Header;
