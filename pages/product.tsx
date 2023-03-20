import { GetServerSideProps } from "next";

import api from "../scripts/api";

import ProductStyles from "../public/stylesheets/pages/Product.module.css";
import ButtonStyles from "../public/stylesheets/components/buttons/Button.module.css";

import Image from 'next/image';
import Link from "next/link";

export default function Folder(pageProps: any) {
    const { products, states, stateSetters } = pageProps;
    const { translations } = states;

    const product = products[0];
    console.log(product);

    const businessModel = Object.values(product.BUSINESSMODEL).join(", ");
    const economicModel = Object.values(product.ECONOMICMODEL).join(", ");
    const technologies = Object.values(product.TECHNOLOGIES).join(", ");
    const targetCompanies = Object.values(product.TARGETCOMPAGNIES).join(", ");
    const targetSectors = Object.values(product.TARGETSECTORS).join(", ");


    return (
        <section className={"container"}>
            <div className={ProductStyles.imageWrapper}>
                <Image
                    src={product.PICTURE}
                    alt={product.NAME}

                ></Image>
            </div>
            <div>
                <h1 className={ProductStyles.name}>{product.NAME}</h1>
                <div className={ProductStyles.spacer}></div>
            </div>
            <p>{product.DESCRIPTION}</p>
            <div
                className={ProductStyles.table}
            >
                <div className={ProductStyles.row}>
                    <span>{translations["Maturité"]}</span>
                    <span>{product.MATURITY[0]}</span>
                </div>
                <div className={ProductStyles.row}>
                    <span>{ translations["Modèle économique"]}</span>
                    <span>{economicModel}</span>
                </div>
                <div className={ProductStyles.row}>
                    <span>{ translations["Ordre de prix"]}</span>
                    <span>{product.PRICE} €</span>
                </div>
                <div className={ProductStyles.row}>
                    <span>{translations["Clients actuels"]}</span>
                    <span>{product.CLIENTS}</span>
                </div>
                <div className={ProductStyles.row}>
                    <span>{translations["Modèle"]}</span>
                    <span>{businessModel}</span>
                </div>
                <div className={ProductStyles.row}>
                    <span>{ translations["Technologies"]}</span>
                    <span>{technologies}</span>
                </div>
                <div className={ProductStyles.row}>
                    <span>{translations["Entreprises Cible"] }</span>
                    <span>{targetCompanies}</span>
                </div>

                <div className={ProductStyles.row}>
                    <span>{translations["Secteurs Cible"]}</span>
                    <span>{targetSectors}</span>
                </div>
            </div>
            <div className={ProductStyles.actions}>
                <Link
                    href={product.LINK}
                    className={ProductStyles.link}
                >
                    {translations["Voir la vidéo de présentation"]}
                </Link>
                <Link
                    href={'/login'}
                    className={ButtonStyles.callToAction}
                    style={{
                        color: "var(--perfect-white-color)"
                    }}
                >
                    {translations["Faire une demande"]}
                </Link>
            </div>
        </section>
    )
}



const getServerSideProps: GetServerSideProps = async (context) => {
    const { res, locale, locales, defaultLocale } = context;
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    const language = locale?.substring(0, 2);

    const products = await api.getProducts("entreprise", "5", "next", "Sorbonne", language);

    return {
        props: {
            locale, locales, defaultLocale, products
        }
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export { getServerSideProps };
