/**
 * Nullipotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMBoard} FM_BOARD - Returns the raw 2D board character data table
 * @param {FMNewData} FM_NEW_DATA - Returns the inputted data with combinations
 * @returns {Function(String, Array[Array[String]])} The requested function
 */
const FMNewBoard = (FM_BOARD, FM_NEW_DATA) => {

    "use strict";

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @returns {Array[Array[String]]} The requested raw 2D character data table
     */
    const board = difficulty => {
        return FM_NEW_DATA(difficulty, FM_BOARD.bind(this, difficulty));
    }; // board

    return board;

}; // FMNewBoard