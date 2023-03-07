/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState, useEffect } from "react";
import { scrollTo } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileStyles from "../../public/stylesheets/components/menus/Profile.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Menus */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const menus = {
    startup: [
        { url: "#offer", classList: ProfileStyles.active, text: "Notre offre" },
        { url: "#ecosystem", classList: "", text: "Marché et écosystème" },
        { url: "#team", classList: "", text: "Équipe" },
        { url: "#newsfeed", classList: "", text: "Fil d'actualité" },
        { url: "#socialsfeed", classList: "", text: "Réseaux sociaux" }
    ],
    corporation: [
        { url: "#team", classList: ProfileStyles.active, text: "Équipe" },
        { url: "#opportunities", classList: "", text: "Opportunités" },
        { url: "#goals", classList: "", text: "Objectifs et offres" },
        { url: "#ecosystem", classList: "", text: "Écosystème et partenaires" },
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
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Menu */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileMenu = (pageProps: any) => {
    const [ menu, setMenu ] = useState(menus.startup);
    const { states, router }: any = pageProps;
    const { translations }: any = states;
    const { type }: any = router.query;
    const scrollToHandler = (event: any) => {
        event.preventDefault();
        const allLinks = document.querySelectorAll("." + ProfileStyles.menu + " a");
        allLinks.forEach((link) => link.classList.remove(ProfileStyles.active));
        const target = event.target.closest("a");
        target.classList.add(ProfileStyles.active);
        const container = document.querySelector(target.getAttribute("href"));
        return (container) ? scrollTo(0, container.offsetTop) : null;
    };
    useEffect(() => {
        const scrollMenuDisplayHandler = () => {}; // TODO Animate menu on content scroll
        window.addEventListener("scroll", scrollMenuDisplayHandler);
        return () => window.removeEventListener("scroll", scrollMenuDisplayHandler);
    }, []);
    useEffect(() => {
        let correctMenu = menus.startup as any;
        if(type.match(/(startup)/)) { correctMenu = menus.startup };
        if(type.match(/(corporation|entreprise)/)) { correctMenu = menus.corporation };
        if(type.match(/(partner|partenaire)/)) { correctMenu = menus.partner };
        setMenu(correctMenu);
    }, [ type ]);
    return <div className={ ProfileStyles.menu }>
        <p className={ ProfileStyles.label }>Menu</p>
        <ul>
            { (menu && menu.length > 0) ? menu.map(({ url, classList, text }: any, key: number) => <li key={ key }>
                <a href={ url } className={ classList } onClick={ scrollToHandler }>{ translations[text] }</a>
            </li>) : null }
        </ul>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileMenu;