/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import CarouselStyles from "../../public/stylesheets/components/carousels/Carousel.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Carousel */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Carousel = ({ states, component }: any) => {
	const parentProps = { states };
    return <div className={ CarouselStyles.container }>
        { (component === "HowToCreateAnOpportunity") ? <HowToCreateAnOpportunity { ...parentProps }/> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Landing ( How To Create An Opportunity ) */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const HowToCreateAnOpportunity = ({ states }: any) => {
	const { translations }: any = states;
    return <>
        <div className={ CarouselStyles.item }>
            <h4>{translations["landing_carousel_title1"]}</h4>
            <ul>
                {translations["landing_carousel_content1"].map(
                    (item: any) => {
                        return <li key={"1-" + item}>{item}</li>;
                    },
                )}
            </ul>
            <img src="" alt="carousel item 1 image"/>
        </div>
        <div className={ CarouselStyles.item }>
            <ul>
                <h1>{translations["landing_carousel_title2"]}</h1>
                {translations["landing_carousel_content1"].map(
                    (item:any) => {
                        return <li key={"2-" + item}>{item}</li>;
                    },
                )}
            </ul>
            <img src="" alt="carousel item 1 image"/>
        </div>
        <div className={ CarouselStyles.item }>
            <ul>
                <h1>{translations["landing_carousel_title3"]}</h1>
                {translations["landing_carousel_content1"].map(
                    (item:any) => {
                        return <li key={"3-" + item}>{item}</li>;
                    },
                )}
            </ul>
            <img src="" alt="carousel item 1 image"/>
        </div>
        <div className={ CarouselStyles.item }>
            <ul>
                <h1>{translations["landing_carousel_title4"]}</h1>
                {translations["landing_carousel_content1"].map(
                    (item:any) => {
                        return <li key={"4-" + item}>{item}</li>;
                    },
                )}
            </ul>
            <img src="" alt="carousel item 1 image"/>
        </div>
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Carousel;