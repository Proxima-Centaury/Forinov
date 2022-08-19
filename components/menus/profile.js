/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Menu */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileMenu = ({ translations }) => {
    return <div className="profileMenu">
        <p className="label">Menu</p>
        <ul>
            <li>
                <a href="#offer">{ translations["Notre offre"] }</a>
            </li>
            <li>
                <a href="#ecosystem">{ translations["Marché et écosystème"] }</a>
            </li>
            <li>
                <a href="#team">{ translations["L'équipe"] }</a>
            </li>
            <li>
                <a href="#newsfeed">{ translations["Fil d'actualité"] }</a>
            </li>
        </ul>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileMenu;