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
  const handleChange=(e)=>{
    const color = e.target.value
    document.documentElement.style.setProperty('--themeBackground',color)
  }
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
                <a href="#">Vikas sir</a>
              </li>
              <li>
                <span>👋</span>
              </li>
              <li>
                <input type="color" onChange={handleChange}/>
              </li>
            </ul>
        </div>
      </div>
    );
  };
  export default Footer;