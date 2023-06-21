/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CarouselStyles from "../public/stylesheets/components/carousels/Carousel.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Transition */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/**
* This is a ```class```.
* @class Transition
* @returns
* - ```void``` ( nothing ).
* ---
* @note This class is used to handle transitions effects.
*/
class Transition {
    transform;
    transformArrows;
    constructor() {
        this.transform = 0;
        this.transformArrows = 0;
    };
    resetTransform = () => {
        this.transform = 0;
        return true;
    };
    handleTransition = (event: any, carousel: any) => {
        const itemWidth = 420;
        const innerCarousel = carousel.querySelector("." + CarouselStyles.container);
        const cards = [ ...innerCarousel.children ];
        const limit = ((cards.length - 1) * itemWidth) * -1;
        if(window.innerWidth > 576) {
            if(event.wheelDelta > 0) {
                this.transform = (this.transform < 0) ? this.transform + itemWidth + 16 : this.transform;
            } else {
                this.transform = (this.transform > limit) ? this.transform - itemWidth - 16 : this.transform;
            };
        };
        innerCarousel.style.transform = "translateX(" + this.transform + "px)";
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
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Instance */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const transitionInstance = new Transition();
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default transitionInstance;
export { Transition };