/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation } from "next-i18next";
import { useRef, useEffect } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CustomImage from "@contents/customImage";
import LinkButton from "@buttons/linkButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { CarouselType } from "@typescript/types/CarouselType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CarouselStyles from "@carousels/Carousel.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Infinite Carousel */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const InfiniteCarousel = (params: CarouselType): JSX.Element => {
    const carouselReference = useRef(null);
	const { t } = useTranslation("common");
    const { classList, controls, gradient, indicators, items, itemsType, links, navigation } = params;
    const nextClasses = classList?.split(" ").map((cssClass: string) => CarouselStyles[cssClass]).join(" ") || ""; 
    const formatedClassList = CarouselStyles.carousel + " " + nextClasses;
    useEffect(() => {
        if(carouselReference?.current) {
            const wrapper: HTMLDivElement = carouselReference.current;
            const wrapperParent = wrapper.parentElement;
        };
    }, [ items ]);
    return <div className={ CarouselStyles.container }>
        <div className={ formatedClassList } data-gradient={ (gradient) ? gradient : "main" }>
            <div className={ CarouselStyles.wrapper } ref={ carouselReference }>
                <div className={ CarouselStyles.infinite }>
                    <div className={ CarouselStyles.firstCopy }>
                        { (Array.isArray(items)) ? items?.map((item: any, key: number) => {
                            switch(itemsType) {
                                case "logos" :
                                    return <Fragment key={ key }>
                                        <Link href={ item } className={ CarouselStyles.logo }>
                                            <CustomImage src={ item.logo } alt={ item.name }/>
                                        </Link>
                                    </Fragment>;
                            };
                        }) : null }
                    </div>
                    <div className={ CarouselStyles.secondCopy }>
                        { (Array.isArray(items)) ? items?.map((item: any, key: number) => {
                            switch(itemsType) {
                                case "logos" :
                                    return <Fragment key={ key }>
                                        <Link href={ item } className={ CarouselStyles.logo }>
                                            <CustomImage src={ item.logo } alt={ item.name }/>
                                        </Link>
                                    </Fragment>;
                            };
                        }) : null }
                    </div>
                </div>
            </div>
        </div>
        <div className={ CarouselStyles.actions }>
            { (links) ? <div className={ CarouselStyles.links }>
                { (itemsType === "startups") ? <Fragment>
                    <LinkButton classList="primary" href="/startups/dorectory" text={ t("startupsDirectoryLink") }/>
                </Fragment> : null }
                { (itemsType === "opportunities") ? <Fragment>
                    <LinkButton classList="primary" href="/opportunities/directory" text={ t("opportunitiesDirectoryLink") }/>
                    <LinkButton classList="denary" href="/opportunities" text={ t("whatIsAnOpportunityLink") }/>
                </Fragment> : null }
            </div> : null }
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default InfiniteCarousel;