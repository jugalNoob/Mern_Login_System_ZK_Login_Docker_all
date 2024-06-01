import React from 'react'
import sha256 from 'crypto-js/sha256';
function form() {
  //Param Your nav Form//
  const id=3424545;
  const value=`/form/${id}`
  const hash = sha256(value);
  let hashes=hash.toString()
let val=`/form/${hashes}`

return val
  }


  
function hash() {
//Param Your nav Form//
const id=3424;
const value=`/form/${id}`
const hash = sha256(value);
let hashes=hash.toString()
let val=`/hash/${hashes}`

return val
}



      
function profile() {
//Param Your nav Form//
const id=24545;
const value=`/form/${id}`
const hash = sha256(value);
let hashes=hash.toString()
let val=`/profile/${hashes}`

return val
}



function Login() {
  //Param Your nav Form//
  const id=6969;
  const value=`/login/${id}`
  const hash = sha256(value);
  let hashes=hash.toString()
  let val=`/login/${hashes}`
  
  return val
  }
  
  function Post() {
    //Param Your nav Form//
    const id=6969;
    const value=`/post/${id}`
    const hash = sha256(value);
    let hashes=hash.toString()
    let val=`/post/${hashes}`
    
    return val
    }


    function Get() {
      //Param Your nav Form//
      const id=6969;
      const value=`/get/${id}`
      const hash = sha256(value);
      let hashes=hash.toString()
      let val=`/get/${hashes}`
      
      return val
      }


      function Update() {
        //Param Your nav Form//
        const id=6969;
        const value=`/update/${id}`
        const hash = sha256(value);
        let hashes=hash.toString()
        let val=`/update/${hashes}`
        
        return val
        }

        function Delete() {
          //Param Your nav Form//
          const id=6969;
          const value=`/delete/${id}`
          const hash = sha256(value);
          let hashes=hash.toString()
          let val=`/delete/${hashes}`
          
          return val
          }

function AllHash() {
 
  return (
    <div>AllHash</div>
  )
}

export { form ,  Login,profile ,AllHash}