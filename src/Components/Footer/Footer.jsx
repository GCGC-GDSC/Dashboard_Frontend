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
const Footer = () => {
    return (
      <div className="FooterStyle">
        <div className="container">
          <div>
            <ul>
              
              <li>
                <a href="">linkedin</a>
              </li>
              <li>
                <a href="">Email</a>
              </li>
              <li>
                <a href="">Instagram</a>
              </li>
              <li>
                <a href="">Github</a>
              </li>
              <li>
                <p>👋</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  export default Footer;