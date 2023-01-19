/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import TransitionStyles from "../public/stylesheets/layout/Transition.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Transition */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Transition = ({ children }: any) => {
    const router = useRouter();
    const handleStartTransition = () => {
        const transitionContainer = document.querySelector("." + TransitionStyles.container) as HTMLElement;
        (transitionContainer) ? transitionContainer.style.opacity = "0" : null;
    };
    const handleCompleteTransition = () => {
        const transitionContainer = document.querySelector("." + TransitionStyles.container) as HTMLElement;
        (transitionContainer) ? transitionContainer.style.opacity = "1" : null;
    };
    useEffect(() => {
        router.events.on("routeChangeStart", handleStartTransition);
        router.events.on("routeChangeComplete", handleCompleteTransition);
        router.events.on("routeChangeError", handleCompleteTransition);
        return () => {
            router.events.off("routeChangeStart", handleStartTransition);
            router.events.off("routeChangeComplete", handleCompleteTransition);
            router.events.off("routeChangeError", handleCompleteTransition);
        };
    }, [ router ]);
    return <div className={ TransitionStyles.container }>
        { children }
    </div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Transition;