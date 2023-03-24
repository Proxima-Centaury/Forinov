/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
import Format from "../texts/format";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ActivityStyles from "../../public/stylesheets/components/cards/Activity.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Activity Card */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ActivityCard = (activityProps: any) => {
    const { event } = activityProps;
    const activityTimestamp = (date: string) => {
        const activityDate = new Date(date);
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - activityDate.getTime();
        const daysDifference = Math.round(timeDifference / (1000 * 3600 * 24));
        return daysDifference;
    };
    return <div className={ ActivityStyles.card }>
        <div className={ ActivityStyles.marker }></div>
        <div className={ ActivityStyles.content }>
            <Image src={ event.LOGO } alt="" width="55" height="55"/>
            <p className={ ActivityStyles.user }>{ event.NAME }</p>
            <Format content={ event.CONTENT }/>
            <p className={ ActivityStyles.time }>{ activityTimestamp(event.DATE) + "d" }</p>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ActivityCard;