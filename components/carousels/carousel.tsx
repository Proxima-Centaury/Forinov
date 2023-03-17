/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, useEffect, Key } from "react";
import { formatNameForUrl, bindEventListeners, removeEventListeners } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
import Button from "../../components/buttons/button";
import OpportunityCard from "../cards/opportunity";
import ProfileCard from "../cards/profile";
import FolderCard from "../cards/folder";
import Accordion from "../accordions/accordion";
import Format from "../texts/format";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import CarouselStyles from "../../public/stylesheets/components/carousels/Carousel.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
import ArticleCard from "../cards/article";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Commons */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
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
        const buttons = (container) ? [ ...container.querySelectorAll("button") ] : [];
        if(buttons.length > 0) {
            buttons.forEach((button, key) => {
                button.setAttribute("data-index", key);
                button.classList.remove(ButtonStyles.active);
            });
        };
        target.classList.add(ButtonStyles.active);
        const carousel = document.querySelector("[data-carousel='" + name + "']") as HTMLElement;
        const index = parseInt(target.getAttribute("data-index"));
        if(carousel) {
            carousel.style.transform = (index === 0) ? "translateX(-" + index + "00%)" : "translateX(calc(-" + index + "00% - " + (index * 80) + "px))";
            return true;
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
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Carousel */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
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
        case "ForinovBlog":
            return <ClassicHorizontal { ...pageProps }/>;
        case "StartupsFolders":
            return <ClassicHorizontal { ...pageProps }/>;
        default :
            return <Fragment></Fragment>;
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Steps Carousel */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const StepsCarousel = (pageProps: any) => {
    const { states, component, carouselsConfigurations, router }: any = pageProps;
	const { translations }: any = states;
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithSteps;
    const steps: Array<any> = carouselsConfigurations[component];
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
            { steps.map((button, key) => {
                return <Fragment key={ key }>
                    <div className="separator"></div>
                    <Button button={ ButtonStyles.callToActionStep } action={ (event: MouseEvent) => transitionHandler(event, component) } text={ button.title } active={ key === 0 }/>
                </Fragment>;
            }) }
            <div className="separator"></div>
        </div>
        <div className={ CarouselStyles.container } data-carousel={ component }>
            { steps.map((step, key) => {
                return <div key={ key } className={ CarouselStyles.itemFullWidth } data-index={ key }>
                    <div className={ CarouselStyles.stepContent }>
                        <h4>{ (key + 1) + ". " + translations[step.title] }</h4>
                        <ul>
                            { step.list.map((item: String, key: Key) => <li key={ key }>
                                <div><i className="fa-light fa-arrow-right"/><Format { ...pageProps } content={ translations[item as keyof Object] }/></div>
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
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Custom Vertical */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const CustomVertical = (pageProps: any) => {
    const { states, carouselsConfigurations, router, component }: any = pageProps;
	const { translations }: any = states;
    const steps: Array<any> = carouselsConfigurations[component];
    return <div className={ CarouselStyles.carousel } data-direction="vertical">
        <div className={ CarouselStyles.container } data-carousel={ component }>
            { steps.map((step, key) => <div key={ key } className={ CarouselStyles.itemFullWidth } data-index={ key }>
                { (key % 2 === 1) ? <div className={ CarouselStyles.verticalContent }>
                    <h4>{  (key + 1) + ". " + translations[step.title] }</h4>
                    <Format { ...pageProps } content={ translations[step.text] }/>
                </div> : <div className={ CarouselStyles.verticalPicture }>
                    <Image src={ router.basePath + step.picture } alt={ translations[step.title] } width="3840" height="2160"/>
                </div> }
                <div className={ CarouselStyles.steps }>
                    <div className="separatorVertical"></div>
                    <button className={ (key === steps.length - 1) ? "active" : "" }>
                        <i className={ (key === steps.length - 1) ? "fa-light fa-check" : "fa-light fa-chevron-down" }/>
                    </button>
                </div>
                { (key % 2 === 1) ? <div className={ CarouselStyles.verticalPicture }>
                    <Image src={ router.basePath + step.picture } alt={ translations[step.title] } width="3840" height="2160"/>
                </div> : <div className={ CarouselStyles.verticalContent }>
                    <h4>{  (key + 1) + ". " + translations[step.title] }</h4>
                    <Format { ...pageProps } content={ translations[step.text] }/>
                </div> }
            </div>) }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Classic Horizontal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ClassicHorizontal = (pageProps: any) => {
    const { component, data, router }: any = pageProps;
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithArrows;
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
                return data.map((startup: any, key: Key) => {
                    const url = "/directories/startups/categories/" + formatNameForUrl(startup.CATEGORY[0].NAME) + "_" + startup.CATEGORY[0].ID + "/" + formatNameForUrl(startup.NAME) + "_" + startup.ID;
                    return <Link key={ key } className={ CarouselStyles.item } href={ url }>
                        <ProfileCard { ...pageProps } profile={ startup } definedType="startup" page="landing"/>
                    </Link>;
                });
            case "LatestOpportunities":
                return data.map((opportunity: any, key: Key) => {
                    const url = "/directories/opportunities/categories/" + formatNameForUrl(opportunity.TYPE[0].NAME) + "_" + opportunity.TYPE[0].ID + "/" + formatNameForUrl(opportunity.TITLE) + "_" + opportunity.ID;
                    return <Link key={ key } className={ CarouselStyles.item } href={ url }>
                        <OpportunityCard { ...pageProps } opportunity={ opportunity }/>
                    </Link>;
                });
            case "ForinovBlog":
                return data.map((article: any, key: Key) => {
                    return <Link key={ key } className={ CarouselStyles.item } href={ article.URL }>
                        <ArticleCard { ...pageProps } article={ article }/>
                    </Link>;
                });
            case "StartupsFolders":
                return data.map((folder: any, key: Key) => {
                    const url =  router.asPath.substring(0, router.asPath.lastIndexOf("/")) + "/" + formatNameForUrl(folder.NAME) + "_" + folder.ID;
                    return <Link key={ key } className={ CarouselStyles.item } href={ url }>
                        <FolderCard { ...pageProps } folder={ folder }/>
                    </Link>;
                });
            default:
                return <div></div>;
        };
    };
    return <div className={ CarouselStyles.carousel } data-carousel={ component }>
        <div className={ CarouselStyles.arrows }>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ (event: MouseEvent) => transitionHandler(event, "left") } icon="fa-light fa-arrow-left"/>
            <Button button={ ButtonStyles.callToActionRoundedIcon } action={ (event: MouseEvent) => transitionHandler(event, "right") } icon="fa-light fa-arrow-right"/>
        </div>
        <div className={ CarouselStyles.container }>
            <Items/>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Infinite Scroll Horizontal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const InfiniteScrollHorizontal = (pageProps: any) => {
    const { component, data }: any = pageProps;
    const Items = () => {
        switch(component) {
            case "CompaniesLogos":
                return data.map(({ id, type, name, logo }: any, key: Key) => {
                    type = (type.match(/(entreprise)/i)) ? "corporation" : type;
                    type = (type.match(/(partenaire)/i)) ? "partner" : type;
                    if(key < 14) {
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
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Accordions Horizontal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const AccordionsHorizontal = (pageProps: any) => {
    const { component, data, states }: any = pageProps;
	const { translations }: any = states;
    const transitionInstance = new Transition();
    const transitionHandler = transitionInstance.handleTransitionWithSteps;
    const questionsButtons = [ translations["Général"] ];
    return <div className={ CarouselStyles.carousel } data-direction="bidirectional">
        <div className={ CarouselStyles.actions }>
            { questionsButtons.map((button, key) => <Button key={ key } button={ ButtonStyles.callToActionStep } action={ (event: MouseEvent) => transitionHandler(event, component) } text={ button } active={ key === 0 }/>) }
        </div>
        <div className={ CarouselStyles.container } data-carousel={ component }>
            { (data) ? data.map((accordion: any, key: Key) => <div key={ key } className={ CarouselStyles.itemFullWidth }>
                <Accordion { ...pageProps } data={ accordion } translations={ translations }/>
            </div>) : null }
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Carousel;