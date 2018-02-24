/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @returns {Function(String) -> Array[Object[Number, Number]]}
 *          The requested function
 */
const FMBaseFilledCoors = () => {

    "use strict";

    /**
     * Pure Function
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {String} difficulty - The name of the game difficulty
     * @param {Number} filledCoorNo - The number of coordinates to be filled
     * @param {Number} charValSpacing - The character value spacing
     * @returns {Array[Object[Number, Number]]} The requested list of filled
     *                                          coordinates
     */
    const filledCoors = (difficulty, filledCoorNo, charValSpacing) => {
        const l = FMLAS.l(difficulty);
        return Array(l).fill({}).reduce(_accumFilledCoors.bind(this,
                charValSpacing, l, FMLAS.size(l), _longFilledCoorRowNo(
                filledCoorNo, l), _basefilledCoorRowLength(filledCoorNo, l)),
                []);
    }; // filledCoors

    /**
     * Pure Function
     * @param {Number} filledCoorNo - The number of coordinates to be filled
     * @param {Number} l - The length of the board
     * @returns {Number} The requested number of rows with more filled coors
     */
    const _longFilledCoorRowNo = (filledCoorNo, l) => filledCoorNo % l;

    /**
     * Pure Function
     * @param {Number} filledCoorNo - The number of coordinates to be filled
     * @param {Number} l - The length of the board
     * @returns {Number} The requested length of rows with fewer filled coors
     */
    const _basefilledCoorRowLength = (filledCoorNo, l) => {
        return Math.floor(filledCoorNo / l);
    }; // _basefilledCoorRowLength

    /**
     * Pure Function
     * @param {Number} charValSpacing - The character value spacing
     * @param {Number} l - The length of the board
     * @param {Number} size - The number of rows in the same group
     * @param {Number} longFilledCoorRowNo - The number of rows with more filled
     *                                       coors
     * @param {Number} basefilledCoorRowLength - The length of rows with fewer
     *                                           filled coors
     * @param {Array[Object[Number, Number]]} accumFilledCoors - The collected
     *        list of filled coordinates
     * @param {} element - The placeholder argument
     * @param {Number} rowIndex - The index of the row having filled coordinates
     * @returns {Array[Object[Number, Number]]} The requested list of filled
     *                                          coordinates
     */
    const _accumFilledCoors = (charValSpacing, l, size, longFilledCoorRowNo,
            basefilledCoorRowLength, accumFilledCoors, element, rowIndex) => {
        return accumFilledCoors.concat(_filledCoors(charValSpacing, l, size,
                longFilledCoorRowNo, basefilledCoorRowLength, rowIndex));
    }; // _accumFilledCoors

    /**
     * Pure Function
     * @param {Number} charValSpacing - The character value spacing
     * @param {Number} l - The length of the board
     * @param {Number} size - The number of rows in the same group
     * @param {Number} longFilledCoorRowNo - The number of rows with more filled
     *                                       coors
     * @param {Number} basefilledCoorRowLength - The length of rows with fewer
     *        list of filled coordinates
     * @param {Number} rowIndex - The index of the row having filled coordinates
     * @returns {Array[Object[Number, Number]]} The requested list of filled
     *                                          coordinates
     */
    const _filledCoors = (charValSpacing, l, size, longFilledCoorRowNo,
            basefilledCoorRowLength, rowIndex) => {
        return Array(_filledCoorNoInRow(longFilledCoorRowNo,
                basefilledCoorRowLength, rowIndex)).fill({}).map(_filledCoor.
                bind(this, charValSpacing, l, rowIndex, _minBaseColIndex(
                rowIndex, size)));
    }; // _filledCoors

    /**
     * Pure Function
     * @param {Number} longFilledCoorRowNo - The number of rows with more filled
     *                                       coors
     * @param {Number} basefilledCoorRowLength - The length of rows with fewer
     *        list of filled coordinates
     * @param {Number} rowIndex - The index of the row having filled coordinates
     * @returns {Number} The requested length of rows with filled coordinates
     */
    const _filledCoorNoInRow = (
            longFilledCoorRowNo, basefilledCoorRowLength, rowIndex) => {
        return _isLongFilledCoorRow(rowIndex, longFilledCoorRowNo) ?
                basefilledCoorRowLength + 1 : basefilledCoorRowLength;
    }; // _filledCoorNoInRow

    /**
     * Pure Function
     * @param {Number} rowIndex - The index of the row having filled coordinates
     * @param {Number} longFilledCoorRowNo - The number of rows with more filled
     *                                       coors
     * @returns {Boolean} The check result
     */
    const _isLongFilledCoorRow = (rowIndex, longFilledCoorRowNo) => {
        return rowIndex < longFilledCoorRowNo;
    }; // _isLongFilledCoorRow

    /**
     * Pure Function
     * @param {Number} rowIndex - The index of the row having filled coordinates
     * @param {Number} size - The number of rows in the same group
     * @returns {Number} The requested minimum value of the base column index
     */
    const _minBaseColIndex = (rowIndex, size) => {
        return FMLAS.portionGroupIndex(rowIndex, size) +
                _rowIndexColOffset(rowIndex, size);
    }; // _minBaseColIndex

    /**
     * Pure Function
     * @param {Number} rowIndex - The index of the row having filled coordinates
     * @param {Number} size - The number of rows in the same group
     * @returns {Number} The requested column offset per row index offset
     */
    const _rowIndexColOffset = (rowIndex, size) => {
        return FMLAS.portionIndexInGroup(rowIndex, size) * size;
    }; // _rowIndexColOffset

    /**
     * Pure Function
     * @param {Number} charValSpacing - The character value spacing
     * @param {Number} l - The length of the board
     * @param {Number} rowIndex - The index of the row having filled coordinates
     * @param {Number} minBaseColIndex - The min value of the base column index
     * @param {} element - The placeholder argument
     * @param {Number} filledCoorIndexInRow - The index of the filled coordinate
     *                                        in the given row
     * @returns {Object[Number, Number]]} The requested filled coordinate
     */
    const _filledCoor = (charValSpacing, l, rowIndex, minBaseColIndex, element,
            filledCoorIndexInRow) => ({
        rowIndex,
        colIndex: _colIndex(
                charValSpacing, l, minBaseColIndex, filledCoorIndexInRow)
    }); // _filledCoor

    /**
     * Pure Function
     * @param {Number} charValSpacing - The character value spacing
     * @param {Number} l - The length of the board
     * @param {Number} minBaseColIndex - The min value of the base column index
     * @param {Number} filledCoorIndexInRow - The index of the filled coordinate
     *                                        in the given row
     * @returns {Number} The requested column index of the filled coordinate
     */
    const _colIndex = (
            charValSpacing, l, minBaseColIndex, filledCoorIndexInRow) => {
        return _baseColIndex(
                charValSpacing, minBaseColIndex, filledCoorIndexInRow) % l;
    }; // _colIndex

    /**
     * Pure Function
     * @param {Number} charValSpacing - The character value spacing
     * @param {Number} l - The length of the board
     * @param {Number} minBaseColIndex - The min value of the base column index
     * @param {Number} filledCoorIndexInRow - The index of the filled coordinate
     *                                        in the given row
     * @returns {Number} The requested base col index of the filled coordinate
     */
    const _baseColIndex = (
            charValSpacing, minBaseColIndex, filledCoorIndexInRow) => {
        return minBaseColIndex + filledCoorIndexInRow * charValSpacing;
    }; // _baseColIndex

    return filledCoors;

}; // FMBaseFilledCoors
