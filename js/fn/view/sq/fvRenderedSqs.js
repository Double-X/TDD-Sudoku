/**
 * Nullipotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FVRenderSqParams} FV_RENDER_SQ_PARAMS - The seam for accessing
 *                                                 square display contents
 * @returns {Object[Function]} The requested function mapping
 */
const FVRenderedSqs = FV_RENDER_SQ_PARAMS => {

    "use strict";

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Number} l - The row length
     * @param {Number} rowIndex - The index of the row to be returned
     * @returns {Array[String]} The requested row character data list
     */
    const row = (l, rowIndex) => _line(l, rowIndex, _rowChar);

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Number} l - The row length
     * @param {Number} colIndex - The index of the column to be returned
     * @returns {Array[String]} The requested column character data list
     */
    const col = (l, colIndex) => _line(l, colIndex, _colChar);

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Number} size - The grid size
     * @param {Number} rowIndex - The index of the row in the grid
     * @param {Number} colIndex - The index of the column in the grid
     * @returns {Array[String]} The requested grid character data list
     */
    const grid = (size, rowIndex, colIndex) => {
        return Array(size).fill("").reduce(_accumGrid.bind(this,
          _basePortionIndex(rowIndex, size),
          _basePortionIndex(colIndex, size)), []);
    }; // grid

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Number} l - The length of the board
     * @returns {Array[Array[String]]} board - The requested 2D character table
     */
    const board = l => Array(l).fill(l).map(row);

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} l - The row length
     * @param {Number} portionIndex - The index of the portion to be returned
     * @param {Function(Number, *, Number)} charFn - Returns the character data
     * @returns {Array[String]} The requested portion character data list
     */
    const _line = (l, portionIndex, charFn) => {
        return Array(l).fill("").map(charFn.bind(this, portionIndex));
    }; // _line

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} colIndex - The index of the column to be returned
     * @param {} element - The placeholder argument
     * @param {Number} rowIndex - The index of the row to be returned
     * @returns {String} The requested column character data
     */
    const _rowChar = (rowIndex, element, colIndex) => {
        // Their relationship's just revsesing rowIndex with colIndex
        return _colChar(colIndex, element, rowIndex);
        //
    }; // _rowChar

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} portionIndex - The index of the portion to be returned
     * @param {Number} size - The grid size
     * @returns {Number} The requested base portion index in the grid
     */
    const _basePortionIndex = (portionIndex, size) => {
        return portionIndex - FMLAS.portionIndexInGroup(portionIndex, size);
    }; // _basePortionIndex

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} baseRowIndex - The base index of the row in the grid
     * @param {Number} baseColIndex - The base index of the column in the grid
     * @param {Array[String]} accumGrid - The collected grid character data list
     * @param {} element - The placeholder argument
     * @param {Number} rowIndexOffset - The offset index of the row in the grid
     * @param {Array} sizeList - The placeholder for using Array functions
     * @returns {Array[String]} The requested grid character data list
     */
    const _accumGrid = (baseRowIndex, baseColIndex, accumGrid, element,
            rowIndexOffset, sizeList) => {
        return accumGrid.concat(sizeList.map(_colInGrid.bind(
          this, baseRowIndex, baseColIndex, rowIndexOffset)));
    }; // _accumGrid

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} baseRowIndex - The base index of the row in the grid
     * @param {Number} baseColIndex - The base index of the column in the grid
     * @param {Number} rowIndexOffset - The offset index of the row in the grid
     * @param {} element - The placeholder argument
     * @param {Number} colIndexOffset - The offset index of the col in the grid
     * @returns {String} The requested grid character data
     */
    const _colInGrid = (baseRowIndex, baseColIndex, rowIndexOffset, element,
            colIndexOffset) => {
        // The 2nd argument of _colChar is a placeholder
        return _colChar(_portionIndexInGrid(baseColIndex, colIndexOffset),
                element, _portionIndexInGrid(baseRowIndex, rowIndexOffset));
        //
    }; // _colInGrid

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} basePortionIndex - The base index of the grid portion
     * @param {Number} portionIndexOffset - The offset index of the grid portion
     * @returns {Number} The requested row index in the grid
     */
    const _portionIndexInGrid = (basePortionIndex, portionIndexOffset) => {
        return basePortionIndex + portionIndexOffset;
    }; // _portionIndexInGrid

    /**
     * Nullipotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} colIndex - The index of the column to be returned
     * @param {} element - The placeholder argument
     * @param {Number} rowIndex - The index of the row to be returned
     * @returns {String} The requested column character data
     */
    const _colChar = (colIndex, element, rowIndex) => {
        return FV_RENDER_SQ_PARAMS.char(
                FV_RENDER_SQ_PARAMS.dom(rowIndex, colIndex));
    }; // _colChar

    return { row, col, grid, board };

}; // FVRenderedSqs
