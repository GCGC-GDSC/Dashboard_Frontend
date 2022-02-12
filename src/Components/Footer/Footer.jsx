import React from "react"
import "./Footer.style.scss"
import DSCLogo from '../../assets/gdscll.png'
const Footer = () => {
    return (
      <div className="FooterStyle">

        <div className="footercontainer">
            <ul>
              
              <li>
              <div className="dsclogo">
              <img src={DSCLogo} />
              <span>This WebApp is developed by WEB DEV TEAM of GDSC</span>
              </div>
              </li>
              <li>
                <a href="/team">Web-Dev Team</a>
              </li>
              
            </ul>
        </div>
      </div>
    );
  };
  export default Footer;