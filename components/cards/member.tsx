/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Image from "next/image";
import Button from "../buttons/button";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import MemberStyles from "../../public/stylesheets/components/cards/Member.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Member Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const MemberCard = (memberProps: any) => {
    const { member, states } = memberProps;
    const { translations } =  states;
    return <div className={ MemberStyles.card }>
        <div className={ MemberStyles.main }>
            { (member.PICTURE) ? <Image src={ member.PICTURE } alt={ translations["Photo de profil de"] + " " + member.FIRSTNAME + member.LASTNAME + "." } width="80" height="80"/> : null }
            { (!member.PICTURE) ? <i className="fa-light fa-user"/> : null }
            <div className={ MemberStyles.identity }>
                { (member.FIRSTNAME || member.LASTNAME) ? <p className={ MemberStyles.fullname }>{ member.FIRSTNAME + member.LASTNAME }</p> : null }
                { (member.ENTITY) ? <p className={ MemberStyles.job }>{ member.ENTITY }</p> : null }
            </div>
            <Button button={ ButtonStyles.callToActionRoundedIcon } icon="fa-light fa-message"/>
        </div>
        { (member.DESCRIPTION) ? <div className={ MemberStyles.details }>
            
        </div> : null }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default MemberCard;