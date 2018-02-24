/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Function(String, String, Array[String], Array[String],
 *           Array[String]) -> Array[String]} The requested function
 */
const FMInputViolations = () => {

    "use strict";

    /**
     * Pure Function
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {String} input - The character as the user input
     * @param {Array[String]} row - The row of the user input coordinates
     * @param {Array[String]} col - The column of the user input coordinates
     * @param {Array[String]} grid - The grid of the user input coordinates
     * @returns {Array[String]} The requested list of violations
     */
    const violations = (difficulty, input, row, col, grid) => {
        if (_isEmpty(input)) return []; // An empty input's always valid
        return _violations(difficulty, input, row, col, grid);
    }; // violations

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} input - The character as the user input
     * @returns {Boolean} The check result
     */
    const _isEmpty = input => input.length <= 0; // !input works for non String

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {String} input - The character as the user input
     * @param {Array[String]} row - The row of the user input coordinates
     * @param {Array[String]} col - The column of the user input coordinates
     * @param {Array[String]} grid - The grid of the user input coordinates
     * @returns {Array[String]} The requested list of violations
     */
    const _violations = (difficulty, input, row, col, grid) => {
        const charViolation = _charViolations(difficulty, input);
        // It's impossible for an invalid character to duplicate with valid ones
        if (charViolation.length > 0) return charViolation;
        return _portionViolations(input, row, col, grid);
        //
    }; // _violations

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {String} input - The character as the user input
     * @returns {Array[String]} The requested list of violations
     */
    const _charViolations = (difficulty, input) => {
        return _violation(
                _isCharViolation(difficulty, input), INPUT_CHAR_VIOLATION);
    }; // _charViolations

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {String} input - The character as the user input
     * @returns {Boolean} The check result
     */
    const _isCharViolation = (difficulty, input) => {
        return !FMLAS.chars(difficulty).includes(input);
    }; // _isCharViolation

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} input - The character as the user input
     * @param {Array[String]} row - The row of the user input coordinates
     * @param {Array[String]} col - The column of the user input coordinates
     * @param {Array[String]} grid - The grid of the user input coordinates
     * @returns {Array[String]} The requested list of violations
     */
    const _portionViolations = (input, row, col, grid) => {
        // It's possible for an input to duplicate those in row, column and grid
        return _rowViolations(input, row).concat(_colViolations(input, col)).
                concat(_gridViolations(input, grid));
        //
    }; // _portionViolations

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} input - The character as the user input
     * @param {Array[String]} row - The row of the user input coordinates
     * @returns {Array[String]} The requested list of violations
     */
    const _rowViolations = (input, row) => {
        return _violation(
                _isPortionViolation(input, row), INPUT_ROW_VIOLATION);
    }; // _rowViolations

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} input - The character as the user input
     * @param {Array[String]} col - The column of the user input coordinates
     * @returns {Array[String]} The requested list of violations
     */
    const _colViolations = (input, col) => {
        return _violation(
                _isPortionViolation(input, col), INPUT_COL_VIOLATION);
    }; // _colViolations

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} input - The character as the user input
     * @param {Array[String]} grid - The grid of the user input coordinates
     * @returns {Array[String]} The requested list of violations
     */
    const _gridViolations = (input, grid) => {
        return _violation(
                _isPortionViolation(input, grid), INPUT_GRID_VIOLATION);
    }; // _gridViolations

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} input - The character as the user input
     * @param {Array[String]} portion - The portion of the user input coordinate
     * @returns {Boolean} The check result
     */
    const _isPortionViolation = (input, portion) => {
        // The arrow function's too easy, simple and small to be extracted
        return portion.filter(char => input === char).length > 1;
        //
    }; // _isPortionViolation

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Boolean} isViolation - Whether it's a violation
     * @param {String} violationTag - The idnetifier of the input rule violated
     * @returns {Array[String]} The requested list of violations
     */
    const _violation = (isViolation, violationTag) => {
        // It's just an easy, simple and small helper function to DRY up codes
        return isViolation ? [violationTag] : [];
        //
    }; // _violation

    return violations;

}; // FMInputViolations
