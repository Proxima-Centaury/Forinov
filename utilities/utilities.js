/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Constants */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const seeMoreOrLess = (event, translations, selector, array = [], defaultVisibleItemsCount = 1) => {
    const target = event.target.closest("button");
    const visibleElements = document.querySelectorAll(selector);
    const hiddenElements = document.querySelectorAll(selector + ".d-none");
    if(hiddenElements.length > 0) {
        hiddenElements.forEach((hiddenElement) => hiddenElement.classList.remove("d-none"));
        target.querySelector("span").innerText = translations["Voir moins"];
    } else {
        visibleElements.forEach((visibleElement, key) => (key > 1) ? visibleElement.classList.add("d-none") : null);
        target.querySelector("span").innerText = translations["Voir plus"] + " (" + (array.length - defaultVisibleItemsCount) + ")";
    };
    return [ target, hiddenElements ];
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export { seeMoreOrLess };