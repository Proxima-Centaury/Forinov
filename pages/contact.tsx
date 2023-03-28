import { GetServerSideProps } from 'next';
import { useState } from 'react'


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
                <Carousel {...pageProps} component="StartupAccordions" data={Object.values(contact)} />
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

const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);
    return {
        props: {
            locale, locales, defaultLocale,
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export { getServerSideProps };
