/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { LoadersInterface } from "../../typescript/interfaces";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LoadersStyles from "./Loaders.module.css";
import HourglassStyles from "./Hourglass.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Loaders */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Loaders = (loadersProps: LoadersInterface): JSX.Element => {
    const { states } = loadersProps;
    const { translations } = states;
    const Dots = (): JSX.Element => {
        return <span className={ LoadersStyles.dots }>
            <span className={ LoadersStyles.dot }></span>
            <span className={ LoadersStyles.dot }></span>
            <span className={ LoadersStyles.dot }></span>
        </span>;
    };
    return <div id="hourglassLoader" className={ LoadersStyles.container }>
        <h6>Forinov</h6>
        <div>
            <p>{ translations["Page en cours de chargement"] }<Dots/></p>
            <div className={ HourglassStyles.hourglass }></div>
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Loaders;