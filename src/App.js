import logo from './logo.svg';
import react , {useEffect} from 'react'
import './App.css';
import axios from 'axios'

function App() {
  useEffect(() => {
    axios.get('http://localhost:8000/api/student/UnderGraduates/')
    .then(resp=>{
      console.log(resp.data)
    })
  },[])
  return (
    <div className="App">
        welcome
    </div>
  );
}

export default App;
