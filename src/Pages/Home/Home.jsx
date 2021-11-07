import React from 'react'
import DoughnutChart from "../../Components/Doughnut/DoughnutChart"
import Fetcher from '../../Components/Fetcher/Fetcher'
import HorizontalBarChart from '../../Components/HorizontalBar/HorizontalBar'
import PieChart from "../../Components/PieChart/PieChart"
import VerticalBar from '../../Components/VerticalBar/VerticalBarChart'
import "./Home.scss"
import ParticleBackground from '../../ParticleBackground'
function Home() {
    return ( 
        <>  
        <section className='hero_section'>
            {/* <ParticleBackground/> */}
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
        <div style={{position: "relative", height:"40vh", width:"80vh",marginLeft:"30%"}} >
        <Fetcher/>
        {/* <DoughnutChart/>  */}
        {/* <HorizontalBarChart/> */}
        {/* <VerticalBar/> */}
        <PieChart/>
        </div>
        </>
    )
}

export default Home
