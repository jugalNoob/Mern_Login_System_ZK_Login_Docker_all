import React,{useState , useEffect} from 'react'
import Cookies from 'js-cookie';
import { useParams ,useNavigate} from 'react-router-dom';
import sha256 from 'crypto-js/sha256';
import CryptoJS from 'crypto-js';

function Login() {
  const navigate = useNavigate();
  const [name , setName]=useState("")
  const [email , setEmail]=useState("")
  const [age , setAge]=useState()

  
const [errors, setErrors] = useState({});
  const VAllErrors = () => {
    let errors = {};
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

  const handleSubmit = (e) => {
    e.preventDefault();
  
    const noErrors = VAllErrors(); 
    if (noErrors) {
      const secretKey = 'your_secret_key_here';

      // Combine all form fields and the secret key into a single string
      const dataToHash = [name, email, age, secretKey].join('');
      // console.log(one);

  console.log(dataToHash)
      


const three = sha256(dataToHash ).toString();
const first = three.split(' ');

console.log(first , "in am first");

// Session getItem
const two = sessionStorage.getItem("hash");
const second = JSON.parse(two , "i am second");
console.log(second)


//Cookies With Kio
const tw = Cookies.get("tokens");
const secon = JSON.parse(tw);

console.log(secon , "this tojen");

let matchFound = false;

for (let i = 0; i < first.length; i++) {
  for (let j = 0; j < second.length; j++) {
    if (first[i] === second[j]) {
      matchFound = true;
      break; // Exit the inner loop since we found a match
    }
  }
  if (matchFound) {
    break; // Exit the outer loop since we found a match
  }
}

if (matchFound) {
  console.log(true, "ljljd");
  navigate("/")
} else {
  console.log(false, "dsajhljh");
}

 
    } else {
      alert("Check your validation")
      console.log("Check your validation");
    }
  };
  
  return (
    <div>

<div className="back-form">

<div className="form">

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

<input type="number" name="" id=""
 onChange={(e)=>setAge(e.target.value)}  placeholder='age'/>
<br />
{errors.age && <span>{errors.age}</span>}
<br />
<button>sigup</button>


</form>
  
</center>

</div>
</div>
    </div>
  )
}

export default Login



      // xyz80e0c8a47e63a3@gmail.com
      //Jugal@#
      //69