/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Idenfitication Banner */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const IdenfiticationBanner = ({ translations }) => {
    return <div className="identificationBanner">
        <p>{ translations["Profitez de Forinov sans limite :"] }</p>
        <div className="actions">
            <a href="https://google.com">{ translations["S'identifier"] }</a>
            <button className="callToActionNegative">{ translations["Je m'inscris"] }</button>
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default IdenfiticationBanner;