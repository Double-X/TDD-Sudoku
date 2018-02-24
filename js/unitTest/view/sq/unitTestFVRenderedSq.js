/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFVRenderedSq = SHOW_RESULT_MSGS => {

    "use strict";

    const _FV_RENDER_DOMS = FVRenderDoms();
    const _FV_RENDERED_DOMS = FVRenderedDoms();
    const _FV_RENDER_SQ_PARAMS =
            FVRenderSqParams(_FV_RENDER_DOMS, _FV_RENDERED_DOMS);
    const _FV_RENDERED_SQ = FVRenderedSq(_FV_RENDER_SQ_PARAMS);

    /**
     * @author DoubleX @since v1.0 @version v1.0
     * @param {} char - The placeholder argument
     * @param {Number} colIndex - The column index of the inputted square
     * @param {Number} rowIndex - The row index of the inputted square
     */
    const _callback = (char, colIndex, rowIndex) => {
        // The rest will be covered by integration tests
        _coors.colIndex = colIndex, _coors.rowIndex = rowIndex;
        //
    }; // _callback

    const _coors = {};

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFVRenderedSq _unitTestAll");
        // These tests are duplicated to ensure that the functions' pure
        _unitTestRenderedSq(4, 4);
        _unitTestRenderedSq(4, 4);
        //
    }; // _unitTestAll

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     */
    const _unitTestRenderedSq = (rowIndex, colIndex) => {
        _coors.colIndex = _coors.rowIndex = undefined;
        const sq = _FV_RENDERED_SQ(_callback, rowIndex, colIndex);
        console.info("UnitTestFVRenderedSq _unitTestRenderedSq");
        console.info(`rowIndex: ${rowIndex}`);
        console.info(`colIndex: ${colIndex}`);
        console.info(`sq: ${sq}`);
        SHOW_RESULT_MSGS(
                _unitTestRenderedSqFailMsgs(rowIndex, colIndex, sq));
        _coors.colIndex = _coors.rowIndex = undefined;
    }; // _unitTestRenderedSq

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @param {Dom} sq - The dom representing the rendered square
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestRenderedSqFailMsgs = (rowIndex, colIndex, sq) => {
        return _unitTestRenderedSqDomIdFailMsgs(rowIndex, colIndex, sq.id).
                concat(_unitTestRenderedSqOninputFailMsgs(rowIndex, colIndex,
                sq));
    }; // _unitTestRenderedSqFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @param {String} domId - The dom id to be checked against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestRenderedSqDomIdFailMsgs = (rowIndex, colIndex, domId) => {
        const expectedDomId = _FV_RENDER_SQ_PARAMS.domId(rowIndex, colIndex);
        if (domId === expectedDomId) return [];
        return [
            `The id of the dom with rowIndex ${rowIndex} and colIndex ` +
                    `${colIndex} should be ${expectedDomId} but is instead ` +
                    `${domId}!`
        ];
    }; // _unitTestRenderedSqDomIdFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The row index of the square to be rendered
     * @param {Number} colIndex - The column index of the square to be rendered
     * @param {Dom} sq - The dom representing the rendered square
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestRenderedSqOninputFailMsgs = (rowIndex, colIndex, sq) => {
        const failMsgs = [];
        /** @todo: Makes this test decoupled from this implementation detail */
        sq.oninput();
        if (_coors.colIndex !== colIndex) {
            failMsgs.push([
                `The inputted the dom should have colIndex ${colIndex} but ` +
                        `has instead ${_coors.colIndex}!`
            ]);
        }
        if (_coors.rowIndex !== rowIndex) {
            failMsgs.push([
                `The inputted the dom should have rowIndex ${rowIndex} but ` +
                        `has instead ${_coors.rowIndex}!`
            ]);
        }
        //
        return failMsgs;
    }; // _unitTestRenderedSqOninputFailMsgs

    console.info("UnitTestFVRenderedSq pre");
    // These tests are duplicated to ensure that the functions' pure
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFVRenderedSq post");

}; // UnitTestFVRenderedSq
