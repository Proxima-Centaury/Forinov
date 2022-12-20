/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Tags from "../../tags/tags";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import OverviewStyles from "../../../public/stylesheets/components/contents/profile/Overview.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Overview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileOverview = ({ type, profile, states }: any) => {
    console.log(profile);
    const { translations }: any = states;
    const parentProps = { type, profile, states };
    return <div className={ OverviewStyles.overview }>
        <h4>{ translations["En bref"] }</h4>
        <div className="separator"></div>
        { (type === "startup") ? <Startup { ...parentProps }/> : null }
        { (type === "corporation") ? <Corporation { ...parentProps }/> : null }
        { (type === "partner") ? <Partner { ...parentProps }/> : null }
        <div className="separator"></div>
        { (profile.IMMAT) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Numéro d'immatriculation"] }</p>
            <p>{ profile.IMMAT }</p>
        </div> : null }
        <div className="separator"></div>
        <div className={ OverviewStyles.details }>
            { (profile.ADDRESS) ? <div className={ OverviewStyles.location }>
                <i className="fa-solid fa-location-dot"/>
                <span>{ profile.ADDRESS.STREET + ", " + profile.ADDRESS.ZIP + ", " + profile.ADDRESS.TOWN + ", " + profile.ADDRESS.ISO }</span>
            </div> : null }
            { (profile.WEBSITE) ? <div className={ OverviewStyles.website }>
                <i className="fa-solid fa-thumbtack"/>
                <a href={ "https://" + profile.WEBSITE } target="_blank">{ translations["Site internet"] }</a>
            </div> : null }
            <div className={ OverviewStyles.networks }>
                { (profile.FACEBOOK) ? <a href={ profile.FACEBOOK } target="_blank">
                    <i className="fa-brands fa-facebook-f"/>
                </a> : null }
                { (profile.TWITTER) ? <a href={ profile.TWITTER } target="_blank">
                    <i className="fa-brands fa-twitter"/>
                </a> : null }
                { (profile.LINKEDIN) ? <a href={ profile.LINKEDIN } target="_blank">
                    <i className="fa-brands fa-linkedin"/>
                </a> : null }
                { (profile.CRUNCHBASE) ? <a href={ profile.CRUNCHBASE } target="_blank">cb</a> : null }
            </div>
        </div>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Startup Overview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Startup = ({ profile, states }: any) => {
    const { lock, translations }: any = states;
    return <>
        { (profile.TECHNO) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Technologie(s)"] }</p>
            <Tags tags={ Object.entries(profile.TECHNO) } lock={ lock }/>
        </div> : null }
        { (profile.BUSINESSMODEL) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Business model"] }</p>
            <Tags tags={ Object.entries(profile.BUSINESSMODEL) } lock={ lock }/>
        </div> : null }
        { (profile.LOCATION) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Présence"] }</p>
            <Tags tags={ Object.entries(profile.LOCATION) } lock={ lock }/>
        </div> : null }
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Corporation Overview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Corporation = ({ profile, states }: any) => {
    const { translations }: any = states;
    return <>
        { (profile.HEADQUARTER) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Maison mère"] }</p>
        </div> : null }
        { (profile.CREATIONDATE) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Année de création"] }</p>
            <span>{ new Date(profile.CREATIONDATE).getFullYear() }</span>
        </div> : null }
        { (profile.PEOPLE) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Effectifs"] }</p>
            <span>{ profile.PEOPLE }</span>
        </div> : null }
        { (profile.CATEGORY) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Secteur d'activités"] }</p>
            <Tags tags={ Object.entries(profile.CATEGORY) }/>
        </div> : null }
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Partner Overview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Partner = ({ profile, states }: any) => {
    const { lock, translations }: any = states;
    return <>
        { (profile.CREATIONDATE) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Année de création"] }</p>
            <span>{ new Date(profile.CREATIONDATE).getFullYear() }</span>
        </div> : null }
        { (profile.SUPPORT) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Type d'accompagnement"] }</p>
            <span>{ <Tags tags={ Object.entries(profile.SUPPORT) } lock={ lock }/> }</span>
        </div> : null }
        { (profile.PEOPLE) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Effectifs"] }</p>
            <span>{ profile.PEOPLE }</span>
        </div> : null }
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileOverview;