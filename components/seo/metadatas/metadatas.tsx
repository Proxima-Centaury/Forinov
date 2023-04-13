/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment } from "react";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Meta Datas */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const MetaDatas = (metadatasProps: any) => {
    const { profile, opportunity, type, categoryId, categoryName, states, router } = metadatasProps;
    const { metadatas } = states;
    if(type && !profile && !opportunity) {
        if(type.match(/(startups)/) && categoryId && categoryName) {
            const titles = [ metadatas["/directories/startups/categories/[category]"].title1, metadatas["/directories/startups/categories/[category]"].title2 ];
            const descriptions = [ metadatas["/directories/startups/categories/[category]"].description1, metadatas["/directories/startups/categories/[category]"].description2, metadatas["/directories/startups/categories/[category]"].description3 ];
            return <Fragment>
                <title>{ titles.join(" " + categoryName + " ") }</title>
                <meta name="description" content={ descriptions.join(" " + categoryName + " ") }/>
            </Fragment>;
        } else if(type.match(/(corporates)/) && categoryId && categoryName) {
            const titles = [ metadatas["/directories/corporates/categories/[category]"].title1, metadatas["/directories/corporates/categories/[category]"].title2 ];
            const descriptions = [ metadatas["/directories/corporates/categories/[category]"].description1, metadatas["/directories/corporates/categories/[category]"].description2, metadatas["/directories/corporates/categories/[category]"].description3 ];
            return <Fragment>
                <title>{ titles.join(" " + categoryName + " ") }</title>
                <meta name="description" content={ descriptions.join(" " + categoryName + " ") }/>
            </Fragment>;
        } else if(type.match(/(partners)/) && categoryId && categoryName) {
            const titles = [ metadatas["/directories/partners/categories/[category]"].title1, metadatas["/directories/partners/categories/[category]"].title2 ];
            const descriptions = [ metadatas["/directories/partners/categories/[category]"].description1, metadatas["/directories/partners/categories/[category]"].description2, metadatas["/directories/partners/categories/[category]"].description3 ];
            return <Fragment>
                <title>{ titles.join(" " + categoryName + " ") }</title>
                <meta name="description" content={ descriptions.join(" " + categoryName + " ") }/>
            </Fragment>;
        } else if(type.match(/(opportunities)/) && categoryId && categoryName) {
            const titles = [ metadatas["/directories/opportunities/categories/[category]"].title1, metadatas["/directories/opportunities/categories/[category]"].title2 ];
            const descriptions = [ metadatas["/directories/opportunities/categories/[category]"].description1, metadatas["/directories/opportunities/categories/[category]"].description2, metadatas["/directories/opportunities/categories/[category]"].description3, metadatas["/directories/opportunities/categories/[category]"].description4 ];
            return <Fragment>
                <title>{ titles.join(" " + categoryName + " ") }</title>
                <meta name="description" content={ descriptions.join(" " + categoryName + " ") }/>
            </Fragment>;
        } else {
            return <Fragment>
                <title>{ metadatas[router.asPath].title }</title>
                <meta name="description" content={ metadatas[router.asPath].description }/>
            </Fragment>;
        };
    } else if(type && profile && !opportunity) {
        const profileTagsString = profile.TAGS.split(",").slice(0, 3).join(", ");
        const metadataComment = profile.COMMENT.substring(0, 200) + "...";
        if(type.match(/(startups)/)) {
            const titles = [ metadatas["/directories/startups/[id]"].title1, metadatas["/directories/startups/[id]"].title2 ];
            const descriptions = [ metadatas["/directories/startups/[id]"].description1, metadatas["/directories/startups/[id]"].description2 ];
            return <Fragment>
                <title>{ titles.join(" " + profile.NAME) + " " + profile.CATEGORY[0].NAME }</title>
                <meta name="description" content={ descriptions.join(" " + profile.NAME) + " " + profile.CATEGORY[0].NAME + ", " + metadataComment + ", " + profileTagsString + "."}/>
            </Fragment>;
        } else if(type.match(/(corporates)/)) {
            const titles = [ metadatas["/directories/corporates/[id]"].title1, metadatas["/directories/corporates/[id]"].title2 ];
            const descriptions = [ metadatas["/directories/corporates/[id]"].description1, metadatas["/directories/corporates/[id]"].description2, metadatas["/directories/corporates/[id]"].description3, metadatas["/directories/corporates/[id]"].description4, metadatas["/directories/corporates/[id]"].description5 ];
            return <Fragment>
                <title>{ titles.join(" " + profile.NAME) + " " + profile.CATEGORY[0] }</title>
                <meta name="description" content={ descriptions.join(" " + profile.NAME) }/>
            </Fragment>;
        } else if(type.match(/(partners)/)) {
            const categories = profile.CATEGORY.map((category: any) => category.NAME.toLowerCase()).join(" / ");
            const titles = [ metadatas["/directories/partners/[id]"].title1, metadatas["/directories/partners/[id]"].title2 ];
            const descriptions = [ metadatas["/directories/partners/[id]"].description1, metadatas["/directories/partners/[id]"].description2, metadatas["/directories/partners/[id]"].description3, metadatas["/directories/partners/[id]"].description4 ];
            return <Fragment>
                <title>{ titles.join(" " + profile.NAME + " ") + " " + categories }</title>
                <meta name="description" content={ descriptions.join(" " + profile.NAME) }/>
            </Fragment>;
        };
    } else if(type && !profile && opportunity) {
        if(type.match(/(opportunities)/)) {
            const titles = [ metadatas["/directories/opportunities/[id]"].title1, metadatas["/directories/opportunities/[id]"].title2 ];
            const descriptions = [ metadatas["/directories/opportunities/[id]"].description1, metadatas["/directories/opportunities/[id]"].description2, metadatas["/directories/opportunities/[id]"].description3, metadatas["/directories/opportunities/[id]"].description4 ];
            return <Fragment>
                <title>{ titles.join(" " + opportunity.TITLE + " ") }</title>
                <meta name="description" content={ descriptions.join(" " + opportunity.TITLE + " ") + "." }/>
            </Fragment>;
        };
        return <Fragment>
            <title>{ opportunity.TITLE }</title>
            <meta name="description" content={ opportunity.DESCRIPTION }/>
        </Fragment>;
    };
    return <Fragment>
        <title>{ metadatas[router.asPath].title || "" }</title>
        <meta name="description" content={ metadatas[router.asPath].description || "" }/>
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default MetaDatas;