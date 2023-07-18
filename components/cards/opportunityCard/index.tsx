/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import Link from "next/link";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LineSeparator from "@separators/lineSeparator";
import PrimaryTag from "@tags/primaryTag";
import RemainingTime from "@contents/remainingTime";
import Tooltip from "@tooltips/defaultTooltip";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TOpportunity } from "@typescript/types/TOpportunity";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CardStyles from "@cards/Card.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Opportunity Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const OpportunityCard = (params: TOpportunity) => {
    const { banner, category, owner, privacy, remainingTime, title, url } = params;
    return <Link className={ CardStyles.card } href={ url || "/404" }>
        <div className={ `${ CardStyles.header } ${ CardStyles.banner }` }>
            <Image src={ banner || "/assets/placeholders/banner.png" } alt={ "" } width="490" height="150"/>
        </div>
        <div className={ CardStyles.body }>
            <div className={ CardStyles.leftContainer }>
                <Image src={ owner?.logo || "/assets/placeholders/logo.png" } alt={ "" } width="100" height="100"/>
            </div>
            <LineSeparator classList="vertical"/>
            <div className={ CardStyles.rightContainer }>
                <div className={ CardStyles.opportunityMeta }>
                    <p>{ owner?.name }</p>
                    <div className={ CardStyles.privacy }>
                        <i className={ `fa-light fa-${ (privacy?.match(/(public)/i)) ? "eye" : "eye-slash" }` }/>
                        <p>{ privacy }</p>
                    </div>
                </div>
                <Tooltip tooltip={ title }>
                    <p className={ CardStyles.title }>{ title }</p>
                </Tooltip>
                <Tooltip tooltip={ category?.name }>
                    <PrimaryTag tag={ category?.name } color={ `type${ (category?.id) ? category?.id : 0 }` }/>
                </Tooltip>
                <RemainingTime remainingTime={ remainingTime }/>
            </div>
        </div>
        <div className={ CardStyles.footer }/>
    </Link>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default OpportunityCard;