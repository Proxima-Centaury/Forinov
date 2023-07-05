/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation } from "next-i18next";
import { memo, useRef, useState, useEffect, Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ClassicButton from "@buttons/classicButton";
import StartupProfileCard from "@cards/profiles/startupCard";
import OpportunityCard from "@cards/opportunityCard";
import ArticleCard from "@cards/articleCard";
import TestimonialCard from "@cards/testimonialCard";
import Tooltip from "@tooltips/defaultTooltip";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { MouseEventHandler } from "react";
import type { TCarousel } from "@typescript/types/TCarousel";
import type { TStartup } from "@typescript/types/TStartup";
import type { TOpportunity } from "@typescript/types/TOpportunity";
import type { TArticle } from "@typescript/types/TArticle";
import type { TTestimonial } from "@typescript/types/TTestimonial";
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
const DefaultCarousel = (params: TCarousel): JSX.Element => {
    const carouselReference = useRef(null);
	const { t } = useTranslation("common");
    const { classList, items, itemsType, navigation } = params;
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ pause, setPause ] = useState(false);
    const [ actions, setActions ] = useState(true);
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
                const childWidth = wrapper.querySelector("[class*='card']")?.clientWidth || 550;
                const space = 16; // Space size in pixels between items
                const border = 10; // Border width of the cards in pixels
                const autoSlide = setInterval(() => { // Setting interval for carousel automation
                    if(items && !pause) {
                        if(currentIndex < items.length - 1) { // Increments the current index while last card not matched
                            setCurrentIndex(currentIndex + 1);
                        } else { // Otherwise resets the carousel to the start
                            setCurrentIndex(0);
                        };
                    };
                    if(wrapper.clientWidth >= wrapperParent.clientWidth) {
                        setActions(true);
                    } else {
                        setActions(false);
                        setCurrentIndex(0);
                    };
                }, 2000);
                wrapper.style.transform = `translateX(calc(-${ currentIndex * (childWidth + border) }px - ${ currentIndex * space }px))`;
                return () => {
                    clearInterval(autoSlide);
                };
            };
        };
    }, [ items, currentIndex, pause ]);
    return <div className={ CarouselStyles.container }>
        <div className={ formatedClassList }>
            <div className={ CarouselStyles.wrapper } ref={ carouselReference }>
                { (items) ? items.map((item: TStartup|TOpportunity|TArticle|TTestimonial, key: number) => {
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
        { (actions) ? <div className={ CarouselStyles.actions }>
            <div className={ CarouselStyles.controls }>
                <ClassicButton classList="sinary circled" action={ moveLeft } icon="fa-solid fa-chevron-left"/>
                <Tooltip tooltip={ (pause) ? t("carouselResumeTooltip") : t("carouselPauseTooltip") }>
                    <ClassicButton classList="sinary circled" action={ handlePause } icon={ `fa-solid ${ (pause) ? "fa-play" : "fa-pause" }` }/>
                </Tooltip>
                <ClassicButton classList="sinary circled" action={ moveRight } icon="fa-solid fa-chevron-right"/>
            </div>
            <div className={ CarouselStyles.navigation }>
                { (items) ? items?.map((item: unknown, key: number) => <div key={ key } className={ CarouselStyles[navigation || "bar"] }>
                    <ClassicButton classList="octary" action={ () => setCurrentIndex(key) } active={ key === currentIndex }/>
                </div>) : null }
            </div>
        </div> : null }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default DefaultCarousel;