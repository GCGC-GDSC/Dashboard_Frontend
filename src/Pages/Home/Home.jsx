import React from 'react'
import DoughnutChart from "../../Components/Doughnut/DoughnutChart"
import Fetcher from '../../Components/Fetcher/Fetcher'
import HorizontalBarChart from '../../Components/HorizontalBar/HorizontalBar'
import PieChart from "../../Components/PieChart/PieChart"
import "./Home.scss"
function Home() {
    return (
        <div style={{position: "relative", height:"40vh", width:"80vh"}}>     
        <section className='hero_section'>
            <div className ="hero_section_outer">
                <div className = 'hero_section_inner'>
                    <h1>
                        GITAM CAREER GUIDANCE CENTRE
                            (GCGC)
                        CAREER FULFILLMENT STATISTICS  2021
                    </h1>
                </div>
            </div>
        </section>
        <Fetcher/>
        <DoughnutChart/> 
        <HorizontalBarChart/>
        <PieChart/></div>
    )
}

export default Home
