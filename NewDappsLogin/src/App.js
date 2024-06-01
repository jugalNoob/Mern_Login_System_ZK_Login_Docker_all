import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './Page/Home';
import Nav from "./Page/Nav"
import Form from "./Page/Form"
import Login from "./Page/Login"
import Forget from "./Page/Forget"

function App() {
  return (
    <div>

<Nav/>
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/form" element={<Form></Form>}/>
  <Route path="/login" element={<Login></Login>}/>
  <Route path="/forget" element={<Forget></Forget>}/>
  </Routes>

    </div>
  )
}

export default App