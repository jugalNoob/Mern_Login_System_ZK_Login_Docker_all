import React,{useState , useEffect} from 'react'
import Cookies from 'js-cookie';
import "./style/form.css"
import { useParams ,useNavigate} from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';
function Form() {
  const navigate = useNavigate();

  const [name , setName]=useState("")
  const [email , setEmail]=useState("")
  const [password , setPassword]=useState()
  const [age , setAge]=useState("")
const [gender , setGender]=useState("")
 
//Form Validation 

const [errors, setErrors] = useState({});


const VAllErrors = () => {
  let errors = {};
  if (!password) {
    errors.password = "password is required";
  }else if(password.length < 7 || password.length > 20){
    errors.password = "Password length must be between 7 and 20 characters";
  }

  if (name.length < 5 || name.length > 15) {
    errors.name = "Name length must be between 5 and 15 characters";
  } else if (!/[A-Z]/.test(name)) {
    errors.name = "Name should contain at least one uppercase letter";
  } else if (!/[*\-#&]/.test(name)) {
    errors.name = "Name should contain at least one special character";
  }

  if(!age){
errors.age="add age jugal "
  }
  setErrors(errors);
  return Object.keys(errors).length === 0;

}




//User Form Input with function 

// const param=useParams()
// // console.log(param)
// let io=`http://localhost:3000/form/${param.id}`



const handleSubmit=(e)=>{
  e.preventDefault();

  const noErrors = VAllErrors(); 

  if(noErrors){

    //LoaclStore setuser
    const one={name , email , password , age , gender}

    let io=window.location.href
    const userDataWithIo = {
      user: one,
      io: io,
    };
    localStorage.setItem("usersdatatoken", JSON.stringify(userDataWithIo));

//Session Storeage set ||||||||||||||

const secretKey = 'your_secret_key_here';

// Combine all form fields and the secret key into a single string
const dataToHash = [name, email, age, secretKey].join('');
   const hash = sha256(dataToHash).toString();
 let arr=[]
 arr.push(hash)
   sessionStorage.setItem("hash" , JSON.stringify(arr))

//Cockies Storage set|||||||||||||||||
///////////////////////////////ANCHOR - 
var plaintext = {name , email , age};
var plaintextString = JSON.stringify(plaintext);
console.log(plaintextString)
var secretKeys = 'my-secret-key';
var ciphertext = CryptoJS.AES.encrypt(plaintextString, secretKeys).toString();
// console.log('Ciphertext:', ciphertext);
    
 Cookies.set("token", JSON.stringify(ciphertext), {
  expires: 7, // Expires after 7 days
  secure: true,
})

Cookies.set("tokens", JSON.stringify(arr), {
  expires: 7, // Expires after 7 days
  secure: true,
})


navigate("/")
// console.log(ui)

  }else{
    alert(' user data error');
  }
}


//Rand Email 

const [rand , setRand]=useState()


const Randomes=()=>{
  let hex=` xyz${Math.random().toString(15).slice(2).padEnd(24 , "@gmail.com")}`

  setRand(hex)
}




  return (
    <div>

<div className="back-form">

<div className="form">
<div className="randomes">

<br />
<h1>{rand ? rand : "RandomEamil" }</h1>
<br />
<button onClick={Randomes}>Random</button>
</div>
<center>
<form  onSubmit={handleSubmit}>

<input type="text" name="" id=""
 onChange={(e)=>setName(e.target.value)}  placeholder='name'/>
<br />
{errors.name && <span>{errors.name}</span>}
<br />

<input type="email" name="" id=""
 onChange={(e)=>setEmail(e.target.value)}  placeholder='email'/>
<br />
<br />

<input type="password" name="" id=""
 onChange={(e)=>setPassword(e.target.value)}  placeholder='password'/>
<br />
{errors.password && <span>{errors.password}</span>}
          
          <br />


<input type="number" name="" id=""
 onChange={(e)=>setAge(e.target.value)}  placeholder='age'/>
<br />
{errors.age && <span>{errors.age}</span>}
<br />

<label>
              Gender:
              <input type="radio" name="gender" value="Male" 
              checked={gender === 'Male'} onChange={(e)=>setGender(e.target.value)}/>
              Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female"
               checked={gender === 'Female'} onChange={(e)=>setGender(e.target.value)}
              />
              Female
            </label>

<br />
<br />
<button>sigup</button>
</form>

</center>
</div>
      </div>

    </div>
  )
}

export default Form