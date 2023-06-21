/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
import { Key } from "react";
import { ErrorInterface } from "../typescript/interfaces";
import { checkMatch } from "./utilities";
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Errors Handler */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/**
* This is a ```class```.
* @class ErrorsHandler
* @returns
* - ```void``` ( nothing ).
* ---
* @note This class is used to fetch errors in the current page.
*/
class ErrorsHandler {
    wait: Boolean = false;
    page: String = "/";
    errors: Object = {};
    message: String = "";
    constructor() {};
    generateError(title?: String, message?: String, image?: HTMLImageElement, currentPage?: String, solutions?: Array<String>): ErrorInterface {
        const error: ErrorInterface = {};
        error.title = title;
        error.message = message;
        error.image = image?.outerHTML;
        error.currentPage = currentPage;
        error.solutions = solutions;
        return error;
    };
    cleanErrors(errors: any, properties: Array<String>): ErrorInterface {
        const errorsProperties = Object.keys(errors);
        const cleanedErrors: ErrorInterface = errors;
        properties.map((property) => {
            if(property[0] === "^") {
                errorsProperties.forEach((errorProperty) => (checkMatch(errorProperty, property) ? delete cleanedErrors[errorProperty as keyof Object] : null));
            };
            delete cleanedErrors[property as keyof Object]
        });
        return cleanedErrors;
    };
    startCheckings(page: String): ErrorsHandler {
        this.wait = true;
        const loadedPage = document.querySelector("[data-page-loaded='true']");
        (loadedPage) ? this.wait = false : null;
        if(!this.wait) {
            this.errors = {};
            this.page = page;
            // console.log("Instance errors count before checkings :", Object.keys(this.errors).length, "errors in total for", page, "page.");
            // console.log("React saved errors count :", Object.keys(errors).length, "errors in total for", page, "page.");
            const foundErrors: any = {};
            const response: Array<any> = [];
            if(typeof this.checkMetaDatas() !== "string") {
                const metaDatasErrors = this.checkMetaDatas();
                foundErrors["metaDatasErrors"] = metaDatasErrors;
                response.push(foundErrors["metaDatasErrors" as keyof Object]);
            };
            if(typeof this.checkImages() !== "string") {
                const imagesErrors = this.checkImages();
                foundErrors["imagesErrors"] = imagesErrors;
                response.push(foundErrors["imagesErrors" as keyof Object]);
            };
            if(response.length > 0) {
                this.errors = { ...foundErrors["metaDatasErrors"], ...foundErrors["imagesErrors"] };
                // console.log("Instance errors count after checkings :", Object.keys(this.errors).length, "errors in total for", page, "page.");
            } else {
                this.cleanErrors(this.errors, [ "^missingAltAttribute" ]);
                this.message = "No errors found.";
            };
        };
        return this;
    };
    checkMetaDatas(): Object|String {
        const title = document.title;
        const description = document.querySelector("meta[name='description']");
        const foundErrors: any = {};
        const response: Array<any> = [];
        if(document.querySelectorAll("title").length > 1) {
            const title = "Multiple titles !";
            const message = "Multiple titles found in the current page !";
            const currentPage = this.page;
            const solutions = [ "Keep only one title tag per page that should be set in the document's head." ];
            foundErrors["multipleTitles"] = this.generateError(title, message, undefined, currentPage, solutions);
            response.push(foundErrors["multipleTitles" as keyof Object]);
        };
        if(document.querySelectorAll("meta[name='description']").length > 1) {
            const title = "Multiple meta descriptions !";
            const message = "Multiple meta descriptions found in the current page !";
            const currentPage = this.page;
            const solutions = [ "Keep only one meta description tag per page that should be set in the document's head." ];
            foundErrors["multipleMetaDescriptions"] = this.generateError(title, message, undefined, currentPage, solutions);
            response.push(foundErrors["multipleMetaDescriptions" as keyof Object]);
        };
        if(!title) {
            const title = "Missing title !";
            const message = "No title was found for the current page !";
            const currentPage = this.page;
            const solutions = [ "Set a title tag in the document's head with a string as a name for the current page." ];
            foundErrors["missingTitle"] = this.generateError(title, message, undefined, currentPage, solutions);
            response.push(foundErrors["missingTitle" as keyof Object]);
        };
        if(!description) {
            const title = "Missing description !";
            const message = "No description was found for the current page !";
            const currentPage = this.page;
            const solutions = [ "Set a meta description tag in the document's head with a string as a description for the current page." ];
            foundErrors["missingDescription"] = this.generateError(title, message, undefined, currentPage, solutions);
            response.push(foundErrors["missingDescription" as keyof Object]);
        };
        if(response.length > 0) {
            return foundErrors;
        } else {
            this.cleanErrors(this.errors, [ "multipleTitles", "multipleDescriptions", "missingTitle", "missingDescription" ]);
            return "No errors found on meta datas.";
        };
    };
    checkImages(): Object|String {
        const images = document.querySelectorAll("img");
        const foundErrors: any = {};
        const response: Array<any> = [];
        images.forEach((image: HTMLImageElement, key: Key) => {
            if(!image.alt) {
                const title = "Missing alt attribute on image !";
                const message = "No alt was found on an image !";
                const currentPage = this.page;
                const solutions = [ "Set an alt attribute in the image with a string as a value for the image that will appear if the source is broken." ];
                foundErrors["missingAltAttribute" + (parseInt(key.toString()) + 1)] = this.generateError(title, message, image, currentPage, solutions);
                response.push(foundErrors["missingAltAttribute" + (parseInt(key.toString()) + 1) as keyof Object]);
            };
        });
        // console.log("In checker for images :", document.querySelectorAll("img").length, "images found in total inside", this.page, "page.");
        // console.log("In checker for images :", Object.keys(foundErrors).length, "errors found in", this.page, "page's images.");
        if(response.length > 0) {
            return foundErrors;
        } else {
            this.cleanErrors(this.errors, [ "^missingAltAttribute" ]);
            return "No errors found on images.";
        };
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Instance */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const errorsHandlerInstance = new ErrorsHandler();
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export default errorsHandlerInstance;
export { ErrorsHandler };