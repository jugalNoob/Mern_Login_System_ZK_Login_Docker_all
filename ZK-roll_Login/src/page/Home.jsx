import React, { useEffect, useState } from 'react'
import "./style/home.css"
import sha256 from 'crypto-js/sha256';

import {useNavigate } from 'react-router-dom';
function Home() {

  const [timess , setTime]=useState()

      function showTime() {
        const current = new Date();
        const times = `${current.getHours()} : ${current.getMinutes()} : ${current.getSeconds()}`;
       
        setTime(times)
        // console.log(times)
        // console.log(current)
       
     //   <!-- console.log(times); -->
  }


  useEffect(() => {
    const intervalId = setInterval(showTime, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Provide an empty dependency array

  const navigate = useNavigate();



  return (
    <div>
      <div className="back-home">

        <div className="head-onee">

<br /><br />
<br />
        {/* <span>time</span><span>{timess}</span> */}
        </div>
     
      </div>

    </div>
  )
}

export default Home