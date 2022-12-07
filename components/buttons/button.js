/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Button */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const Button = ({ type = "default", faIcon = false, faIconClass = "", url = null, action = null, text = "Button" }) => {
    if(type === "default") {

    } else if(type === "moreOrLess") {

    } else if(type === "callToActionWide") {
        return <button className={ type } onClick={ action }>
            { (faIcon) ? <span className="icon">
                <i className={ faIconClass }/>
            </span> : null }
            <p>{ text }</p>
        </button>
    } else if(type === "moreOrLess") {

    } else {

    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default Button;