/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
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
/* Login */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Login = (params: TPage): JSX.Element => {
	const { t } = useTranslation("login");
    return <Fragment>
		<Head>
			<title>{ t("loginMetaTitle") }</title>
			<meta name="description" content={ t("loginMetaDescription") }/>
		</Head>
        <div data-page="login">
            
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
            destination: "https://forinov.fr/login",
            permanent: false
        },
        props: {
			...(await serverSideTranslations(locale || "fr", [ "login", "navbar", "footer", "common" ])),
			locales
		}
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Login;
export { getServerSideProps };