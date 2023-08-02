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
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { CarouselType } from "@typescript/types/CarouselType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CarouselStyles from "@carousels/Carousel.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Steaps Carousel */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const StepsCarousel = (params: CarouselType): JSX.Element => {
    const { classList, controls, gradient, indicators, items, itemsType, links, navigation } = params;
    // const steps: Array<any> = carouselsConfigurations[component];
    // useEffect(() => {
    //     const handleStepButtonsTitle = () => {
    //         const stepButtons = document.querySelectorAll("." + CarouselStyles.steps + "[data-carousel='" + component + "Steps'] button") || [];
    //         if (stepButtons.length > 0) {
    //             stepButtons.forEach((button, key) => {
    //                 const typedButton = button as HTMLElement;
    //                 const stepTitle = (window.innerWidth < 992) ? key + 1 : (key + 1) + ". " + steps[key].title;
    //                 typedButton.innerText = stepTitle.toString();
    //             });
    //         };
    //     };
    //     handleStepButtonsTitle();
    //     window.addEventListener("resize", handleStepButtonsTitle);
    //     return () => window.removeEventListener("resize", handleStepButtonsTitle);
    // });
    return <div className={ CarouselStyles.container }>
        {/* <div className={ CarouselStyles.steps }>
            { steps.map((button, key) => <Fragment key={key}>
                <div className="separator"></div>
                <Button button={ButtonStyles.callToActionStep} action={(event: any) => transitionHandler(event, component)} text={button.title} active={key === 0} />
            </Fragment> )}
            <div className="separator"></div>
        </div>
        <div className={CarouselStyles.container} data-carousel={component}>
            {steps.map((step, key) => {
                return <div key={key} className={CarouselStyles.itemFullWidth}>
                    <div className={CarouselStyles.stepContent}>
                        <h4>{(key + 1) + ". " + translations[step.title]}</h4>
                        <ul>
                            {step.list.map((item: String, key: Key) => <li key={key}>
                                <div><i className="fa-light fa-arrow-right" /><Format {...carouselProps} content={translations[item as keyof Object] + "."} /></div>
                            </li>)}
                        </ul>
                    </div>
                    <div className={CarouselStyles.stepPicture} data-rgb={lightingState}>
                        <Image src={router.basePath + step.picture} alt={translations["Image de fond de l'entreprise du nom de"] + " " + step.title} width="3840" height="2160" />
                    </div>
                </div>;
            })}
        </div> */}
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default StepsCarousel;