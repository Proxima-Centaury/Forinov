/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRef, useState, useEffect } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ClassicButton from "@actions/classicButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { MouseEventHandler } from "react";
import type { TCarousel } from "@typescript/types/TCarousel";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import DefaultCarouselStyles from "@carousels/Carousel.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Default Carousel */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const DefaultCarousel = (params: TCarousel): JSX.Element => {
    const carouselReference = useRef(null);
    const { items, navigation } = params;
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const moveLeft: MouseEventHandler = () => (currentIndex > 0) ? setCurrentIndex(currentIndex - 1) : false;
    const moveRight: MouseEventHandler = () => (items && currentIndex < items.length - 1) ? setCurrentIndex(currentIndex + 1) : false;
    useEffect(() => {
        if(carouselReference?.current) {
            const autoSlide = setInterval(() => {
                if(items) {
                    if(currentIndex < items.length - 1) {
                        setCurrentIndex(currentIndex + 1);
                    } else {
                        setCurrentIndex(0);
                    };
                };
            }, 1000);
            const wrapper: HTMLDivElement = carouselReference.current;
            const childWidth = wrapper.querySelector(`.${ DefaultCarouselStyles.item }`)?.clientWidth || 550;
            wrapper.style.transform = `translateX(calc(-${ currentIndex * childWidth }px - ${ currentIndex * 16 }px))`;
            return () => {
                clearInterval(autoSlide);
            };
        };
    }, [ items, currentIndex ]);
    return <div className={ DefaultCarouselStyles.container }>
        <div className={ DefaultCarouselStyles.carousel }>
            <ClassicButton classList="sinary circled" action={ moveLeft } icon="fa-solid fa-chevron-left"/>
            <div className={ DefaultCarouselStyles.wrapper } ref={ carouselReference }>
                { (items) ? items.map((item: unknown, key: number) => <div key={ key } className={ DefaultCarouselStyles.item } data-index={ key }>

                </div>) : null }
            </div>
            <ClassicButton classList="sinary circled" action={ moveRight } icon="fa-solid fa-chevron-right"/>
        </div>
        { (navigation) ? <div className={ DefaultCarouselStyles.navigation }>
            { (items) ? items?.map((item: unknown, key: number) => <div key={ key } className={ DefaultCarouselStyles[navigation as keyof object] }>
                <ClassicButton classList="octary" action={ () => setCurrentIndex(key) } active={ key === currentIndex }/>
            </div>) : null }
        </div> : null }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default DefaultCarousel;