/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useEffect, useState } from "react";
import { ButtonInterface } from "../typescript/interfaces";
import { buildProperties } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../components/buttons/button";
import RegisterModal from "../components/modals/profile/register";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Modal */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Modal = ({ states, stateSetters }: any) => {
    const { modal, translations }: any = states;
    const { setModal }: any = stateSetters;
    const [ modalState, setModalState ]  = useState(false);
    const closeModal = () => {
        return setModal(null);
    };
    useEffect(() => (modal) ? setModalState(true) : setModalState(false), [ modal ]);
    const modalProps = { modal: modal, closeModal: closeModal, translations: translations };
    return <div className={ "modalLayout" + ((modalState) ? " open" : "") }>
        <ModalPicker { ...modalProps }/>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Modal Picker */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ModalPicker = ({ modal, closeModal, translations }: any) => {
    const buttonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    const closeModalButtonValues = [ ButtonStyles.closeModal, false, "", "", closeModal, "", 0 ];
    const closeModalButtonObject = buildProperties(buttonProps, closeModalButtonValues);
    const modalProps = { translations: translations };
    switch(modal) {
        case "register":
            return <div className="modal firstType" data-modal="register">
                <RegisterModal  { ...modalProps }/>
                <Button { ...closeModalButtonObject as ButtonInterface }/>
            </div>;
        default:
            return <div></div>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Modal;