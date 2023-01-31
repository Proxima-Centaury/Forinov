/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useRouter } from "next/router";
import { uppercaseFirst, formatNameForUrl } from "../../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/image";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import FolderStyles from "../../public/stylesheets/components/cards/Folder.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Folder Card */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const FolderCard = ({ folder, index, maxVisibleByDefault = 2 }: any) => {
    const route = useRouter();
    return <Link href={ route.asPath + "/folders/" + formatNameForUrl(folder.name) + "_" + folder.id } className={ FolderStyles.folder + ((index > maxVisibleByDefault) ? " hidden" : "") }>
        <div className={ FolderStyles.content }>
            <div className={ FolderStyles.geometry }></div>
            { (folder.startups.length > 0 && folder.startups.length <= 3) ? <div className={ FolderStyles.startups }>
                { folder.startups.map((startup: any, key: KeyType) => <div key={ key } data-type="tooltip" data-tooltip={ startup.name }>
                    <Image src={ startup.logo } alt={ "Logo de la structure" + startup.logo } width="72" height="72"/>
                </div>) }
            </div> : null }
            { (folder.startups.length > 3) ? <div className={ FolderStyles.startups }>
                { folder.startups.map((startup: any, key: KeyType) => (parseInt(key) < 2) ? <div key={ key } data-type="tooltip" data-tooltip={ startup.name }>
                    <Image src={ startup.logo } alt={ "Logo de la structure" + startup.logo } width="72" height="72"/>
                </div> : null) }
                <div data-type="tooltip" data-tooltip={ folder.startups.map((startup: any, key: KeyType) => (parseInt(key) >= 2) ? startup.name : null).filter((startup: String) => startup !== null).join("\n") }>
                    <p>{ "+" + (folder.startups.length - 2) }</p>
                </div>
            </div> : null }
            <h5>{ uppercaseFirst(folder.name) as String }</h5>
        </div>
    </Link>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default FolderCard;