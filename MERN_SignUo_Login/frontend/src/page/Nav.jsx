import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <div>

    <Link to ="/">Home</Link>
    <br />
         <Link to="/form">form</Link>
         <br />
         <Link to="/login">Login</Link>
         <br />
         <Link to="dash">Dash</Link>
         <br />
         <Link to="/forget">forget</Link>
      
    </div>
  )
}

export default Nav
