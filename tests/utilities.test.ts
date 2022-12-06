/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Imports */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
// NODE MODULES IMPORTS NOT WORKING
import { describe, test, expect } from "@jest/globals";
import { beautifyTheLogs, selectifyTheOptions } from "../scripts/utilities";
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Testing Logs Beautifier */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
describe("Utilities module ( beautifyTheLogs ) :", () => {
    test("Logging nothing should return a boolean.", () => expect(typeof beautifyTheLogs()).toBe("boolean"));
    test("Logging nothing should return false.", () => expect(beautifyTheLogs()).toBe(false));
    test("Logging an array type of element should return a value of the same type.", () => expect(Array.isArray(beautifyTheLogs([ 1, 2, 3 ]))).toBe(true));
    test("Logging an object type of element should return a value of the same type.", () => expect(typeof beautifyTheLogs({ firstname: "Amine" })).toBe("object"));
    test("Logging an string type of element should return a value of the same type.", () => expect(typeof beautifyTheLogs("test")).toBe("string"));
    test("Logging an number type of element should return a value of the same type.", () => expect(typeof beautifyTheLogs(3)).toBe("number"));
    test("Logging an boolean type of element should return a value of the same type.", () => expect(typeof beautifyTheLogs(true)).toBe("boolean"));
    test("Logging an function type of element should return a value of the same type.", () => expect(typeof beautifyTheLogs(() => console.log(2))).toBe("function"));
    test("Logging multiple elements should return an array with the passed elements.", () => expect(Array.isArray(beautifyTheLogs(1, true, "yes"))).toBe(true));
});
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
/* Testing Options Selectifier */
/* ----------------------------------------------------------------------------------------------------------------------------------------------------- */
describe("Utilities module ( selectifyTheOptions ) :", () => {
    test("Selectifying nothing should return a boolean.", () => expect(typeof selectifyTheOptions()).toBe("boolean"));
    test("Selectifying nothing should return false.", () => expect(selectifyTheOptions()).toBe(false));
    test("Selectifying an object should return false.", () => expect(selectifyTheOptions({ value: "test" })).toBe(false));
    test("Selectifying a string should return false.", () => expect(selectifyTheOptions("test")).toBe(false));
    test("Selectifying a number should return false.", () => expect(selectifyTheOptions(26)).toBe(false));
    test("Selectifying a fuction should return false.", () => expect(selectifyTheOptions(() => "test")).toBe(false));
    // Need to test array of objects
    // Need to test array of strings
    // Need to test array of numbers
    // Need to test array of functions
    // Need to test array of objects and strings
});