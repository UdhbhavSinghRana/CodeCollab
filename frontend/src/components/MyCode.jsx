import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';
import { useForm } from 'react-hook-form';
import './Problems/problems.css';
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { codeContext } from '../context/codeContext';


function MyCode({ isOpen, setIsCodeOpen }) {
    const {code, setCode} = useContext(codeContext);
    const [allCodes, setAllCodes] = useState([]);

    const handleClick = (currCode) => {
        setCode(currCode.code);
    };

    const handleDelete = (currCode) => {
        axios.delete(`http://localhost:5000/api/delete/${currCode._id}`, {withCredentials: true}).then((res) => {
            console.log(res.data.data);
            //setAllCodes(res.data.data);
            }
        );
        setIsCodeOpen(false);
    }

    const handleFormOpen = () => {
        setIsFormOpen(true);
    };

    useEffect(() => {
        axios.get('http://localhost:5000/api/all', {withCredentials: true}).then((res) => {
            console.log(res.data.data);
            setAllCodes(res.data.data);
            }
        );
    }, []);


    return (
        <div className='flex justify-center content-center'>
        <div className={`SideDrawer ${isOpen ? 'open' : ''}`}>
            <div className='flex justify-between p-4'>
            <IoAddOutline className='close-button' onClick={handleFormOpen} />
            <IoMdClose className='close-button' onClick={() => setIsCodeOpen(false)} />
            </div>
            <ul>
            {allCodes && allCodes.map((code, index) => (
                <li key={index} className='flex'>
                <button
                    className='block text-left px-4 py-2 w-full hover:bg-gray-200 rounded-lg text-gray-800'
                    onClick={() => handleClick(code)}
                >
                    {code.title}
                </button>
                <div>
                    <button onClick={() => handleDelete(code)}>
                        <MdDelete className='text-white' />
                    </button>
                </div>
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
}

export default MyCode;
