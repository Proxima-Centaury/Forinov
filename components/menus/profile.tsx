/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { scrollTo } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../public/stylesheets/components/menus/Profile.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Menus */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const menus = {
    startup: [
        { url: "#offer", classList: ProfileStyles.active, text: "Notre offre" },
        { url: "#ecosystem", classList: "", text: "Marché et écosystème" },
        { url: "#team", classList: "", text: "Équipe" },
        { url: "#newsfeed", classList: "", text: "Fil d'actualité" },
        { url: "#socialsfeed", classList: "", text: "Réseaux sociaux" }
    ],
    corporation: [
        { url: "#members", classList: ProfileStyles.active, text: "Membres" },
        { url: "#projects", classList: "", text: "Appels à projets" },
        { url: "#collaborators", classList: "", text: "Collaborateurs.trices" },
        { url: "#goals", classList: "", text: "Objectifs" },
        { url: "#profile", classList: "", text: "Profil" },
        { url: "#boosters", classList: "", text: "Incubateurs / Accélérateurs" },
        { url: "#newsfeed", classList: "", text: "Fil d'actualité" },
        { url: "#socialsfeed", classList: "", text: "Réseaux sociaux" }
    ],
    partner: [
        { url: "#team", classList: ProfileStyles.active, text: "Équipe" },
        { url: "#opportunities", classList: "", text: "Opportunités" },
        { url: "#goals", classList: "", text: "Objectifs et offres" },
        { url: "#ecosystem", classList: "", text: "Écosystème et partenaires" },
        { url: "#newsfeed", classList: "", text: "Fil d'actualité" },
        { url: "#socialsfeed", classList: "", text: "Réseaux sociaux" }
    ]
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Menu */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileMenu = ({ type, states }: any) => {
    const { translations }: any = states;
    const [ menu, setMenu ] = useState(menus[type as keyof Object]);
    const scrollToHandler = (event: any) => {
        event.preventDefault();
        const allLinks = document.querySelectorAll("." + ProfileStyles.menu + " a");
        allLinks.forEach((link) => link.classList.remove(ProfileStyles.active));
        const target = event.target.closest("a");
        target.classList.add(ProfileStyles.active);
        const container = document.querySelector(target.getAttribute("href"));
        return (container) ? scrollTo(0, container.offsetTop) : null;
    };
    return <div className={ ProfileStyles.menu }>
        <p className={ ProfileStyles.label }>Menu</p>
        <ul>
            { [ ...menu as Array<any> ].map(({ url, classList, text }: any, key: number) => <li key={ key }>
                <a href={ url } className={ classList } onClick={ scrollToHandler }>{ translations[text] }</a>
            </li>) }
        </ul>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileMenu;