/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import AccordionStyles from "../../public/stylesheets/components/accordions/Accordion.module.css";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Accordion */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const Accordion = ({ data, translations }: any) => {
	const expandContent = (event: MouseEvent) => {
		const target = event.target as Element;
		const preciseTarget = target.closest("button");
		const parent = preciseTarget?.parentElement;
		parent?.classList.toggle(AccordionStyles.active);
		const content = preciseTarget?.nextElementSibling as HTMLElement;
		content.style.maxHeight = (parent?.classList.contains(AccordionStyles.active)) ? content.scrollHeight + (3 * 16) + "px" : "0px";
		content.style.padding = (parent?.classList.contains(AccordionStyles.active)) ? "16px" : "0px";
	};
	return <div className={ AccordionStyles.container }>
		{ data.map(({ button, content }: any, key: KeyType) => <div key={ key }>
			<button className={ AccordionStyles.button } onClick={ expandContent }>{ translations[button] + " ?" }<i className="fa-light fa-chevron-down"/></button>
			<div className={ AccordionStyles.content }>
				{ (content) ? content : "Lorem ipsum sit amet, dolor adipiscim consectetur...".repeat(100) }
			</div>
		</div>) }
	</div>;
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Accordion;