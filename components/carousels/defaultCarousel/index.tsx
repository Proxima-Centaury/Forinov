/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation } from "next-i18next";
import { memo, useRef, useState, useEffect } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import StartupProfileCard from "@cards/profiles/startupCard";
import OpportunityCard from "@cards/opportunityCard";
import ArticleCard from "@cards/articleCard";
import TestimonialCard from "@cards/testimonialCard";
import LinkButton from "@buttons/linkButton";
import ClassicButton from "@buttons/classicButton";
import Tooltip from "@tooltips/defaultTooltip";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { MouseEventHandler } from "react";
import type { CarouselType } from "@typescript/types/CarouselType";
import type { StartupType } from "@typescript/types/StartupType";
import type { OpportunityType } from "@typescript/types/OpportunityType";
import type { ArticleType } from "@typescript/types/ArticleType";
import type { TestimonialType } from "@typescript/types/TestimonialType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CarouselStyles from "@carousels/Carousel.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Memorization */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const MemoStartupProfileCard = memo(StartupProfileCard);
const MemoOpportunityCard = memo(OpportunityCard);
const MemoArticleCard = memo(ArticleCard);
const MemoTestimonialCard = memo(TestimonialCard);
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Default Carousel */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const DefaultCarousel = (params: CarouselType): JSX.Element => {
    const carouselReference = useRef(null);
	const { t } = useTranslation("common");
    const { classList, controls, gradient, indicators, items, itemsType, links, navigation } = params;
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ pause, setPause ] = useState(false);
    const [ carouseControls, setCarouselControls ] = useState((controls) ? controls : false);
    const [ carouseIndicators, setCarouselIndicators ] = useState((indicators) ? indicators : false);
    const moveLeft: MouseEventHandler = () => (items) ? setCurrentIndex((currentIndex > 0) ? currentIndex - 1 : items.length - 1) : false;
    const moveRight: MouseEventHandler = () => (items) ? setCurrentIndex((currentIndex < items.length - 1) ? currentIndex + 1 : 0) : false;
    const handlePause: MouseEventHandler = () => setPause(!pause);
    const nextClasses = classList?.split(" ").map((cssClass: string) => CarouselStyles[cssClass]).join(" ") || ""; 
    const formatedClassList = CarouselStyles.carousel + " " + nextClasses;
    useEffect(() => {
        if(carouselReference?.current) {
            const wrapper: HTMLDivElement = carouselReference.current;
            const wrapperParent = wrapper.parentElement;
            if(wrapper && wrapperParent && items) {
                const childWidth = wrapper.querySelector("[class*='card']")?.clientWidth || 500;
                // Space size in pixels between items
                const space = 16;
                // Border width of the cards in pixels
                const border = 10;
                // Setting interval for carousel automation
                const autoSlide = setInterval(() => {
                    if(items && !pause) {
                        // Increments the current index while last card not matched
                        if(currentIndex < items.length - 1) {
                            setCurrentIndex(currentIndex + 1);
                        // Otherwise resets the carousel to the start
                        } else {
                            setCurrentIndex(0);
                        };
                    };
                    if(controls || indicators) {
                        // Enabling the actions if the wrapper width overflows inside of the carousel
                        // But only if at least one of the controls is enabled ( controls or indicators or both )
                        if(wrapper.clientWidth >= wrapperParent.clientWidth) {
                            (controls) ? setCarouselControls(true) : setCarouselControls(false);
                            (indicators) ? setCarouselIndicators(true) : setCarouselIndicators(false);
                        // Disabling the actions if the wrapper width doesn't overflow inside of the carousel
                        // Also keeps the current index to 0 to disable the animation if there's not enough items inside the wrapper to make it overflow
                        } else {
                            (controls) ? setCarouselControls(false) : setCarouselControls(true);
                            (indicators) ? setCarouselIndicators(false) : setCarouselIndicators(true);
                            setCurrentIndex(0);
                        };
                    } else {
                        setCarouselControls(false);
                        setCarouselIndicators(false);
                    };
                }, 2000);
                const getTranslateValue = (): number => {
                    // Handling the carousel's wrapper transition according to the current index and the carousel's responsive design
                    // First condition avoids huge white spaces when screen > 576px and the addition of 2 children width is wider than the carousel
                    // Takes effect when the last carousel item is reached
                    if(currentIndex >= items.length - 1 && (2 * childWidth) > wrapperParent.clientWidth && window.innerWidth > 576) {
                        return wrapper.clientWidth - wrapperParent.clientWidth;
                    // Second condition avoids huge white spaces when screen > 576px and the addition of 2 children width is lower than the carousel
                    // Takes effect when the before last carousel item is reached
                    } else if(currentIndex >= items.length - 2 && (2 * childWidth) < wrapperParent.clientWidth && window.innerWidth > 576) {
                        return wrapper.clientWidth - wrapperParent.clientWidth;
                    // Last condition swipes the carousel items according to the current index whenever the upper conditions are not met
                    } else {
                        return (currentIndex * (childWidth + border)) + (currentIndex * space);
                    };
                };
                wrapper.style.transform = `translateX(-${ getTranslateValue() }px)`;
                return () => {
                    clearInterval(autoSlide);
                };
            };
        };
    }, [ items, controls, indicators, currentIndex, pause ]);
    return <div className={ CarouselStyles.container }>
        <div className={ formatedClassList } data-gradient={ (gradient) ? gradient : "main" }>
            <div className={ CarouselStyles.wrapper } ref={ carouselReference }>
                { (Array.isArray(items)) ? items?.map((item: StartupType | OpportunityType | ArticleType | TestimonialType, key: number) => {
                    switch(itemsType) {
                        case "startups" :
                            return <Fragment key={ key }>
                                <MemoStartupProfileCard { ...item }/>
                            </Fragment>;
                        case "opportunities" :
                            return <Fragment key={ key }>
                                <MemoOpportunityCard { ...item }/>
                            </Fragment>;
                        case "articles" :
                            return <Fragment key={ key }>
                                <MemoArticleCard { ...item }/>
                            </Fragment>;
                        case "testimonials" :
                            return <Fragment key={ key }>
                                <MemoTestimonialCard { ...item }/>
                            </Fragment>;
                    };
                }) : null }
            </div>
        </div>
        <div className={ CarouselStyles.actions }>
            { (carouseControls) ? <div className={ CarouselStyles.controls }>
                <ClassicButton classList="senary circled" action={ moveLeft } icon="fa-solid fa-chevron-left" ariaLabel={ t("carouselPreviousAriaLabel") }/>
                <Tooltip tooltip={ (pause) ? t("carouselResumeTooltip") : t("carouselPauseTooltip") }>
                    <ClassicButton classList="senary circled" action={ handlePause } icon={ `fa-solid ${ (pause) ? "fa-play" : "fa-pause" }` } ariaLabel={ ((pause) ? t("carouselResumeTooltip") : t("carouselPauseTooltip")) + "." }/>
                </Tooltip>
                <ClassicButton classList="senary circled" action={ moveRight } icon="fa-solid fa-chevron-right" ariaLabel={ t("carouselNextAriaLabel") }/>
            </div> : null }
            { (carouseIndicators) ? <div className={ CarouselStyles.navigation }>
                { (Array.isArray(items)) ? items?.map((item: unknown, key: number) => <div key={ key } className={ CarouselStyles[navigation || "bar"] }>
                    <ClassicButton classList="octonary" action={ () => setCurrentIndex(key) } active={ key === currentIndex } ariaLabel={ t("carouselIndicatorAriaLabel", { index: key + 1 }) }/>
                </div>) : null }
            </div> : null }
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
export default DefaultCarousel;