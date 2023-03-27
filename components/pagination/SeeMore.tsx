/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, useState, Key } from "react";
import { formatNameForUrl } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import MemberCard from "../cards/member";
import OpportunityCard from "../cards/opportunity";
import EntityCard from "../cards/entity";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* See More */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const SeeMore = (seeMoreProps: any) => {
    const { list, type, max, display, states } = seeMoreProps;
    const { translations } = states;
    const [ iterations, setIterations ] = useState(1);
    const [ seeMore, setSeeMore ] = useState(true);
    const [ seeLess, setSeeLess ] = useState(false);
    const checkButtons = (iterations: number) => {
        if(iterations === 1) {
            setSeeLess(false);
        } else {
            setSeeLess(true);
        };
        if(iterations === Math.ceil(list.length / max)) {
            setSeeMore(false);
        } else {
            setSeeMore(true);
        };
    };
    const seeMoreHandler = () => {
        if(iterations < Math.ceil(list.length / max)) {
            setIterations(iterations + 1);
        };
        checkButtons(iterations + 1);
    };
    const seeLessHandler = () => {
        if(iterations > 1) {
            setIterations(iterations - 1);
        };
        checkButtons(iterations - 1);
    };
    return <Fragment>
        <div className={ (display && display === "list") ? "list" : "grid twoColumns" }>
            { (type === "members") ? list.slice(0, iterations * max).map((member: any, key: Key) => <MemberCard key={ key } { ...seeMoreProps } member={ member }/>) : null }
            { (type === "opportunities") ? list.slice(0, iterations * max).map((opportunity: any, key: Key) => {
                const url = "/directories/opportunities/categories/" + formatNameForUrl(opportunity.TYPE[0].NAME) + "_" + opportunity.TYPE[0].ID + "/" + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID;
                return <Link key={ key } href={ url }>
                    <OpportunityCard { ...seeMoreProps } opportunity={ opportunity }/>
                </Link>;
            }) : null }
            { (type === "entities") ? list.slice(0, iterations * max).map((entity: any, key: Key) => {
                const url = "/directories/partners/" + formatNameForUrl(entity.NAME) + "_" + entity.ID;
                return <Link key={ key } href={ url }>
                    <EntityCard { ...seeMoreProps } entity={ entity } type="partner" details/>
                </Link>;
            }) : null }
        </div>
        { (seeLess || (seeMore && list.length > max)) ? <div className="grid twoColumns">
            { (seeLess) ? <button className={ ButtonStyles.callToAction } onClick={ seeLessHandler }>{ translations["Voir moins"] }</button> : null }
            { (seeMore && list.length > max) ? <button className={ ButtonStyles.callToAction } onClick={ seeMoreHandler }>{ translations["Voir plus"] }</button> : null }
        </div> : null }
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default SeeMore