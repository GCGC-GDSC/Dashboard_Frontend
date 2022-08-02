import React from 'react'
import HighlightsCard from "../../Components/HighlightsCard/HighlightsCard"
import "./HighlightsStyles.css"
const Highlights = () => {
    return (
        <div className='highlightsPageParent'>
        <h1 style={{fontSize:"20px",textDecoration:"underline",color:"gray"}}>GITAM Placement Highlights</h1>
        <HighlightsCard/>
        <HighlightsCard/>
        <HighlightsCard/>
        <HighlightsCard/>
        <HighlightsCard/>

        </div>

    );
}
export default Highlights;