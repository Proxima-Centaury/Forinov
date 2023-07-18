/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LinkButton from "@buttons/linkButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { uppercaseFirst } from "@scripts/uppercaseFirst";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import BreadcrumbStyles from "@contents/breadcrumb/Breadcrumb.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Breadcrumb */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Breadcrumb = (params: any) => {
    const router = useRouter();
    const { asPath } = router;
    const [ breadcrumb, setBreadcrumb ] = useState(router.asPath.split("/").filter((crumb: string) => crumb.length > 0));
    const urls: string[] = [];
    useEffect(() => {
        setBreadcrumb(router.asPath.split("/").filter((crumb: string) => crumb.length > 0));
    }, [ router.asPath ])
    return <div className={ BreadcrumbStyles.container }>
        <LinkButton classList="inactiveLink borderless" href="/" icon="fa-solid fa-home"/>
        { breadcrumb.map((crumb: string, key: number) => {
            const crumbName = (crumb.indexOf("_") > 0) ? crumb.replaceAll("-", " ").substring(0, crumb.indexOf("_")) : crumb;
            const formattedCrumbName = decodeURIComponent(uppercaseFirst(crumbName));
            urls.push((key > 0) ? "/" + breadcrumb[parseInt(key.toString()) - 1] + "/" + crumb : "/" + crumb);
            const isActive = (asPath.match(urls[key])) ? true : false;
            return (crumb) ? <Fragment key={ key }>
                <i className="fa-light fa-chevron-right"/>
                <LinkButton classList="link borderless" href={ urls[key] } text={ formattedCrumbName } active={ isActive }/>
            </Fragment> : null;
        }) }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Breadcrumb;