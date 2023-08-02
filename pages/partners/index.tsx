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
import PartnersStyles from "@pages/partners/Partners.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Partners */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Partners = (params: PageType): JSX.Element => {
	const { t } = useTranslation("partners");
	const { opportunities, logos } = params;
	return <Fragment>
        <Head>
			<title>{ t("partnersMetaTitle", { company: "Forinov" }) }</title>
			<meta name="description" content={ t("partnersMetaDescription", { company: "Forinov" }) }/>
		</Head>
		<div data-page="partners">
			<div className={ PartnersStyles.mainContainer }>
				<div className="boxedContent">
                    <div className={ PartnersStyles.containerTitle }>
						<h1>{ t("partnersHeaderTitle") }</h1>
					</div>
                    <div className={ PartnersStyles.header }>
						<div className={ PartnersStyles.headerLeftContainer }>
                        <div className={ PartnersStyles.headerParagraphs }>
								<p>{ t("partnersHeaderParagraph") }</p>
							</div>
							<div className={ PartnersStyles.headerActions }>
                                <LinkButton classList="primary" href="/onboarding" text={ t("partnersHeaderJoinLink") }/>
							</div>
						</div>
						<div className={ PartnersStyles.headerRightContainer }>
							<CustomImage src="/assets/home.gif" alt={ t("aboutHeaderIllustrationAlt") }/>
						</div>
					</div>
				</div>
			</div>
            <div className={ PartnersStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ PartnersStyles.containerTitle }>
						<h2>{ t("partnersHowItWorksTitle") }</h2>
						<p>{ t("partnersHowItWorksText", { company: "Forinov" }) }</p>
					</div>
					<div className={ PartnersStyles.howItWorks }>
						<div className={ PartnersStyles.howItWorksStep }>
							<div className={ PartnersStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/partners/step_1.png" alt={ t("") }/>
							</div>
							<div className={ PartnersStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-chevron-down"/>
							</div>
							<div className={ PartnersStyles.howItWorksStepText }>
								<p>{ t("partnersHowItWorksStepTitle1") }</p>
								<p><Trans i18nKey="partnersHowItWorksStepText1" t={ t } components={ {
									onboarding: <LinkButton classList="link noUppercase" href="/onboarding"/>
								} }/></p>
							</div>
						</div>
						<div className={ PartnersStyles.howItWorksStep }>
							<div className={ PartnersStyles.howItWorksStepText }>
								<p>{ t("partnersHowItWorksStepTitle2") }</p>
								<p><Trans i18nKey="partnersHowItWorksStepText2" t={ t } components={ {
									corporatesDirectory: <LinkButton classList="link noUppercase" href="/corporates/directory"/>,
									opportunitiesDirectory: <LinkButton classList="link noUppercase" href="/opportunities/directory"/>
								} }/></p>
							</div>
							<div className={ PartnersStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-chevron-down"/>
							</div>
							<div className={ PartnersStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/partners/step_2.png" alt={ t("") }/>
							</div>
						</div>
						<div className={ PartnersStyles.howItWorksStep }>
							<div className={ PartnersStyles.howItWorksStepPicture }>
								<CustomImage src="/assets/landings/partners/step_3.png" alt={ t("") }/>
							</div>
							<div className={ PartnersStyles.howItWorksStepSeparator }>
								<LineSeparator classList="vertical"/>
								<i className="fa-light fa-check"/>
							</div>
							<div className={ PartnersStyles.howItWorksStepText }>
								<p>{ t("partnersHowItWorksStepTitle3") }</p>
								<p>{ t("partnersHowItWorksStepText3") }</p>
							</div>
						</div>
					</div>
					<div className={ PartnersStyles.containerTitle }>
						<h3>{ t("partnersLatestOpportunitiesTitle") }</h3>
					</div>
					<DefaultCarousel items={ opportunities } itemsType="opportunities" navigation="bar"  controls indicators links/>
				</div>
			</div>
            <div className={ PartnersStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ PartnersStyles.containerTitle }>
						<h3>{ t("partnersBadgesTitle", { company: "Forinov" }) }</h3>
					</div>
					<div className={ PartnersStyles.badges }>
						<div className={ PartnersStyles.badge }>
							<i className="fa-light fa-chart-network"/>
							<p>{ t("partnersBadgeTitle1") }</p>
							<p><Trans i18nKey="partnersBadgeText1" t={ t } components={ {
								opportunitiesDirectory: <LinkButton classList="link noUppercase" href="/opportunities/directory"/>
							} }/></p>
							<LineSeparator classList="horizontal"/>
						</div>
						<div className={ PartnersStyles.badge }>
							<i className="fa-light fa-badge-check"/>
							<p>{ t("partnersBadgeTitle2") }</p>
							<p>{ t("partnersBadgeText2") }</p>
							<LineSeparator classList="horizontal"/>
						</div>
						<div className={ PartnersStyles.badge }>
							<i className="fa-light fa-gauge-high"/>
							<p>{ t("partnersBadgeTitle3") }</p>
							<p>{ t("partnersBadgeText3") }</p>
							<LineSeparator classList="horizontal"/>
						</div>
					</div>
				</div>
			</div>
            <div className={ PartnersStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ PartnersStyles.containerTitle }>
						<h4>{ t("partnersTheyTrustTitle") }</h4>
					</div>
					<InfiniteCarousel items={ logos } itemsType="logos"/>
					<div className={ PartnersStyles.containerTitle }>
						<h5>{ t("partnersFreeTitle", { company: "Forinov" }) }</h5>
						<p>{ t("partnersFreeText") }</p>
						<LinkButton classList="primary" href="/onboarding" text={ t("partnersOnboardingLink") }/>
					</div>
					<div className={ PartnersStyles.containerTitle }>
						<h4>{ t("partnersQuestionsTitle") }</h4>
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
                ...(await serverSideTranslations(locale || "fr", [ "partners", "navbar", "footer", "common" ], i18next)),
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
export default Partners;
export { getServerSideProps };