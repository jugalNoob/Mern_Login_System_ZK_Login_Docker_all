import React , {useState,useEffect} from 'react'
import { ethers } from "ethers";
import abi from "./ABI.json"
import "./style/login.css"
import { Link } from 'react-router-dom';

function Login() {
    const [state , setState]=useState({
        provider:null,
        signer:null,
        address:null
    })
    
    const contractAddress = "0x48E0BE571007207e0BdDEa270Fba590c28920A9d"
    useEffect(()=>{
        const Checker=async()=>{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const account=await provider.send("eth_requestAccounts", []);
        const signer=provider.getSigner()
        const address = await signer.getAddress()
        // console.log("this is account " + account)
        // console.log("this is signer " + signer.toString())
        // console.log(address)
        setState({provider , signer , address})           
        }
        Checker()
        },[])

//Verify use keys and then login 
const [keys , setKeys]=useState("")


const Verfiykeys=async()=>{
    if(!state){return null;}

    try {
        const {signer}=state;
        const contractss=new ethers.Contract(contractAddress, abi ,signer)
        const verifyprofile=await contractss.verifyKey(keys)       
        console.log(verifyprofile)
    } catch (error) {

        console.log(error)
    }
}
// 48605222121657494558399558028055290966567524186832363820742999008738430387223

///GetInformation with all 

const [get , setGet]=useState()

const [show, setShow] = useState([]);

const [messageReceived, setMessageReceived] = useState([]);

const Information = async () => {
  try {
    const { signer } = state;
    const contractss = new ethers.Contract(contractAddress, abi, signer);
    const verifyprofile = await contractss.getIdentity(get);
    console.log(verifyprofile.toString());
    let allone = verifyprofile.join(" , ");
    let allshow = allone.split(",");
    console.log(allshow);
    setShow(allshow);

    setMessageReceived((prevMessages) => {
      // Append 'allshow' and previous messages separately
      let append = [...prevMessages, ...allshow];
      
      // Store the updated data in local storage
      localStorage.setItem('keyCheckData', JSON.stringify(append));

      return append;
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

  return (
    <div>
      <div className="background">
<div className="verfy">
  <center>
  <h5>link to go home <Link to="/">home</Link></h5>
  <br />
  <br />
  <h1>verify your hash and then show user login information</h1>
    <input type="text" name="" id="" onChange={(e)=>setKeys(e.target.value)} placeholder='enter a key and verify'/>
    <br />
    <br />
    <button onClick={Verfiykeys}>verify</button>
    </center>
</div>
<br />
<br />

{/* //Get informatiom all informatuion */}

<div className="info">
  <center>


    <input type="text" name="" id="" onChange={(e)=>setGet(e.target.value)} placeholder='enter key and check information'/>
    <br />
    <br />

    <button onClick={Information}>information</button>

    <h1>check your profile</h1>

<h1>name:: {show[0]}</h1>
<h1>email:: {show[1]}</h1>
<h1>password:: {show[2]}</h1>
<h1>age:: {show[3]}</h1>
<h1>address:: {show[4]}</h1>
</center>
</div>
       
</div>
    </div>
  )
}

export default Login


  // localStorage.removeItem('keyCheckData');
        // var retrievedData = localStorage.getItem('keyCheckData');
        // var parsedData = JSON.parse(retrievedData); 
        // console.log(parsedData);