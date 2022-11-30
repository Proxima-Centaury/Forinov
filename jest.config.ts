/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
import type { Config } from "jest";
import { defaults } from "jest-config";
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Config */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
const config: Config = {
    preset: "ts-jest",
    verbose: true,
    moduleFileExtensions: [ ...defaults.moduleFileExtensions, "ts" ],
};
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
/* Exports */
/* ------------------------------------------------------------------------------------------------------------------------------------------- */
export default config;