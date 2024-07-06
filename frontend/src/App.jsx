import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import Editor from './components/Editor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Editor />
    </>
  )
}

export default App
