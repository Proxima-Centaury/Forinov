/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Components */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Fragment } from "react";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Styles */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import AttachmentsStyles from "../../public/stylesheets/components/attachments/Attachments.module.css";
import ButtonStyles from "../../public/stylesheets/components/buttons/Button.module.css";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Attachments */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const Attachments = (pageProps: any) => {
    const { attachments }: any = pageProps;
    const formattedAttachments = Object.values(attachments);
    return (formattedAttachments.length > 0) ? <Fragment>
        <div className="separator"/>
        <div className={ AttachmentsStyles.container }>
            <List { ...pageProps } attachments={ formattedAttachments }/>
        </div>
    </Fragment> : <Fragment/>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* List */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const List = (pageProps: any) => {
    const { attachments, baseConfigurations }: any = pageProps;
    const { host }: any = baseConfigurations;
    return <Fragment>
        { attachments.map(({ name, url }: any, key: number) => {
            return <a key={ key } className={ ButtonStyles.classicLink } href={ host + url } target="_blank">
                <i className="fa-light fa-cloud-download"/>
                <span>{ name }</span>
            </a>;
        }) }
    </Fragment>;
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default Attachments;