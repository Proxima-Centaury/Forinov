/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetServerSideProps } from "next";
import { DealsInterface } from "../../typescript/interfaces";
import { checkMatch } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Button from "../../components/buttons/button";
import Breadcrumb from "../../components/menus/breadcrumb";
import OpportunityCard from "../../components/cards/opportunity";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import HomeStyles from "../../public/stylesheets/pages/Home.module.css";
import DealsStyles from "../../public/stylesheets/pages/Deals.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Deals */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Deals = (pageProps: DealsInterface) => {
    const { router } = pageProps;
    const { category } = router.query;
    const newDealTest = {
        TYPE: [ { ID: 5, NAME: "Offre exclusive" } ],
        TITLE: "Test affichage deal",
        OFFER: "2 mois d'abonnement offerts",
        CATCH: "Économisez jusqu'à 500€",
        FORINOV: true,
        PRIVACY: "Privée",
        OWNERLOGO: router.basePath + "/assets/placeholders/woman.jpg",
        OWNERNAME: "Clara & Co.",
    };
    return <div id="deals" className="container">
        <div className={ DealsStyles.categories }>
            <Button button={ ButtonStyles.default } href={ "/deals/all" } text="Toutes" active={ checkMatch(router.asPath, "/deals/all") }/>
            <Button button={ ButtonStyles.default } href={ "/deals/finance" } text="Finance" active={ checkMatch(router.asPath, "/deals/finance") }/>
            <Button button={ ButtonStyles.default } href={ "/deals/human_ressources" } text="Ressources humaines" active={ checkMatch(router.asPath, "/deals/human_ressources") }/>
            <Button button={ ButtonStyles.default } href={ "/deals/sale" } text="Vente" active={ checkMatch(router.asPath, "/deals/sale") }/>
            <Button button={ ButtonStyles.default } href={ "/deals/softwares" } text="Logiciels" active={ checkMatch(router.asPath, "/deals/softwares") }/>
        </div>
        <Breadcrumb { ...pageProps }/>
        <div className={ DealsStyles.catch }>
            <h1>LES OFFRES EXCLUSIVES FORINOV</h1>
            <p>Forinov a négocié pour ses membres des deals exclusifs pour que vous ayez accès aux meilleures logiciels et locigiels à des conditions et tarifs imbattables !</p>
        </div>
        { (category) ? <div className={ HomeStyles.actions } data-justify="center">
            <Button button={ (checkMatch(router.asPath, "/deals/" + category + "/subcat1")) ? ButtonStyles.callToAction : ButtonStyles.callToActionOldGrey } href={ "/deals/" + category + "/subcat1" } text="Sous catégorie 1"/>
            <Button button={ (checkMatch(router.asPath, "/deals/" + category + "/subcat2")) ? ButtonStyles.callToAction : ButtonStyles.callToActionOldGrey } href={ "/deals/" + category + "/subcat2" } text="Sous catégorie 2"/>
            <Button button={ (checkMatch(router.asPath, "/deals/" + category + "/subcat3")) ? ButtonStyles.callToAction : ButtonStyles.callToActionOldGrey } href={ "/deals/" + category + "/subcat3" } text="Sous catégorie 3"/>
            <Button button={ (checkMatch(router.asPath, "/deals/" + category + "/subcat4")) ? ButtonStyles.callToAction : ButtonStyles.callToActionOldGrey } href={ "/deals/" + category + "/subcat4" } text="Sous catégorie 4"/>
            <Button button={ (checkMatch(router.asPath, "/deals/" + category + "/subcat5")) ? ButtonStyles.callToAction : ButtonStyles.callToActionOldGrey } href={ "/deals/" + category + "/subcat5" } text="Sous catégorie 5"/>
        </div> : null }
        <div className="grid twoColumns">
            <OpportunityCard { ...pageProps } opportunity={ newDealTest }/>
            <OpportunityCard { ...pageProps } opportunity={ newDealTest }/>
            <OpportunityCard { ...pageProps } opportunity={ newDealTest }/>
            <OpportunityCard { ...pageProps } opportunity={ newDealTest }/>
            <OpportunityCard { ...pageProps } opportunity={ newDealTest }/>
            <OpportunityCard { ...pageProps } opportunity={ newDealTest }/>
            <OpportunityCard { ...pageProps } opportunity={ newDealTest }/>
            <OpportunityCard { ...pageProps } opportunity={ newDealTest }/>
            <OpportunityCard { ...pageProps } opportunity={ newDealTest }/>
        </div>
    </div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Server Side Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    return {
        redirect: {
            destination: "/403",
            permanent: false
        },
        props: {
            locale, locales, defaultLocale
        }
    };
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Deals;
export { getServerSideProps };