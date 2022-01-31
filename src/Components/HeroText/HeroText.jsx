import React from "react"

const HeroText = ({year}) => {
    const myStyle = {
        color: "maroon",
        fontSize:"x-large",
    }
    const heading = {
        fontSize:"large",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
    }
    
    return(
        <div className="heading" style={heading}>
        {/* <h1 style={myStyle}>GITAM CAREER GUIDANCE CENTRE</h1> */}
        {/* <h2>(GCGC)</h2>*/}
        <h3>CAREER FULFILLMENT STATISTICS <span style={myStyle}>2022</span></h3> 
        </div>
    )
}

export default HeroText;