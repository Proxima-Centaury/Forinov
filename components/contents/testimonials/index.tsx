/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation } from "next-i18next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LinkButton from "@buttons/linkButton";
import DefaultCarousel from "@carousels/defaultCarousel";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import TestimonialsStyles from "@contents/testimonials/Testimonials.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Testimonials */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Testimonials = (params: any): JSX.Element => {
    const { t } = useTranslation("common");
    const { testimonials } = require("@configurations/testimonials.json");
    return <div className={ TestimonialsStyles.container }>
        {/* <div className={ TestimonialsStyles.leftContainer }>
            <i className="fa-solid fa-quote-left"/>
            <p>bla bla bla bla bla</p>
            <p>{ "Lorem ipsum dolor sit amet asectetur adipiscim".repeat(10) }</p>
            <LinkButton classList="primary" text={ t("communityJoinLinkText") }/>
        </div> */}
        <DefaultCarousel items={ testimonials } itemsType="testimonials" navigation="bar"/>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Testimonials;