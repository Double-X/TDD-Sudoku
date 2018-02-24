/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMBaseFilledCoors} FM_FILLED_COORS - Returns the list of filled
 *                                              coordinates with variations
 * @param {FMNewData} FM_NEW_DATA - Returns the inputted data with combinations
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFMNewFilledCoors = (
        FM_FILLED_COORS, FM_NEW_DATA, SHOW_RESULT_MSGS) => {

    "use strict";

    const _FM_NEW_FILLED_COORS = FMNewFilledCoors(FM_FILLED_COORS, FM_NEW_DATA);

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFMNewFilledCoors _unitTestAll");
        // These tests are duplicated to ensure that this function's nullipotent
        _unitTest("relaxed");
        _unitTest("relaxed");
        _unitTest("easy");
        _unitTest("easy");
        _unitTest("normal");
        _unitTest("normal");
        _unitTest("hard");
        _unitTest("hard");
        _unitTest("insane");
        _unitTest("insane");
        //
    }; // _unitTestAll

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     */
    const _unitTest = difficulty => {
        console.info("UnitTestFMNewFilledCoors _unitTest");
        console.info(`difficulty: ${difficulty}`);
        const charNo = FMLAS.l(difficulty);
        const filledCoorNo = charNo * ((charNo - 1) / 2);
        const filledCoors = _FM_NEW_FILLED_COORS(difficulty, filledCoorNo);
        console.info(`filledCoors: ${JSON.stringify(filledCoors)}`);
        // This test doesn't care about the randomness of the results
        SHOW_RESULT_MSGS(_failMsgs(difficulty, filledCoorNo, filledCoors));
        //
    }; // _unitTest

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Number} filledCoorNo - The number of coordinates to be filled
     * @param {Array[Object[Number, Number]]} filledCoors - The results to be
     *                                                      tested against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failMsgs = (difficulty, filledCoorNo, filledCoors) => {
        if (!filledCoors) return ["filledCoors doesn't exist!"];
        if (filledCoors.constructor !== Array) {
            return ["filledCoors isn't an Array!"];
        }
        const l = FMLAS.l(difficulty), failMsgs = [];
        const filledCoorLength = filledCoors.length;
        if (filledCoorLength !== filledCoorNo) {
            failMsgs.push("The number of filled coordinates should be " +
                    `${filledCoorNo} but is instead ${filledCoorLength}!`);
        }
        const filledCoorNoInRows = {}, filledCoorNoInCols = {};
        const filledCoorNoInGrids = {}, size = FMLAS.size(l);
        Array(l).fill(-1).forEach((element, i) => {
            filledCoorNoInRows[i] = filledCoorNoInCols[i] = 0;
            filledCoorNoInGrids[i] = 0;
        });
        /** @todo: Extract this arrow function */
        filledCoors.forEach((filledCoor, i) => {
            const failPortionIndexMsg =
                    _failPortionIndexMsg.bind(this, i, 0, l - 1);
            const rowIndex = filledCoor.rowIndex;
            const colIndex = filledCoor.colIndex;
            const failRowIndexMsg = failPortionIndexMsg(rowIndex, "rowIndex");
            const failColIndexMsg = failPortionIndexMsg(colIndex, "colIndex");
            if (failRowIndexMsg.length > 0) failMsgs.push(failRowIndexMsg);
            if (failColIndexMsg.length > 0) failMsgs.push(failColIndexMsg);
            filledCoorNoInRows[rowIndex]++;
            filledCoorNoInCols[colIndex]++;
            const gridIndex = FMLAS.portionGroupIndex(rowIndex, size) * size +
                    FMLAS.portionGroupIndex(colIndex, size);
            filledCoorNoInGrids[gridIndex]++;
        });
        //
        const failFilledCoorNoInPortionMsgs = _failFilledCoorNoInPortionMsgs.
                bind(this, Math.floor(filledCoorNo / l));
        return failMsgs.concat(failFilledCoorNoInPortionMsgs(
                filledCoorNoInRows, "row")).concat(
                failFilledCoorNoInPortionMsgs(filledCoorNoInCols, "column")).
                concat(failFilledCoorNoInPortionMsgs(filledCoorNoInGrids,
                "grid"));
    }; // _failMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} i - The index of the filled coordinates
     * @param {Number} minIndex - The minimum index regarded as valid
     * @param {Number} maxIndex - The maximum index regarded as valid
     * @param {Number} portionIndex - The result to be tested against
     * @param {String} portionName - The name of the result to be tested against
     * @returns {String} The requested fail message
     */
    const _failPortionIndexMsg = (
            i, minIndex, maxIndex, portionIndex, portionName) => {
        if (isNaN(portionIndex)) {
            return `the ${i}th filled character coordinates has no ` +
                    `${portionName} Number as it's instead ${portionIndex}!`;
        } else if (portionIndex < minIndex || portionIndex > maxIndex) {
            return `the ${portionName} of the ${i}th filled character ` +
                    `coordinates is ${portionIndex} which is invalid as it ` +
                    `must be between ${minIndex} and ${maxIndex}!`;
        }
        return "";
    }; // _failPortionIndexMsg

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} minFilledCoorNo - The minimum number of filled
     *                                   coordinates in the portion to be tested
     * @param {Object[Number]} filledCoorNoInPortions - The number of filled
     *        coordinates in the portion to be tested
     * @param {String} portionName - The name of the result to be tested against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failFilledCoorNoInPortionMsgs = (
            minFilledCoorNo, filledCoorNoInPortions, portionName) => {
        return Object.entries(filledCoorNoInPortions).reduce(
                _accumFailFilledCoorNoInPortionMsgs.bind(this, minFilledCoorNo,
                minFilledCoorNo + 1, portionName), []);
    }; // _failFilledCoorNoInPortionMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} minFilledCoorNo - The minimum number of filled
     *                                   coordinates in the portion to be tested
     * @param {Number} maxFilledCoorNo - The maximum number of filled
     *                                   coordinates in the portion to be tested
     * @param {String} portionName - The name of the result to be tested against
     * @param {Array[String]} accumFailMsgs - The collected list of fail message
     * @param {Number} portionIndex - The index of the portion
     * @param {Number} filledCoorNo - The number of filled coordinates in the
     *                                given portion
     * @returns {Array[String]} The requested list of fail messages
     */
    const _accumFailFilledCoorNoInPortionMsgs = (minFilledCoorNo,
            maxFilledCoorNo, portionName, accumFailMsgs,
            [portionIndex, filledCoorNo]) => {
        if (filledCoorNo < minFilledCoorNo ||
                filledCoorNo > maxFilledCoorNo) {
            return accumFailMsgs.concat(
                    [`the number of filled characters in the ${portionIndex}` +
                    `th ${portionName} is ${filledCoorNo} which is ` +
                    `invalid as it must be between ${minFilledCoorNo} ` +
                    `and ${maxFilledCoorNo}!`]);
        }
        return accumFailMsgs;
    }; // _accumFailFilledCoorNoInPortionMsgs

    console.info("UnitTestFMNewFilledCoors pre");
    // These tests are duplicated to ensure that this function's nullipotent
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFMNewFilledCoors post");

}; // UnitTestFMNewFilledCoors
