/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Image from "next/future/image";
import Tags from "../tags/tags";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Entity Card */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const EntityCard = ({ entity, type, index }) => {
    if(entity) {
        switch(type) {
            case "client":
                return <div className={ "client" + ((index > 3) ? " hidden" : "")}>
                    <div className="marker"></div>
                    <div className="content">
                        <div className="identity">
                            <Image src={ entity.LOGO } width="48" height="48" alt={ entity.NAME + " logo." }/>
                            <p className="clientName">{ entity.NAME }</p>
                        </div>
                        { (entity.TAG) ? <Tags tags={ (Array.isArray(entity.TAG)) ? entity.TAG : [ entity.TAG ]  } main={ true }/> : null }
                    </div>
                </div>;
            case "partner":
                return <div className={ "partner" + ((index > 3) ? " hidden" : "") }>
                    <div className="marker"></div>
                    <div className="content">
                        <div className="identity">
                            <Image src={ entity.LOGO } width="48" height="48" alt={ entity.NAME + " logo." }/>
                            <p className="partnerName">{ entity.NAME }</p>
                        </div>
                        { (entity.TAG) ? <Tags tags={ (Array.isArray(entity.TAG)) ? entity.TAG : [ entity.TAG ] } main={ true }/> : null }
                    </div>
                </div>;
        };
    } else {
        return <div className="profileCard cardBackground" data-type="full"></div>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default EntityCard;