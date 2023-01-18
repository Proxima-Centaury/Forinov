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
class Transition {
    transform: number;
    transformArrows: number;
    constructor() {
        this.transform = 0;
        this.transformArrows = 0;
    };
    handleTransition = (event: any, preciseTarget: any) => {
        if(window.innerWidth > 576) {
            const containerWidth = preciseTarget.offsetWidth;
            const cards = [ ...preciseTarget.querySelectorAll("a") ];
            const offset = 466;
            const limit = ((cards.length - 1) * -offset) + (containerWidth / 2);
            if(event.wheelDelta > 0) {
                this.transform = (this.transform < 0) ? this.transform + offset : this.transform;
            } else {
                this.transform = (this.transform > limit) ? this.transform - offset : this.transform;
            };
            return cards.forEach((card: HTMLElement) => card.style.transform = "translateX(" + this.transform + "px)");
        };
        return false;
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
        const preciseTarget = target.closest("." + CarouselStyles.container);
        const cards = [ ...preciseTarget.querySelectorAll("a") ];
        const offset = 100;
        if(direction === "left") {
            this.transformArrows = (this.transformArrows < 0) ? this.transformArrows + offset : this.transformArrows;
        } else {
            this.transformArrows = (this.transformArrows > (cards.length - 1) * -offset) ? this.transformArrows - offset : this.transformArrows;
        };
        return cards.forEach((card: HTMLElement, key: number) => card.style.transform = "translateX(calc(" + this.transformArrows + "% + " + (key * -16) + "px)");
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Carousel */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Carousel = ({ states, component, data }: any) => {
	const parentProps = { states, data };
    switch(component) {
        case "HowToCreateAnOpportunity":
            return <HowToCreateAnOpportunity { ...parentProps }/>;
        case "HowToRegister":
            return <HowToRegister { ...parentProps }/>;
        case "HowToApplyToAnOpportunity":
            return <HowToApplyToAnOpportunity/>;
        case "HowToGetStarted":
            return <HowToGetStarted/>;
        case "TheLatestOpportunities":
            return <TheLatestOpportunities { ...parentProps }/>;
        case "CompaniesLogos":
            return <CompaniesLogos { ...parentProps }/>;
        case "PartnersStartups":
            return <PartnersStartups { ...parentProps }/>
        case "AnswersToYourQuestions":
            return <AnswersToYourQuestions { ...parentProps }/>;
        default :
            return <Fragment></Fragment>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( How To Create An Opportunity ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const HowToCreateAnOpportunity = ({ states }: any) => {
	const { translations }: any = states;
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithSteps;
    const opportunityCreationStepsButtons = [
		translations["Démarrez"],
		translations["Complétez"],
		translations["Diffusez"],
		translations["Profitez"]
	];
	const buttonProps = [ "type", "action", "text" ];
    return <Fragment>
        <div className={ CarouselStyles.steps }>
            { opportunityCreationStepsButtons.map((button: any, key: number) => {
                const stepButtonValues = [ ButtonStyles.callToActionStep, (event: MouseEvent) => transitionHandler(event, "HowToCreateAnOpportunity"), button ];
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
    </Fragment>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( How To Register ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const HowToRegister = ({ states }: any) => {
	const { translations }: any = states;
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithSteps;
    const opportunityCreationStepsButtons = [
		translations["Complétez"],
		translations["Validez"],
		translations["Créez"],
		translations["Profitez"]
	];
	const buttonProps = [ "type", "action", "text" ];
    return <Fragment>
        <div className={ CarouselStyles.steps }>
            { opportunityCreationStepsButtons.map((button: any, key: number) => {
                const stepButtonValues = [ ButtonStyles.callToActionStep, (event: MouseEvent) => transitionHandler(event, "HowToCreateAnOpportunity"), button ];
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
    </Fragment>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( How To Apply To An Opportunity ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const HowToApplyToAnOpportunity = () => {
    const opportunityCreationStepsButtons = [ "", "", "" ];
    return <Fragment>
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
    </Fragment>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( How To Get Started ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const HowToGetStarted = () => {
    const opportunityCreationStepsButtons = [ "", "", "" ];
    return <Fragment>
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
    </Fragment>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( The Latest Opportunities ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const TheLatestOpportunities = ({ states, data }: any) => {
	const { translations }: any = states;
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithArrows;
    const buttonProps = [ "type", "faIcon", "faIconClass", "action" ];
    const leftButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-arrow-left", (event: MouseEvent) => transitionHandler(event, "left") ];
    const leftButtonObject = buildProperties(buttonProps, leftButtonValues);
    const rightButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-arrow-right", (event: MouseEvent) => transitionHandler(event, "right") ];
    const rightButtonObject = buildProperties(buttonProps, rightButtonValues);
    const scrollHandler = (event: any) => {
        event.preventDefault();
        const target = event.target;
        const preciseTarget = target.closest("." + CarouselStyles.container);
        return transitionInstance.handleTransition(event, preciseTarget);
    };
    useEffect(() => {
        let carousel = document.querySelector("[class*='opportunity'] > div > ." + CarouselStyles.container);
        (carousel) ? bindEventListeners(carousel as HTMLElement, [ "wheel" ], scrollHandler) : null;
        return () => removeEventListeners(carousel as HTMLElement, [ "wheel" ], scrollHandler) as any;
    });
    return <Fragment>
        <div className={ CarouselStyles.container }>
            <div className={ CarouselStyles.arrows }>
                <Button { ...leftButtonObject as ButtonInterface }/>
                <Button { ...rightButtonObject as ButtonInterface }/>
            </div>
            { data.map((opportunity: any, key: KeyType) => {
                const index = key + 1;
                const maxVisibleByDefault = undefined;
                const cardProps = { opportunity, index, maxVisibleByDefault, translations };
                return <OpportunityCard key={ key } { ...cardProps }/>;
            }) }
        </div>
    </Fragment>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( Companies Logos ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const CompaniesLogos = ({ data }: any) => {
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
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( Partners Startups ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const PartnersStartups = ({ states, data }: any) => {
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithArrows;
    const buttonProps = [ "type", "faIcon", "faIconClass", "action" ];
    const leftButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-arrow-left", (event: MouseEvent) => transitionHandler(event, "left") ];
    const leftButtonObject = buildProperties(buttonProps, leftButtonValues);
    const rightButtonValues = [ ButtonStyles.callToActionRoundedIcon, true, "fa-light fa-arrow-right", (event: MouseEvent) => transitionHandler(event, "right") ];
    const rightButtonObject = buildProperties(buttonProps, rightButtonValues);
    const scrollHandler = (event: any) => {
        event.preventDefault();
        const target = event.target;
        const preciseTarget = target.closest("." + CarouselStyles.container);
        return transitionInstance.handleTransition(event, preciseTarget);
    };
    useEffect(() => {
        let carousel = document.querySelector("[class*='startups'] > div > ." + CarouselStyles.container);
        (carousel) ? bindEventListeners(carousel as HTMLElement, [ "wheel" ], scrollHandler) : null;
        return () => removeEventListeners(carousel as HTMLElement, [ "wheel" ], scrollHandler) as any;
    });
    return <Fragment>
        <div className={ CarouselStyles.container }>
            <div className={ CarouselStyles.arrows }>
                <Button { ...leftButtonObject as ButtonInterface }/>
                <Button { ...rightButtonObject as ButtonInterface }/>
            </div>
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
    </Fragment>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( Answers To Your Questions ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const AnswersToYourQuestions = ({ states, data }: any) => {
	const { translations }: any = states;
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithSteps;
	const questionsButtons = [
		translations["Général"],
		translations["La communauté Forinov"]
	];
	const buttonProps = [ "type", "action", "text" ];
    return <Fragment>
        <div className={ CarouselStyles.actions }>
            { questionsButtons.map((button: any, key: number) => {
                const stepButtonValues = [ ButtonStyles.callToActionStep, (event: MouseEvent) => transitionHandler(event, "AnswersToYourQuestions"), button ];
                const stepButtonObject = buildProperties(buttonProps, stepButtonValues);
                return <Button key={ key } { ...stepButtonObject as ButtonInterface } index={ key }/>;
            }) }
        </div>
        <div className={ CarouselStyles.container } data-carousel="AnswersToYourQuestions">
            { (data) ? data.map((accordion: any, key: KeyType) => <div key={ key } className={ CarouselStyles.item }>
                <Accordion data={ accordion } translations={ translations }/>
            </div>) : null }
        </div>
    </Fragment>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Carousel;