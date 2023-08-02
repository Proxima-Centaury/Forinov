/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import api from "@classes/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import DefaultCarousel from "@carousels/defaultCarousel";
import InfiniteCarousel from "@carousels/infiniteCarousel";
import CustomImage from "@contents/customImage";
import LinkButton from "@buttons/linkButton";
import LineSeparator from "@separators/lineSeparator";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { GetServerSideProps } from "next";
import type { PageType } from "@typescript/types/PageType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import CorporatesStyles from "@pages/corporates/Corporates.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Startups */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Startups = (params: PageType): JSX.Element => {
	const { t } = useTranslation("corporates");
	const { opportunities, logos } = params;
	return <Fragment>
        <Head>
			<title>{ t("corporatesMetaTitle", { company: "Forinov" }) }</title>
			<meta name="description" content={ t("corporatesMetaDescription", { company: "Forinov" }) }/>
		</Head>
		<div data-page="corporates">
			<div className={ CorporatesStyles.mainContainer }>
				<div className="boxedContent">
                    <div className={ CorporatesStyles.containerTitle }>
						<h1>{ t("corporatesHeaderTitle") }</h1>
					</div>
                    <div className={ CorporatesStyles.header }>
						<div className={ CorporatesStyles.headerLeftContainer }>
                        <div className={ CorporatesStyles.headerParagraphs }>
								<p>{ t("corporatesHeaderParagraph") }</p>
							</div>
							<div className={ CorporatesStyles.headerActions }>
                                <LinkButton classList="primary" href="/onboarding" text={ t("corporatesHeaderJoinLink") }/>
							</div>
						</div>
						<div className={ CorporatesStyles.headerRightContainer }>
							<CustomImage src="/assets/home.gif" alt={ t("aboutHeaderIllustrationAlt") }/>
						</div>
					</div>
				</div>
			</div>
            <div className={ CorporatesStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ CorporatesStyles.containerTitle }>
						<h2>{ t("corporatesHowItWorksTitle") }</h2>
						<p>{ t("corporatesHowItWorksText", { company: "Forinov" }) }</p>
					</div>
					<div className={ CorporatesStyles.howItWorks }>
						<div className={ CorporatesStyles.howItWorksStep }>
							<div className={ CorporatesStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/corporates/step_1.png" alt={ t("") }/>
							</div>
							<div className={ CorporatesStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-chevron-down"/>
							</div>
							<div className={ CorporatesStyles.howItWorksStepText }>
								<p>{ t("corporatesHowItWorksStepTitle1") }</p>
								<p><Trans i18nKey="corporatesHowItWorksStepText1" t={ t } components={ {
									onboarding: <LinkButton classList="link noUppercase" href="/onboarding"/>
								} }/></p>
							</div>
						</div>
						<div className={ CorporatesStyles.howItWorksStep }>
							<div className={ CorporatesStyles.howItWorksStepText }>
								<p>{ t("corporatesHowItWorksStepTitle2") }</p>
								<p><Trans i18nKey="corporatesHowItWorksStepText2" t={ t } components={ {
									corporatesDirectory: <LinkButton classList="link noUppercase" href="/corporates/directory"/>,
									opportunitiesDirectory: <LinkButton classList="link noUppercase" href="/opportunities/directory"/>
								} }/></p>
							</div>
							<div className={ CorporatesStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-chevron-down"/>
							</div>
							<div className={ CorporatesStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/corporates/step_2.png" alt={ t("") }/>
							</div>
						</div>
						<div className={ CorporatesStyles.howItWorksStep }>
							<div className={ CorporatesStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/corporates/step_3.png" alt={ t("") }/>
							</div>
							<div className={ CorporatesStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-check"/>
							</div>
							<div className={ CorporatesStyles.howItWorksStepText }>
								<p>{ t("corporatesHowItWorksStepTitle3") }</p>
								<p>{ t("corporatesHowItWorksStepText3") }</p>
							</div>
						</div>
					</div>
					<div className={ CorporatesStyles.containerTitle }>
						<h3>{ t("corporatesLatestOpportunitiesTitle") }</h3>
					</div>
					<DefaultCarousel items={ opportunities } itemsType="opportunities" navigation="bar"  controls indicators links/>
				</div>
			</div>
            <div className={ CorporatesStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ CorporatesStyles.containerTitle }>
						<h3>{ t("corporatesBadgesTitle", { company: "Forinov" }) }</h3>
					</div>
					<div className={ CorporatesStyles.badges }>
						<div className={ CorporatesStyles.badge }>
							<i className="fa-light fa-chart-network"/>
							<p>{ t("corporatesBadgeTitle1") }</p>
							<p><Trans i18nKey="corporatesBadgeText1" t={ t } components={ {
								opportunitiesDirectory: <LinkButton classList="link noUppercase" href="/opportunities/directory"/>
							} }/></p>
							<LineSeparator classList="horizontal"/>
						</div>
						<div className={ CorporatesStyles.badge }>
							<i className="fa-light fa-badge-check"/>
							<p>{ t("corporatesBadgeTitle2") }</p>
							<p>{ t("corporatesBadgeText2") }</p>
							<LineSeparator classList="horizontal"/>
						</div>
						<div className={ CorporatesStyles.badge }>
							<i className="fa-light fa-gauge-high"/>
							<p>{ t("corporatesBadgeTitle3") }</p>
							<p>{ t("corporatesBadgeText3") }</p>
							<LineSeparator classList="horizontal"/>
						</div>
					</div>
				</div>
			</div>
            <div className={ CorporatesStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ CorporatesStyles.containerTitle }>
						<h4>{ t("corporatesTheyTrustTitle") }</h4>
					</div>
					<InfiniteCarousel items={ logos } itemsType="logos"/>
					<div className={ CorporatesStyles.containerTitle }>
						<h5>{ t("corporatesFreeTitle", { company: "Forinov" }) }</h5>
						<p>{ t("corporatesFreeText") }</p>
						<LinkButton classList="primary" href="/onboarding" text={ t("corporatesOnboardingLink") }/>
					</div>
					<div className={ CorporatesStyles.containerTitle }>
						<h4>{ t("corporatesQuestionsTitle") }</h4>
					</div>
				</div>
			</div>
		</div>
	</Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async ({ res, locale, locales }) => {
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	const i18next = require("@project/next-i18next.config");
	const getOpportunities = await api.getLandingOpportunities("next", "Landing", locale);
	const getLogos = await api.getLandingLogos("next", "Landing", locale);
	if(getOpportunities instanceof Error || getLogos instanceof Error) {
		return {
			redirect: {
				destination: "/500",
				permanent: false
			}
		};
	} else {
        return {
            props: {
                ...(await serverSideTranslations(locale || "fr", [ "corporates", "navbar", "footer", "common" ], i18next)),
                locales,
				opportunities: getOpportunities.response.opportunities,
				logos: getLogos.response.logos
            }
        };
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Startups;
export { getServerSideProps };