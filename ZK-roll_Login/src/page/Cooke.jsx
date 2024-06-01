import React, { useState, useEffect } from 'react';
import "./style/profile.css"
import { Link,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
function Cooke() {
  const [data, setData] = useState(null);
  const [isLoaded, setLoading] = useState(false);

  const Loact = () => {
    let one = localStorage.getItem('usersdatatoken');
    let two = one ? JSON.parse(one) : {};
    // console.log(two.user);
    // console.log(two.io);
    // console.log(two.user.name);
    let user = Cookies.get('tokens');
    // console.log(user)
    // console.log(user.length)
let hash=user.slice(2,66);
console.log(hash)

    setData(two); // Set the user data, not the local storage value
    setLoading(true); // Set loading to true when data is available
  };

  useEffect(() => {
    Loact();
  }, []);


  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("usersdatatoken")) {
      alert("please Login form")
      navigate("/");
    }
  }, []);

  return (
    <div>

      <div className="dack-cookies">


   
      {isLoaded ? (
        data && data.user ? (
          <>
          <div className="users">

       
            <h1>{data.user.name}</h1>
            <h1>{data.user.email}</h1>
            <h1>{data.user.age}</h1>
            <h1>{data.user.password}</h1>
            <h1>{data.user.gender}</h1>
            <h3>{data.io}</h3>
   
            </div>
          </>
        ) : (
          <h1>User data not available</h1>
        )
      ) : (
        <h1>Loading...</h1>
      )}

</div>
    </div>
  );
}

export default Cooke;