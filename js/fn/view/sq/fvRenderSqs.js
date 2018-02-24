/**
 * Idempotent
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Dom} DIV_BOARD - The dom hosting the board consisting of squares
 * @param {FVRenderDoms} FV_RENDER_DOMS - The seam for actually rendering doms
 * @param {FVRenderedSq} FV_RENDERED_FIXED_SQ - The initially filled square to
 *                                              be rendered
 * @param {FVRenderedSq} FV_RENDERED_SQ - The square to be rendered
 * @returns {Function(Array[Array[String]], Array[Object[Number, Number]],
 *           Function(Function(Array[String]), String, Array[String],
 *           Array[String], Array[String]))} The requested function
 */
const FVRenderSqs = (
        DIV_BOARD, FV_RENDER_DOMS, FV_RENDERED_FIXED_SQ, FV_RENDERED_SQ) => {

    "use strict";

    // It need not be a param as it doesn't matter in integration testing
    const _ROW_DOM_ID_PRE = "row";
    //

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     * @param {Function(Function(Array[String]), String, Array[String],
     *         Array[String], Array[String])} callback - The user input listener
     */
    const render = (board, filledCoors, callback) => {
        FV_RENDER_DOMS.setProp(DIV_BOARD, "innerHTML", "");
        // Makes use of the fact that the board's a square
        Array(board.length).fill("").forEach(
                _renderRow.bind(this, board, filledCoors, callback));
        //
    }; // render

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     * @param {Function(Function(Array[String]), String, Array[String],
     *         Array[String], Array[String])} callback - The user input listener
     * @param {} element - The placeholder argument
     * @param {Number} rowIndex - The index of the row to be rendered
     * @param {Array} lengthList - The plceholder for using Array functions
     */
    const _renderRow = (
            board, filledCoors, callback, element, rowIndex, lengthList) => {
        const row = _newRow(rowIndex);
        lengthList.forEach(_renderSq.bind(
                this, board, filledCoors, callback, rowIndex, row));
        FV_RENDER_DOMS.callFn(DIV_BOARD, "appendChild", [row]);
    }; // _renderRow

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The index of the row to be rendered
     * @returns {Dom} The requested row
     */
    const _newRow = rowIndex => {
        const row = document.createElement("div");
        FV_RENDER_DOMS.setProp(row, "id", _rowId(rowIndex));
        return row;
    }; // _newRow

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The index of the row to be rendered
     * @returns {String} The requested row id
     */
    const _rowId = rowIndex => _ROW_DOM_ID_PRE + rowIndex;

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     * @param {Function(Function(Array[String]), String, Array[String],
     *         Array[String], Array[String])} callback - The user input listener
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Dom} row - The dom hosting a row of squares
     * @param {} col - The placeholder argument
     * @param {Number} colIndex - The column index of the square to be rendered
     */
    const _renderSq = (
            board, filledCoors, callback, rowIndex, row, col, colIndex) => {
        FV_RENDER_DOMS.callFn(row, "appendChild", [
            _renderedSq(
                    board, filledCoors, callback, rowIndex, row, col, colIndex)
        ]);
    }; // _renderSq

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     * @param {Function(Function(Array[String]), String, Array[String],
     *         Array[String], Array[String])} callback - The user input listener
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Dom} row - The dom hosting a row of squares
     * @param {} col - The placeholder argument
     * @param {Number} colIndex - The column index of the square to be rendered
     * @returns {Dom} The requested dom representing the rendered square
     */
    const _renderedSq = (
            board, filledCoors, callback, rowIndex, row, col, colIndex) => {
        return _renderedSqFn(board, filledCoors, callback, rowIndex, colIndex)(
                rowIndex, colIndex);
    }; // _renderedSq

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Array[String]]} board - The raw 2D board character table
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     * @param {Function(Function(Array[String]), String, Array[String],
     *         Array[String], Array[String])} callback - The user input listener
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @returns {Function(Function(Function(Array[String]), String,
     *           Array[String], Array[String], Array[String])), Dom, Number,
     *           Number} The requested function
     */
    const _renderedSqFn = (
            board, filledCoors, callback, rowIndex, colIndex) => {
        if (_isFilledCoors(filledCoors, rowIndex, colIndex)) {
            return FV_RENDERED_FIXED_SQ.bind(this, board[rowIndex][colIndex]);
        }
        return FV_RENDERED_SQ.bind(this, callback);
    }; // _renderedSqFn

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[Object[Number, Number]]} filledCoors - The list of filled
     *                                                      coordinates
     * @param {Number} rowIndex - The row index of the square to be checked
     * @param {Number} colIndex - The column index of the square to be checked
     * @returns {Boolean} The check result
     */
    const _isFilledCoors = (filledCoors, rowIndex, colIndex) => {
        return filledCoors.some(_isFilledCoor.bind(this, rowIndex, colIndex));
    }; // _isFilledCoors

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The row index of the square to be checked
     * @param {Number} colIndex - The column index of the square to be checked
     * @param {Array[Object[Number, Number]]} filledCoors - The filled
     *                                                      coordinates
     * @returns {Boolean} The check result
     */
    const _isFilledCoor = (rowIndex, colIndex, filledCoor) => {
        return filledCoor.rowIndex === rowIndex &&
                filledCoor.colIndex === colIndex;
    }; // _isFilledCoor

    return render;

}; // FVRenderSqs
