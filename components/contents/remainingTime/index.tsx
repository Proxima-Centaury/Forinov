/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation } from "next-i18next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import RemainingTimeStyles from "@contents/remainingTime/RemainingTime.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Remaining Time */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const RemainingTime = (params: any): JSX.Element => {
    const { t } = useTranslation("common");
    const { remainingTime } = params;
    const conditions = {
        // Years and months and days ( ex: [ 1, 6, 24 ] )
        full: (Array.isArray(remainingTime)) ? remainingTime[0] > 0 && remainingTime[1] > 0 && remainingTime[2] > 0 : false,
        // Years and months ( ex: [ 2, 11, 0 ] )
        ym: (Array.isArray(remainingTime)) ? remainingTime[0] > 0 && remainingTime[1] > 0 && remainingTime[2] === 0 : false,
        // Years and days ( ex: [ 1, 0, 29 ] )
        yd: (Array.isArray(remainingTime)) ? remainingTime[0] > 0 && remainingTime[1] === 0 && remainingTime[2] > 0 : false,
        // Months and days ( ex: [ 0, 3, 9 ] )
        md: (Array.isArray(remainingTime)) ? remainingTime[0] === 0 && remainingTime[1] > 0 && remainingTime[2] > 0 : false,
        // Years ( ex: [ 1, 0, 0 ] )
        y: (Array.isArray(remainingTime)) ? remainingTime[0] > 0 && remainingTime[1] === 0 && remainingTime[2] === 0 : false,
        // Months ( ex: [ 0, 2, 0 ] )
        m: (Array.isArray(remainingTime)) ? remainingTime[0] === 0 && remainingTime[1] > 0 && remainingTime[2] === 0 : false,
        // Days ( ex: [ 0, 0, 17 ] )
        d: (Array.isArray(remainingTime)) ? remainingTime[0] === 0 && remainingTime[1] === 0 && remainingTime[2] > 0 : false
    };
    return <Fragment>
        { (conditions.full) ? <div className={ RemainingTimeStyles.container }>
            <i className="fa-light fa-calendar"/>
            <p>{ t("remainingTimeFullText", { years: remainingTime[0], months: remainingTime[1], days: remainingTime[2] }) }</p>
        </div> : null }
        { (conditions.ym) ? <div className={ RemainingTimeStyles.container }>
            <i className="fa-light fa-calendar"/>
            <p>{ t("remainingTimeYearsAndMonthsText", { years: remainingTime[0], months: remainingTime[1] }) }</p>
        </div> : null }
        { (conditions.yd) ? <div className={ RemainingTimeStyles.container }>
            <i className="fa-light fa-calendar"/>
            <p>{ t("remainingTimeYearsAndDaysText", { years: remainingTime[0], days: remainingTime[2] }) }</p>
        </div> : null }
        { (conditions.md) ? <div className={ RemainingTimeStyles.container }>
            <i className="fa-light fa-calendar"/>
            <p>{ t("remainingTimeMonthsAndDaysText", { months: remainingTime[1], days: remainingTime[2] }) }</p>
        </div> : null }
        { (conditions.y) ? <div className={ RemainingTimeStyles.container }>
            <i className="fa-light fa-calendar"/>
            <p>{ t("remainingTimeYearsText", { years: remainingTime[0] }) }</p>
        </div> : null }
        { (conditions.m) ? <div className={ RemainingTimeStyles.container }>
            <i className="fa-light fa-calendar"/>
            <p>{ t("remainingTimeMonthsText", { months: remainingTime[1] }) }</p>
        </div> : null }
        { (conditions.d) ? <div className={ RemainingTimeStyles.container }>
            <i className="fa-light fa-calendar"/>
            <p>{ t("remainingTimeDaysText", { days: remainingTime[2] }) }</p>
        </div> : null }
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default RemainingTime;