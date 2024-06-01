import React,{useState,useContext} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';


function Login() {
 
  const navigate=useNavigate()
  const [user, setUser] = useState({

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

    // if (!user.name) {
    //   errors.name = "Please enter your name";
    //   alert("please enter your name")
    // } else if (user.name.length < 3) {
    //   errors.name = "Name should be at least 3 characters long";
    //   alert("name should be al last 3 character long")
    // } else if (!isNaN(user.name)) {
    //   errors.name = "Name should contain at least one character";
    //   alert("don't add numbers")
    // }

   
    if (user.password.length < 7 || user.password.length > 20) {
      errors.password = "Password length must be between 7 and 20 characters";
    }
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };


  
  const addUserdata = async (e) => {
    handleValidation();
    e.preventDefault();
 
 
    try {
      const { email, password } = user;
  
      if ( !email || !password) {
        alert('Missing required fields');
      }else{
  
        const isValid = handleValidation();

        if(isValid){
   
      const data = await fetch("http://localhost:9000/signup ", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
           email, password
        })
    });
  
    console.log(data)
    const res = await data.json();
    localStorage.setItem("usersdatatoken" , res.result.token)
    console.log(res , "iam one");
   
    if (res.status === 201) {
      console.log(res)
    // Store the userValid property in localStorage
      localStorage.setItem("usersdatatoken", JSON.stringify(res.result.userValid));
      localStorage.setItem("usersdatatoken" , res.result.token)
      console.log(JSON.stringify(res.result.userValid))
    }else{
     console.log("check your form")

    
    }
           
  }
      }
    } catch (error) {
      
      console.log(error)
    }
   
  
}

  return (
    <div>

<div className='login-background'>

  <div className='loginflex'>

<div className='login'>
  <form>
  <center>
   
<h1>create a new login</h1>

<input type="email" name="email" value={user.email} onChange={handleChange} placeholder=" email" />
<br/>

<br/>
<br/>
<input type="password" name="password" value={user.password} onChange={handleChange} placeholder=" password"  
          style={{ borderColor: errors.password && "red" }}/>
          <br />
          <Link to="/forget">forgetPassword</Link>
       {/* // {errors.password && <p>{errors.password}</p>} */}
<br/>

<br/>
<br/>

<button onClick={addUserdata}>sigin</button>
<br />

    </center>
</form>
</div>


  </div>
</div>

    </div>
  )
}

export default Login