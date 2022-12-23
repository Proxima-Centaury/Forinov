/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment } from "react";
import { ButtonInterface } from "../../typescript/interfaces";
import { buildProperties } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../../components/buttons/button";
import AccordionItem from "../../components/accordion/AccordionItem";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../../public/stylesheets/pages/Home.module.css";
import CarouselStyles from "../../public/stylesheets/components/carousels/Carousel.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Carousel */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Carousel = ({ states, component }: any) => {
	const parentProps = { states };
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
        <div className={ HomeStyles.steps }>
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
/* Landing ( Answers To Your Questions ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const AnswersToYourQuestions = ({ states, handler }: any) => {
	const { translations }: any = states;
	const questionsButtons = [
		translations["Général"],
		translations["La communauté Forinov"]
	];
	const buttonProps = [ "type", "action", "text" ];
    return <>
        <div className={ HomeStyles.actions }>
            { questionsButtons.map((button: any, key: number) => {
                const stepButtonValues = [ ButtonStyles.callToActionStep, (event: MouseEvent) => handler(event, "AnswersToYourQuestions"), button ];
                const stepButtonObject = buildProperties(buttonProps, stepButtonValues);
                return <Button key={ key } { ...stepButtonObject as ButtonInterface } index={ key }/>;
            }) }
        </div>
        <div className={ CarouselStyles.container } data-carousel="AnswersToYourQuestions">
            <div className={ CarouselStyles.item }>
                <div>
                    {translations["landing_accordion1"].map(
                        (item: any, index: any): any => {
                            return (
                                <AccordionItem
                                    title={item.title}
                                    content={item.content}
                                    identifier={index}
                                    key={index}
                                ></AccordionItem>
                            );
                        },
                    )}
                </div>
            </div>
            <div className={ CarouselStyles.item }>
                <div>
                    {translations["landing_accordion2"].map(
                        (item: any, index: any) => {
                            return (
                                <AccordionItem
                                    title={item.title}
                                    content={item.content}
                                    identifier={index + translations["landing_accordion1"].length}
                                    key={index + translations["landing_accordion1"].length + '-accordion2'}
                                ></AccordionItem>
                            );
                        },
                    )}
                </div>
            </div>
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Carousel;