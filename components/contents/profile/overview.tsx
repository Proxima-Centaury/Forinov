/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { formatNameForUrl } from "../../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Tags from "../../tags/tags";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import OverviewStyles from "../../../public/stylesheets/components/contents/profile/Overview.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Profile Overview */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ProfileOverview = ({ type, profile, states }: any) => {
    const { translations }: any = states;
    const parentProps = { type, profile, states };
    const address = ((profile.ADDRESS.STREET) ? profile.ADDRESS.STREET.trim() + ", " : "") +
    ((profile.ADDRESS.ZIP) ? profile.ADDRESS.ZIP.trim() + ", " : "") +
    ((profile.ADDRESS.TOWN) ? profile.ADDRESS.TOWN.trim() + ", " : "") + profile.ADDRESS.ISO;
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
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Numéro d'immatriculation"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
        <div className="separator"></div>
        <div className={ OverviewStyles.details }>
            { (address.length > 0) ? <div className={ OverviewStyles.location }>
                <i className="fa-solid fa-location-dot"/>
                <span>{ address }</span>
            </div> : <div className={ OverviewStyles.location }>
                <i className="fa-solid fa-location-dot"/>
                <span>{ translations["Non renseigné"] + "." }</span>
            </div> }
            { (profile.WEBSITE) ? <div className={ OverviewStyles.website }>
                <i className="fa-solid fa-thumbtack"/>
                <a href={ "https://" + profile.WEBSITE } target="_blank" rel="noreferrer">{ translations["Site internet"] }</a>
            </div> : <div className={ OverviewStyles.location }>
                <i className="fa-solid fa-thumbtack"/>
                <span>{ translations["Non renseigné"] + "." }</span>
            </div> }
            <div className={ OverviewStyles.networks }>
                { (profile.FACEBOOK) ? <a href={ profile.FACEBOOK } target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-facebook-f"/>
                </a> : null }
                { (profile.TWITTER) ? <a href={ profile.TWITTER } target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-twitter"/>
                </a> : null }
                { (profile.LINKEDIN) ? <a href={ profile.LINKEDIN } target="_blank" rel="noreferrer">
                    <i className="fa-brands fa-linkedin"/>
                </a> : null }
                { (profile.CRUNCHBASE) ? <a href={ profile.CRUNCHBASE } target="_blank" rel="noreferrer">cb</a> : null }
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
            <Link href={ "/directories/corporations/" + formatNameForUrl(profile.HEADQUARTER_NAME || profile.NAME) + "_" + profile.HEADQUARTER[0].Entreprise }>
                <Tags tags={ Object.entries({ NAME: profile.HEADQUARTER_NAME || profile.NAME }) }/>
            </Link>
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
        { (profile.CREATIONDATE && !isNaN(new Date(profile.CREATIONDATE).getTime())) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Année de création"] }</p>
            <p>{ new Date(profile.CREATIONDATE).getFullYear() }</p>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Année de création"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
        { (profile.SUPPORT && Object.entries(profile.SUPPORT).length > 0) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Type d'accompagnement"] }</p>
            <Tags tags={ Object.entries(profile.SUPPORT) } lock={ lock }/>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Technologie(s)"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
        { (profile.PEOPLE > 0) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Effectifs"] }</p>
            <p>{ profile.PEOPLE }</p>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Effectifs"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ProfileOverview;