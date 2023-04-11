/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";
import { Fragment } from "react";
import { ContactInterface } from "../typescript/interfaces";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Carousel from "../components/carousels/carousel";
import Button from "../components/buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Contact */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Contact = (pageProps: ContactInterface) => {
    const { states, stateSetters, accordionsConfigurations } = pageProps;
    const { translations } = states;
    const { setModal } = stateSetters;
    const { contact } = accordionsConfigurations;
    return <Fragment>
        <div id="contact" className="containerFull">
            <div className={ HomeStyles.questions } data-type="opportunity">
                <div className="container">
                    <h3>{ translations["Les réponses à vos questions"] }</h3>
                    <Carousel { ...pageProps } component="StartupAccordions" data={ Object.values(contact) } noActions/>
                    <div className={ HomeStyles.actions } data-justify="center">
                        <p>{ translations["Vous ne trouvez pas la réponse à votre question"] + " ? " }<Button button={ ButtonStyles.classicLink } href="/questions" text={ translations["Accédez à la FAQ"] }/>.</p>
                    </div>
                    <div className={ HomeStyles.actions } data-justify="center">
                        <Button button={ ButtonStyles.callToAction } action={ () => setModal("contact") } text={ translations["Nous contacter"] }/>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>;
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Contact;
export { getStaticProps };