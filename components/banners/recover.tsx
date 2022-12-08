/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../buttons/button";
import { ButtonInterface } from "../../typescript/interfaces";
import { buildProperties } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import BannerStyles from "../../public/stylesheets/components/banners/Banner.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Recover Banner */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const RecoverBanner = ({ states }: any) => {
    const { translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const recoverButtonValues = [ ButtonStyles.callToActionNegative, false, "", "", () => false, translations["Récupérer les accès"], 0 ];
    const recoverButtonObject = buildProperties(buttonProps, recoverButtonValues);
    return <div className={ BannerStyles.recoverBanner }>
        <p>{ translations["Ce compte a été créé par nos équipes, s'il s'agit de votre startup, n'hésitez pas à :"] }</p>
        <div className={ BannerStyles.actions }>
            <Button { ...recoverButtonObject as ButtonInterface }/>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default RecoverBanner;