/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Format from "../texts/format";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import FolderStyles from "../../public/stylesheets/components/cards/Folder.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Folder Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const FolderCard = ({ event, index, maxVisibleByDefault = 3 }: any) => {
    const activityTimestamp = (date: string) => {
        const activityDate = new Date(date);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - activityDate.getTime();
        const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));
        return daysDifference;
    };
    activityTimestamp(event.DATE);
    return <div className={ FolderStyles.activity + ((index > maxVisibleByDefault) ? " hidden" : "") }>
        <div className={ FolderStyles.marker }></div>
        <div className={ FolderStyles.content }>
            <Image src={ event.LOGO } alt={ "Logo de la structure " + event.NAME + "." } width="55" height="55"/>
            <p className={ FolderStyles.user }>{ event.NAME }</p>
            <Format content={ event.CONTENT }/>
            <p className={ FolderStyles.time }>{ activityTimestamp(event.DATE) + "d" }</p>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default FolderCard;