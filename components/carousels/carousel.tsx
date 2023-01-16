/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, Key, useEffect, useState } from "react";
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
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import CarouselStyles from "../../public/stylesheets/components/carousels/Carousel.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Commons */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const handleTransition = (event: any, preciseTarget: any, transform: Number, setTransform: any, touchstart: Number, setTouchstart: any, touchend: Number, setTouchend: any) => {
    const cards = [ ...preciseTarget.children ];
    const offset = (window.innerWidth > 768) ? 450 : 100;
    if(event.type === "wheel") {
        if(event.wheelDelta > 0) {
            (transform < 0) ? setTransform(transform as number + offset) : null;
        } else {
            (transform > (cards.length - 1) * -offset) ? setTransform(transform as number - offset) : null;
        };
    } else {
        (event.type === "touchstart") ? setTouchstart(event.touches[0].clientX) : setTouchend(event.changedTouches[0].clientX);
        if(touchstart > parseInt(touchend as any) + 5) {
            (transform > (cards.length - 1) * -offset) ? setTransform(transform as number - offset) : null;
        } else {
            (transform < 0) ? setTransform(transform as number + offset) : null;
        };
    };
    if(window.innerWidth > 768) {
        cards.forEach((card: HTMLElement) => card.style.transform = "translateX(" + transform + "px)");
    } else {
        cards.forEach((card: HTMLElement, key: Number) => card.style.transform = "translateX(calc(" + transform + "% + " + (-key as number * 16) + "px))");
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Carousel */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Carousel = ({ states, component, data }: any) => {
	const parentProps = { states, data };
    const handleCarousel = (event: any, name: String) => {
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
            carouselItems.forEach((item) => item.style.transform = "translateX(-" + index + "00%)");
        };
    };
    switch(component) {
        case "HowToCreateAnOpportunity":
            return <HowToCreateAnOpportunity { ...parentProps } handler={ handleCarousel }/>;
        case "HowToRegister":
            return <HowToRegister { ...parentProps } handler={ handleCarousel }/>;
        case "HowToApplyToAnOpportunity":
            return <HowToApplyToAnOpportunity { ...parentProps } handler={ handleCarousel }/>;
        case "HowToGetStarted":
            return <HowToGetStarted { ...parentProps } handler={ handleCarousel }/>;
        case "TheLatestOpportunities":
            return <TheLatestOpportunities { ...parentProps } handler={ handleCarousel }/>;
        case "CompaniesLogos":
            return <CompaniesLogos { ...parentProps } handler={ handleCarousel }/>;
        case "PartnersStartups":
            return <PartnersStartups { ...parentProps } handler={ handleCarousel }/>
        case "AnswersToYourQuestions":
            return <AnswersToYourQuestions { ...parentProps } handler={ handleCarousel }/>;
        default :
            return <></>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( How To Create An Opportunity ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const HowToCreateAnOpportunity = ({ states, handler }: any) => {
	const { translations }: any = states;
    const opportunityCreationStepsButtons = [
		translations["Démarrez"],
		translations["Complétez"],
		translations["Diffusez"],
		translations["Profitez"]
	];
	const buttonProps = [ "type", "action", "text" ];
    return <>
        <div className={ CarouselStyles.steps }>
            { opportunityCreationStepsButtons.map((button: any, key: number) => {
                const stepButtonValues = [ ButtonStyles.callToActionStep, (event: MouseEvent) => handler(event, "HowToCreateAnOpportunity"), button ];
                const stepButtonObject = buildProperties(buttonProps, stepButtonValues);
                return <Fragment key={ key }>
                    <div className="separator"></div>
                    <Button { ...stepButtonObject as ButtonInterface } index={ key }/>
                </Fragment>;
            }) }
            <div className="separator"></div>
        </div>
        <div className={ CarouselStyles.container } data-carousel="HowToCreateAnOpportunity">
            { opportunityCreationStepsButtons.map((step: any, key: number) => {
                return <div key={ key } className={ CarouselStyles.item } data-index={ key }>
                    { step }
                </div>;
            }) }
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( How To Register ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const HowToRegister = ({ states, handler }: any) => {
	const { translations }: any = states;
    const opportunityCreationStepsButtons = [
		translations["Complétez"],
		translations["Validez"],
		translations["Créez"],
		translations["Profitez"]
	];
	const buttonProps = [ "type", "action", "text" ];
    return <>
        <div className={ CarouselStyles.steps }>
            { opportunityCreationStepsButtons.map((button: any, key: number) => {
                const stepButtonValues = [ ButtonStyles.callToActionStep, (event: MouseEvent) => handler(event, "HowToCreateAnOpportunity"), button ];
                const stepButtonObject = buildProperties(buttonProps, stepButtonValues);
                return <Fragment key={ key }>
                    <div className="separator"></div>
                    <Button { ...stepButtonObject as ButtonInterface } index={ key }/>
                </Fragment>;
            }) }
            <div className="separator"></div>
        </div>
        <div className={ CarouselStyles.container } data-carousel="HowToCreateAnOpportunity">
            { opportunityCreationStepsButtons.map((step: any, key: number) => {
                return <div key={ key } className={ CarouselStyles.item } data-index={ key }>
                    { step }
                </div>;
            }) }
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( How To Apply To An Opportunity ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const HowToApplyToAnOpportunity = ({ states }: any) => {
	// const { translations }: any = states;
    const opportunityCreationStepsButtons = [ "", "", "" ];
    return <>
        <div className={ CarouselStyles.steps } data-direction="vertical">
            { opportunityCreationStepsButtons.map((button: any, key: number) => <Fragment key={ key }>
                <div className="separatorVertical"></div>
                <button>
                    <i className={ (key === opportunityCreationStepsButtons.length - 1) ? "fa-light fa-check" : "fa-light fa-chevron-down" }/>
                </button>
            </Fragment>) }
        </div>
        <div className={ CarouselStyles.container } data-direction="vertical" data-carousel="HowToApplyToAnOpportunity">
            { opportunityCreationStepsButtons.map((step: any, key: number) => <div key={ key } className={ CarouselStyles.item } data-index={ key }>
                { (key % 2 === 0) ? <div>Text</div> : <div>Picture</div> }
                { (key % 2 === 0) ? <div>Picture</div> : <div>Text</div> }
            </div>) }
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( How To Get Started ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const HowToGetStarted = ({ states }: any) => {
	// const { translations }: any = states;
    const opportunityCreationStepsButtons = [ "", "", "" ];
    return <>
        <div className={ CarouselStyles.steps } data-direction="vertical">
            { opportunityCreationStepsButtons.map((button: any, key: number) => <Fragment key={ key }>
                <div className="separatorVertical"></div>
                <button>
                    <i className={ (key === opportunityCreationStepsButtons.length - 1) ? "fa-light fa-check" : "fa-light fa-chevron-down" }/>
                </button>
            </Fragment>) }
        </div>
        <div className={ CarouselStyles.container } data-direction="vertical" data-carousel="HowToApplyToAnOpportunity">
            { opportunityCreationStepsButtons.map((step: any, key: number) => <div key={ key } className={ CarouselStyles.item } data-index={ key }>
                { (key % 2 === 0) ? <div>Text</div> : <div>Picture</div> }
                { (key % 2 === 0) ? <div>Picture</div> : <div>Text</div> }
            </div>) }
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( The Latest Opportunities ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const TheLatestOpportunities = ({ states, data }: any) => {
	const { translations }: any = states;
    const [ transform, setTransform ] = useState(0);
    const [ touchstart, setTouchstart ] = useState(0);
    const [ touchend, setTouchend ] = useState(0);
    const scrollHandler = (event: any) => {
        event.preventDefault();
        const target = event.target;
        const preciseTarget = target.closest("." + CarouselStyles.container);
        return handleTransition(event, preciseTarget, transform, setTransform, touchstart, setTouchstart, touchend, setTouchend);
    };
    useEffect(() => {
        let carousel = document.querySelector("[class*='opportunity'] > div > ." + CarouselStyles.container);
        (carousel) ? bindEventListeners(carousel as HTMLElement, [ "wheel", "touchstart", "touchend" ], scrollHandler) : null;
        return () => removeEventListeners(carousel as HTMLElement, [ "wheel", "touchstart", "touchend" ], scrollHandler) as any;
    });
    return <>
        <div className={ CarouselStyles.container }>
            { data.map((opportunity: any, key: KeyType) => {
                const index = key + 1;
                const maxVisibleByDefault = undefined;
                const cardProps = { opportunity, index, maxVisibleByDefault, translations };
                return <OpportunityCard key={ key } { ...cardProps }/>;
            }) }
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( Companies Logos ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const CompaniesLogos = ({ data, states }: any) => {
    return <div className={ CarouselStyles.infinite }>
        <div className={ CarouselStyles.firstCopy }>
            { data.map(({ id, type, name, logo }: any, key: KeyType) => {
                type = (type.match(/(entreprise)/i)) ? "corporation" : type;
                type = (type.match(/(partenaire)/i)) ? "partner" : type;
                if(parseInt(key) < 14) {
                    const url = "/directories/" + type.toLowerCase() + "s/" + formatNameForUrl(name) + "_" + id;
                    return <Link key={ key } href={ url } className={ CarouselStyles.logo } data-type="tooltip" data-tooltip={ name }>
                        <Image src={ logo } alt={ name + " logo." } width="100" height="100"/>
                    </Link>;
                };
            }) }
        </div>
        <div className={ CarouselStyles.secondCopy }>
            { data.map(({ id, type, name, logo }: any, key: KeyType) => {
                type = (type.match(/(entreprise)/i)) ? "corporation" : type;
                type = (type.match(/(partenaire)/i)) ? "partner" : type;
                if(parseInt(key) < 14) {
                    const url = "/directories/" + type.toLowerCase() + "s/" + formatNameForUrl(name) + "_" + id;
                    return <Link key={ key } href={ url } className={ CarouselStyles.logo } data-type="tooltip" data-tooltip={ name }>
                        <Image src={ logo } alt={ name + " logo." } width="100" height="100"/>
                    </Link>;
                };
            }) }
        </div>
    </div>
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( Partners Startups ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const PartnersStartups = ({ states, data }: any) => {
    const [ transform, setTransform ] = useState(0);
    const [ touchstart, setTouchstart ] = useState(0);
    const [ touchend, setTouchend ] = useState(0);
    const scrollHandler = (event: any) => {
        event.preventDefault();
        const target = event.target;
        const preciseTarget = target.closest("." + CarouselStyles.container);
        return handleTransition(event, preciseTarget, transform, setTransform, touchstart, setTouchstart, touchend, setTouchend);
    };
    useEffect(() => {
        let carousel = document.querySelector("[class*='startups'] > div > ." + CarouselStyles.container);
        (carousel) ? bindEventListeners(carousel as HTMLElement, [ "wheel", "touchstart", "touchend" ], scrollHandler) : null;
        return () => removeEventListeners(carousel as HTMLElement, [ "wheel", "touchstart", "touchend" ], scrollHandler) as any;
    });
    return <>
        <div className={ CarouselStyles.container }>
            { data.map((startup: any, key: KeyType) => {
                const type = "startup";
                const profile = startup;
                const page = "landing";
                const cardProps = { type, profile, states, page };
                const url = "/directories/" + type.toLowerCase() + "s/" + formatNameForUrl(startup.NAME) + "_" + startup.ID;
                return <Link key={ key } href={ url } data-card="profile">
                    <ProfileCard { ...cardProps }/>
                </Link>;
            }) }
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( Answers To Your Questions ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const AnswersToYourQuestions = ({ states, handler, data }: any) => {
	const { translations }: any = states;
	const questionsButtons = [
		translations["Général"],
		translations["La communauté Forinov"]
	];
	const buttonProps = [ "type", "action", "text" ];
    return <>
        <div className={ CarouselStyles.actions }>
            { questionsButtons.map((button: any, key: number) => {
                const stepButtonValues = [ ButtonStyles.callToActionStep, (event: MouseEvent) => handler(event, "AnswersToYourQuestions"), button ];
                const stepButtonObject = buildProperties(buttonProps, stepButtonValues);
                return <Button key={ key } { ...stepButtonObject as ButtonInterface } index={ key }/>;
            }) }
        </div>
        <div className={ CarouselStyles.container } data-carousel="AnswersToYourQuestions">
            { (data) ? data.map((accordion: any, key: KeyType) => <div key={ key } className={ CarouselStyles.item }>
                <Accordion data={ accordion } translations={ translations }/>
            </div>) : null }
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Carousel;