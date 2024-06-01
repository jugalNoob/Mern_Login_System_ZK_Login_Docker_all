import React , {useState,useEffect} from 'react'
import { ethers } from "ethers";
import abi from "./ABI.json"
import { Link } from 'react-router-dom';

function Forget() {
   
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
///Add identy in web3 projects

const [key , setKey]=useState()
        const [name , setName]=useState()
        const [email , setEmail]=useState()
        const [password , setPassword]=useState()
        const [age ,setAge]=useState()
      
    
        
    const Changeall= async()=>{
const {signer}=state;
try {

    if(!key || !name || !email || !password || !age ){

        alert('please check your missing inpute');
    }else{
        const contractss=new ethers.Contract(contractAddress, abi ,signer)
        const verifyprofile=await contractss.updateIdentity(key , name , email ,password , age)       
        console.log(verifyprofile)
    }

} catch (error) {
 
    console.log(error)
} 
    }

///CHECK YOUR KEYS 



  return (
    <div>
<div className="background">


<div className="allone">
    <center>
<h1>update your signup</h1>
   
    <form >
    <input type="number" name="" id=""  onChange={(e)=>setKey(e.target.value)} placeholder='enter a keys'/>
    <br />
    <input type="text" name="" id="" onChange={(e)=>setName(e.target.value)} placeholder='enter a name'/>
    <br />
    <input type="email" name="" id="" onChange={(e)=>setEmail(e.target.value)} placeholder='enter a email'/>
    <br />
    <input type="text" name="" id="" onChange={(e)=>setPassword(e.target.value)} placeholder='enter a password'/>
    <br />
    <input type="text" name="" id="" onChange={(e)=>setAge(e.target.value)} placeholder='enter a age'/>
    <br />
    
    <br />
    <button onClick={Changeall}>sigin</button>
    </form>
    <br />
 
    <p>link  to go home  <Link to="/">home</Link></p>
    </center>
<br />
<br />

</div>

{/* 
/Check your keeys information */}


</div>
    </div>
  )
}

export default Forget