/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { useTranslation } from "next-i18next";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* React Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Forinov Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import LinkButton from "@buttons/linkButton";
import DefaultTooltip from "@tooltips/defaultTooltip";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import PaginationStyles from "@pagination/Pagination.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Pagination */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Pagination = (params: any): JSX.Element => {
    const { t } = useTranslation("common");
	const { children, pages, page } = params;
	const showPagination = () => {
		const buttons = [];
		for(let pageNumber = 1; pageNumber <= pages; pageNumber++) {
			let count = (page === 1 || page === pages) ? 2 : 1;
			if((pageNumber >= page - count && pageNumber < page) || (pageNumber >= page && pageNumber <= page + count && pageNumber <= pages - 1)) {
				buttons.push(<Fragment key={ pageNumber }>
					<LinkButton classList="primary" href={ `?page=${ pageNumber - 1 }` } text={ pageNumber.toString() }/>
				</Fragment>);
			};
		};
		return buttons;
	};
	return <div className={ PaginationStyles.container }>
        { children }
		<div className={ PaginationStyles.actions }>
			<DefaultTooltip tooltip={ t("previousPageText") }>
				<LinkButton classList="primary" href={ `?page=${ parseInt(page) - 1 }` } icon="fa-light fa-arrow-left" disabled={ page <= 1 }/>
			</DefaultTooltip>
			{ showPagination() }
			<LinkButton classList="primary circled" href={ `?page=${ pages }` } text={ pages || "0" }/>
			<DefaultTooltip tooltip={ t("nextPageText") }>
				<LinkButton classList="primary" href={ `?page=${ parseInt(page) + 1 }` } icon="fa-light fa-arrow-right" disabled={ page >= pages || !pages }/>
			</DefaultTooltip>
		</div>
		<p>{ (pages || 0) + " " + ((!pages || pages === 1) ? t("pageFoundText").toLowerCase() : t("pagesFoundText").toLowerCase()) }</p>
	</div>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Pagination;