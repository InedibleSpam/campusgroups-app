import { useState } from 'react'
import ReactDOM from 'react-dom'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Homepage from './components/Homepage'

function App() {
  

  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Homepage/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Homepage" element={<Homepage/>} />
     </Routes>

    </div>
  )
}

export default App
