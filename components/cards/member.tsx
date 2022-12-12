/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import { ButtonInterface } from "../../typescript/interfaces";
import { seeMoreOrLess, buildProperties } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import MemberStyles from "../../public/stylesheets/components/cards/Member.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Member Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const MemberCard = ({ member, index, maxVisibleByDefault = 4, translations }: any) => {
    const [ maxVisibleDetailsByDefault, setMaxVisibleDetailsByDefault ] = useState(0);
    const handleView = (event: any) => seeMoreOrLess(event, translations, "." + MemberStyles.details, [], maxVisibleDetailsByDefault);
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const moreOrLessButtonValues = [ ButtonStyles.moreOrLess, false, "", "", handleView, translations["Voir plus"], 0 ];
    const moreOrLessButtonObject = buildProperties(buttonProps, moreOrLessButtonValues);
    return <div className={ MemberStyles.member + ((index > maxVisibleByDefault) ? " hidden" : "")}>
        <div className={ MemberStyles.main }>
            { (member.PICTURE) ? <img src={ member.PICTURE } alt={ "Image de profil de " + member.FIRSTNAME + " " + member.LASTNAME }/> : null }
            { (!member.PICTURE) ? <i className="fa-light fa-user"/> : null }
            <div className={ MemberStyles.identity }>
                <p className={ MemberStyles.fullname }>{ member.FIRSTNAME + " " + member.LASTNAME }</p>
                <p className={ MemberStyles.job }>{ member.ENTITY }</p>
            </div>
            <a href="" className={ MemberStyles.message }>
                <i className="fa-light fa-message"/>
            </a>
            <Button { ...moreOrLessButtonObject as ButtonInterface }/>
        </div>
        <div className={ MemberStyles.details + ((index > maxVisibleDetailsByDefault) ? " hidden" : "")}>
            
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default MemberCard;