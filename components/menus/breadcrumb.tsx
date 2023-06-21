/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment, Key, useEffect, useState } from "react";
import { checkMatch, uppercaseFirst } from "../../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Button from "../buttons/button";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import BreadcrumbStyles from "../../public/stylesheets/components/menus/Breadcrumb.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Breadcrumb */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Breadcrumb = (breadcrumbProps: any) => {
    const { router } = breadcrumbProps;
    const [ breadcrumb, setBreadcrumb ] = useState(router.asPath.split("/").filter((crumb: String) => crumb.length > 0));
    const urls: Array<String> = [];
    useEffect(() => {
        setBreadcrumb(router.asPath.split("/").filter((crumb: String) => crumb.length > 0));
    }, [ router.asPath ])
    return <div className={ BreadcrumbStyles.container }>
        { breadcrumb.map((crumb: String, key: Key) => {
            urls.push((key > 0) ? "/" + breadcrumb[parseInt(key.toString()) - 1] + "/" + crumb : "/" + crumb);
            const crumbName = (crumb.indexOf("_") > 0) ? uppercaseFirst(crumb.replaceAll("-", " ").substring(0, crumb.indexOf("_"))).toString() : uppercaseFirst(crumb).toString();
            return (crumb) ? <Fragment key={ key }>
                <Button button={ ButtonStyles.default } href={ urls[key as keyof Object].toString() } text={ crumbName } active={ ((key === breadcrumb.length - 1) && checkMatch(router.asPath, urls[key]))  }/>
                <i className="fa-light fa-chevron-right"/>
            </Fragment> : null;
        }) }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Breadcrumb;