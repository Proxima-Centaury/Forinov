/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Format */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Format = ({ content }: any) => {
    const router = useRouter();
    const [ newContent, setNewContent ] = useState(undefined);
    const handleRouting = (event: any) => {
        event.preventDefault();
        const target = event.target.closest("a");
        const href = new URL(target.href).pathname;
        return router.push(href);
    };
    useEffect(() => {
        if(content) {
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
    return <div className="formattedContent" dangerouslySetInnerHTML={ { __html: (newContent || content) + "." } } />;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Format;