/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {FVRenderedDomsStub} FVRenderedDomsStub - Returns the stub for testing
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFVRenderedSqs = (FVRenderedDomsStub, SHOW_RESULT_MSGS) => {

    "use strict";

    const _calledFnInfo = [];

    /**
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} fn - The name of the API called
     * @param {Object} dom - The dom to be rendered
     * @param {String} attr - The name of the dom rendering attribute
     * @param {} params - The parameters for rendering the dom
     * @returns {} The requested results
     */
    const _callback = (fn, dom, attr, params) => {
        const info = { fn, dom, attr, params };
        _calledFnInfo.push(info);
        // It's to use fake doms so the tests won't rely on any real dom states
        if (_isGetElementById(info)) return { id: _domId(info) };
        if (fn === "getProp") return "";
        //
    }; // _callback

    const _FV_RENDER_DOMS = FVRenderDoms();
    const _FV_RENDERED_DOMS_STUB = FVRenderedDomsStub(_callback);
    const _FV_RENDER_SQ_PARAMS =
            FVRenderSqParams(_FV_RENDER_DOMS, _FV_RENDERED_DOMS_STUB);
    const _FV_RENDERED_SQS = FVRenderedSqs(_FV_RENDER_SQ_PARAMS);

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFVRenderedSqs _unitTestAll");
        // These tests are duplicated to ensure that the functions' nullipotent
        _unitTestLine(9, 4, "row", _accumUnitTestRowIndexFailMsgs);
        _unitTestLine(9, 4, "row", _accumUnitTestRowIndexFailMsgs);
        _unitTestLine(9, 4, "col", _accumUnitTestColIndexFailMsgs);
        _unitTestLine(9, 4, "col", _accumUnitTestColIndexFailMsgs);
        _unitTestGrid(3, 4, 4);
        _unitTestGrid(3, 4, 4);
        _unitTestBoard(9);
        _unitTestBoard(9);
        //
    }; // _unitTestAll

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} l - The portion length
     * @param {Number} portionIndex - The index of the portion to be returned
     * @param {String} portionName - The name of the portion to be returned
     * @param {Function(Number, Array[String], *, Number,
     *         Array[Object[String, Object, String, *]])} accumFailMsgFn -
     *        Returns the accumulated list of fail messages
     */
    const _unitTestLine = (l, portionIndex, portionName, accumFailMsgFn) => {
        _calledFnInfo.length = 0;
        const portion = _FV_RENDERED_SQS[portionName](l, portionIndex);
        console.info("UnitTestFVRenderedSqs _unitTestLine");
        console.info(`l: ${l}`);
        console.info(`portionIndex: ${portionIndex}`);
        console.info(`portionName: ${portionName}`);
        // Only the list of the queried coordinates matters
        SHOW_RESULT_MSGS(_unitTestLineFailMsgs(
                l, portionIndex, portion, accumFailMsgFn));
        //
        _calledFnInfo.length = 0;
    }; // _unitTestLine

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} l - The portion length
     * @param {Number} portionIndex - The index of the portion to be returned
     * @param {Array[String]} portion - The actual result
     * @param {Function(Number, Array[String], *, Number,
     *         Array[Object[String, Object, String, *]])} accumFailMsgFn -
     *        Returns the accumulated list of fail messages
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestLineFailMsgs = (
            l, portionIndex, portion, accumFailMsgFn) => {
        if (!_isArray(portion)) return ["portion isn't an Array!"];
        const actualLength = portion.length;
        if (l !== actualLength) {
            return [
                `The length of the portion should be ${l} but is instead ` +
                        `${actualLength}!`
            ];
        }
        const domIds = _calledFnInfo.filter(_isGetElementById).map(_domId);
        const domIdNo = domIds.length;
        if (domIdNo !== l) {
            return [
                `The number of dom ids should be ${l} but is instead ` +
                        ` ${domIdNo}!`
            ];
        }
        return domIds.reduce(accumFailMsgFn.bind(this, portionIndex), []);
    }; // _unitTestLineFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The index of the row to be returned
     * @param {Array[String]} accumFailMsgs - The collected list of fail message
     * @param {} char - The placeholder argument
     * @param {Number} charIndex - The index of the character within the portion
     * @param {Array[String]} domIds - The list of id of doms in the row
     * @returns {Array[String]} The requested list of fail messages
     */
    const _accumUnitTestRowIndexFailMsgs = (
            rowIndex, accumFailMsgs, char, charIndex, domIds) => {
        const domId = domIds[charIndex];
        const expectedDomId = _FV_RENDER_SQ_PARAMS.domId(rowIndex, charIndex);
        if (domId === expectedDomId) return accumFailMsgs;
        return accumFailMsgs.concat([
            `The expected dom id of the square with rowIndex ${rowIndex} and` +
                    ` charIndex ${charIndex} is ${expectedDomId} but is ` +
                    `instead ${domId}!`
        ]);
    }; // _accumUnitTestRowIndexFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} colIndex - The index of the column to be returned
     * @param {Array[String]} accumFailMsgs - The collected list of fail message
     * @param {} char - The placeholder argument
     * @param {Number} charIndex - The index of the character within the portion
     * @param {Array[String]} domIds - The list of id of doms in the column
     * @returns {Array[String]} The requested list of fail messages
     */
    const _accumUnitTestColIndexFailMsgs = (
            colIndex, accumFailMsgs, char, charIndex, domIds) => {
        const domId = domIds[charIndex];
        const expectedDomId = _FV_RENDER_SQ_PARAMS.domId(charIndex, colIndex);
        if (domId === expectedDomId) return accumFailMsgs;
        return accumFailMsgs.concat([
            `The expected dom id of the square with colIndex ${colIndex} and` +
                    `charIndex ${charIndex} is ${expectedDomId} but is ` +
                    `instead ${domId}!`
        ]);
    }; // _accumUnitTestColIndexFailMsgs

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The grid size
     * @param {Number} rowIndex - The index of the row in the grid
     * @param {Number} colIndex - The index of the column in the grid
     */
    const _unitTestGrid = (size, rowIndex, colIndex) => {
        _calledFnInfo.length = 0;
        const grid = _FV_RENDERED_SQS.grid(size, rowIndex, colIndex);
        console.info("UnitTestFVRenderedSqs _unitTestGrid");
        console.info(`size: ${size}`);
        console.info(`rowIndex: ${rowIndex}`);
        console.info(`colIndex: ${colIndex}`);
        // Only the list of the queried coordinates matters
        SHOW_RESULT_MSGS(_unitTestGridFailMsgs(size, rowIndex, colIndex, grid));
        //
        _calledFnInfo.length = 0;
    }; // _unitTestGrid

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The grid size
     * @param {Number} rowIndex - The index of the row in the grid
     * @param {Number} colIndex - The index of the column in the grid
     * @param {Array[String]} grid - The actual result
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestGridFailMsgs = (size, rowIndex, colIndex, grid) => {
        if (!_isArray(grid)) return ["grid isn't an Array!"];
        const actualLength = grid.length;
        const expectedLength = Math.pow(size, 2);
        if (expectedLength !== actualLength) {
            return [
                `The length of the grid should be ${expectedLength} but is ` +
                        `instead ${actualLength}!`
            ];
        }
        const domIds = _calledFnInfo.filter(_isGetElementById).map(_domId);
        const domIdNo = domIds.length;
        if (domIdNo !== expectedLength) {
            return [
                `The number of dom ids should be ${expectedLength} but is` +
                        ` instead ${domIdNo}!`
            ];
        }
        const expectedDomIds = _expectedGridDomIds(size, rowIndex, colIndex);
        return domIds.reduce(_accumUnitTestUnexpectedGridFailMsgs.bind(
                this, expectedDomIds), []).concat(domIds.reduce(
                _accumUnitTestDuplicateFailMsgs, []));
    }; // _unitTestGridFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} size - The grid size
     * @param {Number} rowIndex - The index of the row in the grid
     * @param {Number} colIndex - The index of the column in the grid
     * @returns {Array[String]} The requested list of id of doms in the grid
     */
    const _expectedGridDomIds = (size, rowIndex, colIndex) => {
        return Array(size).fill("").reduce(_accumExpectedGridDomIds.bind(
                this, rowIndex - FMLAS.portionIndexInGroup(rowIndex, size),
                colIndex - FMLAS.portionIndexInGroup(colIndex, size)), []);
    }; // _expectedGridDomIds

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} minRowIndexInGrid - The minimum row index in the grid
     * @param {Number} minColIndexInGrid - The minimum column index in the grid
     * @param {Array[String]} accumExpectedGridDomIds - The collected list of id
     *                                                  of doms in the grid
     * @param {} domId - The placeholder argument
     * @param {Number} rowOffsetInGrid - The row offset in the grid
     * @param {Array} sizeList - The placeholder for using Array functions
     * @returns {Array[String]} The requested list of id of doms in the grid
     */
    const _accumExpectedGridDomIds = (minRowIndexInGrid, minColIndexInGrid,
            accumExpectedGridDomIds, domId, rowOffsetInGrid, sizeList) => {
        return accumExpectedGridDomIds.concat(sizeList.map(_expectedGridDomId.
                bind(this, minRowIndexInGrid + rowOffsetInGrid,
                minColIndexInGrid)));
    }; // _accumExpectedGridDomIds

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} rowIndex - The index of the row in the grid
     * @param {Number} minColIndexInGrid - The minimum column index in the grid
     * @param {} domId - The placeholder argument
     * @param {Number} colOffsetInGrid - The column offset in the grid
     * @returns {String} The requested id of dom in the grid
     */
    const _expectedGridDomId = (
            rowIndex, minColIndexInGrid, domId, colOffsetInGrid) => {
        return _FV_RENDER_SQ_PARAMS.domId(
                rowIndex, minColIndexInGrid + colOffsetInGrid);
    }; // _expectedGridDomId

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[String]} expectedDomIds - The list of expected dom ids
     * @param {Array[String]} accumFailMsgs - The collected list of fail message
     * @param {} char - The placeholder argument
     * @param {Number} charIndex - The index of the character within the portion
     * @param {Array[String]} domIds - The list of id of doms in the column
     * @returns {Array[String]} The requested list of fail messages
     */
    const _accumUnitTestUnexpectedGridFailMsgs = (
            expectedDomIds, accumFailMsgs, char, charIndex, domIds) => {
        const domId = domIds[charIndex];
        if (expectedDomIds.some(_isSameDomId.bind(this, domId))) {
            return accumFailMsgs;
        }
        return accumFailMsgs.concat([
            `The expected dom id of the square with colIndex ${colIndex} and` +
                    `charIndex ${charIndex} should be within ` +
                    `${JSON.stringify(expectedDomIds)} but is instead ${domId}!`
        ]);
    }; // _accumUnitTestUnexpectedGridFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {String} domId1 - The dom id to be compared against
     * @param {String} domId2 - The dom id to be compared against
     * @returns {Boolean} The check result
     */
    const _isSameDomId = (domId1, domId2) => domId1 === domId2;

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} l - The board length
     */
    const _unitTestBoard = l => {
        _calledFnInfo.length = 0;
        const board = _FV_RENDERED_SQS.board(l);
        console.info(`UnitTestFVRenderedSqs _unitTestBoard l: ${l}`);
        // Only the list of the queried coordinates matters
        SHOW_RESULT_MSGS(_unitTestBoardFailMsgs(l, board));
        //
        _calledFnInfo.length = 0;
    }; // _unitTestBoard

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} l - The board length
     * @param {ArrayArray[[String]]} board - The actual result
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestBoardFailMsgs = (l, board) => {
        if (!_isArray(board)) return ["board isn't an Array!"];
        // It assumes that the query and its results must be already valid
        const domIds = _calledFnInfo.filter(_isGetElementById).map(_domId);
        const domIdNo = domIds.length, expectedLength = Math.pow(l, 2);
        if (domIdNo !== expectedLength) {
            return [
                `The number of dom ids should be ${expectedLength} but is` +
                        ` instead ${domIdNo}!`
            ];
        }
        return domIds.reduce(_accumUnitTestDuplicateFailMsgs,
                _unitTestBoardRowFailMsgs(l, board));
        //
    }; // _unitTestBoardFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} l - The board length
     * @param {ArrayArray[[String]]} board - The actual result
     * @returns {Array[String]} The requested list of fail messages
     */
    const _unitTestBoardRowFailMsgs = (l, board) => {
        return board.reduce(_accumUnitTestBoardRowFailMsgs.bind(this, l), []);
    }; // _unitTestBoardRowFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Number} l - The board length
     * @param {Array[String]} accumFailMsgs- The collected list of fail messages
     * @param {Array[String]} row - The row in the board to be checked against
     * @param {Number} rowIndex - The index of the row to be checked against
     * @returns {Array[String]} The requested list of fail messages
     */
    const _accumUnitTestBoardRowFailMsgs = (
            l, accumFailMsgs, row, rowIndex) => {
        if (!_isArray(row)) {
            return accumFailMsgs.concat([
                `The row with index ${rowIndex} isn't an Array!`
            ]);
        } else if (row.length !== l) {
            return accumFailMsgs.concat([
                `The length of the row with index ${rowIndex} should be ${l}` +
                        ` but is instead ${row.length}!`
            ]);
        }
        return accumFailMsgs;
    }; // _accumUnitTestBoardRowFailMsgs

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {} array - The board length
     * @returns {Boolean} The check result
     */
    const _isArray = array => array.constructor === Array;

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Object[String, Object, String, *]} info -
     *        The paramters of the called function in FVRenderedDomsStub
     * @returns {Boolean} The check result
     */
    const _isGetElementById = info => info.fn === "callFn";

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Object[String, Object, String, *]} info -
     *        The paramters of the called function in FVRenderedDomsStub
     * @returns {String} The requested dom id
     * @todo: Makes this test decoupled from this implementation detail
     */
    const _domId = info => info.params[0];

    /**
     * Pure Function
     * @author DoubleX @since v1.0 @version v1.0
     * @param {Array[String]} accumFailMsgs - The collected list of fail message
     * @param {} char - The placeholder argument
     * @param {Number} charIndex - The index of the character within the portion
     * @param {Array[String]} domIds - The list of id of doms in the column
     * @returns {Array[String]} The requested list of fail messages
     */
    const _accumUnitTestDuplicateFailMsgs = (
            accumFailMsgs, char, charIndex, domIds) => {
        const domId = domIds[charIndex];
        const firstFind = domIds.indexOf(domId);
        if (firstFind === charIndex) return accumFailMsgs;
        return accumFailMsgs.concat([
            `The dom id with charIndex ${charIndex} duplicates that with ` +
                    `${firstFind}!`
        ]);
    }; // _accumUnitTestDuplicateFailMsgs

    console.info("UnitTestFVRenderedSqs pre");
    // These tests are duplicated to ensure that the functions' nullipotent
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFVRenderedSqs post");

}; // UnitTestFVRenderedSqs
