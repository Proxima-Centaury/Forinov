/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { Key, useEffect, useRef, useState } from "react";
import apiInstance from "../utilities/classes/api";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Next Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import Head from "next/head";
import Image from "next/image";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LinkButton from "@actions/linkButton";
import LineSeparator from "@separators/lineSeparator";
import DefaultCarousel from "@carousels/defaultCarousel";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { GetServerSideProps } from "next";
import type { TPage } from "@typescript/types/TPage";
import type { TButton } from "@typescript/types/TButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Scripts */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { formatForUrl } from "@scripts/formatForUrl";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import HomeStyles from "@stylesheets/pages/Home.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Home */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Home = (pageProps: TPage): JSX.Element => {
	const router = useRouter();
	const { basePath } = router;
	const { t } = useTranslation("home");
	const { landing, startups, opportunities, states } = pageProps;
	const { articles, categories, counters } = landing;
	const { language } = states;
	const homeHeaderLinks: Array<TButton> = [
        {
            classList: "septary bigger narrow shadow scale",
            href: `/${ language }/directories/startups`,
            icon: "fa-solid fa-arrow-right",
            text: t("homeHeaderStartupsLink")
        },
        {
            classList: "septary bigger narrow shadow scale",
            href: `/${ language }/directories/corporates`,
            icon: "fa-solid fa-arrow-right",
            text: t("homeHeaderCorporatesLink")
        },
        {
            classList: "septary bigger narrow shadow scale",
            href: `/${ language }/directories/partners`,
            icon: "fa-solid fa-arrow-right",
            text: t("homeHeaderPartnersLink")
        },
        {
            classList: "septary bigger narrow shadow scale",
            href: `/${ language }/directories/opportunities`,
            icon: "fa-solid fa-arrow-right",
            text: t("homeHeaderOpportunitiesLink")
        }
    ];
	const homeStructuresLinks: Array<TButton> = [
		{
            classList: "tertiary",
            href: `/${ language }/onboarding`,
            text: t("homeStructureLink1")
        },
		{
            classList: "tertiary",
            href: `/${ language }/onboarding`,
            text: t("homeStructureLink2")
        },
		{
            classList: "tertiary",
            href: `/${ language }/onboarding`,
            text: t("homeStructureLink3")
        },
		{
            classList: "tertiary",
            href: `/${ language }/onboarding`,
            text: t("homeStructureLink4")
        },
		{
            classList: "tertiary",
            href: `/${ language }/onboarding`,
            text: t("homeStructureLink5")
        },
		{
            classList: "tertiary",
            href: `/${ language }/onboarding`,
            text: t("homeStructureLink6")
        },
		{
            classList: "tertiary",
            href: `/${ language }/onboarding`,
            text: t("homeStructureLink7")
        },
		{
            classList: "tertiary",
            href: `/${ language }/onboarding`,
            text: t("homeStructureLink8")
        },
		{
            classList: "tertiary",
            href: `/${ language }/onboarding`,
            text: t("homeStructureLink9")
        },
		{
            classList: "tertiary",
            href: `/${ language }/onboarding`,
            text: t("homeStructureLink10")
        }
	];
	return <Fragment>
		<Head>
			<title>{ t("homeMetaTitle") }</title>
			<meta name="description" content={ t("homeMetaDescription") }/>
		</Head>
		<div className={ HomeStyles.page } data-page="home">
			<div className={ HomeStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ HomeStyles.containerTitle }>
						<h1>{ t("homeHeaderTitle") }</h1>
					</div>
					<div className={ HomeStyles.header }>
						<div className={ HomeStyles.headerLeftContainer }>
							<div className={ HomeStyles.headerParagraphs }>
								<p>{ t("homeHeaderParagraph1") }</p>
								<p>{ t("homeHeaderParagraph2") }</p>
							</div>
							<div className={ HomeStyles.headerActions }>
								{ homeHeaderLinks.map((link: TButton, key: number) => <LinkButton key={ key } { ...link }/>) }
							</div>
						</div>
						<div className={ HomeStyles.headerRightContainer }>
							<Image src={ `${ basePath }/assets/home.gif` } alt={ t("homeHeaderIllustrationAlt") } width="500" height="500" priority/>
						</div>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ HomeStyles.containerTitle }>
						<h2>{ t("homeWhyJoinTitle") }</h2>
						<p>{ t("homeWhyJoinText") }</p>
					</div>
					<div className={ HomeStyles.joinCards }>
						<div className={ HomeStyles.joinCard }>
							<div className={ HomeStyles.joinCardHeader }>
								<i className="fa-light fa-rocket-launch"/>
								<div className={ HomeStyles.joinCardHeaderTitle }>
									<p>{ t("homeStartupJoinHeaderTitle") }</p>
									<p>{ t("homeStartupJoinHeaderText") }</p>
								</div>
							</div>
							<div className={ HomeStyles.joinCardBody }>
								<div className="formattedContent" dangerouslySetInnerHTML={ { __html: t("homeStartupJoinCardText1") } }/>
								<div className="formattedContent" dangerouslySetInnerHTML={ { __html: t("homeStartupJoinCardText2") } }/>
								<div className="formattedContent" dangerouslySetInnerHTML={ { __html: t("homeStartupJoinCardText3") } }/>
							</div>
							<LineSeparator/>
							<div className={ HomeStyles.joinCardFooter }>
								<LinkButton classList="primary" href={ `/${ language }/onboarding` } text={ t("homeJoinOnbardingLink") }/>
								<LinkButton classList="link" href={ `/${ language }/startups` } text={ t("homeJoinFindOutMoreLink") }/>
							</div>
						</div>
						<div className={ HomeStyles.joinCard }>
							<div className={ HomeStyles.joinCardHeader }>
								<i className="fa-light fa-buildings"/>
								<div className={ HomeStyles.joinCardHeaderTitle }>
									<p>{ t("homeCorporateJoinHeaderTitle") }</p>
									<p>{ t("homeCorporateJoinHeaderText") }</p>
								</div>
							</div>
							<div className={ HomeStyles.joinCardBody }>
								<div className="formattedContent" dangerouslySetInnerHTML={ { __html: t("homeCorporateJoinCardText1") } }/>
								<div className="formattedContent" dangerouslySetInnerHTML={ { __html: t("homeCorporateJoinCardText2") } }/>
								<div className="formattedContent" dangerouslySetInnerHTML={ { __html: t("homeCorporateJoinCardText3") } }/>
							</div>
							<LineSeparator/>
							<div className={ HomeStyles.joinCardFooter }>
								<LinkButton classList="primary" href={ `/${ language }/onboarding` } text={ t("homeJoinOnbardingLink") }/>
								<LinkButton classList="link" href={ `/${ language }/corporates` } text={ t("homeJoinFindOutMoreLink") }/>
							</div>
						</div>
						<div className={ HomeStyles.joinCard }>
							<div className={ HomeStyles.joinCardHeader }>
								<i className="fa-light fa-handshake-simple"/>
								<div className={ HomeStyles.joinCardHeaderTitle }>
									<p>{ t("homePartnerJoinHeaderTitle") }</p>
									<p>{ t("homePartnerJoinHeaderText") }</p>
								</div>
							</div>
							<div className={ HomeStyles.joinCardBody }>
								<div className="formattedContent" dangerouslySetInnerHTML={ { __html: t("homePartnerJoinCardText1") } }/>
								<div className="formattedContent" dangerouslySetInnerHTML={ { __html: t("homePartnerJoinCardText2") } }/>
								<div className="formattedContent" dangerouslySetInnerHTML={ { __html: t("homePartnerJoinCardText3") } }/>
							</div>
							<LineSeparator/>
							<div className={ HomeStyles.joinCardFooter }>
								<LinkButton classList="primary" href={ `/${ language }/onboarding` } text={ t("homeJoinOnbardingLink") }/>
								<LinkButton classList="link" href={ `/${ language }/partners` } text={ t("homeJoinFindOutMoreLink") }/>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ HomeStyles.containerTitle }>
						<h3>{ t("homeCommunitySectionsTitle") }</h3>
					</div>
					<div className={ HomeStyles.communitySections }>
						<div className={ HomeStyles.communitySection }>
							<p>{ t("homeCommunitySectionTitle1") }</p>
							<p>{ t("homeCommunitySectionText1") }</p>
						</div>
						<div className={ HomeStyles.communitySection }>
							<p>{ t("homeCommunitySectionTitle2") }</p>
							<p>{ t("homeCommunitySectionText2") }</p>
						</div>
						<div className={ HomeStyles.communitySection }>
							<p>{ t("homeCommunitySectionTitle3") }</p>
							<p>{ t("homeCommunitySectionText3") }</p>
						</div>
					</div>
				</div>
			</div>
			<div className={ HomeStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ HomeStyles.containerTitle }>
						<h4>{ t("homeLatestStartupsTitle") }</h4>
					</div>
					<DefaultCarousel classList="screen" items={ startups } itemsType="startups" navigation="bar"/>
					<div className={ HomeStyles.containerTitle }>
						<h5>{ t("homeStartupsCategoriesTitle", { startups: counters.startups.total, categories: counters.startups.categories }) }</h5>
					</div>
					<div className={ HomeStyles.startupsCategoriesSection }>
						{ categories.startups.map((category: any, key: number) => {
							const url = `/${ language }/directories/startups/${ formatForUrl(category.name) }_${ category.id }`;
							return (category.name) ? <LinkButton key={ key } classList="tertiary" href={ url } text={ category.name }/> : null;
						}) }
					</div>
					<div className={ HomeStyles.containerTitle }>
						<h4>{ t("homeLatestOpportunitiesTitle") }</h4>
					</div>
					{/* <DefaultCarousel items={ opportunities } navigation="bar"/> */}
				</div>
			</div>
			<div className={ HomeStyles.mainContainer }>
				<div className="boxedContent">

				</div>
			</div>
			<div className={ HomeStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ HomeStyles.containerTitle }>
						<h6>{ t("homeStructuresSectionTitle") }</h6>
						<p>{ t("homeStructuresSectionText") }</p>
					</div>
					<div className={ HomeStyles.structuresSection }>
						{ homeStructuresLinks.map((link: TButton, key: number) => <LinkButton key={ key } { ...link }/>) }
					</div>
				</div>
			</div>
			<div className={ HomeStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ HomeStyles.containerTitle }>
						<h6>{ t("homeTestimonialsTitle") }</h6>
					</div>
					{/* <DefaultCarousel items={ articles } navigation="bar"/> */}
					<div className={ HomeStyles.containerTitle }>
						<h6>{ t("homeArticlesTitle") }</h6>
					</div>
					{/* <DefaultCarousel items={ articles } navigation="bar"/> */}
				</div>
			</div>
		</div>
	</Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Server Side Props */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const getServerSideProps: GetServerSideProps = async (context) => {
	const { res, locale, locales } = context;
	res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=59");
	const language = locale?.substring(0, 2);
	return {
		props: {
			...(await serverSideTranslations(locale || "fr", [ "common", "home" ])),
			locales,
			landing: await apiInstance.getLanding("next", "Landing", language),
			opportunities: await apiInstance.getLandingOpportunities("next", "Landing", language),
			startups: await apiInstance.getLandingStartups("next", "Landing", language)
		}
	};
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Home;
export { getServerSideProps };