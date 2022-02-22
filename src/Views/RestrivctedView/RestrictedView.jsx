import {ReactComponent as Restrict } from "../../assets/restrict.svg"
import "./RestrictedView.styles.scss"
const RestrictedView = () => {
    return(
        <>
        <div className="restrictcontainer">
            <p>
            Sorry. This Website can only be viewed in laptop screen
            </p>
            <div className="restrictimage">
        <Restrict/>
        </div>
        </div>
        </>
    )
}
export default RestrictedView;