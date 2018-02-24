/**
 * Nullipotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMBaseFilledCoors} FM_FILLED_COORS - Returns the list of filled
 *                                              coordinates with given variation
 * @param {FMNewData} FM_NEW_DATA - Returns the inputted data with combinations
 * @returns {Function(String) -> Array[Object[Number, Number]]}
 *          The requested function
 */
const FMNewFilledCoors = (FM_FILLED_COORS, FM_NEW_DATA) => {

    "use strict";

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Number} filledCoorNo - The number of coordinates to be filled
     * @returns {Array[Object[Number, Number]]} The requested list of filled
     *                                          coordinates
     */
    const filledCoors = (difficulty, filledCoorNo) => {
        return FM_NEW_DATA(difficulty,
          FM_FILLED_COORS.bind(this, difficulty, filledCoorNo));
    }; // filledCoors

    return filledCoors;

}; // FMNewFilledCoors