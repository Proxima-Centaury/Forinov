const AnnuaireOpport = ({ filters, dataOpportunities, states }: any) => {	
	<div>
		coucou
	</div>
};

export async function getServerSideProps(context: any) {
	const { req, res, query, locales, defaultLocale, locale }: any = context;

	//if page is null or not found redirect to page 1
	if (query.page === undefined || query.page === null || query.page === "0") {
		//router push to page 1
		res.writeHead(302, {
			Location: "/annuaire-opportunite/" + query.type + "/1",
		});
		res.end();
	}
}
export default AnnuaireOpport;
