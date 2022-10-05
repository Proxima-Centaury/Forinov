/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Button */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const Button = ({ type = "default", faIcon = false, faIconClass = "", url = null, action = null, text = "Button", count = null }) => {
    if(type === "default") {

    } else if(type === "moreOrLess") {
        return <button className="seeMore" onClick={ action }>
            <span>{ text + " (" + count + ")" }</span>
            <i className="fa-solid fa-caret-right"/>
        </button>;
    } else if(type === "moreOrLessAlternative") {
        return <button className="seeMoreAlternative" onClick={ action }>
            <span>{ text + " (" + count + ")" }</span>
        </button>;
    } else if(type === "callToActionWide") {
        return <button className={ type } onClick={ action }>
            { (faIcon) ? <span className="icon">
                <i className={ faIconClass }/>
            </span> : null }
            <p>{ text }</p>
        </button>
    } else if(type === "") {

    } else if(type === "navigationButton") {
        return <button className={ type } onClick={ action }>
            <span></span>
            <span></span>
            <span></span>
        </button>;
    } else {

    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default Button;