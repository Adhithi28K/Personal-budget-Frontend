import React from 'react'
import Home from './Components/Homepage'
import {Routes, Route } from 'react-router-dom';
import CreateAccount from './Components/CreateAccount';
import Login from './Components/Login'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
// import "@fortawesome/fontawesome-free/css/all.min.css";
export default function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<CreateAccount/>} />
      <Route path="*" element={<Home/>} />
    </Routes>
  )
}
