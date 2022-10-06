/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Utilities */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
class Utilities {
    constructor() {};
    scrollTo = (x, y) => {
        const container = document.querySelector("#__next");
        // console.log("Coordinates : x = " + x + " / y = " + y);
        // console.log("Container : ", container);
        return container.scrollTo(x, y - 16);
    };
    seeMoreOrLess = (event, translations, selector, array = [], defaultVisibleItemsCount = 1, counter = true) => {
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
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Instance */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const utilities = new Utilities();
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export { utilities };