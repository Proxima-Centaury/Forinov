/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useRouter } from "next/router";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import api from "@classes/api";
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
import DefaultCarousel from "@carousels/defaultCarousel";
import Testimonials from "@contents/testimonials";
import LinkButton from "@buttons/linkButton";
import LineSeparator from "@separators/lineSeparator";
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
import HomeStyles from "@pages/Home.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Home */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Home = (params: TPage): JSX.Element => {
	const router = useRouter();
	const { locale } = router;
	const { t } = useTranslation("home");
	const { landing, startups, opportunities } = params;
	const { articles, categories, counters } = landing;
	const homeHeaderLinks: TButton[] = require("@configurations/links.json").home.header;
	const homeStructuresLinks: TButton[] = require("@configurations/links.json").home.structures;
	return <Fragment>
		<Head>
			<title>{ t("homeMetaTitle") }</title>
			<meta name="description" content={ t("homeMetaDescription") }/>
		</Head>
		<div data-page="home">
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
								{ homeHeaderLinks.map(({ classList, href, icon, text }: TButton, key: number) => {
									const translatedText = (text) ? t(text) : undefined;
									const dynamicParams = { classList, href, icon, text: translatedText };
									return <LinkButton key={ key } { ...dynamicParams }/>;
								}) }
							</div>
						</div>
						<div className={ HomeStyles.headerRightContainer }>
							<Image src="/assets/home.gif" alt={ t("homeHeaderIllustrationAlt") } width="500" height="500" priority/>
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
					<div className="grid threeColumns">
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
								<LinkButton classList="primary" href="/onboarding" text={ t("homeJoinOnbardingLink") } locale={ locale }/>
								<LinkButton classList="link" href="/startups" text={ t("homeJoinFindOutMoreLink") } locale={ locale }/>
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
								<LinkButton classList="primary" href="/onboarding" text={ t("homeJoinOnbardingLink") } locale={ locale }/>
								<LinkButton classList="link" href="/corporates" text={ t("homeJoinFindOutMoreLink") } locale={ locale }/>
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
								<LinkButton classList="primary" href="/onboarding" text={ t("homeJoinOnbardingLink") } locale={ locale }/>
								<LinkButton classList="link" href="/partners" text={ t("homeJoinFindOutMoreLink") } locale={ locale }/>
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
					<div className="grid threeColumns">
						<div className={ HomeStyles.communitySection }>
							<p>{ t("homeCommunitySectionTitle1") }<i className="fa-solid fa-star"/></p>
							<p>{ t("homeCommunitySectionText1") }</p>
						</div>
						<div className={ HomeStyles.communitySection }>
							<p>{ t("homeCommunitySectionTitle2") }<i className="fa-solid fa-star"/></p>
							<p>{ t("homeCommunitySectionText2") }</p>
						</div>
						<div className={ HomeStyles.communitySection }>
							<p>{ t("homeCommunitySectionTitle3") }<i className="fa-solid fa-star"/></p>
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
					<DefaultCarousel items={ startups } itemsType="startups" navigation="bar"/>
					<div className={ HomeStyles.containerTitle }>
						<h5>{ t("homeStartupsCategoriesTitle", { startups: counters.startups.total, categories: counters.startups.categories }) }</h5>
					</div>
					<div className={ HomeStyles.startupsCategoriesSection }>
						{ categories.startups.map((category: any, key: number) => {
							const url = `/directories/startups/${ formatForUrl(category.name) }_${ category.id }`;
							return (category.name) ? <LinkButton key={ key } classList="tertiary" href={ url } text={ category.name }/> : null;
						}) }
					</div>
					<div className={ HomeStyles.containerTitle }>
						<h6>{ t("homeLatestOpportunitiesTitle") }</h6>
					</div>
					<DefaultCarousel items={ opportunities } itemsType="opportunities" navigation="bar"/>
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
						{ homeStructuresLinks.map(({ classList, href, text }: TButton, key: number) => {
							const translatedText = (text) ? t(text) : undefined;
							const dynamicParams = { classList, href, text: translatedText };
							return <LinkButton key={ key } { ...dynamicParams }/>;
						}) }
					</div>
				</div>
			</div>
			<div className={ HomeStyles.mainContainer }>
				<div className="boxedContent">
					<div className={ HomeStyles.containerTitle }>
						<h6>{ t("homeTestimonialsTitle") }</h6>
					</div>
					<Testimonials/>
					<div className={ HomeStyles.containerTitle }>
						<h6>{ t("homeArticlesTitle") }</h6>
					</div>
					<DefaultCarousel items={ articles } itemsType="articles" navigation="bar"/>
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
	return {
		props: {
			...(await serverSideTranslations(locale || "fr", [ "common", "navbar", "footer", "home" ])),
			locales,
			landing: await api.getLanding("next", "Landing", locale),
			opportunities: await api.getLandingOpportunities("next", "Landing", locale),
			startups: await api.getLandingStartups("next", "Landing", locale)
		}
	};
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Home;
export { getServerSideProps };