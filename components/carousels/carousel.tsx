/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, useEffect } from "react";
import { ButtonInterface } from "../../typescript/interfaces";
import { buildProperties, formatNameForUrl, bindEventListeners, removeEventListeners } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
import Button from "../../components/buttons/button";
import OpportunityCard from "../cards/opportunity";
import ProfileCard from "../cards/profile";
import Accordion from "../accordions/accordion";
import Format from "../texts/format";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import CarouselStyles from "../../public/stylesheets/components/carousels/Carousel.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Commons */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
class Transition {
    transform: number;
    transformArrows: number;
    constructor() {
        this.transform = 0;
        this.transformArrows = 0;
    };
    handleTransition = (event: any, preciseTarget: any) => {
        const itemWidth = 420;
        const container = preciseTarget.querySelector("." + CarouselStyles.container);
        const cards = [ ...container.children ];
        const limit = ((cards.length - 1) * itemWidth) * -1;
        if(window.innerWidth > 576) {
            if(event.wheelDelta > 0) {
                this.transform = (this.transform < 0) ? this.transform + itemWidth + 16 : this.transform;
            } else {
                this.transform = (this.transform > limit) ? this.transform - itemWidth - 16 : this.transform;
            };
        };
        container.style.transform = "translateX(" + this.transform + "px)";
        return true;
    };
    handleTransitionWithSteps = (event: any, name: String) => {
        const target = event.target.closest("button");
        const container = target.parentElement;
        const buttons = (container) ? Array.from(container.children).map((button) => button as HTMLElement) : [];
        if(buttons.length > 0) {
            buttons.forEach((button) => button.classList.remove(ButtonStyles.active));
        };
        target.classList.add(ButtonStyles.active);
        const carousel = document.querySelector("[data-carousel='" + name + "']");
        const index = parseInt(target.getAttribute("data-index"));
        const carouselItems = (carousel) ? Array.from(carousel.children).map((item) => item as HTMLElement) : [];
        if(carouselItems.length > 0) {
            return carouselItems.forEach((item) => item.style.transform = "translateX(-" + index + "00%)");
        };
        return false;
    };
    handleTransitionWithArrows = (event: any, direction: String) => {
        const target = event.target.closest("button");
        const preciseTarget = target.closest("." + CarouselStyles.carousel);
        const itemWidth = 100;
        const container = preciseTarget.querySelector("." + CarouselStyles.container);
        const cards = [ ...container.children ];
        const limit = ((cards.length - 1) * itemWidth) * -1;
        if(direction === "left") {
            this.transform = (this.transform < 0) ? this.transform + itemWidth : this.transform;
        } else {
            this.transform = (this.transform > limit) ? this.transform - itemWidth : this.transform;
        };
        container.style.transform = "translateX(calc(" + this.transform + "% + " + ((this.transform / 100) * 16) + "px))";
        return true;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Carousel */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Carousel = (pageProps: any) => {
    const { component }: any = pageProps;
    switch(component) {
        case "LatestStartups":
            return <ClassicHorizontal { ...pageProps }/>;
        case "LatestOpportunities":
            return <ClassicHorizontal { ...pageProps }/>;
        case "CompaniesLogos":
            return <InfiniteScrollHorizontal { ...pageProps }/>;
        case "HowToGetStarted":
            return <CustomVertical { ...pageProps }/>;
        case "HowToCreateOpportunity":
            return <CustomVertical { ...pageProps }/>;
        case "StartupAccordions":
            return <AccordionsHorizontal { ...pageProps }/>;
        case "CorporationAccordions":
            return <AccordionsHorizontal { ...pageProps }/>;
        case "PartnerAccordions":
            return <AccordionsHorizontal { ...pageProps }/>;
        case "OpportunityAccordions":
            return <AccordionsHorizontal { ...pageProps }/>;
        case "CorporationHowTo":
            return <StepsCarousel { ...pageProps }/>;
        case "PartnerHowTo":
            return <StepsCarousel { ...pageProps }/>;
        default :
            return <Fragment></Fragment>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Steps Carousel */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const StepsCarousel = (pageProps: any) => {
    const { states, component, carouselsConfigurations, router }: any = pageProps;
	const { translations }: any = states;
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithSteps;
    const steps: Array<any> = carouselsConfigurations[component];
	const buttonProps = [ "type", "action", "text" ];
    useEffect(() => {
        let handleStepButtonsTitle = () => {
            const stepButtons = document.querySelectorAll("." + CarouselStyles.steps + "[data-carousel='" + component + "Steps'] button") || [];
            if(stepButtons.length > 0) {
                stepButtons.forEach((button, key) => {
                    const typedButton = button as HTMLElement;
                    const stepTitle = (window.innerWidth < 992) ? key + 1 : (key + 1) + ". " + steps[key].title;
                    typedButton.innerText = stepTitle.toString();
                });
            };
        };
        handleStepButtonsTitle();
        window.addEventListener("resize", handleStepButtonsTitle);
        return () => window.removeEventListener("resize", handleStepButtonsTitle);
    });
    return <div className={ CarouselStyles.carousel } data-direction="bidirectional">
        <div className={ CarouselStyles.steps } data-carousel={ component + "Steps" }>
            { steps.map((button: any, key: number) => {
                const stepButtonValues = [ ButtonStyles.callToActionStep, (event: MouseEvent) => transitionHandler(event, component), button.title ];
                const stepButtonObject = buildProperties(buttonProps, stepButtonValues);
                return <Fragment key={ key }>
                    <div className="separator"></div>
                    <Button { ...stepButtonObject as ButtonInterface } index={ key }/>
                </Fragment>;
            }) }
            <div className="separator"></div>
        </div>
        <div className={ CarouselStyles.container } data-carousel={ component }>
            { steps.map((step: any, key: number) => {
                return <div key={ key } className={ CarouselStyles.itemFullWidth } data-index={ key }>
                    <div className={ CarouselStyles.stepContent }>
                        <h4>{ (key + 1) + ". " + translations[step.title] }</h4>
                        <ul>
                            { step.list.map((item: String, key: KeyType) => <li key={ key }>
                                <div><i className="fa-light fa-arrow-right"/><Format content={ translations[item as keyof Object] }/></div>
                            </li>) }
                        </ul>
                    </div>
                    <div className={ CarouselStyles.stepPicture }>
                        <Image src={ router.basePath + step.picture } alt={ translations[step.title] } width="3840" height="2160"/>
                    </div>
                </div>;
            }) }
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Custom Vertical */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const CustomVertical = (pageProps: any) => {
    const { states, carouselsConfigurations, router, component }: any = pageProps;
	const { translations }: any = states;
    const steps: Array<any> = carouselsConfigurations[component];
    return <div className={ CarouselStyles.carousel } data-direction="vertical">
        <div className={ CarouselStyles.steps }>
            { steps.map((button: any, key: number) => <Fragment key={ key }>
                <div className="separatorVertical"></div>
                <button className={ (key === steps.length - 1) ? "active" : "" }>
                    <i className={ (key === steps.length - 1) ? "fa-light fa-check" : "fa-light fa-chevron-down" }/>
                </button>
            </Fragment>) }
        </div>
        <div className={ CarouselStyles.container } data-carousel={ component }>
            { steps.map((step: any, key: number) => <div key={ key } className={ CarouselStyles.itemFullWidth } data-index={ key }>
                { (key % 2 === 1) ? <div className={ CarouselStyles.verticalContent }>
                    <h4>{  (key + 1) + ". " + translations[step.title] }</h4>
                    <Format content={ translations[step.text] }/>
                </div> : <div className={ CarouselStyles.verticalPicture }>
                    <Image src={ router.basePath + step.picture } alt={ translations[step.title] } width="3840" height="2160"/>
                </div> }
                { (key % 2 === 1) ? <div className={ CarouselStyles.verticalPicture }>
                    <Image src={ router.basePath + step.picture } alt={ translations[step.title] } width="3840" height="2160"/>
                </div> : <div className={ CarouselStyles.verticalContent }>
                    <h4>{  (key + 1) + ". " + translations[step.title] }</h4>
                    <Format content={ translations[step.text] }/>
                </div> }
            </div>) }
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Classic Horizontal */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ClassicHorizontal = (pageProps: any) => {
    const { states, component, data, router }: any = pageProps;
	const { translations, RGB }: any = states;
    const { type }: any = router.query;
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithArrows;
    const buttonProps = [ "type", "faIcon", "faIconClass", "action" ];
    const leftButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-arrow-left", (event: MouseEvent) => transitionHandler(event, "left") ];
    const leftButtonObject = buildProperties(buttonProps, leftButtonValues);
    const rightButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-arrow-right", (event: MouseEvent) => transitionHandler(event, "right") ];
    const rightButtonObject = buildProperties(buttonProps, rightButtonValues);
    const scrollHandler = (event: any) => {
        if(window.innerWidth > 576) {
            event.preventDefault();
        };
        const target = event.target;
        const preciseTarget = target.closest("." + CarouselStyles.carousel);
        return transitionInstance.handleTransition(event, preciseTarget);
    };
    useEffect(() => {
        let carousel = document.querySelector("[data-carousel='" + component + "']." + CarouselStyles.carousel);
        (carousel) ? bindEventListeners(carousel as HTMLElement, [ "wheel" ], scrollHandler) : null;
        return () => removeEventListeners(carousel as HTMLElement, [ "wheel" ], scrollHandler) as any;
    });
    const Items = () => {
        switch(component) {
            case "LatestStartups":
                return data.map((startup: any, key: KeyType) => {
                    const url = "/directories/" + type + "/categories/" + formatNameForUrl(startup.CATEGORY[0].NAME) + "_" + startup.CATEGORY[0].ID + "/" + formatNameForUrl(startup.NAME) + "_" + startup.ID;
                    return <Link key={ key } className={ CarouselStyles.item } href={ url } data-card="profile">
                        <ProfileCard { ...pageProps } profile={ startup } definedType="startup" page="landing"/>
                    </Link>;
                });
            case "LatestOpportunities":
                return data.map((opportunity: any, key: KeyType) => {
                    const index = key + 1;
                    const maxVisibleByDefault = undefined;
                    const cardProps = { opportunity, index, maxVisibleByDefault, translations, RGB };
                    return <div key={ key } className={ CarouselStyles.item }>
                        <OpportunityCard { ...cardProps }/>
                    </div>;
                });
            default:
                return <div></div>;
        };
    };
    return <Fragment>
        <div className={ CarouselStyles.carousel } data-carousel={ component }>
            <div className={ CarouselStyles.arrows }>
                <Button { ...leftButtonObject as ButtonInterface }/>
                <Button { ...rightButtonObject as ButtonInterface }/>
            </div>
            <div className={ CarouselStyles.container }>
                <Items/>
            </div>
        </div>
    </Fragment>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Infinite Scroll Horizontal */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const InfiniteScrollHorizontal = ({ component, data }: any) => {
    const Items = () => {
        switch(component) {
            case "CompaniesLogos":
                return data.map(({ id, type, name, logo }: any, key: KeyType) => {
                    type = (type.match(/(entreprise)/i)) ? "corporation" : type;
                    type = (type.match(/(partenaire)/i)) ? "partner" : type;
                    if(parseInt(key) < 14) {
                        const url = "/directories/" + type.toLowerCase() + "s/" + formatNameForUrl(name) + "_" + id;
                        return <Link key={ key } href={ url } className={ CarouselStyles.logo } data-type="tooltip" data-tooltip={ name }>
                            <Image src={ logo } alt={ name + " logo." } width="100" height="100"/>
                        </Link>;
                    };
                });
            default:
                return <div></div>;
        };
    };
    return <div className={ CarouselStyles.infinite }>
        <div className={ CarouselStyles.firstCopy }>
            <Items/>
        </div>
        <div className={ CarouselStyles.secondCopy }>
            <Items/>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Accordions Horizontal */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const AccordionsHorizontal = ({ states, component, data }: any) => {
	const { translations }: any = states;
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithSteps;
    const buttonProps = [ "type", "action", "text" ];
    const questionsButtons = [
        translations["Général"],
        translations["La communauté Forinov"]
    ];
    return <div className={ CarouselStyles.carousel } data-direction="bidirectional">
        <div className={ CarouselStyles.actions }>
            { questionsButtons.map((button: any, key: number) => {
                const stepButtonValues = [ ButtonStyles.callToActionStep, (event: MouseEvent) => transitionHandler(event, component), button ];
                const stepButtonObject = buildProperties(buttonProps, stepButtonValues);
                return <Button key={ key } { ...stepButtonObject as ButtonInterface } index={ key }/>;
            }) }
        </div>
        <div className={ CarouselStyles.container } data-carousel={ component }>
            { (data) ? data.map((accordion: any, key: KeyType) => <div key={ key } className={ CarouselStyles.itemFullWidth }>
                <Accordion data={ accordion } translations={ translations }/>
            </div>) : null }
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Carousel;