import React,{useState , useEffect} from 'react'

import { Link,useNavigate } from 'react-router-dom'


function Form() {
  const [gen, setGen] = useState();
  const Hashing = () => {
    let hex = `XYZ${Math.random().toString(15).slice(2).padEnd(24, '@gmail.com')}`;
    // console.log(hex);
    setGen(hex);
  };

  const navigate=useNavigate()
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };


  
  const handleValidation = () => {
    let errors = {};

    
    if (user.password.length < 7 || user.password.length > 20) {
      errors.password = "Password length must be between 7 and 20 characters";
    }

    if (user.name.length < 5 || user.name.length > 15) {
      errors.name = "Name length must be between 5 and 15 characters";
    } else if (!/[A-Z]/.test(user.name)) {
      errors.name = "Name should contain at least one uppercase letter";
    } else if (!/[*\-#&]/.test(user.name)) {
      errors.name = "Name should contain at least one special character";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;

  };


  //Post Data Row classs

  const addUserdata = async (e) => {
    e.preventDefault();
  
    try {
      const { name, email, password } = user;
  
      if (!name || !email || !password) {
        alert("Missing required fields");
      } else {
        const isValid = handleValidation(); // Call handleValidation before submitting
  
        if (isValid) {
          const data = await fetch("http://localhost:9000/signin ", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
          });
  
          const res = await data.json();
          if (res.status === 201) {
            alert("Check your form");
          } else {

            // navigate("/")
            console.log(user);
            // localStorage.setItem("usersdatatoken",res.result.token);
            // localStorage.setItem("usersdatatokens",res.result.name);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>


<div className="background">

<div className="hashing">
        <center>
        <h1 >{gen ? gen : 'connect'}</h1>
    
        <br />
        <button onClick={Hashing}>Generate email!</button>
        </center>
      </div>

<div className='forms'>

  <form>

    <center>
    <h1>Sign up to our platform</h1>

<h2>create a new account</h2>
<br />
    <input type="text" name="name" value={user.name} onChange={handleChange} 
          style={{ borderColor: errors.name && "red" }} placeholder='name'/>
        {/* {errors.name && <p>{errors.name}</p>} */}
<br/>
{errors.name && <span>{errors.name}</span>}
<br />
<input type="email" name="email" value={user.email} onChange={handleChange} placeholder=" email" />
<br/>
<br/>
<input type="password" name="password" value={user.password} onChange={handleChange} placeholder=" password"  
          style={{ borderColor: errors.password && "red" }}/>
          <br />
             {errors.password && <span>{errors.password}</span>}
    
<br/>

<button onClick={ addUserdata}>sigin</button>

    </center>
</form>
</div>

 

  
</div>
    </div>
  )
}

export default Form