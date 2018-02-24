/**
 * Pure Function
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FVRenderSqParams} FV_RENDER_SQ_PARAMS - The seam for accessing
 *                                                 square display contents
 * @returns {Function(String, Number, Number} The requested function
 */
const FVRenderedFixedSq = FV_RENDER_SQ_PARAMS => {

    "use strict";

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} char - The initially filled chracter in this square
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @returns {Dom} The requested square
     */
    const newSq = (char, rowIndex, colIndex) => {
        const sq = FV_RENDER_SQ_PARAMS.newDom(rowIndex, colIndex);
        FV_RENDER_SQ_PARAMS.setReadOnlyChar(sq, char);
        /** @todo Consider using FV_RENDER_DOMS.callFn instead */
        sq.classList.add("fixedSq");
        //
        return sq;
    }; // newSq

    return newSq;

}; // FVRenderedFixedSq
