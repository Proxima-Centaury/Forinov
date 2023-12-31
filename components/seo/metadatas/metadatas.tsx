/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment } from "react";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Head from "next/head";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Meta Datas */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const MetaDatas = (metadatasProps: any) => {
    const { profile, opportunity, type, categoryId, categoryName, states, router } = metadatasProps;
    const { metadatas } = states;
    // console.log("Profile value :", profile);
    // console.log("Opportunity value :", opportunity);
    // console.log("Type value :", type);
    // console.log("Category id value :", categoryId);
    // console.log("Category name value :", categoryName);
    // console.log("Page value :", router.asPath);
    // console.log("Meta datas :", metadatas);
    // console.log("Has meta datas :", metadatas[router.asPath]);
    // console.log("=".repeat(60));
    if(type && !profile && !opportunity) {
        if(type.match(/(startups)/) && categoryId && categoryName && metadatas["/directories/startups/categories/[category]"]) {
            const titles = [ metadatas["/directories/startups/categories/[category]"].title1, metadatas["/directories/startups/categories/[category]"].title2 ];
            const descriptions = [ metadatas["/directories/startups/categories/[category]"].description1, metadatas["/directories/startups/categories/[category]"].description2, metadatas["/directories/startups/categories/[category]"].description3 ];
            return <Head>
                <title>{ titles.join(" " + categoryName + " ") }</title>
                <meta name="description" content={ descriptions.join(" " + categoryName + " ") + "." }/>
            </Head>;
        } else if(type.match(/(corporates)/) && categoryId && categoryName && metadatas["/directories/corporates/categories/[category]"]) {
            const titles = [ metadatas["/directories/corporates/categories/[category]"].title1, metadatas["/directories/corporates/categories/[category]"].title2 ];
            const descriptions = [ metadatas["/directories/corporates/categories/[category]"].description1, metadatas["/directories/corporates/categories/[category]"].description2, metadatas["/directories/corporates/categories/[category]"].description3 ];
            return <Head>
                <title>{ titles.join(" " + categoryName + " ") }</title>
                <meta name="description" content={ descriptions.join(" " + categoryName + " ") + "." }/>
            </Head>;
        } else if(type.match(/(partners)/) && categoryId && categoryName && metadatas["/directories/partners/categories/[category]"]) {
            const titles = [ metadatas["/directories/partners/categories/[category]"].title1, metadatas["/directories/partners/categories/[category]"].title2 ];
            const descriptions = [ metadatas["/directories/partners/categories/[category]"].description1, metadatas["/directories/partners/categories/[category]"].description2, metadatas["/directories/partners/categories/[category]"].description3 ];
            return <Head>
                <title>{ titles.join(" " + categoryName + " ") }</title>
                <meta name="description" content={ descriptions.join(" " + categoryName + " ") + "." }/>
            </Head>;
        } else if(type.match(/(opportunities)/) && categoryId && categoryName && metadatas["/directories/opportunities/categories/[category]"]) {
            const titles = [ metadatas["/directories/opportunities/categories/[category]"].title1, metadatas["/directories/opportunities/categories/[category]"].title2 ];
            const descriptions = [ metadatas["/directories/opportunities/categories/[category]"].description1, metadatas["/directories/opportunities/categories/[category]"].description2, metadatas["/directories/opportunities/categories/[category]"].description3, metadatas["/directories/opportunities/categories/[category]"].description4 ];
            return <Head>
                <title>{ titles.join(" " + categoryName + " ") }</title>
                <meta name="description" content={ descriptions.join(" " + categoryName + " ") + "." }/>
            </Head>;
        } else {
            if(metadatas[router.asPath]) {
                return <Head>
                    <title>{ metadatas[router.asPath].title }</title>
                    <meta name="description" content={ metadatas[router.asPath].description + ((metadatas[router.asPath].description[metadatas[router.asPath].description.length - 1] === ".") ? "" : ".") }/>
                </Head>;
            };
        };
    } else if(type && profile && !opportunity) {
        const profileTagsString = profile.TAGS.split(",").slice(0, 3).join(", ");
        const metadataComment = profile.COMMENT.substring(0, 200) + "...";
        if(type.match(/(startups)/) && metadatas["/directories/startups/[id]"]) {
            const titles = [ metadatas["/directories/startups/[id]"].title1, metadatas["/directories/startups/[id]"].title2 ];
            const descriptions = [ metadatas["/directories/startups/[id]"].description1, metadatas["/directories/startups/[id]"].description2 ];
            return <Head>
                <title>{ titles.join(" " + profile.NAME + " ") + " : " + profile.CATEGORY[0].NAME }</title>
                <meta name="description" content={ descriptions.join(" " + profile.NAME) + " " + profile.CATEGORY[0].NAME + ", " + metadataComment + ", " + profileTagsString + "."}/>
            </Head>;
        } else if(type.match(/(corporates)/) && metadatas["/directories/corporates/[id]"]) {
            const titles = [ metadatas["/directories/corporates/[id]"].title1, metadatas["/directories/corporates/[id]"].title2 ];
            const descriptions = [ metadatas["/directories/corporates/[id]"].description1, metadatas["/directories/corporates/[id]"].description2, metadatas["/directories/corporates/[id]"].description3, metadatas["/directories/corporates/[id]"].description4, metadatas["/directories/corporates/[id]"].description5 ];
            return <Head>
                <title>{ titles.join(" " + profile.NAME + " ") + " : " + profile.CATEGORY[0] }</title>
                <meta name="description" content={ descriptions.join(" " + profile.NAME) + ((descriptions.join(" " + profile.NAME)[descriptions.join(" " + profile.NAME).length - 1] === ".") ? "" : ".") }/>
            </Head>;
        } else if(type.match(/(partners)/) && metadatas["/directories/partners/[id]"]) {
            const categories = profile.CATEGORY.map((category: any) => category.NAME.toLowerCase()).join(" / ");
            const titles = [ metadatas["/directories/partners/[id]"].title1, metadatas["/directories/partners/[id]"].title2 ];
            const descriptions = [ metadatas["/directories/partners/[id]"].description1, metadatas["/directories/partners/[id]"].description2, metadatas["/directories/partners/[id]"].description3, metadatas["/directories/partners/[id]"].description4 ];
            return <Head>
                <title>{ titles.join(" " + profile.NAME + " ") + " : " + categories }</title>
                <meta name="description" content={ descriptions.join(" " + profile.NAME) }/>
            </Head>;
        };
    } else if(type && !profile && opportunity) {
        if(type.match(/(opportunities)/)) {
            // const titles = [];
            // const descriptions = [];
            return <Head>
                <title>{ opportunity.OWNERNAME + " - " + opportunity.TITLE }</title>
                <meta name="description" content={ opportunity.DESCRIPTION.substring(0, 300).replaceAll("<br>", "").replaceAll("  ", " ") + "..." }/>
            </Head>;
        };
        return <Head>
            <title>{ opportunity.TITLE }</title>
            <meta name="description" content={ opportunity.DESCRIPTION }/>
        </Head>;
    };
    if(metadatas[router.asPath]) {
        return <Head>
            <title>{ metadatas[router.asPath].title }</title>
            <meta name="description" content={ metadatas[router.asPath].description + "." }/>
        </Head>;
    };
    return <Fragment></Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default MetaDatas;