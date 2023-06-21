/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Button from "../buttons/button";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import BannerStyles from "../../public/stylesheets/components/banners/Banner.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Idenfitication Banner */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const IdenfiticationBanner = ({ states }: any) => {
    const { translations }: any = states;
    return <div className={ BannerStyles.identificationBanner }>
        <p>{ translations["Pour accéder à l'ensemble des annuaires Forinov, inscrivez-vous"] + " :" }</p>
        <div className={ BannerStyles.actions }>
            <Button button={ ButtonStyles.default } href="/login" text={ translations["S'identifier"] }/>
            <Button button={ ButtonStyles.callToActionNegative } href="/onboarding" text={ translations["Je m'inscris"] }/>
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default IdenfiticationBanner;