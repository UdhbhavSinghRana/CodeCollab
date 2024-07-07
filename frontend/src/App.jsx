import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Editor from './components/Editor'
import ProblemsPage from "./components/Problems/problems";// Import the Problems component

function App() {
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setIsSideDrawerOpen(!isSideDrawerOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar}/>
    <ProblemsPage  isOpen={isSideDrawerOpen} setIsSideDrawerOpen={setIsSideDrawerOpen}/>
      <Editor />
     
    </>
  )
}

export default App
