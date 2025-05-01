import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Homepage from './components/Homepage'
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Calendar from "./pages/Calendar";
import "./App.css";


function App() {
  

  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Homepage/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Homepage" element={<Homepage/>} />
      <Route path="/events" element={<Events />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/edit-event/:id" element={<EditEvent />} />
      <Route path="/calendar" element={<Calendar />} />
     </Routes>

    </div>
  )
}

export default App
