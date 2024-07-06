import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Editor from './components/Editor'
import ProblemsPage from "./components/Problems/problems";// Import the Problems component

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Function to toggle sidebar state
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar}/>
      <Editor />
      {isSidebarOpen && <ProblemsPage toggleSidebar={toggleSidebar}/>}
    </>
  )
}

export default App
