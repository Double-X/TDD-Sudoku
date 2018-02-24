/**
 * No-op
 * @author DoubleX @interface @since v1.0 @version v1.0
 * @param {Function(Array[String])} SHOW_RESULT_MSGS - Shows the test results
 */
const UnitTestFMIsWon = SHOW_RESULT_MSGS => {

    "use strict";

    const _FM_IS_WON = FMIsWon();

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestAll = () => {
        console.info("UnitTestFMIsWon _unitTestAll");
        // These tests are duplicated to ensure that this function's indeed pure
        _unitTestIsWon();
        _unitTestIsWon();
        _unitTestIsInvalidWon();
        _unitTestIsInvalidWon();
        _unitTestIsNotWon();
        _unitTestIsNotWon();
        //
    }; // _unitTestAll

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestIsWon = () => {
        console.info("UnitTestFMIsWon _unitTestIsWon");
        const isWon = _FM_IS_WON([
            ["0", "1", "2", "3"],
            ["2", "3", "1", "0"],
            ["1", "2", "3", "0"],
            ["3", "0", "1", "2"]
        ]);
        console.info(`isWon: ${isWon}`);
        if (isWon) return console.info("Passed!");
        SHOW_RESULT_MSGS(["isWon should be truthy but is instead falsy!"]);
    }; // _unitTestIsWon

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestIsInvalidWon = () => {
        console.info("UnitTestFMIsWon _unitTestIsInvalidWon");
        // FMIsWon assumes that the board must always be valid
        const isWon = _FM_IS_WON([
            ["0", "1", "1", "1"],
            ["1", "1", "0", "1"],
            ["1", "2", "1", "1"],
            ["1", "1", "1", "2"]
        ]);
        //
        console.info(`isWon: ${isWon}`);
        if (isWon) return console.info("Passed!");
        SHOW_RESULT_MSGS(["isWon should be truthy but is instead falsy!"]);
    }; // _unitTestIsInvalidWon

    /**
     * No-op
     * @author DoubleX @since v1.0 @version v1.0
     */
    const _unitTestIsNotWon = () => {
        console.info("UnitTestFMIsWon _unitTestIsNotWon");
        // FMIsWon only cares about whether the board's fully filled
        const isWon = _FM_IS_WON([
            ["0", "1", "2", "3"],
            ["2", "", "1", "0"],
            ["1", "2", "3", "0"],
            ["3", "0", "1", "2"]
        ]);
        //
        console.info(`isWon: ${isWon}`);
        if (!isWon) return console.info("Passed!");
        SHOW_RESULT_MSGS(["isWon should be falsy but is instead truthy!"]);
    }; // _unitTestIsNotWon

    console.info("UnitTestFMIsWon pre");
    // These tests are duplicated to ensure that this function's indeed pure
    _unitTestAll();
    _unitTestAll();
    //
    console.info("UnitTestFMIsWon post");

}; // UnitTestFMIsWon
