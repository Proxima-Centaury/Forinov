/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import { SelectOption } from "../typescript/types";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../config.json";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Utilities */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/**
* This is a ```class```.
* @class Utilities
* @method beautifyTheLogs : {@link Utilities.beautifyTheLogs}
* @method selectifyTheOptions : {@link Utilities.selectifyTheOptions}
* @method setCookie : {@link Utilities.setCookie}
* @method getCookie : {@link Utilities.getCookie}
* @method getTranslations : {@link Utilities.getTranslations}
* @method preventSubmit : {@link Utilities.preventSubmit}
* @returns
* - Instance returns ```void``` ( nothing ).
* ---
* @note This class is used to complete many general tasks.
* @note These tasks are usually tasks that are common to multiple pages.
* @note This helps users to avoid copy/paste lines of code in multiple locations.
* @note That way, one function, one call wherever you need it.
*/
class Utilities {
    constructor() {};
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function beautifyTheLogs
    * @param { any } [ logs ] Could be anything, any type.
    * @returns { Array|Boolean }
    * - An ```array``` with all passed parameters.
    * - The only passed parameter.
    * - ```false``` if no parameters passed.
    * ---
    * @note This method is used to log multiple elements for debugging.
    */
    beautifyTheLogs(...logs: any): Array<any>|Boolean {
        if(!logs || logs.length <= 0) {
            return false;
        };
        const logType = "[" + "Log" + "]";
        const logText = " Logging an element of "
        const logElementType = (log: any) => typeof log + " type.";
        logs.map((log: any) => console.log(logType + logText + logElementType(log), log, "\n"));
        return (logs.length === 1) ? logs[0] : logs;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function selectifyTheOptions
    * @param { Array } [ options ] Optionnal, should be an ```array``` of ```strings``` or ```objects```.
    * @param { String } [ source ] Optionnal, should be a ```string```.
    * @returns { Array|Boolean }
    * - An ```array``` of ```objects```.
    * - A ```boolean```.
    * ---
    * @example
    * const options = selectifyTheOptions([ "John", "Jane", "Jeff", "Jinx" ]).
    * console.log(options);
    * // outputs :
    * [
    *     { key: 0, value: "John", text: "John" },
    *     { key: 1, value: "Jane", text: "Jane" },
    *     { key: 2, value: "Jeff", text: "Jeff" },
    *     { key: 3, value: "Jinx", text: "Jinx" },
    * ]
    * @note The key property will be added automatically upon the execution  if an array of strings only is passed.
    * @note The {@link source} parameter is an optionnal addon that helps you customize the text of the options.
    * @example
    * const options = selectifyTheOptions([ "fr-FR", "en-US", "ja-JP" ], "locales").
    * console.log(options);
    * // outputs :
    * [
    *     { key: 0, value: "fr-FR", text: "Français" },
    *     { key: 1, value: "en-US", text: "English" },
    *     { key: 2, value: "ja-JP", text: "日本語" }
    * ]
    * @note To make it work, you'll need to add conditions to this method to switch texts according to {@link source}'s value.
    * @example
    * selectifyTheOptions(options?: any, source?: String) {
    *     if(!options || options.length <= 0 || (options && !Array.isArray(options))) {
    *         return false;
    *     };
    *     const selectifiedOptions: Array<Object> = [];
    *     options.map((option: any, key: KeyType) => {
    *         if(typeof option === "string") {
    *             // Here, I imported a json file that contains the proper texts to display.
    *             const { locales } = config;
    *             // I store each text in this constant according to option ( which is a string, "fr-FR" in that case ).
    *             // You could put this constant inside a switch to get the needed values according to source parameter.
    *             const optionText = (source) ? locales[option as keyof Object] : option;
    *             // Example :
    *             // switch(source) {
    *             //    case "locales":
    *             //        optionText = (source) ? locales[option as keyof Object] : option;
    *             // }
    *             (option.length > 0) ? selectifiedOptions.push({ key: key, value: option, text: optionText }) : null;
    *             // And then you may push inside or outside the switch, depends on your logic / architecture.
    *         } else {
    *             // We don't touch this part because here, we're assuming that there's no change needed.
    *             // By that, I mean if you get into the else, then it means that options contains objects.
    *             // And then we assume that each object looks like that : { value: 107, text: "Kazakhstan" }.
    *             const optionAsObject: SelectOption = option;
    *             optionAsObject.key = key;
    *             selectifiedOptions.push(optionAsObject);
    *         };
    *     });
    *     return selectifiedOptions;
    * };
    * @note If you pass an array of objects, make sure to follow the instruction bellow.
    * @note Each object in the {@link options} parameter should have the same structure as above without the key property.
    */
    selectifyTheOptions(options?: any, source?: String): Array<Object>|Boolean {
        if(!options || options.length <= 0 || (options && !Array.isArray(options))) {
            return false;
        };
        const selectifiedOptions: Array<Object> = [];
        options.map((option: any, key: KeyType) => {
            if(typeof option === "string") {
                const { locales } = config;
                const optionText = (source) ? locales[option as keyof Object] : option;
                (option.length > 0) ? selectifiedOptions.push({ key: key, value: option, text: optionText }) : null;
            } else {
                const optionAsObject: SelectOption = option;
                optionAsObject.key = key;
                selectifiedOptions.push(optionAsObject);
            };
        });
        return selectifiedOptions;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function setCookie
    * @param { String } [ name ] Should be a ```string```.
    * @param { String } [ value ] Should be a ```string```.
    * @param { Number } [ age ] Should be a ```number```.
    * @param { String } [ path ] Should be a ```string```.
    * @returns { void }
    * - ```void``` ( nothing ).
    * ---
    * @note This method is used to create a cookie.
    * @note The {@link name} parameter should be the cookie's name.
    * @note The {@link value} parameter should be the cookie's value.
    * @note The {@link value} parameter should be a string or a stringified element.
    * @note The {@link age} parameter should be the cookie's expiration timestamp.
    * @note The {@link path} parameter should be the cookie's effective url.
    */
    setCookie(name: String, value: String, age: Number, path: String): void {
        document.cookie = `${ name }=${ value }; max-age=${ age }; path=${ path }`;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function getCookie
    * @param { String|RegExp } [ name ] Should be a ```string```.
    * @returns { String }
    * - A ```string```.
    * ---
    * @note This method is used to retrieve a cookie's value.
    * @note The {@link name} parameter should be the cookie's name.
    */
    getCookie(name: String|RegExp): String {
        const cookies = decodeURIComponent(document.cookie).split(";");
        const match: Function = (name: RegExp) => (cookie.match(name)) ? true : false;
        const cookie = cookies.map((cookie) => (match(name)) ? cookie.replace(name + "=", "") : "null").filter((cookie) => cookie !== null)[0];
        return cookie;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function getTranslations
    * @param { String|RegExp } [ locale ] Should be a ```string```.
    * @returns { Object }
    * - An ```object```.
    * ---
    * @note This method is used to get the proper texts according to locale's value.
    * @note The {@link locale} parameter should be the user's selected language.
    */
    getTranslations = (locale: String): Object => {
        if(locale) {
            const language = locale.substring(0, 2);
            const translations = require("../public/static/locales/" + language + ".json");
            return translations;
        };
        return require("../public/static/locales/fr.json");
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function handleOutOfArea
    * @param { MouseEvent } [ event ] Should be an ```event```.
    * @param { Array<String> } [ targets ] Should be an ```array``` of ```strings```.
    * @param { Function } [ action ] Should be a ```function```.
    * @returns { Function|Boolean }
    * - A ```function```.
    * ---
    * @note This method triggers an action if the user clicks outside of the target.
    * @note The {@link event} parameter should be the user's triggered event.
    * @note The {@link targets} parameter should be an array of selectors.
    * @note The selectors should be the ones triggering an action.
    * @example
    * handleOutOfArea(event, [ ".navbar", ".menuButton" ], closeMenu);
    * // This will close the navbar's menu if a click is triggered outside of the navbar or the menu button's range.
    * @note The {@link action} parameter should be the callback to be triggered.
    */
    handleOutOfArea = (event?: MouseEvent, targets?: Array<String>, action?: Function): Function|Boolean => {
        if(!event || !targets || !action) {
            return false;
        };
        let flag = false;
        const eventTarget = event.target as Element;
        if(eventTarget) {
            targets.map((target) => (!eventTarget.closest(target as string)) ? flag = true : null);
            if(flag) {
                return action();
            };
            return false;
        };
        return false;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function preventSubmit
    * @param { MouseEvent } [ event ] Should be an ```event```.
    * @param { Function } [ callback ] Should be a ```function```.
    * @returns { any|Boolean }
    * - ```any``` ( depends on your callback ).
    * - ```false``` if no event or callback passed.
    * ---
    * @note This method is used to prevent form submission when clicking on a button inside a form.
    * @note The {@link event} parameter is the event that calls this method.
    * @note The {@link callback} parameter is the function you want to trigger.
    * @note This method is meant to allow one liner bindings.
    * @example
    * <form>
    *     <button onClick={ (event) => preventSubmit(event, setState(!state)) }>Switch the state</button>
    * </form>
    */
    preventSubmit = (event?: MouseEvent, callback?: Function): any|Boolean => {
        if(!event || !callback) {
            return false;
        };
        event.preventDefault();
        return callback();
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function buildProperties
    * @param { Array } [ properties ] Should be an ```array``` of ```strings```.
    * @param { Array } [ values ] Should be an ```array``` of various types.
    * @returns { Object|false }
    * - ```object``` that contains properties and values according to data passed.
    * - ```false``` if not enough data passed.
    * ---
    * @note This method is used to build properties whenever needed.
    * @note The {@link properties} parameter is an array of strings used as object's properties names.
    * @note The {@link values} parameter is an array of various types used as properties values.
    * @example
    * const googleButtonProps = [ "type", "faIcon", "faIconClass", "url", "action", "text", "count" ];
    * const googleButtonValues = [ ButtonStyles.callToAction, true, "fa-brands fa-google", "", () => false, "Sign in with google", 0 ];
    * const googleButtonObject = buildProperties(googleButtonProps, googleButtonValues);
    * <Button { ...googleButtonObject }/>
    */
    buildProperties = (properties?: Array<String>, values?: Array<any>): Object|false => {
        if(!properties || !values) {
            return false;
        };
        const object = {};
        properties.map((property: String, key: number) => object[property as keyof Object] = values[key]);
        return object;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function scrollTo
    * @param { Number } [ x ] Should be a ```number```.
    * @param { Number } [ y ] Should be a ```number```.
    * @returns { any|null }
    * - ```any``` which is the execution of the scrollTo method.
    * - ```null``` is the main next js container is not found.
    * ---
    * @note This method is used to scroll to the desired position.
    */
    scrollTo = (x: Number, y: Number) => {
        const container = document.querySelector("#__next");
        return (container) ? container.scrollTo(x as number, y as number - 16) : null;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function seeMoreOrLess
    * @param { any } [ event ] Should be an ```event```.
    * @param { any } [ translations ] Should be an ```object```.
    * @param { String } [ selector ] Should be a ```string```.
    * @param { Array<any> } [ array ] Should be an ```array```.
    * @param { Number } [ defaultVisibleItemsCount ] Should be a ```number```.
    * @param { Number } [ counter ] Should be a ```number```.
    * @returns { array }
    * - ```array```.
    * ---
    * @note This method is used to display more items.
    */
    seeMoreOrLess = (event: any, translations: any, selector: String, array = [], defaultVisibleItemsCount = 1, counter = true): Array<any> => {
        const target = event.target.closest("button");
        const visibleElements = document.querySelectorAll(selector + ":not(.hidden)");
        const hiddenElements = document.querySelectorAll(selector + ".hidden");
        if(hiddenElements.length > 0) {
            hiddenElements.forEach((hiddenElement) => hiddenElement.classList.remove("hidden"));
            target.querySelector("span").innerText = translations["Voir moins"];
        } else {
            visibleElements.forEach((visibleElement, key) => (key >= defaultVisibleItemsCount) ? visibleElement.classList.add("hidden") : null);
            target.querySelector("span").innerText = translations["Voir plus"] + ((array.length > 0) ? " (" + (array.length - defaultVisibleItemsCount) + ")" : "");
        };
        return [ target, hiddenElements ];
    };
};
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Instance */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const utilities = new Utilities();
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Instance */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
const beautifyTheLogs = utilities.beautifyTheLogs;
const selectifyTheOptions = utilities.selectifyTheOptions;
const setCookie = utilities.setCookie;
const getCookie = utilities.getCookie;
const getTranslations = utilities.getTranslations;
const handleOutOfArea = utilities.handleOutOfArea;
const preventSubmit = utilities.preventSubmit;
const buildProperties = utilities.buildProperties;
const scrollTo = utilities.scrollTo;
const seeMoreOrLess = utilities.seeMoreOrLess;
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
export default utilities;
export {
    beautifyTheLogs,
    selectifyTheOptions,
    setCookie,
    getCookie,
    getTranslations,
    handleOutOfArea,
    preventSubmit,
    buildProperties,
    scrollTo,
    seeMoreOrLess
};