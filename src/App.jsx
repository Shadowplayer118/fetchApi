// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import React, { useState, useEffect } from "react";

function Joke() {

  const [joke, setJoke] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:5034/api/ClientApi/GetClients", {
     
    })
      .then((response) => response.json())
      .then((data) => {
        setJoke(data); 
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (

<>

<div className="title">Teams</div>
<div>


{joke && joke.map((a,i)=>(
<ul> 

<li key={i}> <p className='name'>{a.client_name}</p></li>

</ul>
))}

</div>


</>


    // <div>
    //   <h2>Teams:</h2>
    //   {<p>{joke}</p>}
    // </div>
  );
}
export default Joke;