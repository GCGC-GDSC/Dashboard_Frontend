// import React from "react"

// const Footer = () => {
//     const myStyle = {
//         height: "50px",
//         backgroundColor:"whitesmoke",
//         marginTop:"10rem"
//     }
//     return (
//         <div style={myStyle}>

//         </div>
//     )
// }
// export default Footer;
import React from "react"
import "./Footer.style.scss"
const Footer = () => {
    return (
      <div className="FooterStyle">
        <div className="container">
          
            <ul>
              
              <li>
                <a href="#">GDSC</a>
              </li>
              <li>
                <a href="#">Web-Dev Team</a>
              </li>
              <li>
                <a href="#">2021</a>
              </li>
              <li>
                <a href="#">Vikas</a>
              </li>
              <li>
                <span>👋</span>
              </li>
            </ul>
        </div>
      </div>
    );
  };
  export default Footer;