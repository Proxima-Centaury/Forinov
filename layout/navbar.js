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
        const links = target.closest(".navbar").querySelector(".links");
        if(!target.closest(".navbar") || (target && target.classList.contains("active"))) {
            target.classList.remove("active");
            links.classList.remove("show");
        } else {
            target.classList.add("active");
            links.classList.add("show");
        };
        return target;
    };
    const hideNestedLinks = () => {
        const visibleNests = document.querySelectorAll("ul.show");
        visibleNests.forEach((nest) => nest.classList.remove("show"));
        return visibleNests;
    };
    useEffect(() => {
        if(window.innerWidth > 992) {
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
        } else {
            let showNestedLinks = (event) => {
                const target = event.target;
                const link = target.closest("li") || null;
                const navbar = target.closest(".navbar");
                const closestVisibleNest = target.closest("ul.show");
                if(link && navbar) {
                    (!closestVisibleNest) ? hideNestedLinks() : null;
                    const nest = link.querySelector("ul");
                    if(nest) {
                        nest.classList.toggle("show");
                    };
                } else if(!link && !navbar) {
                    hideNestedLinks();
                };
            };
            window.addEventListener("click", showNestedLinks);
            return () => window.removeEventListener("click", showNestedLinks);
        };
    }, []);
    return <nav className="navbar">
        <div className="logo">
            <Link href="/">
                <a><Image src="/assets/logo_full.png" width="170" height="50"/></a>
            </Link>
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