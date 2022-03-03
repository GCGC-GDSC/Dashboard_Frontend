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
              <span>This Website is developed by Web Dev Team - GDSC</span>
              <span>Copyright Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla, laborum.</span>
              </div>

        </div>
      </div>
    );
  };
  export default Footer;