import React, { useEffect } from 'react'
import DoughnutChart from "../../Components/Doughnut/DoughnutChart"
import Fetcher from '../../Components/Fetcher/Fetcher'
import Fetcher2 from '../../Components/Fetcher2/Fetcher2'
import HorizontalBarChart from '../../Components/HorizontalBar/HorizontalBar'
import ParticlesComponent from '../../Components/Particles/ParticlesComponent'
import PieChart from "../../Components/PieChart/PieChart"
import VerticalBar from '../../Components/VerticalBar/VerticalBarChart'
import "./Home.scss"
import ParticleBackground from '../../ParticleBackground'
import HeroText from "../../Components/HeroText/HeroText"
import Aos from "aos"
import "aos/dist/aos.css"
import Footer from '../../Components/Footer/Footer'

function Home() {
    useEffect(() => {
        Aos.init({})
    },[])
    return ( 
        <>  
        <section className='hero_section'>
            <div className ="hero_section_outer">
                <div className = 'hero_section_inner'>
                       <div data-aos="zoom-out-left"> <HeroText year={2022}/></div>
                        <ParticlesComponent/>

                </div>
            </div>
        </section>
        <main className='main_section'>
            <Fetcher/>
        </main>
        <Fetcher2/>
            <Footer/>
        
        </>
    )
}

export default Home
