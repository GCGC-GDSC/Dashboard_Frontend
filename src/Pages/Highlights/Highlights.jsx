import React from 'react'
import HighlightsCard from "../../Components/HighlightsCard/HighlightsCard"
import "./HighlightsStyles.css"
import {highlights_data} from "./Highlights_data"
const Highlights = () => {
    return (
        <div className='highlightsPageParent'>
        <h1 style={{fontSize:"20px",textDecoration:"underline",color:"gray"}}>GITAM Placement Highlights</h1>
       {highlights_data.map((hdata,ind) => {
       
  return (
         <HighlightsCard year={hdata.year} 
         companies={hdata.companies} 
         placementOffers={hdata.placementOffers} 
         highestPackage={hdata.highestPackage}
         averagePackage={hdata.averagePackage}
         ind={ind}/>
         )
       })}
        {/* <HighlightsCard/>
        <HighlightsCard/>
        <HighlightsCard/>
        <HighlightsCard/>
        <HighlightsCard/> */}

        </div>

    );
}
export default Highlights;