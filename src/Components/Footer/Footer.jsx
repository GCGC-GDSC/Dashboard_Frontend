import React from "react"
import "./Footer.style.scss"
import DSCLogo from '../../assets/gdscll.png'
const Footer = () => {
    return (
      <div className="FooterStyle">

        <div className="footercontainer">
            
              <div className="dsclogo">
              <img src={DSCLogo} alt="GDSC"/>
              </div>
             <div className="rightSide">
              <span>Click on the section of the card for which you require the information</span>
              <span>Copyright 2022</span>
              </div>

        </div>
      </div>
    );
  };
  export default Footer;