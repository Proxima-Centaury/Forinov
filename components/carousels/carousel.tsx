/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, useEffect, useState } from "react";
import { ButtonInterface } from "../../typescript/interfaces";
import { buildProperties } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
import Button from "../../components/buttons/button";
import OpportunityCard from "../cards/opportunity";
import Accordion from "../accordions/accordion";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import CarouselStyles from "../../public/stylesheets/components/carousels/Carousel.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
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
        case "HowToApplyToAnOpportunity":
            return <HowToApplyToAnOpportunity { ...parentProps } handler={ handleCarousel }/>;
        case "TheLatestOpportunities":
            return <TheLatestOpportunities { ...parentProps } handler={ handleCarousel }/>;
        case "CompaniesLogos":
            return <CompaniesLogos { ...parentProps } handler={ handleCarousel }/>
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
/* Landing ( The Latest Opportunities ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const TheLatestOpportunities = ({ states, data }: any) => {
	const { translations }: any = states;
    const [ transform, setTransform ] = useState(0);
    const scrollHandler = (event: any) => {
        event.preventDefault();
        const target = event.target;
        const preciseTarget = target.closest("." + CarouselStyles.container);
        const opportunities = [ ...preciseTarget.children ];
        (preciseTarget.scrollWidth >= transform) ? (event.deltaY < 0) ? setTransform(transform - 100) : setTransform(transform + 100) : null;
        opportunities.forEach((opportunity: HTMLElement) => opportunity.style.transform = "translateX(" + transform + "px)");
    };
    useEffect(() => {
        const carousel = document.querySelector("[data-type='startup'] > div > ." + CarouselStyles.container);
        carousel?.addEventListener("wheel", scrollHandler);
        return () => carousel?.removeEventListener("wheel", scrollHandler);
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
const CompaniesLogos = ({ data }: any) => {
    return <div className={ CarouselStyles.infinite }>
        <div className={ CarouselStyles.firstCopy }>
            { data.map(({ id, type, name, logo }: any, key: KeyType) => {
                if(parseInt(key) < 14) {
                    const formattedName = (name: String) => name.toLowerCase().replaceAll(/\s+/g, "").trim();
                    const url = "/annuaires/" + type.toLowerCase() + "s/" + formattedName(name) + "_" + id;
                    return <Link key={ key } href={ url } className={ CarouselStyles.logo } data-type="tooltip" data-tooltip={ name }>
                        <Image src={ logo } alt={ name + " logo." } width="100" height="100"/>
                    </Link>;
                };
            }) }
        </div>
        <div className={ CarouselStyles.secondCopy }>
            { data.map(({ id, type, name, logo }: any, key: KeyType) => {
                if(parseInt(key) < 14) {
                    const formattedName = (name: String) => name.toLowerCase().replaceAll(/\s+/g, "").trim();
                    const url = "/annuaires/" + type.toLowerCase() + "s/" + formattedName(name) + "_" + id;
                    return <Link key={ key } href={ url } className={ CarouselStyles.logo } data-type="tooltip" data-tooltip={ name }>
                        <Image src={ logo } alt={ name + " logo." } width="100" height="100"/>
                    </Link>;
                };
            }) }
        </div>
    </div>
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