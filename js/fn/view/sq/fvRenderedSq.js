/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FVRenderSqParams} FV_RENDER_SQ_PARAMS - The seam for accessing
 *                                                 square display contents
 * @returns {Function(Function(Function(Array[String]), String, Array[String],
 *           Array[String], Array[String])), Number, Number}
 *           The requested function
 */
const FVRenderedSq = FV_RENDER_SQ_PARAMS => {

    "use strict";

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Function(Function(Array[String]), String, Array[String],
     *         Array[String], Array[String])} callback - The user input listener
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @returns {Dom} The requested square
     */
    const newSq = (callback, rowIndex, colIndex) => {
        const sq = FV_RENDER_SQ_PARAMS.newDom(rowIndex, colIndex);
        FV_RENDER_SQ_PARAMS.setInputListener(
                sq, _oninput.bind(this, callback, rowIndex, colIndex, sq));
        /** @todo Consider using FV_RENDER_DOMS.callFn instead */
        sq.classList.add("sq");
        //
        return sq;
    }; // newSq

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Function(Function(Array[String]), String, Array[String],
     *         Array[String], Array[String])} callback - The user input listener
     * @param {Number} rowIndex - The row index of the square to be listened to
     * @param {Number} colIndex - The column index of the square to be listened
     * @param {Dom} sq - The square owning this on input listener
     */
    const _oninput = (callback, rowIndex, colIndex, sq) => {
        const char = FV_RENDER_SQ_PARAMS.char(sq);
        const setChar = FV_RENDER_SQ_PARAMS.setChar.bind(this, sq);
        callback(char, colIndex,
                rowIndex, setChar.bind(this, char), setChar.bind(this, ""));
    }; // _oninput

    return newSq;

}; // FVRenderedSq
