/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { GetServerSideProps } from "next";
import type { TPage } from "@typescript/types/TPage";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Onboarding */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Onboarding = (params: TPage): JSX.Element => {
	const { t } = useTranslation("onboarding");
    return <Fragment>
		<Head>
			<title>{ t("onboardingMetaTitle") }</title>
			<meta name="description" content={ t("onboardingMetaDescription") }/>
		</Head>
        <div data-page="onboarding">

        </div>
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async ({ res, locale, locales }) => {
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
    return {
        redirect: {
            destination: "https://onboarding.forinov.net",
            permanent: false
        },
        props: {
			...(await serverSideTranslations(locale || "fr", [ "onboarding", "navbar", "footer", "common" ])),
			locales
		}
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Onboarding;
export { getServerSideProps };