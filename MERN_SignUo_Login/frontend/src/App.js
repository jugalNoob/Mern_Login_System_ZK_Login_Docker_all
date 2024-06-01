


import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Form from './page/Form';
import Login from './page/Login';
import Dash from './page/Dash';
import Forget from './page/Forget';
import Nav from './page/Nav';


function App() {
  return (
    <div>
<Nav/>
          <Routes>
  
  <Route path="/" element={<Home />} />
  <Route path="/form" element={<Form />} />
  <Route path="/login" element={<Login />} />
  <Route path="/dash" element={<Dash />} />
  <Route path="/forget" element={<Forget/>} />

  </Routes>
    </div>
  )
}

export default App
