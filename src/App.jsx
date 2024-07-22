// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

import React, { useState, useEffect } from "react";

function Joke() {

  const [joke, setJoke] = useState([]);
  
  useEffect(() => {
    fetch("https://api.balldontlie.io/v1/teams/", {
      method: "GET",
      headers: {
        "Authorization": "82fe8946-7fc4-4b25-bd1c-8225d39109c4",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJoke(data.data); 
        console.log(data);
      })
      .catch((error) => console.log(error));
  }, []);
  return (

<>

<div className="title">Teams</div>
<div>


{joke.map((a,i)=>(
<ul> 

<li key={i}> <p className='name'>{a.name}</p></li>

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