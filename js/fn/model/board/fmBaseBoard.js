/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Function(String) -> Array[Array[String]]} The requested function
 */
const FMBaseBoard = () => {

    "use strict";

    /**
     * Pure Function
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Number} charValSpacing - The character value spacing
     * @returns {Array[Array[String]]} The requested raw 2D character data table
     */
    const board = (difficulty, charValSpacing) => {
        const l = FMLAS.l(difficulty);
        return Array(l).fill("").map(_row.bind(this, charValSpacing,
                FMLAS.chars(difficulty), l, FMLAS.size(l)));
    }; // board

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} charValSpacing - The character value spacing
     * @param {String} chars - The list of supported characters
     * @param {Number} l - The number of supported characters
     * @param {Number} size - The size of a grid
     * @param {} element - The placeholder argument
     * @param {Number} rowIndex - The index of the row
     * @param {Array[String]} lengthList - The placeholder for using Array fn
     * @returns {Array[String]} The requested raw 1D character data list
     */
    const _row = (
            charValSpacing, chars, l, size, element, rowIndex, lengthList) => {
        return lengthList.map(
                _char.bind(this, charValSpacing, chars, l, size, rowIndex));
    }; // _row

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} charValSpacing - The character value spacing
     * @param {String} chars - The list of supported characters
     * @param {Number} l - The number of supported characters
     * @param {Number} size - The size of a grid
     * @param {Number} rowIndex - The index of the row
     * @param {} element - The placeholder argument
     * @param {Number} rowIndex - The index of the column
     * @returns {String} The requested raw character data
     */
    const _char = (
            charValSpacing, chars, l, size, rowIndex, element, colIndex) => {
        return chars[_charIndex(charValSpacing, l, size, rowIndex, colIndex)];
    }; // _char

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} charValSpacing - The character value spacing
     * @param {Number} l - The number of supported characters
     * @param {Number} size - The size of a grid
     * @param {Number} rowIndex - The index of the row
     * @param {Number} colIndex - The index of the column
     * @returns {Number} The requested index of the raw character data
     */
    const _charIndex = (charValSpacing, l, size, rowIndex, colIndex) => {
        return _charOffset(charValSpacing, size, rowIndex, colIndex) % l;
    }; // _charIndex

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} charValSpacing - The character value spacing
     * @param {Number} size - The size of a grid
     * @param {Number} rowIndex - The index of the row
     * @param {Number} colIndex - The index of the column
     * @returns {Number} The requested total offset of the raw character data
     */
    const _charOffset = (charValSpacing, size, rowIndex, colIndex) => {
        return _charBaseOffset(size, rowIndex, colIndex) * charValSpacing;
    }; // _charOffset

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The size of a grid
     * @param {Number} rowIndex - The index of the row
     * @param {Number} colIndex - The index of the column
     * @returns {Number} The requested total offset of the raw character data
     */
    const _charBaseOffset = (size, rowIndex, colIndex) => {
        return FMLAS.portionGroupIndex(rowIndex, size) + _rowCharIndexOffset(
                size, rowIndex) + colIndex;
    }; // _charBaseOffset

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The size of a grid
     * @param {Number} rowIndex - The index of the row
     * @returns {Number} The requested index offset
     */
    const _rowCharIndexOffset = (size, rowIndex) => {
        return size * FMLAS.portionIndexInGroup(rowIndex, size);
    }; // _rowCharIndexOffset

    return board;

}; // FMBaseBoard
