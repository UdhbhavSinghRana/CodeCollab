import React from 'react';
import Logo from '../assets/logo.png';

function Header() {
  return (
    <>
        <div className='flex justify-items-center bg-gray-800'>
            <div className='w-fit text'>
                <img src={Logo} width={300}/>
            </div>
            <div className='text-slate-200 flex justify-end w-full gap-16 items-center pr-10'>
                <div className='hover:border-2 hover:bg-gray-700 p-2 rounded-md'>
                    Record Session
                </div>
                <div className='hover:border-2 hover:bg-gray-700 p-2 rounded-md'>
                    Room URL
                </div>
                <div className='hover:border-2 hover:bg-gray-700 p-2 rounded-md'>
                    Code Editor
                </div>
                <div className='hover:border-2 hover:bg-gray-700 hover:transition-delay: 500ms p-2 rounded-md'>
                    WhiteBoard
                </div>
            </div>
        </div>
    </>
  )
}

export default Header;