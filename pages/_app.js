/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../config.json";
import translations from "../translations.json";
import "../public/stylesheets/sources/bootstrap.min.css";
import "../public/stylesheets/sources/theme.css";
import "../public/stylesheets/base.css";
import "../public/stylesheets/pages.css";
import "../public/stylesheets/components.css";
import "../public/stylesheets/widgets.css";

import "../public/stylesheets/layout/navbar.css";
import "../public/stylesheets/layout/footer.css";

import '../public/stylesheets/pages/login.css'

import '../public/stylesheets/components/annuaire_searchbar.css'

import Navbar from '../layout/header/Navbar';
import Footer from '../layout/footer/Footer';

import {useRouter} from 'next/router'
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* App */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
function App({ Component, pageProps }) {

    const router = useRouter()

    const language = "en";
    const session = null;
    pageProps.translations = translations[language];
    pageProps.session = session;
    pageProps.lock = (session) ? false : true;
    return (<>
        <div className="container col-md-10 col-sm-11 col-12 col-xl-9 py-6">
        {(router.pathname !== '/login' && router.pathname !== '/register') ? <Navbar /> : null}
            <Component {...pageProps} />
        {(router.pathname !== '/login' && router.pathname !== '/register') ? <Footer /> : null}
        </div>
    </>
    );
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default App;