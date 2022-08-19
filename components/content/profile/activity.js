/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/future/image";
import Format from "../../texts/format";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Activity */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileActivity = ({ activity, translations }) => {
    const handleView = (event) => {
        const target = event.target.closest("button");
        const visibleClients = document.querySelectorAll(".activity");
        const hiddenClients = document.querySelectorAll(".activity.d-none");
        if(hiddenClients.length > 0) {
            hiddenClients.forEach((hiddenProduct) => hiddenProduct.classList.remove("d-none"));
            target.innerText = translations["Voir moins"];
        } else {
            visibleClients.forEach((visibleProduct, key) => (key > 1) ? visibleProduct.classList.add("d-none") : null);
            target.innerText = translations["Voir plus"] + " (" + (activity.length - 2) + ")";
        };
        return [ target, hiddenClients ];
    };
    if(activity) {
        return <div id="newsfeed" className="profileActivity">
            <h3>{ translations["Fil d'actualité"] }</h3>
            <div className="activities">
                { activity.map((event, key) => <div key={ key } className={ "activity" + ((key > 1) ? " d-none" : "") }>
                    <div className="marker"></div>
                    <div className="content">
                        <Image src={ event.LOGO } alt="" sizes="100vw" fill/>
                        <p className="user">{ event.NAME }</p>
                        <Format content={ event.CONTENT }/>
                        <p className="time">{ event.DATE }</p>
                    </div>
                </div>) }
            </div>
            { (activity.length > 2) ? <button className="seeMoreAlternative" onClick={ handleView }>{ translations["Voir plus"] + " (" + (activity.length - 2) + ")" }</button> : null }
        </div>;
    } else {
        return <div className="profileActivity"></div>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileActivity;