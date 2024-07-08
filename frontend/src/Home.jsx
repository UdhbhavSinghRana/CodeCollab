import React, { useState } from 'react'
import Header from './components/Header'
import Editor from './components/Editor'
import ProblemsPage from "./components/Problems/problems";// Import the Problems component


function Home() {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };
  
  return (
    <div>
        <Header toggleSidebar={toggleSidebar}/>
        <ProblemsPage  isOpen={isSideDrawerOpen} setIsSideDrawerOpen={setIsSideDrawerOpen}/>
        <Editor />
    </div>
  )
}

export default Home