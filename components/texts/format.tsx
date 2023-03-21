/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState, useEffect } from "react";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Format */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Format = (formatProps: any) => {
    const { content, disableLinks, router } = formatProps;
    const [ newContent, setNewContent ] = useState(undefined);
    const handleRouting = (event: any) => {
        event.preventDefault();
        const target = event.target.closest("a");
        if(target.href[0] === "/") {
            const route = router.basePath + "/" + router.locale + "/" + new URL(target.href).pathname;
            return window.location = route as any;
        };
        return router.push(target.href);
    };
    useEffect(() => {
        if(content && !disableLinks) {
            const links: Array<any> = [];
            const matches = content.match(/\[(.*?)\]/g);
            if(matches && matches.length > 0) {
                matches.map((link: String) => {
                    link = link.replaceAll(/(\[|\])/g, "");
                    const linkData = link.split("=");
                    links.push("<a href=" + (linkData[1] || "/") + " data-next-link>" + linkData[0] + "</a>");
                });
            };
            if(matches && matches.length > 0 && links.length > 0) {
                let alteredContent = content;
                matches.map((link: String, key: KeyType) => {
                    alteredContent = alteredContent.replace(link, links[key as keyof Object]);
                });
                return setNewContent(alteredContent);
            };
            return setNewContent(content);
        };
    }, [ content ]);
    useEffect(() => {
        const nextLinks = document.querySelectorAll("a[data-next-link]");
        (nextLinks.length > 0) ? nextLinks.forEach((link: any) => link.onclick = handleRouting) : null;
    });
    return <div className="formattedContent" dangerouslySetInnerHTML={ { __html: (newContent || content) + "." } }/>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Format;