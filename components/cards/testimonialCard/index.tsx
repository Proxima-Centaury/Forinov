/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CustomImage from "@contents/customImage";
import LineSeparator from "@separators/lineSeparator";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { TestimonialType } from "@typescript/types/TestimonialType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CardStyles from "@cards/Card.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Testimonial Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const TestimonialCard = (params: TestimonialType) => {
    const { id, company, job, logo, name, picture, testimonial } = params;
    return <div className={ CardStyles.card } data-size="smaller">
        <div className={ `${ CardStyles.header } ${ CardStyles.banner }` }>
            <CustomImage src={ picture || "/assets/placeholders/banner.png" } alt=""/>
        </div>
        <div className={ CardStyles.body }>
            <i className="fa-solid fa-quote-left"/>
            <CustomImage src={ logo || "/assets/placeholders/banner.png" } alt=""/>
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