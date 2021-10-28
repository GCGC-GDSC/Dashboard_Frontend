import React from 'react'
import DoughnutChart from "../Components/Doughnut/DoughnutChart"
import HorizontalBarChart from '../Components/HorizontalBar/HorizontalBar'
import PieChart from "../Components/PieChart/PieChart"

function Home() {
    return (
        <div style={{position: "relative", height:"40vh", width:"80vh"}}>     <DoughnutChart/> 
        <HorizontalBarChart/>
        <PieChart/></div>
    )
}

export default Home
