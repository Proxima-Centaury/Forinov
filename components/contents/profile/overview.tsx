/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
import { formatNameForUrl } from "../../../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Link from "next/link";
import Tags from "../../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import OverviewStyles from "../../../public/stylesheets/components/contents/profile/Overview.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Profile Overview */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ProfileOverview = (pageProps: any) => {
    const { profile, states, router }: any = pageProps;
    const { translations }: any = states;
    const { type }: any = router.query;
    const address = ((profile.ADDRESS.STREET) ? profile.ADDRESS.STREET.trim() + ", " : "") +
    ((profile.ADDRESS.ZIP) ? profile.ADDRESS.ZIP.trim() + ", " : "") +
    ((profile.ADDRESS.TOWN) ? profile.ADDRESS.TOWN.trim() + ", " : "") + profile.ADDRESS.ISO;
    return <div className={ OverviewStyles.overview }>
        <h4>{ translations["En bref"] }</h4>
        <div className="separator"></div>
        { (type.match(/(startups)/)) ? <Startup { ...pageProps }/> : null }
        { (type.match(/(corporates)/)) ? <Corporate { ...pageProps }/> : null }
        { (type.match(/(partners)/)) ? <Partner { ...pageProps }/> : null }
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
                <a href={ ((!profile.WEBSITE.includes("https://")) ? "https://" : "") + profile.WEBSITE.replaceAll("http://", "") } target="_blank">{ translations["Site internet"] }</a>
            </div> : <div className={ OverviewStyles.location }>
                <i className="fa-solid fa-thumbtack"/>
                <span>{ translations["Non renseigné"] + "." }</span>
            </div> }
            { (profile.FACEBOOK || profile.TWITTER || profile.LINKEDIN || profile.CRUNCHBASE) ? <div className={ OverviewStyles.networks }>
                { (profile.FACEBOOK) ? <a href={ ((!profile.FACEBOOK.includes("https://")) ? "https://" : "") + profile.FACEBOOK.replaceAll("http://", "") } target="_blank">
                    <i className="fa-brands fa-facebook-f"/>
                </a> : null }
                { (profile.TWITTER) ? <a href={ ((!profile.TWITTER.includes("https://")) ? "https://" : "") + profile.TWITTER.replaceAll("http://", "") } target="_blank">
                    <i className="fa-brands fa-twitter"/>
                </a> : null }
                { (profile.LINKEDIN) ? <a href={ ((!profile.LINKEDIN.includes("https://")) ? "https://" : "") + profile.LINKEDIN.replaceAll("http://", "") } target="_blank">
                    <i className="fa-brands fa-linkedin"/>
                </a> : null }
                { (profile.CRUNCHBASE) ? <a href={((!profile.CRUNCHBASE.includes("https://")) ? "https://" : "") +  profile.CRUNCHBASE.replaceAll("http://", "") } target="_blank">cb</a> : null }
            </div> : null }
        </div>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Startup Overview */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Startup = (pageProps: any) => {
    const { profile, states }: any = pageProps;
    const { lock, translations }: any = states;
    return <Fragment>
        { (profile.TECHNO.length > 0) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Technologie(s)"] }</p>
            <Tags tags={ profile.TECHNO } lock={ lock }/>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Technologie(s)"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
        { (profile.BUSINESSMODEL.length > 0) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Business model"] }</p>
            <Tags tags={ profile.BUSINESSMODEL } lock={ lock }/>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Business model"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
        { (profile.LOCATION.length > 0) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Présence"] }</p>
            <Tags tags={ profile.LOCATION } lock={ lock }/>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Présence"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Corporate Overview */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Corporate = (pageProps: any) => {
    const { profile, states }: any = pageProps;
    const { translations }: any = states;
    return <Fragment>
        { (profile.HEADQUARTER) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Maison mère"] }</p>
            <Link href={ "/directories/corporates/" + formatNameForUrl(profile.HEADQUARTER_NAME || profile.NAME) + "_" + profile.HEADQUARTER[0].Entreprise }>
                <Tags tags={ Object.entries({ NAME: profile.HEADQUARTER_NAME || profile.NAME }) }/>
            </Link>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Maison mère"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
        { (profile.CREATIONDATE) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Année de création"] }</p>
            <span>{ new Date(profile.CREATIONDATE).getFullYear() || "???" }</span>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Année de création"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
        { (profile.PEOPLE) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Effectifs"] }</p>
            <span>{ profile.PEOPLE }</span>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Effectifs"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
        { (profile.CATEGORY.length > 0) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Secteur d'activités"] }</p>
            <Tags tags={ profile.CATEGORY }/>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Secteur d'activités"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Partner Overview */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Partner = (pageProps: any) => {
    const { profile, states }: any = pageProps;
    const { lock, translations }: any = states;
    return <Fragment>
        { (profile.CREATIONDATE && !isNaN(new Date(profile.CREATIONDATE).getTime())) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Année de création"] }</p>
            <p>{ new Date(profile.CREATIONDATE).getFullYear() }</p>
        </div> : <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Année de création"] }</p>
            <p>{ translations["Non renseigné"] + "." }</p>
        </div> }
        { (profile.SUPPORT.length > 0) ? <div className={ OverviewStyles.details }>
            <p className={ OverviewStyles.label }>{ translations["Type d'accompagnement"] }</p>
            <Tags tags={ profile.SUPPORT } lock={ lock }/>
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
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default ProfileOverview;