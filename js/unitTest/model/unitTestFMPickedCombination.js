/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMPickedCombination} FM_PICKED_COMBINATION - Returns the picked
 *        combination of the given list of elements
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFMPickedCombination = (
        FM_PICKED_COMBINATION, SHOW_RESULT_MSGS) => {

    "use strict";

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFMPickedCombination _unitTestAll");
        // These tests are duplicated to ensure that this function's indeed pure
        _unitTestPickFirst();
        _unitTestPickFirst();
        _unitTestPickMid();
        _unitTestPickMid();
        _unitTestPickLast();
        _unitTestPickLast();
        //
    }; // _unitTestAll

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestPickFirst = () => {
        _unitTest("_unitTestPickFirst", [0, 1, 2, 3, 4, 5],
                FM_PICKED_COMBINATION([0, 1, 2, 3, 4, 5], 1));
    }; // _unitTestPickFirst

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestPickMid = () => {
        _unitTest("_unitTestPickMid", [2, 5, 4, 3, 1, 0],
                FM_PICKED_COMBINATION([0, 1, 2, 3, 4, 5], 360));
    }; // _unitTestPickMid

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestPickLast = () => {
        _unitTest("_unitTestPickLast", [5, 4, 3, 2, 1, 0],
                FM_PICKED_COMBINATION([0, 1, 2, 3, 4, 5], 720));
    }; // _unitTestPickLast

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} tag - The test case identifier
     * @param {Array[Number]} expectedCombination - The expected result
     * @param {Array[Number]} selectedCombination - The actual result
     */
    const _unitTest = (tag, expectedCombination, selectedCombination) => {
        console.info("UnitTestFMPickedCombination _unitTest");
        console.info(`UnitTestFMPickedCombination ${tag}`);
        console.info("expectedCombination: " +
                JSON.stringify(expectedCombination));
        console.info("selectedCombination: " +
                JSON.stringify(selectedCombination));
        SHOW_RESULT_MSGS(_failMsgs(expectedCombination, selectedCombination));
    }; // _unitTest

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Number]} expectedCombination - The expected result
     * @param {Array[Number]} selectedCombination - The actual result
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failMsgs = (expectedCombination, selectedCombination) => {
        if (selectedCombination.constructor !== Array) {
            return ["selectedCombination isn't an Array!"];
        }
        return _failLengthMsgs(
                expectedCombination.length, selectedCombination.length).concat(
                _failElementMsgs(expectedCombination, selectedCombination));
    }; // _failMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} expectedLength - The length of the expected result
     * @param {Number} selectedLength - The length of the actual result
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failLengthMsgs = (expectedLength, actualLength) => {
        if (actualLength === expectedLength) return [];
        return [`selectedCombination should have ${expectedLength} elements ` +
                `but has instead ${actualLength}!`];
    }; // _failLengthMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Number]} expectedCombination - The expected result
     * @param {Array[Number]} selectedCombination - The actual result
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failElementMsgs = (expectedCombination, selectedCombination) => {
        return expectedCombination.reduce((accumFailMsgs, expected, i) => {
            const actual = selectedCombination[i];
            if (expected === actual) return accumFailMsgs;
            return accumFailMsgs.concat([`The ${i}th element of ` +
                    `selectedCombination should be ${expected} but is ` +
                    `instead ${actual}!`]);
        }, []);
    }; // _failElementMsgs

    console.info("UnitTestFMPickedCombination pre");
    // These tests are duplicated to ensure that this function's indeed pure
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFMPickedCombination post");

}; // UnitTestFMPickedCombination
