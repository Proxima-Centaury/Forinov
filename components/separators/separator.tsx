/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Separator */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const Separator = (pageProps: any) => {
    const { type, states }: any = pageProps;
    const { translations }: any = states;
    switch(type) {
        case "or":
            return <div className="separatorOr">
                <span>{ translations["Ou"] }</span>
            </div>;
        default:
            return <div className="separator"/>;
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default Separator;