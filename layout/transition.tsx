/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState, memo, useEffect } from "react";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import TransitionStyles from "../public/stylesheets/layout/Transition.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Transition */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Transition = ({ children }: any) => {
    const [ transitionStage, setTransitionStage ] = useState("fadeOut");
    useEffect(() => {
        (transitionStage === "fadeIn") ? setTransitionStage("fadeOut") : null;
        setTimeout(() => setTransitionStage("fadeIn"), 300);
    }, [ children ]);
    return <>
        { children }
    </>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Transition;