/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import { useState } from "react";
import Navbar from "../layout/navbar";
import Modal from "../layout/modal";
import Footer from "../layout/footer";
import translations from "../translations.json";
// import "../public/stylesheets/sources/bootstrap.min.css";
// import "../public/stylesheets/sources/theme.css";
import "../public/stylesheets/base.css";
import "../public/stylesheets/navbar.css";
import "../public/stylesheets/footer.css";
import "../public/stylesheets/pages.css";
import "../public/stylesheets/components.css";
// import "../public/stylesheets/widgets.css";

import "../public/stylesheets/components/annuaire_searchbar.css"


import "../public/stylesheets/pages/login.css"
import "../public/stylesheets/pages/annuaire_su.css"
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* App */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
function App({ Component, pageProps }) {
    const [ language, setLanguage ] = useState("fr");
    const [ session, setSession ] = useState(false);
    const [ modal, setModal ] = useState(null);
    pageProps.language = language;
    pageProps.setLanguage = setLanguage;
    pageProps.translations = translations[language];
    pageProps.session = session;
    pageProps.setSession = setSession;
    pageProps.lock = (session) ? false : true;
    pageProps.modal = modal;
    pageProps.setModal = setModal;
    return <>
        <Navbar { ...pageProps }/>
        <div className="container">
            <Component { ...pageProps }/>
            <Footer { ...pageProps }/>
        </div>
        <Modal { ...pageProps }/>
    </>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default App;