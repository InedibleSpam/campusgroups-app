import { useState } from 'react'
import ReactDOM from 'react-dom'
import reactLogo from './assets/react.svg'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Register from './components/Register'
import Homepage from './components/Homepage'
import GroupHomePage from './pages/GroupHomePage'
import MyGroups from './pages/MyGroups'
import CreateGroup from './pages/CreateGroup'
import EditGroup from './pages/EditGroup'


function App() {
  

  return (
    <div className="App">
     <Routes>
     <Route path="/" element={<Homepage/>} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Homepage" element={<Homepage/>} />
      <Route path='/GroupHomePage' element={<GroupHomePage />} />
     <Route path='/Groups' element={<MyGroups />} />
     <Route path='/Create' element={<CreateGroup />} />
     <Route path='/Edit' element={<EditGroup />} />
     </Routes>

    </div>
  )
}

export default App
