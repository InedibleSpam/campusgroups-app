import { useState } from 'react'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Homepage from './components/Homepage'
<<<<<<< HEAD
import GroupHomePage from './pages/GroupHomePage'
import MyGroups from './pages/MyGroups'
import CreateGroup from './pages/CreateGroup'
import EditGroup from './pages/EditGroup'

=======
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
>>>>>>> 514da2dab0d190bbe44a714f222e923d482abac4

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
      <Route path='/GroupHomePage' element={<GroupHomePage />} />
     <Route path='/Groups' element={<MyGroups />} />
     <Route path='/Create' element={<CreateGroup />} />
     <Route path='/Edit' element={<EditGroup />} />
=======
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
>>>>>>> 514da2dab0d190bbe44a714f222e923d482abac4
     </Routes>
    </div>
  )
}

export default App
