/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { MouseEventHandler, useEffect, useState } from "react";
import { preciseTarget, scrollTo } from "../../scripts/utilities";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Input from "../fields/input";
import Button from "../buttons/button";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import PaginationStyles from "../../public/stylesheets/components/pagination/Pagination.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Pagination */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Pagination = (pageProps: any) => {
	const { pages, search, action, states } = pageProps;
	const { translations } = states;
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ showPageInput, setShowPageInput ] = useState(false);
	const selectPage: MouseEventHandler = (event) => {
		const target = preciseTarget(event as any);
		const selectedPage = target.querySelector("span")?.innerText;
		if(selectedPage) {
			setCurrentPage(parseInt(selectedPage));
		};
	};
	const nextPage: MouseEventHandler = () => {
		if(currentPage < pages) {
			setCurrentPage(currentPage + 1);
		};
	};
	const previousPage: MouseEventHandler = () => {
		if(currentPage > 1) {
			setCurrentPage(currentPage - 1);
		};
	};
	const setPage = (event: any) => {
        event.preventDefault();
        const target = event.target as HTMLInputElement;
        const page = target.value || null;
		if(page && parseInt(page) > 1 && parseInt(page) <= pages) {
			setCurrentPage(parseInt(page));
		} else {
			setCurrentPage(1);
		};
	};
	const showPagination = () => {
		const buttons = [];
		for(let page = 1; page <= pages; page++) {
			let count = (currentPage === 1 || currentPage === pages) ? 2 : 1;
			if((page >= currentPage - count && page < currentPage) || (page >= currentPage && page <= currentPage + count && page <= pages - 1)) {
				buttons.push(<Button key={ page } button={ (page === currentPage) ? ButtonStyles.callToActionRoundedIcon : ButtonStyles.callToActionAlternativeRoundedIcon } action={ selectPage } text={ page.toString() }/>);
			};
		};
		return buttons;
	};
	useEffect(() => {
		if(action) {
			action({ ...search, page: currentPage });
		};
		scrollTo(0, 0);
		setShowPageInput(false);
	}, [ action, currentPage ]);
	useEffect(() => {
		setCurrentPage(search.page);
	}, [ search.page ]);
	return <div className={ PaginationStyles.container }>
		<div className={ PaginationStyles.actions }>
			<Button button={ ButtonStyles.callToAction } action={ previousPage } icon="fa-light fa-arrow-left" text={ translations["Précédent"] }/>
			{ showPagination() }
			{ (pages >= 5 ) ? <div className={ PaginationStyles.typePage }>
				{ (showPageInput) ? <div className={ PaginationStyles.custom }>
					<Input type="text" name="page" action={ setPage }/>
				</div> : null }
				<Button button={ ButtonStyles.callToActionAlternativeRoundedIcon } action={ () => setShowPageInput(!showPageInput) } icon="fa-light fa-ellipsis"/>
			</div> : null }
			<Button button={ (pages === currentPage) ? ButtonStyles.callToActionRoundedIcon : ButtonStyles.callToActionAlternativeRoundedIcon } action={ selectPage } text={ pages.toString() }/>
			<Button button={ ButtonStyles.callToAction } action={ nextPage } icon="fa-light fa-arrow-right" text={ translations["Suivant"] }/>
		</div>
		<p>{ pages + " " + translations["Pages trouvées"].toLowerCase() }</p>
	</div>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Pagination;