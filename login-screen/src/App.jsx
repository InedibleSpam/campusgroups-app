import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Homepage from './components/Homepage'

import MyEvents from './pages/MyEvents'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'
import GroupHomePage from './pages/GroupHomePage'
import MyGroups from './pages/MyGroups'
import CreateGroup from './pages/CreateGroup'
import EditGroup from './pages/EditGroup'
import Events from './pages/Events'

import Navbar from "./components/Navbar";
import Calendar from "./pages/Calendar";
import "./App.css";



function App() {
  
//Create routes
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Login/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Homepage" element={<Homepage/>} />


      <Route path='/GroupHomePage' element={<GroupHomePage />} />
     <Route path='/Groups' element={<MyGroups />} />
     <Route path='/Create' element={<CreateGroup />} />
     <Route path='/Edit' element={<EditGroup />} />



      <Route path='/my-events' element={<MyEvents/>}/>
      <Route path='create-event' element={<CreateEvent/>}/>
      <Route path='edit-event/:id' element={<EditEvent/>}/> 
      

      <Route path="/events" element={<Events />} />
      <Route path="/create-event" element={<CreateEvent />} />
      <Route path="/edit-event/:id" element={<EditEvent />} />
      <Route path="/calendar" element={<Calendar />} />

     </Routes>
    </div>
  )
}

export default App
