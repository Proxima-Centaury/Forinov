/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { scrollTo } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../public/stylesheets/components/menus/Profile.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Menu */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileMenu = ({ states }: any) => {
    const { translations }: any = states;
    const scrollToHandler = (event: any) => {
        event.preventDefault();
        const allLinks = document.querySelectorAll(".profileMenu a");
        allLinks.forEach((link) => link.classList.remove("active"));
        const target = event.target.closest("a");
        target.classList.add("active");
        const container = document.querySelector(target.getAttribute("href"));
        return (container) ? scrollTo(0, container.offsetTop) : null;
    };
    return <div className={ ProfileStyles.menu }>
        <p className={ ProfileStyles.label }>Menu</p>
        <ul>
            <li>
                <a href="#offer" className="active" onClick={ scrollToHandler }>{ translations["Notre offre"] }</a>
            </li>
            <li>
                <a href="#ecosystem" onClick={ scrollToHandler }>{ translations["Marché et écosystème"] }</a>
            </li>
            <li>
                <a href="#team" onClick={ scrollToHandler }>{ translations["L'équipe"] }</a>
            </li>
            <li>
                <a href="#newsfeed" onClick={ scrollToHandler }>{ translations["Fil d'actualité"] }</a>
            </li>
        </ul>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileMenu;