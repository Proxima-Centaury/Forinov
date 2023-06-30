/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Tooltip from "@tooltips/defaultTooltip";
import LineSeparator from "@separators/lineSeparator";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TTestimonial } from "@typescript/types/TTestimonial";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CardStyles from "@cards/Card.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Testimonial Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const TestimonialCard = (params: TTestimonial) => {
    const { company, job, logo, name, picture, testimonial } = params;
    return <div className={ CardStyles.card } data-size="smaller">
        <div className={ `${ CardStyles.header } ${ CardStyles.banner }` }>
            <Image src={ picture || "/assets/placeholders/banner.png" } alt={ "" } width="340" height="200"/>
        </div>
        <div className={ CardStyles.body }>
            <i className="fa-solid fa-quote-left"/>
            <Image src={ logo || "/assets/placeholders/banner.png" } alt={ "" } width="100" height="100"/>
            <div className={ CardStyles.rightContainer }>
                <p className={ CardStyles.company }>{ company }</p>
                <div className={ CardStyles.testimonial }>
                    <p dangerouslySetInnerHTML={ { __html: testimonial || "" } }/>
                </div>
            </div>
        </div>
        <LineSeparator/>
        <div className={ CardStyles.footer }>
            <div className={ CardStyles.identity }>
                <p>{ name }</p>
                <p>{ job }</p>
            </div>
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default TestimonialCard;