import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Homepage from './components/Homepage'
<<<<<<< HEAD
import MyEvents from './pages/MyEvents'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'
=======
import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Calendar from "./pages/Calendar";
import "./App.css";

>>>>>>> 74227f3aac02e451e58c98aafd59c94d546b6ecd

function App() {
  
//Create routes
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Login/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Homepage" element={<Homepage/>} />
<<<<<<< HEAD
      <Route path='/my-events' element={<MyEvents/>}/>
      <Route path='create-event' element={<CreateEvent/>}/>
      <Route path='edit-event/:id' element={<EditEvent/>}/> 
      
=======
      <Route path="/events" element={<Events />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/edit-event/:id" element={<EditEvent />} />
      <Route path="/calendar" element={<Calendar />} />
>>>>>>> 74227f3aac02e451e58c98aafd59c94d546b6ecd
     </Routes>
    </div>
  )
}

export default App
