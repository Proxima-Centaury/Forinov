/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { MouseEventHandler, useEffect, useState } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
// import Input from "../fields/input";
import LinkButton from "@buttons/linkButton";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import PaginationStyles from "@pagination/Pagination.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Pagination */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Pagination = (params: any): JSX.Element => {
	const { children, pages, search, action, states } = params;
	const [ currentPage, setCurrentPage ] = useState(1);
	const [ showPageInput, setShowPageInput ] = useState(false);
	const nextPage: MouseEventHandler = () => (currentPage < pages) ? setCurrentPage(currentPage + 1) : null;
	const previousPage: MouseEventHandler = () => (currentPage > 1) ? setCurrentPage(currentPage - 1) : null;
	const selectPage: MouseEventHandler = (event) => {
		// const selectedPage = target.querySelector("span")?.innerText;
		// if(selectedPage) {
		// 	setCurrentPage(parseInt(selectedPage));
		// };
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
				buttons.push(<LinkButton key={ page } classList="primary" action={ selectPage } text={ page.toString() }/>);
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
	// useEffect(() => {
	// 	setCurrentPage(search.page);
	// }, [ search.page ]);
	return <div className={ PaginationStyles.container }>
        { children }
		<div className={ PaginationStyles.actions }>
			{/* <LinkButton classList="primary" action={ previousPage } icon="fa-light fa-arrow-left" text={ translations["Précédent"] }/> */}
			{ showPagination() }
			{ (pages >= 5 ) ? <div className={ PaginationStyles.typePage }>
				{/* { (showPageInput) ? <div className={ PaginationStyles.custom }>
					<Input type="text" name="page" action={ setPage }/>
				</div> : null } */}
				<LinkButton classList="primary circled" action={ () => setShowPageInput(!showPageInput) } icon="fa-light fa-ellipsis"/>
			</div> : null }
			{/* <LinkButton classList="primary circled" action={ selectPage } text={ pages.toString() }/> */}
			{/* <LinkButton classList="primary" action={ nextPage } icon="fa-light fa-arrow-right" text={ translations["Suivant"] }/> */}
		</div>
		{/* <p>{ pages + " " + ((pages === 1) ? translations["Page trouvée"].toLowerCase() : translations["Pages trouvées"].toLowerCase()) }</p> */}
	</div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Pagination;