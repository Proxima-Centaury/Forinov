/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation, Trans } from "next-i18next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import ClassicButton from "@buttons/classicButton";
import LinkButton from "@buttons/linkButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { MouseEventHandler } from "react";
import type { AccordionType } from "@typescript/types/AccordionType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import AccordionStyles from "@accordions/Accordion.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Accordion */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Accordion = (params: AccordionType) => {
	const dictionnary = params.type;
    const { t } = useTranslation([ dictionnary, "common" ]);
	const { type } = params;
	const expandContent: MouseEventHandler = (event) => {
		const target = event.target as Element;
		const preciseTarget = target.closest("button");
		const parent = preciseTarget?.parentElement;
		parent?.classList.toggle(AccordionStyles.active);
		const maxHeight = (maxHeight: Number) => (maxHeight > 400) ? 400 : maxHeight;
		const content = preciseTarget?.nextElementSibling as HTMLElement;
		content.style.maxHeight = (parent?.classList.contains(AccordionStyles.active)) ? maxHeight(content.scrollHeight + (3 * 16)) + "px" : "0px";
	};
	const sections: any = Object.entries(require("@configurations/accordions.json").landings[type]);
	return <div className={ AccordionStyles.container }>
		<div className={ AccordionStyles.actions }>
			{ sections.map((section: any, key: number) => <Fragment key={ key }>
				<ClassicButton classList="tertiary" text={ section[0] }/>
			</Fragment>) }
		</div>
		<div className={ AccordionStyles.wrapper }>
			{ sections.map((section: any, key: number) => <div key={ key } className={ AccordionStyles.section }>			
				{ section[1].map(({ question, answer }: any, key: number) => <div key={ key } className={ AccordionStyles.QA }>
					<button className={ AccordionStyles.question } onClick={ expandContent }>
						<span>{ t(question, { company: "Forinov" }) }</span>
						<i className="fa-solid fa-chevron-right"/>
					</button>
					<div className={ AccordionStyles.answer }>
						<p><Trans i18nKey={ answer } t={ t } components={ {
							callsForProposals: <LinkButton classList="link noUppercase" href="/opportunities/directory/calls_for_proposals_1"/>,
							corporatesDirectory: <LinkButton classList="link noUppercase" href="/corporates/directory"/>,
							onboarding: <LinkButton classList="link noUppercase" href="/onbonarding"/>,
							opportunitiesDirectory: <LinkButton classList="link noUppercase" href="/opportunities/directory"/>,
							partnersDirectory: <LinkButton classList="link noUppercase" href="/partners/directory"/>,
							startupsDirectory: <LinkButton classList="link noUppercase" href="/startups/directory"/>,
						} } values={ { company: "Forinov" } }/></p>
					</div>
				</div>) }
			</div>) }
		</div>
		<div className={ AccordionStyles.contact }>
			<p>{ t("common:questionsContactText") }<LinkButton classList="link noUppercase" href="/contact" text={ t("common:questionsContactLink") }/>.</p>
		</div>
	</div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Accordion;