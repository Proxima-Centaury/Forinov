/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import Navbar from "../layout/header/Navbar";
import Footer from "../layout/footer/Footer";
import translations from "../translations.json";
import "../public/stylesheets/sources/bootstrap.min.css";
import "../public/stylesheets/sources/theme.css";
import "../public/stylesheets/base.css";
import "../public/stylesheets/pages.css";
import "../public/stylesheets/components.css";
import "../public/stylesheets/widgets.css";
import "../public/stylesheets/layout/navbar.css";
import "../public/stylesheets/layout/footer.css";
import "../public/stylesheets/pages/login.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* App */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
function App({ Component, pageProps }) {
    const language = "en";
    const session = null;
    pageProps.translations = translations[language];
    pageProps.session = session;
    pageProps.lock = (session) ? false : true;
    return <>
        <Navbar/>
        <div className="container col-md-10 col-sm-11 col-12 col-xl-9 py-6">
            <Component {...pageProps} />
        </div>
        <Footer/>
    </>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default App;