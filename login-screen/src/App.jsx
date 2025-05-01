import { useState } from 'react'
import ReactDOM from 'react-dom'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Homepage from './components/Homepage'
import MyEvents from './pages/MyEvents'
import CreateEvent from './pages/CreateEvent'
import EditEvent from './pages/EditEvent'

function App() {
  
//Create routes
  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Login/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Homepage" element={<Homepage/>} />
      <Route path='/my-events' element={<MyEvents/>}/>
      <Route path='create-event' element={<CreateEvent/>}/>
      <Route path='edit-event/:id' element={<EditEvent/>}/> 
      
     </Routes>
    </div>
  )
}

export default App
