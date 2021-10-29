import React,{useEffect,useState} from 'react'
import Axios from "axios"
import DoughnutChart from '../Doughnut/DoughnutChart'
function Fetcher() {

    const [Hstudents,setHStudents] = useState([])
    const [Vstudents,setVStudents] = useState([])
    const [Bstudents,setBStudents] = useState([])
const getStudents = () => {
    Axios.get("http://127.0.0.1:8000/students/").then(
        res => 
        {
            console.log(res.data.result.vskp)
        }
    )
}

    useEffect(() => {   
        getStudents()
    }, [])
    return (
        <div>
    {/* <DoughnutChart vizag={ug[0].total_students+pg[0].total_students} hyd={ug[1].total_students+pg[1].total_students} blr={ug[2].total_students+pg[2].total_students} /> */}
        </div>
    )
}

export default Fetcher
