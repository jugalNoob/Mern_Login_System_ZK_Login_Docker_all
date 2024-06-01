import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dash() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const callAbout = async () => {
      let token = localStorage.getItem("usersdatatoken");

      const res = await fetch("http://localhost:9000/Count", {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              "Authorization": token
          }
      });

      const data = await res.json();
      setUserData(data)
console.log(data)

if (data.status === 401 || !data) {
        
      } else {
          console.log("user verify");
       
      }
    };

    callAbout();
  }, []);

  return (
    <div>
      <div className="cookbackground">
        <div className="cookback">
          <div className="cookflex">
            <div className="images">
              {/* <img src={one} alt="" /> */}
            </div>
            <div className="user">
              <h1>_id::{userData ? userData.userData._id : 'id not available'}</h1>
              <h1>name::{userData ? userData.userData
.name : 'name not available'}</h1>
              <h1>email::{userData ? userData.userData
.email : 'Email not available'}</h1>
              <h3>password::{userData ? userData.userData
.password : 'password not available'}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dash;
