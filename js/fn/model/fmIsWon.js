/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Function(Array[Array[String]]) -> Boolean} The requested function
 */
const FMIsWon = () => {

    "use strict";

    /**
     * Pure Function
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The raw 2D character data table
     * @returns {Boolean} The check result
     */
    const isWon = board => board.every(_isRowFilled);

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[String]} row - The raw 1D character data list
     * @returns {Boolean} The check result
     */
    const _isRowFilled = row => row.every(_isFilled);

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} char - The raw character data
     * @returns {Boolean} The check result
     */
    const _isFilled = char => char.length > 0; // char works for non String

    return isWon;

}; // FMIsWon
