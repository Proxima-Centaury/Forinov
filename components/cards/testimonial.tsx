/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import Format from "../texts/format";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import TestimonialStyles from "../../public/stylesheets/components/cards/Testimonial.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Testimonial Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const TestimonialCard = (pageProps: any) => {
    const { testimonial, states } = pageProps;
    const { translations } = states;
    return <div className={ TestimonialStyles.card }>
        <div className={ TestimonialStyles.pictures }>
            <Image className={ TestimonialStyles.main } src={ testimonial.PICTURE } alt={ translations["Photo de"] + " " + testimonial.NAME + "."} width="260" height="260"/>
            <Image className={ TestimonialStyles.sub } src={ testimonial.LOGO } alt={ translations["Logo de"] + " " + testimonial.COMPANY + "."} width="150" height="150"/>
        </div>
        <div className={ TestimonialStyles.identity }>
            <h4>{ testimonial.NAME }</h4>
            <h5>{ testimonial.JOBNAME }</h5>
            <h5>{ testimonial.COMPANY }</h5>
        </div>
        <div className={ TestimonialStyles.testimonial }>
            <Format { ...pageProps } content={ testimonial.TESTIMONIAL + "." }/>
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default TestimonialCard;