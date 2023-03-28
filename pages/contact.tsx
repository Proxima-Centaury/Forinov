/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { GetStaticProps } from "next";


import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
import HomeStyles from "../public/stylesheets/pages/Home.module.css";
import Input from '../components/fields/input';

import Carousel from "../components/carousels/carousel";
import Modal from '../layout/modal';

export default function Contact(pageProps: any) {
    const { startups, logos, states, accordionsConfigurations, router }: any = pageProps;
    const { metadatas, translations }: any = states;
    const { contact }: any = accordionsConfigurations;

    const { stateSetters }: any = pageProps
    const { setModal }: any = stateSetters;
    

    return (<>
        <main style={{
            paddingBottom: "2rem",
        }}>
            <div className={HomeStyles.questions} data-type="contact">
                <h5>{translations["Les réponses à vos questions"]}</h5>
                <Carousel {...pageProps} component="StartupAccordions" data={Object.values(contact)} noActions/>
            </div>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <button className={ButtonStyles.callToAction}
                    onClick={() => {
                        setModal("contact");
                    }}
                >
                    Nous contacter
                </button>
            </div>
        </main>
    </>
    )
}
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Static Props */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const getStaticProps: GetStaticProps = async (context) => ({ props: { ...context } });
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export { getStaticProps };