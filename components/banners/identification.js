/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Idenfitication Banner */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const IdenfiticationBanner = ({ translations }) => {
    return <div className="identificationBanner">
        <p>{ translations["Profitez de Forinov sans limite :"] }</p>
        <div className="actions">
            <Link href="/login">
                <a>{ translations["S'identifier"] }</a>
            </Link>
            <Link href="/register">
                <a className="callToActionNegative">{ translations["Je m'inscris"] }</a>
            </Link>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default IdenfiticationBanner;