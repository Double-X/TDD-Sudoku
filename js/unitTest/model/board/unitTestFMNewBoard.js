/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMBaseBoard} FM_BOARD - Returns the raw 2D board character data table
 * @param {FMNewData} FM_NEW_DATA - Returns the inputted data with combinations
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFMNewBoard = (FM_BOARD, FM_NEW_DATA, SHOW_RESULT_MSGS) => {

    "use strict";

    const _FM_NEW_BOARD = FMNewBoard(FM_BOARD, FM_NEW_DATA);

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFMNewBoard _unitTestAll");
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
        console.info("UnitTestFMNewBoard _unitTest");
        console.info(`difficulty: ${difficulty}`);
        const board = _FM_NEW_BOARD(difficulty);
        console.info(`board: ${JSON.stringify(board)}`);
        // This test doesn't care about the randomness of the results
        SHOW_RESULT_MSGS(_failMsgs(difficulty, board));
        //
    }; // _unitTest

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[Array[String]]} board - The results to be tested against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failMsgs = (difficulty, board) => {
        if (!board) return ["board doesn't exist!"];
        if (board.constructor !== Array) return ["board isn't an Array!"];
        const failMsgs = [];
        const expectedLength = FMLAS.l(difficulty), rowNo = board.length;
        if (rowNo !== expectedLength) {
            failMsgs.push(`the board height should be ${expectedLength} but ` +
                    ` is instead ${rowNo}!`);
        }
        const lengthList = Array(expectedLength).fill("");
        return board.reduce(_failRowsMsgs.bind(this, difficulty,
                expectedLength, FMLAS.chars(difficulty)), failMsgs).concat(
                _failDuplicateCharMsgs(board, "row")).concat(
                _failDuplicateCharMsgs(_cols(board, lengthList), "column")).
                concat(_failDuplicateCharMsgs(_grids(board, expectedLength,
                lengthList), "grid"));
    }; // _failMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Number} expectedLength - The length of the expected results
     * @param {Array[String]} chars - The list of valid characters
     * @param {Array[String]} accumFailRowMsgs - The accumulated list of failure
     * @param {Array[String]} row - The row to be tested against
     * @param {Number} rowIndex - The index of the row to be tested against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failRowsMsgs = (difficulty, expectedLength, chars, accumFailRowMsgs,
            row, rowIndex) => {
        if (row.constructor !== Array) {
            return accumFailRowMsgs.concat(
                    [`the ${rowIndex}th row isn't an Array!`]);
        }
        const rowLength = row.length, failRowMsgs = [];
        if (rowLength !== expectedLength) {
            failRowMsgs.push(`the ${rowIndex}th row should have ` +
                    `${expectedLength} characters but has intead ` +
                    `${rowLength}!`);
        }
        return accumFailRowMsgs.concat(failRowMsgs).concat(
                _failRowMsgs(difficulty, chars, row));
    }; // _failRowsMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[String]} chars - The list of valid characters
     * @param {Array[String]} row - The list of characters in the same row
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failRowMsgs = (difficulty, chars, row) => {
        return row.reduce(_accumFailRowMsgs.bind(this, difficulty), []);
    }; // _failRowMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Array[String]} accumFailMsg - The collected list of fail messages
     * @param {String} char - The character to be tested
     * @param {} i - The placeholder argument
     * @param {Array[String]} chars - The list of valid characters
     * @returns {Array[String]} The requested list of fail messages
     */
    const _accumFailRowMsgs = (difficulty, accumFailMsg, char, i, chars) => {
        if (chars.includes(char)) return accumFailMsg;
        return accumFailMsg.concat([`the character ${char} is invalid ` +
                `for the ${difficulty} difficulty as it must be within ` +
                `${JSON.stringify(chars)}!`]);
    }; // _accumFailRowMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The results to be tested against
     * @param {Array[String]} lengthList - The placeholder for using Array Fn
     * @returns {Array[Array[String]]} The requested list of columns
     */
    const _cols = (board, lengthList) => {
        /** @todo: Extracts those arrow functions */
        return lengthList.map((element, colIndex) => {
            return lengthList.map((element, rowIndex) => {
                return board[rowIndex][colIndex];
            });
        });
        //
    }; // _cols

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The results to be tested against
     * @param {Number} expectedLength - The expected length of the board
     * @param {Array[String]} lengthList - The placeholder for using Array Fn
     * @returns {Array[Array[String]]} The requested list of grids
     */
    const _grids = (board, expectedLength, lengthList) => {
        const expectedSize = FMLAS.size(expectedLength);
        const sizeList = Array(expectedSize).fill("");
        /** @todo: Extracts those arrow functions */
        return lengthList.map((element, gridIndex) => {
            const iOffset = Math.floor(gridIndex / expectedSize);
            const jOffset = gridIndex * expectedSize % expectedLength;
            return sizeList.map((element, i) => {
                return sizeList.reduce((a, e, j) => {
                    return a.concat(board[iOffset + i][jOffset + j]);
                }, []);
            });
        });
        //
    }; // _grids

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} portions - The results to be tested against
     * @param {String} portionName - The name of the result to be tested against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _failDuplicateCharMsgs = (portions, portionName) => {
        const failDuplicateCharMsgs = [];
        /** @todo: Extracts those arrow functions */
        portions.forEach((portion, portionIndex) => {
            portion.forEach((char, i) => {
                portion.forEach((otherChar, j) => {
                    if (char !== otherChar || i === j) return;
                    failDuplicateCharMsgs.push(`the ${i} and ${j}th ` +
                            `characters of the ${portionIndex}th ` +
                            `${portionName} are the same!`);
                });
            });
        });
        //
        return failDuplicateCharMsgs;
    }; // _failDuplicateCharMsgs

    console.info("UnitTestFMNewBoard pre");
    // These tests are duplicated to ensure that this function's nullipotent
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFMNewBoard post");

}; // UnitTestFMNewBoard
