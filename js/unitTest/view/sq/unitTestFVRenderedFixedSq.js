/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFVRenderedFixedSq = SHOW_RESULT_MSGS => {

    "use strict";

    const _FV_RENDER_DOMS = FVRenderDoms();
    const _FV_RENDERED_DOMS = FVRenderedDoms();
    const _FV_RENDER_SQ_PARAMS =
            FVRenderSqParams(_FV_RENDER_DOMS, _FV_RENDERED_DOMS);
    const _FV_RENDERED_FIXED_SQ = FVRenderedFixedSq(_FV_RENDER_SQ_PARAMS);

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFVRenderedFixedSq _unitTestAll");
        // These tests are duplicated to ensure that the functions' pure
        _unitTestRenderedFixedSq("4", 4, 4);
        _unitTestRenderedFixedSq("4", 4, 4);
        //
    }; // _unitTestAll

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} char - The initially filled chracter in this square
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     */
    const _unitTestRenderedFixedSq = (char, rowIndex, colIndex) => {
        const sq = _FV_RENDERED_FIXED_SQ(char, rowIndex, colIndex);
        console.info("UnitTestFVRenderedFixedSq _unitTestRenderedFixedSq");
        console.info(`char: ${char}`);
        console.info(`rowIndex: ${rowIndex}`);
        console.info(`colIndex: ${colIndex}`);
        console.info(`sq: ${sq}`);
        SHOW_RESULT_MSGS(
                _unitTestRenderedFixedSqFailMsgs(char, rowIndex, colIndex, sq));
    }; // _unitTestRenderedFixedSq

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} char - The initially filled chracter in this square
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @param {Dom} sq - The dom representing the rendered square
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestRenderedFixedSqFailMsgs = (char, rowIndex, colIndex, sq) => {
        return _unitTestRenderedFixedSqDomIdFailMsgs(rowIndex, colIndex, sq.id).
                concat(_unitTestRenderedFixedSqCharFailMsgs(char, rowIndex,
                colIndex, _FV_RENDER_SQ_PARAMS.char(sq))).concat(
                _unitTestRenderedFixedSqReadOnlyFailMsgs(rowIndex, colIndex,
                sq));
    }; // _unitTestRenderedFixedSqFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @param {String} domId - The dom id to be checked against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestRenderedFixedSqDomIdFailMsgs = (
            rowIndex, colIndex, domId) => {
        const expectedDomId = _FV_RENDER_SQ_PARAMS.domId(rowIndex, colIndex);
        if (domId === expectedDomId) return [];
        return [
            `The id of the dom with rowIndex ${rowIndex} and colIndex ` +
                    `${colIndex} should be ${expectedDomId} but is instead ` +
                    `${domId}!`
        ];
    }; // _unitTestRenderedFixedSqDomIdFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} char - The initially filled chracter in this square
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @param {String} actualChar - The result to be tested against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestRenderedFixedSqCharFailMsgs = (
            char, rowIndex, colIndex, actualChar) => {
        if (actualChar === char) return [];
            return [
                `The character of the dom with rowIndex ${rowIndex} and ` +
                        `colIndex ${colIndex} should be ${char} but is ` +
                        `instead ${actualChar}!`
            ];
    }; // _unitTestRenderedFixedSqCharFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @param {Dom} sq - The dom representing the rendered square
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestRenderedFixedSqReadOnlyFailMsgs = (
            rowIndex, colIndex, sq) => {
        /** @todo: Makes this test decoupled from the implementation details */
        if (sq.readOnly) return [];
        return [
            `The dom with rowIndex ${rowIndex} and colIndex ${colIndex} ` +
                    `should be read only but isn't instead!`
        ];
        //
    }; // _unitTestRenderedFixedSqReadOnlyFailMsgs

    console.info("UnitTestFVRenderedFixedSq pre");
    // These tests are duplicated to ensure that the functions' pure
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFVRenderedFixedSq post");

}; // UnitTestFVRenderedFixedSq
