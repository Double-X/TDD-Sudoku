/**
 * Nullipotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FMPickedCombination} FM_PICKED_COMBINATION - Returns the picked
 *        combination of the given list of elements
 * @returns {Function(String) -> *} The requested function
 */
const FMNewData = FM_PICKED_COMBINATION => {

    "use strict";

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Function} dataSource - The source of data without combinations
     * @returns {} The requested data
     */
    const newData = (difficulty, dataSource) => {
        const size = FMLAS.size(FMLAS.l(difficulty));
        const sizeList = Array(size).fill(-1);
        return dataSource(_randPortionGroupCombination(size, sizeList),
                _randPortionGroupCombination(size, sizeList),
                _randPortionInGroupCombinations(size, sizeList),
                _randPortionInGroupCombinations(size, sizeList),
                _randCharValSpacing(difficulty));
    }; // newData

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of portions in the same group
     * @param {Array} sizeList - The placeholder for using array functions
     * @returns {Array[Array[Number]]} The requested list of portion combination
     */
    const _randPortionInGroupCombinations = (size, sizeList) => {
        return sizeList.map(
                _randPortionGroupCombination.bind(this, size, sizeList));
    }; // _randPortionInGroupCombinations

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The number of portion groups
     * @param {Array} sizeList - The placeholder for using array functions
     * @returns {Array[Number]} The requested portion combination
     */
    const _randPortionGroupCombination = (size, sizeList) => {
        return FM_PICKED_COMBINATION(_basePortionGroupElements(sizeList),
                _randChoiceIndex(size));
    }; // _randPortionGroupCombination

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array} sizeList - The placeholder for using array functions
     * @returns {Array[Number]} The requested list of portion group indices
     */
    const _basePortionGroupElements = sizeList => {
        // The arrow function's too easy, simple and small to be extracted
        return sizeList.map((element, i) => i);
        //
    }; // _basePortionGroupElements

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @returns {Number} The requested character value spacing
     */
    const _randCharValSpacing = difficulty => {
        const charValSpacings = DIFFICULTIES[difficulty].charValSpacings;
        return charValSpacings[_randChoiceIndex(charValSpacings.length)];
    }; // _randCharValSpacing

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} l - The number of possible choices
     * @returns {Number} The requested random index of the choice chosen
     */
    const _randChoiceIndex = l => Math.floor(Math.random() * l);

    return newData;

}; // FMNewData
