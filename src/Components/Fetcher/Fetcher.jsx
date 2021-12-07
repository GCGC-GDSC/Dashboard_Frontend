import React,{useEffect,useState} from 'react'
import {unstable_batchedUpdates} from 'react-dom'
import Axios from "axios"
import DoughnutChart from '../Doughnut/DoughnutChart'
import VerticalBar from '../VerticalBar/VerticalBarChart'
import result from './localDB'
function Fetcher() {
    const [totalResult,setTotalResult] = useState({})
    const [campusId,setCampusId] = useState(0)
    const [Hstudents,setHStudents] = useState([])
    const [Vstudents,setVStudents] = useState([])
    const [Bstudents,setBStudents] = useState([])

const getLocalStudents = ()=>{
    const {vskp,blr,hyd} = result
    var vskpTotal = 0
    for (let inst in vskp){
        let institute = vskp[inst]
        vskpTotal += institute[0][0]['total_students'] + institute[1][0]['total_students']
    }
    var blrTotal = 0
    for (let inst in blr){
        let institute = blr[inst]
        console.log(institute)
        blrTotal += institute[0][0]['total_students'] + institute[1][0]['total_students']
    }
    var hydTotal = 0
    for (let inst in hyd){
        let institute = hyd[inst]
        hydTotal += institute[0][0]['total_students'] + institute[1][0]['total_students']
    }
    console.log(hydTotal,vskpTotal,blrTotal)
    unstable_batchedUpdates(() => {
        setTotalResult(result)
        setBStudents(blrTotal)
        setVStudents(vskpTotal)
        setHStudents(hydTotal)
    })
}

// const getStudents = () => {
//     Axios.get("http://127.0.0.1:8000/students/").then(
//         res => 
//         {
            
//             let store = res.data.result;
//             var ans  =0 
            

//             Object.keys(store).forEach((city) => {
                
//                 Object.keys(store[city]).forEach((ins) => {
//                 if(Object.keys(store[city][ins]).length && Object.keys(store[city][ins][0]).length){
//                         // console.log("😀"+store[city][ins][0][0].total_final_years);
//                     ans = ans + store[city][ins][0][0].total_final_years
                    
//                 }
//                 if(Object.keys(store[city][ins]).length>1 && Object.keys(store[city][ins][1]).length){
//                     // console.log("😀"+store[city][ins][1][0].total_final_years);
//                 ans = ans + store[city][ins][1][0].total_final_years
//             }
//                 })
//             console.log(city,"-",ans);  
//             if(city==="vskp")
//             {
//                 setVStudents(ans)
//             }
//             if(city==="blr")
//             {
//                 setBStudents(ans)
//             }
//             if(city==="hyd")
//             {
//                 setHStudents(ans)
//             }
//             ans = 0;
//             })
//             // console.log(res.data.result.vskp.GIT[0][0].total_final_years) //100
//             // console.log(res.data.result.vskp.GIT[1][0].total_final_years) //50

//             //Vertical Bar Chart
//             const vskp_clicked = () => {

//                 setHclicked(false)
//                 setBclicked(false)
//                 setVclicked(true)

//                 setGit(res.data.result.vskp.GIT[0][0].total_final_years + res.data.result.vskp.GIT[1][0].total_final_years);
//                 // gim = res.data.result.vskp.GIM[0][0].total_final_years + res.data.result.vskp.GIM[1][0].total_final_years
//                 setGim(0);
//                 setGst(0);
//             }
//             const hyd_clicked = () => {
//                 setGst(res.data.result.hyd.GST[0][0].total_final_years)
//                 setGim(0)
//                 setGit(0)
//                 // gim = res.data.result.vskp.GIM[0][0].total_final_years + res.data.result.vskp.GIM[1][0].total_final_years

//             }
//             const blr_clicked = () => {
//                 setGst(res.data.result.blr.GST[0][0].total_final_years + res.data.result.blr.GST[1][0].total_final_years)
//                 // gim = res.data.result.vskp.GIM[0][0].total_final_years + res.data.result.vskp.GIM[1][0].total_final_years
//             }

//             vskp_clicked()

//             // PieChart
            


//         }
//     )
// }

    useEffect(() => {   
        // getStudents()
        getLocalStudents()
    }, [])

    return (
        <div>
            {/* {console.log(Vstudents,Hstudents,Bstudents)} */}
        <div className = 'Chart_holder'>
            <DoughnutChart 
                vizag={Vstudents}
                hyd={Hstudents}
                blr={Bstudents} 
                style = { {"boxShadow" : "0 3px 10px black;"}}
                campusId={campusId} 
                setCampusId={setCampusId} />
        </div>

        <div className = 'Chart_holder'>
            {
                campusId == 0 ?
                    <VerticalBar campus={totalResult['vskp']}/> : null}
            {
                    campusId == 1 ?
                    <VerticalBar campus={totalResult['hyd']} /> : null
            }
            {
                    campusId == 2 ?
                    <VerticalBar campus={totalResult['blr']} /> : null    
            }
        </div>
        </div>
    )
}

export default Fetcher
