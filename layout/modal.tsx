/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { MouseEventHandler, useEffect, useState } from "react";
import { preciseTarget } from "../scripts/utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Button from "../components/buttons/button";
import RegisterModal from "../components/modals/register";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
import ContactModal from "../components/modals/contact";
import ErrorsModal from "../components/modals/errors";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Modal */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Modal = (modalProps: any) => {
    const { states, stateSetters } = modalProps;
    const { modal } = states;
    const { setModal } = stateSetters;
    const [ modalState, setModalState ]  = useState(false);
    const closeModal: MouseEventHandler = (event) => {
        const target = event.target as HTMLElement;
        const button = preciseTarget(event as any);
        if(target.classList.contains("modalLayout") || (button && button.getAttribute("class") === ButtonStyles.closeModal)) {
            setModal(null);
        };
    };
    useEffect(() => (modal) ? setModalState(true) : setModalState(false), [ modal ]);
    return <div className={ "modalLayout" + ((modalState) ? " open" : "") } onClick={ closeModal }>
        <ModalPicker { ...modalProps } action={ closeModal }/>
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Modal Picker */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const ModalPicker = (modalProps: any) => {
    const { action, states } = modalProps;
    const { modal } = states;
    switch(modal) {
        case "register":
            return <div className="modal firstType" data-modal="register">
                <RegisterModal { ...modalProps }/>
                <Button button={ ButtonStyles.closeModal } action={ action }/>
            </div>;
        case "contact":
            return <div className="modal secondType" data-modal="contact">
                <ContactModal { ...modalProps }/>
                <Button button={ ButtonStyles.closeModal } action={ action }/>
            </div>;
        case "errors":
            return <div className="modal secondType" data-modal="errors">
                <ErrorsModal { ...modalProps }/>
                <Button button={ ButtonStyles.closeModal } action={ action }/>
            </div>;
        default:
            return <div></div>;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Modal;