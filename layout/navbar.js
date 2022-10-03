/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/future/image";
import { useEffect } from "react";
import Select from "../components/fields/select";
import config from "../config.json";
import Button from "../components/buttons/button";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Navbar */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const Navbar = ({ translations, setLanguage }) => {
    const { top } = config.navigations.unsigned;
    const { languages } = config;
    const showNavigation = (event) => {
        const target = event.target.closest("button");
        target.classList.toggle("active");
        return target;
    };
    const hideNestedLinks = () => {
        const visibleNests = document.querySelectorAll("ul.show");
        visibleNests.forEach((nest) => nest.classList.remove("show"));
        return visibleNests;
    };
    useEffect(() => {
        let showNestedLinks = (event) => {
            const target = event.target;
            const link = target.closest("li") || null;
            const navbar = target.closest(".navbar");
            const closestVisibleNest = target.closest("ul.show");
            if(link && navbar) {
                (!closestVisibleNest) ? hideNestedLinks() : null;
                const nest = link.querySelector("ul");
                if(nest) {
                    nest.classList.add("show");
                };
            } else if(!link && !navbar) {
                hideNestedLinks();
            };
        };
        window.addEventListener("mouseover", showNestedLinks);
        return () => window.removeEventListener("mouseover", showNestedLinks);
    }, []);
    return <nav className="navbar">
        <div className="logo">
            <Link href="/">
                <a><Image src="/assets/logo.png" width="50" height="50"/></a>
            </Link>
            <p>Forinov</p>
        </div>
        <ul className="links">
            { top.map(({ url, text, nesting, nest }, key) => <li key={ key }>
                <Link href={ url }>
                    <a>
                        <span>{ translations[text] }</span>
                        <i className="fa-light fa-chevron-down"/>
                    </a>
                </Link>
                { (nesting) ? <ul>
                    { nest.map(({ url, text }, key) => <li key={ key }>
                        <Link href={ url }>
                            <a>
                                <span>{ translations[text] }</span>
                            </a>
                        </Link>
                    </li>) }
                </ul> : null }
            </li>) }
        </ul>
        <div className="actions">
            <Select options={ languages } setter={ setLanguage }/>
            <Link href="/login">
                <a>
                    <i className="fa-light fa-user"/>
                </a>
            </Link>
            <Link href="/register">
                <a className="callToAction">{ translations["M'inscrire"] }</a>
            </Link>
        </div>
        <Button type="navigationButton" action={ showNavigation }/>
    </nav>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default Navbar;