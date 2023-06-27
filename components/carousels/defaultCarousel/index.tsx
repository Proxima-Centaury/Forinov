/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation } from "next-i18next";
import { memo, useRef, useState, useEffect, Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ClassicButton from "@actions/classicButton";
import StartupProfileCard from "@cards/profiles/startup";
import OpportunityCard from "@cards/opportunity";
import Tooltip from "@tooltips/tooltip";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { MouseEventHandler } from "react";
import type { TCarousel } from "@typescript/types/TCarousel";
import type { TStartup } from "@typescript/types/TStartup";
import type { TOpportunity } from "@typescript/types/TOpportunity";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CarouselStyles from "@carousels/Carousel.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Memorization */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const MemoStartupProfileCard = memo(StartupProfileCard);
const MemoOpportunityCard = memo(OpportunityCard);
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Default Carousel */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const DefaultCarousel = (params: TCarousel): JSX.Element => {
    const carouselReference = useRef(null);
	const { t } = useTranslation("common");
    const { classList, items, itemsType, navigation } = params;
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const [ pause, setPause ] = useState(false);
    const moveLeft: MouseEventHandler = () => (items) ? setCurrentIndex((currentIndex > 0) ? currentIndex - 1 : items.length - 1) : false;
    const moveRight: MouseEventHandler = () => (items) ? setCurrentIndex((currentIndex < items.length - 1) ? currentIndex + 1 : 0) : false;
    const handlePause: MouseEventHandler = () => setPause(!pause);
    const nextClasses = classList?.split(" ").map((cssClass: string) => CarouselStyles[cssClass]).join(" ") || ""; 
    const formatedClassList = CarouselStyles.carousel + " " + nextClasses;
    useEffect(() => {
        if(items && carouselReference?.current) {
            const wrapper: HTMLDivElement = carouselReference.current;
            const childWidth = wrapper.querySelector("[class*='card']")?.clientWidth || 550;
            const space = 16; // Wrapper's paddings
            const border = 10; // Border width of the cards
            const autoSlide = setInterval(() => { // Setting interval for carousel automation
                if(items && !pause) {
                    if(currentIndex < items.length - 1) { // Increments the current index while last card not matched
                        setCurrentIndex(currentIndex + 1);
                    } else { // Otherwise resets the carousel to the start
                        setCurrentIndex(0);
                    };
                };
            }, 1000);
            wrapper.style.transform = `translateX(calc(-${ currentIndex * (childWidth + border) }px - ${ currentIndex * space }px))`;
            return () => {
                clearInterval(autoSlide);
            };
        };
    }, [ items, currentIndex, pause ]);
    return <div className={ CarouselStyles.container }>
        <div className={ formatedClassList }>
            <ClassicButton classList="sinary circled" action={ moveLeft } icon="fa-solid fa-chevron-left"/>
            <div className={ CarouselStyles.wrapper } ref={ carouselReference }>
                { (items) ? items.map((item: TStartup|TOpportunity, key: number) => {
                    switch(itemsType) {
                        case "startups" :
                            return <Fragment key={ key }>
                                <MemoStartupProfileCard { ...item }/>
                            </Fragment>;
                        case "opportunities" :
                            return <Fragment key={ key }>
                                <MemoOpportunityCard { ...item }/>
                            </Fragment>;
                    };
                }) : null }
            </div>
            <ClassicButton classList="sinary circled" action={ moveRight } icon="fa-solid fa-chevron-right"/>
            <div className={ CarouselStyles.actions }>
                <Tooltip tooltip={ (pause) ? t("carouselResumeTooltip") : t("carouselPauseTooltip") }>
                    <ClassicButton classList="sinary circled" action={ handlePause } icon={ `fa-solid ${ (pause) ? "fa-play" : "fa-pause" }` }/>
                </Tooltip>
            </div>
        </div>
        { (navigation) ? <div className={ CarouselStyles.navigation }>
            { (items) ? items?.map((item: unknown, key: number) => <div key={ key } className={ CarouselStyles[navigation] }>
                <ClassicButton classList="octary" action={ () => setCurrentIndex(key) } active={ key === currentIndex }/>
            </div>) : null }
        </div> : null }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default DefaultCarousel;