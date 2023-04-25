/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import chalk from "chalk";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* JSON */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
import config from "../configurations/config.json";
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Utilities */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/**
* @method {@link Utilities.beautifyTheLogs beautifyTheLogs}
* @status - Up to date.
* ---
* @method {@link Utilities.selectifyTheOptions selectifyTheOptions}
* @status - Needs an update.
* ---
* @method {@link Utilities.getTranslations getTranslations}
* @status - Needs an update.
* ---
* @method {@link Utilities.getMetaDatasTranslations getMetaDatasTranslations}
* @status - Needs an update.
* ---
* @method {@link Utilities.scrollTo scrollTo}
* @status - Needs an update.
* ---
* @method {@link Utilities.redirectTo redirectTo}
* @status - Needs an update.
* ---
* @method {@link Utilities.uppercaseFirst uppercaseFirst}
* @status - Needs an update.
* ---
* @method {@link Utilities.remainingTime remainingTime}
* @status - Needs an update.
* ---
* @method {@link Utilities.formatNameForUrl formatNameForUrl}
* @status - Needs an update.
* ---
* @method {@link Utilities.bindEventListeners bindEventListener}
* @status - Needs an update.
* ---
* @method {@link Utilities.removeEventListeners removeEventListeners}
* @status - Needs an update.
* ---
* @method {@link Utilities.structureTags structureTags}
* @status - Needs an update.
* ---
* @method {@link Utilities.formatType formatType}
* @status - Needs an update.
* ---
* @method {@link Utilities.checkMatch checkMatch}
* @status - Needs an update.
* ---
* @method {@link Utilities.preciseTarget preciseTarget}
* @status - Needs an update.
* ---
* @method {@link Utilities.escapeHTML escapeHTML}
* @status - Needs an update.
* ---
* @returns { void } - ```void``` ( nothing ).
* ---
* @notes
* - This class is used to complete many general tasks.
* - These tasks are usually tasks that are common to multiple pages.
* - This helps users to avoid copy/paste lines of code in multiple locations.
* - That way, one function, one call wherever you need it.
*/
class Utilities {
    constructor() {};
    /**
    * @param { any } [ logs ] Could be anything, ```any``` type.
    * @returns { Array|Boolean|any }
    * - An ```array``` with all passed parameters.
    * - A ```boolean``` if no parameters passed.
    * - The only passed parameter of ```any``` type.
    * ---
    * @notes
    * - This method is used to log multiple elements for debugging.
    * - Prints logs using ```chalk package``` to add colors.
    */
    beautifyTheLogs(...logs: any): Array<any>|Boolean|any {
        if(!logs || logs.length <= 0) {
            return false;
        };
        const logType = chalk.blueBright("[Log]");
        const logText = "Logging an element of";
        const logElementType = (log: any) => chalk.blueBright(typeof log) + " " + "type.\n=>";
        const logElement = (log: any) => log;
        logs.map((log: any) => console.log(logType + " " + logText + " " + logElementType(log), logElement(log), "\n"));
        return (logs.length === 1) ? logs[0] : logs;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function selectifyTheOptions
    * @param { Array } [ options ] Optionnal, should be an ```array``` of ```strings``` or ```objects```.
    * @param { String } [ source ] Optionnal, should be a ```string```.
    * @returns { Array|Boolean }
    * - ```array``` of ```objects```.
    * - ```boolean```.
    * ---
    * @example
    * const options = selectifyTheOptions([ "John", "Jane", "Jeff", "Jinx" ]).
    * console.log(options);
    * // outputs :
    * [
    *     { ID: 0, NAME: "John", VALUE: "John" },
    *     { ID: 1, NAME: "Jane", VALUE: "Jane" },
    *     { ID: 2, NAME: "Jeff", VALUE: "Jeff" },
    *     { ID: 3, NAME: "Jinx", VALUE: "Jinx" },
    * ]
    * @note The ID property will be added automatically upon the execution  if an array of strings only is passed.
    * @note The {@link source} parameter is an optionnal addon that helps you customize the NAME of the options.
    * @example
    * const options = selectifyTheOptions([ "fr-FR", "en-US", "ja-JP" ], "locales").
    * console.log(options);
    * // outputs :
    * [
    *     { ID: 0, NAME: "Français", VALUE: "fr-FR" },
    *     { ID: 1, NAME: "English", VALUE: "en-US" },
    *     { ID: 2, NAME: "日本語", VALUE: "ja-JP" }
    * ]
    * @note To make it work, you'll need to add conditions to this method to switch NAMEs according to {@link source}'s value.
    * @example
    * selectifyTheOptions(options?: any, source?: String) {
    *     if(!options || options.length <= 0 || (options && !Array.isArray(options))) {
    *         return false;
    *     };
    *     const selectifiedOptions: Array<Object> = [];
    *     options.map((option: any, key: KeyType) => {
    *         if(typeof option === "string") {
    *             // Here, I imported a json file that contains the proper NAMEs to display.
    *             const { locales } = config;
    *             // I store each NAME in this constant according to option ( which is a string, "fr-FR" in that case ).
    *             // You could put this constant inside a switch to get the needed VALUEs according to source parameter.
    *             const optionText = (source) ? locales[option as keyof Object] : option;
    *             // Example :
    *             // switch(source) {
    *             //    case "locales":
    *             //        optionText = (source) ? locales[option as keyof Object] : option;
    *             // }
    *             (option.length > 0) ? selectifiedOptions.push({ ID: key, NAME: optionText, VALUE: option }) : null;
    *             // And then you may push inside or outside the switch, depends on your logic / architecture.
    *         } else {
    *             // We don't touch this part because here, we're assuming that there's no change needed.
    *             // By that, I mean if you get into the else, then it means that options contains objects.
    *             // And then we assume that each object looks like that : { NAME: "Kazakhstan", VALUE: 107 }.
    *             const optionAsObject: any = option;
    *             if(!option.hasProperty("ID")) {
    *                 optionAsObject.ID = key;
    *             };
    *             selectifiedOptions.push(optionAsObject);
    *         };
    *     });
    *     return selectifiedOptions;
    * };
    * @note If you pass an array of objects, make sure to follow the instruction bellow.
    * @note Each object in the {@link options} parameter should have the same structure as above.
    * @note If the {@link options} parameter doesn't have any ID, make sure to add your own.
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
                (option.length > 0) ? selectifiedOptions.push({ ID: key, NAME: optionText, VALUE: option }) : null;
            } else {
                const optionAsObject = option;
                if(!option?.ID) {
                    optionAsObject.ID = key;
                };
                selectifiedOptions.push(optionAsObject);
            };
        });
        return selectifiedOptions;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function getTranslations
    * @param { String|RegExp } [ locale ] Should be a ```string```.
    * @returns { Object }
    * - ```object```.
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
    * @function getMetadatasTranslations
    * @param { String|RegExp } [ locale ] Should be a ```string```.
    * @returns { Object }
    * - ```object```.
    * ---
    * @note This method is used to get the proper metadatas according to locale's value.
    * @note The {@link locale} parameter should be the user's selected language.
    */
    getMetadatasTranslations = (locale: String): Object => {
        if(locale) {
            const language = locale.substring(0, 2);
            const translations = require("../public/static/locales/metadatas/" + language + ".json");
            return translations;
        };
        return require("../public/static/locales/metadatas/fr.json");
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
    * @returns { Object|Boolean }
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
    buildProperties = (properties?: Array<String>, values?: Array<any>): Object|Boolean => {
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
    * @function redirectTo
    * @param { String } [ route ] Should be a ```string```.
    * @param { any } [ router ] Should be an ```object```.
    * @param { String } [ locale ] Should be a ```string```.
    * @returns { void|Boolean }
    * - ```void```.
    * - ```false``` if router parameter missing.
    * ---
    * @note This method is used to redirect users to the given {@link route} parameter.
    * @note The {@link router} parameter should be React's useRouter object.
    * @note The {@link locale} parameter should be current selected language.
    */
    redirectTo = (route: String, router: any, locale: String): void|Boolean => {
        if(!router) {
            return false;
        };
        router.push(route, route, { locale: localStorage.toString() })
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function uppercaseFirst
    * @param { String } [ string ] Should be a ```string```.
    * @returns { String|Boolean }
    * - ```string```.
    * - ```false``` if string parameter missing.
    * ---
    * @note This method is used to return the passed string with the first letter uppercased.
    * @note The {@link string} parameter should be a string.
    */
    uppercaseFirst = (string: String): String|Boolean => {
        if(!string) {
            return false;
        };
        return string[0].toUpperCase() + string.substring(1).toLowerCase();
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function remainingTime
    * @param { Array } [ remainingTime ] Should be an ```array```.
    * @param { Date|String } [ start ] Should be a ```date``` or a ```string```.
    * @param { String } [ display ] Should be a ```string```.
    * @param { Object } [ translations ] Should be an ```object```.
    * @returns { String }
    * @note This method is used to return the remaining time as a ```string``` according to the data passed in the first parameter.
    * @example
    * remainingType([ "0", "2", "13"], null, null, translations);
    * // Returns => 2 Months, 13 Days
    */
    remainingTime = (remainingTime: any, start = null, display = null, translations: any): String => {
        if(remainingTime === "permanent") {
            return uppercaseFirst(remainingTime) as String;
        } else if(remainingTime === "undefined") {
            return translations["Dates non-définies"];
        } else if(remainingTime === "finished") {
            return translations["Terminée"];
        } else if(remainingTime === "later") {
            // const date = new Date(start); NOT WORKING ON SAFARI
            return translations["Commence le"] + " " + display;
        } else {
            const string: Array<any> = [];
            const values = remainingTime.split(",");
            values.map((value: any, key: KeyType) => {
                if(value !== "0" && parseInt(key) === 0) {
                    if(value === "1") {
                        string.push(value + " " + translations["Année"].toLowerCase()); 
                    } else {
                        string.push(value + " " + translations["Années"].toLowerCase());
                    };
                } else if(value !== "0" && parseInt(key) === 1) {
                    if(value === "1") {
                        string.push(value + " " + translations["Mois"].toLowerCase()); 
                    } else {
                        string.push(value + " " + translations["Mois+s"].toLowerCase());
                    };
                } else if(value !== "0" && parseInt(key) === 2) {
                    if(value === "1") {
                        string.push(value + " " + translations["Jour"].toLowerCase()); 
                    } else {
                        string.push(value + " " + translations["Jours"].toLowerCase());
                    };
                };
            });
            const finalText = (string.length > 0) ? string.join(", ") : null;
            if(finalText) {
                return translations["Expire dans"] + " " + finalText;
            };
            return translations["Moins de 24 heures restantes"];
        };
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function formatNameForUrl
    * @param { String } [ name ] Should be a ```string```.
    * @returns { String|Boolean }
    * - ```string```.
    * - ```false``` if string parameter missing or wrong.
    * ---
    * @note This method is used to return the passed string trimed with all letters lowercased and spaces removed.
    * @note The {@link name} parameter should be a string.
    */
    formatNameForUrl = (name: String): String|Boolean => {
        if(!name) {
            return false;
        };
        name = name.toLowerCase().trim();
        const characters = [ "/", "&", " - ", " ", "_", " _ " ];
        characters.forEach((character) => name = name.replaceAll(character, "-"));
        return name;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function bindEventListeners
    * @param { Document|HTMLElement } [ element ] Should be an ```html element```.
    * @param { Array<string> } [ listeners ] Should be an ```array``` of ```strings```.
    * @param { Function } [ callback ] Should be a ```function```.
    * @returns { void|Boolean }
    * - ```void```.
    * - ```false``` if element, listeners or callback parameter missing or wrong.
    * ---
    * @note This method is used to return the passed string trimed with all letters lowercased and spaces removed.
    * @note The {@link string} parameter should be a string.
    */
    bindEventListeners(element: Document|HTMLElement, listeners: Array<string>, callback: Function): void|Boolean {
        if(!element || !listeners || !callback) {
            return false;
        };
        listeners.map((listener) => element.addEventListener(listener as any, callback as any, true));
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function removeEventListeners
    * @param { Document|HTMLElement } [ element ] Should be an ```html element```.
    * @param { Array<String> } [ listeners ] Should be an ```array``` of ```strings```.
    * @param { Function } [ callback ] Should be a ```function```.
    * @returns { void|Boolean }
    * - ```void```.
    * - ```false``` if element, listeners or callback parameter missing or wrong.
    * ---
    * @note This method is used to return the passed string trimed with all letters lowercased and spaces removed.
    * @note The {@link string} parameter should be a string.
    */
    removeEventListeners(element: Document|HTMLElement, listeners: Array<String>, callback: Function): void|Boolean {
        if(!element || !listeners || !callback) {
            return false;
        };
        listeners.map((listener) => element.removeEventListener(listener as any, callback as any));
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function structureTags
    * @param { String } [ string ] Should be a ```string```.
    * @returns { Array<any>|Boolean }
    * - ```array``` of ```object```.
    * - ```false``` if string parameter missing or wrong.
    * ---
    * @note This method is used to return the passed string as an array of objects for proper tag display.
    * @note The {@link string} parameter should be a string.
    */
    structureTags(string: String): Array<any>|Boolean {
        if(!string || string.length <= 0) {
            return false;
        };
        const array = (string.match(",")) ? string.split(",").map((element, key) => ({ ID: key, NAME: element })) : [ { ID: 0, NAME: string } ];
        return array;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function formatType
    * @param { String } [ type ] Should be a ```string```.
    * @returns { String|Boolean }
    * - ```string```.
    * - ```false``` if string parameter missing or wrong.
    * ---
    * @note This method is used to return the correct company type for your scripts if specific transformations are needed according to the router type parameter.
    * @note The {@link type} parameter should be a string.
    */
    formatType = (type: String, language: String = "fr"): String|Boolean => {
        if(!type || type.trim().length <= 0) {
            return false;
        };
        type = String(type);
        if(language === "fr") {
            type = (type.match(/(startups)/)) ? "startup" : type;
            type = (type.match(/(corporates)/)) ? "entreprise" : type;
            type = (type.match(/(partners)/)) ? "partenaire" : type;
            type = (type.match(/(opportunities)/)) ? "opportunite" : type;
        } else if(language === "en") {
            type = (type.match(/(startups)/)) ? "startup" : type;
            type = (type.match(/(corporates)/)) ? "corporate" : type;
            type = (type.match(/(partners)/)) ? "partner" : type;
            type = (type.match(/(opportunities)/)) ? "opportunity" : type;
        };
        return type;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function checkMatch
    * @param { String } [ string ] Should be a ```string```.
    * @param { String } [ match ] Should be a ```string```.
    * @returns { Boolean }
    * - ```true``` if the match is contained in the string.
    * - ```false``` if string or match parameter missing or wrong or there's no match.
    * ---
    * @note This method is used to return a boolean by testing the string according to its supposed match.
    * @note The {@link string} parameter should be a string.
    * @note The {@link match} parameter should be a string.
    */
    checkMatch = (string: String, match: String): Boolean => {
        if(!string || string.trim().length <= 0 || !match || match.trim().length <= 0) {
            return false;
        };
        const regexep = new RegExp(match as any, "i");
        const result = (string.match(regexep)) ? true : false;
        return result;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function preciseTarget
    * @param { MouseEvent } [ event ] Should be a ```mouseevent```.
    * @returns { HTMLElement }
    * - ```htmlelement``` in case the target is an element inside of the CTA.
    * ---
    * @note This method is used to return a precise target as an HTMLElement.
    * @note The {@link event} parameter should be a mouse event.
    */
    preciseTarget = (event: MouseEvent): HTMLElement => {
        const target = event.target as HTMLButtonElement;
        const preciseTarget = target.closest("button") || target.closest("a");
        return preciseTarget as HTMLElement;
    };
    /**
    * This is a ```method``` ( ```function``` inside ```class``` ).
    * @function escapeHTML
    * @param { String } [ htmlString ] Should be a ```string```.
    * @returns { String }
    * - ```string``` an escaped version of the passed htmlString.
    * ---
    * @note This method is used to return an escaped version of the passed htmlString.
    * @note The {@link htmlString} parameter should be a string.
    */
    escapeHTML = (htmlString: String): String => {
        const escaped = htmlString.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
        return escaped;
    };
};
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Instance */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const utilitiesInstance = new Utilities();
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Quick Method Access */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
const beautifyTheLogs = utilitiesInstance.beautifyTheLogs;
const selectifyTheOptions = utilitiesInstance.selectifyTheOptions;
const getTranslations = utilitiesInstance.getTranslations;
const getMetadatasTranslations = utilitiesInstance.getMetadatasTranslations;
const preventSubmit = utilitiesInstance.preventSubmit;
const buildProperties = utilitiesInstance.buildProperties;
const scrollTo = utilitiesInstance.scrollTo;
const redirectTo = utilitiesInstance.redirectTo;
const uppercaseFirst = utilitiesInstance.uppercaseFirst;
const remainingTime = utilitiesInstance.remainingTime;
const formatNameForUrl = utilitiesInstance.formatNameForUrl;
const bindEventListeners = utilitiesInstance.bindEventListeners;
const removeEventListeners = utilitiesInstance.removeEventListeners;
const structureTags = utilitiesInstance.structureTags;
const formatType = utilitiesInstance.formatType;
const checkMatch = utilitiesInstance.checkMatch;
const preciseTarget = utilitiesInstance.preciseTarget;
const escapeHTML = utilitiesInstance.escapeHTML;
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */
export default utilitiesInstance;
export {
    Utilities,
    beautifyTheLogs,
    selectifyTheOptions,
    getTranslations,
    getMetadatasTranslations,
    preventSubmit,
    buildProperties,
    scrollTo,
    redirectTo,
    uppercaseFirst,
    remainingTime,
    formatNameForUrl,
    bindEventListeners,
    removeEventListeners,
    structureTags,
    formatType,
    checkMatch,
    preciseTarget,
    escapeHTML
};