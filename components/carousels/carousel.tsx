/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, useEffect, Key, useRef, useState } from "react";
import transitionInstance from "../../scripts/transitions";
import { formatNameForUrl } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
import Button from "../../components/buttons/button";
import OpportunityCard from "../cards/opportunity";
import ProfileCard from "../cards/profile";
import FolderCard from "../cards/folder";
import TestimonialCard from "../cards/testimonial";
import ArticleCard from "../cards/article";
import Accordion from "../accordions/accordion";
import Format from "../texts/format";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import CarouselStyles from "../../public/stylesheets/components/carousels/Carousel.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Carousel */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Carousel = (carouselProps: any) => {
    const { component }: any = carouselProps;
    switch (component) {
        case "LatestStartups":
            return <ClassicHorizontal {...carouselProps} />;
        case "LatestOpportunities":
            return <ClassicHorizontal {...carouselProps} />;
        case "CompaniesLogos":
            return <InfiniteScrollHorizontal {...carouselProps} />;
        case "HowToGetStarted":
            return <CustomVertical {...carouselProps} />;
        case "HowToCreateOpportunity":
            return <CustomVertical {...carouselProps} />;
        case "StartupAccordions":
            return <AccordionsHorizontal {...carouselProps} />;
        case "CorporateAccordions":
            return <AccordionsHorizontal {...carouselProps} />;
        case "PartnerAccordions":
            return <AccordionsHorizontal {...carouselProps} />;
        case "OpportunityAccordions":
            return <AccordionsHorizontal {...carouselProps} />;
        case "CorporateHowTo":
            return <StepsCarousel {...carouselProps} />;
        case "PartnerHowTo":
            return <StepsCarousel {...carouselProps} />;
        case "Testimonials":
            return <ClassicHorizontal {...carouselProps} />;
        case "ForinovBlog":
            return <ClassicHorizontal {...carouselProps} />;
        case "StartupsFolders":
            return <ClassicHorizontal {...carouselProps} />;
        default:
            return <Fragment></Fragment>;
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Steps Carousel */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const StepsCarousel = (carouselProps: any) => {
    const { states, component, carouselsConfigurations, router } = carouselProps;
    const { translations, RGB } = states;
    const [lightingState, setLightingState] = useState("disabled");
    const transitionHandler = transitionInstance.handleTransitionWithSteps;
    const steps: Array<any> = carouselsConfigurations[component];
    useEffect(() => (RGB) ? setLightingState("enabled") : setLightingState("disabled"), [RGB]);
    useEffect(() => {
        const handleStepButtonsTitle = () => {
            const stepButtons = document.querySelectorAll("." + CarouselStyles.steps + "[data-carousel='" + component + "Steps'] button") || [];
            if (stepButtons.length > 0) {
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
    return <div className={CarouselStyles.carousel} data-direction="bidirectional">
        <div className={CarouselStyles.steps} data-carousel={component + "Steps"}>
            {steps.map((button, key) => <Fragment key={key}>
                <div className="separator"></div>
                <Button button={ButtonStyles.callToActionStep} action={(event: any) => transitionHandler(event, component)} text={button.title} active={key === 0} />
            </Fragment>)}
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
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Custom Vertical */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const CustomVertical = (carouselProps: any) => {
    const { states, carouselsConfigurations, router, component } = carouselProps;
    const { translations, RGB } = states;
    const [lightingState, setLightingState] = useState("disabled");
    const steps: Array<any> = carouselsConfigurations[component];
    useEffect(() => (RGB) ? setLightingState("enabled") : setLightingState("disabled"), [RGB]);
    return <div className={CarouselStyles.carousel} data-direction="vertical">
        <div className={CarouselStyles.container} data-carousel={component}>
            {steps.map((step, key) => <div key={key} className={CarouselStyles.itemFullWidth}>
                {(key % 2 === 1) ? <div className={CarouselStyles.verticalContent}>
                    <h4>{(key + 1) + ". " + translations[step.title]}</h4>
                    <Format {...carouselProps} content={translations[step.text] + "."} />
                </div> : <div className={CarouselStyles.verticalPicture} data-rgb={lightingState}>
                    <Image src={router.basePath + step.picture} alt={translations["Image de fond de l'entreprise du nom de"] + " " + step.title} width="3840" height="2160" />
                </div>}
                <div className={CarouselStyles.steps}>
                    <div className="separatorVertical"></div>
                    <button className={(key === steps.length - 1) ? "active" : ""}>
                        <i className={(key === steps.length - 1) ? "fa-light fa-check" : "fa-light fa-chevron-down"} />
                    </button>
                </div>
                {(key % 2 === 1) ? <div className={CarouselStyles.verticalPicture} data-rgb={lightingState}>
                    <Image src={router.basePath + step.picture} alt={translations["Image de fond de l'entreprise du nom de"] + " " + step.title} width="3840" height="2160" />
                </div> : <div className={CarouselStyles.verticalContent}>
                    <h4>{(key + 1) + ". " + translations[step.title]}</h4>
                    <Format {...carouselProps} content={translations[step.text] + "."} />
                </div>}
            </div>)}
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Classic Horizontal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ClassicHorizontal = (carouselProps: any) => {
    const carouselReference = useRef(null);
    const { component, states } = carouselProps;
    const { translations, RGB } = states;
    const [pressed, setPressed] = useState(false);
    const [startPosition, setStartPosition] = useState(0);
    const [position, setPosition] = useState(0);
    const [limit, setLimit] = useState(0);
    const [lightingState, setLightingState] = useState("disabled");
    const transitionHandler = transitionInstance.handleTransitionWithArrows;
    // const scrollHandler = (event: any) => {
    //     (window.innerWidth > 576) ? event.preventDefault() : null;
    //     return transitionInstance.handleTransition(event, carouselReference.current);
    // };
    // useEffect(() => {
    //     (carouselReference.current) ? bindEventListeners(carouselReference.current as HTMLElement, [ "wheel" ], scrollHandler) : null;
    //     return () => (carouselReference.current) ? removeEventListeners(carouselReference.current as HTMLElement, [ "wheel" ], scrollHandler) as any : null;
    // });
    const mouseEnterHandler = () => {
        if (window.innerWidth > 576) {
            const carousel = (carouselReference.current) ? carouselReference.current as HTMLElement : null;
            if (carousel) {
                carousel.style.cursor = "grab";
            };
        };
        return false;
    };
    const mouseDownHandler = (event: any) => {
        event.preventDefault();
        if (window.innerWidth > 576) {
            const carousel = (carouselReference.current) ? carouselReference.current as HTMLElement : null;
            const innerCarousel = (carousel) ? carousel.querySelector("." + CarouselStyles.container) as HTMLElement : null;
            if (carousel && innerCarousel && carousel?.offsetWidth < innerCarousel?.offsetWidth) {
                const outer = carousel.getBoundingClientRect();
                const inner = innerCarousel.getBoundingClientRect();
                setPressed(true);
                setStartPosition(event.offsetX - innerCarousel.offsetLeft);
                setLimit((inner.width - outer.width) * -1);
                carousel.style.cursor = "grabbing";
            };
        };
        return false;
    };
    const mouseMoveHandler = (event: any) => {
        event.preventDefault();
        const carousel = (carouselReference.current) ? carouselReference.current as HTMLElement : null;
        const innerCarousel = (carousel) ? carousel.querySelector("." + CarouselStyles.container) as HTMLElement : null;
        if (window.innerWidth > 576 && (carousel && innerCarousel && carousel?.offsetWidth < innerCarousel?.offsetWidth)) {
            if (!pressed) {
                return false;
            };
            if (position > 0) {
                return setPosition(0);
            };
            return ((event.offsetX - startPosition) > 0) ? setPosition(0) : setPosition(event.offsetX - startPosition);
        };
        return false;
    };
    const mouseUpHandler = () => {
        if (window.innerWidth > 576) {
            const carousel = (carouselReference.current) ? carouselReference.current as HTMLElement : null;
            if (carousel) {
                setPressed(false);
                carousel.style.cursor = "grab";
                if (position > 0) {
                    return setPosition(0);
                };
            };
        };
        return false;
    };
    const mouseLeaveHandler = () => {
        if (window.innerWidth > 576) {
            const carousel = (carouselReference.current) ? carouselReference.current as HTMLElement : null;
            if (carousel) {
                setPressed(false);
                carousel.style.cursor = "default";
                if (position > 0) {
                    return setPosition(0);
                };
            };
        };
        return false;
    };
    useEffect(() => {
        const carousel = (carouselReference.current) ? carouselReference.current as HTMLElement : null;
        const innerCarousel = (carousel) ? carousel.querySelector("." + CarouselStyles.container) as HTMLElement : null;
        if (carousel && innerCarousel) {
            carousel.addEventListener("mouseenter", mouseEnterHandler);
            carousel.addEventListener("mousedown", mouseDownHandler);
            carousel.addEventListener("mousemove", mouseMoveHandler);
            carousel.addEventListener("mouseup", mouseUpHandler);
            carousel.addEventListener("mouseleave", mouseLeaveHandler);
        };
        return () => {
            if (carousel && innerCarousel) {
                carousel.removeEventListener("mouseenter", mouseEnterHandler);
                carousel.removeEventListener("mousedown", mouseDownHandler);
                carousel.removeEventListener("mousemove", mouseMoveHandler);
                carousel.removeEventListener("mouseup", mouseUpHandler);
                carousel.removeEventListener("mouseleave", mouseLeaveHandler);
            };
        };
    });
    useEffect(() => (RGB) ? setLightingState("enabled") : setLightingState("disabled"), [RGB]);
    return <div className={CarouselStyles.carousel} ref={carouselReference}>
        <div className={CarouselStyles.arrows}>
            <Button button={ButtonStyles.callToActionRoundedIcon} action={(event: any) => transitionHandler(event, "left")} icon="fa-light fa-arrow-left" />
            <Button button={ButtonStyles.callToActionRoundedIcon} action={(event: any) => transitionHandler(event, "right")} icon="fa-light fa-arrow-right" />
        </div>
        <div className={CarouselStyles.container} style={{ left: (position <= 0) ? ((position < limit) ? limit : position) + "px" : "0px" }}>
            <Items {...carouselProps} />
            {(component === "LatestStartups") ? <div className={CarouselStyles.item} data-rgb={lightingState}>
                <div className="placeholderCard">
                    <p>{translations["Rejoignez Forinov et découvrez l'ensemble des startups"] + " !"}</p>
                    <Button button={ButtonStyles.callToAction} href="/onboarding" text={translations["Je m'inscris"]} />
                </div>
            </div> : null}
            {(component === "LatestOpportunities") ? <div className={CarouselStyles.item} data-rgb={lightingState}>
                <div className="placeholderCard">
                    <p>{translations["Rejoignez Forinov et découvrez l'ensemble des opportunités"] + " !"}</p>
                    <Button button={ButtonStyles.callToAction} href="/onboarding" text={translations["Je m'inscris"]} />
                </div>
            </div> : null}
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Classic Horizontal ( Items ) */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Items = (itemProps: any) => {
    const { component, data, states, router } = itemProps;
    const { RGB } = states;
    const [lightingState, setLightingState] = useState("disabled");
    useEffect(() => (RGB) ? setLightingState("enabled") : setLightingState("disabled"), [RGB]);
    switch (component) {
        case "LatestStartups":
            return data.map((startup: any, key: Key) => {
                const url = "/directories/startups/categories/" + formatNameForUrl(startup.CATEGORY[0].NAME) + "_" + startup.CATEGORY[0].ID + "/" + formatNameForUrl(startup.NAME) + "_" + startup.ID;
                return <div key={key} className={CarouselStyles.item} data-rgb={lightingState}>
                    <ProfileCard {...itemProps} profile={startup} definedType="startup" profileLink={url} carouselItem />
                </div>;
            });
        case "LatestOpportunities":
            return data.map((opportunity: any, key: Key) => {
                const url = "/directories/opportunities/categories/" + formatNameForUrl(opportunity.TYPE[0].NAME) + "_" + opportunity.TYPE[0].ID + "/" + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID;
                return <div key={key} className={CarouselStyles.item} data-rgb={lightingState}>
                    <OpportunityCard {...itemProps} opportunity={opportunity} opportunityLink={url} carouselItem />
                </div>;
            });
        case "ForinovBlog":
            return data.map((article: any, key: Key) => {
                return <div key={key} className={CarouselStyles.item} data-rgb={lightingState}>
                    <ArticleCard {...itemProps} article={article} />
                </div>;
            });
        case "StartupsFolders":
            return data.map((folder: any, key: Key) => {
                const url = router.asPath.substring(0, router.asPath.lastIndexOf("/")) + "/" + formatNameForUrl(folder.NAME) + "_" + folder.ID;
                return <div key={key} className={CarouselStyles.item} data-rgb={lightingState}>
                    <FolderCard {...itemProps} folder={folder} folderLink={url} carouselItem />
                </div>;
            });
        case "Testimonials":
            const importation = require("../../configurations/testimonials.json");
            const { testimonials } = importation;
            return testimonials.map((testimonial: any, key: Key) => <div key={key} className={CarouselStyles.item} data-rgb={lightingState}>
                <TestimonialCard {...itemProps} testimonial={testimonial} />
            </div>);
        default:
            return <div></div>;
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Infinite Scroll Horizontal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const InfiniteScrollHorizontal = (carouselProps: any) => {
    const { component, data } = carouselProps;
    const Items = () => {
        switch (component) {
            case "CompaniesLogos":
                return data.map(({ id, type, name, logo }: any, key: Key) => {
                    type = (type.match(/(entreprise)/i)) ? "corporate" : type;
                    type = (type.match(/(partenaire)/i)) ? "partner" : type;
                    if (key < 14) {
                        const url = "/directories/" + type.toLowerCase() + "s/" + formatNameForUrl(name) + "_" + id;
                        return <Link key={key} href={url} className={CarouselStyles.logo} data-type="tooltip" data-tooltip={name}>
                            <Image src={logo} alt={"Image de l'entreprise no"} width="100" height="100" />
                        </Link>;
                    };
                });
            default:
                return <div></div>;
        };
    };
    return <div className={CarouselStyles.infinite}>
        <div className={CarouselStyles.firstCopy}>
            <Items />
        </div>
        <div className={CarouselStyles.secondCopy}>
            <Items />
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Accordions Horizontal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const AccordionsHorizontal = (carouselProps: any) => {
    const { component, data, noActions, states } = carouselProps;
    const { translations } = states;
    const transitionHandler = transitionInstance.handleTransitionWithSteps;
    const questionsButtons = [translations["Général"]];
    return <div className={CarouselStyles.carousel} data-direction="bidirectional">
        {(noActions) ? null : <div className={CarouselStyles.actions}>
            {questionsButtons.map((button, key) => <Button key={key} button={ButtonStyles.callToActionStep} action={(event: any) => transitionHandler(event, component)} text={button} active={key === 0} />)}
        </div>}
        <div className={CarouselStyles.container} data-carousel={component}>
            {(data) ? data.map((accordion: any, key: Key) => <div key={key} className={CarouselStyles.itemFullWidth}>
                <Accordion {...carouselProps} data={accordion} translations={translations} />
            </div>) : null}
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Carousel;