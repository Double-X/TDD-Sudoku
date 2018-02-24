/**
 * Idempotent
 * @author DoubleX @interface @since v1.0 @version v1.
 * @param {FVRenderDoms} FV_RENDER_DOMS - The seam for actually rendering doms
 * @param {FVRenderedDoms} FV_RENDERED_DOMS - The seam for actually reading doms
 * @returns {Object[Function]} The requested API mapping
 */
const FVRenderSqParams = (FV_RENDER_DOMS, FV_RENDERED_DOMS) => {

    "use strict";

    const _DOM_ID_PRE = "sq", _DOM_ID_MID = "_";

    /**
     * Pure Function
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @returns {Dom} The requested new dom
     */
    const newDom = (rowIndex, colIndex) => {
        // Hides the fact that the implementation uses the input dom
        const sq = document.createElement("input");
        FV_RENDER_DOMS.setProp(sq, "id", domId(rowIndex, colIndex));
        return sq;
        //
    }; // newDom

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Dom} dom - The dom to have its input listener set
     * @param {Function()} oninput - The new input listener to be set
     */
    const setInputListener = (dom, oninput) => {
        // Hides the fact that the implementation uses the input dom
        FV_RENDER_DOMS.setProp(dom, "oninput", oninput);
        //
    }; // setInputListener

    /**
     * Pure function
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Number} rowIndex - The row index of the square having this id
     * @param {Number} colIndex - The column index of the square having this id
     * @returns {String} The requested dom id
     */
    const domId = (rowIndex, colIndex) => {
        return _DOM_ID_PRE + rowIndex + _DOM_ID_MID + colIndex;
    }; // domId

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Number} rowIndex - The row index of the square having this id
     * @param {Number} colIndex - The column index of the square having this id
     * @returns {Dom} The requested dom
     */
    const dom = (rowIndex, colIndex) => {
        return FV_RENDERED_DOMS.callFn(
                document, "getElementById", [domId(rowIndex, colIndex)]);
    }; // dom

    /**
     * Nullipotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Dom} dom - The dom to have its character returned
     * @returns {String} The requested character in the square
     */
    const char = dom => FV_RENDERED_DOMS.getProp(dom, "value").toUpperCase();

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Dom} dom - The dom to have its character set
     * @param {String} newChar - The new character in the square
     */
    const setChar = (dom, newChar) => {
        const oldChar = char(dom); // Otherwise the old character would be lost
        _setChar(dom, newChar);
        // Otherwise the recorded demo files won't be able to play properly
        const oninput = FV_RENDERED_DOMS.getProp(dom, "oninput");
        if (_isNewInput(oldChar, newChar, oninput)) oninput();
        //
    }; // setChar

    /**
     * Idempotent
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @param {Dom} dom - The dom to have its character set
     * @param {String} char - The new character in the square
     */
    const setReadOnlyChar = (dom, char) => {
        _setChar(dom, char);
        FV_RENDER_DOMS.setProp(dom, "readOnly", true);
    }; // setReadOnlyChar

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Dom} dom - The dom to have its character set
     * @param {String} char - The new character in the square
     */
    const _setChar = (dom, char) => {
        FV_RENDER_DOMS.setProp(dom, "value", char);
    }; // _setChar

    /**
     * Idempotent
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} oldChar - The old character in the square
     * @param {String} newChar - The new character in the square
     * @param {Function()/Nullable} oninput - The square dom input listener
     */
    const _isNewInput = (oldChar, newChar, oninput) => {
        // FVRenderedFixedSq doesn't have oninput
        return oninput && oldChar !== newChar;
        //
    }; // _isNewInput

    return {
        newDom,
        setInputListener,
        domId,
        dom,
        char,
        setChar,
        setReadOnlyChar
    };

}; // FVRenderSqParams
