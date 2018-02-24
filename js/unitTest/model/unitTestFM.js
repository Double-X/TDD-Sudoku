/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Array[String]} FNS - The list of names of functions to be tested
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 * @param {Function(String)} SHOW_FAIL_MSG_STACK_TRACE - Shows the test failure
 *                                                       message with stacktrace
 */
const UnitTestFM = (FNS, SHOW_RESULT_MSGS, SHOW_FAIL_MSG_STACK_TRACE) => {

    const _FM_BASE_BOARD = FMBaseBoard();
    const _FM_BASE_FILLED_COORS = FMBaseFilledCoors();
    const _FM_BOARD = FMBoard(_FM_BASE_BOARD);
    const _FM_FILLED_COORS = FMFilledCoors(_FM_BASE_FILLED_COORS);
    const _FM_PICKED_COMBINATION = FMPickedCombination();
    const _FM_NEW_DATA = FMNewData(_FM_PICKED_COMBINATION);

    const _FNS = {
        FMBaseBoard:
              UnitTestFMBaseBoard.bind(this, _FM_BASE_BOARD, SHOW_RESULT_MSGS),
        FMBoard: UnitTestFMBoard.bind(this, _FM_BOARD, SHOW_RESULT_MSGS),
        FMNewBoard: UnitTestFMNewBoard.bind(
                this, _FM_BOARD, _FM_NEW_DATA, SHOW_RESULT_MSGS),
        FMBaseFilledCoors: UnitTestFMBaseFilledCoors.bind(
                this, _FM_BASE_FILLED_COORS, SHOW_RESULT_MSGS),
        FMFilledCoors: UnitTestFMFilledCoors.bind(
                this, _FM_FILLED_COORS, SHOW_RESULT_MSGS),
        FMNewFilledCoors: UnitTestFMNewFilledCoors.bind(
                this, _FM_FILLED_COORS, _FM_NEW_DATA, SHOW_RESULT_MSGS),
        FMInputViolations:
                UnitTestFMInputViolations.bind(this, SHOW_FAIL_MSG_STACK_TRACE),
        FMIsWon: UnitTestFMIsWon.bind(this, SHOW_RESULT_MSGS),
        FMPickedCombination: UnitTestFMPickedCombination.bind(
                this, _FM_PICKED_COMBINATION, SHOW_RESULT_MSGS),
        FMRecDemo: UnitTestFMRecDemo.bind(this, SHOW_RESULT_MSGS)
    };

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        "use strict";
        console.info("UnitTestFM _unitTestAll");
        FNS.forEach(fn => { if (_FNS[fn]) _FNS[fn](); });
    }; // _unitTestAll

    console.info("UnitTestFM pre");
    // These tests are duplicated to ensure that the functions' nullipotent/pure
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFM post");

}; // UnitTestFM
