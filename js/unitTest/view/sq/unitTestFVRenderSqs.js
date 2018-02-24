/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FVRenderDomsStub} FVRenderDomsStub - Returns the stub for testing
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFVRenderSqs = (FVRenderDomsStub, SHOW_RESULT_MSGS) => {

    "use strict";

    /**
     * Stub
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @returns {Function(String, Number, Number} The requested function
     */
    const FVRenderedFixedSqStub = () => {

      /**
       * @author DoubleX @since v1.0 @version v1.0
       * @param {String} char - The initially filled chracter in this square
       * @param {Number} rowIndex - The row index of the square to be rendered
       * @param {Number} colIndex - The column index of the square to be
       *                            rendered
       * @returns {Dom} The requested square
       */
      const newSq = (char, rowIndex, colIndex) => {
          _fvRenderedFixedSqInfo.push({ char, rowIndex, colIndex });
          return {};
      }; // newSq

      return newSq;

    }; // FVRenderedFixedSqStub

    /**
     * Stub
     * @author DoubleX @interface @since v1.0 @version v1.0
     * @returns {Function(Function(Function(Array[String]), String,
     *           Array[String], Array[String], Array[String])), Number, Number}
     *           The requested function
     */
    const FVRenderedSqStub = () => {

       /**
         * @author DoubleX @since v1.0 @version v1.0
         * @param {Function(Function(Array[String]), String, Array[String],
         *         Array[String], Array[String])} callback - The user input
         *                                                   listener
         * @param {Number} rowIndex - The row index of the square to be rendered
         * @param {Number} colIndex - The column index of the square to be
         *                            rendered
         * @returns {Dom} The requested square
         */
        const newSq = (callback, rowIndex, colIndex) => {
            _fvRenderedSqInfo.push({ callback, rowIndex, colIndex });
            return {};
        }; // newSq

        return newSq;

    }; // FVRenderedSqStub

    const _BOARD = [
        ["0", "1", "2", "3"],
        ["2", "3", "1", "0"],
        ["1", "2", "3", "0"],
        ["3", "0", "1", "2"]
    ];
    const _FILLED_COORS = [
        { rowIndex: 0, colIndex: 0 },
        { rowIndex: 1, colIndex: 2 },
        { rowIndex: 2, colIndex: 1 },
        { rowIndex: 3, colIndex: 3 },
    ];
    const _DIV_DOMS = { id: "board" };
    const _FV_RENDERED_FIXED_SQ_STUB = FVRenderedFixedSqStub();
    const _FV_RENDERED_SQ_STUB = FVRenderedSqStub();
    // It's just a placeholder to stop actually rendering doms in unit tests
    const _FV_RENDER_DOMS_STUB = FVRenderDomsStub(() => {});
    //
    const _FV_RENDER_SQS = FVRenderSqs(_DIV_DOMS, _FV_RENDER_DOMS_STUB,
            _FV_RENDERED_FIXED_SQ_STUB, _FV_RENDERED_SQ_STUB);

    const _fvRenderedFixedSqInfo = [], _fvRenderedSqInfo = [];

    const _callback = () => {}; // It'll be covered by integration tests instead

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFVRenderSqs _unitTestAll");
        // These tests are duplicated to ensure that the functions' idempotent
        _unitTestRender();
        _unitTestRender();
        //
    }; // _unitTestAll

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestRender = () => {
        _fvRenderedFixedSqInfo.length = _fvRenderedSqInfo.length = 0;
        // The rows don't matter at all
        _FV_RENDER_SQS(_BOARD, _FILLED_COORS, _callback);
        console.info("UnitTestFVRenderSqs _unitTestRender");
        SHOW_RESULT_MSGS(_unitTestRenderFailMsgs());
        //
        _fvRenderedFixedSqInfo.length = _fvRenderedSqInfo.length = 0;
    }; // _unitTestRender

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestRenderFailMsgs = () => {
        return _unitTestRenderFixedSqFailMsgs().concat(
                _unitTestRenderSqFailMsgs());
    }; // _unitTestRenderFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestRenderFixedSqFailMsgs = () => {
        const expectedFilledCoorNo = _FILLED_COORS.length;
        const actualFilledCoorNo = _fvRenderedFixedSqInfo.length;
        const failMsgs = [];
        if (actualFilledCoorNo !== expectedFilledCoorNo) {
            failMsgs.push([
                "The number of filled coordinates should be " +
                        `${expectedFilledCoorNo} but is instead ` +
                        `${actualFilledCoorNo}!`
            ]);
        }
        _fvRenderedFixedSqInfo.forEach(info => {
            const { char, rowIndex, colIndex } = info;
            const expectedChar = _BOARD[rowIndex][colIndex];
            if (char !== expectedChar) {
                failMsgs.push([
                    "The character of the fixed square with rowIndex " +
                            `${rowIndex} and colIndex ${colIndex} should be ` +
                            `${expectedChar} but is instead ${char}!`
                ]);
            }
            if (_FILLED_COORS.some(filledCoor => {
                return filledCoor.rowIndex === rowIndex &&
                        filledCoor.colIndex === colIndex;
            })) return;
            failMsgs.push([
                `The square with rowIndex ${rowIndex} and colIndex ` +
                        `${colIndex} is fixed but shouldn't be!`
            ]);
        });
        return failMsgs;
    }; // _unitTestRenderFixedSqFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestRenderSqFailMsgs = () => {
        const expectedInputableSqNo =
                Math.pow(_BOARD.length, 2) - _FILLED_COORS.length;
        const actualInputableSqNo = _fvRenderedSqInfo.length;
        const failMsgs = [];
        if (expectedInputableSqNo !== actualInputableSqNo) {
            failMsgs.push([
                "The number of inputable coordinates should be " +
                        `${expectedInputableSqNo} but is instead ` +
                        `${actualInputableSqNo}!`
            ]);
        }
        _fvRenderedSqInfo.forEach(info => {
            const { callback, rowIndex, colIndex } = info;
            const expectedChar = _BOARD[rowIndex][colIndex];
            if (callback !== _callback) {
                failMsgs.push([
                    "The callback of the inputable square with rowIndex " +
                            `${rowIndex} and colIndex ${colIndex} should be ` +
                            `${_callback} but is instead ${callback}!`
                ]);
            }
            if (!_FILLED_COORS.some(filledCoor => {
                return filledCoor.rowIndex === rowIndex &&
                        filledCoor.colIndex === colIndex;
            })) return;
            failMsgs.push([
                `The square with rowIndex ${rowIndex} and colIndex ` +
                        `${colIndex} isn't fixed but should be!`
            ]);
        });
        return failMsgs;
    }; // _unitTestRenderSqFailMsgs

    console.info("UnitTestFVRenderSqs pre");
    // These tests are duplicated to ensure that the functions' nullipotent
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFVRenderSqs post");

}; // UnitTestFVRenderSqs
