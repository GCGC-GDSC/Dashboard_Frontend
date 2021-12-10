import React from "react"

const HeroText = ({year}) => {
    const myStyle = {
        color: "maroon",
        fontSize:"xxx-large",
    }
    
    return(
        <>
        <h1 style={myStyle}>GITAM CAREER GUIDANCE CENTRE</h1>
        <h2>(GCGC)</h2>
        <h3>CAREER FULFILLMENT STATISTICS <span style={myStyle}>{year}</span></h3>
        </>
    )
}

export default HeroText;