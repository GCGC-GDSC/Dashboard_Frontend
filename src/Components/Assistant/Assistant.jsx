import Boy from "./me-dark.webp";
import Bubble from "./conversation.png"
import "./Assistant.styles.scss"
const Assistant = () => {
    return <>
    <img src={Boy} alt="boy image" style={{ transform: "rotate(45deg)", margin:"-110px"}}/> 
    <div class="container">
    <img src={Bubble} alt="bubble should be here" />
    <button class="btn">Button</button>
    </div>
    </>
}
export default Assistant;
