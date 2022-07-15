import React from 'react'
import HighlightsCard from "../HighlightsCard/HighlightsCard"
import "./HighlightsStyles.css"
const Highlights = () => {
    return (
        <div className='highlightsPageParent'>
        <h1>Highlights component</h1>
        <HighlightsCard/>
        <HighlightsCard/>
        <HighlightsCard/>
        <HighlightsCard/>
        <HighlightsCard/>



        </div>

    );
}
export default Highlights;