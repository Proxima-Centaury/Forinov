import { GetServerSideProps } from 'next';
import React from 'react'


import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";
import HomeStyles from "../public/stylesheets/pages/Home.module.css";

import Carousel from "../components/carousels/carousel";

export default function Contact(pageProps: any) {
    const { startups, logos, states, accordionsConfigurations, router }: any = pageProps;
    const { metadatas, translations }: any = states;
    const { landings }: any = accordionsConfigurations;

    return (
        <main>
            <div className={HomeStyles.questions} data-type="contact">
                <h5>{translations["Les réponses à vos questions"]}</h5>
                <Carousel {...pageProps} component="StartupAccordions" data={Object.values(landings.contact)} />
            </div>
        </main>
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
