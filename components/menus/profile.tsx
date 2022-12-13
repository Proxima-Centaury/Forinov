/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useRouter } from "next/router";
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
        { url: "#team", classList: "", text: "L'équipe" },
        { url: "#newsfeed", classList: "", text: "Fil d'actualité" },
        { url: "#socialsfeed", classList: "", text: "Réseaux sociaux" }
    ],
    corporation: [
        { url: "#team", classList: ProfileStyles.active, text: "Équipe" },
        { url: "#opportunities", classList: "", text: "Opportunités" },
        { url: "#goals", classList: "", text: "Objectifs et offres" },
        { url: "#ecosystem", classList: "", text: "Écosystème et partenaires" },
        { url: "#newsfeed", classList: "", text: "Fil d'actualité" }
    ],
    partner: []
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Menu */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileMenu = ({ states }: any) => {
    const router = useRouter();
    let { type } = router.query;
    if(type) {
        type = String(type);
        type = (type[type.length - 1] === "s") ? type.substring(0, type.length - 1) : type;
    };
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