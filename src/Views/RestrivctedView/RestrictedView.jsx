import {ReactComponent as Restrict } from "../../assets/restrict.svg"
import "./RestrictedView.styles.scss"
const RestrictedView = () => {
    return(
        <>
        <div className="restrictcontainer">
            <p>
            Sorry. This view can only be viewed in laptop screen only.
            </p>
            <div className="restrictimage">
        <Restrict/>
        </div>
        </div>
        </>
    )
}
export default RestrictedView;