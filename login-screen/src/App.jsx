import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './components/Register'
import Homepage from './components/Homepage'


import GroupHomePage from './pages/GroupHomePage'
import MyGroups from './pages/MyGroups'
import CreateGroup from './pages/CreateGroup'
import EditGroup from './pages/EditGroup'

import Navbar from "./components/Navbar";
import Events from "./pages/Events";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Calendar from "./pages/Calendar";
import "./App.css";




function App() {
  
//Create routes
  return (
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path = "/" element={<Login></Login>}/>
        <Route path = "/register" element= {<Register></Register>}/>
        <Route path = "/homepage" element= {<Homepage></Homepage>}/>
        <Route path = "/events" element= {<Events></Events>}/>
        <Route path = "/create-event" element= {<CreateEvent/>}/>
        <Route path = "/edit-event/:id" element= {<EditEvent/>}/>
        <Route path = "/calendar" element= {<Calendar/>}/>
      </Routes>
    </Router>
  );
  
  
  
}

export default App
