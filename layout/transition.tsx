/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useEffect, useState } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Loaders from "../components/loaders/loaders";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import TransitionStyles from "../public/stylesheets/layout/Transition.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Transition */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Transition = (transitionProps: any) => {
    const { children, router } = transitionProps;
    const [ loading, setLoading ] = useState(false);
    const [ loaded, setLoaded ] = useState(true);
    const handleStartTransition = (): Object => {
        setLoading(true);
        setLoaded(false);
        return { states: { loading: loading, loaded: loaded } };
    };
    const handleCompleteTransition = (): Object => {
        setLoading(false);
        setLoaded(true);
        return { states: { loading: loading, loaded: loaded } };
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
    return <div className={ TransitionStyles.container } data-page-loaded={ loaded }>
        { (loading) ? <Loaders { ...transitionProps } version={ 1 }/> : children }
    </div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Transition;