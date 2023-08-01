/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CustomImage from "@contents/customImage";
import RemainingTime from "@contents/remainingTime";
import PrimaryTag from "@tags/primaryTag";
import Tooltip from "@tooltips/defaultTooltip";
import LineSeparator from "@separators/lineSeparator";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { OpportunityType } from "@typescript/types/OpportunityType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CardStyles from "@cards/Card.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Opportunity Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const OpportunityCard = (params: OpportunityType) => {
    const { id, banner, category, countries, dates, description, language, owner, privacy, remainingTime, tags, title, url } = params;
    return <Link className={ CardStyles.card } href={ url || "/404" }>
        <div className={ `${ CardStyles.header } ${ CardStyles.banner }` }>
            <CustomImage src={ banner || "/assets/placeholders/banner.png" } alt=""/>
        </div>
        <div className={ CardStyles.body }>
            <div className={ CardStyles.leftContainer }>
                <CustomImage src={ owner?.logo || "/assets/placeholders/logo.png" } alt=""/>
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