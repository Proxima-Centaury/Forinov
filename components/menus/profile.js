/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { utilities } from "../../utilities/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Menu */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileMenu = ({ translations }) => {
    const scrollTo = (event) => {
        event.preventDefault();
        const allLinks = document.querySelectorAll(".profileMenu a");
        allLinks.forEach((link) => link.classList.remove("active"));
        const target = event.target.closest("a");
        target.classList.add("active");
        const container = document.querySelector(target.getAttribute("href"));
        return utilities.scrollTo(0, container.offsetTop);
    };
    return <div className="profileMenu">
        <p className="label">Menu</p>
        <ul>
            <li>
                <a href="#offer" className="active" onClick={ scrollTo }>{ translations["Notre offre"] }</a>
            </li>
            <li>
                <a href="#ecosystem" onClick={ scrollTo }>{ translations["Marché et écosystème"] }</a>
            </li>
            <li>
                <a href="#team" onClick={ scrollTo }>{ translations["L'équipe"] }</a>
            </li>
            <li>
                <a href="#newsfeed" onClick={ scrollTo }>{ translations["Fil d'actualité"] }</a>
            </li>
        </ul>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileMenu;