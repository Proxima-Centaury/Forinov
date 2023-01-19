/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
// import { ButtonInterface } from "../../../typescript/interfaces";
// import { seeMoreOrLess, buildProperties } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ProfileProducts from "../../../components/contents/profile/products";
import Tags from "../../tags/tags";
import Button from "../../buttons/button";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import GoalsStyles from "../../../public/stylesheets/components/contents/profile/Goals.module.css";
import ButtonStyles from "../../../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Goals */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileGoals = ({ type, profile, products, activities, states, stateSetters }: any) => {
    const { lock, translations }: any = states;
    const partnerships = Object.entries(profile.PARTNER_SEARCH) || [];
    const domains = Object.entries(profile.STARTUP_SEARCH) || [];
    const parentProps = { type, profile, products, activities, states, stateSetters };
    return <div id="goals" className={ GoalsStyles.goals }>
        <h3>{ translations["Objectifs et offres"] }</h3>
        <div className={ GoalsStyles.content }>
            <p className={ GoalsStyles.label }>{ translations["Types de collaborations recherchées"] }</p>
            { (partnerships.length > 0) ? <Tags tags={ partnerships } lock={ lock }/> : <p>{ translations["Non renseigné"] + "." }</p> }
        </div>
        <div className={ GoalsStyles.content }>
            <p className={ GoalsStyles.label }>{ translations["Intérêts par les startups dans les domaines"] }</p>
            { (domains.length > 0) ? <Tags tags={ domains } lock={ lock }/> : <p>{ translations["Non renseigné"] + "." }</p> }
        </div>
        { (products) ? <ProfileProducts { ...parentProps }/> : null }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileGoals;