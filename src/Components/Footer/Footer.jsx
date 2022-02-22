import React from "react"
import "./Footer.style.scss"
import DSCLogo from '../../assets/gdscll.png'
const Footer = () => {
  const handleChange=(e)=>{
    const color = e.target.value
    document.documentElement.style.setProperty('--themeBackground',color)
  }
    return (
      <div className="FooterStyle">

        <div className="container">
            <ul>
              
              <li>
          <img src={DSCLogo} width="300" />
                {/* <a href="#">GDSC</a> */}
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