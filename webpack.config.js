/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Configuration */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
const webpackConfiguration = {
    resolve: {
        extensions: [ ".js", ".jsx", ".ts", ".tsx", ".css" ]
    }
};
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------------ */
module.exports = { ...webpackConfiguration };