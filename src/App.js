// import logo from './logo.svg';
import react , {useEffect} from 'react'
import './App.css';
// import axios from 'axios'

function App() {
  useEffect(()=>{
    fetch('http://localhost:8000/api/student/UnderGraduates/', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
      .then(response => response.json())
      .then(data => 
        console.log(data))
  },[])

  return (
    <div className="App">
        welcome
    </div>
  );

}

export default App;
