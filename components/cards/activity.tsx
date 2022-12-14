/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Format from "../texts/format";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ActivityStyles from "../../public/stylesheets/components/cards/Activity.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Activity Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ActivityCard = ({ event, index, maxVisibleByDefault = 3 }: any) => {
    const activityTimestamp = (date: string) => {
        const activityDate = new Date(date);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - activityDate.getTime();
        const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));
        return daysDifference;
    };
    activityTimestamp(event.DATE);
    return <div className={ ActivityStyles.activity + ((index > maxVisibleByDefault) ? " hidden" : "") }>
        <div className={ ActivityStyles.marker }></div>
        <div className={ ActivityStyles.content }>
            <img src={ event.LOGO } alt={ event.NAME + " logo." }/>
            <p className={ ActivityStyles.user }>{ event.NAME }</p>
            <Format content={ event.CONTENT }/>
            <p className={ ActivityStyles.time }>{ activityTimestamp(event.DATE) + "d" }</p>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ActivityCard;