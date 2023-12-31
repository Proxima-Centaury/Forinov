/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Key } from "react";
import { uppercaseFirst } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/image";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import FolderStyles from "../../public/stylesheets/components/cards/Folder.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Folder Card */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const FolderCard = (folderProps: any) => {
    const { folder, states } = folderProps;
    const { translations } = states;
    const showOtherStartups = (startups: Array<any>, shift: Number) => {
        const otherStartups = startups.slice(shift as number, startups.length).map((startup: any) => startup[1] || startup.NAME);
        return otherStartups.join("\n");
    };
    return <div className={ FolderStyles.card }>
        <div className={ FolderStyles.content }>
            <div className={ FolderStyles.geometry }></div>
            { (folder.STARTUPS.length > 0 && folder.STARTUPS.length <= 3) ? <div className={ FolderStyles.startups }>
                { folder.STARTUPS.map((startup: any, key: Key) => <div key={ key } data-type="tooltip" data-tooltip={ startup.NAME }>
                    <Image src={ startup.LOGO } alt={ translations["Logo de la startup du nom de"] + " " + startup.NAME + "." } width="72" height="72"/>
                </div>) }
            </div> : null }
            { (folder.STARTUPS.length > 3) ? <div className={ FolderStyles.startups }>
                { folder.STARTUPS.map((startup: any, key: Key) => (key < 2) ? <div key={ key } data-type="tooltip" data-tooltip={ startup.NAME }>
                    <Image src={ startup.LOGO } alt={ translations["Logo de la startup du nom de"] + " " + startup.NAME + "." } width="72" height="72"/>
                </div> : null) }
                <div data-type="tooltip" data-tooltip={ showOtherStartups(folder.STARTUPS, 3) }>
                    <p>{ "+" + (folder.STARTUPS.length - 2) }</p>
                </div>
            </div> : null }
            <h5>{ uppercaseFirst(folder.NAME) as String }</h5>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default FolderCard;