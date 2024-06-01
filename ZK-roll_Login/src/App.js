// import React from 'react'
// import { Routes, Route } from 'react-router-dom';
// import Home from './page/Home';
// import Form from './page/Form';
// import Nav from "./page/Nav"
// import Login from './page/Login';


// function App() {
//   return (

//     <>
//   <Nav/>
// <Routes>
// <Nav/>
// <Routes>
// <Route path="/" element={<Home />} />
// <Route path="/form/:id" element={<Form />} />
// <Route path="/Login/:id" element={<Login></Login>}/>

// </Routes>

// </>
//   )
// }

// export default App



import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './page/Home';
import Form from './page/Form';
import Nav from './page/Nav';
import Login from './page/Login';
import Cooke from "./page/Cooke"

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
<Route path="/form/:id" element={<Form />} />
<Route path="/Login/:id" element={<Login></Login>}/>
<Route path="/profile/:id" element={<Cooke></Cooke>}/>
      </Routes>
    </>
  );
}

export default App;
