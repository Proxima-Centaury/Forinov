/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { MouseEventHandler, useEffect, useState } from "react";
import { ButtonInterface } from "../typescript/interfaces";
import { buildProperties } from "../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../components/buttons/button";
import RegisterModal from "../components/modals/profile/register";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
import ContactModal from "../components/modals/contact";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Modal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Modal = ({ states, stateSetters }: any) => {
    const { modal, translations, theme }: any = states;
    const { setModal }: any = stateSetters;
    const [ modalState, setModalState ]  = useState(false);
    const closeModal: MouseEventHandler = () => {
        setModal(null);
    };
    useEffect(() => (modal) ? setModalState(true) : setModalState(false), [ modal ]);
    const modalProps = { modal: modal, closeModal: closeModal, translations: translations, theme: theme };
    return <div className={ "modalLayout" + ((modalState) ? " open" : "") }>
        <ModalPicker { ...modalProps }/>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Modal Picker */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ModalPicker = ({ modal, closeModal, translations, theme }: any) => {
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const closeModalButtonValues = [ ButtonStyles.closeModal, false, "", "", closeModal, "", 0 ];
    const closeModalButtonObject = buildProperties(buttonProps, closeModalButtonValues);
    const modalProps = { translations: translations, theme: theme };
    switch(modal) {
        case "register":
            return <div className="modal firstType" data-modal="register">
                <RegisterModal  { ...modalProps }/>
                <Button button={ ButtonStyles.closeModal } action={ closeModal }/>
            </div>;
        case "contact":
            return <div className="modal firstType" data-modal="contact">
            <ContactModal  { ...modalProps }/>
            <Button { ...closeModalButtonObject as ButtonInterface }/>
        </div>;
        default:
            return <div></div>;
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Modal;