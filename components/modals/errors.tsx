/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import { Fragment, Key, useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import hljs from "highlight.js";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Components */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import Separator from "../separators/separator";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Styles */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import "highlight.js/styles/dark.css";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Errors Modal */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const ErrorsModal = (modalProps: any) => {
    const { states } = modalProps;
    const { errors } = states;
    useEffect(() => {
        hljs.highlightAll();
    });
    return <Fragment>
        <div className="header">
            <h6>Page errors feedback</h6>
            <p>You will find more details about the errors down below.</p>
        </div>
        <Separator { ...modalProps }/>
        <div className="console">
            <div className="container">
                { (errors && Object.keys(errors).length > 0) ? Object.keys(errors).map((keyName: String, key: Key) => <div key={ key } className="content" data-error-name={ keyName }>
                    <div className="error">
                        <h5>Error<span>{ "#" + (parseInt(key.toString()) + 1) }</span></h5>
                        <div className="title">
                            <h6>Title :</h6>
                            <p><i className="fa-light fa-chevron-right"/>{ errors[keyName as keyof Object]["title" as keyof Object].toString() }</p>
                        </div>
                    </div>
                    <div className="details">
                        <h5>Details</h5>
                        <div className="message">
                            <h6>Message :</h6>
                            <p><i className="fa-light fa-chevron-right"/>{ errors[keyName as keyof Object]["message" as keyof Object].toString() }</p>
                        </div>
                        { (errors[keyName as keyof Object]["image" as keyof Object]) ? <div className="message">
                            <h6>Picture :</h6>
                            <pre>
                                <code className="language-html">
                                    { errors[keyName as keyof Object]["image" as keyof Object].toString().replace("&amp;", "&") }
                                </code>
                            </pre>
                        </div> : null }
                        <Separator { ...modalProps }/>
                        <div className="page">
                            <h6>Page :</h6>
                            <p><i className="fa-light fa-chevron-right"/>{ errors[keyName as keyof Object]["currentPage" as keyof Object].toString() }</p>
                        </div>
                        <Separator { ...modalProps }/>
                        <div className="solutions">
                            <h6>Solutions :</h6>
                            { Array.from(errors[keyName as keyof Object]["solutions" as keyof Object] as any).map((solution: any, key: Key) => <p key={ key }><i className="fa-light fa-chevron-right"/>{ solution }</p>) }
                        </div>
                    </div>
                </div>) : null }
            </div>
        </div>
    </Fragment>;
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default ErrorsModal;