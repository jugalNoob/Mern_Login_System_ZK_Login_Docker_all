import React , {useState,useEffect} from 'react'
import { ethers } from "ethers";
import abi from "./ABI.json"
import "./style/form.css"
import { Link } from 'react-router-dom';
function Form() {
   
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

        const [name , setName]=useState()
        const [email , setEmail]=useState()
        const [password , setPassword]=useState()
        const [age ,setAge]=useState()
        const [add ,setAdd]=useState()
    
        
    const Changeall= async()=>{
const {signer}=state;
try {

    if(!name || !email || !password || !age || !add){

        alert('please check your missing inpute');
    }else{
        const contractss=new ethers.Contract(contractAddress, abi ,signer)
        const verifyprofile=await contractss.generateKey(name , email ,password , age, add)       
        console.log(verifyprofile)
    }

} catch (error) {
 
    console.log(error)
} 
    }

///CHECK YOUR KEYS 

const [keyCheck , setKeyCheck]=useState([])
    const Mykeys =async()=>{
        const {provider , address ,signer}=state;

        try {
            const contractss=new ethers.Contract(contractAddress, abi ,signer)
            const keye=await contractss.getGeneratedKeys()
            console.log(keye.toString())
            let allone = keye.join(" , ");
            let allshow=allone.split(",")
            console.log(allshow);
        
            setKeyCheck(allshow)
        } catch (error) {
            console.log(error)
        }
      
    }

  return (
    <div>


<div className="background">
<div className="allone">

    <center>

        <form>
    <input type="text" name="" id="" onChange={(e)=>setName(e.target.value)} placeholder='enter a name'/>
    <br />
    <input type="email" name="" id="" onChange={(e)=>setEmail(e.target.value)} placeholder='enter a email'/>
    <br />
    <input type="text" name="" id="" onChange={(e)=>setPassword(e.target.value)} placeholder='enter a password'/>
    <br />
    <input type="number" name="" id="" onChange={(e)=>setAge(e.target.value)} placeholder='enter a age'/>
    <br />
    <input type="text" name="" id="" onChange={(e)=>setAdd(e.target.value)} placeholder='enter a address'/>
    <br />
    <button onClick={Changeall}>sigin</button>
    </form>
    <br />
    <br />

            <p>user already sigin and go <Link to="/login">login</Link> </p>
    </center>
<br />
<br />

</div>

{/* 
/Check your keeys information */}


<div className="keys">
    <button onClick={Mykeys}>generate keys</button>
</div>

<div className="keysNumber">

<h5>number::{keyCheck[0]}<br/></h5>
  <h5>number::{keyCheck[1]}</h5>
</div>

{/* //this is end row class line start */}
</div>
    </div>
  )
}

export default Form