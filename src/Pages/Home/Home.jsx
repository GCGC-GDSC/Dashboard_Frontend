import React, { useEffect } from 'react'
import "./Home.scss"
import HeroText from "../../Components/HeroText/HeroText"
import Aos from "aos"
import "aos/dist/aos.css"
import Footer from '../../Components/Footer/Footer'
import BasicTabs from "../../Components/Tabs/Tabs"

function Home({user}) {
    useEffect(() => {
        Aos.init({})
    },[])
    return ( 
        <div className='homePage'>  
        {/* hero section particles js */}
        {/* <section className='hero_section'>
            <div className ="hero_section_outer">
                <div className = 'hero_section_inner'>
                       <div data-aos="zoom-out-left"> <HeroText year={2022}/></div>
                        <ParticlesComponent/>

                </div>
            </div>
        </section> */}
     
        <HeroText year={2022}/>
        <main className='main_section'>
        {user && user.email?
        <p>{user.email}</p>:null}
            <BasicTabs/>

        </main>
            <Footer/>
        </div>
    )
}

export default Home
