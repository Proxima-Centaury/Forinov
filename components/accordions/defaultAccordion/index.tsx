/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */

/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Types */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import type { AccordionType } from "@typescript/types/AccordionType";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import AccordionStyles from "@accordions/Accordion.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Accordion */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Accordion = (params: AccordionType) => {
	// const {  } = params;
	// const expandContent = (event: any) => {
	// 	const target = event.target as Element;
	// 	const preciseTarget = target.closest("button");
	// 	const parent = preciseTarget?.parentElement;
	// 	parent?.classList.toggle(AccordionStyles.active);
	// 	const maxHeight = (maxHeight: Number) => (maxHeight > 400) ? 400 : maxHeight;
	// 	const content = preciseTarget?.nextElementSibling as HTMLElement;
	// 	content.style.maxHeight = (parent?.classList.contains(AccordionStyles.active)) ? maxHeight(content.scrollHeight + (3 * 16)) + "px" : "0px";
	// 	content.style.padding = (parent?.classList.contains(AccordionStyles.active)) ? "0px 16px 16px 16px" : "0px";
	// 	content.style.overflow = (parent?.classList.contains(AccordionStyles.active)) ? "auto" : "hidden";
	// };
	return <div className={ AccordionStyles.container }>
		{/* { data.map(({ button, content }: any, key: KeyType) => <div key={ key }>
			<div className={ AccordionStyles.content }>
                
			</div>
		</div>) } */}
	</div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Accordion;