/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Button from "../buttons/button";
import { ButtonInterface } from "../../typescript/interfaces";
import { buildProperties } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import BannerStyles from "../../public/stylesheets/components/Banner.module.css";
import ButtonStyles from "../../public/stylesheets/components/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Idenfitication Banner */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const IdenfiticationBanner = ({ states }: any) => {
    const { translations }: any = states;
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const registerButtonValues = [ ButtonStyles.callToActionAlternative, false, "", "/register", () => false, translations["Je m'inscris"], 0 ];
    const registerButtonObject = buildProperties(buttonProps, registerButtonValues);
    return <div className={ BannerStyles.identificationBanner }>
        <p>{ translations["Profitez de Forinov sans limite :"] }</p>
        <div className={ BannerStyles.actions }>
            <Link href="/login">{ translations["S'identifier"] }</Link>
            <Button { ...registerButtonObject as ButtonInterface }/>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default IdenfiticationBanner;