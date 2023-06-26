/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import Link from "next/link";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LineSeparator from "@separators/lineSeparator";
import PrimaryTag from "@tags/primary";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CardStyles from "@cards/Card.module.css";
import Tooltip from "components/tooltips/tooltip";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Startup Profile Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const StartupProfileCard = (params: any) => {
    const { startup } = params;
    return <Link className={ CardStyles.card } href={ startup.url }>
        <div className={ `${ CardStyles.header } ${ CardStyles.banner }` }>
            <Image src={ startup.banner } alt={ "" } width="500" height="150"/>
        </div>
        <div className={ CardStyles.body }>
            <div className={ CardStyles.leftContainer }>
                <Image src={ startup.logo } alt={ "" } width="100" height="100"/>
            </div>
            <LineSeparator classList="vertical"/>
            <div className={ CardStyles.rightContainer }>
                <Tooltip tooltip={ startup.name }>
                    <p className={ CardStyles.title }>{ startup.name }</p>
                </Tooltip>
                <Tooltip tooltip={ startup.category.name }>
                    <PrimaryTag tag={ startup.category.name }/>
                </Tooltip>
            </div>
        </div>
        <div className={ CardStyles.footer }>

        </div>
    </Link>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default StartupProfileCard;