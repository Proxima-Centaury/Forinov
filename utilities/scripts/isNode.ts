/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Is Node */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const isNode = (element: unknown): Node | boolean => {
    if(element instanceof Node) {
        return element;
    } else {
        return false;
    };
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
export { isNode };