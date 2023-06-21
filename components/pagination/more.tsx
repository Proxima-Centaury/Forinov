/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment, useState, Key, MouseEventHandler } from "react";
import { formatNameForUrl } from "../../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
import MemberCard from "../cards/member";
import OpportunityCard from "../cards/opportunity";
import EntityCard from "../cards/entity";
import ActivityCard from "../cards/activity";
import Button from "../buttons/button";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* See More */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const SeeMore = (seeMoreProps: any) => {
    const { list, type, max, display, states } = seeMoreProps;
    const { translations, session } = states;
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
    const seeMoreHandler: MouseEventHandler = () => {
        if(iterations < Math.ceil(list.length / max)) {
            setIterations(iterations + 1);
        };
        checkButtons(iterations + 1);
    };
    const seeLessHandler: MouseEventHandler = () => {
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
                const getType = (type: String) => {
                    switch(type) {
                        case "Startup":
                            return "startup";
                        case "Entreprise":
                            return "corporate";
                        case "Incubateur":
                            return "partner";
                        default :
                            return "";
                    };
                };
                const url = "/directories/" + getType(entity.TYPE) + "s/" + formatNameForUrl(entity.NAME) + "_" + entity.ID;
                return <Link key={ key } href={ url }>
                    <EntityCard { ...seeMoreProps } entity={ entity } type={ getType(entity.TYPE) } details/>
                </Link>;
            }) : null }
            { (type === "activities") ? list.slice(0, iterations * max).map((event: any, key: Key) => <ActivityCard key={ key } { ...seeMoreProps } event={ event }/>) : null }
        </div>
        { (seeLess || (seeMore && list.length > max)) ? <div className="grid twoColumns">
            { (seeLess) ? <Button button={ ButtonStyles.callToAction } action={ seeLessHandler } icon="fa-light fa-eye-slash" text={ translations["Voir moins"] } disabled={ (!session) ? true : undefined }/> : null }
            { (seeMore && list.length > max) ? <Button button={ ButtonStyles.callToAction } action={ seeMoreHandler } icon="fa-light fa-eye" text={ translations["Voir plus"] } disabled={ (!session) ? true : undefined }/> : null }
        </div> : null }
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default SeeMore;