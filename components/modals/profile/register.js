/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Button from "../../buttons/button";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Register Modal */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const RegisterModal = ({ closeModal, translations }) => {
    const buttonsProps = [
        { type: "closeModal", action: closeModal, text: null, count: null }
    ];
    return <div className="modal firstType" data-modal="register">
        <div>
            <i className="fa-solid fa-bolt"/>
            <p>{ translations["Envie d'en savoir plus sur ce membre Forinov ? Inscrivez-vous dès à présent !"] }</p>
        </div>
        <div>
            <Link href="/register">
                <a className="callToActionSquared">{ translations["S'inscrire"] }</a>
            </Link>
        </div>
        <Button { ...buttonsProps[0] }/>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default RegisterModal;