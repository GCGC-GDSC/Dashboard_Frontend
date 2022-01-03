import React, { useState } from "react"
import "./card.css"
import VBar from "./VBar"

const Card = ({ company,index ,companySet}) => {

// experimental  --start
const [flag,setFlag] = useState(false)
let data = {}  //when a card is clicked we get the company data, using this data
// we have to populate the VBar, is VBar is should come as a popup on the screen

// experiment  --end
console.log(company);
const showChartpopup = () => {
    console.log("make a vertical chart popup");
    console.log(company,"🤬🤬🤬",companySet);
    setFlag(true)



}
    
    return (
        <div className="card" onClick={showChartpopup}>
            <div className="card__title">{company.name_of_the_company}</div>
            <div className="card__body">
                {/* <div className="card__image"><img src={}/></div> */}
                <div>{company.package}</div>
                <div>{company.profile_offered}</div>
            </div>
            <div>
                {flag ? <VBar company={company}/> : null}
            </div>

           

        </div>
    )
};

export default Card;