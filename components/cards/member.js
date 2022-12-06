/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/future/image";
import { useState } from "react";
import Button from "../buttons/button";
import { utilities } from "../../utilities/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Member Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const MemberCard = ({ member, index, maxVisibleByDefault = 4, translations }) => {
    const [ maxVisibleDetailsByDefault, setMaxVisibleDetailsByDefault ] = useState(0);
    const handleView = (event) => utilities.seeMoreOrLess(event, translations, ".member > .details", [], maxVisibleDetailsByDefault);
    const buttonsProps = [
        { type: "moreOrLess", action: handleView, text: translations["Voir plus"], count: false }
    ];
    if(member) {
        return <div className={ "member" + ((index > maxVisibleByDefault) ? " hidden" : "")}>
            <div className="main">
                { (member.PICTURE) ? <Image src={ member.PICTURE } alt="" width="80" height="80"/> : null }
                { (!member.PICTURE) ? <i className="fa-light fa-user"/> : null }
                <div className="identity">
                    <p className="fullname">{ member.FIRSTNAME + " " + member.LASTNAME }</p>
                    <p className="job">{ member.ENTITY }</p>
                </div>
                <a href="" className="message">
                    <i className="fa-light fa-message"/>
                </a>
                <Button { ...buttonsProps[0] }/>
            </div>
            <div className={ "details" + ((index > maxVisibleDetailsByDefault) ? " hidden" : "")}>
                
            </div>
        </div>;
    } else {
        return <MemberCardPlaceholder/>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Member Card Placeholder */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const MemberCardPlaceholder = () => {
    return <div>
        
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default MemberCard;