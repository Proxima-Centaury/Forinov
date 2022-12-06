/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import Link from "next/link";
import Image from "next/future/image";
import { useEffect, useState } from "react";
import Select from "../components/fields/select";
import Button from "../components/buttons/button";
import RegisterModal from "../components/modals/profile/register";
import config from "../config.json";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Modal */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Modal = ({ modal, setModal, translations }) => {
    console.log(modal);
    const [ modalState, setModalState ]  = useState(false);
    const closeModal = () => {
        return setModal(null);
    };
    useEffect(() => (modal) ? setModalState(true) : setModalState(false), [ modal ]);
    return <div className={ "modalLayout" + ((modalState) ? " open" : "") }>
        <ModalPicker modal={ modal } closeModal={ closeModal } translations={ translations }/>
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Modal Picker */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const ModalPicker = ({ modal, closeModal, translations }) => {
    switch(modal) {
        case "register":
            return <RegisterModal closeModal={ closeModal } translations={ translations }/>;
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Modal;