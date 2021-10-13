
// cros

// import './App.css';
// import React, {useState,useEffect} from 'react';

// function App() {
//   const[students,setStudent] = useState([]);
//   useEffect(()=>{
//     fetch("http://127.0.0.1:8000/api/student/campus/",{
//       method: "GET",
//       header: {
//         "Content-type":"application/json"
//       }
//     }).then(resp => resp.json())
//     .then(resp => {console.log(resp)})
//     .catch(error => {console.log(error)})
//   },[])
//   return (
//     <div className="App">
//       <header className="App-header">

//       <h1>Hello World</h1>

//       </header>
//       <div>
//       </div>
//     </div>
//   );
// }

// export default App;



import React from 'react'
import axios from 'axios'

function App(){

  // GET
  // axios.get(`http://127.0.0.1:8000/api/student/campus/`)
  // .then(res => {
  //   console.log(res);
  // });

  // POST
  // axios.post(`http://127.0.0.1:8000/api/student/campus/`, {campus_name:'chi',institue_count:8})
  // .then(res=>{
  //   console.log(res);
  // })

  // PUT
  // axios.put(`http://127.0.0.1:8000/api/student/campus/4/`,{campus_name:'chi',institue_count:100})
  // .then(res=>{
  //   console.log(res);
  // })

  // Delete
  axios.delete(`http://127.0.0.1:8000/api/student/campus/4/`)
  .then(res=>{
    console.log(res);
  })
  return(
    <h1>Hello World</h1>
  );
}

export default App;